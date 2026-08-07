---
name: Pi
url: https://pi.dev
image: /logos/pi.png
subcategory: dev-ai-agents
tagline: A minimal, hackable AI agent harness — unify your LLM providers, run agents, and adapt the toolkit to your own workflows.
tags:
  - agent harness
  - agent framework
  - cli
  - open-source
  - mit
  - typescript
  - multi-provider
  - devtools
featured: false
updated: 2026-08-01
metaTitle: "Pi (pi.dev): The Minimal, Hackable AI Agent Harness (2026 Guide)"
metaDescription: A complete guide to Pi — the minimal, extensible AI agent harness from Earendil. Unified multi-provider LLM API, agent runtime, TUI, and coding agent CLI. MIT open source.
simple: "A free, open-source toolkit for building AI agents. Instead of forcing you into one way of working, Pi gives you the building blocks — a unified LLM API, an agent loop, and a terminal UI — and lets you adapt them to your own workflows."
example: "Want one agent that can use different AI providers? Pi's unified API lets you switch between Anthropic, OpenAI, or a local model without rewriting your agent code."
goodFor:
  - "Developers who want full control over their agents"
  - "People who prefer minimal, hackable tools over opinionated platforms"
  - "Tinkerers and agent framework enthusiasts"
notFor:
  - "You want a plug-and-play product with no setup"
  - "You're not comfortable with code and configuration"
  - "You need built-in guardrails and a managed service"
faqs:
  - q: What is Pi?
    a: Pi is a minimal AI agent harness built by Earendil. It combines a unified multi-provider LLM API, an agent runtime, a TUI, and a coding agent CLI into one hackable toolkit. It's free and open source under the MIT license.
  - q: Is Pi free?
    a: Yes — it's completely free and open source under the MIT license. There's no paid plan; you only pay your LLM provider directly through your own API keys or subscriptions.
  - q: What makes Pi different from other coding agents?
    a: Pi is deliberately a minimal, extensible harness you adapt to your workflows — via extensions, skills, prompt templates, and themes — rather than a fixed, opinionated product. The philosophy is "adapt Pi to your workflows, not the other way around."
  - q: Which LLM providers does Pi support?
    a: "A wide range: Anthropic, OpenAI, Google, Amazon Bedrock, Mistral, OpenRouter, xAI (Grok), Kimi, GitHub Copilot, and local models via llama.cpp."
  - q: Who maintains Pi?
    a: Pi is built in the open by Earendil Inc. and its contributors, with Mario Zechner ("badlogic") as a lead maintainer.
  - q: Is Pi safe to use?
    a: Pi has no built-in permission system — it runs with your user permissions. The project recommends containerizing or sandboxing it for isolation, and it documents strong supply-chain hardening practices.
---

**Pi** takes a different approach to AI agents. Where many agent products force you into their way of working, Pi is deliberately minimal and hackable — a harness you adapt to *your* workflows, not the other way around. In this guide we'll cover what Pi is, who builds it, how it works, what you get, pricing, and who it's for.

## What is Pi?

Pi is a **minimal AI agent harness** from Earendil. It's best described by its own tagline: "adapt Pi to your workflows, not the other way around." Concretely, it packages four things into one open-source toolkit:

- A **unified multi-provider LLM API** (`@earendil-works/pi-ai`) — one interface across many AI providers.
- An **agent runtime** — the loop that lets an agent reason, use tools, and act.
- A **TUI** — a terminal user interface for working with agents.
- A **coding agent CLI** — a ready-made agent for coding tasks.

Because it's open source and MIT-licensed, you can inspect, fork, and extend any part of it.

## Who creates Pi?

Pi is built by **Earendil Inc.**, an independent software company (earendil.com), with **Mario Zechner** ("badlogic") as a lead maintainer. Mario is a well-known figure in the developer tools world, and Pi has grown rapidly since its repository was created in **August 2025** — reaching roughly **82,000 GitHub stars** by mid-2026, with multiple releases per week.

## How Pi works

Pi's design philosophy is modularity. Instead of one monolithic product, you get building blocks you combine:

1. **Unified LLM API** — one consistent interface across providers, so your agent code doesn't lock you into a single model vendor.
2. **Agent runtime** — the core loop where an agent interprets instructions, calls tools, and produces results.
3. **TUI and CLI** — interfaces for driving agents from the terminal, including a ready-made coding agent.
4. **Extensions** — plug in capabilities, skills, prompt templates, and even themes to shape how Pi behaves.

Because it's a harness rather than a fixed product, you configure and extend Pi to match your exact workflow.

## Key features of Pi

