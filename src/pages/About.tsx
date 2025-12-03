import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Shield, Heart, Eye, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Quality Over Quantity",
    description: "Every piece is inspected multiple times before it reaches you.",
  },
  {
    icon: Heart,
    title: "Transparent Pricing",
    description: "No hidden margins — just honest wholesale rates direct to you.",
  },
  {
    icon: Eye,
    title: "Design with Purpose",
    description: "Wearable, timeless, and modern pieces for every occasion.",
  },
  {
    icon: Award,
    title: "Certified Purity",
    description: "All pieces are stamped 92.5 and hallmarked for authenticity.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block animate-fade-in">
              Our Story
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up">
              From Wholesale Roots
              <br />
              <span className="text-primary">to Direct Trust</span>
            </h1>
            <div className="section-divider mt-8" />
          </div>
        </section>

        {/* Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8">
                Laxmi Jewellers began as a wholesale supplier to retailers across India, known for consistent quality and honest pricing.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                Over the years, our craftsmanship and customer relationships became the foundation for a new chapter: bringing the same wholesale-grade products directly to our customers.
              </p>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed">
                Today, we continue our legacy of excellence, now serving individual customers who deserve the same quality that retailers have trusted for decades. Every piece that leaves our workshop carries the same commitment to purity, craftsmanship, and value that built our reputation.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block">
                What We Believe
              </span>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Our Values
              </h2>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center p-8 rounded-2xl bg-background shadow-card"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block">
                  Trust & Certification
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  Certified Quality You Can Trust
                </h2>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  All our pieces are crafted from genuine 92.5 sterling silver and carry the official hallmark stamp. We undergo rigorous quality checks at every stage — from raw material sourcing to final finishing.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <span className="font-sans text-foreground">BIS Hallmark Certified</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <span className="font-sans text-foreground">Multi-stage Quality Inspection</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-sm">✓</span>
                    </div>
                    <span className="font-sans text-foreground">Hand-finished by Master Artisans</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-silver-light/50 to-silver/30 overflow-hidden shadow-luxury">
                  <img
                    src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="font-serif text-6xl text-foreground mb-2">92.5</p>
                      <p className="font-sans text-xs uppercase tracking-luxury text-muted-foreground">
                        Sterling Silver
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
