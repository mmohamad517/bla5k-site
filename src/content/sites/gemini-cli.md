---
name: Gemini CLI
url: https://geminicli.com
subcategory: dev-ai-agents
tagline: Google's open-source AI agent that brings Gemini directly into your terminal — agentic tool use, shell execution, file edits, and MCP support.
tags:
  - ai coding agent
  - terminal
  - google
  - gemini
  - open-source
  - mcp
  - cli
  - devtools
featured: true
updated: 2026-08-01
metaTitle: "Gemini CLI: Google's Open-Source Terminal Agent (2026 Guide)"
metaDescription: A complete guide to Google's Gemini CLI — the open-source AI agent for your terminal. Features, free tier, MCP support, the transition to Antigravity, and pricing.
simple: "An AI coding assistant from Google that runs in your terminal. Ask it to write code, fix bugs, or run commands, and it uses Gemini models to do the work — with tools, file edits, and shell execution."
example: "In your project's terminal, ask Gemini CLI to 'refactor this module into smaller functions' and it reads the file, edits it, and shows you the diff to approve."
goodFor:
  - "Developers in the Google / Gemini ecosystem"
  - "Open-source terminal AI agents with MCP support"
  - "VS Code and Zed users who want native AI integration"
notFor:
  - "You need guaranteed long-term consumer support (Gemini CLI is transitioning to Antigravity)"
  - "You prefer non-Google models"
  - "You want a heavyweight IDE-integrated product"
faqs:
  - q: What is Gemini CLI?
    a: Gemini CLI is Google's open-source AI agent that brings Gemini models into your terminal. It offers agentic tool use, shell execution, file edits, skills, subagents, MCP client and server support, and integrates with VS Code and Zed.
  - q: Is Gemini CLI free?
    a: Yes — it's free and open source (Apache-2.0). The Free tier offers 60 requests per minute and 1,000 requests per day. Higher limits come with Google AI Pro, Google AI Ultra, or a usage-based Gemini API key.
  - q: What is happening to Gemini CLI?
    a: Google is transitioning it to Antigravity CLI. On June 18, 2026, Gemini CLI stops serving Google AI Pro/Ultra subscribers and free Gemini Code Assist individual users, replaced by Antigravity CLI. Paid Gemini API keys and enterprise customers (Gemini Code Assist Standard/Enterprise, Google Cloud) keep access.
  - q: What models does Gemini CLI support?
    a: It supports Google's Gemini models, including Gemini 2.5/3 Pro and Flash variants, and can work with other models in the Gemini API ecosystem.
  - q: Can I use Gemini CLI with my editor?
    a: Yes — it integrates with VS Code (native diffing) and Zed, and supports MCP servers and extensions.
  - q: Does Gemini CLI support MCP?
    a: Yes — it works as both an MCP client and an MCP server, and integrates with FastMCP for building tools.
---

Google's **Gemini CLI** is an open-source AI agent that brings the power of Gemini models directly into your terminal. Like other agentic coding tools, it doesn't just answer questions — it uses tools, executes shell commands, edits files, and works across your project. In this guide we'll cover what Gemini CLI is, who builds it, how it works, its pricing, and the important transition to Google's newer Antigravity platform.

## What is Gemini CLI?

Gemini CLI is **Google's open-source AI agent for the terminal**. Its official description is "an open-source AI agent that brings the power of Gemini directly into your terminal." It's designed for agentic development: you describe a task, and Gemini CLI plans and executes it — running tools, editing files, executing shell commands, and working with your repository.

It's licensed under **Apache-2.0** and lives in the `google-gemini/gemini-cli` repository on GitHub, where it has grown to roughly **106,000 stars**.

## Who creates Gemini CLI?

Gemini CLI is built by **Google** — specifically the Google DeepMind and Gemini team. Google is the developer of the Gemini family of large language models, and Gemini CLI is Google's official open-source agentic coding tool, positioned alongside its newer Antigravity platform.

## When was Gemini CLI launched?

Gemini CLI launched in **June 2025** — the official GitHub `early-access` release was tagged June 24, 2025, with the first npm publish the next day. It was actively maintained through 2025 and 2026. However, in **May 2026** Google announced a major transition: Gemini CLI is being superseded by **Antigravity CLI** for consumer tiers, effective **June 18, 2026**.

## The transition to Antigravity

This is the most important thing to understand about Gemini CLI in 2026. Google announced (May 19, 2026) that on **June 18, 2026**, Gemini CLI **stops serving requests** for:

- **Google AI Pro / Google AI Ultra** subscribers
- **Free Gemini Code Assist** individual users

These users are directed to **Antigravity CLI**, Google's newer agentic development tool. Gemini CLI remains available for:

- **Paid Gemini API keys** (usage-based billing through Google AI Studio or Vertex AI)
- **Enterprise customers** via Gemini Code Assist Standard/Enterprise and Google Cloud

So for personal users on consumer plans, Gemini CLI is effectively being folded into Antigravity. For API-key and enterprise users, it continues to work.

## How Gemini CLI works

Gemini CLI follows the standard agentic-terminal pattern:

1. **Install and authenticate** — install from npm or the GitHub repo, then sign in or provide a Gemini API key.
2. **Run it in a terminal** — start it in any project directory.
3. **Describe a task** — natural-language instructions.
4. **It takes action** — agentic tool use, shell execution, and file edits, with plans you can review.
5. **Iterate** — approve diffs, run more commands, and refine.

