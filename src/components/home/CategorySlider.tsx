import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { Sparkles } from "lucide-react";

interface SliderCategory {
  name: string;
  slug: string;
  image?: string;
}

const CategorySlider = () => {
  const allCategories: SliderCategory[] = [
    { name: "New Arrivals", slug: "new-arrivals" },
    ...categories.map(cat => ({ name: cat.name, slug: cat.slug, image: cat.image })),
  ];

  return (
    <section className="bg-background border-b border-border">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 min-w-max">
          {allCategories.map((category) => (
            <Link
              key={category.slug}
              to={category.slug === "new-arrivals" ? "/collections?filter=new" : `/collections/${category.slug}`}
              className="flex flex-col items-center gap-1.5 sm:gap-2 group min-w-[60px] sm:min-w-[72px]"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors duration-300 bg-secondary/30">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-foreground/80 group-hover:text-primary transition-colors text-center leading-tight">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
