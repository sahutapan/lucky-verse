import api from '../../services/api';

export interface BalanceResponse {
    balance: number;
}

export const walletApi = {
    getBalance: async (signal?: AbortSignal) => {
        const response = await api.get<BalanceResponse>('/wallet/balance', { signal });
        return response.data;
    },
};
