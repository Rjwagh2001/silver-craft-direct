import { Product } from '@/types/product';

export const products: Product[] = [
  // Bangles
  {
    id: 'b1',
    name: '92.5 Silver Filigree Bangles — Classic Pair',
    slug: 'silver-filigree-bangles-classic',
    category: 'bangles',
    price: 4599,
    originalPrice: 5999,
    weight: '45 grams',
    purity: '92.5 Sterling Silver',
    description: 'Handcrafted in 92.5 sterling silver, the Filigree Classic Bangles blend delicate craftsmanship with durable construction. Inspired by traditional motifs reimagined for everyday wear, each bangle is finished by master artisans and hallmarked for purity. The lightweight design is comfortable for daily use while the polished surfaces catch the light beautifully. Perfect as a gift or a refined addition to your collection.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    isBestseller: true,
    sku: 'LJ-B001'
  },
  {
    id: 'b2',
    name: '92.5 Silver Traditional Kadha Bangles',
    slug: 'silver-traditional-kadha',
    category: 'bangles',
    price: 6299,
    originalPrice: 7499,
    weight: '58 grams',
    purity: '92.5 Sterling Silver',
    description: 'Heavy-weight traditional Kadha bangles crafted in pure 92.5 sterling silver. Features intricate embossed patterns inspired by royal Rajasthani designs. Perfect for festive occasions and traditional ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-B002'
  },
  {
    id: 'b3',
    name: '92.5 Silver Oxidized Tribal Bangles Set',
    slug: 'silver-oxidized-tribal-set',
    category: 'bangles',
    price: 3899,
    weight: '38 grams',
    purity: '92.5 Sterling Silver',
    description: 'Set of 4 oxidized silver bangles with tribal motifs. Each piece features unique hand-carved patterns celebrating India\'s rich tribal heritage.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-B003'
  },
  {
    id: 'b4',
    name: '92.5 Silver Sleek Modern Bangles',
    slug: 'silver-sleek-modern',
    category: 'bangles',
    price: 2999,
    weight: '28 grams',
    purity: '92.5 Sterling Silver',
    description: 'Minimalist modern bangles with a polished finish. Perfect for office wear and contemporary styling.',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    inStock: true,
    sku: 'LJ-B004'
  },
  // Rings
  {
    id: 'r1',
    name: '92.5 Silver Solitaire Statement Ring',
    slug: 'silver-solitaire-statement',
    category: 'rings',
    price: 1899,
    originalPrice: 2499,
    weight: '8 grams',
    purity: '92.5 Sterling Silver',
    description: 'Bold solitaire-style ring in pure 92.5 silver with a raised setting. Features a brilliant-cut cubic zirconia center stone. Adjustable band for perfect fit.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    isBestseller: true,
    sku: 'LJ-R001'
  },
  {
    id: 'r2',
    name: '92.5 Silver Oxidized Peacock Ring',
    slug: 'silver-oxidized-peacock',
    category: 'rings',
    price: 1299,
    weight: '6 grams',
    purity: '92.5 Sterling Silver',
    description: 'Intricately designed peacock motif ring with oxidized finish. A stunning piece that celebrates India\'s national bird.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    inStock: true,
    sku: 'LJ-R002'
  },
  {
    id: 'r3',
    name: '92.5 Silver Minimalist Band Ring',
    slug: 'silver-minimalist-band',
    category: 'rings',
    price: 899,
    weight: '4 grams',
    purity: '92.5 Sterling Silver',
    description: 'Clean, sleek band ring perfect for daily wear. Polished to perfection with comfortable inner edges.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    inStock: true,
    sku: 'LJ-R003'
  },
  {
    id: 'r4',
    name: '92.5 Silver Vintage Floral Ring',
    slug: 'silver-vintage-floral',
    category: 'rings',
    price: 1599,
    weight: '7 grams',
    purity: '92.5 Sterling Silver',
    description: 'Vintage-inspired floral design with antique finish. Features delicate petal patterns surrounding a center stone.',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-R004'
  },
  // Chains
  {
    id: 'c1',
    name: '92.5 Silver Cuban Link Chain',
    slug: 'silver-cuban-link-chain',
    category: 'chains',
    price: 5499,
    originalPrice: 6999,
    weight: '35 grams',
    purity: '92.5 Sterling Silver',
    description: 'Classic Cuban link chain in premium 92.5 silver. Features secure lobster clasp and polished links. Available in 20" and 24" lengths.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-C001'
  },
  {
    id: 'c2',
    name: '92.5 Silver Box Chain — Delicate',
    slug: 'silver-box-chain-delicate',
    category: 'chains',
    price: 2999,
    weight: '15 grams',
    purity: '92.5 Sterling Silver',
    description: 'Delicate box chain perfect for pendants. Lightweight yet durable with a beautiful shine.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    inStock: true,
    sku: 'LJ-C002'
  },
  {
    id: 'c3',
    name: '92.5 Silver Rope Chain Heavy',
    slug: 'silver-rope-chain-heavy',
    category: 'chains',
    price: 7999,
    weight: '52 grams',
    purity: '92.5 Sterling Silver',
    description: 'Heavyweight rope chain with intricate twisted design. A statement piece for those who appreciate bold jewelry.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-C003'
  },
  // Anklets
  {
    id: 'a1',
    name: '92.5 Silver Traditional Payal Pair',
    slug: 'silver-traditional-payal',
    category: 'anklets',
    price: 3299,
    originalPrice: 3999,
    weight: '42 grams',
    purity: '92.5 Sterling Silver',
    description: 'Traditional payal with delicate ghungroos (bells). Handcrafted with intricate patterns and secure clasps. The gentle chime adds charm to every step.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-A001'
  },
  {
    id: 'a2',
    name: '92.5 Silver Modern Anklet Chain',
    slug: 'silver-modern-anklet',
    category: 'anklets',
    price: 1899,
    weight: '18 grams',
    purity: '92.5 Sterling Silver',
    description: 'Sleek modern anklet with minimalist charm pendants. Perfect for contemporary styling.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-A002'
  },
  // Earrings
  {
    id: 'e1',
    name: '92.5 Silver Jhumka Earrings — Traditional',
    slug: 'silver-jhumka-traditional',
    category: 'earrings',
    price: 2799,
    originalPrice: 3499,
    weight: '22 grams',
    purity: '92.5 Sterling Silver',
    description: 'Classic dome-shaped jhumka earrings with intricate filigree work. Features traditional bell-shaped drops with delicate ghungroos.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-E001'
  },
  {
    id: 'e2',
    name: '92.5 Silver Stud Earrings — Diamond Cut',
    slug: 'silver-stud-diamond-cut',
    category: 'earrings',
    price: 999,
    weight: '5 grams',
    purity: '92.5 Sterling Silver',
    description: 'Simple yet elegant diamond-cut stud earrings. Perfect for everyday wear with secure butterfly backs.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80'
    ],
    inStock: true,
    sku: 'LJ-E002'
  },
  {
    id: 'e3',
    name: '92.5 Silver Chandbali Earrings',
    slug: 'silver-chandbali',
    category: 'earrings',
    price: 3599,
    weight: '28 grams',
    purity: '92.5 Sterling Silver',
    description: 'Stunning crescent-shaped chandbali earrings with pearl drops. A royal design perfect for weddings and festivals.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-E003'
  },
  // Bracelets
  {
    id: 'br1',
    name: '92.5 Silver Tennis Bracelet',
    slug: 'silver-tennis-bracelet',
    category: 'bracelets',
    price: 4999,
    originalPrice: 5999,
    weight: '25 grams',
    purity: '92.5 Sterling Silver',
    description: 'Elegant tennis bracelet with cubic zirconia stones set in 92.5 silver. Features secure box clasp with safety catch.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-BR001'
  },
  {
    id: 'br2',
    name: '92.5 Silver Charm Bracelet',
    slug: 'silver-charm-bracelet',
    category: 'bracelets',
    price: 2499,
    weight: '18 grams',
    purity: '92.5 Sterling Silver',
    description: 'Delicate chain bracelet with multiple charm pendants. Perfect for stacking or wearing alone.',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-BR002'
  },
  // Bridal
  {
    id: 'brd1',
    name: '92.5 Silver Bridal Necklace Set',
    slug: 'silver-bridal-necklace-set',
    category: 'bridal',
    price: 24999,
    originalPrice: 29999,
    weight: '185 grams',
    purity: '92.5 Sterling Silver',
    description: 'Complete bridal set including statement necklace, matching earrings, maang tikka, and bangles. Intricate kundan-style work with pearl accents.',
    images: [
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80'
    ],
    inStock: true,
    isBestseller: true,
    sku: 'LJ-BRD001'
  },
  {
    id: 'brd2',
    name: '92.5 Silver Bridal Choker Set',
    slug: 'silver-bridal-choker',
    category: 'bridal',
    price: 18999,
    weight: '145 grams',
    purity: '92.5 Sterling Silver',
    description: 'Elegant bridal choker with matching jhumka earrings. Features traditional temple jewelry design.',
    images: [
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80'
    ],
    inStock: true,
    isNew: true,
    sku: 'LJ-BRD002'
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.isBestseller).slice(0, 8);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew).slice(0, 8);
};
