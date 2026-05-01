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
        title: "Step 1 — Round Head",
        instruction: "Draw a big round circle for the elephant's head in the top middle of your page.",
        tip: "Make it nice and big like a giant balloon!",
        layer: `<circle cx="100" cy="80" r="36" ${S} fill="currentColor" fill-opacity="0.1"/>`,
      },
      {
        title: "Step 2 — Big Oval Body",
        instruction: "Add a large oval body right below the head. It should be wider than the head!",
        tip: "This is the biggest part of the elephant.",
        layer: `<rect x="50" y="90" width="100" height="70" rx="30" ${S} fill="currentColor" fill-opacity="0.1"/>`,
      },
      {
        title: "Step 3 — Big Floppy Ears",
        instruction: "Draw two giant floppy ears on each side of the head. Elephants use them like big fans!",
        tip: "Curve them out like huge butterfly wings.",
        layer: `<path d="M70,60 C30,40 20,100 64,120" ${S}/>
                <path d="M130,60 C170,40 180,100 136,120" ${S}/>`,
      },
      {
        title: "Step 4 — Long Curly Trunk",
        instruction: "From the middle of the face, draw a long trunk that curves down and curls at the end.",
        tip: "The trunk is like a super-long nose!",
        layer: `<path d="M100,90 Q100,150 90,164 Q84,170 90,170 Q96,170 100,164" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>`,
      },
      {
        title: "Step 5 — Strong Tusks",
        instruction: "Add two pointy white tusks on each side of the trunk.",
        tip: "Tusks help elephants lift things!",
        layer: `<path d="M86,96 Q80,124 70,120" ${S} fill="white" fill-opacity="0.4"/>
                <path d="M114,96 Q120,124 130,120" ${S} fill="white" fill-opacity="0.4"/>`,
      },
      {
        title: "Step 6 — Eyes, Legs & Details",
        instruction: "Draw two chunky legs at the bottom, two happy eyes, and little wrinkle lines on the trunk.",
        tip: "Now your elephant is ready to trumpet! 🎺",
        layer: `<rect x="64" y="150" width="24" height="36" rx="8" ${S} fill="currentColor" fill-opacity="0.1"/>
                <rect x="112" y="150" width="24" height="36" rx="8" ${S} fill="currentColor" fill-opacity="0.1"/>
                <circle cx="86" cy="76" r="4" fill="currentColor"/>
                <circle cx="114" cy="76" r="4" fill="currentColor"/>
                <line x1="96" y1="116" x2="104" y2="116" stroke="currentColor" stroke-width="2" opacity="0.6"/>
                <line x1="96" y1="130" x2="104" y2="130" stroke="currentColor" stroke-width="2" opacity="0.6"/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "Amazing elephant! Now use the markers and colors to make it look beautiful.",
        layer: "",
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
        instruction: "Draw a big round circle in the middle-top of your page for the cat's head.",
        tip: "Make it nice and round like an apple!",
        layer: `<circle cx="100" cy="80" r="40" ${S}/>`,
      },
      {
        title: "Step 2 — Pointy Triangle Ears",
        instruction: "Add two triangle ears on top of the head with little lines inside.",
        tip: "Like two slices of pizza pointing up!",
        layer: `<path d="M68 60 L 62 25 L 92 50 Z" ${S}/>
                <path d="M132 60 L 138 25 L 108 50 Z" ${S}/>
                <path d="M70 50 L 75 35" ${S}/>
                <path d="M130 50 L 125 35" ${S}/>`,
      },
      {
        title: "Step 3 — Big Eyes & Nose",
        instruction: "Draw two big round eyes with little dots inside, and a tiny triangle nose between them.",
        tip: "Add a small white sparkle on each eye!",
        layer: `<circle cx="82" cy="78" r="7" ${S}/>
                <circle cx="118" cy="78" r="7" ${S}/>
                <ellipse cx="82" cy="79" rx="3" ry="5" fill="currentColor"/>
                <ellipse cx="118" cy="79" rx="3" ry="5" fill="currentColor"/>
                <circle cx="80" cy="76" r="1.2" fill="white"/>
                <circle cx="116" cy="76" r="1.2" fill="white"/>
                <path d="M95 92 L 105 92 L 100 99 Z" fill="currentColor"/>`,
      },
      {
        title: "Step 4 — Smile & Whiskers",
        instruction: "Draw a cute W mouth under the nose and three whiskers on each side.",
        tip: "Whiskers help cats feel their way!",
        layer: `<path d="M100 99 Q 95 108, 90 104 M100 99 Q 105 108, 110 104" ${S}/>
                <path d="M65 90 H 40 M65 98 H 42 M67 106 H 45" ${S}/>
                <path d="M135 90 H 160 M135 98 H 158 M133 106 H 155" ${S}/>`,
      },
      {
        title: "Step 5 — Soft Body & Paws",
        instruction: "Draw a U-shape under the head for the body, with two front paws sticking out at the bottom.",
        tip: "Cats sit up nice and tall!",
        layer: `<path d="M70 115 Q 60 165, 75 180 H 125 Q 140 165, 130 115" ${S}/>
                <path d="M82 180 q 4 -3 8 0 q 4 -3 8 0" ${S}/>
                <path d="M102 180 q 4 -3 8 0 q 4 -3 8 0" ${S}/>`,
      },
      {
        title: "Step 6 — Curly Tail & Stripes",
        instruction: "Add a long curly tail behind the body, and a few little curved stripes on the head and body.",
        layer: `<path d="M130 150 Q 165 145, 168 110 Q 168 95, 155 98" ${S}/>
                <path d="M76 65 q 4 -2 8 0 M120 65 q 4 -2 8 0" ${S}/>
                <path d="M90 135 q 5 -2 10 0 M105 145 q 5 -2 10 0" ${S}/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "What a cute kitty! Now give it some colorful fur and bright eyes.",
        layer: "",
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
      {
        title: "Step 7 — Time to Color",
        instruction: "Good dog! Now use your favorite colors to make your puppy happy.",
        layer: "",
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
        layer: `<path d="M95 95 Q 100 100, 95 105" ${S}/>
                <path d="M110 95 Q 115 100, 110 105" ${S}/>
                <path d="M125 95 Q 130 100, 125 105" ${S}/>
                <circle cx="35" cy="60" r="3" ${S}/>
                <circle cx="25" cy="45" r="2" ${S}/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "Splendid fish! Time to add some underwater magic with your colors.",
        layer: "",
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
      {
        title: "Step 7 — Time to Color",
        instruction: "Beautiful butterfly! Use all the bright colors to make the wings shine.",
        layer: "",
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
        layer: `<path d="M60 188 L 65 178 M70 188 L 75 178 M80 188 L 85 178 M95 188 L 100 178 M110 188 L 115 178 M120 188 L 125 178 M130 188 L 135 178" ${S}/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "Lovely flower! Pick your favorite petal colors and make it bloom.",
        layer: "",
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
        layer: `<circle cx="25" cy="25" r="10" ${S}/>
                <path d="M25 8 V 2 M25 42 V 48 M8 25 H 2 M42 25 H 48" ${S}/>
                <path d="M30 188 L 35 180 M45 188 L 50 180 M160 188 L 165 180 M175 188 L 180 180" ${S}/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "Great house! Color the walls, roof, and door to make it your dream home.",
        layer: "",
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
        title: "Step 1 — Slant Down",
        instruction: "Start at the top and draw a slanted line down to the right.",
        tip: "Like a slide at the park!",
        layer: `<path d="M100 35 L 145 165" ${S}/>`,
      },
      {
        title: "Step 2 — Slide Up",
        instruction: "Now draw a line going up and to the left.",
        tip: "Keep your pencil on the paper!",
        layer: `<path d="M145 165 L 35 85" ${S}/>`,
      },
      {
        title: "Step 3 — Zoom Across",
        instruction: "Draw a straight line all the way across to the right side.",
        tip: "Zip! Like a fast car.",
        layer: `<path d="M35 85 L 165 85" ${S}/>`,
      },
      {
        title: "Step 4 — Slide Down",
        instruction: "Draw another slanted line going down to the left.",
        tip: "Almost there!",
        layer: `<path d="M165 85 L 55 165" ${S}/>`,
      },
      {
        title: "Step 5 — Back to Start",
        instruction: "Draw the last line back up to the top where you started!",
        tip: "You made a star shape!",
        layer: `<path d="M55 165 L 100 35" ${S}/>`,
      },
      {
        title: "Step 6 — Happy Star",
        instruction: "Add a happy face inside and little sparkles around. Color it bright yellow!",
        tip: "Stars love to smile!",
        layer: `<circle cx="88" cy="105" r="2" fill="currentColor"/>
                <circle cx="112" cy="105" r="2" fill="currentColor"/>
                <path d="M88 118 Q 100 128, 112 118" ${S}/>
                <path d="M180 30 L 185 35 M190 25 L 185 30" ${S}/>
                <path d="M15 50 L 20 55 M25 45 L 20 50" ${S}/>`,
      },
      {
        title: "Step 7 — Time to Color",
        instruction: "Twinkling star! Make it glow with bright yellow or magic rainbow colors.",
        layer: "",
      },
    ],
  },
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
