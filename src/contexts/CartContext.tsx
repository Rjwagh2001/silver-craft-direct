import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '@/types/product';
import { cartService } from '@/services/cart.service';
import { useAuth } from '@/contexts/AuthContext';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  isSyncing: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SYNCING'; payload: boolean };

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  syncCart: () => Promise<void>;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'laxmi_silver_cart';
const FREE_SHIPPING_THRESHOLD = 2000;
const SHIPPING_COST = 99;

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        isOpen: true
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.product.id !== action.payload.productId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SYNCING':
      return { ...state, isSyncing: action.payload };
    default:
      return state;
  }
};

// Helper function to transform backend cart item to frontend CartItem
const transformBackendItem = (item: any): CartItem => ({
  product: {
    id: item.product._id,
    _id: item.product._id,
    name: item.product.name,
    slug: item.product.slug || '',
    category: 'bangles' as any, // You may need to map this properly
    price: item.price,
    weight: `${item.product.weight || 0}g`,
    purity: item.product.purity || '92.5 Sterling Silver',
    description: item.product.description || '',
    images: item.product.images.map((img: any) => typeof img === 'string' ? img : img.url),
    inStock: item.product.stock?.isInStock || true,
    sku: item.product.sku || ''
  },
  quantity: item.quantity
});

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    isOpen: false,
    isLoading: false,
    isSyncing: false
  });
  const { isAuthenticated } = useAuth();

  // Load cart from backend or localStorage on mount
  useEffect(() => {
    const loadCart = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      if (isAuthenticated) {
        // Load from backend
        try {
          const response = await cartService.get();
          if (response.success && response.data) {
            const backendCart = response.data.cart;
            const cartItems: CartItem[] = backendCart.items.map(transformBackendItem);
            dispatch({ type: 'LOAD_CART', payload: cartItems });
          }
        } catch (error) {
          console.error('Error loading cart from backend:', error);
          // Fallback to localStorage
          loadLocalCart();
        }
      } else {
        // Load from localStorage for guest users
        loadLocalCart();
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    const loadLocalCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    };

    loadCart();
  }, [isAuthenticated]);

  // Save cart to localStorage for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [state.items, isAuthenticated]);

  // Sync local cart to backend when user logs in
  const syncCart = async () => {
    if (!isAuthenticated) return;

    const localCartItems = state.items;
    if (localCartItems.length === 0) return;

    dispatch({ type: 'SET_SYNCING', payload: true });

    try {
      // Sync all local items to backend
      const syncItems = localCartItems.map(item => ({
        productId: item.product._id,
        quantity: item.quantity
      }));

      const response = await cartService.syncCart(syncItems);
      
      if (response.success && response.data) {
        const backendCart = response.data.cart;
        const cartItems: CartItem[] = backendCart.items.map(transformBackendItem);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
        
        // Clear localStorage after successful sync
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    } finally {
      dispatch({ type: 'SET_SYNCING', payload: false });
    }
  };

  const addItem = async (product: Product, quantity: number = 1) => {
    if (isAuthenticated) {
      // Add to backend
      try {
        const productId = product._id;
        const response = await cartService.addItem(productId, quantity);
        
        if (response.success && response.data) {
          const backendCart = response.data.cart;
          const cartItems: CartItem[] = backendCart.items.map(transformBackendItem);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
          dispatch({ type: 'OPEN_CART' });
        }
      } catch (error) {
        console.error('Error adding item to backend cart:', error);
        throw error;
      }
    } else {
      // Add to local state for guest users
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  const removeItem = async (productId: string) => {
    if (isAuthenticated) {
      // Find the cart item to get its _id
      const cartItem = state.items.find(item => 
        item.product.id === productId || item.product._id === productId
      );
      
      if (!cartItem) return;

      try {
        // Use the backend cart item _id for deletion
        const itemId = (cartItem as any)._id || productId;
        const response = await cartService.removeItem(itemId);
        
        if (response.success && response.data) {
          const backendCart = response.data.cart;
          const cartItems: CartItem[] = backendCart.items.map(transformBackendItem);
          dispatch({ type: 'LOAD_CART', payload: cartItems });
        }
      } catch (error) {
        console.error('Error removing item from backend cart:', error);
        throw error;
      }
    } else {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (isAuthenticated) {
      // Find the cart item to get its _id
      const cartItem = state.items.find(item => 
        item.product.id === productId || item.product._id === productId
      );
      
      if (!cartItem) return;

      try {
        if (quantity <= 0) {
          await removeItem(productId);
        } else {
          const itemId = (cartItem as any)._id || productId;
          const response = await cartService.updateItem(itemId, quantity);
          
          if (response.success && response.data) {
            const backendCart = response.data.cart;
            const cartItems: CartItem[] = backendCart.items.map(transformBackendItem);
            dispatch({ type: 'LOAD_CART', payload: cartItems });
          }
        }
      } catch (error) {
        console.error('Error updating quantity in backend cart:', error);
        throw error;
      }
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await cartService.clear();
        dispatch({ type: 'CLEAR_CART' });
      } catch (error) {
        console.error('Error clearing backend cart:', error);
        throw error;
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  };

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
        syncCart,
        totalItems,
        subtotal,
        shipping,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};