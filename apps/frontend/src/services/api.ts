import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { useAuth } from '../modules/auth/useAuth';
import { env } from '../core/env';

/**
 * Standard error response format from our FastAPI backend
 */
interface ApiError {
    detail?: string | Array<{ msg: string; loc: string[]; type: string }>;
}

/**
 * Extended request config to track retries and prevent infinite loops
 */
interface CustomRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true,
    timeout: 20000, // 20s timeout for better UX on slow connections
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Request Interceptor
 * Useful for debugging or adding tracing/logging headers in the future.
 */
api.interceptors.request.use(
    (config) => config,
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handles success, retries, and global error scenarios.
 */
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as CustomRequestConfig;

        // 1. Handle Network/Timeout Errors (No response received)
        if (!error.response) {
            const isTimeout = error.code === 'ECONNABORTED' || error.message.includes('timeout');
            console.error(`[API Network Error] ${isTimeout ? 'Request timed out' : 'Check your connection'}:`, error.message);
            return Promise.reject(error);
        }

        const { status, data, config } = error.response;

        // 2. Handle 401 Unauthorized (Session Expired)
        if (status === 401) {
            // Avoid loops on login or recursive refresh failures
            const isAuthRoute = config.url?.includes('/auth/login') || config.url?.includes('/auth/refresh');

            if (!isAuthRoute && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Attempt silent refresh - browser automatically sends 'refresh_token' cookie
                    await api.post('/auth/refresh');
                    // If successful, retry the original request
                    return api(originalRequest);
                } catch (refreshError) {
                    // If refresh also fails, or returns 401/403, we force logout
                    console.warn('[API Auth] Session expired. Redirecting to login.');
                    useAuth.getState().logout();
                    return Promise.reject(refreshError);
                }
            } else {
                // If we're already on an auth route or this is a retry failure, logout immediately
                useAuth.getState().logout();
            }
        }

        // 3. Handle 403 Forbidden
        if (status === 403) {
            console.error('[API 403 Forbidden] User lacks permissions:', data?.detail || 'No detail provided');
        }

        // 4. Handle 500+ Server Errors
        if (status >= 500) {
            console.error(`[API Server Error ${status}]:`, data?.detail || 'Internal server error occurred');
        }

        // Log general debugging info in development
        if (import.meta.env.DEV) {
            console.debug(`[API ${status}] ${config.method?.toUpperCase()} ${config.url}`, data);
        }

        return Promise.reject(error);
    }
);

export default api;
