import React, { createContext, useContext, useState, useEffect } from "react";
import { api, registerOnUnauthorized } from "@lib/axios";
import { queryClient } from "@lib/react-query";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  profile?: {
    bio?: string;
    avatar_url?: string;
    birth_date?: string;
    gender?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  tempPhone: string;
  setTempPhone: (phone: string) => void;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tempPhone, setTempPhone] = useState("");

  const refetchUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("caffe_brew_token");
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("caffe_brew_token");
      if (token) {
        await refetchUser();
      }
      setLoading(false);
    };

    initAuth();

    // Register 401 auto-logout handler
    registerOnUnauthorized(() => {
      setUser(null);
    });
  }, []);

  const login = async (phone: string) => {
    // Normalizes phone: e.g. "812345..." -> "081234..."
    let formattedPhone = phone.trim();
    if (formattedPhone.startsWith("+62")) {
      formattedPhone = "0" + formattedPhone.slice(3);
    } else if (formattedPhone.startsWith("62")) {
      formattedPhone = "0" + formattedPhone.slice(2);
    } else if (formattedPhone.startsWith("8")) {
      formattedPhone = "0" + formattedPhone;
    }
    setTempPhone(formattedPhone);
  };

  const verifyOtp = async (otp: string) => {
    // Since we don't have OTP endpoint on the Laravel backend,
    // we use the normalized phone number and default password 'password'
    const res = await api.post("/login", {
      email: tempPhone,
      password: "password",
    });

    const token = res.data.token;
    localStorage.setItem("caffe_brew_token", token);
    setUser(res.data.data);
    await queryClient.invalidateQueries({ queryKey: ["cart"] });
    await queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("caffe_brew_token");
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    tempPhone,
    setTempPhone,
    login,
    verifyOtp,
    logout,
    refetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
