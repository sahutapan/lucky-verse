import { useQuery } from '@tanstack/react-query';
import { walletApi } from '../api';
import { queryKeys } from '../../../core/query-keys';
import { useAuth } from '../../auth/useAuth';

/**
 * Hook to fetch the current user's wallet balance.
 * Automatically disabled if the user is not authenticated.
 */
export function useBalance() {
    const { user } = useAuth();

    return useQuery({
        queryKey: queryKeys.wallet.balance(),
        queryFn: ({ signal }) => walletApi.getBalance(signal),
        enabled: !!user,
        // Refetch balance more frequently or on specific events if needed
        staleTime: 30 * 1000, // 30 seconds
    });
}
