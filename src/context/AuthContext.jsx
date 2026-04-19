import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../api/auth';
import { setAccessToken, clearAccessToken } from '../api/client';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true while restoring session

  // ─── Restore session on mount ───────────────────────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) { setLoading(false); return; }

      try {
        const { data } = await authApi.refresh(refreshToken);
        setAccessToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        // Fetch fresh user profile
        const meRes = await authApi.me();
        setUser(meRes.data);
      } catch {
        // Refresh failed: clear everything silently
        clearAccessToken();
        localStorage.removeItem('refreshToken');
      } finally {
        setLoading(false);
      }
    };

    restore();
  }, []);

  // ─── Listen for forced logouts (token expired mid-session) ──────────────────
  useEffect(() => {
    const handler = () => {
      setUser(null);
      clearAccessToken();
      localStorage.removeItem('refreshToken');
    };
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  // ─── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (mobile, password) => {
    const { data } = await authApi.login(mobile, password);
    setAccessToken(data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  }, []);

  // ─── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    const { data } = await authApi.register(formData);
    setAccessToken(data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    setUser(data.user);
    return data.user;
  }, []);

  // ─── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try { if (refreshToken) await authApi.logout(refreshToken); } catch { /* ignore */ }
    clearAccessToken();
    localStorage.removeItem('refreshToken');
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin:    user?.role === 'admin',
    isModerator: user?.role === 'moderator' || user?.role === 'admin',
    login,
    register,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
