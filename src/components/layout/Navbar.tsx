import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Collections", path: "/collections" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs font-sans tracking-wide-luxury hidden md:block">
        <p>Free Shipping on Orders Above ₹2,000 | Hallmarked 92.5 Purity | New Arrivals Daily</p>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft"
            : "bg-background"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-maroon flex items-center justify-center shadow-medium group-hover:shadow-luxury transition-shadow duration-500">
                  <span className="text-primary-foreground font-serif text-xl font-bold">L</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-serif text-xl font-semibold text-foreground leading-tight">
                  Laxmi Jewellers
                </h1>
                <p className="text-[10px] font-sans uppercase tracking-luxury text-muted-foreground">
                  92.5 Silver Specialists
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "font-sans text-sm uppercase tracking-wide-luxury transition-colors duration-300 elegant-underline pb-1",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <a
                href="https://wa.me/919967580919"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button variant="whatsapp" size="sm" className="gap-2">
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 w-full bg-background border-t border-border overflow-hidden transition-all duration-500",
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "block font-sans text-sm uppercase tracking-wide-luxury py-2 transition-colors",
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              <a
                href="https://wa.me/919967580919"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="whatsapp" className="w-full gap-2">
                  <Phone className="h-4 w-4" />
                  Order on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
