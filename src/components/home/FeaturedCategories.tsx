import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const featuredCategories = [
  {
    name: "Bangles",
    slug: "bangles",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    description: "Timeless elegance",
  },
  {
    name: "Rings",
    slug: "rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    description: "Statement pieces",
  },
  {
    name: "Chains",
    slug: "chains",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    description: "Classic & bold",
  },
  {
    name: "Earrings",
    slug: "earrings",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80",
    description: "Grace in detail",
  },
  {
    name: "Bridal",
    slug: "bridal",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80",
    description: "For your special day",
  },
  {
    name: "Daily Wear",
    slug: "bracelets",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
    description: "Everyday elegance",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            Shop by Category
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Explore our curated collections
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/collections/${category.slug}`}
              className={`group relative overflow-hidden rounded-lg sm:rounded-xl aspect-[4/5] ${
                index === 0 || index === 5 ? "sm:row-span-1" : ""
              }`}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 lg:p-6">
                <h3 className="font-serif text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-0.5 sm:mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs sm:text-sm hidden sm:block">
                  {category.description}
                </p>
                <div className="flex items-center gap-1 text-white/80 text-xs sm:text-sm mt-2 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
