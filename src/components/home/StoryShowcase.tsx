import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Play, Volume2, VolumeX } from "lucide-react";

const storyItems = [
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
    title: "Exquisite Craftsmanship",
    subtitle: "Each piece tells a story",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    title: "Pure 92.5 Silver",
    subtitle: "Hallmarked for authenticity",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80",
    title: "Bridal Heritage",
    subtitle: "Traditions reimagined",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
    title: "Timeless Elegance",
    subtitle: "Designs that transcend time",
  },
  {
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    title: "Daily Grace",
    subtitle: "Luxury for every moment",
  },
  // Placeholder videos - will be replaced with real brand videos
  {
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-showing-off-earrings-34582-large.mp4",
    poster: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    title: "Behind the Craft",
    subtitle: "Watch our artisans at work",
  },
  {
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-holding-a-gold-necklace-39881-large.mp4",
    poster: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    title: "Our Legacy",
    subtitle: "Generations of excellence",
  },
  {
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-jewelry-on-display-34584-large.mp4",
    poster: "https://images.unsplash.com/photo-1618173745201-8bb10527a4f0?w=800&q=80",
    title: "The Collection",
    subtitle: "Curated for you",
  },
  {
    type: "video" as const,
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-gold-jewelry-34581-large.mp4",
    poster: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    title: "Wear Your Story",
    subtitle: "Make it yours",
  },
];

const StoryShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % storyItems.length);
    }, 8000); // 8 seconds per slide

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to current item
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / storyItems.length;
      scrollRef.current.scrollTo({
        left: currentIndex * itemWidth - (scrollRef.current.clientWidth / 2) + (itemWidth / 2),
        behavior: "smooth",
      });
    }

    // Pause all videos, play current if it's a video
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex && storyItems[index].type === "video") {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-8 sm:py-12 bg-charcoal/5">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-2">
            Our Story
          </p>
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground">
            The Lakshmi Silver Journey
          </h2>
          <div className="section-divider mt-3" />
        </div>

        {/* Main Showcase */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
          {storyItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={item.src}
                  poster={item.poster}
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-white text-lg sm:text-xl lg:text-2xl mb-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs sm:text-sm">
                      {item.subtitle}
                    </p>
                  </div>
                  
                  {item.type === "video" && (
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Video indicator */}
              {item.type === "video" && (
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-3 px-3 sm:mx-0 sm:px-0"
        >
          {storyItems.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300",
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                  : "opacity-60 hover:opacity-100"
              )}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.poster}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {storyItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryShowcase;
