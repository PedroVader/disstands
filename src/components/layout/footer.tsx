"use client";

import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/constants";
import { useTranslation } from "@/i18n";

const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

const productLinks = [
  { href: "/catalogo?categoria=moquetas" },
  { href: "/catalogo?categoria=cesped-artificial" },
  { href: "/catalogo?categoria=suelos-pvc" },
  { href: "/catalogo?categoria=losetas" },
  { href: "/catalogo?categoria=adhesivos" },
  { href: "/catalogo?categoria=accesorios" },
];

const productLabelKeys = [
  "Moquetas",
  "Césped Artificial",
  "Suelos PVC",
  "Losetas",
  "Adhesivos",
  "Accesorios",
];

export function Footer() {
  const { t } = useTranslation();

  const companyLinks = [
    { label: t.footer.about, href: "/sobre-nosotros" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: t.footer.careers, href: "/empleo" },
    { label: t.footer.contact, href: "/contacto" },
  ];

  const legalLinks = [
    { label: t.footer.legal_notice, href: "/legal/aviso-legal" },
    { label: t.footer.privacy, href: "/legal/privacidad" },
    { label: t.footer.cookies, href: "/legal/cookies" },
    { label: "Devoluciones", href: "/legal/condiciones" },
    { label: "Accesibilidad", href: "/legal/accesibilidad" },
  ];

  return (
    <footer className="border-t border-brand-gray bg-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed text-brand-gray-dark">
              {t.footer.description}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
              {t.footer.col_products}
            </h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-gray-dark transition-colors hover:text-brand-red"
                  >
                    {productLabelKeys[i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
              {t.footer.col_company}
            </h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-gray-dark transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-brand-black">
              {t.footer.col_legal}
            </h4>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-brand-gray-dark transition-colors hover:text-brand-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-brand-gray" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-brand-gray-dark">
            © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gray-dark transition-colors hover:text-brand-red"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
