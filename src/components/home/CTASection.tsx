import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-maroon relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-background/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-background/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-primary-foreground/70 mb-3 sm:mb-4 block">
            Ready to Shop?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4 sm:mb-6 px-2">
            Experience the Purity of 92.5 Silver
          </h2>
          <p className="font-sans text-sm sm:text-base lg:text-lg text-primary-foreground/80 mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto px-4">
            From classic designs to contemporary pieces, discover our complete collection. 
            Order via WhatsApp for personalized service or browse our curated selections online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link to="/collections" className="w-full sm:w-auto">
              <Button variant="luxury-light" size="lg" className="gap-2 sm:gap-3 group w-full sm:w-auto text-sm sm:text-base">
                Browse Collections
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/919967580919?text=Hello%2C%20I%27m%20interested%20in%20your%2092.5%20silver%20jewellery"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button variant="whatsapp" size="lg" className="gap-2 sm:gap-3 w-full sm:w-auto text-sm sm:text-base">
                <Phone className="h-4 w-4" />
                Order on WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Line */}
          <p className="font-sans text-[10px] sm:text-xs text-primary-foreground/60 mt-6 sm:mt-8 px-2">
            <span className="block sm:inline">✓ Free Shipping Above ₹2,000</span>
            <span className="hidden sm:inline"> &nbsp;&nbsp; </span>
            <span className="block sm:inline">✓ 7-Day Easy Returns</span>
            <span className="hidden sm:inline"> &nbsp;&nbsp; </span>
            <span className="block sm:inline">✓ Secure Packaging</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;