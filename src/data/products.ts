// Frontend Product Type (used in UI)
export interface Product {
  id: string;
  _id?: string; // Backend ID (optional, used for backend operations)
  name: string;
  slug: string;
  category: 'bangles' | 'rings' | 'chains' | 'anklets' | 'earrings' | 'bracelets' | 'bridal';
  price: number;
  originalPrice?: number;
  weight: string;
  purity: string;
  description: string;
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  featured?: boolean; // Added for getFeaturedProducts function
  sku: string;
}

// Cart Item Type
export interface CartItem {
  _id?: string; // Backend cart item ID (for update/remove)
  product: Product;
  quantity: number;
  addedAt?: string;
}

// Category Type
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}