import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Plus, Trash2, Edit2, Star, Loader2, X, Check } from 'lucide-react';
import AccountPageLayout from '@/components/account/AccountPageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { userService } from '@/services/user.service';
import { useToast } from '@/hooks/use-toast';
import { Address } from '@/services/auth.service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const addressSchema = z.object({
  name: z.string().min(2, 'Name is required').max(50),
  phone: z.string().regex(/^[0-9]{10}$/, 'Enter valid 10-digit number'),
  street: z.string().min(5, 'Address is required').max(200),
  city: z.string().min(2, 'City is required').max(50),
  state: z.string().min(2, 'State is required').max(50),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Enter valid 6-digit pincode'),
  country: z.string().default('India'),
});

type AddressFormData = z.infer<typeof addressSchema>;

const AddressCard = ({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isDeleting,
}: {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
  isDeleting: boolean;
}) => (
  <div className="bg-card rounded-xl border border-border p-4 md:p-5 shadow-card relative">
    {address.isDefault && (
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
          <Star className="h-3 w-3 fill-current" />
          Default
        </span>
      </div>
    )}
    
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <MapPin className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground">{address.name}</h3>
        <p className="text-sm text-muted-foreground">{address.phone}</p>
      </div>
    </div>
    
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
      {address.street}, {address.city}, {address.state} - {address.pincode}
    </p>
    
    <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
      <Button variant="outline" size="sm" onClick={onEdit}>
        <Edit2 className="h-3 w-3 mr-1" />
        Edit
      </Button>
      {!address.isDefault && (
        <Button variant="outline" size="sm" onClick={onSetDefault}>
          <Check className="h-3 w-3 mr-1" />
          Set Default
        </Button>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        className="text-destructive hover:text-destructive" 
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3 mr-1" />}
        Delete
      </Button>
    </div>
  </div>
);

const AddressesPage = () => {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const addresses = user?.addresses || [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: 'India',
    },
  });

  const openAddDialog = () => {
    setEditingAddress(null);
    reset({ name: '', phone: '', street: '', city: '', state: '', pincode: '', country: 'India' });
    setIsDialogOpen(true);
  };

  const openEditDialog = (address: Address) => {
    setEditingAddress(address);
    reset(address);
    setIsDialogOpen(true);
  };

  const onSubmit = async (data: AddressFormData) => {
    setIsSubmitting(true);
    try {
      let response;
      if (editingAddress?._id) {
        response = await userService.updateAddress(editingAddress._id, data);
      } else {
        // Ensure all required fields are present
        const addressData = {
          name: data.name,
          phone: data.phone,
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          country: data.country || 'India',
        };
        response = await userService.addAddress(addressData);
      }

      if (response.success) {
        await refreshUser();
        toast({
          title: editingAddress ? 'Address Updated' : 'Address Added',
          description: `Address has been ${editingAddress ? 'updated' : 'added'} successfully.`,
        });
        setIsDialogOpen(false);
      } else {
        throw new Error(response.error || 'Failed to save address');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save address',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (addressId: string) => {
    setDeletingId(addressId);
    try {
      const response = await userService.deleteAddress(addressId);
      if (response.success) {
        await refreshUser();
        toast({ title: 'Address Deleted', description: 'Address has been removed.' });
      } else {
        throw new Error(response.error || 'Failed to delete');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete address',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      const response = await userService.setDefaultAddress(addressId);
      if (response.success) {
        await refreshUser();
        toast({ title: 'Default Updated', description: 'Default address has been updated.' });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set default address',
        variant: 'destructive',
      });
    }
  };

  return (
    <AccountPageLayout 
      title="Addresses" 
      description="Manage your delivery addresses"
    >
      {/* Add Address Button */}
      <Button variant="luxury" className="mb-6" onClick={openAddDialog}>
        <Plus className="h-4 w-4 mr-2" />
        Add New Address
      </Button>

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 md:p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-10 w-10 text-primary" />
          </div>
          <h3 className="font-serif text-xl mb-2">No addresses saved</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Add a delivery address to make checkout faster and easier.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => openEditDialog(address)}
              onDelete={() => address._id && handleDelete(address._id)}
              onSetDefault={() => address._id && handleSetDefault(address._id)}
              isDeleting={deletingId === address._id}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" {...register('phone')} />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input id="street" {...register('street')} placeholder="House No, Street, Landmark" />
              {errors.street && <p className="text-xs text-destructive">{errors.street.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register('city')} />
                {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" {...register('state')} />
                {errors.state && <p className="text-xs text-destructive">{errors.state.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" {...register('pincode')} />
                {errors.pincode && <p className="text-xs text-destructive">{errors.pincode.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" {...register('country')} disabled />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="luxury" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingAddress ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </AccountPageLayout>
  );
};

export default AddressesPage;
