import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { queryClient } from '../../../core/queryClient';
import { queryKeys } from '../../../core/query-keys';
import type { UserCreate } from '../auth.types';

/**
 * Hook for user registration.
 * Syncs the new user to Zustand and invalidates relevant queries.
 */
export function useRegister() {
    return useMutation({
        mutationFn: (data: UserCreate) => authApi.register(data),
        onSuccess: async () => {
            // Invalidate queries to ensure everything is fresh
            await queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        },
    });
}
