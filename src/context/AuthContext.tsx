import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLogin, useRegister } from "@/hooks/tanstack-hooks/auth";
import type { LoginPayload, RegisterPayload } from "@/api/auth";

/* =========================
   Types
========================= */

interface AuthUser {
  _id: string;
  name: string;
  email: string;
  contact_number: string;
  role: string;
  status: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_identity_verified: boolean;
  last_login_at: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    data: LoginPayload,
    callbacks?: { onSuccess?: () => void; onError?: () => void },
  ) => void;
  register: (
    data: RegisterPayload,
    callbacks?: { onSuccess?: () => void; onError?: () => void },
  ) => void;
  logout: () => void;
  loginMutation: ReturnType<typeof useLogin>;
  registerMutation: ReturnType<typeof useRegister>;
}

/* =========================
   Context
========================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   Provider
========================= */

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  // On mount — check if we have tokens and user to restore session
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse stored user", err);
        localStorage.removeItem("user");
      }
    }
    
    setIsLoading(false);
  }, []);


  const login = useCallback(
    (
      data: LoginPayload,
      callbacks?: { onSuccess?: () => void; onError?: () => void },
    ) => {
      loginMutation.mutate(data, {
        onSuccess: (response: any) => {
          const { user: loggedInUser } = response.data;
          setUser(loggedInUser);
          localStorage.setItem("user", JSON.stringify(loggedInUser));
          callbacks?.onSuccess?.();
        },

        onError: () => {
          callbacks?.onError?.();
        },
      });
    },
    [loginMutation],
  );

  const register = useCallback(
    (
      data: RegisterPayload,
      callbacks?: { onSuccess?: () => void; onError?: () => void },
    ) => {
      registerMutation.mutate(data, {
        onSuccess: () => {
          callbacks?.onSuccess?.();
        },
        onError: () => {
          callbacks?.onError?.();
        },
      });
    },
    [registerMutation],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  }, []);


  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated: !!user || !!localStorage.getItem("accessToken"),
      isLoading,
      login,
      register,
      logout,
      loginMutation,
      registerMutation,
    }),
    [user, isLoading, login, register, logout, loginMutation, registerMutation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* =========================
   Hook
========================= */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
