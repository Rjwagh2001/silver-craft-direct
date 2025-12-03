import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Bangles",
    description: "Delicate and bold — our 92.5 silver bangles are finely finished with premium detailing. Perfect for daily wear and special occasions.",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop",
    count: 48,
    slug: "bangles",
  },
  {
    name: "Chains",
    description: "Strong, stylish and polished — chains designed to pair with pendants or worn solo. Available in multiple lengths and styles.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=600&fit=crop",
    count: 36,
    slug: "chains",
  },
  {
    name: "Rings",
    description: "From minimalist bands to statement designs — crafted to last and comfortable to wear. Perfect for gifting.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop",
    count: 52,
    slug: "rings",
  },
  {
    name: "Earrings",
    description: "Studs, drops, and hoops — elegant earrings for every occasion. Lightweight designs that complement any outfit.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop",
    count: 64,
    slug: "earrings",
  },
  {
    name: "Bracelets",
    description: "Stackable, statement, or subtle — our bracelets add the perfect finishing touch to your look.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=600&fit=crop",
    count: 28,
    slug: "bracelets",
  },
  {
    name: "Anklets",
    description: "Traditional payal designs with modern touches — crafted for comfort and style.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop",
    count: 22,
    slug: "anklets",
  },
];

const Collections = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block animate-fade-in">
              Shop by Category
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
              Our Collections
            </h1>
            <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Explore our curated selection of 92.5 sterling silver jewellery. Each piece is hallmarked, hand-finished, and designed to last.
            </p>
            <div className="section-divider mt-8" />
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {collections.map((collection) => (
                <Link
                  key={collection.slug}
                  to={`/collections/${collection.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl card-luxury bg-card">
                    {/* Image */}
                    <div className="aspect-[4/3] img-zoom">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif text-2xl text-foreground">
                          {collection.name}
                        </h3>
                        <span className="font-sans text-xs uppercase tracking-luxury text-muted-foreground">
                          {collection.count} items
                        </span>
                      </div>
                      <p className="font-sans text-sm text-muted-foreground mb-4 line-clamp-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-luxury text-primary group-hover:gap-4 transition-all duration-300">
                        <span>Shop Collection</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-2xl md:text-3xl mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="font-sans text-muted-foreground mb-8 max-w-xl mx-auto">
              We offer custom designs and bulk orders. Share your requirements via WhatsApp and we'll create something special for you.
            </p>
            <a
              href="https://wa.me/919967580919?text=Hello%2C%20I'm%20looking%20for%20a%20custom%20silver%20design"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="luxury" size="xl">
                Request Custom Design
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