- **Minimal, hackable design** — a harness you adapt, not an opinionated product.
- **Unified multi-provider API** — switch providers without rewriting agent code.
- **Agent runtime** — the loop, tools, and state for building agents.
- **Terminal UI (TUI)** — drive agents from your terminal.
- **Coding agent CLI** — a ready-to-use agent for coding tasks.
- **Broad provider support** — Anthropic, OpenAI, Google, Bedrock, Mistral, OpenRouter, xAI/Grok, Kimi, GitHub Copilot, and local llama.cpp.
- **Extensible** — extensions, skills, prompt templates, themes, RPC/SDK interfaces.
- **MCP support** — connect external tools via the Model Context Protocol.
- **Supply-chain hardened** — pinned dependencies, shrinkwrap, and npm audit in CI.

## What can you use Pi for?

- **Coding agents** — the built-in CLI agent for editing code in your repos.
- **Custom agent workflows** — build agents adapted to your specific tasks.
- **Multi-provider experimentation** — try different models with one codebase.
- **Local-first AI** — connect local llama.cpp models alongside cloud providers.
- **Learning agent frameworks** — a clean, readable codebase to study and extend.

## Pricing: what does Pi cost?

Pi is **free and open source** under the **MIT license**. There is no paid plan and no subscription. The only cost is what you pay your LLM provider directly — through your own API keys or subscriptions. This is a genuinely free toolkit.

## Integrations

- **LLM providers** — OpenAI, Anthropic, Google Gemini, Amazon Bedrock, Mistral, OpenRouter, xAI, Kimi, GitHub Copilot, local llama.cpp.
- **MCP** — Model Context Protocol for external tools.
- **SDK / RPC interfaces** — build your own integrations.
- **Extensions and skills** — the ecosystem of Pi capabilities.

## Who is Pi for?

Pi is aimed at **developers who want control over their AI agents**. It's a strong fit for:

- **Agent framework enthusiasts** who like to build and adapt.
- **Developers** who want one codebase across multiple LLM providers.
- **Terminal users** who prefer minimal, hackable tools.
- **Privacy-minded users** who want local models as an option.

If you want a plug-and-play product with zero configuration, Pi isn't that — it's a toolkit that rewards developers who invest in it.

## Advantages of Pi

- **Free and open source** — MIT, no paid plan.
- **Minimal and adaptable** — adapt it to your workflows.
- **Multi-provider** — one API across many LLMs.
- **Fast-moving** — active development with frequent releases.
- **Local-first option** — llama.cpp support for on-device AI.
- **Strong supply-chain practices** — hardened dependency management.

## Limitations and honest considerations

- **No built-in permission system** — it runs with your user permissions, so you must sandbox it yourself for isolation.
- **Requires technical comfort** — configuration, code, and provider setup.
- **Not a managed service** — no hosting, support, or enterprise guarantees.
- **Community scale** — younger than some incumbent frameworks.

## Security and privacy

Pi's README explicitly documents that it has **no built-in permission system** and runs with the user's permissions, recommending containerization for isolation. The project takes supply-chain security seriously — pinned dependencies, shrinkwrap, and npm audit in CI. For privacy, the multi-provider support including local llama.cpp gives you an on-device option. As with any agent framework, your API keys and prompts are your responsibility to protect.

## Pi vs. other agent frameworks

| | Pi | CrewAI | LangChain |
| --- | --- | --- | --- |
| **Philosophy** | Minimal, hackable harness | Role-based agent crews | Broad framework ecosystem |
| **Style** | Adapt to your workflows | Structured teams of agents | Component library |
| **License** | MIT | MIT (framework) | MIT |
| **Best for** | Tinkerers, terminal users | Team-based orchestration | General LLM app building |

Each has its strengths; Pi's niche is minimalism and adaptability.

## Getting started with Pi

1. **Visit pi.dev** — read the docs and get the toolkit.
2. **Install it** — from npm or the GitHub repo (`earendil-works/pi`).
3. **Configure a provider** — add your LLM API key or local model.
4. **Try the coding agent CLI** — run it in a repo and give it a task.
5. **Extend it** — add skills, extensions, or your own agent definitions.

## The bottom line

Pi is a refreshingly minimal take on AI agents: a free, MIT-licensed harness you adapt to your own workflows. With a unified multi-provider API, an agent runtime, a TUI, and a coding agent CLI, it gives developers the building blocks and the freedom to build what they want — at the cost of doing your own setup and sandboxing. If you're a developer who'd rather adapt your tools than be adapted to them, Pi is worth a serious look.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [Pi website](https://pi.dev) and the [official GitHub repository](https://github.com/earendil-works/pi).*
