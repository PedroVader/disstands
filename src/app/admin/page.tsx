"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  DashboardAdmin,
  DashboardVentas,
  DashboardContabilidad,
  DashboardMontajes,
  DashboardTrabajador,
} from "@/components/admin/dashboards";

interface Profile {
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
}

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin",
  ceo: "CEO",
  ventas: "Ventas",
  contabilidad: "Contabilidad",
  montajes: "Montajes",
  trabajador: "Trabajador",
};

const DEV_ROLE = process.env.NEXT_PUBLIC_DEV_ROLE;

export default function AdminDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_ROLE) {
      setProfile({
        full_name: `Dev (${roleLabels[DEV_ROLE] || DEV_ROLE})`,
        email: "dev@disstands.com",
        role: DEV_ROLE,
        is_active: true,
      });
      setLoading(false);
      return;
    }

    const load = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/admin/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email, role, is_active")
        .eq("id", user.id)
        .single();

      if (!data?.is_active) {
        router.push("/admin/pendiente");
        return;
      }

      setProfile(data);
      setLoading(false);
    };
    load();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-cream">
        <p className="text-brand-gray-dark">Cargando…</p>
      </main>
    );
  }

  if (!profile) return null;

  const role = profile.role;

  function getDashboard() {
    switch (role) {
      case "super_admin":
      case "ceo":
        return <DashboardAdmin />;
      case "ventas":
        return <DashboardVentas />;
      case "contabilidad":
        return <DashboardContabilidad />;
      case "montajes":
        return <DashboardMontajes />;
      case "trabajador":
        return <DashboardTrabajador />;
      default:
        return <DashboardTrabajador />;
    }
  }

  return (
    <AdminShell>
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
          Hola, {profile.full_name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-brand-gray-dark">
          Panel de gestión Disstands · {roleLabels[role] || role}
        </p>
      </div>

      <div className="mt-6">
        {getDashboard()}
      </div>
    </AdminShell>
  );
}
