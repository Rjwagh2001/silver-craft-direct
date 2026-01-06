import { api } from '@/lib/api';
import { ApiProduct } from './product.service';

export interface CartItem {
  _id: string;
  product: ApiProduct;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  async get() {
    return api.get<{ cart: Cart }>('/cart');
  },

  async addItem(productId: string, quantity: number = 1) {
    return api.post<{ cart: Cart }>('/cart/add', { productId, quantity });
  },

  async updateItem(itemId: string, quantity: number) {
    return api.put<{ cart: Cart }>(`/cart/update/${itemId}`, { quantity });
  },

  async removeItem(itemId: string) {
    return api.delete<{ cart: Cart }>(`/cart/remove/${itemId}`);
  },

  async clear() {
    return api.delete<{ message: string }>('/cart/clear');
  },
};
