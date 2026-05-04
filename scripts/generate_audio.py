import os
import argparse
from gtts import gTTS

# ─────────────────────────────────────────────
# DRAWING LESSONS
# ─────────────────────────────────────────────
lessons = [
    {
        "slug": "elephant",
        "steps": [
            "Step 1 — Round Head. Draw a big round circle for the elephant's head in the top middle of your page.",
            "Step 2 — Big Oval Body. Add a large oval body right below the head. It should be wider than the head!",
            "Step 3 — Big Floppy Ears. Draw two giant floppy ears on each side of the head. Elephants use them like big fans!",
            "Step 4 — Long Curly Trunk. From the middle of the face, draw a long trunk that curves down and curls at the end.",
            "Step 5 — Strong Tusks. Add two pointy white tusks on each side of the trunk.",
            "Step 6 — Eyes, Legs & Details. Draw two chunky legs at the bottom, two happy eyes, and little wrinkle lines on the trunk.",
            "Step 7 — Time to Color. Amazing elephant! Now use the markers and colors to make it look beautiful."
        ]
    },
    {
        "slug": "cat",
        "steps": [
            "Step 1 — Round Head. Draw a big round circle in the middle-top of your page for the cat's head.",
            "Step 2 — Pointy Triangle Ears. Add two triangle ears on top of the head with little lines inside.",
            "Step 3 — Big Eyes & Nose. Draw two big round eyes with little dots inside, and a tiny triangle nose between them.",
            "Step 4 — Smile & Whiskers. Draw a cute W mouth under the nose and three whiskers on each side.",
            "Step 5 — Soft Body & Paws. Draw a U-shape under the head for the body, with two front paws sticking out at the bottom.",
            "Step 6 — Curly Tail & Stripes. Add a long curly tail behind the body, and a few little curved stripes on the head and body.",
            "Step 7 — Time to Color. What a cute kitty! Now give it some colorful fur and bright eyes."
        ]
    },
    {
        "slug": "dog",
        "steps": [
            "Step 1 — Round Head. Draw a round circle for the dog's head.",
            "Step 2 — Floppy Ears. Add two long floppy ears hanging down on each side.",
            "Step 3 — Cute Face. Draw two eyes, a triangle nose, and a smiley mouth with a tongue.",
            "Step 4 — Soft Body. Below the head, draw a jellybean-shaped body.",
            "Step 5 — Four Paws. Add four short legs with paws at the bottom.",
            "Step 6 — Wagging Tail. Draw a curly tail at the back. Now give your puppy a name!",
            "Step 7 — Time to Color. Good dog! Now use your favorite colors to make your puppy happy."
        ]
    },
    {
        "slug": "fish",
        "steps": [
            "Step 1 — Body Shape. Draw a big oval in the middle of the page. That's the fish body.",
            "Step 2 — Tail Fin. Add a triangle tail on the right side.",
            "Step 3 — Top & Bottom Fins. Draw a small fin on top and another on the bottom of the body.",
            "Step 4 — Big Eye. Draw a big circle for the eye on the left side, and a tiny dot inside.",
            "Step 5 — Smile & Gills. Add a little smile under the eye and a curved line for the gills.",
            "Step 6 — Scales & Bubbles. Add little U shapes for scales and tiny circles for bubbles!",
            "Step 7 — Time to Color. Splendid fish! Time to add some underwater magic with your colors."
        ]
    },
    {
        "slug": "butterfly",
        "steps": [
            "Step 1 — Body. Draw a long thin oval in the middle of the page for the body.",
            "Step 2 — Top Wings. Draw two big round wings on each side near the top.",
            "Step 3 — Bottom Wings. Add two smaller wings below the top wings.",
            "Step 4 — Antennae. Draw two thin curvy lines on top of the head with little circles at the tips.",
            "Step 5 — Wing Patterns. Add circles and dots on the wings to make them pretty.",
            "Step 6 — Color Time. Add a little smile to the body and color each wing with rainbow colors!",
            "Step 7 — Time to Color. Beautiful butterfly! Use all the bright colors to make the wings shine."
        ]
    },
    {
        "slug": "flower",
        "steps": [
            "Step 1 — Center. Draw a small circle in the upper part of your page.",
            "Step 2 — Petals. Around the circle, draw 5 round petals like little clouds.",
            "Step 3 — Happy Face. Inside the center circle, add two tiny eyes and a big smile!",
            "Step 4 — Stem. Draw a long curvy line going down from the flower. That's the stem!",
            "Step 5 — Leaves. Add two leaves on the stem like ovals with pointy ends.",
            "Step 6 — Grass. Draw little grass lines at the bottom and color it all in!",
            "Step 7 — Time to Color. Lovely flower! Pick your favorite petal colors and make it bloom."
        ]
    },
    {
        "slug": "house",
        "steps": [
            "Step 1 — Walls. Draw a big square in the middle of your page for the walls.",
            "Step 2 — Roof. Draw a triangle on top of the square. That's the roof!",
            "Step 3 — Door. Add a tall rectangle in the middle for the door.",
            "Step 4 — Windows. Draw two small squares on each side of the door for windows.",
            "Step 5 — Chimney. On top of the roof, draw a small rectangle and little smoke clouds.",
            "Step 6 — Sun & Grass. Add a sun in the corner and grass at the bottom!",
            "Step 7 — Time to Color. Great house! Color the walls, roof, and door to make it your dream home."
        ]
    },
    {
        "slug": "star",
        "steps": [
            "Step 1 — Slant Down. Start at the top and draw a slanted line down to the right.",
            "Step 2 — Slide Up. Now draw a line going up and to the left.",
            "Step 3 — Zoom Across. Draw a straight line all the way across to the right side.",
            "Step 4 — Slide Down. Draw another slanted line going down to the left.",
            "Step 5 — Back to Start. Draw the last line back up to the top where you started!",
            "Step 6 — Happy Star. Add a happy face inside and little sparkles around. Color it bright yellow!",
            "Step 7 — Time to Color. Twinkling star! Make it glow with bright yellow or magic rainbow colors."
        ]
    }
]

