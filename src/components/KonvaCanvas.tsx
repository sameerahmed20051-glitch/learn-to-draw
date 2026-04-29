import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Line } from "react-konva";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Eraser, Undo2, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "Black", value: "#1a1a2e" },
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#facc15" },
  { name: "Green", value: "#22c55e" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#a855f7" },
  { name: "Pink", value: "#ec4899" },
  { name: "Brown", value: "#92400e" },
];

const SIZES = [
  { name: "Small", value: 4 },
  { name: "Medium", value: 9 },
  { name: "Large", value: 18 },
];

type Tool = "pen" | "eraser";

type Stroke = {
  id: string;
  tool: Tool;
  color: string;
  size: number;
  points: number[]; // flat [x1,y1,x2,y2,...]
};

export type KonvaCanvasHandle = {
  exportPng: () => string | null;
  clear: () => void;
};

type Props = {
  fileName?: string;
};

export const KonvaCanvas = forwardRef<KonvaCanvasHandle, Props>(function KonvaCanvas(
  { fileName = "my-drawing" },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const isDrawingRef = useRef(false);

  const [size, setSize] = useState({ width: 800, height: 600 });
  const [tool, setTool] = useState<Tool>("pen");
  const [color, setColor] = useState(COLORS[0].value);
  const [brush, setBrush] = useState(SIZES[1].value);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [confirmClear, setConfirmClear] = useState(false);

  // Track container size for the Konva Stage
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setSize({ width: Math.floor(r.width), height: Math.floor(r.height) });
      }
    };
    update();
    const ro = new ResizeObserver(() => {
      // Defer to next frame to avoid the "ResizeObserver loop completed" warning
      requestAnimationFrame(update);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useImperativeHandle(ref, () => ({
    exportPng: () => {
      const stage = stageRef.current;
      if (!stage) return null;
      return stage.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
    },
    clear: () => setStrokes([]),
  }));

  const handlePointerDown = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    isDrawingRef.current = true;
    setStrokes((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        tool,
        color,
        size: brush,
        points: [pos.x, pos.y],
      },
    ]);
  };

  const handlePointerMove = () => {
    if (!isDrawingRef.current) return;
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    setStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice();
      const last = next[next.length - 1];
      next[next.length - 1] = { ...last, points: [...last.points, pos.x, pos.y] };
      return next;
    });
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const undo = () => setStrokes((prev) => prev.slice(0, -1));

  const handleSave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const url = stage.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const ToolBtn = ({
    active,
    onClick,
    children,
    label,
  }: {
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
    label: string;
  }) => (
    <Button
      type="button"
      variant={active ? "default" : "secondary"}
      size="sm"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "rounded-full h-10 px-3 font-bold",
        active && "galaxy-glow",
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Toolbar */}
      <div className="galaxy-card rounded-2xl p-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Tools */}
        <div className="flex items-center gap-1.5">
          <ToolBtn active={tool === "pen"} onClick={() => setTool("pen")} label="Pen">
            <Pencil className="mr-1 h-4 w-4" /> Pen
          </ToolBtn>
          <ToolBtn active={tool === "eraser"} onClick={() => setTool("eraser")} label="Eraser">
            <Eraser className="mr-1 h-4 w-4" /> Eraser
          </ToolBtn>
          <ToolBtn
            active={false}
            onClick={undo}
            label="Undo"
          >
            <Undo2 className="mr-1 h-4 w-4" /> Undo
          </ToolBtn>
          <ToolBtn
            active={false}
            onClick={() => setConfirmClear(true)}
            label="Clear"
          >
            <Trash2 className="mr-1 h-4 w-4" /> Clear
          </ToolBtn>
          <ToolBtn active={false} onClick={handleSave} label="Save">
            <Download className="mr-1 h-4 w-4" /> Save
          </ToolBtn>
        </div>

        {/* Colors */}
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => {
                setColor(c.value);
                setTool("pen");
              }}
              aria-label={c.name}
              title={c.name}
              className={cn(
                "h-7 w-7 rounded-full border-2 transition-all",
                color === c.value && tool === "pen"
                  ? "ring-2 ring-offset-2 ring-offset-background ring-[var(--galaxy-teal)] scale-110"
                  : "border-white/40 hover:scale-110",
              )}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>

        {/* Brush sizes */}
        <div className="flex items-center gap-1.5">
          {SIZES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setBrush(s.value)}
              aria-label={`Brush ${s.name}`}
              title={s.name}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border transition-all",
                brush === s.value
                  ? "bg-primary/20 border-primary galaxy-glow"
                  : "bg-card/40 border-border hover:bg-card/70",
              )}
            >
              <span
                className="block rounded-full"
                style={{
                  width: Math.min(s.value, 18),
                  height: Math.min(s.value, 18),
                  backgroundColor: "var(--foreground)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden rounded-3xl border-2 border-[var(--galaxy-teal)]/30 bg-[#fdfaf3] galaxy-glow"
        style={{ touchAction: "none" }}
      >
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <Layer>
            {strokes.map((s) => (
              <Line
                key={s.id}
                points={s.points}
                stroke={s.color}
                strokeWidth={s.tool === "eraser" ? s.size * 2 : s.size}
                tension={0.4}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  s.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Clear confirmation */}
      <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
        <DialogContent className="galaxy-card border-[var(--galaxy-teal)]/30">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">Clear your drawing?</DialogTitle>
            <DialogDescription>
              This will erase everything on the canvas. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmClear(false)}>
              No, keep it
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setStrokes([]);
                setConfirmClear(false);
              }}
            >
              Yes, clear all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});
