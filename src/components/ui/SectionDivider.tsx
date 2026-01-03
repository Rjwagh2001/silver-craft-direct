import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "line" | "ornament" | "dots";
}

const SectionDivider = ({ className, variant = "ornament" }: SectionDividerProps) => {
  if (variant === "line") {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-4", className)}>
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
        <div className="w-2 h-2 rounded-full bg-primary/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
      </div>
    );
  }

  // Ornament variant (default)
  return (
    <div className={cn("flex items-center justify-center gap-3 py-6", className)}>
      <div className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent to-primary/30" />
      <div className="relative">
        <div className="w-2 h-2 rotate-45 border border-primary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-primary/50" />
        </div>
      </div>
      <div className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent to-primary/30" />
    </div>
  );
};

export default SectionDivider;
