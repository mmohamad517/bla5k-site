"""shoot-missing.py — capture missing screenshots for batches 11-30 via reshoot-screens.mjs."""
import os, subprocess, sys

SITE = os.path.dirname(os.path.abspath(__file__))
SCRAPER = r"D:\مشاريعي\مشرروع screapping\web-scraper-tool"

import pandas as pd

missing = []
for b in range(11, 31):
    csv = os.path.join(SCRAPER, "batches_final", f"batch-{b:02d}.csv")
    if not os.path.exists(csv):
        continue
    df = pd.read_csv(csv)
    for _, r in df.iterrows():
        slug = str(r["slug"]).strip()
        if str(r.get("status", "")) == "http404":
            continue
        if not os.path.exists(os.path.join(SITE, "src/content/sites", f"{slug}.md")):
            continue
        if not os.path.exists(os.path.join(SITE, "public/screens", f"{slug}.jpg")):
            missing.append(slug)

print(f"[{len(missing)}] missing screenshots — launching reshoot-screens.mjs", flush=True)
with open(os.path.join(SITE, "screens-missing.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(missing))

code = subprocess.run(
    ["node", "scripts/reshoot-screens.mjs"] + missing,
    cwd=SITE, shell=False,
).returncode
print(f"reshoot-screens.mjs exit={code}", flush=True)

# second pass: retry-shot.mjs for stragglers
still = []
for slug in missing:
    if not os.path.exists(os.path.join(SITE, "public/screens", f"{slug}.jpg")):
        still.append(slug)
if still:
    print(f"[{len(still)}] stragglers — retry-shot.mjs", flush=True)
    subprocess.run(["node", "scripts/retry-shot.mjs"] + still, cwd=SITE, shell=False)

ok = sum(1 for s in missing if os.path.exists(os.path.join(SITE, "public/screens", f"{s}.jpg")))
print(f"DONE: {ok}/{len(missing)} screenshots captured", flush=True)
