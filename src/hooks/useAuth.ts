import { create } from "zustand";

interface AuthState {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuth = create<AuthState>((set) => ({
  user: initialUser,

  login: async (email, password) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@gmail.com" && password === "123456") {
          const user = { email };
          set({ user });
          localStorage.setItem("access", "fake-jwt-token");
          localStorage.setItem("user", JSON.stringify(user));
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
    localStorage.removeItem("user");
  },
}));
