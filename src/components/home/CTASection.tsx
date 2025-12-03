import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-maroon relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-background/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-background/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-sans text-xs uppercase tracking-luxury text-primary-foreground/70 mb-4 block">
            Ready to Shop?
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-6">
            Experience the Purity of 92.5 Silver
          </h2>
          <p className="font-sans text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            From classic designs to contemporary pieces, discover our complete collection. 
            Order via WhatsApp for personalized service or browse our curated selections online.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections">
              <Button variant="luxury-light" size="xl" className="gap-3 group">
                Browse Collections
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/919967580919?text=Hello%2C%20I%27m%20interested%20in%20your%2092.5%20silver%20jewellery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="xl" className="gap-3">
                <Phone className="h-4 w-4" />
                Order on WhatsApp
              </Button>
            </a>
          </div>

          {/* Trust Line */}
          <p className="font-sans text-xs text-primary-foreground/60 mt-8">
            ✓ Free Shipping Above ₹2,000 &nbsp;&nbsp; ✓ 7-Day Easy Returns &nbsp;&nbsp; ✓ Secure Packaging
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
