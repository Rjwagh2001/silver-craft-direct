import { Shield, Award, Truck, RefreshCw, Gem } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "92.5 Pure Silver",
    description: "BIS Hallmarked",
  },
  {
    icon: Award,
    title: "Wholesale Quality",
    description: "Factory prices",
  },
  {
    icon: Truck,
    title: "Direct to You",
    description: "No middlemen",
  },
  {
    icon: Gem,
    title: "Master Crafted",
    description: "Expert artisans",
  },
  {
    icon: RefreshCw,
    title: "New Designs Daily",
    description: "Fresh arrivals",
  },
];

const TrustSection = () => {
  return (
    <section className="py-8 sm:py-10 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <h3 className="font-serif text-lg sm:text-xl text-center text-foreground mb-6 sm:mb-8">
          Why Choose Laxmi Silver
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3 sm:p-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h4 className="font-medium text-sm sm:text-base text-foreground mb-0.5">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
