import api from '../../services/api';
import type { User, LoginRequest, UserCreate, UserRegisterResponse } from './auth.types';

export const authApi = {
    getMe: async (signal?: AbortSignal) => {
        const response = await api.get<User>('/users/me', { signal });
        return response.data;
    },
    login: async (data: LoginRequest) => {
        const response = await api.post<any>('/auth/login', data);
        return response.data;
    },
    register: async (data: UserCreate) => {
        const response = await api.post<UserRegisterResponse>('/auth/register', data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post<any>('/auth/logout');
        return response.data;
    },
};
