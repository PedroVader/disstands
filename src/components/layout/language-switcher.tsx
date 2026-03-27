"use client";

import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslation, type Locale } from "@/i18n";

const languages: { code: Locale; label: string }[] = [
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
  { code: "en", label: "English" },
];

interface LanguageSwitcherProps {
  solid?: boolean;
}

export function LanguageSwitcher({ solid }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm transition-colors",
          solid
            ? "text-brand-gray-dark hover:text-brand-black hover:bg-brand-cream"
            : "text-white/70 hover:text-white hover:bg-white/10"
        )}
      >
        <Globe className="h-4 w-4" />
        {locale.toUpperCase()}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onSelect={() => setLocale(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
