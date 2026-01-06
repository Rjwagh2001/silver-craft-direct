import { useQuery } from '@tanstack/react-query';
import { productService, mapApiProductToProduct, ApiProduct } from '@/services/product.service';
import { categoryService, mapApiCategoryToCategory, ApiCategory } from '@/services/category.service';
import { Product, Category } from '@/types/product';

// Hook to fetch all products with filters
export const useProducts = (filters?: {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      const response = await productService.getAll(filters);
      if (response.success && response.data) {
        const data = response.data as { products: ApiProduct[]; pagination: unknown };
        return {
          products: data.products.map(mapApiProductToProduct),
          pagination: data.pagination,
        };
      }
      throw new Error(response.error || 'Failed to fetch products');
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch a single product by slug
export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await productService.getBySlug(slug);
      if (response.success && response.data) {
        const data = response.data as { product: ApiProduct };
        return mapApiProductToProduct(data.product);
      }
      throw new Error(response.error || 'Product not found');
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: async () => {
      const response = await productService.getFeatured();
      if (response.success && response.data) {
        const data = response.data as { products: ApiProduct[] };
        return data.products.map(mapApiProductToProduct);
      }
      throw new Error(response.error || 'Failed to fetch featured products');
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to search products
export const useProductSearch = (query: string) => {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: async () => {
      const response = await productService.search(query);
      if (response.success && response.data) {
        const data = response.data as { products: ApiProduct[] };
        return data.products.map(mapApiProductToProduct);
      }
      throw new Error(response.error || 'Search failed');
    },
    enabled: query.length >= 2,
    staleTime: 2 * 60 * 1000,
  });
};

// Hook to fetch products by category
export const useProductsByCategory = (category: string, filters?: {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  return useQuery({
    queryKey: ['products', 'category', category, filters],
    queryFn: async () => {
      const response = await productService.getByCategory(category, filters);
      if (response.success && response.data) {
        const data = response.data as { products: ApiProduct[]; pagination: unknown };
        return {
          products: data.products.map(mapApiProductToProduct),
          pagination: data.pagination,
        };
      }
      throw new Error(response.error || 'Failed to fetch products');
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryService.getAll();
      if (response.success && response.data) {
        const data = response.data as { categories: ApiCategory[] };
        return data.categories.map(mapApiCategoryToCategory);
      }
      throw new Error(response.error || 'Failed to fetch categories');
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to fetch a single category
export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const response = await categoryService.getBySlug(slug);
      if (response.success && response.data) {
        const data = response.data as { category: ApiCategory };
        return mapApiCategoryToCategory(data.category);
      }
      throw new Error(response.error || 'Category not found');
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
};
