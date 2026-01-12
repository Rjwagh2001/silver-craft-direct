// ===============================
// Axios API Instance
// ===============================

// Import configured Axios instance
// This already has:
// - baseURL (VITE_API_URL)
// - interceptors (auth headers, error handling)
import { api } from '@/lib/api';


// ===============================
// User & Related Types
// ===============================

// User interface representing backend user document
export interface User {
  _id: string;                      // MongoDB user ID
  name: string;                     // Full name (first + last)
  email: string;                    // User email
  phone?: string;                   // Optional phone number
  role: 'customer' | 'admin';       // User role for authorization
  avatar?: string;                  // Optional profile image
  addresses?: Address[];            // User addresses
  createdAt: string;                // Account creation timestamp
}


// Address interface (used in profile / checkout)
export interface Address {
  _id?: string;                     // MongoDB address ID
  name: string;                     // Recipient name
  phone: string;                    // Contact phone number
  street: string;                   // Street address
  city: string;                     // City
  state: string;                    // State
  pincode: string;                  // Postal code
  country: string;                  // Country
  isDefault?: boolean;              // Default address flag
}


// ===============================
// Auth Payload Types
// ===============================

// Login payload structure
export interface LoginCredentials {
  email: string;                    // User email
  password: string;                 // User password
}


// Register payload structure (from frontend form)
export interface RegisterData {
  firstName: string;                // First name
  lastName: string;                 // Last name
  email: string;                    // Email
  password: string;                 // Password
  phone?: string;                   // Optional phone number
}


// ===============================
// Auth API Response Type
// ===============================

// Expected authentication response from backend
export interface AuthResponse {
  user: User;                       // Authenticated user data
  accessToken: string;              // Short-lived JWT token
  refreshToken: string;             // Long-lived refresh token
}


// ===============================
// Auth Service (API Layer)
// ===============================

// authService handles ALL authentication-related API calls
export const authService = {

  // -------------------------------
  // Login API
  // -------------------------------
  async login(credentials: LoginCredentials) {

    // Send login request to backend
    // POST /api/v1/auth/login
    const response = await api.post<AuthResponse>(
      '/auth/login',
      credentials
    );

    // If login succeeds, store tokens locally
    if (response.success && response.data) {
      const { accessToken, refreshToken } =
        response.data as unknown as AuthResponse;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    // Return full response to AuthContext
    return response;
  },


  // -------------------------------
  // Register API
  // -------------------------------
  async register(data: RegisterData) {

    // Send signup request to backend
    // POST /api/v1/auth/signup
    const response = await api.post<AuthResponse>(
      '/auth/register',
      {
        // Backend expects single "name" field
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        password: data.password,
        phone: data.phone || '',
      }
    );

    // If registration succeeds, store tokens
    if (response.success && response.data) {
      const { accessToken, refreshToken } =
        response.data as unknown as AuthResponse;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    // Return response to AuthContext
    return response;
  },


  // -------------------------------
  // Logout API
  // -------------------------------
  async logout() {

    // Notify backend about logout (optional)
    // POST /api/v1/auth/logout
    await api.post('/auth/logout');

    // Clear tokens from browser storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },


  // -------------------------------
  // Get Logged-in User Profile
  // -------------------------------
  async getProfile() {

    // Fetch user profile using access token
    // GET /api/v1/auth/me
    return api.get<{ user: User }>('/auth/me');
  },


  // -------------------------------
  // Update User Profile
  // -------------------------------
  async updateProfile(data: Partial<User>) {

    // Update user profile fields
    // PUT /api/v1/auth/profile
    return api.put<{ user: User }>('/auth/profile', data);
  },


  // -------------------------------
  // Refresh Access Token
  // -------------------------------
  async refreshToken() {

    // Read refresh token from local storage
    const refreshToken = localStorage.getItem('refreshToken');

    // If no refresh token, abort
    if (!refreshToken) {
      return { success: false, error: 'No refresh token' };
    }

    // Request new access token
    // POST /api/v1/auth/refresh-token
    const response = await api.post<{ accessToken: string }>(
      '/auth/refresh-token',
      { refreshToken }
    );

    // Store new access token if successful
    if (response.success && response.data) {
      const { accessToken } =
        response.data as unknown as { accessToken: string };

      localStorage.setItem('accessToken', accessToken);
    }

    return response;
  },


  // -------------------------------
  // Check Authentication Status
  // -------------------------------
  isAuthenticated(): boolean {

    // User is authenticated if access token exists
    return !!localStorage.getItem('accessToken');
  },
};
