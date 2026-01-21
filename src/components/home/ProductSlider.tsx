import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useRef } from "react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
  showNewBadge?: boolean;
  isLoading?: boolean;
}

const ProductSlider = ({ 
  title, 
  subtitle, 
  products, 
  showNewBadge = false,
  isLoading = false 
}: ProductSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header - Centered */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-2">
            {showNewBadge ? "Just Arrived" : "Trending Now"}
          </p>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic">
              "{subtitle}"
            </p>
          )}
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-primary/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[220px] animate-pulse"
              >
                <div className="aspect-square rounded-lg sm:rounded-xl bg-secondary/50 mb-2 sm:mb-3" />
                <div className="space-y-2">
                  <div className="h-4 bg-secondary/50 rounded w-full" />
                  <div className="h-3 bg-secondary/50 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Navigation Arrows - Desktop */}
            <div className="hidden sm:flex justify-end gap-2 mb-4">
              <button
                onClick={() => scroll("left")}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Products Slider */}
            <div
              ref={scrollRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0"
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[220px] group"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-secondary/30 mb-2 sm:mb-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {showNewBadge && product.isNew && (
                          <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5">
                            NEW
                          </Badge>
                        )}
                        {product.isBestseller && !showNewBadge && (
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                            Bestseller
                          </Badge>
                        )}
                      </div>

                      {/* Quick View */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-1.5 text-white text-sm font-medium">
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-1">
                      <h3 className="font-medium text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">
                        {product.weight} · {product.purity}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full text-center py-8 text-muted-foreground">
                  No products available
                </div>
              )}
            </div>

            {/* View All Link */}
            {products.length > 0 && (
              <div className="text-center mt-6">
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View All Products
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;