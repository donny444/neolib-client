import React, { createContext, useContext, useEffect, useState, JSX } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  checkAuth: () => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = () => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  const signout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, checkAuth, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
