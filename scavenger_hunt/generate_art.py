#!/usr/bin/env python3
"""Generate Bigfoot art backgrounds from prompts using OpenAI Images API."""
import os, json, base64, time
from openai import OpenAI

client = OpenAI()
out_dir = os.path.join(os.path.dirname(__file__), "art_backgrounds")
os.makedirs(out_dir, exist_ok=True)

# All 14 prompts: (filename, prompt_text, bg_color)
prompts = [
    ("hub", "Bigfoot waving cheerfully with a mountain silhouette in the background", "#D4A5D9"),
    ("stop_01", "Bigfoot sniffing a single large flower with curiosity", "#9CAF88"),
    ("stop_02", "Bigfoot holding a large paintbrush in one hand and an open book in the other", "#7B68BB"),
    ("stop_03", "Bigfoot peeking mischievously over the edge of an open treasure chest", "#B8956A"),
    ("stop_04", "Bigfoot knitting with needles and yarn, with a friendly sheep standing beside him", "#E8BABA"),
    ("stop_05", "Bigfoot holding and admiring a large D20 die with joy", "#4169E1"),
    ("stop_06", "Bigfoot in a spa robe with pink hair curlers on head, admiring himself in a mirror", "#008080"),
    ("stop_07", "Bigfoot catching a large jumping salmon mid-air", "#FF8C00"),
    ("stop_08", "Bigfoot admiring his brightly painted nails with delight and confidence", "#FF1493"),
    ("stop_09", "Bigfoot using chopsticks to eat a large piece of sushi with satisfaction", "#DC143C"),
    ("stop_10", "Bigfoot wearing a cowboy hat and carrying shopping bags, ready for adventure", "#8B6F47"),
    ("stop_11", "Bigfoot taking a huge bite out of an oversized taco with gusto", "#FF7F50"),
    ("stop_12", "Bigfoot sinking contentedly into a small cozy couch that's comically too small for him", "#A0826D"),
    ("stop_13", "Bigfoot petting a happy dog with hearts floating around them", "#FF9500"),
]

suffix = ", flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, square format, only 2-3 colors, clean background suitable for QR code overlay"

for name, prompt_text, bg_color in prompts:
    outfile = os.path.join(out_dir, f"{name}.png")
    if os.path.exists(outfile):
        print(f"SKIP {name} (exists)")
        continue
    
    full_prompt = f"{prompt_text}, background color {bg_color}{suffix}"
    print(f"Generating {name}...")
    
    try:
        result = client.images.generate(
            model="gpt-image-1",
            prompt=full_prompt,
            n=1,
            size="1024x1024",
            quality="high",
        )
        # gpt-image-1 returns b64_json by default
        img_data = base64.b64decode(result.data[0].b64_json)
        with open(outfile, "wb") as f:
            f.write(img_data)
        print(f"  ✓ {name}.png saved")
    except Exception as e:
        print(f"  ✗ {name} failed: {e}")
    
    time.sleep(1)  # rate limit courtesy

print("\nDone! All art backgrounds in:", out_dir)
