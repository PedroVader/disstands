import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  colorScheme?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  colorScheme = "light",
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "font-[var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl",
          colorScheme === "dark" ? "text-white" : "text-brand-black"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-lg",
            align === "center" && "mx-auto",
            colorScheme === "dark" ? "text-brand-gray-dark" : "text-brand-gray-dark"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
