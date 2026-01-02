import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingBag, Truck, Shield, RotateCcw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Product Not Found</h1>
            <Button variant="luxury" asChild>
              <Link to="/collections">Browse Collections</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to bag",
      description: `${quantity} × ${product.name} added to your shopping bag.`,
    });
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    window.location.href = '/checkout';
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in: ${product.name} (${product.sku}) - ${formatPrice(product.price)}`
  );

  return (
    <>
      <Helmet>
        <title>{product.name} — Laxmi Jewellers</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Breadcrumb */}
          <div className="bg-muted/30 py-2 sm:py-3">
            <div className="container mx-auto px-4">
              <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
                <Link to="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <Link to="/collections" className="hover:text-primary transition-colors shrink-0">Collections</Link>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <Link to={`/collections/${product.category}`} className="hover:text-primary transition-colors capitalize shrink-0">
                  {product.category}
                </Link>
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="text-foreground line-clamp-1">{product.name}</span>
              </nav>
            </div>
          </div>

          {/* Product Details */}
          <section className="py-6 sm:py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Image Gallery */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setSelectedImage(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-background/90 rounded-full hover:bg-background transition-colors shadow-soft"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => setSelectedImage(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-background/90 rounded-full hover:bg-background transition-colors shadow-soft"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </>
                    )}
                    
                    {/* Badges */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-primary text-primary-foreground text-xs font-medium px-2 sm:px-3 py-1 rounded">NEW</span>
                      )}
                      {discount > 0 && (
                        <span className="bg-green-600 text-white text-xs font-medium px-2 sm:px-3 py-1 rounded">{discount}% OFF</span>
                      )}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index ? 'border-primary' : 'border-transparent hover:border-primary/50'
                          }`}
                        >
                          <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
                        925 Sterling Silver
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">SKU: {product.sku}</span>
                    </div>
                    <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight">
                      {product.name}
                    </h1>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 sm:gap-3">
                    <span className="font-semibold text-2xl sm:text-3xl text-primary">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-base sm:text-lg text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          Save {formatPrice(product.originalPrice - product.price)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 border-y border-border">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Purity</p>
                      <p className="font-medium text-sm sm:text-base">{product.purity}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium text-sm sm:text-base">{product.weight}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center gap-2 border border-border rounded-md">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="w-8 sm:w-12 text-center font-medium">{quantity}</span>
                      <button
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      variant="luxury" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleAddToCart}
                    >
                      <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Add to Bag
                    </Button>
                    <Button 
                      variant="luxury-dark" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </div>

                  {/* WhatsApp Order */}
                  <Button 
                    variant="whatsapp" 
                    size="lg" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/919967580919?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Order on WhatsApp
                    </a>
                  </Button>

                  {/* Secondary Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      Add to Wishlist
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Free Shipping</p>
                        <p className="text-xs text-muted-foreground">Orders ₹2000+</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Hallmarked</p>
                        <p className="text-xs text-muted-foreground">925 Certified</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <RotateCcw className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium">Easy Returns</p>
                        <p className="text-xs text-muted-foreground">7-day policy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="py-8 sm:py-12 bg-muted/20">
              <div className="container mx-auto px-4">
                <h2 className="font-serif text-xl sm:text-2xl text-center mb-6 sm:mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                  {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
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

export default ProductDetail;
