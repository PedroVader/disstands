"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/shared/logo";
import { Clock, LogOut } from "lucide-react";

export default function AdminPendientePage() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-cream px-4">
      <div className="w-full max-w-sm text-center">
        <Logo variant="dark" />

        <div className="mt-8 rounded-lg border border-brand-gray bg-white p-6">
          <Clock className="mx-auto h-12 w-12 text-yellow-500" />
          <h2 className="mt-4 font-[var(--font-heading)] text-lg font-semibold text-brand-black">
            Cuenta pendiente de activación
          </h2>
          <p className="mt-2 text-sm text-brand-gray-dark">
            Tu cuenta ha sido creada correctamente, pero un administrador debe activarla
            y asignarte un rol antes de que puedas acceder al panel.
          </p>
          <p className="mt-3 text-sm text-brand-gray-dark">
            Contacta con tu responsable o escribe a{" "}
            <a href="mailto:alex@disstands.com" className="text-brand-red hover:underline">
              alex@disstands.com
            </a>
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 inline-flex items-center gap-2 text-sm text-brand-gray-dark transition-colors hover:text-brand-red"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>

        <p className="mt-6 text-xs text-brand-gray-dark">
          <Link href="/" className="hover:text-brand-red">← Volver a disstands.com</Link>
        </p>
      </div>
    </main>
  );
}
