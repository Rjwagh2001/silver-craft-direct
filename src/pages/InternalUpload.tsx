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
  // 🔐 SINGLE SOURCE OF TRUTH
  const { user, isLoading: isAuthLoading } = useAuth();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // Form State
  // ===============================
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [metal, setMetal] = useState('silver');
  const [weight, setWeight] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [makingCharges, setMakingCharges] = useState('0');
  const [gst, setGst] = useState('3');
  const [purity, setPurity] = useState('92.5%');
  const [isFeatured, setIsFeatured] = useState(false);
  const [tags, setTags] = useState('');
  const [images, setImages] = useState<File[]>([]);

  // ===============================
  // ADMIN AUTH CHECK (FINAL FIX ✅)
  // ===============================
  useEffect(() => {
    if (isAuthLoading) return;

    if (!user || user.role !== 'admin') {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [user, isAuthLoading]);

  // ===============================
  // Fetch Categories (Admin Only)
  // ===============================
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchCategories = async () => {
      const response = await categoryService.getAll();
      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      }
    };

    fetchCategories();
  }, [isAuthorized]);

  // ===============================
  // Handlers
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
    setBasePrice('');
    setSellingPrice('');
    setStockQuantity('');
    setMakingCharges('0');
    setGst('3');
    setPurity('92.5%');
    setIsFeatured(false);
    setTags('');
    setImages([]);
  };

  // ===============================
  // Submit Product
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
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const basePriceNum = parseFloat(basePrice);
      const sellingPriceNum = parseFloat(sellingPrice);

      const discount =
        basePriceNum > sellingPriceNum
          ? Math.round(
              ((basePriceNum - sellingPriceNum) / basePriceNum) * 100
            )
          : 0;

      const productData = {
        name,
        description,
        category,
        metal,
        weight: parseFloat(weight),
        makingCharges: parseFloat(makingCharges) || 0,
        gst: parseFloat(gst) || 3,
        purity,
        price: {
          basePrice: basePriceNum,
          sellingPrice: sellingPriceNum,
          discount,
        },
        stock: {
          quantity: parseInt(stockQuantity, 10),
          lowStockThreshold: 5,
        },
        isFeatured,
        tags: tags
          ? tags.split(',').map(t => t.trim()).filter(Boolean)
          : [],
      };

      const createResponse = await productService.create(productData);

      if (!createResponse.success || !createResponse.data?.product) {
        throw new Error(createResponse.error || 'Failed to create product');
      }

      const productId = createResponse.data.product._id;

      if (images.length > 0) {
        const uploadResponse = await productService.uploadImages(
          productId,
          images
        );

        if (!uploadResponse.success) {
          toast({
            title: 'Product Created',
            description:
              'Product created but image upload failed. You can add images later.',
          });
        }
      }

      toast({
        title: 'Success!',
        description: 'Product created successfully.',
      });

      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================
  // Loading State
  // ===============================
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // ===============================
  // Access Denied
  // ===============================
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <p className="text-lg text-muted-foreground">Access Denied</p>
      </div>
    );
  }

  // ===============================
  // Render Form
  // ===============================
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            Internal Product Upload
          </h1>
          <p className="text-sm text-muted-foreground">
            Admin only – Add new products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Product Name</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Label>Category</Label>
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

          <div>
            <Label>Upload Images</Label>
            <Input type="file" multiple onChange={handleImageChange} />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Product...
              </>
            ) : (
              'Create Product'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InternalUpload;
