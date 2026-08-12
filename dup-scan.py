"""dup-scan.py — find duplicate tool entries: same normalized URL, same name, same slug."""
import os, re, sys
from collections import defaultdict
from urllib.parse import urlsplit

SITE = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(SITE, "src", "content", "sites")

def norm_url(u):
    u = u.strip().strip('"').strip("'")
    u = u.replace("https://", "http://")  # scheme-agnostic
    try:
        p = urlsplit(u)
        host = p.hostname or ""
        host = host.lower()
        if host.startswith("www."):
            host = host[4:]
        path = p.path.rstrip("/") or "/"
        return (host, path)
    except Exception:
        return (u.lower(), "")

by_url = defaultdict(list)
by_name = defaultdict(list)
for fn in sorted(os.listdir(DIR)):
    if not fn.endswith(".md"):
        continue
    slug = fn[:-3]
    txt = open(os.path.join(DIR, fn), encoding="utf-8").read()
    m = re.search(r"^url:\s*(.+)$", txt, re.M)
    n = re.search(r"^name:\s*(.+)$", txt, re.M)
    url = norm_url(m.group(1)) if m else None
    name = (n.group(1).strip().strip('"') if n else slug).lower()
    if url:
        by_url[url].append((slug, name))
    by_name[name].append(slug)

print("=== DUPLICATE URLS (normalized) ===")
dups = 0
for u, items in sorted(by_url.items()):
    if len(items) > 1:
        dups += 1
        print(f"  {u[0]}{u[1]}: {', '.join(s for s, _ in items)}")
if not dups:
    print("  none")

print("=== DUPLICATE NAMES (lowercased) ===")
ndups = 0
for name, slugs in sorted(by_name.items()):
    if len(slugs) > 1:
        ndups += 1
        print(f"  '{name}': {', '.join(slugs)}")
if not ndups:
    print("  none")
