"use client";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, children, className = "" }: ChartCardProps) {
  return (
    <div className={`rounded-xl border border-brand-gray bg-white p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="font-[var(--font-heading)] text-sm font-semibold text-brand-black">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-0.5 text-xs text-brand-gray-dark">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}
