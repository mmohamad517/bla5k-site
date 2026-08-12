"""pixel-check.py — final pixel sweep on public/screens: drop blank/blocked shots
(mirrors auto-import.py shoot_screens final check: white ratio > 0.94 -> remove)."""
import os, sys
sys.stdout.reconfigure(encoding="utf-8", errors="replace")
from PIL import Image

SITE = os.path.dirname(os.path.abspath(__file__))
SCR = os.path.join(SITE, "public/screens")

dropped = kept = 0
for f in sorted(os.listdir(SCR)):
    if not f.endswith(".jpg"):
        continue
    p = os.path.join(SCR, f)
    try:
        im = Image.open(p).convert("RGB")
        im2 = im.resize((64, 40))
        px = list(im2.getdata())
        n = len(px)
        white = sum(1 for r, g, b in px if r > 235 and g > 235 and b > 235) / n
    except Exception as e:
        print(f"[x] {f}: unreadable ({e}) - removing")
        os.remove(p)
        dropped += 1
        continue
    if white > 0.94:
        os.remove(p)
        dropped += 1
        print(f"[x] blank shot removed: {f} (white={white:.2f})")
    else:
        kept += 1
print(f"DONE: {kept} kept, {dropped} dropped")
