import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Sparkles, RotateCcw } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: string;
  onSave: () => void;
  onStartNew: () => void;
};

export function CelebrationModal({ open, onOpenChange, subject, onSave, onStartNew }: Props) {
  useEffect(() => {
    if (!open) return;
    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#5eead4", "#a78bfa", "#f472b6", "#facc15", "#60a5fa"];
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="galaxy-card border-[var(--galaxy-teal)]/40 max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 galaxy-glow">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="font-display text-3xl text-glow mt-3">
            Well Done! 🎉
          </DialogTitle>
          <DialogDescription className="text-base">
            You drew a beautiful {subject}! Save your masterpiece or start a new drawing.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button onClick={onSave} size="lg" className="flex-1 rounded-full galaxy-glow">
            <Download className="mr-2 h-5 w-5" /> Save Drawing
          </Button>
          <Button
            onClick={onStartNew}
            size="lg"
            variant="secondary"
            className="flex-1 rounded-full"
          >
            <RotateCcw className="mr-2 h-5 w-5" /> Start New
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
