import { create } from "zustand";

interface AuthState {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@gmail.com" && password === "123456") {
          set({ user: { email } });
          localStorage.setItem("access", "fake-jwt-token");
          resolve();
        } else {
          reject(new Error("Email yoki parol noto‘g‘ri"));
        }
      }, 500);
    });
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("access");
  }
}));
