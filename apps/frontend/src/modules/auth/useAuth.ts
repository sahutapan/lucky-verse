import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    username: string;
    elo_rating: number;
}

interface AuthState {
    user: User | null;
    setAuth: (user: User) => void;
    logout: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
    user: null,
    setAuth: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
