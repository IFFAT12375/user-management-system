import { createContext, useCallback, useEffect, useState } from "react";

import authService from "../services/authService";
import { setAccessToken } from "../services/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    const result = await authService.login(credentials);

    setAccessToken(result.accessToken);
    setUser(result.user);

    return result.user;
  };

  const register = async (formData) => {
    const result = await authService.register(formData);

    setAccessToken(result.accessToken);
    setUser(result.user);

    return result.user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const updateCurrentUser = (updatedUser) => {
    setUser((currentUser) => ({
      ...currentUser,
      id: updatedUser.id || updatedUser._id || currentUser.id || currentUser._id,
      name: updatedUser.name ?? currentUser.name,
      email: updatedUser.email ?? currentUser.email,
      role: updatedUser.role ?? currentUser.role,
    }));
  };

  const restoreSession = useCallback(async () => {
    try {
      const result = await authService.refresh();

      setAccessToken(result.accessToken);
      const profile = await authService.getMe();

      setUser(profile.user);
    } catch {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
