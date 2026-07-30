import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public', 'og-image.png');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#121629"/><stop offset="1" stop-color="#1e2442"/>
    </linearGradient>
    <radialGradient id="p" cx="18%" cy="15%" r="55%">
      <stop offset="0" stop-color="#b537ff" stop-opacity="0.35"/><stop offset="1" stop-color="#b537ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="c" cx="88%" cy="20%" r="55%">
      <stop offset="0" stop-color="#00f0ff" stop-opacity="0.30"/><stop offset="1" stop-color="#00f0ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00f0ff"/><stop offset="0.5" stop-color="#70f3ff"/><stop offset="1" stop-color="#b537ff"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#p)"/>
  <rect width="1200" height="630" fill="url(#c)"/>

  <!-- compass -->
  <g transform="translate(940,315)">
    <circle r="150" fill="none" stroke="rgba(112,243,255,0.18)" stroke-width="2"/>
    <circle r="120" fill="none" stroke="rgba(181,55,255,0.25)" stroke-width="2" stroke-dasharray="6 12"/>
    <polygon points="0,-135 18,0 0,18 -18,0" fill="url(#grad)"/>
    <polygon points="0,135 -18,0 0,-18 18,0" fill="#b537ff" opacity="0.8"/>
    <circle r="13" fill="#eaf0ff"/>
  </g>

  <!-- brand -->
  <g transform="translate(90,150)">
    <text x="0" y="0" font-family="Arial, sans-serif" font-size="26" letter-spacing="6" fill="#70f3ff" font-weight="700">◆ THE INTERNET, CURATED</text>
    <text x="0" y="90" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="#eaf0ff">Unveil the Internet’s</text>
    <text x="0" y="185" font-family="Arial, sans-serif" font-size="82" font-weight="800" fill="url(#grad)">Best Treasures</text>
    <text x="0" y="270" font-family="Arial, sans-serif" font-size="34" fill="#a5b0d0">5 tools to discover new worlds — bla5k.com</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('OG image written to', out);
