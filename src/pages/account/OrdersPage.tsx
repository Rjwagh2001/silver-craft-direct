import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, CheckCircle, Truck, XCircle, Loader2 } from 'lucide-react';
import AccountPageLayout from '@/components/account/AccountPageLayout';
import { useOrders } from '@/hooks/use-orders';
import { Order } from '@/services/order.service';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  pending: { label: 'Pending', icon: Clock, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed: { label: 'Confirmed', icon: CheckCircle, className: 'bg-blue-100 text-blue-800 border-blue-200' },
  processing: { label: 'Processing', icon: Package, className: 'bg-purple-100 text-purple-800 border-purple-200' },
  shipped: { label: 'Shipped', icon: Truck, className: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered: { label: 'Delivered', icon: CheckCircle, className: 'bg-green-100 text-green-800 border-green-200' },
  cancelled: { label: 'Cancelled', icon: XCircle, className: 'bg-red-100 text-red-800 border-red-200' },
  returned: { label: 'Returned', icon: XCircle, className: 'bg-gray-100 text-gray-800 border-gray-200' },
};

const OrderCard = ({ order }: { order: Order }) => {
  const status = statusConfig[order.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <Link
      to={`/order-success?orderId=${order._id}`}
      className="block bg-card rounded-xl border border-border p-4 md:p-5 shadow-card hover:shadow-medium transition-all group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>
        <Badge variant="outline" className={`${status.className} gap-1`}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </Badge>
      </div>

      {/* Items Preview */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 rounded-lg border-2 border-background bg-muted overflow-hidden"
            >
              <img
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-12 h-12 rounded-lg border-2 border-background bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">
            {order.items[0]?.name}
            {order.items.length > 1 && ` +${order.items.length - 1} more`}
          </p>
          <p className="text-xs text-muted-foreground">
            {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-semibold text-foreground">₹{order.pricing.total.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
          View Details
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

const OrdersPage = () => {
  const { data: orders = [], isLoading, error } = useOrders();

  return (
    <AccountPageLayout 
      title="Orders" 
      description="Track and manage your orders"
    >
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5">
              <div className="flex justify-between mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex gap-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <XCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
          <h3 className="font-medium text-lg mb-2">Failed to load orders</h3>
          <p className="text-muted-foreground text-sm">Please try again later</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl mb-2">No orders yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Start shopping to see your orders here. Discover our beautiful collection of silver jewelry.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/collections">Browse Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </AccountPageLayout>
  );
};

export default OrdersPage;
