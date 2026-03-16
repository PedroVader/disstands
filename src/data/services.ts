import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "ferias",
    title: "Ferias y Eventos",
    description:
      "Suministro e instalación de pavimentos para ferias, congresos y eventos. Servicio integral con montaje y desmontaje en plazos ajustados.",
    icon: "Calendar",
    features: [
      "Entrega en 24-48h",
      "Montaje y desmontaje incluido",
      "Servicio en toda Europa",
      "Stock permanente +50.000 m²",
    ],
  },
  {
    id: "comercial",
    title: "Espacios Comerciales",
    description:
      "Pavimentos técnicos para retail, showrooms, oficinas y espacios corporativos. Soluciones duraderas con diseño premium.",
    icon: "Store",
    features: [
      "Asesoramiento personalizado",
      "Muestras gratuitas",
      "Instalación profesional",
      "Garantía extendida",
    ],
  },
  {
    id: "contract",
    title: "Contract",
    description:
      "Proyectos a medida para hoteles, restaurantes y grandes superficies. Gestión integral desde diseño hasta instalación final.",
    icon: "Building2",
    features: [
      "Presupuesto a medida",
      "Gestión de proyecto",
      "Certificaciones técnicas",
      "Mantenimiento postventa",
    ],
  },
];
