"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { pullServerState } from "./progress";

export type User = {
  name: string;
  email: string;
  role: "student" | "parent";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
    role?: "student" | "parent"
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Identity cache so src/lib/progress.ts can namespace synchronously; the
// session itself is an httpOnly cookie — this is not an auth source.
function cacheIdentity(user: User | null) {
  if (user) localStorage.setItem("layaida_user", JSON.stringify(user));
  else localStorage.removeItem("layaida_user");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from the cookie; pull server learner state before
  // exposing the user so pages read fresh data.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            cacheIdentity(data.user);
            await pullServerState(data.user.email);
            setUser(data.user);
          }
        } else {
          cacheIdentity(null);
        }
      } catch {
        // offline: fall back to cached identity so the app stays usable
        const cached = localStorage.getItem("layaida_user");
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch {
            localStorage.removeItem("layaida_user");
          }
        }
      }
      setIsLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (data.success) {
        cacheIdentity(data.user);
        await pullServerState(data.user.email);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch {
      return { success: false, error: "network_error" };
    }
  };

  const signup = async (name: string, email: string, password: string, role: "student" | "parent" = "student") => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, role }),
      });
      const data = await res.json();
      if (data.success) {
        cacheIdentity(data.user);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch {
      return { success: false, error: "network_error" };
    }
  };

  const logout = () => {
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    cacheIdentity(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
