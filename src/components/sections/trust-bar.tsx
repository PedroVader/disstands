import Image from "next/image";
import { trustClients } from "@/data/trust-clients";

export function TrustBar() {
  const duplicated = [...trustClients, ...trustClients];

  return (
    <section id="trust" className="overflow-hidden border-b border-brand-gray bg-white py-10">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-brand-gray-dark">
        Confían en nosotros
      </p>
      <div className="relative">
        <div className="flex animate-marquee gap-16">
          {duplicated.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex h-10 w-40 shrink-0 items-center justify-center grayscale opacity-40 transition-all hover:grayscale-0 hover:opacity-100"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={80}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
