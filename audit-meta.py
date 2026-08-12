"""audit-meta.py — quick SEO audit of all tool articles (frontmatter + word counts)."""
import os, re, sys
from collections import Counter

SITE = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(SITE, "src", "content", "sites")

def parse(fn):
    txt = open(fn, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", txt, re.S)
    if not m:
        return {}, ""
    fm, body = m.group(1), m.group(2)
    data = {}
    key = None
    for line in fm.splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        lm = re.match(r"^([A-Za-z_]+):\s*(.*)$", line)
        if lm:
            key = lm.group(1); data[key] = lm.group(2).strip()
        elif line.startswith("- ") and key == "tags":
            data.setdefault("tags_list", []).append(line[2:].strip().strip('"'))
    return data, body

rows = []
for fn in sorted(os.listdir(DIR)):
    if not fn.endswith(".md"):
        continue
    slug = fn[:-3]
    data, body = parse(os.path.join(DIR, fn))
    words = len(body.split())
    title = data.get("metaTitle") or f'{data.get("name", slug)} — Review & Guide | bla5k'
    desc = data.get("metaDescription") or data.get("tagline", "")
    rows.append({"slug": slug, "words": words, "title": title, "title_len": len(title),
                 "desc": desc, "desc_len": len(desc), "has_url": "url" in data,
                 "has_tagline": bool(data.get("tagline")), "has_image": bool(data.get("image")),
                 "has_screen": bool(data.get("screenshot")), "tags": data.get("tags_list", [])})

n = len(rows)
print(f"total articles: {n}")
wc = Counter(r["words"] // 100 * 100 for r in rows)
print("\nword count buckets (>=):")
for k in sorted(wc):
    print(f"  {k:>4}+ words: {wc[k]}")

print("\ntitle length > 65 chars:")
for r in rows:
    if r["title_len"] > 65:
        print(f"  {r['slug']}: {r['title_len']} :: {r['title'][:90]}")

print("\ndescription length > 165 chars:")
cnt = 0
for r in rows:
    if r["desc_len"] > 165:
        cnt += 1
        if cnt <= 15:
            print(f"  {r['slug']}: {r['desc_len']} :: {r['desc'][:100]}")
if cnt > 15: print(f"  ... and {cnt-15} more")

print("\ndescription too short (< 50 chars):")
cnt = 0
for r in rows:
    if r["desc_len"] < 50:
        cnt += 1
        if cnt <= 15:
            print(f"  {r['slug']}: {r['desc_len']} :: {r['desc'][:80]}")
if cnt > 15: print(f"  ... and {cnt-15} more")

print("\nmissing fields:")
for f in ["has_url", "has_tagline", "has_image", "has_screen"]:
    miss = [r["slug"] for r in rows if not r[f]]
    print(f"  {f}: {len(miss)} missing {miss[:8]}{'...' if len(miss)>8 else ''}")

print("\narticles with zero tags:")
z = [r["slug"] for r in rows if not r["tags"]]
print(f"  {len(z)} {z[:10]}{'...' if len(z)>10 else ''}")

print("\nduplicate exact titles (non-default):")
titles = Counter(r["title"] for r in rows if not r["title"].endswith("Review & Guide | bla5k"))
for t, c in titles.most_common(10):
    if c > 1:
        print(f"  x{c}: {t[:80]}")

print("\nvery short articles (< 200 words) — thin content risk:")
thin = [r for r in rows if r["words"] < 200]
print(f"  {len(thin)} articles under 200 words")
for r in sorted(thin, key=lambda x: x["words"])[:15]:
    print(f"  {r['slug']}: {r['words']}w")
