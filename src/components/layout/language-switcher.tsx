"use client";

import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const languages = [
  { code: "ES", label: "Español" },
  { code: "CA", label: "Català" },
  { code: "EN", label: "English" },
];

export function LanguageSwitcher() {
  const [current, setCurrent] = useState("ES");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm text-white/70 transition-colors hover:text-white hover:bg-white/10">
        <Globe className="h-4 w-4" />
        {current}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-brand-dark border-white/10">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => setCurrent(lang.code)}
            className="text-white/70 hover:text-white focus:text-white focus:bg-white/10"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
