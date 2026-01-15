import { create } from 'zustand';

type ModalType = 'login' | 'register' | null;

interface AuthModalState {
    activeModal: ModalType;
    openLoginModal: () => void;
    openRegisterModal: () => void;
    closeModal: () => void;
}

export const useAuthModal = create<AuthModalState>((set) => ({
    activeModal: null,
    openLoginModal: () => set({ activeModal: 'login' }),
    openRegisterModal: () => set({ activeModal: 'register' }),
    closeModal: () => set({ activeModal: null }),
}));
