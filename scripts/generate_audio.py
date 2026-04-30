import os
from gtts import gTTS

# Full lessons data for audio generation
lessons = [
    {
        "slug": "elephant",
        "steps": [
            "Step 1 — Round Head. Draw a big round circle for the elephant's head in the top middle of your page.",
            "Step 2 — Big Oval Body. Add a large oval body right below the head. It should be wider than the head!",
            "Step 3 — Big Floppy Ears. Draw two giant floppy ears on each side of the head. Elephants use them like big fans!",
            "Step 4 — Long Curly Trunk. From the middle of the face, draw a long trunk that curves down and curls at the end.",
            "Step 5 — Strong Tusks. Add two pointy white tusks on each side of the trunk.",
            "Step 6 — Eyes, Legs & Details. Draw two chunky legs at the bottom, two happy eyes, and little wrinkle lines on the trunk."
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
            "Step 6 — Curly Tail & Stripes. Add a long curly tail behind the body, and a few little curved stripes on the head and body."
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
            "Step 6 — Wagging Tail. Draw a curly tail at the back. Now give your puppy a name!"
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
            "Step 6 — Scales & Bubbles. Add little U shapes for scales and tiny circles for bubbles!"
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
            "Step 6 — Color Time. Add a little smile to the body and color each wing with rainbow colors!"
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
            "Step 6 — Grass. Draw little grass lines at the bottom and color it all in!"
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
            "Step 6 — Sun & Grass. Add a sun in the corner and grass at the bottom!"
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
            "Step 6 — Happy Star. Add a happy face inside and little sparkles around. Color it bright yellow!"
        ]
    }
]

def generate_audio():
    print("🚀 Starting audio generation for all 8 lessons...")
    
    for lesson in lessons:
        slug = lesson["slug"]
        print(f"\n📦 Processing lesson: {slug}")
        
        path = f"public/audio/{slug}"
        if not os.path.exists(path):
            os.makedirs(path)
            
        for i, text in enumerate(lesson["steps"]):
            step_num = i + 1
            filename = f"{path}/step-{step_num}.mp3"
            
            # Using UK English for a calm, pleasant educational tone
            tts = gTTS(text=text, lang='en', tld='co.uk')
            tts.save(filename)
            print(f"  ✅ Saved: {filename}")
            
    print("\n🎉 SUCCESS! All audio files are ready in public/audio/")

if __name__ == "__main__":
    try:
        generate_audio()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Please run: pip install gTTS")
