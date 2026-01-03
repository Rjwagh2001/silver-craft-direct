import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely love my silver bangles! The quality is exceptional and the craftsmanship is beautiful. Will definitely order again.",
    product: "Filigree Bangles",
  },
  {
    id: 2,
    name: "Anita Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Best silver jewelry I've ever bought online. The purity is genuine and packaging was premium. Highly recommended!",
    product: "Traditional Payal",
  },
  {
    id: 3,
    name: "Kavitha R",
    location: "Chennai",
    rating: 5,
    text: "Bought the bridal set for my daughter's wedding. Everyone was impressed! True wholesale prices with retail quality.",
    product: "Bridal Necklace Set",
  },
  {
    id: 4,
    name: "Sunita Joshi",
    location: "Pune",
    rating: 5,
    text: "The ring I ordered was exactly as shown. Perfect fit and the silver quality is top-notch. Fast delivery too!",
    product: "Solitaire Ring",
  },
  {
    id: 5,
    name: "Meera Krishnan",
    location: "Bangalore",
    rating: 4,
    text: "Beautiful earrings with great detailing. Customer service was very helpful. Will shop again!",
    product: "Jhumka Earrings",
  },
];

const ReviewsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-secondary/20">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header - Centered with Divider */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-2">
            Customer Love
          </p>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground">
            Trusted by Silver Lovers Across India
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 italic">
            "Join thousands of happy customers"
          </p>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-1.5 h-1.5 rotate-45 border border-primary/40" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-3 px-3 sm:mx-0 sm:px-0"
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-[280px] sm:w-[320px] bg-background rounded-xl p-4 sm:p-5 shadow-card"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-foreground/80 mb-4 line-clamp-3">
                  "{review.text}"
                </p>

                {/* Reviewer Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Purchased</p>
                    <p className="text-xs text-primary font-medium">{review.product}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation - Desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background shadow-medium hover:shadow-luxury transition-shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 items-center justify-center rounded-full bg-background shadow-medium hover:shadow-luxury transition-shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Link */}
        <div className="text-center mt-6">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View All Reviews
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
