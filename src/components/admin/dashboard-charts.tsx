"use client";

import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

// ─── Color palette ────────────────────────────────────────────────────
const COLORS = {
  red: "#E30613",
  redDark: "#B80510",
  black: "#0A0A0A",
  dark: "#1A1A1A",
  gray: "#6B6B6B",
  grayLight: "#E5E5E5",
  cream: "#F5F5F5",
  green: "#22C55E",
  amber: "#F59E0B",
  blue: "#3B82F6",
};

const PIE_COLORS = [COLORS.red, COLORS.blue, COLORS.green, COLORS.amber, COLORS.dark, COLORS.gray];

// ─── Mock data ────────────────────────────────────────────────────────

export const revenueByMonth = [
  { mes: "Oct", ingresos: 42300, gastos: 28100 },
  { mes: "Nov", ingresos: 56800, gastos: 31200 },
  { mes: "Dic", ingresos: 38900, gastos: 25800 },
  { mes: "Ene", ingresos: 61200, gastos: 33400 },
  { mes: "Feb", ingresos: 72500, gastos: 35600 },
  { mes: "Mar", ingresos: 68100, gastos: 32900 },
];

export const ordersByStatus = [
  { name: "Pendiente", value: 12 },
  { name: "Pagado", value: 8 },
  { name: "Preparación", value: 5 },
  { name: "Enviado", value: 3 },
  { name: "Completado", value: 45 },
  { name: "Cancelado", value: 2 },
];

export const topProducts = [
  { nombre: "Moqueta Rib", ventas: 1240 },
  { nombre: "Las Vegas", ventas: 980 },
  { nombre: "Bredis 30mm", ventas: 760 },
  { nombre: "PVC Click", ventas: 620 },
  { nombre: "Loseta Econyl", ventas: 410 },
];

export const eventsByMonth = [
  { mes: "Oct", eventos: 4 },
  { mes: "Nov", eventos: 7 },
  { mes: "Dic", eventos: 3 },
  { mes: "Ene", eventos: 8 },
  { mes: "Feb", eventos: 12 },
  { mes: "Mar", eventos: 9 },
];

export const salesByCategory = [
  { name: "Moquetas", value: 42 },
  { name: "Césped", value: 18 },
  { name: "PVC", value: 15 },
  { name: "Losetas", value: 12 },
  { name: "Adhesivos", value: 8 },
  { name: "Accesorios", value: 5 },
];

export const dailyOrders = [
  { dia: "Lun", pedidos: 5, m2: 320 },
  { dia: "Mar", pedidos: 8, m2: 540 },
  { dia: "Mié", pedidos: 6, m2: 410 },
  { dia: "Jue", pedidos: 9, m2: 680 },
  { dia: "Vie", pedidos: 12, m2: 890 },
  { dia: "Sáb", pedidos: 4, m2: 220 },
  { dia: "Dom", pedidos: 1, m2: 40 },
];

export const monthlyFinance = [
  { mes: "Oct", ingresos: 42300, gastos: 28100, beneficio: 14200 },
  { mes: "Nov", ingresos: 56800, gastos: 31200, beneficio: 25600 },
  { mes: "Dic", ingresos: 38900, gastos: 25800, beneficio: 13100 },
  { mes: "Ene", ingresos: 61200, gastos: 33400, beneficio: 27800 },
  { mes: "Feb", ingresos: 72500, gastos: 35600, beneficio: 36900 },
  { mes: "Mar", ingresos: 68100, gastos: 32900, beneficio: 35200 },
];

export const expenseBreakdown = [
  { name: "Material", value: 45 },
  { name: "Transporte", value: 20 },
  { name: "Personal", value: 18 },
  { name: "Instalación", value: 12 },
  { name: "Otros", value: 5 },
];

export const installationStatus = [
  { name: "Planificado", value: 6 },
  { name: "En montaje", value: 3 },
  { name: "Activo", value: 8 },
  { name: "Desmontaje", value: 2 },
  { name: "Completado", value: 24 },
];

export const m2ByMonth = [
  { mes: "Oct", m2: 3200 },
  { mes: "Nov", m2: 4800 },
  { mes: "Dic", m2: 2900 },
  { mes: "Ene", m2: 5600 },
  { mes: "Feb", m2: 7100 },
  { mes: "Mar", m2: 6200 },
];

// ─── Chart Components ─────────────────────────────────────────────────

export function RevenueAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={revenueByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis dataKey="mes" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis fontSize={12} tick={{ fill: COLORS.gray }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(v) => `${Number(v).toLocaleString("es-ES")} €`} />
        <Area type="monotone" dataKey="ingresos" stroke={COLORS.red} fill={COLORS.red} fillOpacity={0.15} strokeWidth={2} name="Ingresos" />
        <Area type="monotone" dataKey="gastos" stroke={COLORS.gray} fill={COLORS.gray} fillOpacity={0.1} strokeWidth={2} name="Gastos" />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OrdersPieChart({ data }: { data?: { name: string; value: number }[] }) {
  const chartData = data || ordersByStatus;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
          {chartData.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v} pedidos`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TopProductsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={topProducts} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis type="number" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis type="category" dataKey="nombre" fontSize={12} tick={{ fill: COLORS.gray }} width={100} />
        <Tooltip formatter={(v) => `${v} m²`} />
        <Bar dataKey="ventas" fill={COLORS.red} radius={[0, 4, 4, 0]} name="m² vendidos" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function EventsBarChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={eventsByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis dataKey="mes" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis fontSize={12} tick={{ fill: COLORS.gray }} />
        <Tooltip />
        <Bar dataKey="eventos" fill={COLORS.dark} radius={[4, 4, 0, 0]} name="Eventos" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SalesByCategoryPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={salesByCategory} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
          {salesByCategory.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DailyOrdersChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={dailyOrders}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis dataKey="dia" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis yAxisId="left" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis yAxisId="right" orientation="right" fontSize={12} tick={{ fill: COLORS.gray }} />
        <Tooltip />
        <Bar yAxisId="left" dataKey="pedidos" fill={COLORS.red} radius={[4, 4, 0, 0]} name="Pedidos" />
        <Bar yAxisId="right" dataKey="m2" fill={COLORS.blue} radius={[4, 4, 0, 0]} name="m² solicitados" />
        <Legend />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FinanceAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={monthlyFinance}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis dataKey="mes" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis fontSize={12} tick={{ fill: COLORS.gray }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={(v) => `${Number(v).toLocaleString("es-ES")} €`} />
        <Area type="monotone" dataKey="ingresos" stroke={COLORS.green} fill={COLORS.green} fillOpacity={0.15} strokeWidth={2} name="Ingresos" />
        <Area type="monotone" dataKey="gastos" stroke={COLORS.red} fill={COLORS.red} fillOpacity={0.15} strokeWidth={2} name="Gastos" />
        <Area type="monotone" dataKey="beneficio" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.1} strokeWidth={2} name="Beneficio" />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ExpensePieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
          {expenseBreakdown.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v}%`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function InstallationPieChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={installationStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
          {installationStatus.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v) => `${v} eventos`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function M2AreaChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={m2ByMonth}>
        <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grayLight} />
        <XAxis dataKey="mes" fontSize={12} tick={{ fill: COLORS.gray }} />
        <YAxis fontSize={12} tick={{ fill: COLORS.gray }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
        <Tooltip formatter={(v) => `${Number(v).toLocaleString("es-ES")} m²`} />
        <Area type="monotone" dataKey="m2" stroke={COLORS.red} fill={COLORS.red} fillOpacity={0.2} strokeWidth={2} name="m² instalados" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
