import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  // 🔐 AUTH CONTEXT (SINGLE SOURCE OF TRUTH)
  const { user, isLoading: authLoading } = useAuth();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ===============================
  // FORM STATE
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
  // ✅ ADMIN AUTH CHECK (FINAL)
  // ===============================
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setIsAuthorized(false);
      return;
    }

    if (user.role !== 'admin') {
      setIsAuthorized(false);
      return;
    }

    setIsAuthorized(true);
  }, [user, authLoading]);

  // ===============================
  // FETCH CATEGORIES (ADMIN ONLY)
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
        await productService.uploadImages(productId, images);
      }

      toast({
        title: 'Success',
        description: 'Product created successfully',
      });

      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===============================
  // LOADING STATE
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
        <p className="text-lg text-muted-foreground">Access Denied</p>
      </div>
    );
  }

  // ===============================
  // RENDER FORM
  // ===============================
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          Internal Product Upload
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* KEEP YOUR FULL FORM JSX HERE */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InternalUpload;
