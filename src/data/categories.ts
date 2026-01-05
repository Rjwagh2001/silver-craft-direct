import { Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bangles',
    slug: 'bangles',
    description: 'Delicate and bold—our 92.5 silver bangles are finely finished with premium detailing. Perfect for daily wear and special occasions.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    productCount: 20
  },
  {
    id: '2',
    name: 'Rings',
    slug: 'rings',
    description: 'From minimalist bands to statement designs — crafted to last and comfortable to wear.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    productCount: 20
  },
  {
    id: '3',
    name: 'Chains',
    slug: 'chains',
    description: 'Strong, stylish and polished — chains designed to pair with pendants or worn solo.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    productCount: 20
  },
  {
    id: '4',
    name: 'Anklets',
    slug: 'anklets',
    description: 'Traditional and contemporary anklets that add grace to every step you take.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
    productCount: 20
  },
  {
    id: '5',
    name: 'Earrings',
    slug: 'earrings',
    description: 'From studs to danglers — elegant earrings for every occasion and style.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
    productCount: 20
  },
  {
    id: '6',
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Sophisticated bracelets that complement your wrist with timeless elegance.',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
    productCount: 20
  },
  {
    id: '7',
    name: 'Bridal',
    slug: 'bridal',
    description: 'Exquisite bridal collections for your special day — crafted with love and tradition.',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80',
    productCount: 10
  }
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};
