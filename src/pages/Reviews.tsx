import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "Absolutely love my silver bangles! The quality is exceptional and the craftsmanship is beautiful. The hallmark is genuine and the silver quality is exactly as promised. Will definitely order again.",
    product: "Filigree Bangles",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 2,
    name: "Anita Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "Best silver jewelry I've ever bought online. The purity is genuine and packaging was premium. The team was very helpful with sizing. Highly recommended!",
    product: "Traditional Payal",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 3,
    name: "Kavitha R",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    text: "Bought the bridal set for my daughter's wedding. Everyone was impressed! True wholesale prices with retail quality. The set looked exactly like the photos.",
    product: "Bridal Necklace Set",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Sunita Joshi",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "The ring I ordered was exactly as shown. Perfect fit and the silver quality is top-notch. Fast delivery too! Already planning my next purchase.",
    product: "Solitaire Ring",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 5,
    name: "Meera Krishnan",
    location: "Bangalore, Karnataka",
    rating: 4,
    text: "Beautiful earrings with great detailing. Customer service was very helpful when I had questions about care. Will definitely shop again!",
    product: "Jhumka Earrings",
    date: "2 months ago",
    verified: true,
  },
  {
    id: 6,
    name: "Rekha Agarwal",
    location: "Delhi",
    rating: 5,
    text: "I was skeptical about buying jewelry online but Lakshmi Silver exceeded my expectations. The chain is solid, well-made, and the price was unbeatable.",
    product: "Cuban Link Chain",
    date: "1 month ago",
    verified: true,
  },
  {
    id: 7,
    name: "Deepa Menon",
    location: "Kochi, Kerala",
    rating: 5,
    text: "The anklets are gorgeous! Perfect for daily wear. The sound of the ghungroos is so pleasant. Love the traditional design with modern comfort.",
    product: "Traditional Payal",
    date: "3 weeks ago",
    verified: true,
  },
  {
    id: 8,
    name: "Sneha Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    text: "Ordered a bracelet for my mother's birthday. She absolutely loved it! The packaging was gift-ready and very elegant. Great customer experience.",
    product: "Tennis Bracelet",
    date: "2 weeks ago",
    verified: true,
  },
];

const Reviews = () => {
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((r) => r.rating === rating).length
  );

  return (
    <>
      <Helmet>
        <title>Customer Reviews | Lakshmi Silver</title>
        <meta
          name="description"
          content="Read what our customers say about Lakshmi Silver jewellery. Trusted by thousands across India for quality 92.5 silver pieces."
        />
      </Helmet>

      <div className="min-h-screen overflow-x-hidden pb-16 md:pb-0">
        <Navbar />
        <main className="bg-background">
          {/* Header */}
          <section className="py-8 sm:py-12 bg-secondary/20 border-b border-border">
            <div className="container mx-auto px-4">
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground text-center mb-2">
                Customer Reviews
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground text-center">
                Trusted by Silver Lovers Across India
              </p>
            </div>
          </section>

          {/* Rating Summary */}
          <section className="py-6 sm:py-8 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                {/* Average Rating */}
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-foreground mb-1">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex gap-0.5 justify-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(averageRating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {reviews.length} reviews
                  </p>
                </div>

                {/* Rating Breakdown */}
                <div className="w-full max-w-xs">
                  {[5, 4, 3, 2, 1].map((rating, index) => (
                    <div key={rating} className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm w-3">{rating}</span>
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{
                            width: `${(ratingCounts[index] / reviews.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-6">
                        {ratingCounts[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Reviews List */}
          <section className="py-8 sm:py-12">
            <div className="container mx-auto px-4">
              <div className="grid gap-4 sm:gap-6 max-w-3xl mx-auto">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card rounded-xl p-4 sm:p-6 shadow-card"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">
                            {review.name}
                          </span>
                          {review.verified && (
                            <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {review.location}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>

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

                    <p className="text-sm text-foreground/80 mb-3">
                      "{review.text}"
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Purchased:{" "}
                      <span className="text-primary font-medium">
                        {review.product}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default Reviews;
