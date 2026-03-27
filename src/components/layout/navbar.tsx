"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { CtaButton } from "@/components/shared/cta-button";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";
import { useCart } from "@/hooks/use-cart";
import { useTranslation } from "@/i18n";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { key: "catalogo" as const, href: "/catalogo" },
  { key: "servicios" as const, href: "/#servicios" },
  { key: "portfolio" as const, href: "/portfolio" },
  { key: "blog" as const, href: "/blog" },
  { key: "contacto" as const, href: "/contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, loaded } = useCart();
  const { t } = useTranslation();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On homepage: transparent bg + white text until scroll. On other pages: always solid.
  const solid = scrolled || !isHome;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Logo variant={solid ? "dark" : "white"} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                solid
                  ? "text-brand-gray-dark hover:text-brand-black"
                  : "text-white/70 hover:text-white",
                pathname === link.href && "text-brand-red"
              )}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Cart icon */}
          <Link
            href="/carrito"
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-full transition-colors",
              solid
                ? "text-brand-gray-dark hover:text-brand-black hover:bg-brand-cream"
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {loaded && totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <div className="hidden sm:block">
            <LanguageSwitcher solid={solid} />
          </div>
          <div className="hidden lg:block">
            <CtaButton variant="primary" href="/contacto">
              {t.nav.presupuesto}
            </CtaButton>
          </div>
          <MobileNav solid={solid} />
        </div>
      </div>
    </header>
  );
}
