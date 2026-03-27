"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useTranslation } from "@/i18n";

export default function ContactoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contacto",
          name,
          email,
          phone,
          company,
          topic,
          message,
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <section className="border-b border-brand-gray bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="font-[var(--font-heading)] text-4xl font-bold text-brand-black sm:text-5xl">
            {t.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-brand-gray-dark">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact info */}
          <div className="space-y-8 lg:col-span-1">
            <div>
              <h2 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">
                {t.contact.info_title}
              </h2>
              <p className="mt-2 text-sm text-brand-gray-dark">
                {t.contact.info_subtitle}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream">
                  <MapPin className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <p className="font-medium text-brand-black">{t.contact.address}</p>
                  <p className="mt-0.5 text-sm text-brand-gray-dark">
                    Barberà del Vallès, Barcelona
                  </p>
                  <a
                    href="https://maps.app.goo.gl/osm6xkovCLkeeDJp9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-medium text-brand-red hover:text-brand-red-dark"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream">
                  <Phone className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <p className="font-medium text-brand-black">{t.contact.phone}</p>
                  <a href="tel:+34937297858" className="mt-0.5 block text-sm text-brand-gray-dark hover:text-brand-red">
                    +34 937 29 78 58
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream">
                  <Mail className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <p className="font-medium text-brand-black">{t.contact.email}</p>
                  <a href="mailto:ventas@disstands.com" className="mt-0.5 block text-sm text-brand-gray-dark hover:text-brand-red">
                    ventas@disstands.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream">
                  <Clock className="h-5 w-5 text-brand-red" />
                </div>
                <div>
                  <p className="font-medium text-brand-black">{t.contact.schedule}</p>
                  <p className="mt-0.5 text-sm text-brand-gray-dark">
                    {t.contact.schedule_weekdays}<br />
                    {t.contact.schedule_saturday}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-brand-gray bg-brand-cream p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="mt-6 font-[var(--font-heading)] text-2xl font-bold text-brand-black">
                  {t.contact.form_sent_title}
                </h2>
                <p className="mt-2 max-w-md text-brand-gray-dark">
                  {t.contact.form_sent_text}
                </p>
                <button
                  onClick={() => { setSent(false); setName(""); setEmail(""); setPhone(""); setCompany(""); setTopic(""); setMessage(""); }}
                  className="mt-6 rounded-lg bg-brand-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  {t.contact.form_sent_another}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-xl border border-brand-gray bg-white p-6 sm:p-8">
                <h2 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">
                  {t.contact.form_title}
                </h2>
                <p className="mt-1 text-sm text-brand-gray-dark">
                  {t.contact.form_required}
                </p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_name} *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_company}</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_email} *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_phone}</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_topic} *</label>
                    <select
                      required
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                    >
                      <option value="">{t.contact.form_topic_placeholder}</option>
                      {t.contact.topics.map((tp) => (
                        <option key={tp} value={tp}>{tp}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium text-brand-black">{t.contact.form_message} *</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-red"
                      placeholder={t.contact.form_message_placeholder}
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                    Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.
                  </p>
                )}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-brand-gray-dark">
                    {t.contact.form_privacy}{" "}
                    <a href="/legal/privacidad" className="underline hover:text-brand-red">
                      {t.contact.form_privacy_link}
                    </a>
                    .
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Enviando…" : t.contact.form_submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 overflow-hidden rounded-xl border border-brand-gray">
          <a
            href="https://maps.app.goo.gl/osm6xkovCLkeeDJp9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[300px] items-center justify-center bg-brand-cream text-brand-gray-dark transition-colors hover:bg-brand-gray/30"
          >
            <div className="text-center">
              <MapPin className="mx-auto h-8 w-8 text-brand-red" />
              <p className="mt-2 font-medium text-brand-black">Disstands S.L.</p>
              <p className="text-sm">Barberà del Vallès, Barcelona</p>
              <p className="mt-2 text-xs font-medium text-brand-red">Ver en Google Maps</p>
            </div>
          </a>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
