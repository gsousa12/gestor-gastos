import {
  ROLE_PERMISSIONS,
  UserRole,
  UserSystemActions,
} from "@/common/utils/permissions";
import { create } from "zustand";

interface UserJwtPayload {
  userId: number;
  name: string;
  email: string;
  isActive: boolean;
  role: UserRole;
  iat: number;
  exp: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserJwtPayload | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: UserJwtPayload | null) => void;
  hasPermission: (action: UserSystemActions) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  hasPermission: (action) => {
    const user = get().user;
    if (!user) return false;
    const permissions = ROLE_PERMISSIONS[user.role];
    return permissions ? permissions.has(action) : false;
  },
}));
