import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, CreditCard, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCreateOrder } from '@/hooks/use-orders';
import { paymentService } from '@/services/payment.service';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';
import { z } from 'zod';

const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile'),
  email: z.string().email('Enter valid email'),
  street: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter valid 6-digit pincode'),
});

type PaymentMethod = 'online' | 'cod';

const Checkout = () => {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const createOrder = useCreateOrder();
  
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const formatPrice = (price: number) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddress = () => {
    try {
      addressSchema.parse(address);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) newErrors[err.path[0] as string] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleContinueToPayment = () => {
    if (validateAddress()) {
      setStep('payment');
    }
  };

  const handlePayment = async () => {
    if (!validateAddress()) return;
    
    setIsProcessing(true);
    
    try {
      // ✅ FIX: Convert cart items to backend format
      const orderItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        weight: item.product.weight || 0,
        image: item.product.images?.[0] || '',
      }));

      // ✅ FIX: Include items in order creation
      const order = await createOrder.mutateAsync({
        shippingAddress: address,
        paymentMethod,
        notes: '',
        items: orderItems, // ✅ Added items
      });

      if (paymentMethod === 'cod') {
        toast({
          title: 'Order Placed!',
          description: 'Your order has been placed successfully.',
        });
        clearCart();
        navigate('/order-success', { state: { orderId: order._id } });
        return;
      }

      // Online payment (Razorpay)
      const paymentResponse = await paymentService.createOrder(order._id);

      if (!paymentResponse.success || !paymentResponse.data) {
        throw new Error('Failed to create payment order');
      }

      const razorpayOrder = paymentResponse.data as {
        orderId: string;
        razorpayOrderId: string;
        amount: number;
        currency: string;
        keyId: string;
      };

      await paymentService.initiatePayment(
        razorpayOrder,
        {
          name: address.name,
          email: address.email,
          phone: address.phone,
        },
        async (response) => {
          const verifyResponse = await paymentService.verifyPayment({
            orderId: order._id,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (verifyResponse.success) {
            toast({
              title: 'Payment Successful!',
              description: 'Your order has been confirmed.',
            });
            clearCart();
            navigate('/order-success', { state: { orderId: order._id } });
          } else {
            toast({
              title: 'Payment verification failed',
              description: 'Please contact support.',
              variant: 'destructive',
            });
          }
        },
        (error) => {
          console.error('Payment error:', error);
          toast({
            title: 'Payment Failed',
            description:
              error instanceof Error
                ? error.message
                : 'Payment was cancelled or failed.',
            variant: 'destructive',
          });
        }
      );
    } catch (error) {
      console.error('Order error:', error);
      toast({
        title: 'Order Failed',
        description:
          error instanceof Error
            ? error.message
            : 'Could not place order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
            <Button variant="luxury" asChild>
              <Link to="/collections">Shop Now</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout — Laxmi Silver</title>
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />

        <main className="flex-1 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Steps */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className={`flex items-center gap-2 ${step === 'address' ? 'text-primary' : 'text-muted-foreground'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'address' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>1</span>
                <span className="hidden sm:inline">Address</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>2</span>
                <span className="hidden sm:inline">Payment</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Address Form */}
              {step === 'address' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-serif">Shipping Address</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={address.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={address.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={address.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      name="street"
                      value={address.street}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                    />
                    {errors.street && <p className="text-sm text-destructive mt-1">{errors.street}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                      />
                      {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                      />
                      {errors.state && <p className="text-sm text-destructive mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={address.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                    />
                    {errors.pincode && <p className="text-sm text-destructive mt-1">{errors.pincode}</p>}
                  </div>

                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full"
                    onClick={handleContinueToPayment}
                  >
                    Continue to Payment
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}

              {/* Payment Section */}
              {step === 'payment' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-serif">Payment Method</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep('address')}>
                      Edit Address
                    </Button>
                  </div>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                    className="space-y-3"
                  >
                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="online" id="online" />
                      <div className="flex-1">
                        <p className="font-medium">Pay Online</p>
                        <p className="text-sm text-muted-foreground">
                          UPI, Cards, Netbanking via Razorpay
                        </p>
                      </div>
                      <CreditCard className="h-5 w-5" />
                    </label>

                    <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'}`}>
                      <RadioGroupItem value="cod" id="cod" />
                      <div className="flex-1">
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive
                        </p>
                      </div>
                    </label>
                  </RadioGroup>

                  <Button
                    variant="luxury"
                    size="lg"
                    className="w-full mt-6"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        {paymentMethod === 'cod'
                          ? 'Place Order'
                          : `Pay ${formatPrice(total)}`}
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Order Summary */}
              <div className="lg:sticky lg:top-4 h-fit">
                <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                  <h2 className="text-xl font-serif">Order Summary</h2>
                  
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <img
                          src={item.product.images?.[0] || '/placeholder.jpg'}
                          alt={item.product.name}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;