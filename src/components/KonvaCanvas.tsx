import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import Konva from "konva";
import { Stage, Layer, Line, Circle } from "react-konva";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

// Plain styled button — kept OUTSIDE the parent component so React doesn't
// unmount/remount it on every state change (which can swallow clicks).
type ToolButtonProps = {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
};

function ToolButton({ active, onClick, label, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-3 sm:px-4 h-10 sm:h-11 text-sm font-black whitespace-nowrap transition-all border-2",
        active
          ? "bg-primary text-primary-foreground border-primary galaxy-glow scale-105"
          : "bg-card/40 text-foreground border-[var(--galaxy-teal)]/20 hover:bg-card hover:border-[var(--galaxy-teal)]/40 active:scale-95",
      )}
    >
      {children}
    </button>
  );
}

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
      // Defer to next frame to avoid the "ResizeObserver loop" warning
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
        // Duplicate the start point so a single tap renders as a visible dot
        points: [pos.x, pos.y, pos.x, pos.y],
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
      const last = prev[prev.length - 1];
      
      // Optimization: Only add point if moved more than 2px
      const lastX = last.points[last.points.length - 2];
      const lastY = last.points[last.points.length - 1];
      const dx = pos.x - lastX;
      const dy = pos.y - lastY;
      if (dx * dx + dy * dy < 4) return prev;

      const next = prev.slice();
      next[next.length - 1] = { ...last, points: [...last.points, pos.x, pos.y] };
      return next;
    });
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  const handleUndo = () => setStrokes((prev) => prev.slice(0, -1));

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

  return (
    <div className="flex h-full flex-col gap-3 min-w-0">
      <header className="relative flex items-center justify-between px-4 py-3 border-b border-[var(--galaxy-teal)]/20 bg-card/40 backdrop-blur-[2px]">
        <DrawingToolbar
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          brush={brush}
          setBrush={setBrush}
          handleUndo={handleUndo}
          handleSave={handleSave}
          setConfirmClear={setConfirmClear}
        />
      </header>

      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden rounded-3xl border-2 border-[var(--galaxy-teal)]/30 bg-[#fdfaf3] galaxy-glow min-h-[300px]"
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
                stroke={s.tool === "eraser" ? "#000" : s.color}
                strokeWidth={s.tool === "eraser" ? s.size * 2.5 : s.size}
                lineCap="round"
                lineJoin="round"
                tension={0}
                perfectDrawEnabled={false}
                shadowForStrokeEnabled={false}
                hitStrokeWidth={0}
                listening={false}
                transformsEnabled="position"
                globalCompositeOperation={
                  s.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
            <Circle x={-100} y={-100} radius={1} opacity={0} />
          </Layer>
        </Stage>
      </div>

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

type DrawingToolbarProps = {
  tool: Tool;
  setTool: (t: Tool) => void;
  color: string;
  setColor: (c: string) => void;
  brush: number;
  setBrush: (b: number) => void;
  handleUndo: () => void;
  handleSave: () => void;
  setConfirmClear: (c: boolean) => void;
};

const DrawingToolbar = memo(function DrawingToolbar({
  tool,
  setTool,
  color,
  setColor,
  brush,
  setBrush,
  handleUndo,
  handleSave,
  setConfirmClear,
}: DrawingToolbarProps) {
  return (
    <div className="galaxy-card rounded-2xl p-2 sm:p-4 flex flex-wrap items-center gap-x-4 gap-y-3 min-w-0 shadow-xl border-t border-white/5">
      <div className="flex flex-wrap items-center gap-2">
        <ToolButton active={tool === "pen"} onClick={() => setTool("pen")} label="Pen">
          <Pencil className="h-4 w-4" /> <span className="hidden xs:inline">Pen</span>
        </ToolButton>
        <ToolButton active={tool === "eraser"} onClick={() => setTool("eraser")} label="Eraser">
          <Eraser className="h-4 w-4" /> <span className="hidden xs:inline">Eraser</span>
        </ToolButton>
        <div className="flex items-center gap-2">
          <ToolButton onClick={handleUndo} label="Undo">
            <Undo2 className="h-4 w-4" />
          </ToolButton>
          <ToolButton onClick={() => setConfirmClear(true)} label="Clear">
            <Trash2 className="h-4 w-4" />
          </ToolButton>
        </div>
        <ToolButton onClick={handleSave} label="Save">
          <Download className="h-4 w-4" /> <span className="hidden sm:inline">Save</span>
        </ToolButton>
      </div>

      <div className="h-8 w-px bg-[var(--galaxy-teal)]/20 mx-1 hidden lg:block" />

      <div className="flex flex-wrap items-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => {
              setColor(c.value);
              setTool("pen");
            }}
            className={cn(
              "h-7 w-7 sm:h-8 sm:w-8 rounded-full border-2 transition-all shrink-0 shadow-sm",
              color === c.value && tool === "pen"
                ? "ring-2 ring-offset-2 ring-offset-background ring-primary scale-125 border-white z-10"
                : "border-white/30 hover:scale-115 active:scale-90",
            )}
            style={{ backgroundColor: c.value }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 ml-auto sm:ml-0">
        {SIZES.map((s) => (
          <button
            key={s.value}
            type="button"
            onClick={() => setBrush(s.value)}
            className={cn(
              "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 transition-all shrink-0",
              brush === s.value
                ? "bg-primary text-primary-foreground border-primary galaxy-glow scale-105"
                : "bg-card/40 border-border hover:bg-card/60 active:scale-95",
            )}
          >
            <span
              className={cn(
                "block rounded-full bg-current",
                brush === s.value ? "bg-primary-foreground" : "bg-foreground",
              )}
              style={{ width: Math.min(s.value, 20), height: Math.min(s.value, 20) }}
            />
          </button>
        ))}
      </div>
    </div>
  );
});
