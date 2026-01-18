import { api } from '@/lib/api';

// Address format expected by backend
export interface OrderAddress {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

// Order item in API response
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight?: number;
  image?: string;
  _id?: string;
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
  userId: string;
  items: OrderItem[];
  pricing: {
    subtotal: number;
    makingCharges: number;
    gst: number;
    shippingCharges: number;
    discount: number;
    total: number;
  };
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  payment: {
    method: 'online' | 'cod';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    paidAt?: string;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  statusHistory: Array<{
    status: string;
    note?: string;
    updatedBy?: string;
    timestamp: string;
  }>;
  tracking?: {
    courier?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    trackingUrl?: string;
  };
  notes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
}

// Order item payload for creating orders
export interface OrderItemData {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  weight: number;
  image: string;
}

// ✅ FIXED: Added items array
export interface CreateOrderData {
  shippingAddress: Address;
  paymentMethod: 'online' | 'cod';
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