It supports **skills**, **hooks**, **subagents**, and a **plan mode** for structured work. An **extensions ecosystem** adds capabilities like Jules, Conductor, Data Commons, Genkit, and FastMCP.

## Key features of Gemini CLI

- **Agentic tool use** — plans and executes tasks with real tool calls.
- **Shell execution** — runs commands in your terminal.
- **File edits** — modifies your code, with diffs you can approve.
- **Skills** — reusable capabilities for specific workflows.
- **Subagents** — delegate work to specialized agents.
- **Plan mode** — review a plan before execution.
- **MCP client + server** — connect external tools and expose tools.
- **IDE integrations** — VS Code (native diffing) and Zed.
- **Extensions ecosystem** — Jules, Conductor, Data Commons, Genkit, FastMCP, and more.
- **Multiple Gemini models** — Gemini 2.5/3 Pro and Flash variants.
- **Open source** — Apache-2.0, inspectable and extensible.

## Pricing: what does Gemini CLI cost?

Gemini CLI's pricing depends on your authentication method:

- **Free tier** — free and open source, with rate limits of 60 requests/min and 1,000 requests/day.
- **Google AI Pro / Google AI Ultra** — subscriptions with higher limits (being transitioned to Antigravity).
- **Google Developer Program** — another tier for higher usage.
- **Gemini API key** — usage-based billing through Google AI Studio.
- **Vertex AI** — enterprise usage-based billing.
- **Gemini Code Assist** — enterprise plans for teams.

The CLI itself is free; the model usage is what you pay for.

## Integrations

- **MCP** — client and server support, plus FastMCP for building tools.
- **VS Code** — native diffing integration.
- **Zed** — editor integration.
- **Extensions** — Jules, Conductor, Data Commons, Genkit, FastMCP.
- **Gemini API / Vertex AI** — model access and billing.
- **GitHub** — repository workflows.

## Who is Gemini CLI for?

Gemini CLI is aimed at **developers in the Google and Gemini ecosystem** who want an open-source agentic terminal tool. It's a good fit for:

- **Gemini users** who already use Google AI Pro/Ultra or the Gemini API.
- **VS Code and Zed users** who want native AI integration.
- **Open-source enthusiasts** who value inspectable Apache-2.0 tooling.
- **Enterprise teams** using Gemini Code Assist or Google Cloud.

Given the June 2026 transition, consumer users should plan to move to **Antigravity** for their subscription-based usage, while API-key and enterprise users can keep using Gemini CLI.

## Advantages of Gemini CLI

- **Free and open source** — Apache-2.0 with a generous free tier.
- **Google-native** — built around the Gemini model family.
- **Strong MCP support** — client and server, plus FastMCP.
- **IDE integrations** — VS Code and Zed.
- **Extensible** — skills, hooks, subagents, and extensions.
- **Huge community** — ~106k GitHub stars.

## Limitations and honest considerations

- **Transition to Antigravity** — consumer subscription access ends June 18, 2026; plan accordingly.
- **Google models focused** — designed around the Gemini ecosystem.
- **Rate limits** — the free tier's 1,000 requests/day can be limiting for heavy use.

## Security and privacy

Gemini CLI stores extension settings (including API keys) in your operating system's keychain, offers sandboxing features for safer execution, and maintains a dedicated security advisories page. As with any terminal agent, review what it executes and approve changes deliberately. Your code is processed by Google's models — review Google's data policies for sensitive work.

## Gemini CLI vs. Claude Code vs. Codex CLI

| | Gemini CLI | Claude Code | Codex CLI |
| --- | --- | --- | --- |
| **Developer** | Google | Anthropic | OpenAI |
| **Models** | Gemini family | Claude family | Codex / GPT family |
| **License** | Apache-2.0 | Open source | Apache-2.0 |
| **Status (2026)** | Transitioning to Antigravity for consumers | Actively maintained | Actively maintained |
| **Best for** | Google ecosystem users | Teams wanting issue-to-PR | Terminal purists, OSS fans |

Gemini CLI's distinct angle is its deep Google/Gemini integration. With the Antigravity transition, Google ecosystem users will increasingly use Antigravity CLI as the successor.

## Getting started with Gemini CLI

1. **Install it** — follow the install guide in the `google-gemini/gemini-cli` repo or install via npm.
2. **Authenticate** — sign in with your Google account, Google AI subscription, or a Gemini API key.
3. **Run it in a repo** — open a terminal in your project and launch it.
4. **Try a task** — a small refactor or bug fix is a good start.
5. **Plan for Antigravity** — if you're on a consumer subscription, evaluate Antigravity CLI for continued support after June 2026.

## The bottom line

Gemini CLI is Google's open-source terminal agent — free, MCP-rich, and deeply integrated with the Gemini ecosystem. It's a capable agentic coding tool with a strong free tier and active community. The caveat is its future: Google is transitioning consumer users to Antigravity in mid-2026, so evaluate your path accordingly — API-key and enterprise users can continue with Gemini CLI.

For Google ecosystem developers, it's a great fit today, and Antigravity is the natural upgrade path. Compare it with Claude Code and Codex CLI to find the agentic terminal tool that matches your models and workflow.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [Gemini CLI website](https://geminicli.com) and the [official GitHub repository](https://github.com/google-gemini/gemini-cli).*
