import { Interfaces, ECommerce } from "doodle-icons";
import { cn } from "@/lib/utils";
import { Service } from "@/types";
import { type SVGProps } from "react";

type SvgComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const iconMap: Record<string, SvgComponent> = {
  Calendar: Interfaces.Calendar,
  Store: ECommerce.Shop,
  Building2: ECommerce.Warehouse,
};

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Interfaces.Calendar;

  return (
    <div
      className={cn(
        "group rounded-lg border border-brand-gray bg-brand-cream p-6 transition-all duration-300 hover:border-brand-red hover:shadow-lg",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-brand-red/10">
        <Icon className="h-8 w-8 text-brand-red" />
      </div>
      <h3 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-brand-black">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark">
        {service.description}
      </p>
      <ul className="mt-4 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-brand-gray-dark">
            <span className="h-1 w-1 rounded-full bg-brand-red" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
