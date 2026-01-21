import { api } from '@/lib/api';
import { ApiProduct } from './product.service';

export interface CartItem {
  _id?: string; // Backend cart item ID (for update/delete operations)
  product: ApiProduct;
  quantity: number;
  price: number;
  addedAt?: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export const cartService = {
  /**
   * Get the current user's cart
   */
  async get() {
    return api.get<{ cart: Cart }>('/cart');
  },

  /**
   * Add an item to the cart
   * @param productId - The product ID to add
   * @param quantity - Quantity to add (default: 1)
   */
  async addItem(productId: string, quantity: number = 1) {
    return api.post<{ cart: Cart }>('/cart/add', { productId, quantity });
  },

  /**
   * Update the quantity of a cart item
   * @param itemId - The cart item ID (not product ID)
   * @param quantity - New quantity
   */
  async updateItem(itemId: string, quantity: number) {
    return api.put<{ cart: Cart }>(`/cart/update/${itemId}`, { quantity });
  },

  /**
   * Remove an item from the cart
   * @param itemId - The cart item ID (not product ID)
   */
  async removeItem(itemId: string) {
    return api.delete<{ cart: Cart }>(`/cart/remove/${itemId}`);
  },

  /**
   * Clear the entire cart
   */
  async clear() {
    return api.delete<{ message: string }>('/cart/clear');
  },

  /**
   * Sync local cart items to backend cart
   * This clears the backend cart and adds all local items
   * @param items - Array of items with productId and quantity
   */
  async syncCart(items: Array<{ productId: string; quantity: number }>) {
    // First clear the existing backend cart
    await api.delete<{ message: string }>('/cart/clear');
    
    // Then add each item from local cart
    for (const item of items) {
      await api.post<{ cart: Cart }>('/cart/add', { 
        productId: item.productId, 
        quantity: item.quantity 
      });
    }
    
    // Return the updated cart
    return api.get<{ cart: Cart }>('/cart');
  },
};