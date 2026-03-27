"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { stats } from "@/data/stats";
import { Stat } from "@/types";
import { useTranslation } from "@/i18n";

const statLabelKeys = ["stands", "years", "m2", "countries"] as const;

function StatItem({ stat, isVisible, label }: { stat: Stat; isVisible: boolean; label: string }) {
  const count = useCounterAnimation(stat.value, isVisible);

  const formatted =
    stat.value >= 1000
      ? count.toLocaleString("es-ES")
      : count.toString();

  return (
    <div className="text-center">
      <p className="font-[var(--font-heading)] text-4xl font-bold text-brand-black sm:text-5xl lg:text-6xl">
        {stat.prefix}
        {formatted}
        {stat.suffix && (
          <span className="text-brand-red">{stat.suffix}</span>
        )}
      </p>
      <p className="mt-2 text-sm font-medium text-brand-gray-dark">
        {label}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { t } = useTranslation();

  return (
    <section className="border-y border-brand-gray bg-white py-16 sm:py-20 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              isVisible={isVisible}
              label={t.stats[statLabelKeys[i]]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
