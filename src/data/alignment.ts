export const ALIGNMENT = {
  "part1": [
    // Segment 1 (0-39): 15.5s
    ...Array.from({ length: 40 }).map((_, i) => ({ word: "", start: (i * 0.3875), end: ((i + 1) * 0.3875) })),
    // Segment 2 (40-52): 4.5s (Look at this sentence...)
    ...Array.from({ length: 13 }).map((_, i) => ({ word: "", start: 15.5 + (i * 0.346), end: 15.5 + ((i + 1) * 0.346) })),
    // Segment 3 (53-55): 3.0s (The. Dog. Ran.) - SLOW
    { word: "The.", start: 20.0, end: 21.0 },
    { word: "Dog.", start: 21.0, end: 22.0 },
    { word: "Ran.", start: 22.0, end: 23.0 },
    // Segment 4 (56-64): 4.0s (The words are right...)
    ...Array.from({ length: 9 }).map((_, i) => ({ word: "", start: 23.0 + (i * 0.44), end: 23.0 + ((i + 1) * 0.44) })),
    // Segment 5 (65-69): 2.0s (Now read it like this:)
    ...Array.from({ length: 5 }).map((_, i) => ({ word: "", start: 27.0 + (i * 0.4), end: 27.0 + ((i + 1) * 0.4) })),
    // Segment 6 (70-72): 1.5s (The dog ran.)
    { word: "The", start: 29.0, end: 29.5 },
    { word: "dog", start: 29.5, end: 30.0 },
    { word: "ran.", start: 30.0, end: 30.5 },
    // Segment 7 (73-79): 2.5s (Now it sounds more...)
    ...Array.from({ length: 7 }).map((_, i) => ({ word: "", start: 30.5 + (i * 0.35), end: 30.5 + ((i + 1) * 0.35) })),
    // Segment 8 (80-120): 13s (A Real Reader-Writer...)
    ...Array.from({ length: 41 }).map((_, i) => ({ word: "", start: 33.0 + (i * 0.317), end: 33.0 + ((i + 1) * 0.317) })),
    // Segment 9 (121-189): 20s (In Year 1...)
    ...Array.from({ length: 69 }).map((_, i) => ({ word: "", start: 46.0 + (i * 0.29), end: 46.0 + ((i + 1) * 0.29) }))
  ].map((item, idx) => ({ ...item, index: idx })),
  "part2": [
     // Segment 1 (0-6): 2.8s
    ...Array.from({ length: 7 }).map((_, i) => ({ word: "", start: (i * 0.4), end: ((i + 1) * 0.4) })),
    // Segment 2 (7-40): 14s (Each word sits...)
    ...Array.from({ length: 34 }).map((_, i) => ({ word: "", start: 2.8 + (i * 0.41), end: 2.8 + ((i + 1) * 0.41) })),
    // Segment 3 (41-48): 4s (A real reader...)
    ...Array.from({ length: 8 }).map((_, i) => ({ word: "", start: 16.8 + (i * 0.5), end: 16.8 + ((i + 1) * 0.5) })),
    // Segment 4 (49-55): 4s (First...)
    ...Array.from({ length: 7 }).map((_, i) => ({ word: "", start: 20.8 + (i * 0.57), end: 20.8 + ((i + 1) * 0.57) })),
    // Segment 5 (56-63): 4s (Second...)
    ...Array.from({ length: 8 }).map((_, i) => ({ word: "", start: 24.8 + (i * 0.5), end: 24.8 + ((i + 1) * 0.5) })),
    // Segment 6 (64-68): 3s (This question...)
    ...Array.from({ length: 5 }).map((_, i) => ({ word: "", start: 28.8 + (i * 0.6), end: 28.8 + ((i + 1) * 0.6) })),
    // Segment 7 (69-124): 20s (When a sentence...)
    ...Array.from({ length: 56 }).map((_, i) => ({ word: "", start: 31.8 + (i * 0.357), end: 31.8 + ((i + 1) * 0.357) })),
    // Segment 8 (125-153): 12s (Now a Moment...)
    ...Array.from({ length: 29 }).map((_, i) => ({ word: "", start: 51.8 + (i * 0.413), end: 51.8 + ((i + 1) * 0.413) })),
    // Segment 9 (154-173): 8s (Rereading...)
    ...Array.from({ length: 20 }).map((_, i) => ({ word: "", start: 63.8 + (i * 0.4), end: 63.8 + ((i + 1) * 0.4) }))
  ].map((item, idx) => ({ ...item, index: idx }))
};
