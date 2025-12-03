import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium jewelry variants
        luxury: "bg-primary text-primary-foreground font-sans uppercase tracking-[0.15em] text-xs hover:bg-primary/80 shadow-[0_20px_50px_-15px_hsl(355_70%_41%/0.15)] hover:shadow-[0_8px_30px_-8px_hsl(0_0%_0%/0.12)] relative overflow-hidden",
        "luxury-outline": "border-2 border-primary text-primary bg-transparent font-sans uppercase tracking-[0.15em] text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-500",
        "luxury-light": "bg-[hsl(40_30%_96%)] text-foreground font-sans uppercase tracking-[0.15em] text-xs hover:bg-secondary border border-border/50 shadow-soft hover:shadow-medium",
        "luxury-dark": "bg-[hsl(0_0%_15%)] text-[hsl(40_30%_96%)] font-sans uppercase tracking-[0.15em] text-xs hover:bg-foreground shadow-medium",
        whatsapp: "bg-[#25D366] text-white font-sans uppercase tracking-[0.08em] text-xs hover:bg-[#128C7E] shadow-soft hover:shadow-medium",
        elegant: "bg-transparent text-foreground font-serif text-base hover:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