# ─────────────────────────────────────────────
# ENGLISH LESSON AUDIO — Week 1, Day 1
# Same voice: UK English female (lang='en', tld='co.uk')
# ─────────────────────────────────────────────
english_card_audio = [
    # Card 1 — Whole Reading Part 1
    ("part1-reading",
     "A sentence should sound like a thought. A sentence is not only a row of words. It is one idea. "
     "The words work together to carry that idea. When we read a sentence, we need to hear the whole thought. "
     "Look at this sentence: The dog ran. If we read it like this: The. Dog. Ran. The words are right, but the thought sounds broken. "
     "Now read it like this: The dog ran. Now it sounds more like one thought. "
     "A Real Reader-Writer knows that careful reading comes first. We do not rush. We do not guess. "
     "We read the words from the print. After we read the words, we can read the sentence again "
     "so the thought can come through. "
     "In Year 1, many readers begin by reading word by word. That is normal. It means the mind is working hard. "
     "The reader is looking at letters, remembering sounds, blending, and checking. That is good work! "
     "But reading must keep growing. A weak reader stops at every word. A strong reader works out the words, "
     "then reads again so the words can join. This is careful reading becoming smoother."),

    # Card 2 — The Dog Ran Example
    ("card-1-dog",
     "Look at this sentence: The dog ran. "
     "If we read it like this: The. Dog. Ran. The words are right, but the thought sounds broken. "
     "Now read it like this: The dog ran. Now it sounds more like one thought."),

    # Card 3 — Activity 1: Smooth It!
    ("card-2-intro",
     "Your turn! Tap the words in the right order to build the sentence. "
     "When the words sit together, the thought light will turn on!"),

    ("card-2-correct",
     "Amazing! You did it! The thought light is on! "
     "The sentence sounds like one clear thought. Well done!"),

    # Card 3 — Whole Reading Part 2
    ("part2-reading",
     "A sentence is like a small basket. Each word sits inside the basket. "
     "If the words stay too far apart, the thought may fall out. "
     "If the words sit together in the right way, the basket can carry the whole thought. "
     "A real reader writer asks two important questions. First, did I say the words correctly? "
     "Second, did the sentence say its thought clearly? This question helps reading grow! "
     "When a sentence sounds like a thought, the mind can hold it better. "
     "The reader can understand more. The listener can understand more too. "
     "If you read in a broken way, the listener may hear the words, but the meaning is hard to hold. "
     "If you read clearly and smoothly, the listener can follow the thought. "
     "Now, a Moment to Picture. Close your eyes. Listen to this: The little bird sang. "
     "Can you picture one thought? Imagine words falling away. It is harder to hold! "
     "Rereading is not weak. It helps the line carry meaning. "
     "Today, let the sentence sound like a thought."),

    ("card-2-try-again",
     "Good try! Listen again, and tap the words in the right order. You can do it!"),

    # Card 4 — Careful Reading
    ("card-careful",
     "A Real Reader-Writer knows that careful reading comes first. We do not rush. We do not guess. "
     "We read the words from the print. But after we read the words, we can read the sentence again "
     "so the thought can come through."),

    # Card 5 — Year 1 Normality
    ("card-3-intro",
     "In Year one, many readers read word by word. That is completely normal! "
     "It means your mind is working hard. You are looking at letters, "
     "remembering sounds, blending, and checking. That is wonderful work!"),

    # Card 6 — Growth
    ("card-growth",
     "But reading must keep growing. A weak reader may stop at every word and never help "
     "the sentence speak. A strong reader works out the words, then reads again so the "
     "words can join. This is careful reading becoming smoother."),

    # Card 7 — The Basket
    ("card-3-basket",
     "A sentence is like a small basket. Each word sits inside the basket. "
     "If the words stay too far apart, the thought may fall out. "
     "If the words sit together in the right way, the basket can carry the whole thought."),

    # Card 9 — Thought Check Questions
    ("card-3-check",
     "A real reader writer asks two important questions. "
     "First, did I say the words correctly? "
     "Second, did the sentence say its thought clearly? "
     "This question helps reading grow!"),

    # Card 10 — Holding the Meaning
    ("card-hold",
     "When a sentence sounds like a thought, the mind can hold it better. "
     "The reader can understand more. The listener can understand more too. "
     "This matters when you read quietly, and when you read aloud."),

    # Card 11 — Listener
    ("card-listen",
     "If you read in a very broken way, the listener may hear the words, but the meaning "
     "may feel hard to hold. If you read clearly and smoothly, the listener can follow the thought."),

    # Card 12 — Picture It!
    ("card-picture",
     "A Moment to Picture. Close your eyes for a short moment. Listen to this: "
     "The little bird sang. Can you picture one thought? Now imagine every word "
     "falling far away from the others. It is harder to hold!"),

    # Card 14 — Thought Light
    ("card-light",
     "Today, use the Thought Check. Read carefully. Read again. "
     "Ask: Did it sound like one thought? Did it make sense? "
     "In your mind, picture a little thought light!"),

    # Card 15 — Meaning
    ("card-meaning",
     "If it still sounds broken, read it again calmly. Rereading is not weak. "
     "Rereading helps the sentence speak. Help the line carry meaning. "
     "Today, let the sentence sound like a thought."),

    # Finale
    ("finale",
     "Wonderful work today! You are a real reader writer! "
     "You helped the line carry meaning. Keep practising, and see you next time!"),
]

