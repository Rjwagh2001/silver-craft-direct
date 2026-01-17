// ===============================
// React & Context Imports
// ===============================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

import {
  authService,
  User,
  LoginCredentials,
  RegisterData,
} from '@/services/auth.service';

// ===============================
// Auth Context Type
// ===============================

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; error?: string; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ===============================
// Create Context
// ===============================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===============================
// Helper — FINAL CORRECT VERSION ✅
// ===============================

const extractUserFromResponse = (data: unknown): User | null => {
  if (!data || typeof data !== 'object') return null;

  const responseData = data as Record<string, unknown>;

  // ✅ API CLIENT ALREADY UNWRAPS `data`
  // so backend response shape is: { user: {...} }
  if (responseData.user) {
    return responseData.user as User;
  }

  return null;
};

// ===============================
// Auth Provider
// ===============================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ===============================
  // Fetch Current User (SOURCE OF TRUTH)
  // ===============================

  const fetchUser = async (): Promise<boolean> => {
    try {
      // 1️⃣ Try with access token
      const profileResponse = await authService.getProfile();

      if (profileResponse.success && profileResponse.data) {
        const userData = extractUserFromResponse(profileResponse.data);
        if (userData) {
          setUser(userData);
          return true;
        }
      }

      // 2️⃣ Try refresh token (httpOnly cookie)
      const refreshResponse = await authService.refreshToken();

      if (refreshResponse.success) {
        const refreshedProfile = await authService.getProfile();
        if (refreshedProfile.success && refreshedProfile.data) {
          const userData = extractUserFromResponse(refreshedProfile.data);
          if (userData) {
            setUser(userData);
            return true;
          }
        }
      }

      // 3️⃣ Auth failed
      localStorage.removeItem('accessToken');
      setUser(null);
      return false;
    } catch (error) {
      console.error('Auth hydration failed:', error);
      setUser(null);
      return false;
    }
  };

  // ===============================
  // Init Auth on App Load (FIXED)
  // ===============================

  useEffect(() => {
    const initAuth = async () => {
      try {
        // ✅ ALWAYS try to hydrate using refresh cookie
        await fetchUser();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // ===============================
  // Login
  // ===============================

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        const userData = extractUserFromResponse(response.data);
        if (userData) {
          setUser(userData);
          return { success: true };
        }
      }

      return { success: false, error: response.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  // ===============================
  // Register
  // ===============================

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);

      if (response.success) {
        return {
          success: true,
          message: 'Please verify your email before login.',
        };
      }

      return { success: false, error: response.error };
    } catch (error) {
      console.error('Register error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  // ===============================
  // Logout
  // ===============================

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  // ===============================
  // Refresh User
  // ===============================

  const refreshUser = async () => {
    await fetchUser();
  };

  // ===============================
  // Provider
  // ===============================

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ===============================
// useAuth Hook
// ===============================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
