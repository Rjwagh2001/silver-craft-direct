import { Search, MessageCircle, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse",
    description: "Explore our curated collection of 92.5 silver designs online or via Instagram.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Order",
    description: "Quick checkout or order directly via WhatsApp — we confirm within 2 hours.",
  },
  {
    icon: Package,
    step: "03",
    title: "Receive",
    description: "Fast shipping in secure packaging. Free delivery on orders above ₹2,000.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs uppercase tracking-luxury text-primary mb-4 block">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
            How It Works
          </h2>
          <div className="section-divider mt-6" />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-16 stagger-children">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-border" />
              )}

              {/* Step Number */}
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-border flex items-center justify-center bg-background group-hover:border-primary transition-colors duration-500">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 bg-primary text-primary-foreground font-sans text-xs px-3 py-1 rounded-full">
                  {step.step}
                </div>
              </div>

              <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
