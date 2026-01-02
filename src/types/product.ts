export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  weight: string;
  purity: string;
  description: string;
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  sku: string;
}

export type ProductCategory = 
  | 'bangles' 
  | 'rings' 
  | 'chains' 
  | 'anklets' 
  | 'earrings' 
  | 'bracelets' 
  | 'bridal';

export interface Category {
  id: string;
  name: string;
  slug: ProductCategory;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Address {
  id?: string;
  name: string;
  mobile: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  address: Address;
  subtotal: number;
  shipping: number;
  total: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentId?: string;
  createdAt: string;
}
