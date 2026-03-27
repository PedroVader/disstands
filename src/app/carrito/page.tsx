"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { CtaButton } from "@/components/shared/cta-button";
import { useCart } from "@/hooks/use-cart";
import { useTranslation } from "@/i18n";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";

export default function CarritoPage() {
  const { items, loaded, removeItem, updateM2, clearCart, subtotal } = useCart();
  const { t } = useTranslation();

  const shipping = subtotal >= 500 ? 0 : 29.9;
  const total = subtotal + shipping;

  if (!loaded) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-16">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-brand-gray-dark">{t.common.loading}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
                { label: t.catalog.title, href: "/catalogo" },
                { label: t.cart.title },
              ]}
            />
            <h1 className="font-[var(--font-heading)] text-3xl font-bold text-brand-black sm:text-4xl">
              {t.cart.title}
            </h1>
            <p className="mt-2 text-brand-gray-dark">
              {items.length === 0
                ? t.cart.empty
                : `${items.length} ${t.catalog.products}`}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-brand-gray" />
              <h2 className="mt-6 font-[var(--font-heading)] text-2xl font-semibold text-brand-black">
                {t.cart.empty}
              </h2>
              <CtaButton variant="primary" href="/catalogo" className="mt-6">
                {t.cart.empty_cta}
              </CtaButton>
            </div>
          ) : (
            <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-12">
              {/* Cart items */}
              <div>
                <ul className="divide-y divide-brand-gray">
                  {items.map((item) => {
                    const lineTotal = item.m2 * item.pricePerM2;
                    return (
                      <li
                        key={`${item.productId}-${item.variantId}`}
                        className="py-6 lg:grid lg:grid-cols-[1fr_160px_140px_100px_40px] lg:items-center"
                      >
                        <div className="flex gap-4">
                          <Link
                            href={`/catalogo/${item.slug}`}
                            className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-brand-cream"
                          >
                            <Image
                              src={item.image}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          </Link>
                          <div className="min-w-0">
                            <Link
                              href={`/catalogo/${item.slug}`}
                              className="font-[var(--font-heading)] text-sm font-semibold text-brand-black hover:text-brand-red"
                            >
                              {item.productName}
                            </Link>
                            <p className="mt-0.5 text-xs text-brand-gray-dark">
                              Color: {item.variantColor}
                            </p>
                            <p className="mt-1 text-sm font-bold text-brand-red lg:hidden">
                              {lineTotal.toFixed(2).replace(".", ",")} €
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between lg:mt-0 lg:justify-center">
                          <div className="flex items-center rounded-lg border border-brand-gray">
                            <button
                              onClick={() => updateM2(item.productId, item.variantId, item.m2 - 1)}
                              className="flex h-8 w-8 items-center justify-center text-brand-gray-dark transition-colors hover:text-brand-black"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.m2}
                              onChange={(e) => updateM2(item.productId, item.variantId, Math.max(1, Number(e.target.value) || 1))}
                              className="h-8 w-14 border-x border-brand-gray bg-transparent text-center text-sm font-medium text-brand-black outline-none"
                            />
                            <button
                              onClick={() => updateM2(item.productId, item.variantId, item.m2 + 1)}
                              className="flex h-8 w-8 items-center justify-center text-brand-gray-dark transition-colors hover:text-brand-black"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        <p className="hidden text-right text-sm text-brand-gray-dark lg:block">
                          {item.pricePerM2.toFixed(2).replace(".", ",")} €/m²
                        </p>

                        <p className="hidden text-right text-sm font-bold text-brand-black lg:block">
                          {lineTotal.toFixed(2).replace(".", ",")} €
                        </p>

                        <div className="mt-3 flex justify-end lg:mt-0">
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="text-brand-gray-dark transition-colors hover:text-brand-red"
                            title={t.cart.remove}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 flex items-center justify-between border-t border-brand-gray pt-6">
                  <Link
                    href="/catalogo"
                    className="text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-black"
                  >
                    ← {t.cart.continue}
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-sm font-medium text-brand-red transition-colors hover:text-brand-red-dark"
                  >
                    {t.cart.clear}
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-8 lg:mt-0">
                <div className="rounded-lg border border-brand-gray bg-brand-cream p-6">
                  <h2 className="font-[var(--font-heading)] text-lg font-semibold text-brand-black">
                    {t.cart.subtotal}
                  </h2>

                  <dl className="mt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <dt className="text-brand-gray-dark">{t.cart.subtotal}</dt>
                      <dd className="font-medium text-brand-black">
                        {subtotal.toFixed(2).replace(".", ",")} €
                      </dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-brand-gray-dark">{t.cart.shipping}</dt>
                      <dd className="font-medium text-brand-black">
                        {shipping === 0 ? (
                          <span className="text-green-600">{t.cart.shipping_free}</span>
                        ) : (
                          `${shipping.toFixed(2).replace(".", ",")} €`
                        )}
                      </dd>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-brand-gray-dark">
                        {t.cart.shipping_note}
                      </p>
                    )}
                    <div className="border-t border-brand-gray pt-3">
                      <div className="flex justify-between">
                        <dt className="font-[var(--font-heading)] text-base font-semibold text-brand-black">
                          {t.cart.total}
                        </dt>
                        <dd className="font-[var(--font-heading)] text-xl font-bold text-brand-red">
                          {total.toFixed(2).replace(".", ",")} €
                        </dd>
                      </div>
                    </div>
                  </dl>

                  <Link
                    href="/checkout"
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-red text-base font-medium text-white transition-colors hover:bg-brand-red-dark"
                  >
                    {t.cart.checkout}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
