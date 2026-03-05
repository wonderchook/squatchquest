import OpenAI from 'openai';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, 'art_backgrounds');
mkdirSync(outDir, { recursive: true });

const client = new OpenAI();

const prompts = [
  ["hub", "Bigfoot waving cheerfully with a mountain silhouette in the background", "#D4A5D9"],
  ["stop_01", "Bigfoot sniffing a single large flower with curiosity", "#9CAF88"],
  ["stop_02", "Bigfoot holding a large paintbrush in one hand and an open book in the other", "#7B68BB"],
  ["stop_03", "Bigfoot peeking mischievously over the edge of an open treasure chest", "#B8956A"],
  ["stop_04", "Bigfoot knitting with needles and yarn, with a friendly sheep standing beside him", "#E8BABA"],
  ["stop_05", "Bigfoot holding and admiring a large D20 die with joy", "#4169E1"],
  ["stop_06", "Bigfoot in a spa robe with pink hair curlers on head, admiring himself in a mirror", "#008080"],
  ["stop_07", "Bigfoot catching a large jumping salmon mid-air", "#FF8C00"],
  ["stop_08", "Bigfoot admiring his brightly painted nails with delight and confidence", "#FF1493"],
  ["stop_09", "Bigfoot using chopsticks to eat a large piece of sushi with satisfaction", "#DC143C"],
  ["stop_10", "Bigfoot wearing a cowboy hat and carrying shopping bags, ready for adventure", "#8B6F47"],
  ["stop_11", "Bigfoot taking a huge bite out of an oversized taco with gusto", "#FF7F50"],
  ["stop_12", "Bigfoot sinking contentedly into a small cozy couch that's comically too small for him", "#A0826D"],
  ["stop_13", "Bigfoot petting a happy dog with hearts floating around them", "#FF9500"],
];

const suffix = ", flat vector illustration, bold simple shapes, minimal detail, high contrast, solid color fills, no texture, no gradients, thick outlines, poster style, square format, only 2-3 colors, clean background suitable for QR code overlay";

for (const [name, promptText, bgColor] of prompts) {
  const outfile = join(outDir, `${name}.png`);
  if (existsSync(outfile)) {
    console.log(`SKIP ${name} (exists)`);
    continue;
  }

  const fullPrompt = `${promptText}, background color ${bgColor}${suffix}`;
  console.log(`Generating ${name}...`);

  try {
    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt: fullPrompt,
      n: 1,
      size: "1024x1024",
      quality: "high",
    });

    const imgData = Buffer.from(result.data[0].b64_json, 'base64');
    writeFileSync(outfile, imgData);
    console.log(`  ✓ ${name}.png saved (${(imgData.length / 1024).toFixed(0)}KB)`);
  } catch (e) {
    console.log(`  ✗ ${name} failed: ${e.message}`);
  }

  // rate limit courtesy
  await new Promise(r => setTimeout(r, 2000));
}

console.log("\nDone! Art backgrounds in:", outDir);
