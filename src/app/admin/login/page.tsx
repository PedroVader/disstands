"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/logo";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@disstands.com")) {
      setError("Solo emails @disstands.com pueden acceder");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setSent(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Logo variant="dark" />
          <p className="mt-3 text-sm text-brand-gray-dark">Panel de gestión</p>
        </div>

        {sent ? (
          <div className="mt-8 rounded-lg border border-brand-gray bg-white p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              Revisa tu email
            </h2>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Hemos enviado un enlace de acceso a <strong>{email}</strong>.
              Haz clic en el enlace para entrar al panel.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-brand-red hover:text-brand-red-dark"
            >
              Usar otro email
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-8 rounded-lg border border-brand-gray bg-white p-6">
            <h2 className="font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              Iniciar sesión
            </h2>
            <p className="mt-1 text-sm text-brand-gray-dark">
              Introduce tu email corporativo para recibir un enlace de acceso.
            </p>

            <div className="mt-5">
              <label className="text-sm font-medium text-brand-black">Email corporativo</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@disstands.com"
                  required
                  className="w-full rounded-lg border border-brand-gray bg-white py-2.5 pl-10 pr-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-red"
                />
              </div>
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-brand-gray-dark"
            >
              {loading ? "Enviando…" : (
                <>
                  Enviar enlace de acceso
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/admin/registro"
                className="text-sm text-brand-gray-dark hover:text-brand-red"
              >
                ¿Primera vez? Crear cuenta
              </Link>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-brand-gray-dark">
          <Link href="/" className="hover:text-brand-red">← Volver a disstands.com</Link>
        </p>
      </div>
    </main>
  );
}
