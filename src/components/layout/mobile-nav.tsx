"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { CtaButton } from "@/components/shared/cta-button";
import { useTranslation } from "@/i18n";
import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { key: "catalogo" as const, href: "/catalogo" },
  { key: "servicios" as const, href: "/#servicios" },
  { key: "portfolio" as const, href: "/portfolio" },
  { key: "blog" as const, href: "/blog" },
  { key: "contacto" as const, href: "/contacto" },
];

interface MobileNavProps {
  solid?: boolean;
}

export function MobileNav({ solid }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden",
          solid
            ? "text-brand-black hover:bg-brand-cream"
            : "text-white hover:bg-white/10"
        )}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">{t.common.open_menu}</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white border-brand-gray p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>
            <Logo variant="dark" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center rounded-lg px-4 text-base font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-brand-gray p-6">
          <CtaButton variant="primary" size="lg" className="w-full" href="/contacto">
            {t.hero.cta_primary}
          </CtaButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
