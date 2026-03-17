"use client";

import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

const languages = [
  { code: "ES", label: "Español" },
  { code: "CA", label: "Català" },
  { code: "EN", label: "English" },
];

interface LanguageSwitcherProps {
  scrolled?: boolean;
}

export function LanguageSwitcher({ scrolled }: LanguageSwitcherProps) {
  const [current, setCurrent] = useState("ES");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm transition-colors",
          scrolled
            ? "text-brand-gray-dark hover:text-brand-black hover:bg-brand-cream"
            : "text-white/70 hover:text-white hover:bg-white/10"
        )}
      >
        <Globe className="h-4 w-4" />
        {current}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => setCurrent(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
