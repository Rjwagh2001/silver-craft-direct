import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { categoryService, ApiCategory } from '@/services/category.service';
import { productService } from '@/services/product.service';
import { Loader2, Upload, ShieldAlert } from 'lucide-react';

// Decode JWT payload (base64url)
const decodeJWT = (token: string): { role?: string } | null => {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const InternalUpload = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
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

  // Check admin role on mount
  useEffect(() => {
  const checkAdminRole = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    const decoded = decodeJWT(token);

    if (decoded?.role === 'ADMIN') {
      setIsAuthorized(true);
    }

    setIsCheckingAuth(false);
  };

  checkAdminRole();
}, []);

  // Fetch categories
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !description || !category || !weight || !basePrice || !sellingPrice || !stockQuantity) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create product
      const basePriceNum = parseFloat(basePrice);
      const sellingPriceNum = parseFloat(sellingPrice);
      const discount = basePriceNum > sellingPriceNum 
        ? Math.round(((basePriceNum - sellingPriceNum) / basePriceNum) * 100) 
        : 0;

      const productData = {
        name,
        description,
        category, // This is the slug
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
          lowStockThreshold: 5, // Default low stock threshold
        },
        isFeatured,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      };

      const createResponse = await productService.create(productData);

      if (!createResponse.success || !createResponse.data?.product) {
        throw new Error(createResponse.error || 'Failed to create product');
      }

      const productId = createResponse.data.product._id;

      // Step 2: Upload images if any
      if (images.length > 0) {
        const uploadResponse = await productService.uploadImages(productId, images);
        if (!uploadResponse.success) {
          toast({
            title: 'Product Created',
            description: 'Product created but image upload failed. You can add images later.',
            variant: 'default',
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
        description: error instanceof Error ? error.message : 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not authorized (should redirect, but fallback UI)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <p className="text-lg text-muted-foreground">Access Denied</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Internal Product Upload</h1>
          <p className="text-sm text-muted-foreground mt-1">Admin only - Add new products to the catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sterling Silver Ring"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description..."
              rows={4}
              required
            />
          </div>

          {/* Category & Metal */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat._id} value={cat.slug}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Metal *</Label>
              <Select value={metal} onValueChange={setMetal}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silver">Silver</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Weight & Purity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (grams) *</Label>
              <Input
                id="weight"
                type="number"
                step="0.01"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 5.5"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="purity">Purity</Label>
              <Input
                id="purity"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
                placeholder="92.5%"
              />
            </div>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (₹) *</Label>
              <Input
                id="basePrice"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                placeholder="e.g., 5000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
              <Input
                id="sellingPrice"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="e.g., 4500"
                required
              />
            </div>
          </div>

          {/* Stock & Making Charges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stockQuantity">Stock Quantity *</Label>
              <Input
                id="stockQuantity"
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                placeholder="e.g., 10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="makingCharges">Making Charges (₹)</Label>
              <Input
                id="makingCharges"
                type="number"
                value={makingCharges}
                onChange={(e) => setMakingCharges(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* GST */}
          <div className="space-y-2">
            <Label htmlFor="gst">GST (%)</Label>
            <Input
              id="gst"
              type="number"
              step="0.1"
              value={gst}
              onChange={(e) => setGst(e.target.value)}
              placeholder="3"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., wedding, festive, daily wear"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFeatured"
              checked={isFeatured}
              onCheckedChange={(checked) => setIsFeatured(checked === true)}
            />
            <Label htmlFor="isFeatured" className="cursor-pointer">Mark as Featured</Label>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label htmlFor="images">Product Images</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {images.length > 0
                    ? `${images.length} file(s) selected`
                    : 'Click to upload images'}
                </p>
              </label>
            </div>
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((file, idx) => (
                  <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                    {file.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
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
