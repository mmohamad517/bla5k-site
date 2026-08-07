# Import Plan — topai.tools full list (2,663 rows → bla5k)

Master tracker for importing the user's complete topai.tools export.
Source: `D:\مشرروع screapping\web-scraper-tool\topai_tools_كامل.xlsx` (the txt export was
empty — all data lives in the xlsx). Parsed & cleaned 2026-08-07.
Working CSVs live in the scraper folder (`clean_tools.csv`, `grouped_final.csv`,
`batches/batch-01..30.csv`, `livecheck_result.csv`).

## Source stats

| Metric | Count |
|---|---|
| Total rows in xlsx | 2,663 |
| Category/navigation rows (removed) | 26 |
| Tool rows | 2,637 |
| In-list duplicates (title+slug) — merged | 4 groups (8 rows → 4 kept) |
| Already on bla5k (removed) | 23 |
| Policy violations (removed) | 10 |
| **Final clean list** | **2,605** |

## Already on bla5k (SKIP — 23)

Spline, PaperClip, agenticSeek, MiniMax, MuleRun, LlamaIndex, CrewAI, Runable,
Deepseek, Meta AI, Qwen Chat, GlobalGPT, Claude AI, Google Gemini, MyEdit,
Hotbot, Voiceflow, Chathub, Notbot, Claude Code, Coddy, Pi智能演示文档, Runable (dup).

## Policy skips (removed — 10)

- **RTA.POKER** — poker software (gambling).
- **AIRunner** (Hotchat) — NSFW chat platform.
- **bottr.me** — uncensored chatbot.
- **ChatPersona AI** — OnlyFans subscriber engagement.
- **uncensored.com** — uncensored AI chat.
- **Dirty talking AI** — adult chat catalog.
- **Spicy AI** — NSFW chat.
- **VMate AI** — NSFW anime chatbots.
- **TavernAI** — NSFW-adjacent roleplay frontend.
- **Beducated** — AI sex coach.

KEPT despite keyword hits (they are *detection* tools, policy-safe):
NSFW JS, Is This Image NSFW?, Finned, Ellydee AI.

## Batch plan (30 batches — see `batches/batch-XX.csv` in scraper folder)

| # | Count | Focus |
|---|---|---|
| 01 | 88 | 3D (85) + agents |
| 02 | 88 | AI Agents |
| 03 | 88 | AI Agents |
| 04 | 88 | AI Agents + AI detection |
| 05 | 88 | Assistants + AI detection |
| 06 | 88 | Assistants |
| 07 | 88 | Assistants |
| 08 | 88 | Assistants |
| 09 | 88 | Assistants |
| 10 | 88 | Automation + assistants + automotive + audio |
| 11 | 88 | Avatars + builders |
| 12 | 88 | Builders |
| 13 | 88 | Business + builders |
| 14 | 88 | Chat + business |
| 15 | 88 | Coaching + chat |
| 16 | 88 | Content creation + coaching |
| 17 | 88 | Content creation + copywriting |
| 18 | 88 | Copywriting + customer support |
| 19 | 88 | Customer support + design |
| 20 | 88 | Design + generation + developer |
| 21 | 88 | Generation + management |
| 22 | 88 | Management |
| 23 | 88 | Management + marketing |
| 24 | 88 | Marketing |
| 25 | 88 | Other + marketing |
| 26 | 88 | Planning + resources + other |
| 27 | 88 | Resources + sales |
| 28 | 88 | Sales + web3 + verification |
| 29 | 88 | Writing + web3 |
| 30 | 53 | Writing |

## Status

- ✅ List parsed, deduped, policy-filtered, categorized (2,605 clean)
- 🔄 Live link check running (topai `go/` redirects → official domains)
- ⬜ Batches 1–30 pending import (one batch per session, start at 01)
