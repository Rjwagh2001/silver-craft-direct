import { Link, useLocation } from "react-router-dom";
import { Home, Play, LayoutGrid, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "919876543210"; // Replace with actual number
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Lakshmi%20Silver!%20I%27m%20interested%20in%20your%20jewelry%20collection.`;

const navItems = [
  { name: "Home", icon: Home, path: "/", isExternal: false },
  { name: "Play", icon: Play, path: "/videos", isExternal: false },
  { name: "Categories", icon: LayoutGrid, path: "/collections", isExternal: false, isCenter: true },
  { name: "Account", icon: User, path: "/account", isExternal: false },
  { name: "WhatsApp", icon: MessageCircle, path: WHATSAPP_URL, isExternal: true, isWhatsApp: true },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = !item.isExternal && location.pathname === item.path;
          
          // External link (WhatsApp)
          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 w-full h-full relative",
                  item.isWhatsApp ? "text-green-600" : "text-muted-foreground"
                )}
              >
                <div className="relative">
                  <item.icon className={cn("w-5 h-5", item.isWhatsApp && "fill-green-600/20")} />
                </div>
                <span className={cn("text-[10px] font-medium", item.isWhatsApp && "text-green-600")}>
                  {item.name}
                </span>
              </a>
            );
          }
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full h-full relative",
                isActive ? "text-primary" : "text-muted-foreground",
                item.isCenter && "order-3"
              )}
            >
              <div className={cn(
                "relative flex items-center justify-center",
                item.isCenter && "-mt-3"
              )}>
                {item.isCenter ? (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-luxury">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                ) : (
                  <item.icon className={cn("w-5 h-5", isActive && "fill-primary/20")} />
                )}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                isActive && "font-semibold",
                item.isCenter && "mt-1"
              )}>
                {item.name}
              </span>
              {isActive && !item.isCenter && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
