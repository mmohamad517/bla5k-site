# -*- coding: utf-8 -*-
"""WebP vs original JPG quality comparison on a sample of screenshots."""
import os, subprocess, random, re
import numpy as np
from PIL import Image

SITE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(SITE, 'public', 'screens')
ORIG = os.path.join(SITE, '.freebuff', 'imgcheck', 'orig')
os.makedirs(ORIG, exist_ok=True)
PREV = 'a857d6f4^'

def psnr(a, b):
    mse = np.mean((a.astype(np.float64) - b.astype(np.float64)) ** 2)
    if mse == 0:
        return 99.9
    return 10 * np.log10(255.0 ** 2 / mse)

def ssim(g1, g2, win=8):
    """Uniform-window SSIM on float grayscale 0..255."""
    def box_sum(x):
        cs = np.cumsum(np.cumsum(x, axis=0), axis=1)
        out = np.zeros_like(x)
        out[win-1:, win-1:] = (cs[win-1:, win-1:] - np.pad(cs[:-win, win-1:], ((1,0),(0,0)))
                               - np.pad(cs[win-1:, :-win], ((0,0),(1,0)))
                               + np.pad(cs[:-win, :-win], ((1,0),(1,0))))
        return out
    C1, C2 = (0.01*255)**2, (0.03*255)**2
    mu1, mu2 = box_sum(g1)/win**2, box_sum(g2)/win**2
    s1, s2 = box_sum(g1*g1)/win**2 - mu1**2, box_sum(g2*g2)/win**2 - mu2**2
    s12 = box_sum(g1*g2)/win**2 - mu1*mu2
    valid = (s1 + s2 + C2) > 0
    num = (2*mu1*mu2 + C1) * (2*s12 + C2)
    den = (mu1**2 + mu2**2 + C1) * (s1 + s2 + C2)
    m = np.divide(num, den, out=np.ones_like(num), where=valid)
    h, w = g1.shape
    return float(m[win-1:h-win+1, win-1:w-win+1].mean())

def sobel_energy(g):
    g = g.astype(np.float32)
    gx = np.abs(np.diff(g, axis=1))
    gy = np.abs(np.diff(g, axis=0))
    e = np.zeros_like(g, dtype=np.float32)
    e[:, :-1] += gx; e[:-1, :] += gy
    return e

# ---- pick sample: deterministic random over all webp files ----
webps = sorted(f for f in os.listdir(SCR) if f.endswith('.webp'))
random.seed(42)
sample = random.sample(webps, 26)

rows = []
missing = []
for f in sample:
    slug = f[:-5]
    orig_path = os.path.join(ORIG, slug + '.jpg')
    if not os.path.exists(orig_path):
        r = subprocess.run(['git', '-C', SITE, 'show', f'{PREV}:public/screens/{slug}.jpg'],
                           capture_output=True, cwd=SITE)
        if r.returncode != 0 or len(r.stdout) == 0:
            missing.append(slug)
            continue
        with open(orig_path, 'wb') as fh:
            fh.write(r.stdout)
    try:
        o = Image.open(orig_path).convert('RGB')
        w = Image.open(os.path.join(SCR, f)).convert('RGB')
    except Exception as e:
        missing.append(slug + ':' + str(e)[:40])
        continue
    if o.size != w.size:
        missing.append(slug + ':size-mismatch')
        continue
    oa = np.asarray(o); wa = np.asarray(w)
    go = np.asarray(o.convert('L'), dtype=np.float32)
    gw = np.asarray(w.convert('L'), dtype=np.float32)
    ps = psnr(oa, wa)
    ss = ssim(go, gw)
    eo, ew = sobel_energy(go), sobel_energy(gw)
    # text edges = pixels in top 8% gradient of ORIGINAL
    thr = np.quantile(eo, 0.92)
    mask = eo >= thr
    edge_psnr = psnr(go[mask], gw[mask]) if mask.sum() > 100 else 0
    edge_ratio = float(ew[mask].sum() / max(eo[mask].sum(), 1e-6))
    kb_o = os.path.getsize(orig_path) / 1024
    kb_w = os.path.getsize(os.path.join(SCR, f)) / 1024
    rows.append((slug, kb_o, kb_w, ps, ss, edge_psnr, edge_ratio))

print(f'sample: {len(rows)} compared | skipped: {len(missing)}')
for m in missing[:5]:
    print('  skip:', m)
print()
print(f"{'file':<36} {'JPG KB':>7} {'WEBP KB':>8} {'-size%':>6} {'PSNR':>6} {'SSIM':>6} {'edgePSNR':>8} {'edgeKeep':>8}")
avg = [0.0]*7
for slug, kb_o, kb_w, ps, ss, ep, er in rows:
    print(f'{slug:<36} {kb_o:>7.1f} {kb_w:>8.1f} {100*(1-kb_w/kb_o):>5.1f}% {ps:>6.2f} {ss:>6.4f} {ep:>8.1f} {er:>7.2f}x')
    for i, v in enumerate((kb_o, kb_w, ps, ss, ep, er, 100*(1-kb_w/kb_o))):
        avg[i] += v
n = len(rows)
print('-' * 100)
print(f"{'AVERAGE':<36} {avg[0]/n:>7.1f} {avg[1]/n:>8.1f} {avg[6]/n:>5.1f}% {avg[2]/n:>6.2f} {avg[3]/n:>6.4f} {avg[4]/n:>8.1f} {avg[5]/n:>7.2f}x")
