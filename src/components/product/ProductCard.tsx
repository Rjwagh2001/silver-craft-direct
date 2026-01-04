import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { addItem } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your shopping bag.`,
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-medium"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Badges - Simplified */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1 sm:gap-2">
        {product.isNew && (
          <span className="bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="bg-green-600 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded">
            {discount}% OFF
          </span>
        )}
        {product.isBestseller && !product.isNew && (
          <span className="bg-amber-500 text-white text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex flex-col gap-1 sm:gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
        <button 
          className="p-1.5 sm:p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft"
          aria-label="Add to wishlist"
        >
          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
        <Link 
          to={`/product/${product.slug}`}
          className="p-1.5 sm:p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors shadow-soft"
          aria-label="Quick view"
        >
          <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content - Simplified (removed 925 Silver & Weight) */}
      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm sm:text-base line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="font-semibold text-base sm:text-lg text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button - Improved spacing */}
        <div className="mt-4 pt-3 border-t border-border/50">
          <Button
            variant="luxury-outline"
            size="sm"
            className="w-full text-xs sm:text-sm h-10"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;