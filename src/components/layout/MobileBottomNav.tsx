import { Link, useLocation } from "react-router-dom";
import { Home, Play, LayoutGrid, User, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const WHATSAPP_NUMBER = "919967580919";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Laxmi%20Silver!%20I'm%20interested%20in%20your%20jewelry%20collection.`;

// LOCKED ORDER: Home, Play, Categories (center), Account, WhatsApp
const navItems = [
  { name: "Home", icon: Home, path: "/", isExternal: false },
  { name: "Play", icon: Play, path: "/videos", isExternal: false },
  { name: "Categories", icon: LayoutGrid, path: "/collections", isExternal: false, isCenter: true },
  { name: "Account", icon: User, path: "/account", isExternal: false },
  { name: "WhatsApp", icon: MessageCircle, path: WHATSAPP_URL, isExternal: true },
];

const MobileBottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden safe-area-pb">
      <div className="flex items-end justify-around px-1 pt-1 pb-2">
        {navItems.map((item) => {
          const isActive = !item.isExternal && location.pathname === item.path;
          const Icon = item.icon;
          
          // Center elevated Categories button
          if (item.isCenter) {
            return (
              <Link
                key={item.name}
                to={item.path}
                className="relative -top-3 flex flex-col items-center"
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-foreground text-background"
                )}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium transition-colors",
                  isActive ? "text-primary" : "text-foreground"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          }
          
          // WhatsApp - external link with green accent
          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center py-2 px-3"
              >
                <div className="relative">
                  <Icon className="h-5 w-5 text-green-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <span className="text-[10px] mt-1 font-medium text-green-600">
                  {item.name}
                </span>
              </a>
            );
          }
          
          // Regular nav items
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-[10px] mt-1 font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;