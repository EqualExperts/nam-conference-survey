import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const AUTH_STORAGE_KEY = 'admin_authenticated';

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Initialize from sessionStorage
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    // Sync authentication state to sessionStorage
    if (isAuthenticated) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Handle missing environment variables gracefully
    if (!adminUsername || !adminPassword) {
      console.error('Admin credentials not configured in environment variables');
      return false;
    }

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      return true;
    }

    return false;
  };

  const logout = (): void => {
    setIsAuthenticated(false);
  };

  const value: AuthContextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
