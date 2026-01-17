import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, ChevronDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCategoryWithProducts, useCategories } from '@/hooks/use-products';
import ProductCard from '@/components/product/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';
const PRODUCTS_PER_PAGE = 10;

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories for sidebar
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  // Fetch category with products from backend
  const { 
    data: categoryData, 
    isLoading: categoryLoading, 
    error: categoryError 
  } = useCategoryWithProducts(category, {
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 50000 ? priceRange[1] : undefined,
    sort: sortBy === 'price-low' ? 'price' : sortBy === 'price-high' ? '-price' : sortBy === 'newest' ? '-createdAt' : '-isFeatured',
  });

  const currentCategory = categoryData?.category;
  const products = categoryData?.products || [];
  const pagination = categoryData?.pagination;
  const totalPages = pagination?.pages || 1;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, priceRange, sortBy]);

  const handleFilterChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">Categories</h4>
        <div className="space-y-2">
          <Link
            to="/collections"
            className={`block py-1.5 sm:py-2 text-sm transition-colors ${
              !category ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All Collections
          </Link>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/collections/${cat.slug}`}
              className={`block py-1.5 sm:py-2 text-sm transition-colors ${
                category === cat.slug ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.name} ({cat.productCount})
            </Link>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-sm sm:text-base mb-3 sm:mb-4">Price Range</h4>
        <div className="space-y-2">
          {[
            { label: 'All Prices', range: [0, 50000] as [number, number] },
            { label: 'Under ₹2,000', range: [0, 2000] as [number, number] },
            { label: '₹2,000 - ₹5,000', range: [2000, 5000] as [number, number] },
            { label: '₹5,000 - ₹10,000', range: [5000, 10000] as [number, number] },
            { label: 'Above ₹10,000', range: [10000, 50000] as [number, number] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => handleFilterChange(range)}
              className={`block w-full text-left py-1.5 sm:py-2 text-sm transition-colors ${
                priceRange[0] === range[0] && priceRange[1] === range[1]
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => handleFilterChange([0, 50000])}
      >
        Clear Filters
      </Button>
    </div>
  );

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }
    return pages;
  };

  const isLoading = categoryLoading || categoriesLoading;

  // If no category slug, show all categories grid
  if (!category) {
    return (
      <>
        <Helmet>
          <title>All Collections — Laxmi Silver</title>
          <meta name="description" content="Explore our complete collection of premium 92.5 sterling silver jewellery." />
        </Helmet>

        <div className="min-h-screen flex flex-col overflow-x-hidden pb-16 md:pb-0">
          <Navbar />

          <main className="flex-1">
            {/* Hero Banner */}
            <div className="relative h-40 sm:h-48 md:h-64 bg-gradient-to-r from-primary/10 via-background to-primary/5 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')] bg-cover bg-center opacity-10" />
              <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                  <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-foreground">Collections</span>
                </nav>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">All Collections</h1>
                <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base max-w-xl">
                  Explore our complete collection of premium 92.5 sterling silver jewellery.
                </p>
              </div>
            </div>

            {/* Categories Grid */}
            <section className="py-8 sm:py-12">
              <div className="container mx-auto px-4">
                {categoriesLoading ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="aspect-square rounded-lg" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {categories.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/collections/${cat.slug}`}
                        className="group relative aspect-square overflow-hidden rounded-lg"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                          <h3 className="font-serif text-white text-base sm:text-lg md:text-xl">{cat.name}</h3>
                          <p className="text-white/70 text-xs sm:text-sm mt-0.5 sm:mt-1">{cat.productCount} Products</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </main>

          <Footer />
          <MobileBottomNav />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} — Laxmi Silver` : 'Loading... — Laxmi Silver'}</title>
        <meta 
          name="description" 
          content={currentCategory?.description || 'Explore our premium 92.5 sterling silver jewellery collection.'} 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-x-hidden pb-16 md:pb-0">
        <Navbar />

        <main className="flex-1">
          {/* Hero Banner */}
          <div className="relative h-40 sm:h-48 md:h-64 bg-gradient-to-r from-primary/10 via-background to-primary/5 overflow-hidden">
            {currentCategory?.image && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${currentCategory.image})` }}
              />
            )}
            <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
              <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
                {currentCategory && (
                  <>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="text-foreground">{currentCategory.name}</span>
                  </>
                )}
              </nav>
              {isLoading ? (
                <>
                  <Skeleton className="h-8 sm:h-10 md:h-12 w-48 sm:w-64" />
                  <Skeleton className="h-4 sm:h-5 w-64 sm:w-96 mt-2" />
                </>
              ) : (
                <>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    {currentCategory?.name || 'Collection'}
                  </h1>
                  <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base max-w-xl line-clamp-2">
                    {currentCategory?.description || 'Explore our premium collection.'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Products Section */}
          <section className="py-6 sm:py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block w-64 shrink-0">
                  <div className="sticky top-24">
                    <FilterContent />
                  </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                  {/* Toolbar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <p className="text-sm text-muted-foreground">
                      {isLoading ? (
                        'Loading products...'
                      ) : (
                        `Showing ${products.length} of ${pagination?.total || products.length} products`
                      )}
                    </p>
                    
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Mobile Filter Button */}
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="outline" size="sm" className="lg:hidden">
                            <Filter className="h-4 w-4 mr-1.5 sm:mr-2" />
                            Filters
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                          <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <FilterContent />
                          </div>
                        </SheetContent>
                      </Sheet>

                      {/* Sort Dropdown */}
                      <div className="relative">
                        <select
                          value={sortBy}
                          onChange={(e) => handleSortChange(e.target.value as SortOption)}
                          className="appearance-none bg-background border border-input rounded-md px-3 sm:px-4 py-1.5 sm:py-2 pr-8 sm:pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="featured">Featured</option>
                          <option value="newest">Newest</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Loading State */}
                  {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-3">
                          <Skeleton className="aspect-square rounded-lg" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Error State */}
                  {categoryError && !isLoading && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        Unable to load products. Please try again later.
                      </p>
                      <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                      </Button>
                    </div>
                  )}

                  {/* Products Grid */}
                  {!isLoading && !categoryError && products.length > 0 && (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                        {products.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="mt-8 sm:mt-12">
                          <Pagination>
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious 
                                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                              </PaginationItem>
                              
                              {getPageNumbers().map((page, index) => (
                                <PaginationItem key={index}>
                                  {page === 'ellipsis' ? (
                                    <PaginationEllipsis />
                                  ) : (
                                    <PaginationLink
                                      onClick={() => setCurrentPage(page)}
                                      isActive={currentPage === page}
                                      className="cursor-pointer"
                                    >
                                      {page}
                                    </PaginationLink>
                                  )}
                                </PaginationItem>
                              ))}
                              
                              <PaginationItem>
                                <PaginationNext 
                                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        </div>
                      )}
                    </>
                  )}

                  {/* No Products */}
                  {!isLoading && !categoryError && products.length === 0 && (
                    <div className="text-center py-12 sm:py-16">
                      <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                      <Button variant="outline" onClick={() => handleFilterChange([0, 50000])}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default CategoryPage;
