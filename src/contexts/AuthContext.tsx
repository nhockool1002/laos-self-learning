import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase, TABLES } from '../config/supabaseConfig';
import md5 from 'md5';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: any | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: {
    username: string;
    email: string;
    password: string;
    createdat: string;
  }) => Promise<boolean>;
  error: string | null;
  setError: (error: string | null) => void;
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
      const query = supabase
        .from(TABLES.USERS)
        .select('*')
        .eq('username', username)
        .single();
      const { data, error } = await query;
      if (error) throw error;
      if (data) {
        const hashedPassword = md5(password);
        const isMatch = hashedPassword === data.password;
        if (isMatch) {
          setCurrentUser({ username: data.username });
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify({ username: data.username }));
          return true;
        }
      }
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      return false;
    } catch (error) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      console.error('Login error:', error);
      return false;
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
    createdat: string;
  }): Promise<boolean> => {
    try {
      setError(null);
      const { data: exists, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .or(`username.eq.${userData.username},email.eq.${userData.email}`);
      if (error) throw error;
      if (exists && exists.length > 0) {
        setError('Username hoặc email đã tồn tại trong hệ thống.');
        return false;
      }
      // Hash password trước khi lưu
      const hashedPassword = md5(userData.password);
      await supabase
        .from(TABLES.USERS)
        .insert([
          {
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            createdat: userData.createdat
          }
        ]);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (err) {
      setError('Đăng ký thất bại. Vui lòng thử lại.');
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, register, error, setError, isGlobalLoading, setGlobalLoading }}>
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