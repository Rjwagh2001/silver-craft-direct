import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

/**
 * Hook to automatically sync cart when user logs in
 * Place this in App.tsx or a layout component
 */
export const useCartSync = () => {
  const { isAuthenticated } = useAuth();
  const { syncCart, items } = useCart();

  useEffect(() => {
    // When user logs in and has items in local cart
    if (isAuthenticated && items.length > 0) {
      const hasLocalItems = localStorage.getItem('laxmi_silver_cart');
      
      if (hasLocalItems) {
        // Sync local cart to backend
        syncCart().catch(error => {
          console.error('Failed to sync cart:', error);
        });
      }
    }
  }, [isAuthenticated]); // Only run when authentication status changes
};