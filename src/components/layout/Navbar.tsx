import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/data/categories";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const location = useLocation();
  const { totalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsCategoryDrawerOpen(false);
  }, [location.pathname]);

  const subCategories: Record<string, string[]> = {
    bangles: ["Plain Bangles", "Designer Bangles", "Heavy Bangles", "Daily Wear"],
    rings: ["Men's Rings", "Women's Rings", "Statement Rings", "Minimalist"],
    chains: ["Thin Chains", "Heavy Chains", "Rope Chains", "Box Chains"],
    earrings: ["Studs", "Jhumkas", "Danglers", "Chandbali"],
    anklets: ["Traditional", "Modern", "With Bells", "Plain"],
    bracelets: ["Tennis", "Charm", "Cuff", "Chain"],
    bridal: ["Necklace Sets", "Complete Sets", "Chokers", "Temple Jewelry"],
  };

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background shadow-soft"
            : "bg-background"
        )}
      >
        <nav className="px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left - Hamburger Menu */}
            <Sheet open={isCategoryDrawerOpen} onOpenChange={setIsCategoryDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5 text-foreground/80" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[400px] p-0">
                <div className="flex h-full">
                  {/* Main Categories */}
                  <div className="w-1/2 bg-secondary/30 border-r border-border">
                    <div className="p-4 border-b border-border">
                      <h2 className="font-serif text-lg font-semibold">Shop By Category</h2>
                    </div>
                    <div className="py-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedMainCategory(cat.slug)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-left transition-colors",
                            selectedMainCategory === cat.slug
                              ? "bg-primary/10 text-primary border-r-2 border-primary"
                              : "hover:bg-secondary/50"
                          )}
                        >
                          <span className="text-sm font-medium">{cat.name}</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Sub Categories */}
                  <div className="w-1/2 bg-background">
                    <div className="p-4 border-b border-border">
                      <h3 className="font-medium text-sm text-muted-foreground">
                        {selectedMainCategory 
                          ? categories.find(c => c.slug === selectedMainCategory)?.name 
                          : "Select a category"}
                      </h3>
                    </div>
                    {selectedMainCategory && (
                      <div className="py-2">
                        <Link
                          to={`/collections/${selectedMainCategory}`}
                          className="block px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5"
                          onClick={() => setIsCategoryDrawerOpen(false)}
                        >
                          View All
                        </Link>
                        {subCategories[selectedMainCategory]?.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={`/collections/${selectedMainCategory}`}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:bg-secondary/50 hover:text-foreground"
                            onClick={() => setIsCategoryDrawerOpen(false)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Center - Brand Name */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-lg sm:text-xl font-semibold tracking-wide text-foreground">
                LAKSHMI SILVER
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-5 w-5 text-foreground/80" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex">
                <Heart className="h-5 w-5 text-foreground/80" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 relative"
                onClick={toggleCart}
              >
                <ShoppingBag className="h-5 w-5 text-foreground/80" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
