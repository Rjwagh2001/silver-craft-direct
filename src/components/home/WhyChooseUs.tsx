import { Shield, Percent, Sparkles, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Guaranteed 92.5 Purity",
    description: "Every piece is hallmarked and certified for authentic sterling silver.",
  },
  {
    icon: Percent,
    title: "Wholesale Prices",
    description: "Save up to 40% compared to market rates — direct from the source.",
  },
  {
    icon: Sparkles,
    title: "Everyday New Designs",
    description: "Daily Instagram drops with fresh, trending styles for every occasion.",
  },
  {
    icon: CheckCircle,
    title: "Quality-First Craft",
    description: "Hand-finished by master artisans with rigorous quality control.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            The Laxmi Difference
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            For decades we supplied the market as trusted silver wholesalers. Today, we bring wholesale rates directly to you.
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-background shadow-card hover:shadow-luxury transition-all duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
