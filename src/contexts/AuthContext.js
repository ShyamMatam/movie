import React, { createContext, useState, useContext, useEffect } from 'react';
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { kindeConfig } from '../lib/kinde';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, isLoading, isAuthenticated, logout } = useKindeAuth();

  const login = () => {
    window.location.href = `${kindeConfig.authDomain}/oauth2/auth?client_id=${kindeConfig.clientId}&redirect_uri=${kindeConfig.redirectUri}&response_type=code&scope=openid%20profile%20email`;
  };

  const register = () => {
    window.location.href = `${kindeConfig.authDomain}/oauth2/auth?client_id=${kindeConfig.clientId}&redirect_uri=${kindeConfig.redirectUri}&response_type=code&scope=openid%20profile%20email&is_register=true`;
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);