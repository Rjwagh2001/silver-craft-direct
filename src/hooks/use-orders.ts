import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService, CreateOrderData, Order } from '@/services/order.service';

// Hook to fetch user's orders
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await orderService.getAll();
      if (response.success && response.data) {
        return (response.data as { orders: Order[] }).orders;
      }
      throw new Error(response.error || 'Failed to fetch orders');
    },
    staleTime: 2 * 60 * 1000,
  });
};

// Hook to fetch a single order
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const response = await orderService.getById(orderId);
      if (response.success && response.data) {
        return (response.data as { order: Order }).order;
      }
      throw new Error(response.error || 'Order not found');
    },
    enabled: !!orderId,
    staleTime: 1 * 60 * 1000,
  });
};

// Hook to create an order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateOrderData) => {
      // ⭐ DEBUG: Log what we're about to send to the service
      console.log('🎯 use-orders hook received:', JSON.stringify(data, null, 2));
      console.log('🔍 Payment method in hook:', data.paymentMethod);
      
      const response = await orderService.create(data);
      
      if (response.success && response.data) {
        return (response.data as { order: Order }).order;
      }
      throw new Error(response.error || 'Failed to create order');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

// Hook to cancel an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, reason }: { orderId: string; reason: string }) => {
      const response = await orderService.cancel(orderId, reason);
      if (response.success && response.data) {
        return (response.data as { order: Order }).order;
      }
      throw new Error(response.error || 'Failed to cancel order');
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
    },
  });
};