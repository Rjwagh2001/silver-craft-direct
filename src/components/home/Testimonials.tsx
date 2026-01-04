import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rajesh Sharma",
    location: "Mumbai",
    text: "Beautiful craftsmanship and real 92.5 silver — excellent value! The finishing is impeccable and I've become a regular customer.",
    rating: 5,
  },
  {
    name: "Meera Patil",
    location: "Pune",
    text: "Fast shipping and great finish. I buy for my shop and customers love it. The wholesale pricing helps my margins significantly.",
    rating: 5,
  },
  {
    name: "Neha Kulkarni",
    location: "Nanded",
    text: "Perfect gift for my mother. The detailing is superb and trustable. Will definitely order again for the upcoming festival season.",
    rating: 5,
  },
  {
    name: "Amit Deshmukh",
    location: "Nagpur",
    text: "As a retailer, I've tried many suppliers. Laxmi Silver stands out for consistent quality and honest pricing. Highly recommended!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-3 sm:mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <div className="section-divider mt-4 sm:mt-6" />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="bg-background rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 shadow-medium relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-primary/10">
                <Quote className="w-16 h-16 sm:w-24 sm:h-24" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="font-serif text-base sm:text-xl md:text-2xl text-foreground mb-6 sm:mb-8 leading-relaxed pr-8 sm:pr-0">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-base sm:text-lg text-primary">
                      {testimonials[currentIndex].name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-sm sm:text-base text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                variant="luxury-outline"
                size="icon"
                onClick={prev}
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-1.5 sm:gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-6 sm:w-8 bg-primary"
                        : "w-2 bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="luxury-outline"
                size="icon"
                onClick={next}
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;