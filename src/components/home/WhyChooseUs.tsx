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
    <section className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="font-sans text-[10px] sm:text-xs uppercase tracking-luxury text-primary mb-3 sm:mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 px-2">
            The Laxmi Difference
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            For decades we supplied the market as trusted silver wholesalers. Today, we bring wholesale rates directly to you.
          </p>
          <div className="section-divider mt-4 sm:mt-6" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 stagger-children">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-background shadow-card hover:shadow-luxury transition-all duration-500"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-5 lg:mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">{feature.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-muted-foreground leading-relaxed">
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