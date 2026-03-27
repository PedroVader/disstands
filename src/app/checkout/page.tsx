"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Lock, ChevronLeft, CreditCard, Truck, FileText } from "lucide-react";

interface FormData {
  email: string;
  phone: string;
  company: string;
  contactName: string;
  nif: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  notes: string;
  needsInstall: boolean;
  installAddress: string;
  installDate: string;
  acceptTerms: boolean;
}

const initialForm: FormData = {
  email: "",
  phone: "",
  company: "",
  contactName: "",
  nif: "",
  address: "",
  city: "",
  postalCode: "",
  province: "",
  notes: "",
  needsInstall: false,
  installAddress: "",
  installDate: "",
  acceptTerms: false,
};

type Step = "datos" | "resumen" | "pago";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, loaded, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState<Step>("datos");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const shipping = subtotal >= 500 ? 0 : 29.9;
  const total = subtotal + shipping;

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateDatos = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!form.contactName.trim()) errs.contactName = "Nombre obligatorio";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email no válido";
    if (!form.phone.trim()) errs.phone = "Teléfono obligatorio";
    if (!form.address.trim()) errs.address = "Dirección obligatoria";
    if (!form.city.trim()) errs.city = "Ciudad obligatoria";
    if (!form.postalCode.trim()) errs.postalCode = "Código postal obligatorio";
    if (!form.province.trim()) errs.province = "Provincia obligatoria";
    if (form.needsInstall && !form.installAddress.trim())
      errs.installAddress = "Dirección de instalación obligatoria";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinueToResumen = () => {
    if (validateDatos()) setStep("resumen");
  };

  const handlePay = async () => {
    if (!form.acceptTerms) {
      setErrors({ acceptTerms: "Debes aceptar los términos" });
      return;
    }
    setProcessing(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          items,
          subtotal,
          shipping,
          total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ acceptTerms: data.error || "Error al procesar el pedido" });
        setProcessing(false);
        return;
      }

      clearCart();
      router.push(`/checkout/confirmacion?pedido=${encodeURIComponent(data.orderNumber)}`);
    } catch {
      setErrors({ acceptTerms: "Error de conexión. Inténtalo de nuevo." });
      setProcessing(false);
    }
  };

  if (!loaded) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-brand-gray-dark">Cargando…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (items.length === 0 && step !== "pago") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-brand-black">
              No tienes productos en el carrito
            </h2>
            <Link
              href="/catalogo"
              className="mt-4 inline-block text-sm font-medium text-brand-red hover:text-brand-red-dark"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "datos", label: "Datos", icon: <FileText className="h-4 w-4" /> },
    { key: "resumen", label: "Resumen", icon: <Truck className="h-4 w-4" /> },
    { key: "pago", label: "Pago", icon: <CreditCard className="h-4 w-4" /> },
  ];

  const stepOrder: Step[] = ["datos", "resumen", "pago"];
  const currentIdx = stepOrder.indexOf(step);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Header */}
        <div className="border-b border-brand-gray bg-brand-cream">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Carrito", href: "/carrito" },
                { label: "Checkout" },
              ]}
            />
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-brand-black sm:text-4xl">
              Checkout
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Step indicators */}
          <div className="mb-10 flex items-center justify-center gap-2">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (i < currentIdx) setStep(s.key);
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    step === s.key
                      ? "bg-brand-red text-white"
                      : i < currentIdx
                        ? "bg-brand-cream text-brand-black hover:bg-brand-gray"
                        : "bg-brand-cream text-brand-gray-dark"
                  )}
                >
                  {s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className="h-px w-8 bg-brand-gray sm:w-12" />
                )}
              </div>
            ))}
          </div>

          {/* Step: Datos */}
          {step === "datos" && (
            <div className="mx-auto max-w-2xl">
              <h2 className="font-[var(--font-heading)] text-xl font-semibold text-brand-black">
                Datos de facturación y envío
              </h2>
              <p className="mt-1 text-sm text-brand-gray-dark">
                Compra sin registro. Solo necesitamos tus datos para el envío y la factura.
              </p>

              <div className="mt-6 space-y-5">
                {/* Contact */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Nombre de contacto *"
                    value={form.contactName}
                    onChange={(v) => update("contactName", v)}
                    error={errors.contactName}
                    placeholder="Ana García"
                  />
                  <InputField
                    label="Empresa"
                    value={form.company}
                    onChange={(v) => update("company", v)}
                    placeholder="Eventos BCN S.L."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Email *"
                    type="email"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    error={errors.email}
                    placeholder="ana@empresa.com"
                  />
                  <InputField
                    label="Teléfono *"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update("phone", v)}
                    error={errors.phone}
                    placeholder="+34 600 000 000"
                  />
                </div>
                <InputField
                  label="NIF / CIF"
                  value={form.nif}
                  onChange={(v) => update("nif", v)}
                  placeholder="B12345678"
                />

                {/* Address */}
                <div className="border-t border-brand-gray pt-5">
                  <h3 className="text-sm font-semibold text-brand-black">Dirección de envío</h3>
                </div>
                <InputField
                  label="Dirección *"
                  value={form.address}
                  onChange={(v) => update("address", v)}
                  error={errors.address}
                  placeholder="Calle Mayor 10, Nave 3"
                />
                <div className="grid gap-4 sm:grid-cols-3">
                  <InputField
                    label="Ciudad *"
                    value={form.city}
                    onChange={(v) => update("city", v)}
                    error={errors.city}
                    placeholder="Barcelona"
                  />
                  <InputField
                    label="Código postal *"
                    value={form.postalCode}
                    onChange={(v) => update("postalCode", v)}
                    error={errors.postalCode}
                    placeholder="08001"
                  />
                  <InputField
                    label="Provincia *"
                    value={form.province}
                    onChange={(v) => update("province", v)}
                    error={errors.province}
                    placeholder="Barcelona"
                  />
                </div>

                {/* Installation */}
                <div className="border-t border-brand-gray pt-5">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={form.needsInstall}
                      onChange={(e) => update("needsInstall", e.target.checked)}
                      className="h-4 w-4 rounded border-brand-gray accent-brand-red"
                    />
                    <span className="text-sm font-medium text-brand-black">
                      Necesito servicio de instalación
                    </span>
                  </label>
                </div>

                {form.needsInstall && (
                  <div className="space-y-4 rounded-lg border border-brand-gray bg-brand-cream p-4">
                    <InputField
                      label="Dirección de instalación *"
                      value={form.installAddress}
                      onChange={(v) => update("installAddress", v)}
                      error={errors.installAddress}
                      placeholder="Fira Barcelona, Hall 2, Stand B-42"
                    />
                    <InputField
                      label="Fecha de montaje"
                      type="date"
                      value={form.installDate}
                      onChange={(v) => update("installDate", v)}
                    />
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium text-brand-black">Notas del pedido</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm text-brand-black outline-none transition-colors focus:border-brand-red"
                    placeholder="Instrucciones especiales, horarios de entrega…"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Link
                    href="/carrito"
                    className="flex items-center gap-1 text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-black"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Volver al carrito
                  </Link>
                  <button
                    onClick={handleContinueToResumen}
                    className="rounded-lg bg-brand-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Resumen */}
          {step === "resumen" && (
            <div className="mx-auto max-w-2xl">
              <h2 className="font-[var(--font-heading)] text-xl font-semibold text-brand-black">
                Resumen de tu pedido
              </h2>

              {/* Customer info */}
              <div className="mt-6 rounded-lg border border-brand-gray p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-brand-black">Datos de envío</h3>
                  <button
                    onClick={() => setStep("datos")}
                    className="text-xs font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    Editar
                  </button>
                </div>
                <div className="mt-2 text-sm text-brand-gray-dark">
                  <p className="font-medium text-brand-black">{form.contactName}</p>
                  {form.company && <p>{form.company}</p>}
                  <p>{form.email} · {form.phone}</p>
                  <p>{form.address}</p>
                  <p>{form.postalCode} {form.city}, {form.province}</p>
                  {form.nif && <p>NIF: {form.nif}</p>}
                </div>
                {form.needsInstall && (
                  <div className="mt-3 border-t border-brand-gray pt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
                      Instalación
                    </p>
                    <p className="mt-1 text-sm text-brand-gray-dark">{form.installAddress}</p>
                    {form.installDate && (
                      <p className="text-sm text-brand-gray-dark">
                        Fecha: {new Date(form.installDate).toLocaleDateString("es-ES")}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="mt-6 rounded-lg border border-brand-gray">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-brand-black">
                    Productos ({items.length})
                  </h3>
                </div>
                <ul className="divide-y divide-brand-gray">
                  {items.map((item) => (
                    <li
                      key={`${item.productId}-${item.variantId}`}
                      className="flex items-center gap-4 px-4 py-3"
                    >
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-brand-cream">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-brand-black">{item.productName}</p>
                        <p className="text-xs text-brand-gray-dark">
                          {item.variantColor} · {item.m2} m²
                        </p>
                      </div>
                      <p className="text-sm font-bold text-brand-black">
                        {(item.m2 * item.pricePerM2).toFixed(2).replace(".", ",")} €
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-brand-gray p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-gray-dark">Subtotal</span>
                    <span className="font-medium">{subtotal.toFixed(2).replace(".", ",")} €</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-brand-gray-dark">Envío</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        `${shipping.toFixed(2).replace(".", ",")} €`
                      )}
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-brand-gray pt-3">
                    <span className="font-[var(--font-heading)] font-semibold text-brand-black">
                      Total
                    </span>
                    <span className="font-[var(--font-heading)] text-lg font-bold text-brand-red">
                      {total.toFixed(2).replace(".", ",")} €
                    </span>
                  </div>
                </div>
              </div>

              {/* Terms + Pay */}
              <div className="mt-6 space-y-4">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(e) => update("acceptTerms", e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-brand-gray accent-brand-red"
                  />
                  <span className="text-sm text-brand-gray-dark">
                    He leído y acepto las{" "}
                    <Link href="/legal/condiciones" className="text-brand-red hover:underline">
                      condiciones de venta
                    </Link>{" "}
                    y la{" "}
                    <Link href="/legal/privacidad" className="text-brand-red hover:underline">
                      política de privacidad
                    </Link>
                    .
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="text-xs text-red-600">{errors.acceptTerms}</p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep("datos")}
                    className="flex items-center gap-1 text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-black"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Volver
                  </button>
                  <button
                    onClick={handlePay}
                    disabled={processing}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium text-white transition-colors",
                      processing
                        ? "cursor-not-allowed bg-brand-gray-dark"
                        : "bg-brand-red hover:bg-brand-red-dark"
                    )}
                  >
                    <Lock className="h-4 w-4" />
                    {processing ? "Procesando pago…" : `Pagar ${total.toFixed(2).replace(".", ",")} €`}
                  </button>
                </div>
              </div>

              {/* Trust signals */}
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-brand-gray-dark">
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> Pago seguro SSL
                </span>
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3.5 w-3.5" /> TPV Virtual bancario
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/* Reusable input field */
function InputField({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-brand-black">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm text-brand-black outline-none transition-colors focus:border-brand-red",
          error ? "border-red-500" : "border-brand-gray"
        )}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
