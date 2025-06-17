// src/store/authStore.ts
import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  isNewUser: boolean;
  user: {
    email?: string;
    nickname?: string;
  } | null;
  setAuth: (isAuthenticated: boolean, user?: any) => void;
  setNewUser: (isNewUser: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isNewUser: false,
  user: null,
  setAuth: (isAuthenticated, user = null) => set({ isAuthenticated, user }),
  setNewUser: (isNewUser) => set({ isNewUser }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));