import { memo } from "react";
import type { Lesson } from "@/lib/lessons";

type Props = {
  lesson: Lesson;
  upToStep: number; // inclusive index — composes layers 0..upToStep
  className?: string;
};

/**
 * Renders the progressive step illustration for a lesson by composing all
 * SVG layers from step 0 up to and including `upToStep`. This guarantees
 * that the panel image only shows the drawing built so far — never the
 * full final picture.
 */
export const StepIllustration = memo(function StepIllustration({
  lesson,
  upToStep,
  className,
}: Props) {
  const html = lesson.steps
    .slice(0, upToStep + 1)
    .map((s) => s.layer)
    .join("\n");

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${lesson.shortTitle} — drawing progress`}
      // Inline content: trusted, hand-authored layers from lessons.ts
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});
