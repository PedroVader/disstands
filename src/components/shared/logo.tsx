import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "white" | "dark";
  className?: string;
}

export function Logo({ variant = "white", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-[var(--font-heading)] text-2xl font-bold tracking-tight",
        variant === "white" ? "text-white" : "text-brand-black",
        className
      )}
    >
      DISSTANDS
    </span>
  );
}
