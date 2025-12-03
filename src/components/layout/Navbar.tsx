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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 sm:py-2 text-center text-[10px] sm:text-xs font-sans tracking-wide-luxury px-2">
        <p className="truncate">Free Shipping Above ₹2,000 | Hallmarked 92.5 Purity</p>
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
        <nav className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-maroon flex items-center justify-center shadow-medium group-hover:shadow-luxury transition-shadow duration-500">
                  <span className="text-primary-foreground font-serif text-lg sm:text-xl font-bold">L</span>
                </div>
              </div>
              <div className="hidden xs:block sm:block">
                <h1 className="font-serif text-base sm:text-xl font-semibold text-foreground leading-tight">
                  Laxmi Jewellers
                </h1>
                <p className="text-[8px] sm:text-[10px] font-sans uppercase tracking-luxury text-muted-foreground">
                  92.5 Silver Specialists
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
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
            <div className="flex items-center gap-1 sm:gap-3">
              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9 sm:h-10 sm:w-10">
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <a
                href="https://wa.me/919967580919"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button variant="whatsapp" size="sm" className="gap-2 text-xs sm:text-sm">
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden lg:inline">WhatsApp</span>
                </Button>
              </a>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 sm:h-10 sm:w-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 bg-foreground/50 z-40 transition-opacity duration-300",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={cn(
            "lg:hidden fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-background z-50 transform transition-transform duration-300 ease-out shadow-luxury overflow-y-auto",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="p-4 sm:p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block font-sans text-base sm:text-lg py-3 px-4 rounded-lg transition-all duration-300",
                    location.pathname === link.path
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground/80 hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-border" />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <Search className="h-5 w-5" />
                Search
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                <ShoppingBag className="h-5 w-5" />
                Shopping Bag
              </Button>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6">
              <a
                href="https://wa.me/919967580919"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="whatsapp" className="w-full gap-2 h-12">
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