import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingBag, Truck, Shield, MessageCircle, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import ProductCard from '@/components/product/ProductCard';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Show sticky bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    .slice(0, 10);

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
    navigate('/checkout');
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
        <title>{product.name} — Laxmi Silver</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>

      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
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
                    <h1 className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground leading-tight">
                      {product.name}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
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

                  {/* Action Buttons - Desktop */}
                  <div className="hidden sm:flex flex-col sm:flex-row gap-3">
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
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Buy Now
                    </Button>
                  </div>

                  {/* WhatsApp Order */}
                  <Button 
                    variant="whatsapp" 
                    size="lg" 
                    className="w-full hidden sm:flex"
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

                  {/* Product Details & Shipping Tabs */}
                  <Tabs defaultValue="details" className="mt-6">
                    <TabsList className="w-full grid grid-cols-2 h-12">
                      <TabsTrigger value="details">Product Details</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping Details</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="mt-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Material</p>
                          <p className="font-medium">{product.purity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Weight</p>
                          <p className="font-medium">{product.weight}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Finish</p>
                          <p className="font-medium">Premium Polished</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Usage</p>
                          <p className="font-medium">Daily / Occasion</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong>Care Instructions:</strong> Store in a dry place. Clean with soft cloth. Avoid contact with perfumes and chemicals.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="shipping" className="mt-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <Truck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Delivery Timeline</p>
                          <p className="text-sm text-muted-foreground">5-7 business days across India</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Secure Packaging</p>
                          <p className="text-sm text-muted-foreground">Premium gift box with brand certificate</p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-border text-sm text-muted-foreground">
                        <p>Free shipping on orders above ₹2,000. COD available. Prepaid orders get priority dispatch.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </section>

          {/* Similar Products */}
          {relatedProducts.length > 0 && (
            <section className="py-8 sm:py-12 bg-muted/20">
              <div className="container mx-auto px-4">
                <h2 className="font-serif text-xl sm:text-2xl text-center mb-6 sm:mb-8">Similar Products</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {relatedProducts.map(product => (
                    <div key={product.id} className="w-[200px] sm:w-[240px] shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Reviews Section */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-xl sm:text-2xl">Customer Reviews</h2>
                <Link to="/reviews">
                  <Button variant="luxury-outline" size="sm">
                    Add Your Review
                  </Button>
                </Link>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Priya Sharma</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Beautiful piece! The quality is amazing and exactly as shown in the pictures.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className={`h-4 w-4 ${i <= 4 ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                      ))}
                    </div>
                    <span className="text-sm font-medium">Anita Patel</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent craftsmanship. Very happy with my purchase from Laxmi Silver.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Sticky Action Bar - Mobile */}
        <div className={`fixed bottom-16 left-0 right-0 z-40 bg-background border-t border-border p-3 sm:hidden transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex gap-2">
            <Button 
              variant="luxury-outline" 
              size="lg" 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-4 w-4 mr-1.5" />
              Add
            </Button>
            <Button 
              variant="luxury" 
              size="lg" 
              className="flex-1"
              onClick={handleBuyNow}
            >
              <Zap className="h-4 w-4 mr-1.5" />
              Buy Now
            </Button>
          </div>
        </div>

        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default ProductDetail;