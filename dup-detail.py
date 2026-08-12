"""dup-detail.py — for each duplicate-URL pair, show word count + name + featured to pick the keeper."""
import os, re, sys
from collections import defaultdict
from urllib.parse import urlsplit

SITE = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(SITE, "src", "content", "sites")

def norm_url(u):
    u = u.strip().strip('"').strip("'")
    u = u.replace("https://", "http://")
    try:
        p = urlsplit(u)
        host = (p.hostname or "").lower()
        if host.startswith("www."):
            host = host[4:]
        return (host, (p.path.rstrip("/") or "/"))
    except Exception:
        return (u.lower(), "")

def info(slug):
    txt = open(os.path.join(DIR, slug + ".md"), encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n?(.*)$", txt, re.S)
    fm, body = m.group(1), m.group(2) if m else ("", "")
    name = re.search(r"^name:\s*(.+)$", fm, re.M)
    feat = re.search(r"^featured:\s*(true|false)", fm, re.M)
    return {
        "name": name.group(1).strip().strip('"') if name else slug,
        "words": len(body.split()),
        "featured": feat.group(1) if feat else "?",
    }

by_url = defaultdict(list)
for fn in sorted(os.listdir(DIR)):
    if not fn.endswith(".md"):
        continue
    slug = fn[:-3]
    txt = open(os.path.join(DIR, fn), encoding="utf-8").read()
    m = re.search(r"^url:\s*(.+)$", txt, re.M)
    if m:
        by_url[norm_url(m.group(1))].append(slug)

for u, slugs in sorted(by_url.items()):
    if len(slugs) < 2:
        continue
    print(f"URL: {u[0]}{u[1]}")
    for s in slugs:
        i = info(s)
        print(f"   {s:35s} name={i['name'][:30]:30s} words={i['words']:5d} featured={i['featured']}")
    print()
