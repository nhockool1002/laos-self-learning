import React, { createContext, useContext, useState, ReactNode } from 'react';
import { sheetService } from '../services/sheetService';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    createdAt: string;
  }) => Promise<void>;
  error: string | null;
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('user'));
  const [error, setError] = useState<string | null>(null);
  const [isGlobalLoading, setGlobalLoading] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      setGlobalLoading(true);
      const user = await sheetService.loginUser(username, password);
      
      if (!user) {
        setError('Tên đăng nhập hoặc mật khẩu không đúng');
        setGlobalLoading(false);
        return;
      }

      setCurrentUser(user);
      setIsAuthenticated(true);
      // Lưu thông tin user vào localStorage
      localStorage.setItem('user', JSON.stringify({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }));
    } catch (err) {
      setError('Đăng nhập thất bại. Vui lòng thử lại.');
      setGlobalLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  const register = async (userData: {
    username: string;
    email: string;
    password: string;
    createdAt: string;
  }) => {
    try {
      setError(null);
      // Check if user already exists
      const exists = await sheetService.checkUserExists(userData.username, userData.email);
      if (exists) {
        setError('Username hoặc email đã tồn tại');
        return;
      }
      await sheetService.registerUser(userData);
      setCurrentUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, register, error, isGlobalLoading, setGlobalLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 