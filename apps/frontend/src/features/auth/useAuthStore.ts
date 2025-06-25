import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string } | null;
  token: string | null;
  setUser: (user: { id: string; email: string } | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user: { id: string; email: string } | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));
