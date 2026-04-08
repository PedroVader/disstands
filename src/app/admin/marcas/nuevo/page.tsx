"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminClienteNuevoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [province, setProvince] = useState("");
  const [nif, setNif] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contactName.trim()) { setError("El nombre de contacto es obligatorio"); return; }
    if (!email.trim()) { setError("El email es obligatorio"); return; }

    setSaving(true);
    const supabase = createClient();

    const { error: insertError } = await supabase
      .from("clients")
      .insert({
        company: company.trim() || null,
        contact_name: contactName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        address: address.trim() || null,
        city: city.trim() || null,
        postal_code: postalCode.trim() || null,
        province: province.trim() || null,
        nif: nif.trim() || null,
        notes: notes.trim() || null,
      });

    if (insertError) {
      setError(insertError.message);
      toast.error("Error al crear la marca");
      setSaving(false);
      return;
    }

    toast.success("Marca creada");
    router.push("/admin/marcas");
  };

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin/marcas"
            className="rounded-lg p-1.5 text-brand-gray-dark transition-colors hover:bg-white hover:text-brand-black"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
              Nueva marca
            </h1>
            <p className="mt-0.5 text-sm text-brand-gray-dark">
              Rellena los datos de la nueva marca
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Datos de contacto</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-brand-black">Nombre contacto *</label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Juan García"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Empresa</label>
                <input
                  type="text"
                  maxLength={200}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Email *</label>
                <input
                  type="email"
                  required
                  maxLength={254}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="email@empresa.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Teléfono</label>
                <input
                  type="tel"
                  maxLength={20}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">NIF / CIF</label>
                <input
                  type="text"
                  maxLength={20}
                  value={nif}
                  onChange={(e) => setNif(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="B12345678"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Dirección</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-brand-black">Dirección</label>
                <input
                  type="text"
                  maxLength={200}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                  placeholder="Calle, número, piso…"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Ciudad</label>
                <input
                  type="text"
                  maxLength={200}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Código postal</label>
                <input
                  type="text"
                  maxLength={10}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-brand-black">Provincia</label>
                <input
                  type="text"
                  maxLength={200}
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-gray bg-white p-5">
            <h2 className="text-sm font-semibold text-brand-black">Notas</h2>
            <textarea
              maxLength={5000}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-3 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red"
              placeholder="Notas internas sobre la marca…"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/admin/marcas"
              className="rounded-lg border border-brand-gray px-4 py-2.5 text-sm font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Guardando…" : "Crear marca"}
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
