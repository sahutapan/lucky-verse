import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api';
import { queryClient } from '../../../core/queryClient';
import { useAuth } from '../useAuth';

/**
 * Hook for user logout.
 * Clears the query cache and resets local auth state.
 */
export function useLogout() {
    const { logout: clearZustandAuth } = useAuth();

    return useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            // Clear all queries (auth, wallet, etc.) to prevent stale data
            queryClient.clear();

            // Reset local state
            clearZustandAuth();
        },
        // Even if the backend call fails, we often want to clear local state
        onError: () => {
            queryClient.clear();
            clearZustandAuth();
        }
    });
}
