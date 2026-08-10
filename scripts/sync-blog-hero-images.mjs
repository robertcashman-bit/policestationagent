/**
 * Ensure every blog post in lib/blog/image-manifest.ts has a unique 1200×630
 * hero image under public/images/blog/.
 *
 * Usage:
 *   node scripts/sync-blog-hero-images.mjs              # placeholders only if missing/duplicate
 *   node scripts/sync-blog-hero-images.mjs --ai         # DALL-E 3 from manifest scene (needs OPENAI_API_KEY)
 *   node scripts/sync-blog-hero-images.mjs --ai --force # regenerate all via DALL-E
 *   node scripts/sync-blog-hero-images.mjs --slug=my-post-slug --ai
 */
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadEnv } from 'dotenv';
import OpenAI from 'openai';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'images', 'blog');
const WIDTH = 1200;
const HEIGHT = 630;
const FORCE = process.argv.includes('--force');
const USE_AI = process.argv.includes('--ai');
const SLUG_FILTER = process.argv.find((a) => a.startsWith('--slug='))?.slice('--slug='.length);

loadEnv({ path: join(ROOT, '.env.local') });
loadEnv({ path: join(ROOT, '.env') });

function loadManifest() {
  const json = execSync(
    `npx tsx -e "import { BLOG_IMAGE_MANIFEST } from './lib/blog/image-manifest.ts'; process.stdout.write(JSON.stringify(BLOG_IMAGE_MANIFEST));"`,
    { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] },
  );
  return JSON.parse(json.trim());
}

function slugColors(slug) {
  const hash = createHash('sha256').update(slug).digest();
  const hue1 = Math.round((hash[0] / 255) * 360);
  const hue2 = Math.round(((hash[1] / 255) * 360 + 40) % 360);
  const sat = 45 + (hash[2] % 30);
  const light1 = 28 + (hash[3] % 18);
  const light2 = 42 + (hash[4] % 20);
  const seed = hash[5];
  return {
    c1: `hsl(${hue1}, ${sat}%, ${light1}%)`,
    c2: `hsl(${hue2}, ${sat + 8}%, ${light2}%)`,
    angle: 30 + (hash[6] % 120),
    accent: `hsl(${(hue1 + 180) % 360}, 55%, 62%)`,
    seed,
  };
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function encodeHero(buffer, format) {
  const pipeline = sharp(buffer).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' });
  if (format === 'png') {
    return pipeline.png({ compressionLevel: 9 }).toBuffer();
  }
  return pipeline.jpeg({ quality: 85, mozjpeg: true }).toBuffer();
}

async function renderPlaceholder(slug, { alt, format }) {
  const { c1, c2, angle, accent, seed } = slugColors(slug);
  const title = escapeXml(titleFromSlug(slug));
  const subtitle = escapeXml(alt.slice(0, 90) + (alt.length > 90 ? '…' : ''));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="48" y="48" width="1104" height="534" rx="24" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
  <text x="72" y="300" fill="white" font-family="Georgia, serif" font-size="42" font-weight="700">${title}</text>
  <text x="72" y="360" fill="rgba(255,255,255,0.88)" font-family="sans-serif" font-size="22">${subtitle}</text>
  <rect x="72" y="390" width="120" height="6" rx="3" fill="${accent}"/>
  <text x="72" y="560" fill="rgba(255,255,255,0.55)" font-family="sans-serif" font-size="16">PSR Train blog</text>
  <!-- seed:${seed} slug:${escapeXml(slug)} -->
</svg>`;

  return encodeHero(Buffer.from(svg), format);
}

async function renderAi(openai, slug, { scene, format }) {
  const style =
    format === 'png'
      ? 'Clean editorial illustration, soft colours, professional training context.'
      : 'Professional documentary photography, natural lighting, UK legal setting.';
  const prompt = `${scene} ${style} No text overlays, no logos, no watermarks, no readable signs.`;

  const models = ['gpt-image-2', 'gpt-image-1.5', 'gpt-image-1'];
  let lastError;

  for (const model of models) {
    try {
      const result = await openai.images.generate({
        model,
        prompt,
        n: 1,
        size: '1536x1024',
      });

      const b64 = result.data?.[0]?.b64_json;
      const url = result.data?.[0]?.url;
      let raw;
      if (b64) {
        raw = Buffer.from(b64, 'base64');
      } else if (url) {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        raw = Buffer.from(await res.arrayBuffer());
      } else {
        throw new Error('No image data in response');
      }

      console.log(`  used model ${model}`);
      return encodeHero(raw, format);
    } catch (err) {
      lastError = err;
      if (err?.status === 400 || err?.code === 'invalid_value') {
        console.warn(`  ${model} unavailable, trying next…`);
        continue;
      }
      throw err;
    }
  }

  throw lastError ?? new Error(`No image model available for ${slug}`);
}

async function main() {
  if (USE_AI && !process.env.OPENAI_API_KEY?.trim()) {
    console.error('--ai requires OPENAI_API_KEY in .env.local');
    process.exit(1);
  }

  const openai = USE_AI ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
  const manifest = loadManifest();
  mkdirSync(OUT_DIR, { recursive: true });

  const hashes = new Map();
  let slugs = Object.keys(manifest).sort();
  if (SLUG_FILTER) {
    if (!manifest[SLUG_FILTER]) {
      console.error(`Unknown slug: ${SLUG_FILTER}`);
      process.exit(1);
    }
    slugs = [SLUG_FILTER];
  }

  let created = 0;
  let skipped = 0;

  for (const slug of slugs) {
    const meta = manifest[slug];
    const outPath = join(OUT_DIR, `${slug}.${meta.format}`);
    let needsWrite = FORCE || !existsSync(outPath);

    if (!needsWrite && existsSync(outPath)) {
      const hash = createHash('sha256').update(readFileSync(outPath)).digest('hex');
      const duplicateOf = hashes.get(hash);
      if (duplicateOf) {
        needsWrite = true;
        console.log(`regenerate ${slug}: duplicate of ${duplicateOf}`);
      } else {
        hashes.set(hash, slug);
        skipped += 1;
        continue;
      }
    }

    console.log(`${USE_AI ? 'AI' : 'placeholder'} generating ${slug}…`);
    const buffer = USE_AI
      ? await renderAi(openai, slug, meta)
      : await renderPlaceholder(slug, meta);

    const hash = createHash('sha256').update(buffer).digest('hex');
    const duplicateOf = hashes.get(hash);
    if (duplicateOf) {
      throw new Error(`Generated duplicate image for ${slug} (same as ${duplicateOf})`);
    }
    hashes.set(hash, slug);
    writeFileSync(outPath, buffer);
    created += 1;
    console.log(`wrote ${outPath} (${buffer.length} bytes)`);

    if (USE_AI && slugs.length > 1) {
      await sleep(1200);
    }
  }

  console.log(`\nDone: ${created} created/updated, ${skipped} unchanged, ${slugs.length} total`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
