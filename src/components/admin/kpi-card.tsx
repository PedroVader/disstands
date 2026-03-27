"use client";

import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  change?: number; // percentage
  icon: LucideIcon;
  color?: "red" | "green" | "blue" | "amber" | "default";
}

const colorMap = {
  red: "bg-red-50 text-brand-red",
  green: "bg-green-50 text-green-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  default: "bg-brand-cream text-brand-gray-dark",
};

export function KpiCard({ label, value, change, icon: Icon, color = "default" }: KpiCardProps) {
  const TrendIcon = change === undefined ? null : change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;

  return (
    <div className="rounded-xl border border-brand-gray bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-gray-dark">
          {label}
        </p>
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", colorMap[color])}>
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-2 font-[var(--font-heading)] text-2xl font-bold text-brand-black">
        {value}
      </p>
      {change !== undefined && TrendIcon && (
        <div className="mt-1.5 flex items-center gap-1">
          <TrendIcon className={cn("h-3.5 w-3.5", change > 0 ? "text-green-600" : change < 0 ? "text-red-500" : "text-brand-gray-dark")} />
          <span className={cn("text-xs font-medium", change > 0 ? "text-green-600" : change < 0 ? "text-red-500" : "text-brand-gray-dark")}>
            {change > 0 ? "+" : ""}{change}% vs mes anterior
          </span>
        </div>
      )}
    </div>
  );
}
