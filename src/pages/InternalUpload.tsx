import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { toast } from '@/hooks/use-toast';
import { categoryService, ApiCategory } from '@/services/category.service';
import { productService } from '@/services/product.service';
import { useAuth } from '@/contexts/AuthContext';

import { Loader2, Upload, ShieldAlert } from 'lucide-react';

const InternalUpload = () => {
  // 🔐 AUTH CONTEXT (SINGLE SOURCE OF TRUTH)
  const { user, isLoading: authLoading } = useAuth();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // FORM STATE (BACKEND MATCHED)
  // ===============================
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [metal, setMetal] = useState('silver');
  const [weight, setWeight] = useState('');
  const [makingCharges, setMakingCharges] = useState('0');
  const [basePrice, setBasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState('2');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Images
  const [images, setImages] = useState<File[]>([]);

  // ===============================
  // ✅ ADMIN AUTH CHECK
  // ===============================
  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== 'admin') {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [user, authLoading]);

  // ===============================
  // FETCH CATEGORIES
  // ===============================
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchCategories = async () => {
      const res = await categoryService.getAll();
      if (res.success && res.data?.categories) {
        setCategories(res.data.categories);
      }
    };

    fetchCategories();
  }, [isAuthorized]);

  // ===============================
  // HANDLERS
  // ===============================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setCategory('');
    setMetal('silver');
    setWeight('');
    setMakingCharges('0');
    setBasePrice('');
    setSellingPrice('');
    setStockQuantity('');
    setLowStockThreshold('2');
    setTags('');
    setIsFeatured(false);
    setImages([]);
  };

  // ===============================
  // SUBMIT PRODUCT
  // ===============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !category ||
      !weight ||
      !basePrice ||
      !sellingPrice ||
      !stockQuantity
    ) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const base = Number(basePrice);
      const selling = Number(sellingPrice);

      const productPayload = {
        name,
        description,
        category,
        metal,
        weight: Number(weight),
        makingCharges: Number(makingCharges) || 0,
        price: {
          basePrice: base,
          sellingPrice: selling,
          discount:
            base > selling
              ? Math.round(((base - selling) / base) * 100)
              : 0,
        },
        stock: {
          quantity: Number(stockQuantity),
          lowStockThreshold: Number(lowStockThreshold),
        },
        tags: tags
          ? tags.split(',').map(t => t.trim()).filter(Boolean)
          : [],
        isFeatured,
      };

      // 1️⃣ CREATE PRODUCT
      const createRes = await productService.create(productPayload);

      if (!createRes.success || !createRes.data?.product) {
        throw new Error(createRes.error || 'Product creation failed');
      }

      const productId = createRes.data.product._id;

      // 2️⃣ UPLOAD IMAGES
      if (images.length > 0) {
        const uploadRes = await productService.uploadImages(
          productId,
          images
        );

        if (!uploadRes.success) {
          toast({
            title: 'Partial Success',
            description: 'Product created, image upload failed.',
          });
        }
      }

      toast({
        title: 'Success',
        description: 'Product & images uploaded successfully',
      });

      resetForm();
    } catch (err) {
      toast({
        title: 'Error',
        description:
          err instanceof Error ? err.message : 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================
  // LOADING
  // ===============================
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // ===============================
  // ACCESS DENIED
  // ===============================
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <p className="text-muted-foreground">Access Denied</p>
      </div>
    );
  }

  // ===============================
  // UI (FIELDS WILL SHOW ✅)
  // ===============================
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Internal Product Upload
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Product Name *</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div>
            <Label>Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat._id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Metal</Label>
              <Select value={metal} onValueChange={setMetal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Weight (grams) *</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Base Price *</Label>
              <Input type="number" value={basePrice} onChange={e => setBasePrice(e.target.value)} />
            </div>

            <div>
              <Label>Selling Price *</Label>
              <Input type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Stock Quantity *</Label>
              <Input type="number" value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} />
            </div>

            <div>
              <Label>Low Stock Threshold</Label>
              <Input type="number" value={lowStockThreshold} onChange={e => setLowStockThreshold(e.target.value)} />
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <Input value={tags} onChange={e => setTags(e.target.value)} />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox checked={isFeatured} onCheckedChange={v => setIsFeatured(v === true)} />
            <Label>Featured Product</Label>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <Label>Images</Label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer">
              <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : 'Click to upload images'}
              </span>
              <input type="file" multiple accept="image/*" hidden onChange={handleImageChange} />
            </label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InternalUpload;
