import { Truck, Shield, Package } from "lucide-react";

const TopInfoStrip = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-center gap-4 sm:gap-8 py-2 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Free Delivery Above ₹2,000</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>92.5 Pure Silver</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Package className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Secure Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopInfoStrip;
