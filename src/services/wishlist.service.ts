import { api } from '@/lib/api';
import { ApiProduct } from './product.service';

export interface WishlistItem {
  _id: string;
  product: ApiProduct;
  addedAt: string;
}

export interface Wishlist {
  _id: string;
  user: string;
  items: WishlistItem[];
}

export const wishlistService = {
  async get() {
    return api.get<{ wishlist: Wishlist }>('/wishlist');
  },

  async add(productId: string) {
    return api.post<{ wishlist: Wishlist }>('/wishlist/add', { productId });
  },

  async remove(productId: string) {
    return api.delete<{ wishlist: Wishlist }>(`/wishlist/remove/${productId}`);
  },

  async clear() {
    return api.delete<{ message: string }>('/wishlist/clear');
  },

  async isInWishlist(productId: string) {
    return api.get<{ inWishlist: boolean }>(`/wishlist/check/${productId}`);
  },
};
