"use client";

import Image from "next/image";
import { trustClients } from "@/data/trust-clients";
import { useTranslation } from "@/i18n";

export function TrustBar() {
  // Duplicate enough times to always fill the viewport seamlessly
  const set = [...trustClients, ...trustClients, ...trustClients, ...trustClients];
  const { t } = useTranslation();

  return (
    <section id="trust" className="overflow-hidden border-b border-brand-gray bg-white py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-brand-gray-dark">
        {t.trust.title}
      </p>
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-16">
          {set.map((client, i) => (
            <div
              key={`a-${client.id}-${i}`}
              className="flex h-16 shrink-0 items-center justify-center grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={80}
                className={`object-contain ${client.large ? "h-14 w-auto" : "h-10 w-auto"}`}
              />
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-16 pl-16">
          {set.map((client, i) => (
            <div
              key={`b-${client.id}-${i}`}
              className="flex h-16 shrink-0 items-center justify-center grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={80}
                className={`object-contain ${client.large ? "h-14 w-auto" : "h-10 w-auto"}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
