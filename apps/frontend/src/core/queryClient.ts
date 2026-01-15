import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { useAuth } from '../modules/auth/useAuth';

/**
 * Centralized QueryClient configuration for production logic.
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
            retry: (failureCount, error: any) => {
                // Skip retry for authentication or permission errors
                const status = error?.response?.status;
                if (status === 401 || status === 403) return false;

                // Retry other errors up to 3 times in production
                return failureCount < 3;
            },
            refetchOnWindowFocus: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: any) => {
            // Global error handling for queries if needed
            if (error?.response?.status === 401) {
                useAuth.getState().logout();
            }
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            // Global error handling for mutations if needed
            if (error?.response?.status === 401) {
                useAuth.getState().logout();
            }
        },
    }),
});
