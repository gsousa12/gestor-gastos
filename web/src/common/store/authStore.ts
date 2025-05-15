import { create } from "zustand";

// FIXME: Tipar o user
interface AuthState {
  isAuthenticated: boolean;
  user: any;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: any | null) => any;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user: any) => set({ user }),
}));
