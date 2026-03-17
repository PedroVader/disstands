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
import { mainNavLinks } from "@/data/navigation";
import { useState } from "react";

interface MobileNavProps {
  scrolled?: boolean;
}

export function MobileNav({ scrolled }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden",
          scrolled
            ? "text-brand-black hover:bg-brand-cream"
            : "text-white hover:bg-white/10"
        )}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Abrir menú</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-white border-brand-gray p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>
            <Logo variant="dark" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-6">
          {mainNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center rounded-lg px-4 text-base font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream hover:text-brand-black"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t border-brand-gray p-6">
          <CtaButton variant="primary" size="lg" className="w-full" href="#contacto">
            Solicitar Presupuesto
          </CtaButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
