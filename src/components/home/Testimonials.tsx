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
    text: "As a retailer, I've tried many suppliers. Laxmi Jewellers stands out for consistent quality and honest pricing. Highly recommended!",
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
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            What Our Customers Say
          </h2>
          <div className="section-divider mt-6" />
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="bg-background rounded-3xl p-8 md:p-12 shadow-medium relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-primary/10">
                <Quote className="w-24 h-24" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="font-serif text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-lg text-primary">
                      {testimonials[currentIndex].name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-medium text-foreground">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="font-sans text-sm text-muted-foreground">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="luxury-outline"
                size="icon"
                onClick={prev}
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-primary/30 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="luxury-outline"
                size="icon"
                onClick={next}
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
