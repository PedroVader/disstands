import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Separator } from "@/components/ui/separator";
import { footerColumns } from "@/data/navigation";
import { siteConfig } from "@/lib/constants";

const socialLinks = [
  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Youtube, href: siteConfig.social.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-brand-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Logo variant="white" />
            <p className="mt-4 text-sm leading-relaxed text-brand-gray-dark">
              Especialistas en pavimentos para ferias, eventos y espacios
              comerciales. Más de 23 años transformando espacios en toda Europa.
            </p>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-wider text-white">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
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
          ))}
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-brand-gray-dark">
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
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
