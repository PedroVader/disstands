"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Text as KonvaText, Group, Image as KonvaImage } from "react-konva";
import Link from "next/link";
import {
  Grid3x3, Palette, RotateCcw, ZoomIn, ZoomOut,
  FileDown, Image as ImageIcon, Ruler, Calculator, Trash2, ArrowLeft,
  Paintbrush, Eraser, Move, ChevronDown, ChevronUp,
  Send, X, CheckCircle, Undo2, Redo2, RectangleHorizontal, PaintBucket,
  Info,
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

type Tool = "paint" | "erase" | "pan" | "rect" | "fill";

// ---------- Constants ----------
const DEFAULT_CELL_SIZE = 40;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 3;
const GRID_COLS_DEFAULT = 20;
const GRID_ROWS_DEFAULT = 15;
const CELL_REAL_SIZE = 1;
const MAX_HISTORY = 50;

const LOGO_URL = "https://srwybogqbmfhfmxjzaem.supabase.co/storage/v1/object/public/images/site/logo-disstands.png";

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
  const typeMap = new Map(floorTypes.map((ft) => [ft.id, ft]));
  const lines: string[] = [];

  lines.push("0", "SECTION", "2", "HEADER");
  lines.push("9", "$ACADVER", "1", "AC1027");
  lines.push("9", "$INSUNITS", "70", "6");
  lines.push("0", "ENDSEC");

  lines.push("0", "SECTION", "2", "TABLES");
  lines.push("0", "TABLE", "2", "LAYER", "70", String(floorTypes.length + 1));
  lines.push("0", "LAYER", "2", "0", "70", "0", "62", "7", "6", "CONTINUOUS");
  const colorIndices = [1, 2, 3, 4, 5, 6];
  floorTypes.forEach((ft, i) => {
    lines.push("0", "LAYER", "2", ft.name.replace(/\s/g, "_"), "70", "0", "62", String(colorIndices[i % colorIndices.length]), "6", "CONTINUOUS");
  });
  lines.push("0", "ENDTAB");
  lines.push("0", "ENDSEC");

  lines.push("0", "SECTION", "2", "ENTITIES");
  lines.push(
    "0", "LWPOLYLINE", "8", "0", "70", "1", "90", "4",
    "10", "0", "20", "0",
    "10", String(gridCols), "20", "0",
    "10", String(gridCols), "20", String(gridRows),
    "10", "0", "20", String(gridRows),
  );

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

  lines.push(
    "0", "TEXT", "8", "0", "10", String(gridCols / 2), "20", "-1.5", "40", "0.8",
    "1", `${gridCols}m`, "72", "1", "11", String(gridCols / 2), "21", "-1.5",
  );
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
  const [gridCols, setGridCols] = useState(GRID_COLS_DEFAULT);
  const [gridRows, setGridRows] = useState(GRID_ROWS_DEFAULT);

  const [cells, setCells] = useState<Map<string, Cell>>(new Map());
  const [selectedType, setSelectedType] = useState<FloorType | null>(floorTypes[0] ?? null);
  const [tool, setTool] = useState<Tool>("paint");
  const [zoom, setZoom] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 60, y: 60 });
  const [isPainting, setIsPainting] = useState(false);
  const [planName, setPlanName] = useState("Mi plano");
  const [showMaterials, setShowMaterials] = useState(true);

  // Hover
  const [hoverCell, setHoverCell] = useState<{ x: number; y: number } | null>(null);

  // Rectangle tool
  const [rectStart, setRectStart] = useState<{ x: number; y: number } | null>(null);
  const [rectEnd, setRectEnd] = useState<{ x: number; y: number } | null>(null);

  // Undo/Redo
  const [history, setHistory] = useState<Map<string, Cell>[]>([new Map()]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const pushHistory = useCallback((newCells: Map<string, Cell>) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIdx + 1);
      const next = [...trimmed, newCells].slice(-MAX_HISTORY);
      return next;
    });
    setHistoryIdx((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [historyIdx]);

  const undo = useCallback(() => {
    if (historyIdx > 0) {
      const newIdx = historyIdx - 1;
      setHistoryIdx(newIdx);
      setCells(new Map(history[newIdx]));
    }
  }, [historyIdx, history]);

  const redo = useCallback(() => {
    if (historyIdx < history.length - 1) {
      const newIdx = historyIdx + 1;
      setHistoryIdx(newIdx);
      setCells(new Map(history[newIdx]));
    }
  }, [historyIdx, history]);

  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  // Load logo
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = LOGO_URL;
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

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;

      if ((e.metaKey || e.ctrlKey) && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "z" && e.shiftKey) { e.preventDefault(); redo(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "y") { e.preventDefault(); redo(); }

      if (e.key === "p" || e.key === "b") setTool("paint");
      if (e.key === "e") setTool("erase");
      if (e.key === "m" || e.key === " ") { e.preventDefault(); setTool("pan"); }
      if (e.key === "r") setTool("rect");
      if (e.key === "f" || e.key === "g") setTool("fill");

      const num = parseInt(e.key);
      if (num >= 1 && num <= floorTypes.length) {
        setSelectedType(floorTypes[num - 1]);
        if (tool !== "rect") setTool("paint");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, floorTypes, tool]);

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

  // Fill tool — flood fill same-type connected area
  const floodFill = useCallback(
    (startX: number, startY: number) => {
      if (!selectedType) return;
      const targetKey = cellKey(startX, startY);
      const targetCell = cells.get(targetKey);
      const targetTypeId = targetCell?.typeId ?? null;

      if (targetTypeId === selectedType.id) return; // same type, no-op

      const next = new Map(cells);
      const queue = [{ x: startX, y: startY }];
      const visited = new Set<string>();

      while (queue.length > 0) {
        const { x, y } = queue.shift()!;
        const key = cellKey(x, y);
        if (visited.has(key)) continue;
        if (x < 0 || x >= gridCols || y < 0 || y >= gridRows) continue;

        const existing = cells.get(key);
        const existingType = existing?.typeId ?? null;
        if (existingType !== targetTypeId) continue;

        visited.add(key);
        next.set(key, { x, y, typeId: selectedType.id });
        queue.push({ x: x + 1, y }, { x: x - 1, y }, { x, y: y + 1 }, { x, y: y - 1 });
      }

      setCells(next);
      pushHistory(next);
    },
    [cells, selectedType, gridCols, gridRows, pushHistory],
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

  const commitPaint = useCallback(() => {
    pushHistory(new Map(cells));
  }, [cells, pushHistory]);

  const handleMouseDown = useCallback(
    (e: any) => {
      if (tool === "pan") return;
      const cell = getCellFromPointer(e);
      if (!cell) return;

      if (tool === "fill") {
        floodFill(cell.x, cell.y);
        return;
      }

      if (tool === "rect") {
        setRectStart(cell);
        setRectEnd(cell);
        return;
      }

      setIsPainting(true);
      paintCell(cell.x, cell.y);
    },
    [tool, getCellFromPointer, paintCell, floodFill],
  );

  const handleMouseMove = useCallback(
    (e: any) => {
      const cell = getCellFromPointer(e);
      setHoverCell(cell);

      if (tool === "rect" && rectStart) {
        if (cell) setRectEnd(cell);
        return;
      }

      if (!isPainting) return;
      if (cell) paintCell(cell.x, cell.y);
    },
    [isPainting, getCellFromPointer, paintCell, tool, rectStart],
  );

  const handleMouseUp = useCallback(() => {
    // Commit rectangle
    if (tool === "rect" && rectStart && rectEnd && selectedType) {
      const minX = Math.min(rectStart.x, rectEnd.x);
      const maxX = Math.max(rectStart.x, rectEnd.x);
      const minY = Math.min(rectStart.y, rectEnd.y);
      const maxY = Math.max(rectStart.y, rectEnd.y);

      setCells((prev) => {
        const next = new Map(prev);
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            next.set(cellKey(x, y), { x, y, typeId: selectedType.id });
          }
        }
        pushHistory(next);
        return next;
      });
      setRectStart(null);
      setRectEnd(null);
      return;
    }

    if (isPainting) {
      commitPaint();
    }
    setIsPainting(false);
  }, [tool, rectStart, rectEnd, selectedType, isPainting, commitPaint, pushHistory]);

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
  const resetView = () => { setZoom(1); setStagePos({ x: 60, y: 60 }); };

  // ---------- Export ----------
  const exportPng = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `${planName.replace(/\s+/g, "_")}.png`;
    link.href = uri;
    link.click();
  };

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

  // ---------- Quote request ----------
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);

  const submitQuoteRequest = async () => {
    setQuoteSubmitting(true);
    try {
      const supabase = createClient();
      const gridData = { cols: gridCols, rows: gridRows, cells: Array.from(cells.values()) };
      await supabase.from("floor_plans").insert({ name: planName, grid_data: gridData, total_m2: totalM2, total_price: totalPrice });
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "monta_tu_feria",
          name: quoteForm.name, email: quoteForm.email, phone: quoteForm.phone, company: quoteForm.company,
          metadata: {
            planName, totalM2, totalPrice, gridCols, gridRows,
            materials: breakdown.map((b) => ({ name: b.type.name, m2: b.m2, pricePerM2: b.type.price_per_m2, subtotal: b.price })),
            notes: quoteForm.notes,
          },
        }),
      });
      setQuoteSent(true);
    } catch (err) { console.error("Error submitting quote:", err); }
    setQuoteSubmitting(false);
  };

  // ---------- Clear ----------
  const clearAll = () => {
    const empty = new Map<string, Cell>();
    setCells(empty);
    pushHistory(empty);
  };

  // ---------- Rect preview ----------
  const rectPreview = tool === "rect" && rectStart && rectEnd ? {
    x: Math.min(rectStart.x, rectEnd.x),
    y: Math.min(rectStart.y, rectEnd.y),
    w: Math.abs(rectEnd.x - rectStart.x) + 1,
    h: Math.abs(rectEnd.y - rectStart.y) + 1,
  } : null;

  // ---------- Cursor ----------
  const cursorClass =
    tool === "paint" ? "cursor-crosshair" :
    tool === "erase" ? "cursor-pointer" :
    tool === "pan" ? "cursor-grab" :
    tool === "rect" ? "cursor-crosshair" :
    tool === "fill" ? "cursor-crosshair" : "cursor-default";

  const TOOLS: { id: Tool; icon: any; label: string; shortcut: string }[] = [
    { id: "paint", icon: Paintbrush, label: "Pintar", shortcut: "P" },
    { id: "rect", icon: RectangleHorizontal, label: "Rectángulo", shortcut: "R" },
    { id: "fill", icon: PaintBucket, label: "Rellenar", shortcut: "F" },
    { id: "erase", icon: Eraser, label: "Borrar", shortcut: "E" },
    { id: "pan", icon: Move, label: "Mover", shortcut: "M" },
  ];

  // ---------- Render ----------
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-brand-cream lg:flex-row">
      {/* Sidebar */}
      <aside className="flex shrink-0 flex-col border-b border-brand-gray bg-white lg:w-80 lg:border-b-0 lg:border-r">
        {/* Header */}
        <div className="border-b border-brand-gray px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg text-brand-gray-dark transition-colors hover:bg-brand-cream">
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
              <input type="number" min={3} max={100} value={gridCols}
                onChange={(e) => setGridCols(Math.max(3, Math.min(100, +e.target.value || 3)))}
                className="mt-0.5 w-full rounded-md border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red" />
            </div>
            <span className="mt-4 text-brand-gray-dark">×</span>
            <div className="flex-1">
              <label className="text-xs text-brand-gray-dark">Alto (m)</label>
              <input type="number" min={3} max={100} value={gridRows}
                onChange={(e) => setGridRows(Math.max(3, Math.min(100, +e.target.value || 3)))}
                className="mt-0.5 w-full rounded-md border border-brand-gray bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-red" />
            </div>
          </div>
          <p className="mt-1.5 text-xs text-brand-gray-dark">
            Superficie: <span className="font-semibold text-brand-black">{gridCols * gridRows} m²</span>
          </p>
        </div>

        {/* Tools */}
        <div className="border-b border-brand-gray px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-gray-dark">
              Herramientas
            </div>
            <div className="flex items-center gap-0.5">
              <button onClick={undo} disabled={historyIdx <= 0}
                className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream disabled:opacity-30" title="Deshacer (Ctrl+Z)">
                <Undo2 className="h-3.5 w-3.5" />
              </button>
              <button onClick={redo} disabled={historyIdx >= history.length - 1}
                className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream disabled:opacity-30" title="Rehacer (Ctrl+Shift+Z)">
                <Redo2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-5 gap-1">
            {TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={cn(
                  "group relative flex flex-col items-center gap-0.5 rounded-lg px-1.5 py-2 text-[10px] transition-colors",
                  tool === t.id ? "bg-brand-red text-white shadow-sm" : "bg-brand-cream text-brand-gray-dark hover:bg-brand-gray",
                )}
                title={`${t.label} (${t.shortcut})`}
              >
                <t.icon className="h-4 w-4" />
                <span className="hidden sm:block">{t.label}</span>
                <span className={cn(
                  "absolute -right-0.5 -top-0.5 rounded px-1 py-0.5 text-[8px] font-bold leading-none",
                  tool === t.id ? "bg-white text-brand-red" : "bg-brand-gray-dark/10 text-brand-gray-dark",
                )}>
                  {t.shortcut}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Materials */}
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
              {floorTypes.map((ft, idx) => (
                <button
                  key={ft.id}
                  onClick={() => { setSelectedType(ft); if (tool !== "rect" && tool !== "fill") setTool("paint"); }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all",
                    selectedType?.id === ft.id ? "bg-brand-cream ring-2 ring-brand-red shadow-sm" : "hover:bg-brand-cream",
                  )}
                >
                  <div className="h-7 w-7 shrink-0 rounded-md border border-black/10 shadow-sm" style={{ backgroundColor: ft.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-brand-black">{ft.name}</p>
                    <p className="text-xs text-brand-gray-dark">{ft.price_per_m2.toFixed(2)} €/m²</p>
                  </div>
                  <span className="shrink-0 rounded bg-brand-cream px-1.5 py-0.5 text-[10px] font-bold text-brand-gray-dark">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="border-t border-brand-gray bg-white px-4 py-3">
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
              <p className="text-xs italic text-brand-gray-dark">Pinta celdas para ver el desglose</p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-cream px-3 py-2">
            <div className="flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 text-brand-gray-dark" />
              <span className="text-sm font-semibold text-brand-black">{totalM2} m²</span>
            </div>
            <span className="text-base font-bold text-brand-red">{totalPrice.toFixed(2)} €</span>
          </div>
        </div>
      </aside>

      {/* Main canvas */}
      <div className="relative flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex shrink-0 items-center justify-between border-b border-brand-gray bg-white px-3 py-1.5">
          <div className="flex items-center gap-1">
            <button onClick={zoomOut} className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Alejar">
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="min-w-[3rem] text-center text-xs font-medium text-brand-gray-dark">{Math.round(zoom * 100)}%</span>
            <button onClick={zoomIn} className="rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Acercar">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button onClick={resetView} className="ml-1 rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream" title="Resetear vista">
              <RotateCcw className="h-4 w-4" />
            </button>
            <div className="mx-2 h-4 w-px bg-brand-gray" />
            {hoverCell && (
              <span className="text-[10px] font-mono text-brand-gray-dark">
                ({hoverCell.x}, {hoverCell.y})
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-3.5 w-3.5" /> Limpiar
            </button>
            <div className="h-4 w-px bg-brand-gray" />
            <button onClick={exportPng} disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-40">
              <ImageIcon className="h-3.5 w-3.5" /> PNG
            </button>
            <button onClick={exportDxf} disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-brand-gray-dark transition-colors hover:bg-brand-cream disabled:opacity-40">
              <FileDown className="h-3.5 w-3.5" /> AutoCAD
            </button>
            <div className="h-4 w-px bg-brand-gray" />
            <button onClick={() => setShowQuoteModal(true)} disabled={cells.size === 0}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-red px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-40">
              <Send className="h-3.5 w-3.5" /> Solicitar Presupuesto
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className={cn("relative flex-1 overflow-hidden bg-[#FAFAFA]", cursorClass)}>
          <Stage
            ref={stageRef}
            width={containerSize.width}
            height={containerSize.height}
            scaleX={zoom}
            scaleY={zoom}
            x={stagePos.x}
            y={stagePos.y}
            draggable={tool === "pan"}
            onDragEnd={(e) => setStagePos({ x: e.target.x(), y: e.target.y() })}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => { handleMouseUp(); setHoverCell(null); }}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onWheel={handleWheel}
          >
            <Layer>
              {/* Grid background */}
              <Rect x={0} y={0} width={gridCols * cellSize} height={gridRows * cellSize}
                fill="#FFFFFF" stroke="#D1D5DB" strokeWidth={2} shadowBlur={8} shadowColor="rgba(0,0,0,0.08)" shadowOffsetY={2} />

              {/* Grid lines */}
              {Array.from({ length: gridCols + 1 }, (_, i) => (
                <Rect key={`v-${i}`} x={i * cellSize} y={0} width={1} height={gridRows * cellSize}
                  fill={i % 5 === 0 ? "#9CA3AF" : "#E5E7EB"} />
              ))}
              {Array.from({ length: gridRows + 1 }, (_, i) => (
                <Rect key={`h-${i}`} x={0} y={i * cellSize} width={gridCols * cellSize} height={1}
                  fill={i % 5 === 0 ? "#9CA3AF" : "#E5E7EB"} />
              ))}

              {/* Filled cells */}
              {Array.from(cells.values()).map((cell) => {
                const ft = floorTypes.find((t) => t.id === cell.typeId);
                return (
                  <Rect key={cellKey(cell.x, cell.y)}
                    x={cell.x * cellSize + 1} y={cell.y * cellSize + 1}
                    width={cellSize - 2} height={cellSize - 2}
                    fill={ft?.color ?? "#888"} opacity={0.85} cornerRadius={2} />
                );
              })}

              {/* Hover highlight */}
              {hoverCell && tool !== "pan" && (
                <Rect
                  x={hoverCell.x * cellSize + 1} y={hoverCell.y * cellSize + 1}
                  width={cellSize - 2} height={cellSize - 2}
                  fill={tool === "erase" ? "#EF4444" : (selectedType?.color ?? "#888")}
                  opacity={0.3}
                  cornerRadius={2}
                />
              )}

              {/* Rectangle preview */}
              {rectPreview && selectedType && (
                <Rect
                  x={rectPreview.x * cellSize} y={rectPreview.y * cellSize}
                  width={rectPreview.w * cellSize} height={rectPreview.h * cellSize}
                  fill={selectedType.color} opacity={0.3}
                  stroke={selectedType.color} strokeWidth={2} dash={[6, 3]}
                />
              )}

              {/* Axis labels */}
              {Array.from({ length: gridCols + 1 }, (_, i) =>
                i % 5 === 0 ? (
                  <KonvaText key={`lx-${i}`} x={i * cellSize - 8} y={-18}
                    text={`${i}`} fontSize={10} fill="#9CA3AF" align="center" width={16} />
                ) : null,
              )}
              {Array.from({ length: gridRows + 1 }, (_, i) =>
                i % 5 === 0 ? (
                  <KonvaText key={`ly-${i}`} x={-24} y={i * cellSize - 5}
                    text={`${i}`} fontSize={10} fill="#9CA3AF" />
                ) : null,
              )}

              {/* Dimensions */}
              <Group>
                <Rect x={0} y={gridRows * cellSize + 8} width={gridCols * cellSize} height={1} fill="#6B7280" />
                <KonvaText x={0} y={gridRows * cellSize + 14} text={`${gridCols} m`}
                  fontSize={12} fill="#374151" fontStyle="bold" width={gridCols * cellSize} align="center" />
                <Rect x={gridCols * cellSize + 8} y={0} width={1} height={gridRows * cellSize} fill="#6B7280" />
                <KonvaText x={gridCols * cellSize + 14} y={gridRows * cellSize / 2 - 6}
                  text={`${gridRows} m`} fontSize={12} fill="#374151" fontStyle="bold" />
              </Group>

              {/* Logo watermark */}
              {logoImage && (
                <Group x={gridCols * cellSize - 120} y={gridRows * cellSize + 30}>
                  <KonvaImage image={logoImage} width={110} height={33} opacity={0.5} />
                  <KonvaText x={0} y={36} text="disstands.com" fontSize={9} fill="#9CA3AF" width={110} align="center" />
                </Group>
              )}
            </Layer>
          </Stage>

          {/* Empty state overlay */}
          {cells.size === 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/80 px-10 py-8 text-center shadow-lg backdrop-blur-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red/10">
                  <Paintbrush className="h-7 w-7 text-brand-red" />
                </div>
                <h3 className="font-[var(--font-heading)] text-lg font-bold text-brand-black">
                  Empieza a diseñar tu plano
                </h3>
                <div className="space-y-1 text-sm text-brand-gray-dark">
                  <p>Elige un material del panel izquierdo y pinta sobre la cuadrícula.</p>
                  <p>Cada celda = 1 m². Usa <kbd className="rounded bg-brand-cream px-1.5 py-0.5 text-[10px] font-bold">R</kbd> para pintar rectángulos.</p>
                </div>
              </div>
            </div>
          )}

          {/* Shortcut bar */}
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm">
              Scroll = Zoom
            </span>
            <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm">
              Click + arrastra = Pintar
            </span>
            <span className="rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm">
              Ctrl+Z = Deshacer
            </span>
          </div>

          {/* Rect tool info */}
          {rectPreview && (
            <div className="absolute right-3 top-3 rounded-lg bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-sm">
              {rectPreview.w} × {rectPreview.h} m ({rectPreview.w * rectPreview.h} m²)
            </div>
          )}
        </div>
      </div>

      {/* Quote modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <button onClick={() => { setShowQuoteModal(false); setQuoteSent(false); }}
              className="absolute right-3 top-3 rounded-md p-1.5 text-brand-gray-dark hover:bg-brand-cream">
              <X className="h-4 w-4" />
            </button>

            {quoteSent ? (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 font-[var(--font-heading)] text-xl font-bold text-brand-black">Solicitud enviada</h3>
                <p className="mt-2 text-sm text-brand-gray-dark">
                  Hemos recibido tu plano y datos de contacto. Te enviaremos un presupuesto personalizado en menos de 24 horas.
                </p>
                <button onClick={() => { setShowQuoteModal(false); setQuoteSent(false); }}
                  className="mt-6 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-dark">
                  Cerrar
                </button>
              </div>
            ) : (
              <div className="px-6 py-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold text-brand-black">Solicitar presupuesto</h3>
                <p className="mt-1 text-sm text-brand-gray-dark">Te enviaremos un presupuesto detallado basado en tu plano.</p>

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

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-brand-black">Nombre *</label>
                    <input type="text" required value={quoteForm.name}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, name: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Email *</label>
                    <input type="email" required value={quoteForm.email}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Teléfono</label>
                    <input type="tel" value={quoteForm.phone}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-brand-black">Empresa</label>
                    <input type="text" value={quoteForm.company}
                      onChange={(e) => setQuoteForm((f) => ({ ...f, company: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10" />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs font-medium text-brand-black">Notas adicionales</label>
                  <textarea value={quoteForm.notes}
                    onChange={(e) => setQuoteForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={2}
                    className="mt-1 w-full rounded-lg border border-brand-gray bg-white px-3 py-2 text-sm outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                    placeholder="Evento, fecha, requisitos especiales…" />
                </div>

                <button onClick={submitQuoteRequest}
                  disabled={!quoteForm.name || !quoteForm.email || quoteSubmitting}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-50">
                  {quoteSubmitting ? "Enviando…" : <><Send className="h-4 w-4" /> Enviar solicitud de presupuesto</>}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
