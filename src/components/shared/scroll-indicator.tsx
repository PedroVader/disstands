"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <a
        href="#trust"
        className="flex flex-col items-center gap-1 text-white/50 transition-colors hover:text-white"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </a>
    </div>
  );
}
