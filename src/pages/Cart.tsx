import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  const { items, removeItem, updateQuantity, subtotal, shipping, total, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>Shopping Bag — Laxmi Jewellers</title>
        <meta name="description" content="Review your shopping bag and proceed to checkout." />
      </Helmet>

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />

        <main className="flex-1 py-6 sm:py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Shopping Bag</h1>

            {items.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-muted-foreground/30 mb-4 sm:mb-6" />
                <h2 className="text-xl sm:text-2xl font-serif mb-2 sm:mb-3">Your bag is empty</h2>
                <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
                  Looks like you haven't added any items to your bag yet.
                </p>
                <Button variant="luxury" size="lg" asChild>
                  <Link to="/collections">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* Header - Desktop */}
                  <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border text-sm font-medium text-muted-foreground">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Items */}
                  {items.map((item) => (
                    <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 sm:pb-6 border-b border-border">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-3 sm:gap-4">
                        <Link to={`/product/${item.product.slug}`} className="shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.product.slug}`}>
                            <h3 className="font-medium text-sm sm:text-base line-clamp-2 hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {item.product.purity}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Weight: {item.product.weight}
                          </p>
                          
                          {/* Mobile Price */}
                          <p className="font-semibold text-primary mt-2 md:hidden">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="hidden md:flex md:col-span-2 items-center justify-center">
                        <span className="font-medium">{formatPrice(item.product.price)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-sm text-muted-foreground md:hidden">Quantity:</span>
                        <div className="flex items-center gap-2 border border-border rounded-md">
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
                      </div>

                      {/* Total & Remove */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                        <span className="font-semibold text-sm sm:text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Clear Cart */}
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground">
                      Clear Cart
                    </Button>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-muted/30 rounded-lg p-4 sm:p-6 sticky top-24">
                    <h2 className="font-serif text-lg sm:text-xl mb-4 sm:mb-6">Order Summary</h2>

                    <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                      </div>
                      {subtotal < 2000 && (
                        <p className="text-xs sm:text-sm text-primary">
                          Add {formatPrice(2000 - subtotal)} more for FREE shipping!
                        </p>
                      )}
                      <div className="border-t border-border pt-3 sm:pt-4">
                        <div className="flex justify-between text-base sm:text-lg font-semibold">
                          <span>Total</span>
                          <span className="text-primary">{formatPrice(total)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Inclusive of all taxes
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <Button variant="luxury" size="lg" className="w-full" asChild>
                        <Link to="/checkout">
                          Proceed to Checkout
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="luxury-outline" size="lg" className="w-full" asChild>
                        <Link to="/collections">Continue Shopping</Link>
                      </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 pt-6 border-t border-border space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Secure checkout
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        Free shipping over ₹2,000
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        7-day easy returns
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Cart;
