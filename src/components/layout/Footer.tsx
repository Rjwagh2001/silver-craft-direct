import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              Join Our Inner Circle
            </h3>
            <p className="text-background/70 font-sans text-sm mb-6">
              Get new arrival alerts, exclusive offers, and 10% off your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded text-background placeholder:text-background/50 font-sans text-sm focus:outline-none focus:border-background/40 transition-colors"
              />
              <Button variant="luxury-light" size="lg">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                <span className="text-foreground font-serif text-lg font-bold">L</span>
              </div>
              <div>
                <h4 className="font-serif text-lg">Laxmi Jewellers</h4>
                <p className="text-[10px] font-sans uppercase tracking-luxury text-background/60">
                  Since 1990
                </p>
              </div>
            </div>
            <p className="text-background/70 font-sans text-sm leading-relaxed mb-6">
              Premium 92.5 sterling silver jewellery. Wholesale quality, now available directly to you.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/laxmisilverofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/laxmisilverofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-all duration-300"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-luxury mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Collections", "About Us", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-background/70 hover:text-background font-sans text-sm transition-colors elegant-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-luxury mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {["Bangles", "Chains", "Rings", "Earrings", "Bracelets", "Anklets"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/collections/${item.toLowerCase()}`}
                    className="text-background/70 hover:text-background font-sans text-sm transition-colors elegant-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-luxury mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-background/50 flex-shrink-0 mt-0.5" />
                <span className="text-background/70 font-sans text-sm">
                  Saraf Bazar Association,<br />
                  Nanded, Maharashtra 431604
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-background/50" />
                <a href="tel:+918983119111" className="text-background/70 hover:text-background font-sans text-sm transition-colors">
                  +91 89831 19111
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-background/50" />
                <a href="mailto:laxmisilverofficial@gmail.com" className="text-background/70 hover:text-background font-sans text-sm transition-colors">
                  laxmisilverofficial@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 font-sans text-xs">
              © 2025 Laxmi Jewellers. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-background/50 hover:text-background font-sans text-xs transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-background font-sans text-xs transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/shipping" className="text-background/50 hover:text-background font-sans text-xs transition-colors">
                Shipping & Returns
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
