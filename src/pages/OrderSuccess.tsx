import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const OrderSuccess = () => (
  <div className="min-h-screen flex flex-col"><Navbar />
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
        <h1 className="font-serif text-2xl sm:text-3xl mb-3">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-6">Thank you for your order. You'll receive a confirmation on WhatsApp shortly.</p>
        <Button variant="luxury" size="lg" asChild><Link to="/collections">Continue Shopping</Link></Button>
      </div>
    </main><Footer /></div>
);

export default OrderSuccess;
