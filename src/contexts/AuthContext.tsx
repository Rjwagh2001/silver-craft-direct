// ===============================
// React & Context Imports
// ===============================

// React core utilities
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

// Auth service and related types
// - authService: handles API calls
// - User: user type
// - LoginCredentials: login payload type
// - RegisterData: register payload type
import {
  authService,
  User,
  LoginCredentials,
  RegisterData,
} from '@/services/auth.service';


// ===============================
// Auth Context Type Definition
// ===============================

// Defines the shape of the AuthContext
// This ensures type safety across the app
interface AuthContextType {
  user: User | null;                     // Currently logged-in user
  isLoading: boolean;                    // Global auth loading state
  isAuthenticated: boolean;              // Derived boolean (user exists or not)
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    data: RegisterData
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;            // Logout function
  refreshUser: () => Promise<void>;       // Re-fetch user profile
}


// ===============================
// Create Auth Context
// ===============================

// Create context with undefined default
// This forces usage inside AuthProvider
const AuthContext = createContext<AuthContextType | undefined>(undefined);


// ===============================
// Auth Provider Component
// ===============================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  // Store authenticated user
  const [user, setUser] = useState<User | null>(null);

  // Global loading state while checking auth
  const [isLoading, setIsLoading] = useState(true);


  // ===============================
  // Fetch Logged-in User
  // ===============================
  const fetchUser = async (): Promise<boolean> => {
    try {
      // Try fetching user profile using access token
      const response = await authService.getProfile();

      if (response.success && response.data) {
        // Successfully fetched user
        setUser((response.data as { user: User }).user);
        return true;
      } else {
        // Access token might be expired, try refreshing token
        const refreshResponse = await authService.refreshToken();

        if (refreshResponse.success) {
          // Retry fetching profile after refreshing token
          const profileResponse = await authService.getProfile();

          if (profileResponse.success && profileResponse.data) {
            setUser((profileResponse.data as { user: User }).user);
            return true;
          }
        }
        // Refresh failed - clear invalid tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        return false;
      }
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
      // If no token exists, skip fetch and stop loading immediately
      if (!authService.isAuthenticated()) {
        setIsLoading(false);
        return;
      }

      // Token exists - try to fetch user
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
      // Call login API
      const response = await authService.login(credentials);

      if (response.success && response.data) {
        // Set logged-in user IMMEDIATELY from login response
        const userData = (response.data as { user: User }).user;
        setUser(userData);
        return { success: true };
      }

      // Login failed
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

    // Call register API
    const response = await authService.register(data);

    if (response.success && response.data) {
      // Set user after successful registration
      setUser((response.data as { user: User }).user);
      return { success: true };
    }

    // Registration failed
    return { success: false, error: response.error };
  };


  // ===============================
  // Logout Function
  // ===============================
  const logout = async () => {

    // Call logout API (optional server-side cleanup)
    await authService.logout();

    // Clear user from state
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
        user,                              // Current user
        isLoading,                        // Auth loading state
        isAuthenticated: !!user,          // Boolean auth status
        login,                            // Login method
        register,                         // Register method
        logout,                           // Logout method
        refreshUser,                      // Refresh user method
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// ===============================
// useAuth Hook
// ===============================

// Custom hook to access AuthContext safely
export const useAuth = (): AuthContextType => {

  const context = useContext(AuthContext);

  // Ensure hook is used inside AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
