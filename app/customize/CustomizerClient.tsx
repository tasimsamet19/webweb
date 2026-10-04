"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Type, Trash2, RotateCcw, ChevronUp, ChevronDown, ArrowLeft, X } from "lucide-react";
import Link from "next/link";
import { DesignCanvas, type DesignCanvasHandle } from "@/components/customize/DesignCanvas";
import { PrintColorPicker } from "@/components/customize/PrintColorPicker";
import { QuoteForm } from "@/components/products/QuoteForm";
import {
  CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
  getProductsByCategory,
  MOCKUP_TO_PRICE_TYPE,
  DECORATION_LABELS,
  type CatalogProduct,
  type ProductColor,
  type MockupType,
  type DecorationMethod,
} from "@/lib/customize-catalog";
import {
  calculatePrice,
  PRINT_COLORS,
  MIN_QTY,
  type PrintLocation,
  type PrintColor,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

// ─── Placement zones ──────────────────────────────────────────────────────────

type PlacementZone = {
  id: string;
  label: string;
  side: "front" | "back";
  unavailableFor?: MockupType[];
  coords: Record<MockupType, { x: number; y: number; w: number; h: number }>;
};

const PLACEMENT_ZONES: PlacementZone[] = [
  {
    id: "left-chest", label: "Left Chest", side: "front",
    coords: {
      tee:      { x: 108, y: 142, w: 90, h: 75 },
      crewneck: { x: 108, y: 145, w: 90, h: 75 },
      tank:     { x: 115, y: 142, w: 75, h: 70 },
      hoodie:   { x: 108, y: 196, w: 90, h: 70 },
      polo:     { x: 108, y: 158, w: 88, h: 68 },
    },
  },
  {
    id: "right-chest", label: "Right Chest", side: "front",
    coords: {
      tee:      { x: 202, y: 142, w: 90, h: 75 },
      crewneck: { x: 202, y: 145, w: 90, h: 75 },
      tank:     { x: 210, y: 142, w: 75, h: 70 },
      hoodie:   { x: 202, y: 196, w: 90, h: 70 },
      polo:     { x: 204, y: 158, w: 88, h: 68 },
    },
  },
  {
    id: "full-front", label: "Full Front", side: "front",
    coords: {
      tee:      { x: 108, y: 142, w: 184, h: 210 },
      crewneck: { x: 108, y: 145, w: 184, h: 210 },
      tank:     { x: 115, y: 142, w: 170, h: 200 },
      hoodie:   { x: 108, y: 196, w: 184, h: 185 },
      polo:     { x: 108, y: 158, w: 184, h: 200 },
    },
  },
  {
    id: "left-sleeve", label: "Left Sleeve", side: "front",
    unavailableFor: ["tank"],
    coords: {
      tee:      { x: 2,   y: 100, w: 60, h: 85 },
      crewneck: { x: 2,   y: 100, w: 60, h: 85 },
      tank:     { x: 2,   y: 100, w: 60, h: 85 },
      hoodie:   { x: 2,   y: 138, w: 60, h: 95 },
      polo:     { x: 2,   y: 105, w: 60, h: 80 },
    },
  },
  {
    id: "right-sleeve", label: "Right Sleeve", side: "front",
    unavailableFor: ["tank"],
    coords: {
      tee:      { x: 338, y: 100, w: 60, h: 85 },
      crewneck: { x: 338, y: 100, w: 60, h: 85 },
      tank:     { x: 338, y: 100, w: 60, h: 85 },
      hoodie:   { x: 338, y: 138, w: 60, h: 95 },
      polo:     { x: 338, y: 105, w: 60, h: 80 },
    },
  },
  {
    id: "upper-back", label: "Upper Back", side: "back",
    coords: {
      tee:      { x: 125, y: 140, w: 150, h: 80 },
      crewneck: { x: 125, y: 140, w: 150, h: 80 },
      tank:     { x: 125, y: 140, w: 150, h: 75 },
      hoodie:   { x: 125, y: 192, w: 150, h: 80 },
      polo:     { x: 125, y: 140, w: 150, h: 80 },
    },
  },
  {
    id: "full-back", label: "Full Back", side: "back",
    coords: {
      tee:      { x: 108, y: 135, w: 184, h: 210 },
      crewneck: { x: 108, y: 135, w: 184, h: 210 },
      tank:     { x: 115, y: 135, w: 170, h: 200 },
      hoodie:   { x: 108, y: 190, w: 184, h: 185 },
      polo:     { x: 108, y: 135, w: 184, h: 210 },
    },
  },
];

// ─── Mockup constants ─────────────────────────────────────────────────────────

const MOCKUP_W = 400;

const PATHS: Record<MockupType, Record<"front" | "back", string>> = {
  tee: {
    front: "M 185,42 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 315,42 C 295,68 205,68 185,42 Z",
    back:  "M 192,32 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 308,32 C 295,40 205,40 192,32 Z",
  },
  crewneck: {
    front: "M 175,50 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 325,50 C 305,80 195,80 175,50 Z",
    back:  "M 192,32 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 308,32 C 295,40 205,40 192,32 Z",
  },
  tank: {
    front: "M 185,42 L 165,36 L 148,36 L 130,65 L 128,168 L 72,168 L 72,568 L 428,568 L 428,168 L 372,168 L 370,65 L 352,36 L 335,36 L 315,42 C 295,68 205,68 185,42 Z",
    back:  "M 192,34 L 165,30 L 148,30 L 130,58 L 128,168 L 72,168 L 72,568 L 428,568 L 428,168 L 372,168 L 370,58 L 352,30 L 335,30 L 308,34 C 295,42 205,42 192,34 Z",
  },
  hoodie: {
    front: "M 185,120 L 128,106 L 5,210 L 0,275 L 5,295 L 58,272 L 72,248 L 72,640 L 428,640 L 428,248 L 442,272 L 495,295 L 500,275 L 495,210 L 372,106 L 315,120 C 295,148 205,148 185,120 Z",
    back:  "M 192,108 L 128,106 L 5,210 L 0,275 L 5,295 L 58,272 L 72,248 L 72,640 L 428,640 L 428,248 L 442,272 L 495,295 L 500,275 L 495,210 L 372,106 L 308,108 C 295,118 205,118 192,108 Z",
  },
  polo: {
    front: "M 175,50 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 325,50 C 305,80 195,80 175,50 Z",
    back:  "M 192,32 L 128,28 L 5,130 L 0,195 L 5,215 L 58,192 L 72,168 L 72,568 L 428,568 L 428,168 L 442,192 L 495,215 L 500,195 L 495,130 L 372,28 L 308,32 C 295,40 205,40 192,32 Z",
  },
};

const HOOD_PATH_FRONT = "M 155,122 C 155,30 345,30 345,122";
const HOOD_PATH_BACK  = "M 140,108 C 140,18 360,18 360,108";

const PRODUCT_DIMS: Record<MockupType, [number, number, number]> = {
  tee:      [500, 600, 480],
  tank:     [500, 600, 480],
  crewneck: [500, 600, 480],
  hoodie:   [500, 650, 520],
  polo:     [500, 600, 480],
};

// ─── SVG Mockup ───────────────────────────────────────────────────────────────

function MockupSVG({
  product, view, hex, border, id,
}: {
  product: MockupType; view: "front" | "back"; hex: string; border: boolean; id: string;
}) {
  const [vw, vh] = PRODUCT_DIMS[product];
  const containerH = PRODUCT_DIMS[product][2];
  const scaledH = (MOCKUP_W / vw) * vh;
  const yOffset = Math.max(0, (containerH - scaledH) / 2);
  const path = PATHS[product][view];
  const strokeColor = border ? "#b0b3b0" : "rgba(0,0,0,0.10)";
  const strokeW = border ? 1.5 : 1;

  const isHoodie = product === "hoodie";
  const seamY    = isHoodie ? 276 : 196;
  const pocketY  = isHoodie ? 410 : 0;

  return (
    <svg
      viewBox={`0 0 ${vw} ${vh}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", top: yOffset, left: 0, width: MOCKUP_W, height: scaledH, overflow: "visible" }}
    >
      <defs>
        <filter id={`sh-${id}`} x="-25%" y="-10%" width="150%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="22" floodColor="rgba(0,0,0,0.22)" />
        </filter>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#000" stopOpacity="0.14" />
          <stop offset="18%"  stopColor="#000" stopOpacity="0.02" />
          <stop offset="50%"  stopColor="#fff" stopOpacity="0.07" />
          <stop offset="82%"  stopColor="#000" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id={`vg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#fff" stopOpacity="0.11" />
          <stop offset="28%"  stopColor="#000" stopOpacity="0.00" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.16" />
        </linearGradient>
        <clipPath id={`cp-${id}`}>
          <path d={path} />
        </clipPath>
      </defs>

      {product === "hoodie" && (
        <>
          <path
            d={view === "front" ? HOOD_PATH_FRONT : HOOD_PATH_BACK}
            fill="none" stroke={hex} strokeWidth="68" strokeLinecap="round"
          />
          <path
            d={view === "front" ? HOOD_PATH_FRONT : HOOD_PATH_BACK}
            fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeLinecap="round"
          />
          {view === "front" && (
            <>
              <line x1="228" y1="124" x2="216" y2="208" stroke="rgba(0,0,0,0.14)" strokeWidth="5" strokeLinecap="round" />
              <line x1="272" y1="124" x2="284" y2="208" stroke="rgba(0,0,0,0.14)" strokeWidth="5" strokeLinecap="round" />
            </>
          )}
        </>
      )}

      <path d={path} fill={hex} stroke={strokeColor} strokeWidth={strokeW} filter={`url(#sh-${id})`} />

      <g clipPath={`url(#cp-${id})`}>
        <rect x="0" y="0" width={vw} height={vh} fill={`url(#sg-${id})`} />
        <rect x="0" y="0" width={vw} height={vh} fill={`url(#vg-${id})`} />

        {product !== "tank" && (
          <>
            <path
              d={isHoodie ? "M 60,278 C 66,286 67,298 73,308" : "M 60,198 C 66,206 67,216 73,226"}
              stroke="rgba(0,0,0,0.18)" strokeWidth="10" fill="none" strokeLinecap="round"
            />
            <path
              d={isHoodie ? "M 440,278 C 434,286 433,298 427,308" : "M 440,198 C 434,206 433,216 427,226"}
              stroke="rgba(0,0,0,0.18)" strokeWidth="10" fill="none" strokeLinecap="round"
            />
            <line x1="72"  y1={isHoodie ? 260 : 180} x2="72"  y2={isHoodie ? 640 : 568} stroke="rgba(0,0,0,0.08)" strokeWidth="3" />
            <line x1="428" y1={isHoodie ? 260 : 180} x2="428" y2={isHoodie ? 640 : 568} stroke="rgba(0,0,0,0.08)" strokeWidth="3" />
          </>
        )}

        {view === "front" && product !== "tank" && (
          <>
            <line x1="128" y1="28" x2="185" y2={product === "hoodie" ? 120 : 42} stroke="rgba(0,0,0,0.07)" strokeWidth="3" />
            <line x1="372" y1="28" x2="315" y2={product === "hoodie" ? 120 : 42} stroke="rgba(0,0,0,0.07)" strokeWidth="3" />
          </>
        )}

        <line x1="72" y1={isHoodie ? 634 : 562} x2="428" y2={isHoodie ? 634 : 562} stroke="rgba(0,0,0,0.08)" strokeWidth="3" />

        {view === "front" && product !== "tank" && (
          <rect x="238" y={isHoodie ? 155 : 72} width="24" height="16" rx="2" fill="rgba(0,0,0,0.06)" />
        )}
      </g>

      {view === "front" && product === "crewneck" && (
        <ellipse cx="250" cy="56" rx="80" ry="26" fill={hex} stroke="rgba(0,0,0,0.20)" strokeWidth="2.5" />
      )}

      {view === "front" && product === "tee" && (
        <ellipse cx="250" cy="54" rx="68" ry="20" fill={hex} stroke="rgba(0,0,0,0.14)" strokeWidth="2" />
      )}

      {product === "polo" && view === "front" && (
        <>
          <ellipse cx="250" cy="56" rx="84" ry="28" fill={hex} stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" />
          <path d="M 195,60 L 240,65 L 226,112 Z" fill={hex} stroke="rgba(0,0,0,0.11)" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M 305,60 L 260,65 L 274,112 Z" fill={hex} stroke="rgba(0,0,0,0.11)" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="230" y="58" width="40" height="100" rx="4" fill={hex} stroke="rgba(0,0,0,0.13)" strokeWidth="1.5" />
          <line x1="234" y1="66"  x2="266" y2="66"  stroke="rgba(0,0,0,0.09)" strokeWidth="1.5" />
          <line x1="234" y1="155" x2="266" y2="155" stroke="rgba(0,0,0,0.09)" strokeWidth="1.5" />
          <circle cx="250" cy="78"  r="5.5" fill="rgba(0,0,0,0.15)" />
          <circle cx="250" cy="100" r="5.5" fill="rgba(0,0,0,0.15)" />
          <circle cx="250" cy="122" r="5.5" fill="rgba(0,0,0,0.15)" />
          <circle cx="248" cy="76"  r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="248" cy="98"  r="2" fill="rgba(255,255,255,0.3)" />
          <circle cx="248" cy="120" r="2" fill="rgba(255,255,255,0.3)" />
        </>
      )}

      {product === "tank" && (
        <>
          <rect x="148" y={view === "front" ? 36 : 30} width="17" height={view === "front" ? 132 : 138} rx="4" fill={hex} stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
          <rect x="335" y={view === "front" ? 36 : 30} width="17" height={view === "front" ? 132 : 138} rx="4" fill={hex} stroke="rgba(0,0,0,0.14)" strokeWidth="1.5" />
        </>
      )}

      {product === "hoodie" && pocketY > 0 && (
        <>
          <rect x="178" y={pocketY} width="144" height="90" rx="8" fill={hex} stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
          <line x1="250" y1={pocketY} x2="250" y2={pocketY + 90} stroke="rgba(0,0,0,0.08)" strokeWidth="2" />
        </>
      )}

      {view === "back" && (
        <text x="250" y={isHoodie ? 145 : 95} textAnchor="middle" fontSize="14" fill="rgba(0,0,0,0.08)" fontFamily="Arial" letterSpacing="8">
          BACK
        </text>
      )}

      {/* suppress unused var warning */}
      {seamY > 0 && null}
    </svg>
  );
}

// ─── Placement icon ───────────────────────────────────────────────────────────

function PlacementIcon({ zone, isSelected }: {
  zone: PlacementZone; product: MockupType; isSelected: boolean;
}) {
  return (
    <div className={cn(
      "w-14 h-8 rounded-lg flex items-center justify-center transition-all",
      isSelected ? "bg-[#E84520]/10" : "bg-gray-100",
    )}>
      <span className={cn(
        "text-[9px] font-bold uppercase tracking-wide text-center leading-tight px-1",
        isSelected ? "text-[#E84520]" : "text-gray-500",
      )}>
        {zone.label}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const DEFAULT_PRODUCT = CATALOG_PRODUCTS[0];

export function CustomizerClient() {
  const [category,        setCategory]        = useState<string>(CATALOG_CATEGORIES[0]);
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct>(DEFAULT_PRODUCT);
  const [selectedColor,   setSelectedColor]   = useState<ProductColor>(DEFAULT_PRODUCT.colors[0]);
  const [decoration,      setDecoration]      = useState<DecorationMethod>("screen-print");
  const [view,            setView]            = useState<"front" | "back">("front");
  const [activeZone,      setActiveZoneState] = useState<PlacementZone>(PLACEMENT_ZONES[0]);
  const [zoneWarning,     setZoneWarning]     = useState<PlacementZone | null>(null);
  const [printColors,     setPrintColors]     = useState<PrintColor[]>([PRINT_COLORS[0]]);
  const [quantity,        setQuantity]        = useState(24);
  const [quoteOpen,       setQuoteOpen]       = useState(false);
  const [addingText,      setAddingText]      = useState(false);
  const [textInput,       setTextInput]       = useState("");
  const [textColor,       setTextColor]       = useState("#000000");
  const [hasContent,      setHasContent]      = useState(false);
  const [studioOpen,      setStudioOpen]      = useState(false);

  const canvasRef = useRef<DesignCanvasHandle>(null);
  const fileRef   = useRef<HTMLInputElement>(null);

  const mockupType      = selectedProduct.mockupType;
  const containerH      = PRODUCT_DIMS[mockupType][2];
  const zone            = activeZone.coords[mockupType];
  const location: PrintLocation = activeZone.side === "back" ? "back" : "front";
  const priceType       = MOCKUP_TO_PRICE_TYPE[mockupType];
  const price           = calculatePrice(quantity, printColors.length || 1, priceType, location);
  const categoryProducts = getProductsByCategory(category);

  const handleSetCategory = (cat: string) => {
    setCategory(cat);
    const products = getProductsByCategory(cat);
    if (products.length > 0) handleSetProduct(products[0]);
  };

  const handleSetProduct = (p: CatalogProduct) => {
    setSelectedProduct(p);
    const match = p.colors.find((c) => c.name === selectedColor.name);
    setSelectedColor(match ?? p.colors[0]);
    if (activeZone.unavailableFor?.includes(p.mockupType)) {
      setActiveZoneState(PLACEMENT_ZONES[0]);
    }
  };

  const handleSetZone = (newZone: PlacementZone) => {
    if (newZone.id === activeZone.id) return;
    if (hasContent) { setZoneWarning(newZone); return; }
    setActiveZoneState(newZone);
    if (newZone.side !== activeZone.side) setView(newZone.side);
  };

  const confirmZoneSwitch = () => {
    if (!zoneWarning) return;
    canvasRef.current?.clear();
    setHasContent(false);
    if (zoneWarning.side !== activeZone.side) setView(zoneWarning.side);
    setActiveZoneState(zoneWarning);
    setZoneWarning(null);
  };

  const handleUploadImage = useCallback(() => fileRef.current?.click(), []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await canvasRef.current?.addImage(file);
    setHasContent(true);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const handleAddText = () => {
    const text = textInput.trim();
    if (!text) return;
    canvasRef.current?.addText(text, textColor);
    setHasContent(true);
    setTextInput("");
    setAddingText(false);
  };

  const openStudio = () => {
    setView(activeZone.side);
    setStudioOpen(true);
  };

  const closeStudio = () => {
    setStudioOpen(false);
    setAddingText(false);
    setTextInput("");
  };

  const quoteCategory = category === "T-Shirts" || category === "Tank Tops" ? "tee-shirts" : "sweatshirts";

  return (
    <>
      {/* ── Main page ── */}
      <div className="min-h-screen bg-white text-gray-900 flex flex-col">

        {/* Navbar */}
        <div className="h-16 bg-[#0E0E0E] flex-shrink-0 flex items-center justify-between px-5">
          <Link href="/products" className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </Link>
          <p className="text-white/30 text-xs uppercase tracking-widest hidden md:block">Design Studio</p>
          <button
            onClick={() => setQuoteOpen(true)}
            className="h-8 px-5 rounded-full bg-[#E84520] hover:bg-[#FF6040] text-white text-sm font-bold transition-colors"
          >
            Get Quote
          </button>
        </div>

        {/* Two-column body */}
        <div className="flex flex-1 overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>

          {/* LEFT: Garment preview — no canvas, zone is a button */}
          <div className="flex-1 bg-white flex flex-col items-center justify-center py-8 overflow-hidden select-none">

            {/* Front / Back toggle */}
            <div className="flex gap-1 mb-6">
              {(["front", "back"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all",
                    view === v
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700",
                  )}
                >
                  {v === "front" ? "Front" : "Back"}
                </button>
              ))}
            </div>

            {/* Garment container */}
            <div className="relative" style={{ width: MOCKUP_W, height: containerH }}>
              <MockupSVG product={mockupType} view={view} hex={selectedColor.hex} border={!!selectedColor.needsBorder} id="main" />

              {/* Clickable design zone */}
              {view === activeZone.side && (
                <button
                  onClick={openStudio}
                  className="absolute"
                  style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}
                >
                  <div className={cn(
                    "absolute inset-0 rounded-sm flex items-center justify-center transition-all",
                    hasContent
                      ? "border-2 border-[#E84520]/50 bg-[#E84520]/5 hover:bg-[#E84520]/10"
                      : "border-2 border-dashed border-[#E84520]/50 hover:border-[#E84520] hover:bg-[#E84520]/5",
                  )}>
                    <span className="text-[#E84520] text-[9px] font-bold uppercase tracking-widest bg-white/90 px-2 py-0.5 rounded shadow-sm">
                      {hasContent ? "✏ Edit Design" : "+ Add Design"}
                    </span>
                  </div>
                </button>
              )}
            </div>

            <p className="mt-5 text-gray-400 text-xs text-center">
              {hasContent
                ? `Design added · ${activeZone.label}`
                : "Click the highlighted zone to open the design editor"}
            </p>
          </div>

          {/* RIGHT: Controls panel */}
          <div className="w-[320px] bg-gray-50 border-l border-gray-200 flex flex-col overflow-y-auto flex-shrink-0">

            {/* Category */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>Category</PanelLabel>
              <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide flex-nowrap">
                {CATALOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleSetCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap border transition-all flex-shrink-0",
                      category === cat
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-200 text-gray-500 hover:border-gray-400",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product picker */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>Product</PanelLabel>
              <div className="space-y-1.5">
                {categoryProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSetProduct(p)}
                    className={cn(
                      "w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all",
                      selectedProduct.id === p.id
                        ? "border-[#E84520] bg-orange-50"
                        : "border-gray-200 bg-white hover:border-gray-300",
                    )}
                  >
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "block text-[11px] font-bold uppercase tracking-wide",
                        selectedProduct.id === p.id ? "text-[#E84520]" : "text-gray-700",
                      )}>
                        {p.brand}
                      </span>
                      <span className="block text-[12px] text-gray-600 leading-tight">{p.name}</span>
                      <span className="block text-[10px] text-gray-400 font-mono mt-0.5">{p.sku}</span>
                    </div>
                    {selectedProduct.id === p.id && (
                      <div className="w-2 h-2 rounded-full bg-[#E84520] mt-1 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Garment color */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>
                Color{" "}
                <span className="font-normal text-gray-400 tracking-normal normal-case">{selectedColor.name}</span>
              </PanelLabel>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={cn(
                      "w-6 h-6 rounded-full transition-all",
                      selectedColor.name === c.name
                        ? "ring-2 ring-[#E84520] ring-offset-1 ring-offset-white scale-110"
                        : "hover:scale-110",
                      c.needsBorder && "ring-1 ring-gray-300",
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Decoration method */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>Decoration Method</PanelLabel>
              <div className="flex gap-2">
                {(["screen-print", "embroidery"] as DecorationMethod[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDecoration(d)}
                    className={cn(
                      "flex-1 py-2 rounded-xl border text-[11px] font-bold uppercase tracking-wide transition-all",
                      decoration === d
                        ? "border-[#E84520] bg-orange-50 text-[#E84520]"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
                    )}
                  >
                    {DECORATION_LABELS[d]}
                  </button>
                ))}
              </div>
            </div>

            {/* Placement selector */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>Print Location</PanelLabel>

              {zoneWarning && (
                <div className="mb-3 bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <p className="text-orange-800 text-xs mb-2 leading-snug">
                    Switching placement will clear your current design.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={confirmZoneSwitch}
                      className="flex-1 text-xs bg-[#E84520] hover:bg-[#FF6040] text-white rounded-lg py-1.5 font-medium transition-colors"
                    >
                      Switch &amp; Clear
                    </button>
                    <button
                      onClick={() => setZoneWarning(null)}
                      className="flex-1 text-xs border border-gray-300 rounded-lg py-1.5 text-gray-600 hover:border-gray-400 transition-colors"
                    >
                      Keep Design
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2">
                {PLACEMENT_ZONES.map((z) => {
                  const unavailable = z.unavailableFor?.includes(mockupType) ?? false;
                  const isSelected = activeZone.id === z.id;
                  return (
                    <button
                      key={z.id}
                      disabled={unavailable}
                      onClick={() => handleSetZone(z)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all",
                        isSelected
                          ? "bg-orange-50 ring-2 ring-[#E84520]"
                          : "bg-gray-50 ring-1 ring-gray-200 hover:ring-gray-400",
                        unavailable && "opacity-30 cursor-not-allowed",
                      )}
                    >
                      <PlacementIcon zone={z} product={mockupType} isSelected={isSelected} />
                      <span className={cn(
                        "text-[7px] font-bold uppercase tracking-wide leading-tight text-center",
                        isSelected ? "text-[#E84520]" : "text-gray-500",
                      )}>
                        {z.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ink colors or embroidery note */}
            {decoration === "screen-print" ? (
              <div className="p-4 border-b border-gray-200">
                <PanelLabel>Ink / Print Colors</PanelLabel>
                <PrintColorPicker selected={printColors} onChange={setPrintColors} max={6} />
              </div>
            ) : (
              <div className="p-4 border-b border-gray-200">
                <PanelLabel>Embroidery</PanelLabel>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-3">
                  <p className="text-orange-800 text-xs leading-relaxed">
                    Embroidery pricing is based on stitch count. Our team will review your design and provide an exact quote.
                  </p>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="p-4 border-b border-gray-200">
              <PanelLabel>
                Quantity{" "}
                <span className="font-normal text-gray-400 tracking-normal normal-case">(min {MIN_QTY})</span>
              </PanelLabel>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity((q) => Math.max(MIN_QTY, q - 12))}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center transition-all"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min={MIN_QTY}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(MIN_QTY, parseInt(e.target.value) || MIN_QTY))}
                  className="flex-1 h-9 rounded-lg bg-white border border-gray-200 text-gray-900 text-center font-bold focus:outline-none focus:border-[#E84520]/50 transition-colors"
                />
                <button
                  onClick={() => setQuantity((q) => q + 12)}
                  className="w-9 h-9 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-400 flex items-center justify-center transition-all"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pricing */}
            <div className="p-4 border-b border-gray-200">
              {decoration === "embroidery" ? (
                <div className="rounded-xl bg-white border border-gray-200 p-4">
                  <p className="text-gray-500 text-sm mb-1">Embroidery pricing</p>
                  <p className="text-gray-900 font-bold text-sm">Contact us for a quote</p>
                  <p className="mt-2 text-gray-400 text-[10px] leading-relaxed">
                    Price varies by stitch count and design complexity. Fast turnaround guaranteed.
                  </p>
                </div>
              ) : price ? (
                <div className="rounded-xl bg-white border border-gray-200 p-4">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-500">Per piece</span>
                    <span className="text-gray-900 font-bold">${price.perPiece.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-500">{printColors.length} ink color{printColors.length !== 1 ? "s" : ""}</span>
                    <span className="text-gray-400">{price.breakdown}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-2.5 mt-1.5">
                    <span className="text-gray-500 text-sm">Est. total</span>
                    <span className="text-xl font-black text-[#E84520]">${price.total.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-gray-400 text-[10px] leading-relaxed">
                    Estimate only — includes garment + print. Final quote confirms exact price.
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Minimum order: {MIN_QTY} pieces</p>
              )}
            </div>

            {/* Quote CTA */}
            <div className="p-4">
              <button
                onClick={() => setQuoteOpen(true)}
                className="w-full h-11 rounded-xl bg-[#E84520] hover:bg-[#FF6040] text-white font-bold text-sm transition-colors"
              >
                Request Official Quote
              </button>
              <p className="mt-2 text-center text-gray-400 text-[10px]">
                {selectedProduct.brand} {selectedProduct.name} · {selectedColor.name} · {activeZone.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Studio overlay ── */}
      {studioOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">

          {/* Header */}
          <div className="h-14 bg-[#0E0E0E] flex-shrink-0 flex items-center justify-between px-5">
            <button
              onClick={closeStudio}
              className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
            <p className="text-white/40 text-xs hidden md:block truncate mx-4">
              {selectedProduct.brand} {selectedProduct.name} · {selectedColor.name} · {activeZone.label}
            </p>
            <button
              onClick={() => { closeStudio(); setQuoteOpen(true); }}
              className="h-8 px-5 rounded-full bg-[#E84520] hover:bg-[#FF6040] text-white text-sm font-bold transition-colors flex-shrink-0"
            >
              Get Quote
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">

            {/* LEFT: Garment + Canvas */}
            <div className="flex-1 bg-[#f5f5f5] flex flex-col items-center justify-center py-8 overflow-hidden select-none">

              {/* Front/Back toggle */}
              <div className="flex gap-1 mb-6">
                {(["front", "back"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={cn(
                      "px-5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all",
                      view === v
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-white border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-700",
                    )}
                  >
                    {v === "front" ? "Front" : "Back"}
                  </button>
                ))}
              </div>

              {/* Garment + canvas */}
              <div className="relative" style={{ width: MOCKUP_W, height: containerH }}>
                <MockupSVG product={mockupType} view={view} hex={selectedColor.hex} border={!!selectedColor.needsBorder} id="studio" />

                {view === activeZone.side && (
                  <div className="absolute" style={{ left: zone.x, top: zone.y, width: zone.w, height: zone.h }}>
                    {!hasContent && (
                      <div className="absolute inset-0 border-2 border-dashed border-[#E84520]/60 rounded-sm pointer-events-none z-10 flex items-center justify-center">
                        <span className="text-[#E84520]/70 text-[8px] uppercase tracking-[0.2em] font-bold bg-white/80 px-1.5 py-0.5 rounded">
                          {activeZone.label}
                        </span>
                      </div>
                    )}
                    <DesignCanvas key={activeZone.id} ref={canvasRef} width={zone.w} height={zone.h} />
                  </div>
                )}
              </div>

              <p className="mt-5 text-gray-400 text-xs">
                Click to select · Drag to move · Delete key removes
              </p>

              {hasContent && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => canvasRef.current?.deleteSelected()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:text-red-500 text-xs transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                  <button
                    onClick={() => { canvasRef.current?.clear(); setHasContent(false); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-red-300 hover:text-red-500 text-xs transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT: Design tools */}
            <div className="w-[260px] bg-white border-l border-gray-200 flex flex-col overflow-y-auto flex-shrink-0">

              {/* Upload */}
              <div className="p-4 border-b border-gray-200">
                <PanelLabel>Upload Artwork</PanelLabel>
                <button
                  onClick={handleUploadImage}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 bg-white hover:border-[#E84520]/50 hover:bg-orange-50 transition-all text-left group"
                >
                  <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#E84520] transition-colors flex-shrink-0" />
                  <span>
                    <span className="block text-gray-700 text-sm font-medium group-hover:text-gray-900">Upload Artwork</span>
                    <span className="block text-gray-400 text-xs">PNG, JPG, SVG, PDF · max 25MB</span>
                  </span>
                </button>
              </div>

              {/* Add Text */}
              <div className="p-4 border-b border-gray-200">
                <PanelLabel>Add Text</PanelLabel>
                <button
                  onClick={() => setAddingText((v) => !v)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left group",
                    addingText ? "border-[#E84520]/40 bg-orange-50" : "border-gray-200 bg-white hover:border-gray-300",
                  )}
                >
                  <Type className={cn(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    addingText ? "text-[#E84520]" : "text-gray-400 group-hover:text-gray-600",
                  )} />
                  <span className={cn("text-sm font-medium", addingText ? "text-[#E84520]" : "text-gray-700")}>
                    Add Text
                  </span>
                </button>

                {addingText && (
                  <div className="mt-2 bg-white border border-gray-200 rounded-xl p-3 space-y-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddText()}
                      placeholder="Your text here..."
                      autoFocus
                      className="w-full h-9 px-3 rounded-lg border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E84520]/60 placeholder:text-gray-400"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs flex-shrink-0">Color</span>
                      <div className="flex gap-1.5 flex-1 flex-wrap">
                        {["#000000", "#ffffff", "#E84520", "#1d4ed8", "#15803d"].map((hexColor) => (
                          <button
                            key={hexColor}
                            onClick={() => setTextColor(hexColor)}
                            className={cn(
                              "w-6 h-6 rounded-full transition-all flex-shrink-0",
                              textColor === hexColor ? "ring-2 ring-[#E84520] ring-offset-1 ring-offset-white scale-110" : "hover:scale-110",
                              hexColor === "#ffffff" && "ring-1 ring-gray-300",
                            )}
                            style={{ backgroundColor: hexColor }}
                          />
                        ))}
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-6 h-6 rounded-full cursor-pointer border-0 bg-transparent p-0"
                          title="Custom color"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAddingText(false)}
                        className="flex-1 h-8 rounded-lg border border-gray-200 text-gray-500 text-sm hover:border-gray-300 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddText}
                        className="flex-1 h-8 rounded-lg bg-[#E84520] hover:bg-[#FF6040] text-white text-sm font-bold transition-colors"
                      >
                        Add to Design
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tip */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Upload your logo or artwork file. Use the handles to resize and drag to position it on the garment.
                </p>
              </div>

              {/* Done button */}
              <div className="mt-auto p-4">
                <button
                  onClick={closeStudio}
                  className="w-full h-11 rounded-xl bg-gray-900 hover:bg-[#E84520] text-white font-bold text-sm transition-colors"
                >
                  Done — Save Design
                </button>
                <p className="mt-2 text-center text-gray-400 text-[10px]">
                  Design is saved automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*,.pdf,.svg" className="hidden" onChange={handleFileChange} />

      <QuoteForm
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        category={quoteCategory}
        productName={`${selectedProduct.brand} ${selectedProduct.name} (${selectedProduct.sku}) — ${selectedColor.name} — ${DECORATION_LABELS[decoration]}`}
        defaultQuantity={quantity}
        defaultColors={decoration === "screen-print" ? (printColors.length || 1) : 1}
      />
    </>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PanelLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 mb-2">{children}</p>;
}
