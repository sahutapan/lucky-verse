import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { queryClient } from '../../../core/queryClient';
import { queryKeys } from '../../../core/query-keys';
import type { LoginRequest } from '../auth.types';

/**
 * Hook for user login.
 * Invalidates user query on success to trigger a refetch of the profile.
 */
export function useLogin() {
    return useMutation({
        mutationFn: (data: LoginRequest) => authApi.login(data),
        onSuccess: async () => {
            // Invalidate the user query to fetch fresh profile data
            await queryClient.invalidateQueries({ queryKey: queryKeys.auth.user() });
        },
    });
}
