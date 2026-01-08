import { api } from '@/lib/api';

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

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data as unknown as AuthResponse;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
  },

  async register(data: RegisterData) {
    const response = await api.post<AuthResponse>('/auth/register', data);
    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data as unknown as AuthResponse;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }
    return response;
  },

  async logout() {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  async getProfile() {
    return api.get<{ user: User }>('/auth/me');
  },

  async updateProfile(data: Partial<User>) {
    return api.put<{ user: User }>('/auth/profile', data);
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return { success: false, error: 'No refresh token' };

    const response = await api.post<{ accessToken: string }>('/auth/refresh-token', {
      refreshToken,
    });

    if (response.success && response.data) {
      const { accessToken } = response.data as unknown as { accessToken: string };
      localStorage.setItem('accessToken', accessToken);
    }
    return response;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  },
};
