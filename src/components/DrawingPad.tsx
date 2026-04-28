import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Undo2, Trash2, Pencil } from "lucide-react";

const COLORS = [
  "#1f2937", // black
  "#ef4444", // red
  "#f59e0b", // orange
  "#fde047", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#a855f7", // purple
  "#ec4899", // pink
  "#92400e", // brown
];

type Tool = "pen" | "eraser";

export function DrawingPad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(6);
  const [tool, setTool] = useState<Tool>("pen");

  // Setup canvas with white background and high-DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      // Save current image
      const ctx = canvas.getContext("2d");
      const prev = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const newCtx = canvas.getContext("2d")!;
      newCtx.scale(dpr, dpr);
      newCtx.fillStyle = "#ffffff";
      newCtx.fillRect(0, 0, rect.width, rect.height);
      newCtx.lineCap = "round";
      newCtx.lineJoin = "round";
      if (prev) {
        // best-effort restore (may stretch)
        try {
          createImageBitmap(prev).then((bmp) => newCtx.drawImage(bmp, 0, 0, rect.width, rect.height));
        } catch {
          /* ignore */
        }
      }
      historyRef.current = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const getCtx = () => canvasRef.current?.getContext("2d") ?? null;

  const pushHistory = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (historyRef.current.length > 30) historyRef.current.shift();
  };

  const getPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    pushHistory();
    drawingRef.current = true;
    const p = getPos(e);
    lastPointRef.current = p;
    // dot
    const ctx = getCtx();
    if (!ctx) return;
    ctx.beginPath();
    ctx.fillStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.arc(p.x, p.y, (tool === "eraser" ? size * 2 : size) / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const ctx = getCtx();
    const last = lastPointRef.current;
    if (!ctx || !last) return;
    const p = getPos(e);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? size * 2 : size;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastPointRef.current = p;
  };

  const onPointerUp = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
  };

  const undo = () => {
    const ctx = getCtx();
    const last = historyRef.current.pop();
    if (ctx && last) ctx.putImageData(last, 0, 0);
  };

  const clearAll = () => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    pushHistory();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-card p-3 shadow-sm border">
        <Button
          variant={tool === "pen" ? "default" : "outline"}
          size="lg"
          onClick={() => setTool("pen")}
          className="rounded-full"
        >
          <Pencil className="mr-1 h-5 w-5" /> Pen
        </Button>
        <Button
          variant={tool === "eraser" ? "default" : "outline"}
          size="lg"
          onClick={() => setTool("eraser")}
          className="rounded-full"
        >
          <Eraser className="mr-1 h-5 w-5" /> Eraser
        </Button>
        <Button variant="outline" size="lg" onClick={undo} className="rounded-full">
          <Undo2 className="mr-1 h-5 w-5" /> Undo
        </Button>
        <Button variant="outline" size="lg" onClick={clearAll} className="rounded-full">
          <Trash2 className="mr-1 h-5 w-5" /> Clear
        </Button>

        <div className="ml-2 flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTool("pen");
              }}
              aria-label={`Color ${c}`}
              className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c && tool === "pen" ? "ring-2 ring-offset-2 ring-foreground scale-110" : "border-white"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="ml-2 flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Size</span>
          <input
            type="range"
            min={2}
            max={24}
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-24 accent-primary"
          />
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden rounded-3xl border-4 border-dashed border-primary/30 bg-white shadow-inner"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none cursor-crosshair"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>
    </div>
  );
}
