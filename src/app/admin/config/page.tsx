"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AdminShell } from "@/components/admin/admin-shell";
import { cn } from "@/lib/utils";
import {
  Users, Shield, CheckCircle, XCircle, Search,
  ChevronDown, AlertTriangle,
} from "lucide-react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const ROLES = [
  { value: "super_admin", label: "Super Admin", description: "Acceso total al sistema" },
  { value: "ceo", label: "CEO", description: "Dashboard, productos, pedidos, clientes, calendario, finanzas" },
  { value: "ventas", label: "Ventas", description: "Productos, pedidos, clientes, calendario" },
  { value: "contabilidad", label: "Contabilidad", description: "Pedidos, clientes, finanzas" },
  { value: "montajes", label: "Montajes", description: "Pedidos, calendario" },
  { value: "trabajador", label: "Trabajador", description: "Acceso básico (por defecto al registrarse)" },
];

const ROLE_COLORS: Record<string, string> = {
  super_admin: "bg-red-100 text-red-700",
  ceo: "bg-purple-100 text-purple-700",
  ventas: "bg-blue-100 text-blue-700",
  contabilidad: "bg-green-100 text-green-700",
  montajes: "bg-orange-100 text-orange-700",
  trabajador: "bg-gray-100 text-gray-600",
};

