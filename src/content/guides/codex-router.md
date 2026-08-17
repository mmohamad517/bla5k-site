---
title: "Codex Router: Run Kimi, Grok, Claude & DeepSeek Inside OpenAI Codex (2026)"
description: "Codex Router is a free, open-source local router that lets you run Kimi, Grok, Claude, and DeepSeek models inside Codex App and CLI with isolated credentials. Setup guide."
keyword: "codex router"
tags: ["codex router", "codex", "kimi codex", "grok codex", "deepseek codex", "anthropic codex", "open source ai router", "ai cli tools"]
category: "developer"
author: "bla5k"
published: 2026-08-15
featured: false
faqs:
  - q: "What is Codex Router?"
    a: "Codex Router is a free, open-source local router that lets you use external AI models — Kimi, Grok, Anthropic Claude, DeepSeek, GLM, Qwen, and more — inside OpenAI Codex App and Codex CLI. It merges those models into Codex's native model picker while keeping each provider's credentials isolated."
  - q: "Is Codex Router free?"
    a: "Yes, Codex Router is completely free and open-source. The only cost is the API usage of the models you route through it — your Kimi, DeepSeek, or Grok subscription or API credits."
  - q: "Which AI apps support Codex Router?"
    a: "Codex Router officially supports the Codex App and Codex CLI (stable), and experimentally supports Cursor through a manual OpenAI-compatible base URL configuration."
  - q: "How do I install Codex Router?"
    a: "Clone the official GitHub repository (github.com/duolahypercho/codex-router), follow the guided setup, authenticate with OAuth or API keys, and start routing external models into Codex's model picker."
  - q: "How does Codex Router keep my keys safe?"
    a: "Codex Router uses credential isolation — each provider's OAuth session or API key is kept separate, so switching models inside Codex never mixes or leaks credentials across providers."
---

# Codex Router: Run Kimi, Grok, Claude & DeepSeek Inside OpenAI Codex in 2026

OpenAI Codex is one of the most powerful AI coding agents available in 2026 — but it ships locked to OpenAI's models. If you already pay for Kimi, Grok, or Claude, running them inside Codex seemed impossible without messy manual proxies. **Codex Router** fixes that: it is a free, open-source local router that brings Kimi, Grok, Anthropic Claude, DeepSeek, GLM, Qwen, and other external models straight into the Codex App and Codex CLI — right in the native model picker, with each provider's credentials kept isolated.

This guide explains what Codex Router is, how it works, how to set it up, and where it fits next to other AI coding tools like [Codex CLI](/tools/codex-cli/), [Claude Code](/tools/claude-code/), and [Aider](/tools/aider/).

## What is Codex Router?

Codex Router is an external-model router for Codex. It is a small local service that sits between your Codex installation and the AI providers you want to use. Instead of forcing Codex to talk only to OpenAI, the router intercepts model requests and forwards them to whichever provider you choose — Kimi, DeepSeek, Anthropic, Grok, GLM, Qwen, or any future external model.

The result is that Codex's own model picker shows the models you actually pay for. You switch coding assistants the same way you would switch models today, but the list now includes third-party models that would otherwise be unavailable.

## Key features

- **External models in Codex's native picker** — Kimi, DeepSeek, GLM, Qwen, Anthropic, Grok, and more appear alongside the default options.
- **Credential isolation** — each provider's OAuth session or API key is stored separately, so switching models never mixes or leaks credentials.
- **Guided Kimi OAuth/API setup** — the project includes a guided flow for Kimi authentication, plus plain API-key support for other providers.
- **Works with Codex App and CLI** — stable support for both interfaces, with experimental Cursor support via an OpenAI-compatible base URL.
- **Free and open source** — you only pay for the model usage you route through it, not for the router itself.
- **Safe migration and rollback** — you can switch back to OpenAI models at any time without touching your existing Codex setup.

## How Codex Router works

Codex normally talks to OpenAI's API. Codex Router changes the conversation endpoint to a local address and translates requests between Codex and the external providers. Because it runs locally, your requests go directly from your machine to the provider you chose — there is no third-party relay in the middle.

Authentication is the clever part. Kimi supports OAuth (reusing your existing Kimi Code CLI session) or a Platform API key. Grok reuses credentials from the Grok CLI (stored in `~/.grok/auth.json`). Anthropic and DeepSeek use standard API keys. Each credential lives in its own isolated slot, so running Kimi for one task and DeepSeek for another never mixes keys.

The router also merges models into Codex's native model picker, which means you keep all of Codex's agent features — plan mode, subagents, file editing, and terminal use — while the underlying model is whatever you selected.

## How to install and set up Codex Router

1. **Clone the repository** — `git clone https://github.com/duolahypercho/codex-router` and enter the folder.
2. **Run the guided setup** — the project ships a guided installation flow that detects your environment and walks you through configuration.
3. **Add your credentials** — follow the guided Kimi OAuth/API flow, and add API keys for DeepSeek, Anthropic, Grok, or other providers you want.
4. **Point Codex at the router** — the setup configures Codex App and/or Codex CLI to use the local router endpoint.
5. **Pick a model** — open Codex, choose the external model from the picker, and start working.

If you are on Cursor, you can configure it experimentally by setting the OpenAI-compatible base URL to the local router endpoint — instructions are in the project README.

## Why developers use Codex Router

The main reason is simple: **you already pay for models you cannot use in Codex.** If you have a Kimi subscription or DeepSeek API credits, running them inside Codex means your existing spend finally covers your main coding agent instead of sitting unused.

The second reason is **choice without lock-in**. You can compare how Kimi, Grok, and DeepSeek handle the same refactor in the same agent, then settle on the one you like — or keep switching per task.

The third is **privacy and control**. Because the router is local and open source, you can read exactly what it does, and there is no middleman between your codebase and the model provider.

## Who is Codex Router for?

Codex Router is for developers who already use OpenAI Codex and want more model options, and for people who subscribe to Kimi, Grok, or other providers and want to use those subscriptions inside a serious coding agent. It is also useful for teams that standardize on Codex but want to route through a cheaper provider for routine work.

It does require basic comfort with the command line. If you have never cloned a repository or run a setup script, you may want help from someone comfortable with terminal tools.

## Limitations and honest considerations

- **Requires Codex** — the router extends Codex; it is not a standalone agent.
- **Experimental edges** — Cursor support is experimental, and very new providers may need configuration before they appear in the picker.
- **You still pay for usage** — the router is free, but Kimi, DeepSeek, Anthropic, and Grok usage is billed by the providers.
- **Local setup** — the router runs on your machine, so it is off when your machine is off.

## Codex Router vs other AI coding tools

[Claude Code](/tools/claude-code/) is a complete agent that runs Anthropic models by default; Codex Router complements it by giving the same agent-style workflow to external models inside Codex. [Aider](/tools/aider/) is a terminal pair-programmer that supports many models out of the box but does not add them to Codex's picker. OpenCode is another open-source agent worth comparing if you want a Codex-like experience with broad model support from the start. None of these replace each other — many developers run Codex with Codex Router for one project and Claude Code for another.

## The bottom line

Codex Router unlocks a genuinely useful capability: your favorite external models, running inside OpenAI Codex, with safe credential isolation — for free. If you use Codex and have access to Kimi, Grok, Claude, or DeepSeek, try it on one real task and see which model handles your code best.

For more developer tools, browse the [Developer Tools directory](/category/developer/) and the [best AI tools in 2026](/guides/best-ai-tools-2026/) roundup. The official project lives at [github.com/duolahypercho/codex-router](https://github.com/duolahypercho/codex-router).
