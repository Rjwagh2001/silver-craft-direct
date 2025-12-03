import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
      {/* Decorative Elements - Hidden on small mobile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-silver/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] border border-border/30 rounded-full" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] lg:w-[600px] h-[450px] lg:h-[600px] border border-border/20 rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 sm:py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-full mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-muted-foreground">
                Hallmarked 92.5 Purity
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Where Purity
              <br />
              <span className="text-primary">Meets</span> Craftsmanship
            </h1>

            <p className="font-sans text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in-up px-2 sm:px-0" style={{ animationDelay: "0.4s" }}>
              Authentic 92.5 sterling silver — wholesale quality, now available directly to you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up px-2 sm:px-0" style={{ animationDelay: "0.6s" }}>
              <Link to="/collections" className="w-full sm:w-auto">
                <Button variant="luxury" size="lg" className="gap-2 sm:gap-3 group w-full sm:w-auto text-sm sm:text-base">
                  Explore New Arrivals
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a
                href="https://www.instagram.com/laxmisilverofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button variant="luxury-outline" size="lg" className="gap-2 sm:gap-3 w-full sm:w-auto text-sm sm:text-base">
                  <Instagram className="h-4 w-4" />
                  <span className="hidden xs:inline">Follow</span> @laxmisilverofficial
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl text-foreground">92.5%</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-muted-foreground">Pure Silver</p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-border" />
              <div className="text-center">
                <p className="font-serif text-xl sm:text-2xl text-foreground">40%</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-muted-foreground">Save vs Market</p>
              </div>
              <div className="w-px h-8 sm:h-10 bg-border hidden sm:block" />
              <div className="text-center hidden sm:block">
                <p className="font-serif text-xl sm:text-2xl text-foreground">Daily</p>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-muted-foreground">New Designs</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: "0.4s" }}>
            <div className="relative aspect-[4/5] max-w-[280px] sm:max-w-sm md:max-w-md mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury">
                <img 
                  src={heroImage} 
                  alt="Premium 92.5 Sterling Silver Jewelry Collection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-background rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-medium animate-float">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-sm sm:text-lg text-primary">✓</span>
                  </div>
                  <div>
                    <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-muted-foreground">Certified</p>
                    <p className="font-serif text-xs sm:text-sm text-foreground">Hallmarked</p>
                  </div>
                </div>
              </div>

              {/* Price Badge */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-luxury animate-float" style={{ animationDelay: "0.5s" }}>
                <p className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury opacity-80">Starting at</p>
                <p className="font-serif text-lg sm:text-2xl">₹999</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
          <div className="w-1 h-1.5 sm:h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;