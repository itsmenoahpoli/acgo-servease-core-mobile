import axios, { type AxiosRequestConfig } from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL ?? '';

export interface HttpClientResponse<T> {
	data: T;
	status: number;
	ok: boolean;
}

export interface HttpError extends Error {
	status: number;
	data?: unknown;
}

// Replace with async storage or auth context when you have login flow
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

function toResponse<T>(res: { data: T; status: number } | undefined): HttpClientResponse<T> {
	if (res == null) {
		throw createHttpError('No response received', 0);
	}
	return { data: res.data, status: res.status, ok: res.status >= 200 && res.status < 300 };
}

export const httpClient = {
	get<T>(path: string, config?: AxiosRequestConfig): Promise<HttpClientResponse<T>> {
		return instance.get<T>(path, config).then((res) => toResponse(res));
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
