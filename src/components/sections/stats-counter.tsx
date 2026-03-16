"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useCounterAnimation } from "@/hooks/use-counter-animation";
import { stats } from "@/data/stats";
import { Stat } from "@/types";

function StatItem({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCounterAnimation(stat.value, isVisible);

  const formatted =
    stat.value >= 1000
      ? count.toLocaleString("es-ES")
      : count.toString();

  return (
    <div className="text-center">
      <p className="font-[var(--font-heading)] text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {stat.prefix}
        {formatted}
        {stat.suffix && (
          <span className="text-brand-red">{stat.suffix}</span>
        )}
      </p>
      <p className="mt-2 text-sm font-medium text-brand-gray-dark">
        {stat.label}
      </p>
    </div>
  );
}

export function StatsCounter() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section className="bg-brand-black py-16 sm:py-20 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
