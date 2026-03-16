import { Calendar, Store, Building2, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Store,
  Building2,
};

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Calendar;

  return (
    <div
      className={cn(
        "group rounded-lg border border-white/10 bg-brand-dark p-6 transition-all duration-300 hover:border-brand-red",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10">
        <Icon className="h-6 w-6 text-brand-red" />
      </div>
      <h3 className="mt-4 font-[var(--font-heading)] text-xl font-semibold text-white">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brand-gray-dark">
        {service.description}
      </p>
      <ul className="mt-4 space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-1 w-1 rounded-full bg-brand-red" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
