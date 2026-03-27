"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text as KonvaText, Group, Image as KonvaImage } from "react-konva";
import Link from "next/link";
import {
  Grid3x3, Palette, Download, Save, RotateCcw, ZoomIn, ZoomOut,
  FileDown, Image as ImageIcon, Ruler, Calculator, Trash2, ArrowLeft,
  MousePointer, Paintbrush, Eraser, Move, ChevronDown, ChevronUp,
  Send, X, CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

// ---------- Types ----------
interface FloorType {
  id: string;
  name: string;
  color: string;
  price_per_m2: number;
}

interface Cell {
  x: number;
  y: number;
  typeId: string;
}

type Tool = "select" | "paint" | "erase" | "pan";

// ---------- Constants ----------
const DEFAULT_CELL_SIZE = 40; // px per cell
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;
const GRID_COLS_DEFAULT = 20;
const GRID_ROWS_DEFAULT = 15;
const CELL_REAL_SIZE = 1; // 1m² per cell

// ---------- Helpers ----------
function cellKey(x: number, y: number) {
  return `${x},${y}`;
}

function generateDxf(
  cells: Map<string, Cell>,
  floorTypes: FloorType[],
  gridCols: number,
  gridRows: number,
): string {
  // We build DXF manually for more control and to avoid SSR issues with the lib
  const typeMap = new Map(floorTypes.map((ft) => [ft.id, ft]));
  const lines: string[] = [];

  // Header
  lines.push("0", "SECTION", "2", "HEADER");
  lines.push("9", "$ACADVER", "1", "AC1027");
  lines.push("9", "$INSUNITS", "70", "6"); // meters
  lines.push("0", "ENDSEC");

  // Tables - layers
  lines.push("0", "SECTION", "2", "TABLES");
  lines.push("0", "TABLE", "2", "LAYER", "70", String(floorTypes.length + 1));

  // Default layer
  lines.push("0", "LAYER", "2", "0", "70", "0", "62", "7", "6", "CONTINUOUS");

  // One layer per floor type
  const colorIndices = [1, 2, 3, 4, 5, 6]; // DXF ACI colors
  floorTypes.forEach((ft, i) => {
    lines.push("0", "LAYER", "2", ft.name.replace(/\s/g, "_"), "70", "0", "62", String(colorIndices[i % colorIndices.length]), "6", "CONTINUOUS");
  });
  lines.push("0", "ENDTAB");
  lines.push("0", "ENDSEC");

  // Entities
  lines.push("0", "SECTION", "2", "ENTITIES");

  // Grid outline
  lines.push(
    "0", "LWPOLYLINE", "8", "0", "70", "1", "90", "4",
    "10", "0", "20", "0",
    "10", String(gridCols), "20", "0",
    "10", String(gridCols), "20", String(gridRows),
    "10", "0", "20", String(gridRows),
  );

  // Each cell as a solid hatch (simplified as filled polyline)
  cells.forEach((cell) => {
    const ft = typeMap.get(cell.typeId);
    const layerName = ft ? ft.name.replace(/\s/g, "_") : "0";
    lines.push(
      "0", "LWPOLYLINE", "8", layerName, "70", "1", "90", "4",
      "10", String(cell.x), "20", String(cell.y),
      "10", String(cell.x + 1), "20", String(cell.y),
      "10", String(cell.x + 1), "20", String(cell.y + 1),
      "10", String(cell.x), "20", String(cell.y + 1),
    );
  });

  // Dimension texts
  // Width
  lines.push(
    "0", "TEXT", "8", "0", "10", String(gridCols / 2), "20", "-1.5", "40", "0.8",
    "1", `${gridCols}m`, "72", "1", "11", String(gridCols / 2), "21", "-1.5",
  );
  // Height
  lines.push(
    "0", "TEXT", "8", "0", "10", "-2", "20", String(gridRows / 2), "40", "0.8",
    "1", `${gridRows}m`, "72", "0",
  );

  lines.push("0", "ENDSEC");
  lines.push("0", "EOF");

  return lines.join("\n");
}

// ---------- Component ----------
export function FloorPlanConfigurator({ floorTypes }: { floorTypes: FloorType[] }) {
  // Grid dimensions
  const [gridCols, setGridCols] = useState(GRID_COLS_DEFAULT);
  const [gridRows, setGridRows] = useState(GRID_ROWS_DEFAULT);

  // Canvas state
  const [cells, setCells] = useState<Map<string, Cell>>(new Map());
  const [selectedType, setSelectedType] = useState<FloorType | null>(floorTypes[0] ?? null);
  const [tool, setTool] = useState<Tool>("paint");
  const [zoom, setZoom] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 40, y: 40 });
  const [isPainting, setIsPainting] = useState(false);
  const [planName, setPlanName] = useState("Mi plano");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMaterials, setShowMaterials] = useState(true);

  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  // Load logo for watermark
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "https://srwybogqbmfhfmxjzaem.supabase.co/storage/v1/object/public/images/site/logo-disstands.png";
    img.onload = () => setLogoImage(img);
  }, []);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cellSize = DEFAULT_CELL_SIZE;

  // ---------- Calculations ----------
  const cellsByType = new Map<string, number>();
  cells.forEach((cell) => {
    cellsByType.set(cell.typeId, (cellsByType.get(cell.typeId) || 0) + 1);
  });

  const totalM2 = cells.size * CELL_REAL_SIZE;
  let totalPrice = 0;
  const breakdown: { type: FloorType; m2: number; price: number }[] = [];
  cellsByType.forEach((count, typeId) => {
    const ft = floorTypes.find((t) => t.id === typeId);
    if (ft) {
      const m2 = count * CELL_REAL_SIZE;
      const price = m2 * ft.price_per_m2;
      totalPrice += price;
      breakdown.push({ type: ft, m2, price });
    }
  });

  // ---------- Cell operations ----------
  const getCellFromPointer = useCallback(
    (e: any) => {
      const stage = e.target.getStage();
      const pointer = stage.getPointerPosition();
      if (!pointer) return null;
      const transform = stage.getAbsoluteTransform().copy().invert();
      const pos = transform.point(pointer);
      const x = Math.floor(pos.x / cellSize);
      const y = Math.floor(pos.y / cellSize);
      if (x < 0 || x >= gridCols || y < 0 || y >= gridRows) return null;
      return { x, y };
    },
    [cellSize, gridCols, gridRows],
  );

  const paintCell = useCallback(
    (x: number, y: number) => {
      if (tool === "paint" && selectedType) {
        setCells((prev) => {
          const next = new Map(prev);
          next.set(cellKey(x, y), { x, y, typeId: selectedType.id });
          return next;
        });
      } else if (tool === "erase") {
        setCells((prev) => {
          const next = new Map(prev);
          next.delete(cellKey(x, y));
          return next;
        });
      }
    },
    [tool, selectedType],
  );

  const handleMouseDown = useCallback(
    (e: any) => {
      if (tool === "pan" || tool === "select") return;
      setIsPainting(true);
      const cell = getCellFromPointer(e);
      if (cell) paintCell(cell.x, cell.y);
    },
    [tool, getCellFromPointer, paintCell],
  );

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!isPainting) return;
      const cell = getCellFromPointer(e);
      if (cell) paintCell(cell.x, cell.y);
    },
    [isPainting, getCellFromPointer, paintCell],
  );

  const handleMouseUp = useCallback(() => {
    setIsPainting(false);
  }, []);

  // ---------- Zoom ----------
  const handleWheel = useCallback(
    (e: any) => {
      e.evt.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };
      const direction = e.evt.deltaY > 0 ? -1 : 1;
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, oldScale + direction * 0.1));
      setZoom(newScale);
      setStagePos({
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      });
    },
    [],
  );

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + 0.2));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - 0.2));
  const resetView = () => {
    setZoom(1);
    setStagePos({ x: 40, y: 40 });
  };

  // ---------- Export PNG ----------
  const exportPng = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `${planName.replace(/\s+/g, "_")}.png`;
    link.href = uri;
    link.click();
  };

  // ---------- Export DXF ----------
  const exportDxf = () => {
    const dxfContent = generateDxf(cells, floorTypes, gridCols, gridRows);
    const blob = new Blob([dxfContent], { type: "application/dxf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${planName.replace(/\s+/g, "_")}.dxf`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // ---------- Quote request modal ----------
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);

  const submitQuoteRequest = async () => {
    setQuoteSubmitting(true);
    try {
      const supabase = createClient();
      const gridData = {
        cols: gridCols,
        rows: gridRows,
        cells: Array.from(cells.values()),
      };

      // Save floor plan
      await supabase.from("floor_plans").insert({
        name: planName,
        grid_data: gridData,
        total_m2: totalM2,
        total_price: totalPrice,
      });

      // Create inquiry with plan details
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "monta_tu_feria",
          name: quoteForm.name,
          email: quoteForm.email,
          phone: quoteForm.phone,
          company: quoteForm.company,
          metadata: {
            planName,
            totalM2,
            totalPrice,
            gridCols,
            gridRows,
            materials: breakdown.map((b) => ({
              name: b.type.name,
              m2: b.m2,
              pricePerM2: b.type.price_per_m2,
              subtotal: b.price,
            })),
            notes: quoteForm.notes,
          },
        }),
      });

      setQuoteSent(true);
    } catch (err) {
      console.error("Error submitting quote:", err);
    }
    setQuoteSubmitting(false);
  };

  // ---------- Clear ----------
  const clearAll = () => {
    setCells(new Map());
  };

  // ---------- Cursor ----------
  const cursorClass =
    tool === "paint" ? "cursor-crosshair" :
    tool === "erase" ? "cursor-pointer" :
    tool === "pan" ? "cursor-grab" : "cursor-default";

  // ---------- Render ----------
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-brand-cream lg:flex-row">
      {/* Left sidebar — tools + materials */}
      <aside className="flex shrink-0 flex-col border-b border-brand-gray bg-white lg:w-80 lg:border-b-0 lg:border-r">
        {/* Header */}
        <div className="border-b border-brand-gray px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-gray-dark transition-colors hover:bg-brand-cream"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex-1">
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full bg-transparent font-[var(--font-heading)] text-lg font-bold text-brand-black outline-none"
              />
            </div>
          </div>
        </div>

        {/* Grid dimensions */}
        <div className="border-b border-brand-gray px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
            <Grid3x3 className="h-3.5 w-3.5" />
            Dimensiones del plano
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1">
              <label className="text-xs text-brand-gray-dark">Ancho (m)</label>
              <input
                type="number"
                min={3}
                max={100}
                value={gridCols}
                onChange={(e) => setGridCols(Math.max(3, Math.min(100, +e.target.value || 3)))}
                className="mt-0.5 w-full rounded-md border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
              />
            </div>
            <span className="mt-4 text-brand-gray-dark">×</span>
            <div className="flex-1">
              <label className="text-xs text-brand-gray-dark">Alto (m)</label>
              <input
                type="number"
                min={3}
                max={100}
                value={gridRows}
                onChange={(e) => setGridRows(Math.max(3, Math.min(100, +e.target.value || 3)))}
                className="mt-0.5 w-full rounded-md border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red"
              />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-brand-gray-dark">
            Espacio total: {gridCols * gridRows} m²
          </p>
        </div>

        {/* Tools */}
        <div className="border-b border-brand-gray px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
            <MousePointer className="h-3.5 w-3.5" />
            Herramientas
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {[
              { id: "paint" as Tool, icon: Paintbrush, label: "Pintar" },
              { id: "erase" as Tool, icon: Eraser, label: "Borrar" },
              { id: "pan" as Tool, icon: Move, label: "Mover" },
              { id: "select" as Tool, icon: MousePointer, label: "Seleccionar" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors",
                  tool === t.id
                    ? "bg-brand-red text-white"
                    : "bg-brand-cream text-brand-gray-dark hover:bg-brand-gray",
                )}
                title={t.label}
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:block">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Materials - collapsible on mobile */}
        <div className="flex-1 overflow-y-auto">
          <button
            onClick={() => setShowMaterials(!showMaterials)}
            className="flex w-full items-center justify-between border-b border-brand-gray px-4 py-3 lg:pointer-events-none"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
              <Palette className="h-3.5 w-3.5" />
              Materiales
            </div>
            <span className="lg:hidden">
              {showMaterials ? <ChevronUp className="h-4 w-4 text-brand-gray-dark" /> : <ChevronDown className="h-4 w-4 text-brand-gray-dark" />}
            </span>
          </button>
          {showMaterials && (
            <div className="space-y-1 px-4 py-2">
              {floorTypes.map((ft) => (
                <button
                  key={ft.id}
                  onClick={() => {
                    setSelectedType(ft);
                    setTool("paint");
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                    selectedType?.id === ft.id
                      ? "bg-brand-cream ring-2 ring-brand-red"
                      : "hover:bg-brand-cream",
                  )}
                >
                  <div
                    className="h-6 w-6 shrink-0 rounded-md border border-black/10"
                    style={{ backgroundColor: ft.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-brand-black">{ft.name}</p>
                    <p className="text-xs text-brand-gray-dark">{ft.price_per_m2.toFixed(2)} €/m²</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border-t border-brand-gray bg-brand-cream px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
            <Calculator className="h-3.5 w-3.5" />
            Resumen
          </div>
          <div className="mt-2 space-y-1">
            {breakdown.map((b) => (
              <div key={b.type.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: b.type.color }} />
                  <span className="text-brand-gray-dark">{b.type.name}</span>
                </div>
                <span className="font-medium text-brand-black">{b.m2} m² — {b.price.toFixed(2)} €</span>
              </div>
            ))}
            {breakdown.length === 0 && (
              <p className="text-xs text-brand-gray-dark">Selecciona celdas en el plano</p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-brand-gray pt-2">
            <div className="flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-brand-gray-dark" />
              <span className="text-sm font-semibold text-brand-black">{totalM2} m²</span>
            </div>
            <span className="text-sm font-bold text-brand-red">{totalPrice.toFixed(2)} €</span>
          </div>
        </div>
      </aside>

      {/* Main canvas area */}
      <div className="relative flex flex-1 flex-col">
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-gray bg-white px-4 py-2">
          <div className="flex items-center gap-1">
            <button onClick={zoomOut} className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Alejar">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="min-w-[3rem] text-center text-xs font-medium text-brand-gray-dark">
              {Math.round(zoom * 100)}%
            </span>
            <button onClick={zoomIn} className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Acercar">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button onClick={resetView} className="ml-1 rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Resetear vista">
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Limpiar
            </button>
            <div className="h-4 w-px bg-brand-gray" />
            <button
              onClick={exportPng}
              disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-40"
            >
              <ImageIcon className="h-3.5 w-3.5" />
              PNG
            </button>
            <button
              onClick={exportDxf}
              disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-40"
            >
              <FileDown className="h-3.5 w-3.5" />
              DXF
            </button>
            <div className="h-4 w-px bg-brand-gray" />
            <button
              onClick={() => setShowQuoteModal(true)}
              disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-red px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
              Solicitar Presupuesto
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className={cn("relative flex-1 overflow-hidden bg-[#F8F8F8]", cursorClass)}
        >
          <Stage
            ref={stageRef}
            width={containerSize.width}
            height={containerSize.height}
            scaleX={zoom}
            scaleY={zoom}
            x={stagePos.x}
            y={stagePos.y}
            draggable={tool === "pan"}
            onDragEnd={(e) => {
              setStagePos({ x: e.target.x(), y: e.target.y() });
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onWheel={handleWheel}
          >
            <Layer>
              {/* Grid background */}
              <Rect
                x={0}
                y={0}
                width={gridCols * cellSize}
                height={gridRows * cellSize}
                fill="#FFFFFF"
                stroke="#D1D5DB"
                strokeWidth={2}
              />

              {/* Grid lines — vertical */}
              {Array.from({ length: gridCols + 1 }, (_, i) => (
                <Rect
                  key={`v-${i}`}
                  x={i * cellSize}
                  y={0}
                  width={1}
                  height={gridRows * cellSize}
                  fill={i % 5 === 0 ? "#9CA3AF" : "#E5E7EB"}
                />
              ))}
              {/* Grid lines — horizontal */}
              {Array.from({ length: gridRows + 1 }, (_, i) => (
                <Rect
                  key={`h-${i}`}
                  x={0}
                  y={i * cellSize}
                  width={gridCols * cellSize}
                  height={1}
                  fill={i % 5 === 0 ? "#9CA3AF" : "#E5E7EB"}
                />
              ))}

              {/* Filled cells */}
              {Array.from(cells.values()).map((cell) => {
                const ft = floorTypes.find((t) => t.id === cell.typeId);
                return (
                  <Rect
                    key={cellKey(cell.x, cell.y)}
                    x={cell.x * cellSize + 1}
                    y={cell.y * cellSize + 1}
                    width={cellSize - 2}
                    height={cellSize - 2}
                    fill={ft?.color ?? "#888"}
                    opacity={0.8}
                    cornerRadius={2}
                  />
                );
              })}

              {/* Axis labels */}
              {Array.from({ length: gridCols }, (_, i) =>
                i % 5 === 0 ? (
                  <KonvaText
                    key={`lx-${i}`}
                    x={i * cellSize}
                    y={-16}
                    text={`${i}m`}
                    fontSize={10}
                    fill="#9CA3AF"
                    align="center"
                    width={cellSize}
                  />
                ) : null,
              )}
              {Array.from({ length: gridRows }, (_, i) =>
                i % 5 === 0 ? (
                  <KonvaText
                    key={`ly-${i}`}
                    x={-28}
                    y={i * cellSize + 2}
                    text={`${i}m`}
                    fontSize={10}
                    fill="#9CA3AF"
                  />
                ) : null,
              )}

              {/* Dimensions */}
              <Group>
                {/* Width dimension */}
                <Rect
                  x={0}
                  y={gridRows * cellSize + 8}
                  width={gridCols * cellSize}
                  height={1}
                  fill="#6B7280"
                />
                <KonvaText
                  x={0}
                  y={gridRows * cellSize + 14}
                  text={`${gridCols} m`}
                  fontSize={12}
                  fill="#374151"
                  fontStyle="bold"
                  width={gridCols * cellSize}
                  align="center"
                />
                {/* Height dimension */}
                <Rect
                  x={gridCols * cellSize + 8}
                  y={0}
                  width={1}
                  height={gridRows * cellSize}
                  fill="#6B7280"
                />
                <KonvaText
                  x={gridCols * cellSize + 14}
                  y={gridRows * cellSize / 2 - 6}
                  text={`${gridRows} m`}
                  fontSize={12}
                  fill="#374151"
                  fontStyle="bold"
                />
              </Group>

              {/* Disstands logo watermark — bottom right */}
              {logoImage && (
                <Group
                  x={gridCols * cellSize - 120}
                  y={gridRows * cellSize + 30}
                >
                  <KonvaImage
                    image={logoImage}
                    width={110}
                    height={33}
                    opacity={0.6}
                  />
                  <KonvaText
                    x={0}
                    y={36}
                    text="disstands.com"
                    fontSize={9}
                    fill="#9CA3AF"
                    width={110}
                    align="center"
                  />
                </Group>
              )}
            </Layer>
          </Stage>

          {/* Shortcut hints */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <span className="rounded bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur">
              Scroll = Zoom
            </span>
            <span className="rounded bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur">
              Click + arrastrar = Pintar
            </span>
          </div>
        </div>
      </div>

      {/* Quote request modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
            <button
              onClick={() => { setShowQuoteModal(false); setQuoteSent(false); }}
              className="absolute right-3 top-3 rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream"
            >
              <X className="h-4 w-4" />
            </button>

            {quoteSent ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-xl font-bold text-brand-black">
                  Solicitud enviada
                </h3>
                <p className="mt-2 text-sm text-brand-gray-dark">
                  Hemos recibido tu plano y datos de contacto. Te enviaremos un presupuesto personalizado en menos de 24 horas.
                </p>
                <button
                  onClick={() => { setShowQuoteModal(false); setQuoteSent(false); }}
                  className="mt-6 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <div className="px-6 py-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">
                  Solicitar presupuesto
                </h3>
                <p className="mt-1 text-sm text-brand-gray-dark">
                  Te enviaremos un presupuesto detallado basado en tu plano.
                </p>

                {/* Plan summary */}
                <div className="mt-4 rounded-lg bg-brand-cream p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-brand-gray-dark">Plano: <span className="font-medium text-brand-black">{planName}</span></span>
                    <span className="font-bold text-brand-red">{totalM2} m² — {totalPrice.toFixed(2)} €</span>
                  </div>
                  {breakdown.length > 0 && (
                    <div className="mt-2 space-y-0.5">
                      {breakdown.map((b) => (
                        <div key={b.type.id} className="flex items-center justify-between text-xs text-brand-gray-dark">
                          <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: b.type.color }} />
                            {b.type.name}
                          </div>
                          <span>{b.m2} m² × {b.type.price_per_m2} € = {b.price.toFixed(2)} €</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact form */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-brand-black">Nombre *</label>
                    <input
                      type="text"
                      required
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Email *</label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Teléfono</label>
                    <input
                      type="tel"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Empresa</label>
                    <input
                      type="text"
                      value={quoteForm.company}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, company: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-brand-black">Notas adicionales</label>
                  <textarea
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    placeholder="Evento, fecha, requisitos especiales…"
                  />
                </div>

                <button
                  onClick={submitQuoteRequest}
                  disabled={!quoteForm.name || !quoteForm.email || quoteSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50"
                >
                  {quoteSubmitting ? (
                    "Enviando…"
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar solicitud de presupuesto
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
