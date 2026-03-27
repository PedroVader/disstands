import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "white" | "dark";
  className?: string;
}

export function Logo({ variant = "white", className }: LogoProps) {
  return (
    <Image
      src="/images/logo-disstands.png"
      alt="Disstands"
      width={160}
      height={48}
      className={cn(
        "h-8 w-auto",
        variant === "white" && "brightness-0 invert",
        className
      )}
      priority
    />
  );
}