export default function AdminConfigPage() {
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterActive, setFilterActive] = useState<"all" | "active" | "pending">("all");
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<{ profileId: string; newRole: string } | null>(null);

  useEffect(() => {
    loadCurrentUser();
    loadProfiles();
  }, []);

  const loadCurrentUser = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUserId(user.id);
  };

  const loadProfiles = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setProfiles(data as ProfileRow[]);
    setLoading(false);
  };

  const toggleActive = async (profileId: string, currentActive: boolean) => {
    if (profileId === currentUserId) return; // Can't deactivate yourself
    const supabase = createClient();
    await supabase.from("profiles").update({ is_active: !currentActive }).eq("id", profileId);
    loadProfiles();
  };

  const changeRole = async (profileId: string, newRole: string) => {
    if (profileId === currentUserId && newRole !== "super_admin") {
      setPendingRoleChange({ profileId, newRole });
      return;
    }
    const supabase = createClient();
    await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);
    setEditingRole(null);
    loadProfiles();
  };

  const confirmRoleChange = async () => {
    if (!pendingRoleChange) return;
    const supabase = createClient();
    await supabase.from("profiles").update({ role: pendingRoleChange.newRole }).eq("id", pendingRoleChange.profileId);
    setPendingRoleChange(null);
    setEditingRole(null);
    loadProfiles();
  };

  const filteredProfiles = profiles.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.full_name.toLowerCase().includes(q) && !p.email.toLowerCase().includes(q)) return false;
    }
    if (filterActive === "active" && !p.is_active) return false;
    if (filterActive === "pending" && p.is_active) return false;
    return true;
  });

  const pendingCount = profiles.filter((p) => !p.is_active).length;

  return (
    <AdminShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-brand-black">
            Configuración
          </h1>
          <p className="mt-1 text-sm text-brand-gray-dark">
            Gestión de usuarios y configuración del sistema
          </p>
        </div>

        {/* Pending alert */}
        {pendingCount > 0 && (
          <div className="flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-800">
                {pendingCount} {pendingCount === 1 ? "usuario pendiente" : "usuarios pendientes"} de activación
              </p>
              <p className="text-xs text-yellow-700">
                Los usuarios registrados necesitan ser activados manualmente y tener un rol asignado.
              </p>
            </div>
            <button
              onClick={() => setFilterActive("pending")}
              className="ml-auto rounded-lg bg-yellow-200 px-3 py-1.5 text-xs font-medium text-yellow-800 transition-colors hover:bg-yellow-300"
            >
              Ver pendientes
            </button>
          </div>
        )}

        {/* Users section */}
        <div className="rounded-lg border border-brand-gray bg-white">
          <div className="flex items-center gap-2 border-b border-brand-gray px-5 py-4">
            <Users className="h-5 w-5 text-brand-gray-dark" />
            <h2 className="font-[var(--font-heading)] text-lg font-semibold text-brand-black">
              Usuarios del equipo
            </h2>
            <span className="ml-auto rounded-full bg-brand-cream px-2.5 py-0.5 text-xs font-medium text-brand-gray-dark">
              {profiles.length}
            </span>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3 border-b border-brand-gray px-5 py-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-gray-dark" />
              <input
                type="text"
                placeholder="Buscar por nombre o email…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-brand-gray bg-white py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-red"
              />
            </div>
            <div className="flex gap-1">
              {[
                { key: "all" as const, label: "Todos" },
                { key: "active" as const, label: "Activos" },
                { key: "pending" as const, label: "Pendientes" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterActive(f.key)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                    filterActive === f.key
                      ? "bg-brand-black text-white"
                      : "bg-brand-cream text-brand-gray-dark hover:bg-brand-gray"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* User list */}
          <div className="divide-y divide-brand-gray">
            {loading ? (
              <div className="px-5 py-12 text-center text-brand-gray-dark">Cargando usuarios…</div>
            ) : filteredProfiles.length === 0 ? (
              <div className="px-5 py-12 text-center text-brand-gray-dark">No se encontraron usuarios</div>
            ) : (
              filteredProfiles.map((profile) => {
                const isSelf = profile.id === currentUserId;

                return (
                  <div key={profile.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center">
                    {/* User info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-brand-black">{profile.full_name}</p>
                        {isSelf && (
                          <span className="rounded bg-brand-cream px-1.5 py-0.5 text-[10px] font-medium text-brand-gray-dark">
                            Tú
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-brand-gray-dark">{profile.email}</p>
                      <p className="mt-0.5 text-xs text-brand-gray-dark">
                        Registrado: {new Date(profile.created_at).toLocaleDateString("es-ES", {
                          day: "numeric", month: "short", year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Role selector */}
                    <div className="relative">
                      <button
                        onClick={() => setEditingRole(editingRole === profile.id ? null : profile.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                          ROLE_COLORS[profile.role] || "bg-gray-100 text-gray-700"
                        )}
                      >
                        <Shield className="h-3 w-3" />
                        {ROLES.find((r) => r.value === profile.role)?.label || profile.role}
                        <ChevronDown className="h-3 w-3" />
                      </button>

                      {editingRole === profile.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setEditingRole(null)} />
                          <div className="absolute right-0 z-50 mt-1 w-64 rounded-lg border border-brand-gray bg-white py-1 shadow-lg">
                            {ROLES.map((role) => (
                              <button
                                key={role.value}
                                onClick={() => changeRole(profile.id, role.value)}
                                className={cn(
                                  "flex w-full flex-col px-3 py-2 text-left transition-colors hover:bg-brand-cream",
                                  profile.role === role.value && "bg-brand-cream"
                                )}
                              >
                                <span className="text-sm font-medium text-brand-black">{role.label}</span>
                                <span className="text-xs text-brand-gray-dark">{role.description}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Active toggle */}
                    <button
                      onClick={() => toggleActive(profile.id, profile.is_active)}
                      disabled={isSelf}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                        profile.is_active
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200",
                        isSelf && "cursor-not-allowed opacity-50"
                      )}
                    >
                      {profile.is_active ? (
                        <>
                          <CheckCircle className="h-3.5 w-3.5" />
                          Activo
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" />
                          Inactivo
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Roles reference */}
        <div className="rounded-lg border border-brand-gray bg-white p-5">
          <h2 className="flex items-center gap-2 font-[var(--font-heading)] text-sm font-semibold text-brand-black">
            <Shield className="h-4 w-4 text-brand-gray-dark" />
            Referencia de roles y permisos
          </h2>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-gray text-left">
                  <th className="pb-2 pr-4 font-medium text-brand-gray-dark">Rol</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Dashboard</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Productos</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Pedidos</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Clientes</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Calendario</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Finanzas</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Blog</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Portfolio</th>
                  <th className="pb-2 px-2 text-center font-medium text-brand-gray-dark">Config</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gray">
                {[
                  { role: "Super Admin", perms: [1,1,1,1,1,1,1,1,1] },
                  { role: "CEO", perms: [1,1,1,1,1,1,0,0,0] },
                  { role: "Ventas", perms: [1,1,1,1,1,0,0,0,0] },
                  { role: "Contabilidad", perms: [1,0,1,1,0,1,0,0,0] },
                  { role: "Montajes", perms: [1,0,1,0,1,0,0,0,0] },
                  { role: "Trabajador", perms: [0,0,0,0,0,0,0,0,0] },
                ].map((row) => (
                  <tr key={row.role}>
                    <td className="py-2 pr-4 font-medium text-brand-black">{row.role}</td>
                    {row.perms.map((p, i) => (
                      <td key={i} className="py-2 px-2 text-center">
                        {p ? (
                          <CheckCircle className="mx-auto h-4 w-4 text-green-500" />
                        ) : (
                          <span className="text-brand-gray-dark">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security info */}
        <div className="rounded-lg border border-brand-gray bg-white p-5">
          <h2 className="font-[var(--font-heading)] text-sm font-semibold text-brand-black">
            Seguridad
          </h2>
          <div className="mt-3 space-y-2 text-sm text-brand-gray-dark">
            <p>
              <strong className="text-brand-black">Dominio restringido:</strong> Solo emails @disstands.com pueden registrarse.
              Esta restricción se aplica a nivel de base de datos (trigger en auth.users).
            </p>
            <p>
              <strong className="text-brand-black">Activación manual:</strong> Los nuevos usuarios se crean con is_active=false
              y rol "Trabajador". Un Super Admin debe activarlos y asignar el rol correcto.
            </p>
            <p>
              <strong className="text-brand-black">Row Level Security:</strong> Cada tabla tiene políticas RLS que restringen
              el acceso según el rol del usuario autenticado.
            </p>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={!!pendingRoleChange}
        title="Cambiar tu rol"
        description="Vas a cambiar tu propio rol. ¿Estás seguro?"
        confirmLabel="Cambiar rol"
        variant="warning"
        onConfirm={confirmRoleChange}
        onCancel={() => setPendingRoleChange(null)}
      />
    </AdminShell>
  );
}
