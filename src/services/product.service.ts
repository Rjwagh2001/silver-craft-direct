import { api } from '@/lib/api';

export interface ApiProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  metal: string;
  purity: string;
  weight: number;
  makingCharges: number;
  gst: number;
  price: {
    basePrice: number;
    sellingPrice: number;
    discount: number;
  };
  images: Array<{
    url: string;
    publicId: string;
    isPrimary: boolean;
  }>;
  stock: {
    quantity: number;
    lowStockThreshold: number;
  };
  tags: string[];
  isActive: boolean;
  isFeatured: boolean;
  ratings: {
    average: number;
    count: number;
  };
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: ApiProduct[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  isFeatured?: boolean;
}

export const productService = {
  async getAll(filters: ProductFilters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });
    return api.get<ProductsResponse>(`/products?${params.toString()}`);
  },

  async getById(id: string) {
    return api.get<{ product: ApiProduct }>(`/products/${id}`);
  },

  async getBySlug(slug: string) {
    return api.get<{ product: ApiProduct }>(`/products/slug/${slug}`);
  },

  async getFeatured() {
    return api.get<{ products: ApiProduct[] }>('/products/featured');
  },

  async search(query: string) {
    return api.get<{ products: ApiProduct[] }>(`/products/search?q=${encodeURIComponent(query)}`);
  },

  async getByCategory(category: string, filters: ProductFilters = {}) {
    const params = new URLSearchParams({ category, ...filters as Record<string, string> });
    return api.get<ProductsResponse>(`/products?${params.toString()}`);
  },

  // Admin methods
  async create(data: Partial<ApiProduct>) {
    return api.post<{ product: ApiProduct }>('/products', data);
  },

  async update(id: string, data: Partial<ApiProduct>) {
    return api.put<{ product: ApiProduct }>(`/products/${id}`, data);
  },

  async delete(id: string) {
    return api.delete(`/products/${id}`);
  },

  async uploadImages(id: string, files: File[]) {
    return api.uploadImages(`/products/${id}/images`, files);
  },
};

// Helper to convert API product to frontend Product type
export const mapApiProductToProduct = (apiProduct: ApiProduct) => {
  // Prioritize isPrimary image first, then fallback to original order
  const sortedImages = [...apiProduct.images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return 0;
  });

  return {
    id: apiProduct._id,
    name: apiProduct.name,
    slug: apiProduct.slug,
    category: apiProduct.category.toLowerCase() as 'bangles' | 'rings' | 'chains' | 'anklets' | 'earrings' | 'bracelets' | 'bridal',
    price: apiProduct.price.sellingPrice,
    originalPrice: apiProduct.price.discount > 0 ? apiProduct.price.basePrice : undefined,
    weight: `${apiProduct.weight}g`,
    purity: apiProduct.purity,
    description: apiProduct.description,
    images: sortedImages.map(img => img.url),
    inStock: apiProduct.stock.quantity > 0,
    isNew: new Date(apiProduct.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days
    isBestseller: apiProduct.isFeatured,
    sku: apiProduct._id.slice(-8).toUpperCase(),
  };
};