# Individual words for tap-to-hear feature
english_words = [
    "a", "sentence", "should", "sound", "like", "thought", "is", "not", "only", "row", "of", "words", 
    "it", "one", "idea", "the", "work", "together", "to", "carry", "that", "dog", "ran", "in", "year", 
    "many", "readers", "read", "word", "by", "completely", "normal", "means", "your", "brain", 
    "working", "hard", "you", "are", "looking", "at", "letters", "remembering", "sounds", "and", 
    "blending", "them", "wonderful", "but", "reading", "must", "keep", "growing", "strong", 
    "reader", "works", "out", "then", "reads", "again", "so", "can", "join", "small", "basket", 
    "each", "sits", "inside", "if", "stay", "too", "far", "apart", "may", "fall", "sit", 
    "carries", "whole", "real", "writer", "asks", "two", "important", "questions", "first", 
    "did", "i", "say", "correctly", "second", "clearly", "this", "called", "check", "use", 
    "every", "time", "red", "ball", "rolled", "little", "bird", "sang", "practising", "brilliant"
]


def generate_drawing_audio(slug=None):
    target_lessons = lessons
    if slug:
        target_lessons = [l for l in lessons if l["slug"] == slug]
        if not target_lessons:
            print(f"Error: Drawing lesson '{slug}' not found.")
            return

    print(f"Starting drawing audio for {len(target_lessons)} lesson(s)...")

    for lesson in target_lessons:
        s = lesson["slug"]
        print(f"\nProcessing: {s}")
        path = f"public/audio/{s}"
        if not os.path.exists(path):
            os.makedirs(path)

        for i, text in enumerate(lesson["steps"]):
            filename = f"{path}/step-{i + 1}.mp3"
            if os.path.exists(filename):
                print(f"  Skipping: {filename}")
                continue
            tts = gTTS(text=text, lang='en', tld='co.uk')
            tts.save(filename)
            print(f"  Saved: {filename}")

    print("\nDone! Drawing audio ready in public/audio/")


def generate_english_audio(force=False):
    print("\nGenerating English lesson audio...")
    base = "public/audio/english"

    if not os.path.exists(base):
        os.makedirs(base)

    # Card narration files
    for (name, text) in english_card_audio:
        filename = f"{base}/{name}.mp3"
        if os.path.exists(filename) and not force:
            print(f"  Skipping: {filename}")
            continue
        tts = gTTS(text=text, lang='en', tld='co.uk')
        tts.save(filename)
        print(f"  Saved: {filename}")

    # Individual word files
    words_path = f"{base}/words"
    if not os.path.exists(words_path):
        os.makedirs(words_path)

    for word in english_words:
        filename = f"{words_path}/{word}.mp3"
        if os.path.exists(filename) and not force:
            print(f"  Skipping word: {word}")
            continue
        tts = gTTS(text=word, lang='en', tld='co.uk')
        tts.save(filename)
        print(f"  Saved word: {filename}")

    print("\nDone! English lesson audio ready in public/audio/english/")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate audio for drawing and English lessons (UK English female voice)."
    )
    parser.add_argument(
        'target', nargs='?',
        help="Lesson slug (e.g. 'elephant'), 'english', or leave blank for ALL"
    )
    parser.add_argument('--force', action='store_true', help='Force regeneration of existing files')
    args = parser.parse_args()

    try:
        if args.target == "english":
            generate_english_audio(force=args.force)
        elif args.target:
            generate_drawing_audio(slug=args.target)
        else:
            generate_drawing_audio()
            generate_english_audio(force=args.force)
    except Exception as e:
        print(f"\nError: {e}")
        print("Make sure gTTS is installed: pip install gTTS")
