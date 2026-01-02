import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const CartDrawer = () => {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeItem, 
    updateQuantity, 
    totalItems, 
    subtotal, 
    shipping, 
    total 
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="h-5 w-5" />
            Shopping Bag ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50" />
            <p className="text-muted-foreground text-center">Your bag is empty</p>
            <Button variant="luxury" onClick={closeCart} asChild>
              <Link to="/collections">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 sm:gap-4 border-b border-border pb-4">
                  <Link 
                    to={`/product/${item.product.slug}`} 
                    onClick={closeCart}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.product.slug}`}
                      onClick={closeCart}
                      className="block"
                    >
                      <h4 className="font-medium text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors">
                        {item.product.name}
                      </h4>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.product.purity}
                    </p>
                    <p className="font-semibold text-primary mt-1 text-sm sm:text-base">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2 sm:mt-3">
                      <div className="flex items-center gap-1 sm:gap-2 border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 sm:p-2 hover:bg-muted transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 sm:p-2 hover:bg-muted transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 sm:p-2 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3 sm:space-y-4">
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                {subtotal < 2000 && (
                  <p className="text-xs text-primary">
                    Add {formatPrice(2000 - subtotal)} more for FREE shipping!
                  </p>
                )}
                <div className="flex justify-between text-base sm:text-lg font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="grid gap-2 sm:gap-3">
                <Button variant="luxury" size="lg" className="w-full" asChild onClick={closeCart}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="luxury-outline" size="lg" className="w-full" onClick={closeCart} asChild>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
