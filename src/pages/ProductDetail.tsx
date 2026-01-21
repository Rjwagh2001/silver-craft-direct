import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Heart, Share2, ShoppingBag,
  Truck, Shield, MessageCircle, Star, Zap, Loader2, Minus, Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct, useProductsByCategory } from '@/hooks/use-products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { data: product, isLoading, error } = useProduct(slug || '');
  const { data: relatedData } = useProductsByCategory(product?.category || '', { limit: 10 });
  const relatedProducts = (relatedData?.products || []).filter(
    p => p.id !== product?.id
  ).slice(0, 10);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
  }, [slug]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAdding(true);
    
    try {
      await addItem(product, quantity);
      toast({
        title: 'Added to bag',
        description: `${quantity} × ${product.name} added to your cart`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add item to cart',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    setIsAdding(true);
    
    try {
      await addItem(product, quantity);
      navigate('/checkout');
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add item to cart',
        variant: 'destructive',
      });
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-serif">Product not found</h2>
            <Link to="/collections">
              <Button variant="luxury">Browse Collections</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{product.name} – Laxmi Silver</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Navbar />

        <main className="flex-1 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/collections" className="hover:text-primary transition-colors">
                Collections
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link 
                to={`/collections/${product.category}`} 
                className="hover:text-primary transition-colors capitalize"
              >
                {product.category}
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{product.name}</span>
            </nav>

            {/* Product Section */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border border-border">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {product.images.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === idx 
                            ? 'border-primary' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.isNew && (
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded">
                      NEW
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="bg-green-600 text-white text-xs font-medium px-3 py-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                  {product.isBestseller && (
                    <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded">
                      BESTSELLER
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-2">
                    {product.name}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-semibold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Purity</p>
                    <p className="font-medium">{product.purity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium">{product.weight}</p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2 border border-border rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons - Desktop */}
                <div className="hidden sm:flex gap-3 mt-6">
                  <Button
                    variant="luxury"
                    size="lg"
                    className="flex-1"
                    disabled={isAdding || !product.inStock}
                    onClick={handleAddToCart}
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Add to Bag
                      </>
                    )}
                  </Button>

                  <Button
                    variant="luxury-dark"
                    size="lg"
                    className="flex-1"
                    disabled={isAdding || !product.inStock}
                    onClick={handleBuyNow}
                  >
                    <Zap className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Free Shipping
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Shield className="h-6 w-6 text-primary" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Secure Payment
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <MessageCircle className="h-6 w-6 text-primary" />
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12 sm:mt-16">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6 prose prose-sm sm:prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </TabsContent>

                <TabsContent value="specifications" className="mt-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Material</h3>
                      <p className="text-muted-foreground">{product.purity}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Weight</h3>
                      <p className="text-muted-foreground">{product.weight}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">SKU</h3>
                      <p className="text-muted-foreground">{product.sku}</p>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Availability</h3>
                      <p className="text-muted-foreground">
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="mt-6 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Information</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Free shipping on orders above ₹2,000</li>
                      <li>Standard delivery: 5-7 business days</li>
                      <li>Express delivery available at checkout</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Returns & Exchange</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>7-day easy returns and exchanges</li>
                      <li>Product must be unused and in original packaging</li>
                      <li>Contact support for return initiation</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-12 sm:mt-16">
                <h2 className="font-serif text-2xl sm:text-3xl mb-6 sm:mb-8">
                  You May Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Sticky Bar */}
        <div
          className={`fixed bottom-16 left-0 right-0 bg-background border-t p-3 flex gap-3 md:hidden z-40 transition-transform duration-300 ${
            showStickyBar ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Button 
            className="flex-1" 
            onClick={handleAddToCart} 
            disabled={isAdding || !product.inStock}
          >
            {isAdding ? 'Adding...' : 'Add to Bag'}
          </Button>
          <Button 
            className="flex-1" 
            onClick={handleBuyNow} 
            disabled={isAdding || !product.inStock}
          >
            Buy Now
          </Button>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default ProductDetail;