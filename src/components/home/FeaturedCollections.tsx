import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Bangles",
    description: "Delicate and bold designs, finely finished with premium detailing.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop",
    slug: "bangles",
  },
  {
    name: "Chains",
    description: "Strong, stylish and polished — designed to pair or worn solo.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop",
    slug: "chains",
  },
  {
    name: "Rings",
    description: "From minimalist bands to statement designs — crafted to last.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop",
    slug: "rings",
  },
];

const FeaturedCollections = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-3 sm:mb-4 block">
            Our Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Featured Collections
          </h2>
          <div className="section-divider mt-4 sm:mt-6" />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 stagger-children">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              to={`/collections/${collection.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl card-luxury">
                {/* Image */}
                <div className="aspect-[3/4] img-zoom">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <h3 className="font-serif text-xl sm:text-2xl text-background mb-1 sm:mb-2">
                    {collection.name}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-background/70 mb-3 sm:mb-4 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center gap-2 font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-background group-hover:gap-3 sm:group-hover:gap-4 transition-all duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-background/20 rounded-xl sm:rounded-2xl transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 font-sans text-xs sm:text-sm uppercase tracking-luxury text-primary hover:gap-3 sm:hover:gap-4 transition-all duration-300 elegant-underline pb-1"
          >
            View All Collections
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;