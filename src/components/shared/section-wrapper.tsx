import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  background?: "black" | "dark" | "white" | "cream" | "red";
  className?: string;
  id?: string;
}

const bgMap = {
  black: "bg-brand-black",
  dark: "bg-brand-dark",
  white: "bg-brand-white",
  cream: "bg-brand-cream",
  red: "bg-brand-red",
};

export function SectionWrapper({
  children,
  background = "white",
  className,
  id,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn(bgMap[background], "py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
