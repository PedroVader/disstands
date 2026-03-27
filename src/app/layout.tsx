import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from "@/i18n";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Disstands — Pavimentos que transforman espacios",
  description:
    "Especialistas en pavimentos para ferias, eventos y espacios comerciales. Moquetas, césped artificial, PVC, losetas y más. +23 años de experiencia.",
  keywords: [
    "pavimentos",
    "moquetas",
    "ferias",
    "stands",
    "cesped artificial",
    "PVC",
    "losetas",
    "eventos",
  ],
  openGraph: {
    title: "Disstands — Pavimentos que transforman espacios",
    description:
      "Especialistas en pavimentos para ferias, eventos y espacios comerciales.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=general-sans@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <TranslationProvider>
          {children}
        </TranslationProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
