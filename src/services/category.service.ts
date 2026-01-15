import { api } from '@/lib/api';

export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    publicId: string;
  };
  displayOrder: number;
  isActive: boolean;
  productCount: number;
  createdAt: string;
}

export const categoryService = {
  async getAll() {
    return api.get<{ categories: ApiCategory[] }>('/categories');
  },

  async getById(id: string) {
    return api.get<{ category: ApiCategory }>(`/categories/${id}`);
  },

  async getBySlug(slug: string) {
    return api.get<{ category: ApiCategory }>(`/categories/slug/${slug}`);
  },

  async getProductsBySlug(slug: string, filters: {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });
    const queryString = params.toString();
    return api.get<{
      category: ApiCategory;
      products: import('./product.service').ApiProduct[];
      pagination: {
        total: number;
        page: number;
        pages: number;
        limit: number;
      };
    }>(`/categories/slug/${slug}/products${queryString ? `?${queryString}` : ''}`);
  },

  // Admin methods
  async create(data: Partial<ApiCategory>) {
    return api.post<{ category: ApiCategory }>('/categories', data);
  },

  async update(id: string, data: Partial<ApiCategory>) {
    return api.put<{ category: ApiCategory }>(`/categories/${id}`, data);
  },

  async delete(id: string) {
    return api.delete(`/categories/${id}`);
  },
};

// Helper to convert API category to frontend Category type
export const mapApiCategoryToCategory = (apiCategory: ApiCategory) => ({
  id: apiCategory._id,
  name: apiCategory.name,
  slug: apiCategory.slug as 'bangles' | 'rings' | 'chains' | 'anklets' | 'earrings' | 'bracelets' | 'bridal',
  description: apiCategory.description || '',
  image: apiCategory.image?.url || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  productCount: apiCategory.productCount,
});
