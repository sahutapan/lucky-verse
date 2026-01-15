import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '../api';
import { queryKeys } from '../../../core/query-keys';
import { useAuth } from '../useAuth';

/**
 * Hook to fetch and manage the current authenticated user.
 * Syncs with Zustand for components that need synchronous access.
 */
export function useAuthUser() {
    const { setAuth, user: zustandUser } = useAuth();

    const query = useQuery({
        queryKey: queryKeys.auth.user(),
        queryFn: ({ signal }) => authApi.getMe(signal),
        // If we have a user in Zustand (from login/initial load), use it as initial data
        initialData: zustandUser || undefined,
        // Sync to Zustand when data changes
        // Don't retry indefinitely if not logged in
        retry: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (query.data && query.data.id !== zustandUser?.id) {
            setAuth(query.data);
        }
    }, [query.data, zustandUser?.id, setAuth]);

    return query;
}
