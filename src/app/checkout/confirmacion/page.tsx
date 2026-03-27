"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, Package, Mail, ArrowRight } from "lucide-react";
import { CtaButton } from "@/components/shared/cta-button";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("pedido") || `DIS-${new Date().getFullYear()}-0000`;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
      {/* Success icon */}
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-6 font-[var(--font-heading)] text-3xl font-bold text-brand-black">
        ¡Pedido confirmado!
      </h1>
      <p className="mt-3 text-brand-gray-dark">
        Tu pedido <span className="font-mono font-semibold text-brand-black">{orderNumber}</span> ha
        sido procesado correctamente.
      </p>

      {/* Info cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-brand-gray p-5 text-left">
          <Mail className="h-6 w-6 text-brand-red" />
          <h3 className="mt-3 font-[var(--font-heading)] text-sm font-semibold text-brand-black">
            Confirmación por email
          </h3>
          <p className="mt-1 text-sm text-brand-gray-dark">
            Recibirás un email con los detalles del pedido y la factura en los próximos minutos.
          </p>
        </div>
        <div className="rounded-lg border border-brand-gray p-5 text-left">
          <Package className="h-6 w-6 text-brand-red" />
          <h3 className="mt-3 font-[var(--font-heading)] text-sm font-semibold text-brand-black">
            Envío en 24-48h
          </h3>
          <p className="mt-1 text-sm text-brand-gray-dark">
            Prepararemos tu pedido hoy mismo. Te enviaremos el tracking por email cuando salga
            de nuestro almacén.
          </p>
        </div>
      </div>

      {/* Next steps */}
      <div className="mt-10 rounded-lg border border-brand-gray bg-brand-cream p-6">
        <h3 className="font-[var(--font-heading)] text-sm font-semibold text-brand-black">
          ¿Qué sigue?
        </h3>
        <ul className="mt-3 space-y-2 text-left text-sm text-brand-gray-dark">
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
            Nuestro equipo verificará el pedido y preparará el material.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
            Recibirás un email con el número de seguimiento del envío.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
            Si necesitas asistencia, contacta con nosotros por WhatsApp o email.
          </li>
        </ul>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <CtaButton variant="primary" href="/catalogo">
          Seguir comprando
        </CtaButton>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-black"
        >
          Volver al inicio <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Support */}
      <p className="mt-10 text-xs text-brand-gray-dark">
        ¿Tienes dudas? Llámanos al{" "}
        <a href="tel:+34934567890" className="text-brand-red hover:underline">
          +34 93 456 78 90
        </a>{" "}
        o escríbenos por{" "}
        <a
          href="https://wa.me/34600000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-red hover:underline"
        >
          WhatsApp
        </a>
      </p>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <p className="text-brand-gray-dark">Cargando…</p>
            </div>
          }
        >
          <ConfirmacionContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
