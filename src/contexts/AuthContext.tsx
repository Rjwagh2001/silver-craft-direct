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
// Auth Context Type Definition
// ===============================

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}


// ===============================
// Create Auth Context
// ===============================

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// ===============================
// Helper: Extract user from API response
// ===============================

const extractUserFromResponse = (data: unknown): User | null => {
  if (!data) return null;
  
  const responseData = data as Record<string, unknown>;
  
  // Handle nested response: { success: true, data: { user: {...} } }
  if (responseData.data && typeof responseData.data === 'object') {
    const innerData = responseData.data as Record<string, unknown>;
    if (innerData.user) {
      return innerData.user as User;
    }
  }
  
  // Handle direct user object: { user: {...} }
  if (responseData.user) {
    return responseData.user as User;
  }
  
  return null;
};


// ===============================
// Auth Provider Component
// ===============================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  // ===============================
  // Fetch Logged-in User
  // ===============================
  const fetchUser = async (): Promise<boolean> => {
    try {
      const response = await authService.getProfile();

      console.log('getProfile response:', response);

      if (response.success && response.data) {
        const userData = extractUserFromResponse(response.data);
        
        if (userData) {
          setUser(userData);
          return true;
        }
      }
      
      // Access token might be expired, try refreshing token
      const refreshResponse = await authService.refreshToken();

      if (refreshResponse.success) {
        const profileResponse = await authService.getProfile();

        if (profileResponse.success && profileResponse.data) {
          const userData = extractUserFromResponse(profileResponse.data);
          if (userData) {
            setUser(userData);
            return true;
          }
        }
      }
      
      // Refresh failed - clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      return false;
      
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      return false;
    }
  };


  // ===============================
  // Run fetchUser on App Load
  // ===============================
  useEffect(() => {
    const initAuth = async () => {
      if (!authService.isAuthenticated()) {
        setIsLoading(false);
        return;
      }

      await fetchUser();
      setIsLoading(false);
    };

    initAuth();
  }, []);


  // ===============================
  // Login Function
  // ===============================
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);

      console.log('login response:', response);

      if (response.success && response.data) {
        const userData = extractUserFromResponse(response.data);
        
        if (userData) {
          setUser(userData);
          console.log('User set after login:', userData);
          return { success: true };
        }
      }

      return { success: false, error: response.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };


  // ===============================
  // Register Function
  // ===============================
  const register = async (data: RegisterData) => {
    const response = await authService.register(data);

    if (response.success && response.data) {
      const userData = extractUserFromResponse(response.data);
      
      if (userData) {
        setUser(userData);
        return { success: true };
      }
    }

    return { success: false, error: response.error };
  };


  // ===============================
  // Logout Function
  // ===============================
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };


  // ===============================
  // Refresh User Manually
  // ===============================
  const refreshUser = async () => {
    await fetchUser();
  };


  // ===============================
  // Context Provider
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
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
