import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Check for existing auth cookie/session on mount
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: Implement login API call with fetch including credentials: 'include'
    // On success, setUser with user data
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    // TODO: Implement register API call with fetch including credentials: 'include'
    // On success, setUser with user data
  };

  const logout = () => {
    // TODO: Implement logout logic, clear user and cookies
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
