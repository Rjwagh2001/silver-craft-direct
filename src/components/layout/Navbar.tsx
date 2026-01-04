import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, Heart, ShoppingBag, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import TopInfoStrip from "./TopInfoStrip";
import { categories } from "@/data/categories";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <TopInfoStrip />
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-soft"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16 relative">
            {/* Left - Menu */}
            <div className="flex items-center">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                    <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0">
                  <SheetHeader className="p-4 border-b border-border">
                    <SheetTitle className="font-serif text-lg">Menu</SheetTitle>
                  </SheetHeader>
                  
                  <Tabs defaultValue="categories" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 h-12 bg-muted/50">
                      <TabsTrigger value="menu" className="text-sm">MENU</TabsTrigger>
                      <TabsTrigger value="categories" className="text-sm">CATEGORIES</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="menu" className="mt-0 p-4">
                      <nav className="space-y-1">
                        {menuLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center justify-between py-3 px-3 rounded-lg transition-colors ${
                              location.pathname === link.path
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <span className="font-medium">{link.name}</span>
                            <ChevronRight className="h-4 w-4 opacity-50" />
                          </Link>
                        ))}
                      </nav>
                    </TabsContent>
                    
                    <TabsContent value="categories" className="mt-0 p-4">
                      {/* Image-based category cards */}
                      <div className="space-y-3">
                        {categories.map((cat) => (
                          <Link
                            key={cat.id}
                            to={`/collections/${cat.slug}`}
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted transition-colors group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {cat.name}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {cat.productCount} Products
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </SheetContent>
              </Sheet>
            </div>

            {/* Center - Brand Name */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-serif text-base sm:text-xl font-semibold tracking-wide-luxury text-foreground uppercase">
                Laxmi Silver
              </h1>
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Search</span>
              </Button>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 sm:h-10 sm:w-10 relative"
                onClick={openCart}
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary text-primary-foreground text-[10px] sm:text-xs font-medium rounded-full flex items-center justify-center">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;