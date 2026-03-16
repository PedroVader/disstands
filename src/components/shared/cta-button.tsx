import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "white";
  size?: "default" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
}

const variantStyles = {
  primary:
    "bg-brand-red text-white border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark",
  secondary:
    "bg-brand-black text-white border-brand-black hover:bg-brand-dark",
  ghost:
    "bg-transparent text-white border-white hover:bg-white/10",
  white:
    "bg-white text-brand-black border-white hover:bg-brand-cream",
};

const sizeStyles = {
  default: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function CtaButton({
  children,
  variant = "primary",
  size = "default",
  className,
  href,
  onClick,
}: CtaButtonProps) {
  const classes = cn(
    "rounded-lg font-medium transition-all duration-200",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a href={href} className={cn("inline-flex items-center justify-center gap-2", classes)}>
        {children}
      </a>
    );
  }

  return (
    <Button onClick={onClick} className={classes}>
      {children}
    </Button>
  );
}
