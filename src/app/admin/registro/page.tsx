"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/logo";
import { User, Mail, ArrowRight, CheckCircle, Shield } from "lucide-react";

export default function AdminRegistroPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@disstands.com")) {
      setError("Solo emails @disstands.com pueden registrarse");
      return;
    }

    if (!fullName.trim()) {
      setError("Introduce tu nombre completo");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else {
      setDone(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <Logo variant="dark" />
          <p className="mt-3 text-sm text-brand-gray-dark">Crear cuenta de equipo</p>
        </div>

        {done ? (
          <div className="mt-8 rounded-lg border border-brand-gray bg-white p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              Revisa tu email
            </h2>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Hemos enviado un enlace de verificación a <strong>{email}</strong>.
            </p>
            <p className="mt-2 text-sm text-brand-gray-dark">
              Una vez verificado, un administrador activará tu cuenta y asignará tu rol.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="mt-8 rounded-lg border border-brand-gray bg-white p-6">
            <h2 className="font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              Registro de equipo
            </h2>

            <div className="mt-2 flex items-center gap-2 rounded-lg bg-brand-cream p-3">
              <Shield className="h-4 w-4 flex-shrink-0 text-brand-red" />
              <p className="text-xs text-brand-gray-dark">
                Solo emails <strong>@disstands.com</strong> pueden crear cuenta.
                Tu acceso será activado por un administrador.
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-brand-black">Nombre completo</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Àlex García"
                    required
                    className="w-full rounded-lg border border-brand-gray bg-white py-2.5 pl-10 pr-3 text-sm text-brand-black outline-none transition-colors focus:border-brand-red"
                  />
                </div>
              </div>

              <div>
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
            </div>

            {error && (
              <p className="mt-3 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-brand-gray-dark"
            >
              {loading ? "Creando cuenta…" : (
                <>
                  Crear cuenta
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/admin/login"
                className="text-sm text-brand-gray-dark hover:text-brand-red"
              >
                ¿Ya tienes cuenta? Iniciar sesión
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
