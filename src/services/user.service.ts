import { api } from '@/lib/api';
import { User, Address } from './auth.service';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  // Update user profile
  async updateProfile(data: UpdateProfileData) {
    return api.put<{ user: User }>('/auth/update-profile', data);
  },

  // Change password
  async changePassword(data: ChangePasswordData) {
    return api.put<{ message: string }>('/auth/change-password', data);
  },

  // Address management
  async addAddress(address: Omit<Address, '_id'>) {
    return api.post<{ user: User }>('/auth/addresses', address);
  },

  async updateAddress(addressId: string, address: Partial<Address>) {
    return api.put<{ user: User }>(`/auth/addresses/${addressId}`, address);
  },

  async deleteAddress(addressId: string) {
    return api.delete<{ user: User }>(`/auth/addresses/${addressId}`);
  },

  async setDefaultAddress(addressId: string) {
    return api.put<{ user: User }>(`/auth/addresses/${addressId}/default`, {});
  },
};
