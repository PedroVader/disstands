"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { CtaButton } from "@/components/shared/cta-button";
import { mainNavLinks } from "@/data/navigation";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="inline-flex items-center justify-center rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Abrir menú</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 bg-brand-black border-white/10 p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>
            <Logo variant="white" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-6">
          {mainNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center rounded-lg px-4 text-base font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 p-6">
          <CtaButton variant="primary" size="lg" className="w-full" href="#contacto">
            Solicitar Presupuesto
          </CtaButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
