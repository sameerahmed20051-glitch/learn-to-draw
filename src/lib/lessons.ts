// Each lesson has progressive SVG step layers. The illustration shown on the
// instruction panel for step N is the union of layers 0..N — so kids see the
// drawing build up step-by-step (NOT the final picture from the start).

export type StepLayer = string; // SVG fragment (paths, circles, etc.) — composed inside a 200x200 viewBox

export type LessonStep = {
  title: string;
  instruction: string;
  tip?: string;
  layer: StepLayer; // what gets ADDED at this step
};

export type Lesson = {
  slug: string;
  title: string;
  shortTitle: string;
  emoji: string;
  difficulty: "Easy" | "Medium";
  // Tailwind classes for the card accent gradient
  accentFrom: string;
  accentTo: string;
  steps: LessonStep[];
};

// Reusable stroke style for outline-only step illustrations
const S = `fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

export const lessons: Lesson[] = [
  {
    slug: "elephant",
    title: "How to Draw an Elephant",
    shortTitle: "Elephant",
    emoji: "🐘",
    difficulty: "Medium",
    accentFrom: "from-[oklch(0.55_0.2_295)]",
    accentTo: "to-[oklch(0.7_0.18_320)]",
    steps: [
      {
        title: "Step 1 — Big Body",
        instruction: "Draw a big oval in the middle of the page. This is the elephant's body.",
        tip: "Make it as wide as your hand!",
        layer: `<ellipse cx="110" cy="115" rx="55" ry="40" ${S}/>`,
      },
      {
        title: "Step 2 — Round Head",
        instruction: "Add a smaller circle on the left side of the body for the head.",
        layer: `<circle cx="55" cy="95" r="28" ${S}/>`,
      },
      {
        title: "Step 3 — Long Trunk",
        instruction: "From the head, draw a long curvy trunk that curls up at the end.",
        tip: "Curl it up like a smile!",
        layer: `<path d="M40 110 Q 25 140, 35 165 Q 45 180, 60 170" ${S}/>`,
      },
      {
        title: "Step 4 — Floppy Ear",
        instruction: "Draw one big floppy ear behind the head, like a giant leaf.",
        layer: `<path d="M55 70 Q 30 60, 35 95 Q 45 110, 60 100 Z" ${S}/>`,
      },
      {
        title: "Step 5 — Four Legs",
        instruction: "Add four chunky legs under the body, like little tree trunks.",
        layer: `<path d="M75 150 V 180 H 90 V 150" ${S}/>
                <path d="M105 152 V 180 H 120 V 152" ${S}/>
                <path d="M135 152 V 180 H 150 V 152" ${S}/>
                <path d="M155 148 V 180 H 168 V 148" ${S}/>`,
      },
      {
        title: "Step 6 — Eye & Tail",
        instruction: "Add a tiny eye, a smile, and a thin tail with a little tuft at the end.",
        tip: "Now color it gray and you're done!",
        layer: `<circle cx="50" cy="90" r="2" fill="currentColor"/>
                <path d="M165 120 Q 180 130, 178 145" ${S}/>
                <path d="M178 145 l -3 6 M178 145 l 4 4" ${S}/>`,
      },
    ],
  },
  {
    slug: "cat",
    title: "How to Draw a Cat",
    shortTitle: "Cat",
    emoji: "🐱",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.7_0.18_50)]",
    accentTo: "to-[oklch(0.78_0.15_30)]",
    steps: [
      {
        title: "Step 1 — Round Head",
        instruction: "Draw a big round circle in the middle of your page for the cat's head.",
        layer: `<circle cx="100" cy="100" r="55" ${S}/>`,
      },
      {
        title: "Step 2 — Pointy Ears",
        instruction: "Add two triangle ears on top of the head.",
        layer: `<path d="M55 65 L 65 25 L 90 55" ${S}/>
                <path d="M145 65 L 135 25 L 110 55" ${S}/>`,
      },
      {
        title: "Step 3 — Sweet Eyes & Nose",
        instruction: "Draw two oval eyes and a tiny triangle nose in the middle.",
        layer: `<ellipse cx="80" cy="95" rx="6" ry="9" fill="currentColor"/>
                <ellipse cx="120" cy="95" rx="6" ry="9" fill="currentColor"/>
                <path d="M95 115 L 105 115 L 100 122 Z" fill="currentColor"/>`,
      },
      {
        title: "Step 4 — Mouth & Whiskers",
        instruction: "Add a little smiley mouth and three whiskers on each side.",
        layer: `<path d="M100 122 Q 92 132, 86 128 M100 122 Q 108 132, 114 128" ${S}/>
                <path d="M55 110 H 30 M55 120 H 32 M58 130 H 35" ${S}/>
                <path d="M145 110 H 170 M145 120 H 168 M142 130 H 165" ${S}/>`,
      },
      {
        title: "Step 5 — Body & Legs",
        instruction: "Draw a soft oval body below the head with two front paws.",
        layer: `<path d="M60 150 Q 100 200, 140 150" ${S}/>
                <path d="M85 175 V 188 M115 175 V 188" ${S}/>`,
      },
      {
        title: "Step 6 — Curly Tail",
        instruction: "Finish with a curly tail at the back. Add stripes if you want!",
        tip: "Color your kitty any color you love!",
        layer: `<path d="M140 170 Q 175 165, 175 130 Q 175 115, 165 118" ${S}/>`,
      },
    ],
  },
  {
    slug: "dog",
    title: "How to Draw a Dog",
    shortTitle: "Dog",
    emoji: "🐶",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.7_0.15_70)]",
    accentTo: "to-[oklch(0.78_0.13_50)]",
    steps: [
      {
        title: "Step 1 — Round Head",
        instruction: "Draw a round circle for the dog's head.",
        layer: `<circle cx="100" cy="90" r="42" ${S}/>`,
      },
      {
        title: "Step 2 — Floppy Ears",
        instruction: "Add two long floppy ears hanging down on each side.",
        layer: `<path d="M65 75 Q 45 110, 60 130 Q 75 125, 75 110" ${S}/>
                <path d="M135 75 Q 155 110, 140 130 Q 125 125, 125 110" ${S}/>`,
      },
      {
        title: "Step 3 — Cute Face",
        instruction: "Draw two eyes, a triangle nose, and a smiley mouth with a tongue.",
        layer: `<circle cx="85" cy="85" r="4" fill="currentColor"/>
                <circle cx="115" cy="85" r="4" fill="currentColor"/>
                <path d="M93 100 L 107 100 L 100 108 Z" fill="currentColor"/>
                <path d="M100 108 Q 92 120, 96 124 Q 100 120, 104 124 Q 108 120, 100 108" ${S}/>`,
      },
      {
        title: "Step 4 — Soft Body",
        instruction: "Below the head, draw a jellybean-shaped body.",
        layer: `<path d="M65 135 Q 65 175, 100 175 Q 140 175, 140 135" ${S}/>`,
      },
      {
        title: "Step 5 — Four Paws",
        instruction: "Add four short legs with paws at the bottom.",
        layer: `<path d="M75 170 V 188 H 90 V 175" ${S}/>
                <path d="M110 175 V 188 H 125 V 170" ${S}/>`,
      },
      {
        title: "Step 6 — Wagging Tail",
        instruction: "Draw a curly tail at the back. Now give your puppy a name!",
        layer: `<path d="M140 145 Q 165 130, 160 110" ${S}/>`,
      },
    ],
  },
  {
    slug: "fish",
    title: "How to Draw a Fish",
    shortTitle: "Fish",
    emoji: "🐟",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.65_0.16_220)]",
    accentTo: "to-[oklch(0.78_0.15_195)]",
    steps: [
      {
        title: "Step 1 — Body Shape",
        instruction: "Draw a big oval in the middle of the page. That's the fish body.",
        layer: `<ellipse cx="95" cy="100" rx="55" ry="32" ${S}/>`,
      },
      {
        title: "Step 2 — Tail Fin",
        instruction: "Add a triangle tail on the right side.",
        layer: `<path d="M150 100 L 185 75 L 185 125 Z" ${S}/>`,
      },
      {
        title: "Step 3 — Top & Bottom Fins",
        instruction: "Draw a small fin on top and another on the bottom of the body.",
        layer: `<path d="M85 70 Q 95 50, 110 70" ${S}/>
                <path d="M85 130 Q 95 150, 110 130" ${S}/>`,
      },
      {
        title: "Step 4 — Big Eye",
        instruction: "Draw a big circle for the eye on the left side, and a tiny dot inside.",
        layer: `<circle cx="60" cy="92" r="8" ${S}/>
                <circle cx="60" cy="92" r="3" fill="currentColor"/>`,
      },
      {
        title: "Step 5 — Smile & Gills",
        instruction: "Add a little smile under the eye and a curved line for the gills.",
        layer: `<path d="M55 110 Q 65 118, 75 110" ${S}/>
                <path d="M75 80 Q 80 100, 75 120" ${S}/>`,
      },
      {
        title: "Step 6 — Scales & Bubbles",
        instruction: "Add little U shapes for scales and tiny circles for bubbles!",
        tip: "Color it bright orange or rainbow!",
        layer: `<path d="M95 95 Q 100 100, 95 105" ${S}/>
                <path d="M110 95 Q 115 100, 110 105" ${S}/>
                <path d="M125 95 Q 130 100, 125 105" ${S}/>
                <circle cx="35" cy="60" r="3" ${S}/>
                <circle cx="25" cy="45" r="2" ${S}/>`,
      },
    ],
  },
  {
    slug: "butterfly",
    title: "How to Draw a Butterfly",
    shortTitle: "Butterfly",
    emoji: "🦋",
    difficulty: "Medium",
    accentFrom: "from-[oklch(0.7_0.18_320)]",
    accentTo: "to-[oklch(0.75_0.16_350)]",
    steps: [
      {
        title: "Step 1 — Body",
        instruction: "Draw a long thin oval in the middle of the page for the body.",
        layer: `<ellipse cx="100" cy="100" rx="6" ry="40" ${S}/>`,
      },
      {
        title: "Step 2 — Top Wings",
        instruction: "Draw two big round wings on each side near the top.",
        layer: `<path d="M94 75 Q 40 50, 50 95 Q 70 105, 94 95" ${S}/>
                <path d="M106 75 Q 160 50, 150 95 Q 130 105, 106 95" ${S}/>`,
      },
      {
        title: "Step 3 — Bottom Wings",
        instruction: "Add two smaller wings below the top wings.",
        layer: `<path d="M94 105 Q 55 115, 65 145 Q 85 145, 94 125" ${S}/>
                <path d="M106 105 Q 145 115, 135 145 Q 115 145, 106 125" ${S}/>`,
      },
      {
        title: "Step 4 — Antennae",
        instruction: "Draw two thin curvy lines on top of the head with little circles at the tips.",
        layer: `<path d="M97 65 Q 90 50, 80 45" ${S}/>
                <path d="M103 65 Q 110 50, 120 45" ${S}/>
                <circle cx="80" cy="45" r="2" fill="currentColor"/>
                <circle cx="120" cy="45" r="2" fill="currentColor"/>`,
      },
      {
        title: "Step 5 — Wing Patterns",
        instruction: "Add circles and dots on the wings to make them pretty.",
        layer: `<circle cx="68" cy="80" r="6" ${S}/>
                <circle cx="132" cy="80" r="6" ${S}/>
                <circle cx="78" cy="125" r="4" ${S}/>
                <circle cx="122" cy="125" r="4" ${S}/>`,
      },
      {
        title: "Step 6 — Color Time",
        instruction: "Add a little smile to the body and color each wing with rainbow colors!",
        tip: "Both wings should match like a mirror!",
        layer: `<circle cx="97" cy="72" r="1.5" fill="currentColor"/>
                <circle cx="103" cy="72" r="1.5" fill="currentColor"/>
                <path d="M96 80 Q 100 84, 104 80" ${S}/>`,
      },
    ],
  },
  {
    slug: "flower",
    title: "How to Draw a Flower",
    shortTitle: "Flower",
    emoji: "🌸",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.75_0.16_350)]",
    accentTo: "to-[oklch(0.78_0.18_30)]",
    steps: [
      {
        title: "Step 1 — Center",
        instruction: "Draw a small circle in the upper part of your page.",
        layer: `<circle cx="100" cy="60" r="14" ${S}/>`,
      },
      {
        title: "Step 2 — Petals",
        instruction: "Around the circle, draw 5 round petals like little clouds.",
        layer: `<circle cx="100" cy="32" r="14" ${S}/>
                <circle cx="73" cy="48" r="14" ${S}/>
                <circle cx="127" cy="48" r="14" ${S}/>
                <circle cx="80" cy="78" r="14" ${S}/>
                <circle cx="120" cy="78" r="14" ${S}/>`,
      },
      {
        title: "Step 3 — Happy Face",
        instruction: "Inside the center circle, add two tiny eyes and a big smile!",
        layer: `<circle cx="95" cy="58" r="1.5" fill="currentColor"/>
                <circle cx="105" cy="58" r="1.5" fill="currentColor"/>
                <path d="M93 63 Q 100 68, 107 63" ${S}/>`,
      },
      {
        title: "Step 4 — Stem",
        instruction: "Draw a long curvy line going down from the flower. That's the stem!",
        layer: `<path d="M100 92 Q 105 130, 95 175" ${S}/>`,
      },
      {
        title: "Step 5 — Leaves",
        instruction: "Add two leaves on the stem like ovals with pointy ends.",
        layer: `<path d="M100 125 Q 130 115, 135 130 Q 115 135, 100 130" ${S}/>
                <path d="M97 150 Q 67 145, 65 160 Q 85 165, 97 155" ${S}/>`,
      },
      {
        title: "Step 6 — Grass",
        instruction: "Draw little grass lines at the bottom and color it all in!",
        tip: "Pink petals, green stem, yellow center!",
        layer: `<path d="M60 188 L 65 178 M70 188 L 75 178 M80 188 L 85 178 M95 188 L 100 178 M110 188 L 115 178 M120 188 L 125 178 M130 188 L 135 178" ${S}/>`,
      },
    ],
  },
  {
    slug: "house",
    title: "How to Draw a House",
    shortTitle: "House",
    emoji: "🏠",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.7_0.15_140)]",
    accentTo: "to-[oklch(0.75_0.13_160)]",
    steps: [
      {
        title: "Step 1 — Walls",
        instruction: "Draw a big square in the middle of your page for the walls.",
        layer: `<rect x="50" y="90" width="100" height="90" ${S}/>`,
      },
      {
        title: "Step 2 — Roof",
        instruction: "Draw a triangle on top of the square. That's the roof!",
        layer: `<path d="M40 90 L 100 40 L 160 90 Z" ${S}/>`,
      },
      {
        title: "Step 3 — Door",
        instruction: "Add a tall rectangle in the middle for the door.",
        layer: `<rect x="88" y="135" width="24" height="45" ${S}/>
                <circle cx="106" cy="158" r="1.5" fill="currentColor"/>`,
      },
      {
        title: "Step 4 — Windows",
        instruction: "Draw two small squares on each side of the door for windows.",
        layer: `<rect x="60" y="105" width="20" height="20" ${S}/>
                <path d="M70 105 V 125 M60 115 H 80" ${S}/>
                <rect x="120" y="105" width="20" height="20" ${S}/>
                <path d="M130 105 V 125 M120 115 H 140" ${S}/>`,
      },
      {
        title: "Step 5 — Chimney",
        instruction: "On top of the roof, draw a small rectangle and little smoke clouds.",
        layer: `<rect x="120" y="55" width="14" height="22" ${S}/>
                <circle cx="125" cy="48" r="4" ${S}/>
                <circle cx="135" cy="40" r="5" ${S}/>`,
      },
      {
        title: "Step 6 — Sun & Grass",
        instruction: "Add a sun in the corner and grass at the bottom!",
        tip: "Color it however you like!",
        layer: `<circle cx="25" cy="25" r="10" ${S}/>
                <path d="M25 8 V 2 M25 42 V 48 M8 25 H 2 M42 25 H 48" ${S}/>
                <path d="M30 188 L 35 180 M45 188 L 50 180 M160 188 L 165 180 M175 188 L 180 180" ${S}/>`,
      },
    ],
  },
  {
    slug: "star",
    title: "How to Draw a Star",
    shortTitle: "Star",
    emoji: "⭐",
    difficulty: "Easy",
    accentFrom: "from-[oklch(0.78_0.18_95)]",
    accentTo: "to-[oklch(0.75_0.16_70)]",
    steps: [
      {
        title: "Step 1 — Top Point",
        instruction: "Make a small dot at the top middle of your page.",
        layer: `<circle cx="100" cy="35" r="2.5" fill="currentColor"/>`,
      },
      {
        title: "Step 2 — Down to Right",
        instruction: "From the top dot, draw a straight line down to the bottom right.",
        layer: `<path d="M100 35 L 145 165" ${S}/>`,
      },
      {
        title: "Step 3 — Across to Left",
        instruction: "Without lifting your pen, draw a line straight across to the left.",
        layer: `<path d="M145 165 L 35 85" ${S}/>`,
      },
      {
        title: "Step 4 — Up to Right",
        instruction: "Now draw a line up and across to the right side.",
        layer: `<path d="M35 85 L 165 85" ${S}/>`,
      },
      {
        title: "Step 5 — Back to Start",
        instruction: "Draw a line down to the left, then back up to where you started!",
        layer: `<path d="M165 85 L 55 165 L 100 35" ${S}/>`,
      },
      {
        title: "Step 6 — Happy Star",
        instruction: "Add a happy face inside and sparkles around. Color it bright yellow!",
        tip: "Stars love to smile!",
        layer: `<circle cx="88" cy="105" r="2" fill="currentColor"/>
                <circle cx="112" cy="105" r="2" fill="currentColor"/>
                <path d="M88 118 Q 100 128, 112 118" ${S}/>
                <path d="M180 30 L 185 35 M190 25 L 185 30" ${S}/>
                <path d="M15 50 L 20 55 M25 45 L 20 50" ${S}/>`,
      },
    ],
  },
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
