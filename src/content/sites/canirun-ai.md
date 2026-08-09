---
name: CanIRun.ai
url: https://www.canirun.ai
image: /logos/canirun-ai.png
screenshot: /screens/canirun-ai.jpg
subcategory: dev-play
tagline: Find out which AI models your machine can actually run — a free browser tool that detects your hardware and scores local LLM compatibility.
tags:
  - local llm
  - gpu checker
  - vram calculator
  - model compatibility
  - browser tool
  - webgpu
  - hardware detection
  - ai models
featured: false
updated: 2026-08-01
metaTitle: "CanIRun.ai: Which AI Models Can Your PC Run? (2026 Guide)"
metaDescription: A complete guide to CanIRun.ai — the free browser tool that detects your GPU, CPU, and RAM and tells you which local AI models your machine can run and how fast.
simple: "A free tool that checks your computer's hardware and tells you which AI models you can run locally — no downloads, everything happens in your browser."
example: "Before downloading a 7B model, open CanIRun.ai — it detects your GPU and tells you if the model fits in your VRAM and roughly how fast it will run."
goodFor:
  - "People running local LLMs who want to know what their hardware can handle"
  - "Choosing quantizations and models before downloading"
  - "Privacy-conscious users (everything runs in-browser)"
notFor:
  - "You only use cloud AI (no local models)"
  - "You need a company-backed, audited tool"
  - "You want a heavy installed application"
faqs:
  - q: What is CanIRun.ai?
    a: CanIRun.ai is a free, browser-based tool that detects your GPU, CPU, and RAM and tells you which local AI models (with which quantizations) your machine can run and how fast. Everything is computed client-side — no data is sent to a server.
  - q: Is canirunai.com the real site?
    a: No — that domain is parked at IONOS. The working tool is at canirun.ai.
  - q: Does CanIRun.ai send my hardware info to a server?
    a: No — detection and scoring run entirely in your browser; no data is uploaded.
  - q: How accurate is the VRAM estimate?
    a: "It's a guideline: it adds a 0.5 GB runtime overhead plus a 10% safety margin, but real performance depends on thermals, drivers, and background processes the browser can't measure."
  - q: What features does it have?
    a: Hardware detection via WebGL/WebGPU/Navigator APIs, a GPU database, per-quantization VRAM requirements, model scoring (S/A/B/C/D/F), a model compare page, and a browser playground for WebGPU in-browser inference.
  - q: Who runs CanIRun.ai?
    a: The developer isn't documented on the site; it appears to be an independent project with no company backing. It's functional and transparent, but treat it as an unverified individual project.
---

**CanIRun.ai** answers a question every local-AI user asks: *can my machine actually run this model?* It's a free, browser-based checker that detects your hardware and tells you exactly which local AI models your PC can handle — and roughly how fast. In this guide we'll cover what it is, how it works, its features, and its honest limitations.

## What is CanIRun.ai?

CanIRun.ai is a **free, browser-based tool** that detects your GPU, CPU, and RAM and tells you which local AI models — and which quantizations — your machine can run, plus an estimate of speed. Everything is computed **client-side**: no data is sent to any server. You open the site, it reads your hardware via browser APIs, and it gives you a compatibility report.

**Important:** the domain in some lists, `canirunai.com`, is a parked IONOS domain serving no website. The working tool is **canirun.ai**.

## Who creates CanIRun.ai?

The developer is not documented on the site — it appears to be an independent project with **no company backing** and no pricing page. **Reliability note:** it's functional and notably transparent about its methodology, but it's an individual project without a formal organization, so treat it as unverified at the corporate level.

## How CanIRun.ai works

The tool is refreshingly simple:

1. **Open the site** — canirun.ai.
2. **It detects your hardware** — via WebGL, WebGPU, and Navigator APIs.
3. **It checks models** — against its built-in GPU database (~40 GPUs, ~12 Apple Silicon chips) and current model list (Llama 3.1, Qwen 3.5, Phi-4, GPT-OSS, Gemma 3, and more).
4. **It estimates VRAM** — per-quantization requirements, with a 0.5 GB overhead plus 10% safety margin.
5. **It scores** — each model gets a grade (S/A/B/C/D/F) and tier.
6. **You decide** — compare models and pick what fits.

It also has a **Playground** — WebGPU in-browser LLM inference — so you can try models directly in the browser.

## Key features of CanIRun.ai

- **Hardware detection** — GPU/CPU/RAM via WebGL, WebGPU, Navigator APIs.
- **GPU database** — ~40 GPUs and ~12 Apple Silicon chips.
- **Per-quantization VRAM requirements** — know before you download.
- **Model scoring** — S/A/B/C/D/F grades and tier list.
- **Model Compare** — side-by-side comparisons.
- **Browser Playground** — WebGPU in-browser inference.
- **Docs and glossary** — quantization, VRAM, context explained.
- **Transparency page** — methodology and estimation limits documented.
- **100% client-side** — no data uploaded.

## What can you use CanIRun.ai for?

- **Choosing a model** — before downloading, check it fits your hardware.
- **Picking quantizations** — find the right balance of size and quality.
- **Upgrade decisions** — see what new GPUs would unlock.
- **Trying in-browser inference** — the Playground for WebGPU models.

## Pricing: what does CanIRun.ai cost?

CanIRun.ai is **completely free** — no paid tiers exist on the site.

## Integrations

- **Runners** — links out to llama.cpp, Ollama, and LM Studio for actually running models.

## Who is CanIRun.ai for?

CanIRun.ai is aimed at **people running local AI models** who want to know what their hardware can handle before committing downloads and disk space. It's a fit for:

- **Local LLM enthusiasts** — Ollama, llama.cpp, LM Studio users.
- **Upgraders** — deciding whether to buy more GPU.
- **Curious users** — who want to know if local AI is viable for them.

## Advantages of CanIRun.ai

- **Free** — no cost, no account.
- **Private** — 100% client-side, no data leaves your browser.
- **Practical** — answers the exact question before you download a multi-GB model.
- **Transparent** — documented methodology and limits.
- **Current** — continuously updated model list.

## Limitations and honest considerations

- **Estimates, not guarantees** — real performance depends on thermals, drivers, and background processes.
- **Individual project** — no company backing or third-party audit.
- **Not a runner** — it checks compatibility; you still need Ollama/llama.cpp to actually run models.

## Security and privacy

CanIRun.ai is strong on privacy by design: **everything runs in your browser** and nothing is uploaded. That's genuinely rare and admirable. The trade-off is organizational: it's an individual project without a formal entity or security audit, so there's no corporate accountability layer.

## Getting started with CanIRun.ai

1. **Open canirun.ai** — no signup needed.
2. **Let it detect your hardware** — instant read of your GPU/CPU/RAM.
3. **Check models** — see scores and VRAM requirements.
4. **Compare** — use the Compare page to shortlist.
5. **Run** — download via Ollama/llama.cpp/LM Studio and try it.

## The bottom line

CanIRun.ai is a genuinely useful, privacy-respecting free tool for the local-AI crowd — it tells you instantly which models your hardware can run, right in the browser, with nothing uploaded. Its honest limitations (estimates, individual-maintainer) are disclosed transparently. If you run local models, it's worth bookmarking before your next big download.

To discover more developer tools and utilities, browse our [Developer Tools](/category/developer/) and [Handy Utilities](/category/utilities/) categories, or explore the full [bla5k directory](/directory/).

*Official resource: the [CanIRun.ai website](https://www.canirun.ai).*
