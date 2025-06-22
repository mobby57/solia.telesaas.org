'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: { email: string } | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}