/**
 * Centralized query key factory for predictable and typed access to server state.
 * Prevents typos and helps with targeted cache invalidation.
 */
export const queryKeys = {
    auth: {
        all: ['auth'] as const,
        user: () => [...queryKeys.auth.all, 'user'] as const,
    },
    wallet: {
        all: ['wallet'] as const,
        balance: () => [...queryKeys.wallet.all, 'balance'] as const,
        transactions: (filters?: Record<string, any>) =>
            [...queryKeys.wallet.all, 'transactions', filters] as const,
    },
};
