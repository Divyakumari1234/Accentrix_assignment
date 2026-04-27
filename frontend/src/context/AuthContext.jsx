import { createContext, useContext, useMemo, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('accentrix_auth') || 'null');
  } catch (_error) {
    localStorage.removeItem('accentrix_auth');
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('accentrix_auth', JSON.stringify(data));
    setAuth(data);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    localStorage.setItem('accentrix_auth', JSON.stringify(data));
    setAuth(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('accentrix_auth');
    setAuth(null);
  };

  const updateUser = (user) => {
    const next = { ...auth, user };
    localStorage.setItem('accentrix_auth', JSON.stringify(next));
    setAuth(next);
  };

  const value = useMemo(
    () => ({ token: auth?.token, user: auth?.user, login, logout, register, updateUser }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
