import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type AuthView = 'login' | 'signup' | 'forgot' | 'reset';

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isAuthOpen: boolean;
  authView: AuthView;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  setAuthView: (view: AuthView) => void;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');

  const openAuth = (view: AuthView = 'login') => {
    setAuthView(view);
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);

  // login e cadastro aqui são simulados (sem backend real ainda)
  const login = (email: string, _password: string) => {
    setUser({ name: email.split('@')[0], email });
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ name, email });
    setIsAuthenticated(true);
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextValue = {
    isAuthenticated,
    user,
    isAuthOpen,
    authView,
    openAuth,
    closeAuth,
    setAuthView,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  return ctx;
}
