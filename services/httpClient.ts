import axios, { type AxiosRequestConfig } from 'axios';

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

const getAuthToken = (): string | null =>
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyYWRiYTNiOC0zZDE4LTRiMTYtYjM3MS0wMzU5YjZhNWY2YmEiLCJlbWFpbCI6ImN1c3RvbWVyQHNlcnZlYXNlLmNvbSIsImFjY291bnRUeXBlIjoiY3VzdG9tZXIiLCJhY2NvdW50U3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzcxMzkxMjgxLCJleHAiOjE3NzE0Nzc2ODF9.fDSwWdPqt1AodTYVxnVRoY8hBGpLYE1cXknvHIdN3zc';

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

instance.interceptors.request.use((config) => {
	const token = getAuthToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

instance.interceptors.response.use(undefined, (err: unknown) => {
	const msg =
		(err as { response?: { data?: { message?: string } }; message?: string }).response?.data?.message ??
		(err as { message?: string }).message ??
		'Request failed';
	const status = (err as { response?: { status?: number } }).response?.status ?? 0;
	const data = (err as { response?: { data?: unknown } }).response?.data;
	console.log('msg', msg);
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
	/**
	 * GET with optional cache TTL. Pass cacheTtlSeconds (e.g. 3600 for 1hr) to send cache headers
	 * so the backend can return cached responses or set response Cache-Control.
	 */
	get<T>(path: string, config?: AxiosRequestConfig | GetWithCacheOptions): Promise<HttpClientResponse<T>> {
		const merged = mergeGetConfig(config as GetWithCacheOptions | undefined);
		return instance.get<T>(path, merged).then((res) => toResponse(res));
	},
	post<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		return instance.post<T>(path, body, config).then((res) => toResponse(res));
	},
	put<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		return instance.put<T>(path, body, config).then((res) => toResponse(res));
	},
	patch<T>(path: string, body?: unknown, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		return instance.patch<T>(path, body, config).then((res) => toResponse(res));
	},
	delete<T>(path: string, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		return instance.delete<T>(path, config).then((res) => toResponse(res));
	},
};
