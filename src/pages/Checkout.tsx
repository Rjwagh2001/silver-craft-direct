import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import { Address } from '@/types/product';

const Checkout = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [address, setAddress] = useState<Address>({
    name: '', mobile: '', email: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: ''
  });

  const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePayment = async () => {
    if (!address.name || !address.mobile || !address.email || !address.addressLine1 || !address.city || !address.state || !address.pincode) {
      toast({ title: "Missing information", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    setIsProcessing(true);
    // Razorpay integration placeholder
    setTimeout(() => {
      toast({ title: "Order Placed!", description: "Your order has been placed successfully." });
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col"><Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
            <Button variant="luxury" asChild><Link to="/collections">Shop Now</Link></Button>
          </div>
        </main><Footer /></div>
    );
  }

  return (
    <><Helmet><title>Checkout — Laxmi Jewellers</title></Helmet>
      <div className="min-h-screen flex flex-col overflow-x-hidden"><Navbar />
        <main className="flex-1 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/cart" className="hover:text-primary">Cart</Link><ChevronRight className="h-4 w-4" /><span className="text-foreground">Checkout</span>
            </nav>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Address Form */}
              <div className="space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl">Shipping Address</h2>
                <div className="grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><Label htmlFor="name">Full Name *</Label><Input id="name" name="name" value={address.name} onChange={handleInputChange} required /></div>
                    <div><Label htmlFor="mobile">Mobile Number *</Label><Input id="mobile" name="mobile" value={address.mobile} onChange={handleInputChange} required /></div>
                  </div>
                  <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" value={address.email} onChange={handleInputChange} required /></div>
                  <div><Label htmlFor="addressLine1">Address Line 1 *</Label><Input id="addressLine1" name="addressLine1" value={address.addressLine1} onChange={handleInputChange} required /></div>
                  <div><Label htmlFor="addressLine2">Address Line 2</Label><Input id="addressLine2" name="addressLine2" value={address.addressLine2} onChange={handleInputChange} /></div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div><Label htmlFor="city">City *</Label><Input id="city" name="city" value={address.city} onChange={handleInputChange} required /></div>
                    <div><Label htmlFor="state">State *</Label><Input id="state" name="state" value={address.state} onChange={handleInputChange} required /></div>
                    <div><Label htmlFor="pincode">Pincode *</Label><Input id="pincode" name="pincode" value={address.pincode} onChange={handleInputChange} required /></div>
                  </div>
                </div>
              </div>
              {/* Order Summary */}
              <div className="bg-muted/30 rounded-lg p-4 sm:p-6 h-fit sticky top-24">
                <h2 className="font-serif text-xl mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3 text-sm">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1"><p className="line-clamp-1">{item.product.name}</p><p className="text-muted-foreground">{item.quantity} × {formatPrice(item.product.price)}</p></div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t"><span>Total</span><span className="text-primary">{formatPrice(total)}</span></div>
                </div>
                <div className="mt-6 space-y-3">
                  <Button variant="luxury" size="lg" className="w-full" onClick={handlePayment} disabled={isProcessing}>
                    <CreditCard className="h-4 w-4 mr-2" />{isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                  </Button>
                  <Button variant="whatsapp" size="lg" className="w-full" asChild>
                    <a href={`https://wa.me/919967580919?text=${encodeURIComponent(`Order: ${items.map(i => i.product.name).join(', ')} - Total: ${formatPrice(total)}`)}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />Order via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main><Footer /></div>
    </>
  );
};

export default Checkout;
