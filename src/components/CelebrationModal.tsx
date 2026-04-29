import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Sparkles, RotateCcw, Home } from "lucide-react";

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
            You drew a beautiful {subject}! What would you like to do next?
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4 px-4">
          <Button onClick={onSave} size="lg" className="w-full rounded-full galaxy-glow h-12 font-bold">
            <Download className="mr-2 h-5 w-5" /> Save Drawing
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onStartNew}
              size="lg"
              variant="secondary"
              className="rounded-full h-12 font-bold"
            >
              <RotateCcw className="mr-2 h-5 w-5" /> Restart
            </Button>

            <Link to="/">
              <Button
                variant="outline"
                size="lg"
                className="w-full rounded-full h-12 font-bold border-primary/30 hover:bg-primary/10"
              >
                <Home className="mr-2 h-5 w-5" /> Home
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
