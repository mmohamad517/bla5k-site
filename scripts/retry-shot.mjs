#!/usr/bin/env node
/**
 * Targeted retry for stubborn screenshots: masked UA (Chrome on Windows),
 * longer virtual-time budget, and www/https variants fallback.
 * Usage: node scripts/retry-shot.mjs slug1 slug2 ...
 */
import { execFile, spawnSync } from 'node:child_process';
import { promisify } from 'node:util';
import { readFileSync, readdirSync, existsSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = promisify(execFile);
const CHROME_CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
];
const CHROME = CHROME_CANDIDATES.find((p) => existsSync(p));
if (!CHROME) { console.error('Chrome not found'); process.exit(1); }

const SCREENS = 'public/screens';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

const slugs = process.argv.slice(2);

async function shoot(slug, url, budget) {
  const tmp = join(tmpdir(), 'shotretry');
  mkdirSync(tmp, { recursive: true });
  const png = join(tmp, `${slug}.png`);
  const profile = join(tmp, `prof-${slug}`);
  try {
    await run(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars',
      '--disable-blink-features=AutomationControlled',
      '--no-first-run', '--no-default-browser-check',
      `--user-agent=${UA}`,
      '--user-data-dir=' + profile,
      '--window-size=800,500',
      `--screenshot=${png}`,
      `--virtual-time-budget=${budget}`,
      url,
    ], { timeout: 90000, windowsHide: true });
  } catch (e) { /* chrome may exit non-zero but still write */ }
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  return existsSync(png) ? png : null;
}

function analyze(png) {
  const py = `
from PIL import Image
import sys
im = Image.open(sys.argv[1]).convert('RGB')
im2 = im.resize((64, 40)); px = list(im2.getdata()); n = len(px)
white = sum(1 for r,g,b in px if r>235 and g>235 and b>235)/n
colors = len(set(px))
print(f'{white:.3f}|{colors}')`;
  const r = spawnSync('python', ['-c', py, png], { windowsHide: true });
  if (r.status !== 0) return null;
  const [white, colors] = String(r.stdout).trim().split('|').map(Number);
  return { white, colors };
}
function isBad(m) { return m && (m.white > 0.9 || m.colors < 6); }

function toJpeg(png, slug) {
  const py = `
from PIL import Image
import sys
im = Image.open(sys.argv[1]).convert('RGB')
im.thumbnail((800, 500), Image.LANCZOS)
canvas = Image.new('RGB', (800, 500), (20, 24, 48))
canvas.paste(im, ((800 - im.width) // 2, (500 - im.height) // 2))
canvas.save(sys.argv[2], 'JPEG', quality=82, optimize=True)`;
  const r = spawnSync('python', ['-c', py, png, join(SCREENS, slug + '.jpg')], { windowsHide: true });
  return r.status === 0;
}

// load urls from site files
const urls = {};
for (const f of readdirSync('src/content/sites')) {
  if (!f.endsWith('.md')) continue;
  const txt = readFileSync(join('src/content/sites', f), 'utf8');
  const m = txt.match(/^url:\s*(.+)$/m);
  if (m) urls[f.slice(0, -3)] = m[1].trim().replace(/^['"]|['"]$/g, '');
}

let ok = 0;
for (const slug of slugs) {
  const base = urls[slug];
  if (!base) { console.log(`❌ ${slug} no-url`); continue; }
  const variants = [];
  const first = /^https?:\/\//.test(base) ? base : 'https://' + base;
  variants.push(first);
  if (first.startsWith('https://')) variants.push(first.replace('https://', 'http://'));
  if (!first.includes('www.')) variants.push(first.replace('://', '://www.'));
  let got = null;
  for (const v of [...new Set(variants)]) {
    for (const budget of [25000, 40000]) {
      got = await shoot(slug, v, budget);
      if (got) break;
    }
    if (got) break;
  }
  if (!got) { console.log(`❌ ${slug} no-file (all variants)`); continue; }
  const meta = analyze(got);
  if (!meta || isBad(meta)) { console.log(`❌ ${slug} block-page (white=${meta ? (meta.white*100).toFixed(0) : '?'}%)`); try { rmSync(got, { force: true }); } catch {} continue; }
  if (toJpeg(got, slug)) {
    ok++;
    console.log(`✅ ${slug}`);
  } else {
    console.log(`❌ ${slug} convert-fail`);
  }
  try { rmSync(got, { force: true }); } catch {}
}
console.log(`\n=== FIXED: ${ok} / ${slugs.length} ===`);
