"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Loader2 } from "lucide-react";

const FloorPlanConfigurator = dynamic(
  () => import("./configurator-client").then((mod) => mod.FloorPlanConfigurator),
  { ssr: false },
);

interface FloorType {
  id: string;
  name: string;
  color: string;
  price_per_m2: number;
}

export default function MontaTuFeriaPage() {
  const [floorTypes, setFloorTypes] = useState<FloorType[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/floor-types")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFloorTypes(data);
        } else {
          setFloorTypes([
            { id: "1", name: "Moqueta estándar", color: "#1E40AF", price_per_m2: 12.5 },
            { id: "2", name: "Moqueta premium", color: "#7C3AED", price_per_m2: 18.0 },
            { id: "3", name: "Césped artificial", color: "#16A34A", price_per_m2: 22.0 },
            { id: "4", name: "Suelo PVC", color: "#D97706", price_per_m2: 15.0 },
            { id: "5", name: "Loseta técnica", color: "#6B7280", price_per_m2: 28.0 },
            { id: "6", name: "Caucho deportivo", color: "#DC2626", price_per_m2: 20.0 },
          ]);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white pt-16">
          <p className="text-brand-gray-dark">Error al cargar los materiales. Recarga la página.</p>
        </main>
      </>
    );
  }

  if (!floorTypes) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-white pt-16">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
            <p className="text-sm text-brand-gray-dark">Cargando configurador…</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <FloorPlanConfigurator floorTypes={floorTypes} />
      </main>
    </>
  );
}
