import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string, remember: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  setToken: (token, remember) => {
    const storege = remember ? localStorage : sessionStorage;
    storege.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    set({ token: null });
  },
}));
