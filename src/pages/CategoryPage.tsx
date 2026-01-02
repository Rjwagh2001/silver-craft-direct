import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories, getCategoryBySlug } from '@/data/categories';
import { products, getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Helmet } from 'react-helmet-async';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const currentCategory = category ? getCategoryBySlug(category) : null;
  const categoryProducts = category ? getProductsByCategory(category) : products;

  const sortedProducts = useMemo(() => {
    let sorted = [...categoryProducts];
    
    // Filter by price
    sorted = sorted.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted = sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
        break;
      case 'featured':
      default:
        sorted = sorted.filter(p => p.isBestseller).concat(sorted.filter(p => !p.isBestseller));
    }
    
    return sorted;
  }, [categoryProducts, sortBy, priceRange]);

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
            { label: 'Under ₹2,000', range: [0, 2000] as [number, number] },
            { label: '₹2,000 - ₹5,000', range: [2000, 5000] as [number, number] },
            { label: '₹5,000 - ₹10,000', range: [5000, 10000] as [number, number] },
            { label: 'Above ₹10,000', range: [10000, 50000] as [number, number] },
          ].map(({ label, range }) => (
            <button
              key={label}
              onClick={() => setPriceRange(range)}
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
        onClick={() => {
          setPriceRange([0, 50000]);
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{currentCategory ? `${currentCategory.name} — Laxmi Jewellers` : 'All Collections — Laxmi Jewellers'}</title>
        <meta 
          name="description" 
          content={currentCategory?.description || 'Explore our complete collection of premium 92.5 sterling silver jewellery.'} 
        />
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />

        <main className="flex-1">
          {/* Hero Banner */}
          <div className="relative h-40 sm:h-48 md:h-64 bg-gradient-to-r from-primary/10 via-background to-primary/5 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80')] bg-cover bg-center opacity-10" />
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
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {currentCategory?.name || 'All Collections'}
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base max-w-xl line-clamp-2">
                {currentCategory?.description || 'Explore our complete collection of premium 92.5 sterling silver jewellery.'}
              </p>
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
                      {sortedProducts.length} products
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
                          onChange={(e) => setSortBy(e.target.value as SortOption)}
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

                  {/* Products Grid */}
                  {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                      {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 sm:py-16">
                      <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                      <Button variant="luxury-outline" onClick={() => setPriceRange([0, 50000])}>
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Category Grid (when showing all) */}
          {!category && (
            <section className="py-8 sm:py-12 bg-muted/20">
              <div className="container mx-auto px-4">
                <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-center mb-6 sm:mb-8">Shop by Category</h2>
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
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CategoryPage;
