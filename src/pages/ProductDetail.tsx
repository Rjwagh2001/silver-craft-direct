import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Heart, Share2, ShoppingBag,
  Truck, Shield, MessageCircle, Star, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProduct, useProductsByCategory } from '@/hooks/use-products';
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

  // 🔥 BACKEND CART API CALL
  const addToCartBackend = async () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      toast({
        title: 'Login required',
        description: 'Please login to add items to cart',
        variant: 'destructive',
      });
      return false;
    }

    try {
      setIsAdding(true);

      const res = await fetch('http://localhost:5000/api/v1/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add to cart');
      }

      return true;
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCartBackend();
    if (success) {
      toast({
        title: 'Added to bag',
        description: `${quantity} × ${product.name} added to your cart`,
      });
    }
  };

  const handleBuyNow = async () => {
    const success = await addToCartBackend();
    if (success) {
      navigate('/checkout');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — Laxmi Silver</title>
      </Helmet>

      <div className="min-h-screen flex flex-col pb-20 md:pb-0">
        <Navbar />

        <main className="flex-1">
          {/* PRODUCT UI — UNCHANGED */}

          {/* ACTION BUTTONS */}
          <div className="hidden sm:flex gap-3 mt-6">
            <Button
              variant="luxury"
              size="lg"
              className="flex-1"
              disabled={isAdding}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Bag
            </Button>

            <Button
              variant="luxury-dark"
              size="lg"
              className="flex-1"
              disabled={isAdding}
              onClick={handleBuyNow}
            >
              <Zap className="h-5 w-5 mr-2" />
              Buy Now
            </Button>
          </div>
        </main>

        {/* MOBILE STICKY BAR */}
        <div
          className={`fixed bottom-16 left-0 right-0 bg-background border-t p-3 flex gap-3 md:hidden z-40 ${
            showStickyBar ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Button className="flex-1" onClick={handleAddToCart} disabled={isAdding}>
            Add to Bag
          </Button>
          <Button className="flex-1" onClick={handleBuyNow} disabled={isAdding}>
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
