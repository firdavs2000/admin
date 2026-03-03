import { create } from "zustand";

export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
  GUEST: "guest",
} as const;

type Role = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  ADD_PRODUCT: "add_product",
  VIEW_PRODUCT: "view_product",
} as const;

type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

export const ROLES_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.ADD_PRODUCT, PERMISSIONS.VIEW_PRODUCT],
  manager: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.ADD_PRODUCT, PERMISSIONS.VIEW_PRODUCT],
  user: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_PRODUCT],
  guest: [],
};

interface AuthState {
  user: { email: string; role: Role } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

const storedUser = localStorage.getItem("user");
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const useAuth = create<AuthState>((set, get) => ({
  user: initialUser,

  login: async (email, password) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        let user = null;
        if (email === "admin@gmail.com" && password === "123456") user = { email, role: ROLES.ADMIN };
        else if (email === "manager@gmail.com" && password === "123456") user = { email, role: ROLES.MANAGER };
        else if (email === "user@gmail.com" && password === "123456") user = { email, role: ROLES.USER };

        if (user) {
          set({ user });
          localStorage.setItem("access", "fake-jwt-token");
          localStorage.setItem("user", JSON.stringify(user));
          resolve();
        } else reject(new Error("Login yoki parol noto‘g‘ri"));
      }, 500);
    });
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("access");
    localStorage.removeItem("user");
  },

  hasPermission: (permission) => {
    const user = get().user; // ✅ bu endi ishlaydi
    if (!user) return false;
    return ROLES_PERMISSIONS[user.role].includes(permission);
  },
}));
