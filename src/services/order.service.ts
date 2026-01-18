import { api } from '@/lib/api';
import { Address } from './auth.service';

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    images: Array<{ url: string }>;
    price: { sellingPrice: number };
  };
  quantity: number;
  price: number;
}

// ✅ NEW: Order item for creating orders (simplified format)
export interface CreateOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight?: number;
  image?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  orderStatus:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  statusHistory: Array<{
    status: string;
    note?: string;
    updatedAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// ✅ FIXED: Added items array
export interface CreateOrderData {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: 'online' | 'cod';
  items: CreateOrderItem[]; // ⭐ THIS WAS MISSING!
  notes?: string;
  couponCode?: string;
}

export const orderService = {
  async create(data: CreateOrderData) {
    return api.post<{ order: Order }>('/orders/create', data);
  },

  async getAll() {
    return api.get<{ orders: Order[] }>('/orders');
  },

  async getById(id: string) {
    return api.get<{ order: Order }>(`/orders/${id}`);
  },

  async cancel(id: string, reason: string) {
    return api.put<{ order: Order }>(`/orders/${id}/cancel`, { reason });
  },

  // Admin methods
  async getAllAdmin(filters?: { status?: string; page?: number; limit?: number }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, String(value));
      });
    }
    return api.get<{ orders: Order[]; pagination: unknown }>(
      `/orders/all/orders?${params.toString()}`
    );
  },

  async updateStatus(id: string, status: string, note?: string) {
    return api.put<{ order: Order }>(`/orders/${id}/status`, { status, note });
  },
};