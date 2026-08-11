#!/usr/bin/env node
/**
 * Re-shoot bad tool screenshots using local headless Chrome.
 * The external mshots/thum.io services run from datacenter IPs, so
 * Cloudflare-protected sites return "You have been blocked" white pages.
 * Local Chrome uses the user's residential IP → real pages render.
 *
 * Usage: node scripts/reshoot-screens.mjs [slug1 slug2 ...]
 * (no args = analyze all current screenshots and re-shoot the bad ones)
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
];
const CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!CHROME) { console.error('Chrome not found'); process.exit(1); }

const SCREENS = 'public/screens';
const BAD = process.argv.slice(2);

// ── analyze a PNG/JPEG: returns {white, black, colors, w, h} via PIL ──
function analyze(file) {
  const py = `
from PIL import Image
import sys
im = Image.open(sys.argv[1]).convert('RGB')
w, h = im.size
im2 = im.resize((64, 40))
px = list(im2.getdata())
n = len(px)
white = sum(1 for r,g,b in px if r>235 and g>235 and b>235)/n
black = sum(1 for r,g,b in px if r<25 and g<25 and b<25)/n
colors = len(set((r//32,g//32,b//32) for r,g,b in px))
print(f'{w} {h} {white:.3f} {black:.3f} {colors}')`;
  const r = spawnSync('python', ['-c', py, file], { encoding: 'utf8' });
  if (r.status !== 0) return null;
  const [w, h, white, black, colors] = r.stdout.trim().split(' ').map(Number);
  return { w, h, white, black, colors };
}

function isBad(meta) {
  if (!meta) return true;
  if (meta.w < 300 || meta.h < 150) return true;
  if (meta.white > 0.70) return true;
  return false;
}

function toJpeg(pngPath, jpgPath) {
  const py = `
from PIL import Image
import sys
im = Image.open(sys.argv[1]).convert('RGB')
im.save(sys.argv[2], 'JPEG', quality=82, optimize=True)`;
  const r = spawnSync('python', ['-c', py, pngPath, jpgPath], { encoding: 'utf8' });
  return r.status === 0;
}

// slug -> official url
const urls = {};
for (const f of readdirSync('src/content/sites')) {
  if (!f.endsWith('.md')) continue;
  const txt = readFileSync(join('src/content/sites', f), 'utf8');
  const m = txt.match(/^url:\s*(.+)$/m);
  if (m) urls[f.slice(0, -3)] = m[1].trim().replace(/^['"]|['"]$/g, '');
}

async function shoot(slug, url) {
  const tmp = join(tmpdir(), 'shotest');
  mkdirSync(tmp, { recursive: true });
  const png = join(tmp, `${slug}.png`);
  const profile = join(tmp, `prof-${slug}`);
  try {
    await run(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--disable-blink-features=AutomationControlled',
      '--no-first-run', '--no-default-browser-check',
      '--user-data-dir=' + profile,
      '--window-size=800,500',
      `--screenshot=${png}`,
      '--virtual-time-budget=15000',
      url,
    ], { timeout: 60000, windowsHide: true });
  } catch (e) {
    // chrome exits non-zero sometimes even when the screenshot is written
  }
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  if (!existsSync(png)) return { ok: false, reason: 'no-file' };
  const meta = analyze(png);
  if (!isBad(meta)) {
    const jpg = join(SCREENS, `${slug}.jpg`);
    const ok = toJpeg(png, jpg);
    try { rmSync(png, { force: true }); } catch {}
    return { ok: ok && meta, reason: ok ? 'fixed' : 'convert-fail', meta };
  }
  return { ok: false, reason: 'still-bad', meta };
}

const targets = BAD.length ? BAD : (() => {
  const slugs = [];
  for (const f of readdirSync(SCREENS)) {
    if (!f.endsWith('.jpg')) continue;
    const slug = f.slice(0, -4);
    const meta = analyze(join(SCREENS, f));
    if (isBad(meta)) slugs.push(slug);
  }
  return slugs;
})();

console.log(`Re-shooting ${targets.length} screenshots with local Chrome…\n`);
let fixed = 0, failed = [];
const CONCURRENCY = 4;
const queue = targets.map((slug) => ({ slug, url: urls[slug] }));

async function worker() {
  while (queue.length) {
    const { slug, url } = queue.shift();
    if (!url) { failed.push([slug, 'no-url']); continue; }
    const res = await shoot(slug, url);
    if (res.ok) {
      fixed++;
      console.log(`✅ ${slug}  ${res.meta.w}x${res.meta.h} white=${(res.meta.white*100).toFixed(0)}%`);
    } else {
      failed.push([slug, res.reason]);
      console.log(`❌ ${slug}  ${res.reason}`);
    }
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`\n=== FIXED: ${fixed} / ${targets.length} ===`);
if (failed.length) {
  console.log('Still bad:');
  for (const [s, r] of failed) console.log(`  ${s}  ${r}`);
}
