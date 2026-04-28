import elephant from "@/assets/draw-elephant.png";
import dog from "@/assets/draw-dog.png";
import cat from "@/assets/draw-cat.png";
import home from "@/assets/draw-home.png";
import star from "@/assets/draw-star.png";
import flower from "@/assets/draw-flower.png";

export type Lesson = {
  slug: string;
  title: string;
  emoji: string;
  image: string;
  color: string; // tailwind bg class for the tile
  steps: { title: string; instruction: string; tip?: string }[];
};

export const lessons: Lesson[] = [
  {
    slug: "elephant",
    title: "How to Draw an Elephant",
    emoji: "🐘",
    image: elephant,
    color: "bg-[oklch(0.9_0.04_280)]",
    steps: [
      { title: "Step 1: The Big Head", instruction: "Draw a big round circle for the elephant's head in the middle of your page.", tip: "Make it as big as your fist!" },
      { title: "Step 2: Floppy Ears", instruction: "Add two big floppy ears on the sides of the head, like giant leaves.", tip: "Ears are bigger than the head!" },
      { title: "Step 3: The Long Trunk", instruction: "Draw a long curvy tube coming down from the middle of the face. That's the trunk!", tip: "Curl it up at the end like a smile." },
      { title: "Step 4: Body Time", instruction: "Under the head, draw a big round body shape like a potato.", tip: "Leave room for legs below." },
      { title: "Step 5: Four Legs", instruction: "Add four chunky legs like little tree trunks under the body.", tip: "Make them short and thick." },
      { title: "Step 6: Eyes & Tail", instruction: "Draw two tiny circles for eyes, a smile, and a thin tail with a little tuft at the end.", tip: "Color it gray and you're done!" },
    ],
  },
  {
    slug: "dog",
    title: "How to Draw a Dog",
    emoji: "🐶",
    image: dog,
    color: "bg-[oklch(0.92_0.06_60)]",
    steps: [
      { title: "Step 1: Round Head", instruction: "Draw a round circle in the top middle of the page for the head." },
      { title: "Step 2: Floppy Ears", instruction: "Add two long floppy ears hanging down on each side of the head." },
      { title: "Step 3: Cute Face", instruction: "Draw two oval eyes, a little triangle nose, and a smiley mouth with a tongue!" },
      { title: "Step 4: Soft Body", instruction: "Below the head, draw an oval body shape like a jellybean." },
      { title: "Step 5: Four Paws", instruction: "Add four short legs with tiny paws at the bottom." },
      { title: "Step 6: Wagging Tail", instruction: "Draw a curly tail at the back. Color your puppy and give it a name!" },
    ],
  },
  {
    slug: "cat",
    title: "How to Draw a Cat",
    emoji: "🐱",
    image: cat,
    color: "bg-[oklch(0.93_0.05_30)]",
    steps: [
      { title: "Step 1: Round Head", instruction: "Draw a big round circle for the cat's head." },
      { title: "Step 2: Pointy Ears", instruction: "Add two small triangle ears on top of the head." },
      { title: "Step 3: Sweet Face", instruction: "Draw two eyes (closed like smiles!), a tiny pink nose, and a cute mouth." },
      { title: "Step 4: Whiskers", instruction: "Draw three little lines on each side of the nose for whiskers." },
      { title: "Step 5: Body & Legs", instruction: "Add a small oval body under the head with two front legs and two back legs." },
      { title: "Step 6: Curly Tail", instruction: "Finish with a long curly tail. Add stripes and color it!" },
    ],
  },
  {
    slug: "home",
    title: "How to Draw a Home",
    emoji: "🏠",
    image: home,
    color: "bg-[oklch(0.9_0.06_140)]",
    steps: [
      { title: "Step 1: The Walls", instruction: "Draw a big square in the middle of your page. That's the walls!" },
      { title: "Step 2: The Roof", instruction: "Draw a triangle on top of the square. That's the roof!" },
      { title: "Step 3: The Door", instruction: "Add a tall rectangle in the middle of the square for the door." },
      { title: "Step 4: The Windows", instruction: "Draw two small squares on each side of the door for windows. Add a cross inside each." },
      { title: "Step 5: The Chimney", instruction: "On top of the roof, draw a small rectangle with little smoke clouds above it." },
      { title: "Step 6: Make it Pretty", instruction: "Add grass, a sun, and flowers around your home. Color it all in!" },
    ],
  },
  {
    slug: "star",
    title: "How to Draw a Star",
    emoji: "⭐",
    image: star,
    color: "bg-[oklch(0.94_0.12_95)]",
    steps: [
      { title: "Step 1: Top Point", instruction: "Make a small dot at the top of where your star will be." },
      { title: "Step 2: Down to the Right", instruction: "From the top dot, draw a straight line down to the bottom right." },
      { title: "Step 3: Across to the Left", instruction: "Without lifting your pen, draw a line straight across to the left side." },
      { title: "Step 4: Up to the Right", instruction: "Now go up and to the right, crossing over your first lines." },
      { title: "Step 5: Down to the Start", instruction: "Finish by drawing a line back down to where you started. Hooray, a star!" },
      { title: "Step 6: Color It!", instruction: "Color your star bright yellow and add a happy face inside.", tip: "Add sparkles around it!" },
    ],
  },
  {
    slug: "flower",
    title: "How to Draw a Flower",
    emoji: "🌸",
    image: flower,
    color: "bg-[oklch(0.92_0.08_350)]",
    steps: [
      { title: "Step 1: The Center", instruction: "Draw a small circle in the middle of the top of your page." },
      { title: "Step 2: First Petals", instruction: "Around the circle, draw 5 round petals like little clouds." },
      { title: "Step 3: Happy Face", instruction: "Inside the circle, add two eyes and a big smile!" },
      { title: "Step 4: The Stem", instruction: "Draw a long curvy line going down from the flower. That's the stem." },
      { title: "Step 5: Leaves", instruction: "Add two leaf shapes on each side of the stem like little ovals with pointy ends." },
      { title: "Step 6: Color Time", instruction: "Color the petals pink, the stem green, and add some grass at the bottom!" },
    ],
  },
];

export const getLesson = (slug: string) => lessons.find((l) => l.slug === slug);
