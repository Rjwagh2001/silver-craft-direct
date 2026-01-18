import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOrder } from '@/hooks/use-orders';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get orderId from state (checkout redirect) or query param (orders page link)
  const orderId = location.state?.orderId || searchParams.get('orderId');
  const { data: order, isLoading } = useOrder(orderId || '');

  useEffect(() => {
    if (!orderId) navigate('/');
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h1 className="font-serif text-2xl sm:text-3xl mb-3">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">Thank you for your order. You'll receive a confirmation on WhatsApp shortly.</p>
          
          {isLoading ? (
            <p className="text-sm text-muted-foreground mb-6">Loading order details...</p>
          ) : order ? (
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-semibold text-lg">{order.orderNumber}</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="font-semibold">₹{order.pricing?.total?.toLocaleString('en-IN') || '0'}</p>
              </div>
            </div>
          ) : null}
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link to="/account/orders">
                <Package className="h-4 w-4 mr-2" />
                View Orders
              </Link>
            </Button>
            <Button variant="luxury" asChild>
              <Link to="/collections">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
