import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AccountPageLayout from '@/components/account/AccountPageLayout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { wishlistService, WishlistItem } from '@/services/wishlist.service';
import { useToast } from '@/hooks/use-toast';
import { cartService } from '@/services/cart.service';

const WishlistItemCard = ({
  item,
  onRemove,
  isRemoving,
  onAddToCart,
}: {
  item: WishlistItem;
  onRemove: () => void;
  isRemoving: boolean;
  onAddToCart: () => void;
}) => {
  const product = item.product;
  
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card group">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block aspect-square overflow-hidden">
        <img
          src={product.images[0]?.url || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground truncate hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.purity} Silver</p>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="font-semibold text-foreground">
              ₹{product.price.sellingPrice.toLocaleString('en-IN')}
            </span>
            {product.price.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ₹{product.price.basePrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Button 
            variant="luxury" 
            size="sm" 
            className="flex-1"
            onClick={onAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={onRemove}
            disabled={isRemoving}
          >
            {isRemoving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

const WishlistPage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const response = await wishlistService.get();
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => wishlistService.remove(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({ title: 'Removed from wishlist' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to remove item', variant: 'destructive' });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: (productId: string) => cartService.addItem(productId, 1),
    onSuccess: (_, productId) => {
      const item = wishlistItems.find(i => i.product._id === productId);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({ title: 'Added to cart', description: `${item?.product.name || 'Item'} added to cart` });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to add to cart', variant: 'destructive' });
    },
  });

  const wishlistItems = data?.wishlist?.items || [];

  return (
    <AccountPageLayout 
      title="Wishlist" 
      description="View your saved items"
    >
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
              <Skeleton className="aspect-square" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-9 w-full mt-4" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <Heart className="h-12 w-12 mx-auto text-destructive mb-4" />
          <h3 className="font-medium text-lg mb-2">Failed to load wishlist</h3>
          <p className="text-muted-foreground text-sm">Please try again later</p>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Heart className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Save your favorite pieces to revisit them later. Start exploring our collection.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/collections">Browse Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((item) => (
            <WishlistItemCard
              key={item._id}
              item={item}
              onRemove={() => removeMutation.mutate(item.product._id)}
              isRemoving={removeMutation.isPending && removeMutation.variables === item.product._id}
              onAddToCart={() => addToCartMutation.mutate(item.product._id)}
            />
          ))}
        </div>
      )}
    </AccountPageLayout>
  );
};

export default WishlistPage;
