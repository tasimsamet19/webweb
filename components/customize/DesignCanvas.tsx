"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface DesignCanvasHandle {
  addImage: (file: File) => Promise<void>;
  addText: (text: string, color: string) => void;
  deleteSelected: () => void;
  clear: () => void;
}

interface Props {
  width: number;
  height: number;
}

const DesignCanvas = forwardRef<DesignCanvasHandle, Props>(({ width, height }, ref) => {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const canvasEl  = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fc = useRef<any>(null);

  useEffect(() => {
    if (!canvasEl.current) return;
    let disposed = false;
    let removeKey: (() => void) | null = null;

    import("fabric").then(({ Canvas }) => {
      if (disposed || !canvasEl.current) return;
      const canvas = new Canvas(canvasEl.current, {
        width,
        height,
        backgroundColor: "transparent",
        preserveObjectStacking: true,
        selection: true,
      });
      fc.current = canvas;

      const onKey = (e: KeyboardEvent) => {
        if (e.key !== "Delete" && e.key !== "Backspace") return;
        const obj = canvas.getActiveObject();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (obj && !(obj as any).isEditing) {
          canvas.remove(obj);
          canvas.renderAll();
        }
      };
      window.addEventListener("keydown", onKey);
      removeKey = () => window.removeEventListener("keydown", onKey);
    });

    return () => {
      disposed = true;
      removeKey?.();
      fc.current?.dispose();
      fc.current = null;
    };
  }, [width, height]);

  useImperativeHandle(ref, () => ({
    async addImage(file: File) {
      const canvas = fc.current;
      if (!canvas) return;
      const { FabricImage } = await import("fabric");
      const url = URL.createObjectURL(file);
      try {
        const img = await FabricImage.fromURL(url, { crossOrigin: "anonymous" });
        const scale = Math.min((width * 0.8) / (img.width ?? 1), (height * 0.8) / (img.height ?? 1));
        img.scale(scale);
        img.set({ left: width / 2, top: height / 2, originX: "center", originY: "center" });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      } finally {
        setTimeout(() => URL.revokeObjectURL(url), 10_000);
      }
    },

    addText(text: string, color: string) {
      const canvas = fc.current;
      if (!canvas) return;
      import("fabric").then(({ IText }) => {
        const t = new IText(text, {
          left: width / 2,
          top: height / 2,
          originX: "center",
          originY: "center",
          fontSize: Math.round(width * 0.1),
          fontFamily: "Arial",
          fontWeight: "bold",
          fill: color,
        });
        canvas.add(t);
        canvas.setActiveObject(t);
        canvas.renderAll();
      });
    },

    deleteSelected() {
      const canvas = fc.current;
      if (!canvas) return;
      const obj = canvas.getActiveObject();
      if (obj) { canvas.remove(obj); canvas.renderAll(); }
    },

    clear() {
      fc.current?.clear();
      fc.current?.renderAll();
    },
  }));

  // The outer div is React's anchor — Fabric wraps the inner canvas in its
  // own .canvas-container, so React must own a stable parent node instead
  // of the canvas element itself, otherwise removeChild throws on unmount.
  return (
    <div ref={wrapperEl} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <canvas ref={canvasEl} />
    </div>
  );
});

DesignCanvas.displayName = "DesignCanvas";
export { DesignCanvas };
