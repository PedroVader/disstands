import { NavLink, FooterColumn } from "@/types";

export const mainNavLinks: NavLink[] = [
  { label: "Productos", href: "#categorias" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contacto", href: "#contacto" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Productos",
    links: [
      { label: "Moquetas", href: "/productos/moquetas" },
      { label: "Césped Artificial", href: "/productos/cesped-artificial" },
      { label: "Suelos PVC", href: "/productos/suelos-pvc" },
      { label: "Losetas", href: "/productos/losetas" },
      { label: "Adhesivos", href: "/productos/adhesivos" },
      { label: "Accesorios", href: "/productos/accesorios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nosotros", href: "/sobre-nosotros" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Trabaja con Nosotros", href: "/empleo" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Aviso Legal", href: "/legal/aviso-legal" },
      { label: "Política de Privacidad", href: "/legal/privacidad" },
      { label: "Cookies", href: "/legal/cookies" },
      { label: "Condiciones de Venta", href: "/legal/condiciones" },
    ],
  },
];
