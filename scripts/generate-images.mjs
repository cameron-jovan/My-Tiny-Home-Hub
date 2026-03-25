/**
 * Gemini Imagen — Hero image generator for My Tiny Home Hub
 * Run: node scripts/generate-images.mjs
 */
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public', 'images');
mkdirSync(PUBLIC, { recursive: true });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error('❌ GEMINI_API_KEY not set'); process.exit(1); }

const ai = new GoogleGenerativeAI(API_KEY);

const IMAGES = [
  {
    file: 'hero-home.jpg',
    prompt: 'A stunning aerial photograph of a beautifully designed modern tiny home on wheels parked in a lush mountain meadow at golden hour, surrounded by pine trees, snow-capped peaks in the background, warm interior lights glowing through the windows, professional real estate photography, 8K ultra detailed, cinematic lighting',
  },
  {
    file: 'hero-list.jpg',
    prompt: 'A beautifully staged modern tiny home interior with exposed wood beams, large windows showing a forest view, a cozy loft bedroom, minimal Scandinavian decor, warm Edison bulb lighting, professional architectural photography, ultra-sharp, golden hour light streaming in',
  },
  {
    file: 'hero-concierge.jpg',
    prompt: 'A luxury tiny home community at dusk, multiple architecturally stunning tiny homes with large glass walls, solar panels on roofs, surrounded by mature trees and landscaping, warm exterior lighting, aerial perspective, magazine quality real estate photography',
  },
  {
    file: 'hero-browse.jpg',
    prompt: 'Row of diverse beautiful tiny homes for sale: a THOW with cedar siding, a container home conversion, an ADU backyard suite, and an off-grid cabin, each uniquely designed, photographed in bright daylight from the front, real estate listing style photography, professional quality',
  },
  {
    file: 'hero-guides.jpg',
    prompt: 'A peaceful off-grid tiny home with solar panels on the roof, a small vegetable garden, rainwater collection system, surrounded by wildflowers and mountains, morning mist, lifestyle photography, beautiful natural light, aspirational tiny living aesthetic',
  },
  {
    file: 'hero-blog.jpg',
    prompt: 'A person sitting on the porch of a cozy tiny home in the forest, reading a book, coffee mug in hand, warm afternoon light filtering through the trees, tiny home lifestyle photography, editorial magazine style, candid and aspirational',
  },
];

async function generateImage(prompt, filePath) {
  // Imagen 4.0 Fast via REST predict endpoint
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${API_KEY}`;
  const body = JSON.stringify({
    instances: [{ prompt }],
    parameters: { sampleCount: 1, aspectRatio: '16:9' },
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status}: ${err.slice(0, 200)}`);
  }

  const json = await res.json();
  const prediction = json.predictions?.[0];
  if (!prediction?.bytesBase64Encoded) return false;

  const buf = Buffer.from(prediction.bytesBase64Encoded, 'base64');
  writeFileSync(filePath, buf);
  return true;
}

console.log('🎨 Generating hero images with Gemini...\n');
for (const img of IMAGES) {
  const dest = join(PUBLIC, img.file);
  process.stdout.write(`  → ${img.file} … `);
  try {
    const ok = await generateImage(img.prompt, dest);
    console.log(ok ? '✅' : '⚠️  No image in response');
  } catch (err) {
    console.log(`❌ ${err.message}`);
  }
}
console.log('\n✅ Done — images saved to public/images/');
