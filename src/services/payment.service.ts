import { api } from '@/lib/api';

export interface RazorpayOrder {
  orderId: string;
  razorpayOrderId: string;
  amount: number; // in paise
  currency: string;
  keyId: string;
}

export interface PaymentVerification {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export const paymentService = {
  async createOrder(orderId: string) {
    // API already unwraps nested data, so we get RazorpayOrder directly
    return api.post<RazorpayOrder>('/payments/create-order', { orderId });
  },

  async verifyPayment(data: PaymentVerification) {
    return api.post<{ order: unknown }>('/payments/verify', data);
  },

  async getStatus(orderId: string) {
    return api.get<{ paymentStatus: string; amount: number }>(
      `/payments/${orderId}/status`
    );
  },

  // Razorpay checkout integration
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as unknown as { Razorpay: unknown }).Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  },

  async initiatePayment(
    razorpayOrder: RazorpayOrder,
    userDetails: { name: string; email: string; phone: string },
    onSuccess: (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) => void,
    onError: (error: unknown) => void
  ) {
    const loaded = await this.loadRazorpayScript();
    if (!loaded) {
      onError(new Error('Failed to load Razorpay SDK'));
      return;
    }

    const options = {
      key: razorpayOrder.keyId,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: 'Laxmi Silver',
      description: 'Premium Silver Jewellery',
      order_id: razorpayOrder.razorpayOrderId,
      handler: onSuccess,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      notes: {
        orderId: razorpayOrder.orderId,
      },
      theme: {
        color: '#991B1B',
      },
      modal: {
        ondismiss: () => onError(new Error('Payment cancelled by user')),
      },
    };

    const Razorpay = (
      window as unknown as {
        Razorpay: new (options: unknown) => { open: () => void };
      }
    ).Razorpay;

    const rzp = new Razorpay(options);
    rzp.open();
  },
};
