"""fix-tags.py — add tags: block to articles that have none (91 older hand-added entries).
Mirrors gen-batchN.py style: [<subcategory keyword>, 'AI', 'Tool']."""
import os, re, sys

SITE = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(SITE, "src", "content", "sites")

def has_tags(fm):
    return re.search(r"^tags:", fm, re.M) is not None

def sub_slug(fm):
    m = re.search(r"^subcategory:\s*([a-z0-9-]+)", fm, re.M)
    return m.group(1) if m else None

def keyword_from_slug(slug):
    if not slug:
        return "ai tool"
    parts = slug.split("-")
    # take the segment after the first dash (the specific part): ai-chat -> chat
    kw = "-".join(parts[1:]) if len(parts) > 1 else slug
    return kw.replace("-", " ")

fixed = skipped = 0
for fn in sorted(os.listdir(DIR)):
    if not fn.endswith(".md"):
        continue
    p = os.path.join(DIR, fn)
    txt = open(p, encoding="utf-8").read()
    m = re.match(r"^(---\n.*?\n---)(\n.*)$", txt, re.S)
    if not m:
        continue
    fm, rest = m.group(1), m.group(2)
    if has_tags(fm):
        continue
    slug = sub_slug(fm)
    kw = keyword_from_slug(slug)
    tags_block = "tags:\n  - %s\n  - AI\n  - Tool" % kw
    # insert after the subcategory line
    if slug and re.search(r"^subcategory:.*$", fm, re.M):
        fm2 = re.sub(r"(^subcategory:[^\n]*$)", r"\1\n" + tags_block, fm, count=1, flags=re.M)
    else:
        fm2 = fm + "\n" + tags_block
    open(p, "w", encoding="utf-8", newline="\n").write(fm2 + rest)
    fixed += 1
print(f"FIXED: {fixed} articles got tags, skipped {skipped}")
