import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, Play, Volume2, VolumeX } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

// Phase 1: Brand Introduction slides
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&q=80",
    title: "Where Purity Meets Craftsmanship",
    subtitle: "Hallmarked 92.5 Purity"
  },
  {
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&q=80",
    title: "Timeless Elegance",
    subtitle: "Handcrafted Excellence"
  },
  {
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&q=80",
    title: "Pure Silver, Pure Trust",
    subtitle: "Trusted Craftsmanship"
  }
];

// Phase 2: Story Videos (placeholders - will be replaced with real videos)
const storyVideos = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80",
    theme: "Customers wearing Laxmi Silver"
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
    theme: "Silver craftsmanship"
  },
  {
    id: 3,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    theme: "Customer testimonial"
  },
  {
    id: 4,
    video: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80",
    theme: "Daily wear elegance"
  },
  {
    id: 5,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    theme: "Trust & purity"
  }
];

const Hero = () => {
  const [phase, setPhase] = useState<'intro' | 'story'>('intro');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  
  // Phase 1: Auto-slide through hero images
  useEffect(() => {
    if (phase === 'intro') {
      const timer = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev >= heroSlides.length - 1) {
            // Transition to story phase after last slide
            setTimeout(() => setPhase('story'), 1000);
            return prev;
          }
          return prev + 1;
        });
      }, 6000); // 6 seconds per slide
      
      return () => clearInterval(timer);
    }
  }, [phase]);

  // Phase 2: Auto-slide through story videos
  useEffect(() => {
    if (phase === 'story') {
      const timer = setInterval(() => {
        setCurrentVideo(prev => (prev + 1) % storyVideos.length);
      }, 8000); // 8 seconds per video
      
      return () => clearInterval(timer);
    }
  }, [phase]);

  if (phase === 'story') {
    return (
      <section className="relative min-h-[70vh] sm:min-h-[80vh] bg-foreground overflow-hidden">
        {/* Story Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-foreground/80 to-transparent pt-4 pb-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-1">
                Our Story
              </p>
              <h2 className="font-serif text-lg sm:text-xl text-background">
                The Laxmi Silver Journey
              </h2>
            </div>
          </div>
        </div>

        {/* Video Carousel - NO CONTROLS */}
        <div className="absolute inset-0">
          {storyVideos.map((video, index) => (
            <div
              key={video.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentVideo ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <video
                src={video.video}
                poster={video.poster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-foreground/40" />
            </div>
          ))}
        </div>

        {/* Mute Toggle - Only control allowed */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-6 right-6 z-20 p-3 bg-background/10 backdrop-blur-sm rounded-full hover:bg-background/20 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-background" />
          ) : (
            <Volume2 className="h-5 w-5 text-background" />
          )}
        </button>

        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {storyVideos.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentVideo 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-background/40'
              }`}
            />
          ))}
        </div>

        {/* Skip to Explore */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <Link to="/collections">
            <Button 
              variant="luxury-light" 
              size="sm"
              className="gap-2 bg-background/10 backdrop-blur-sm hover:bg-background/20"
            >
              Explore Collections
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  // Phase 1: Brand Introduction
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>
      ))}

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-background/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 lg:py-0">
        <div className="max-w-2xl">
          {/* Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-background/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-background">
                {heroSlides[currentSlide].subtitle}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6 text-background animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {heroSlides[currentSlide].title.split(' ').map((word, i) => (
                <span key={i}>
                  {word === 'Purity' || word === 'Elegance' || word === 'Trust' ? (
                    <span className="text-primary">{word}</span>
                  ) : word}
                  {' '}
                </span>
              ))}
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-background/80 mb-6 sm:mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              Authentic 92.5 sterling silver — wholesale quality, now available directly to you.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <Link to="/collections">
                <Button variant="luxury" size="lg" className="gap-2 sm:gap-3 group">
                  Explore Collections
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://www.instagram.com/laxmisilverofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="luxury-outline" size="lg" className="gap-2 sm:gap-3 border-background/30 text-background hover:bg-background/10">
                  <Instagram className="h-4 w-4" />
                  @laxmisilverofficial
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <div className="text-left">
                <p className="font-serif text-xl sm:text-2xl text-background">92.5%</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-background/60">Pure Silver</p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-background/20" />
              <div className="text-left">
                <p className="font-serif text-xl sm:text-2xl text-background">40%</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-background/60">Save vs Market</p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-background/20 hidden sm:block" />
              <div className="text-left hidden sm:block">
                <p className="font-serif text-xl sm:text-2xl text-background">Daily</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-background/60">New Designs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroSlides.map((_, index) => (
          <div
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-background/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;