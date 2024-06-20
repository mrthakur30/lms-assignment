import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface User {
  id: string;
  role?: 'admin';
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await axios.post(`${BACKEND_URL}/api/auth/login`, { username, password });
    const user = response.data;
    localStorage.setItem('user', JSON.stringify(user));
    setUser({
        id : user.userId
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
