import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "Pure 92.5 Silver",
    subtitle: "Trusted Craftsmanship Since Generations",
    description: "Every piece hallmarked for purity",
    gradient: "from-[#f8f6f3] via-[#f5f0eb] to-[#ede5db]",
    textColor: "text-charcoal",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&q=80",
  },
  {
    id: 2,
    title: "Wholesale to You",
    subtitle: "From Factory to Your Doorstep",
    description: "Premium quality at honest prices",
    gradient: "from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
  },
  {
    id: 3,
    title: "Master Artisans",
    subtitle: "Handcrafted Excellence",
    description: "Each piece tells a story of skill",
    gradient: "from-[#f5f0eb] via-[#ebe3d9] to-[#e5dace]",
    textColor: "text-charcoal",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=1200&q=80",
  },
  {
    id: 4,
    title: "Certified Purity",
    subtitle: "Trust in Every Purchase",
    description: "BIS Hallmarked · Quality Assured",
    gradient: "from-[#2a2a2a] via-[#1f1f1f] to-[#2a2a2a]",
    textColor: "text-white",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&q=80",
  },
  {
    id: 5,
    title: "New Designs Daily",
    subtitle: "Fresh Collections Every Day",
    description: "Be the first to own unique pieces",
    gradient: "from-[#f8f6f3] via-[#f0ebe4] to-[#e8e0d5]",
    textColor: "text-charcoal",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1200&q=80",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden">
      {/* Slides */}
      <div className="relative h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Background */}
            <div className={cn("absolute inset-0 bg-gradient-to-r", slide.gradient)} />
            
            {/* Content Container */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
                  {/* Text Content */}
                  <div className={cn("text-center lg:text-left", slide.textColor)}>
                    <p className="text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-3 opacity-70 font-sans">
                      {slide.subtitle}
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3 sm:mb-4 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-sm sm:text-base opacity-80 max-w-md mx-auto lg:mx-0">
                      {slide.description}
                    </p>
                  </div>
                  
                  {/* Image */}
                  <div className="hidden lg:flex justify-center lg:justify-end">
                    <div className="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px]">
                      <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm" />
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)] object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft hover:bg-background transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-soft hover:bg-background transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-6 bg-primary"
                : "bg-foreground/30 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
