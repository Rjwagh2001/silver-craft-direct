// ===============================
// Axios API Instance
// ===============================

import { api } from '@/lib/api';


// ===============================
// User & Related Types
// ===============================

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface Address {
  _id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}


// ===============================
// Auth Payload Types
// ===============================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}


// ===============================
// Auth API Response Type
// ===============================

export interface AuthResponse {
  user: User;
  accessToken: string;
}


// ===============================
// Auth Service (API Layer)
// ===============================

export const authService = {

  // -------------------------------
  // Login API
  // -------------------------------
  async login(credentials: LoginCredentials) {
    const response = await api.post<AuthResponse>(
      '/auth/login',
      credentials
    );

    if (response.success && response.data) {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
    }

    return response;
  },


  // -------------------------------
  // Register API
  // -------------------------------
  async register(data: RegisterData) {
    return api.post<AuthResponse>(
      '/auth/register',
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone || '',
      }
    );
  },


  // -------------------------------
  // Logout API
  // -------------------------------
  async logout() {
    await api.post('/auth/logout');

    // ❌ Only remove access token
    localStorage.removeItem('accessToken');
  },


  // -------------------------------
  // Get Logged-in User Profile
  // -------------------------------
  async getProfile() {
    return api.get<{ user: User }>('/auth/me');
  },


  // -------------------------------
  // Refresh Access Token
  // -------------------------------
  async refreshToken() {
    // ✅ NO BODY
    // ✅ Refresh token sent automatically via cookie
    const response = await api.post<{ accessToken: string }>(
      '/auth/refresh-token'
    );

    if (response.success && response.data) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }

    return response;
  },


  // -------------------------------
  // Check Authentication Status
  // -------------------------------
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};
