import axios, { type AxiosRequestConfig } from 'axios';
import { authTokenStorage } from './auth-token-storage';

/** Called when any request returns 401; app should clear UI state and redirect to sign-in. */
let onUnauthorized: (() => void) | null = null;

export function setOnUnauthorized(callback: (() => void) | null): void {
	onUnauthorized = callback;
}

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? '';

/**
 * Cache header keys for client ↔ backend agreement.
 * Backend can read these request headers and set response Cache-Control / ETag accordingly.
 *
 * Sample header key/value pairs for backend reference:
 * ─────────────────────────────────────────────────────────────────────────────
 * Request (client → backend):
 *   X-Cache-TTL         : "3600"              // Desired cache lifetime in seconds (e.g. 1hr = 3600)
 *   Cache-Control       : "max-age=3600"      // Standard: client accepts cached response for 3600s
 *   If-None-Match       : "<etag-from-prev>"  // Conditional GET: return 304 if ETag unchanged
 *   If-Modified-Since   : "Wed, 21 Oct 2025 07:28:00 GMT"  // Conditional GET: return 304 if not modified
 *
 * Response (backend → client):
 *   Cache-Control       : "private, max-age=3600"  // Cache for 3600s (private = not for shared caches)
 *   ETag                : "\"abc123\""              // Opaque version identifier for conditional requests
 *   Last-Modified       : "Wed, 21 Oct 2025 07:28:00 GMT"  // For If-Modified-Since
 *   Expires             : "Thu, 22 Oct 2025 08:28:00 GMT"  // Optional; legacy fallback
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const CACHE_HEADERS = {
	X_CACHE_TTL: 'X-Cache-TTL',
	CACHE_CONTROL: 'Cache-Control',
	IF_NONE_MATCH: 'If-None-Match',
	IF_MODIFIED_SINCE: 'If-Modified-Since',
} as const;

export const CACHE_TTL_1H = 3600;
const ONE_HOUR_SECONDS = CACHE_TTL_1H;

export interface GetWithCacheOptions extends Omit<AxiosRequestConfig, 'headers'> {
	cacheTtlSeconds?: number;
	etag?: string;
	lastModified?: string;
}

export interface HttpClientResponse<T> {
	data: T;
	status: number;
	ok: boolean;
}

export interface HttpError extends Error {
	status: number;
	data?: unknown;
}

function createHttpError(message: string, status: number, data?: unknown): HttpError {
	const err = new Error(String(message ?? 'Request failed')) as HttpError;
	err.name = 'HttpError';
	err.status = status;
	err.data = data;
	return err;
}

const instance = axios.create({
	baseURL: baseURL.replace(/\/$/, ''),
	headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

instance.interceptors.request.use(async (config) => {
	const token = await authTokenStorage.getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

instance.interceptors.response.use(undefined, async (err: unknown) => {
	const status = (err as { response?: { status?: number } }).response?.status ?? 0;

	if (status === 401) {
		await authTokenStorage.clearTokens();
		onUnauthorized?.();
	}

	const rawMsg =
		(err as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message ??
		(err as { message?: string }).message ??
		'Request failed';
	const code = (err as { code?: string }).code;
	const isTimeout = code === 'ECONNABORTED' || /timeout/i.test(String(rawMsg ?? ''));
	const isNetworkError =
		code === 'ERR_NETWORK' ||
		/network error/i.test(String(rawMsg ?? '')) ||
		/connection refused/i.test(String(rawMsg ?? ''));
	let msg: string;
	if (isTimeout) {
		msg = 'The request took too long. Please check your connection and try again.';
	} else if (isNetworkError) {
		msg =
			'Cannot reach the server. Check that the backend is running (e.g. on port 3000), your device is on the same network as the server, and EXPO_PUBLIC_API_URL in .env is correct.';
		console.error('[httpClient] Network error. baseURL:', baseURL || '(empty)');
	} else {
		msg = rawMsg;
	}
	const data = (err as { response?: { data?: unknown } }).response?.data;
	console.error('[httpClient] Error response message:', msg);
	throw createHttpError(msg, status, data);
});

function buildCacheHeaders(options: GetWithCacheOptions): Record<string, string> {
	const headers: Record<string, string> = {};
	const ttl = options.cacheTtlSeconds ?? ONE_HOUR_SECONDS;

	headers[CACHE_HEADERS.X_CACHE_TTL] = String(ttl);
	headers[CACHE_HEADERS.CACHE_CONTROL] = `max-age=${ttl}`;

	if (options.etag != null) headers[CACHE_HEADERS.IF_NONE_MATCH] = options.etag;

	if (options.lastModified != null) headers[CACHE_HEADERS.IF_MODIFIED_SINCE] = options.lastModified;

	return headers;
}

function mergeGetConfig(options?: GetWithCacheOptions): AxiosRequestConfig {
	if (options == null) return {};
	const hasCacheOpts = options.cacheTtlSeconds != null || options.etag != null || options.lastModified != null;
	if (!hasCacheOpts) return options;
	const { cacheTtlSeconds: _ct, etag: _e, lastModified: _lm, ...rest } = options;
	const cacheHeaders = buildCacheHeaders(options);
	const existingHeaders = (rest as AxiosRequestConfig).headers as Record<string, string> | undefined;
	return {
		...rest,
		headers: { ...cacheHeaders, ...existingHeaders },
	};
}

function toResponse<T>(res: { data: T; status: number } | undefined): HttpClientResponse<T> {
	if (res == null) {
		throw createHttpError('No response received', 0);
	}
	return { data: res.data, status: res.status, ok: res.status >= 200 && res.status < 300 };
}

export const httpClient = {
	async get<T>(path: string, config?: AxiosRequestConfig | GetWithCacheOptions): Promise<HttpClientResponse<T>> {
		const merged = mergeGetConfig(config as GetWithCacheOptions | undefined);
		const res = await instance.get<T>(path, merged);
		return toResponse(res);
	},
	async post<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		const res = await instance.post<T>(path, body, config);
		return toResponse(res);
	},
	async put<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		const res = await instance.put<T>(path, body, config);
		return toResponse(res);
	},
	async patch<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		const res = await instance.patch<T>(path, body, config);
		return toResponse(res);
	},
	async delete<T>(path: string, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		const res = await instance.delete<T>(path, config);
		return toResponse(res);
	},
};
