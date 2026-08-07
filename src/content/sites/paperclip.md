---
name: Paperclip
url: https://paperclip.ing
image: https://www.google.com/s2/favicons?domain=paperclip.ing&sz=128
subcategory: dev-ai-agents
tagline: The open-source control plane for running a team of AI agents at work — organize agents like Claude Code and Codex into a company with goals, budgets, and governance.
tags:
  - ai agents
  - orchestration
  - org chart
  - governance
  - budgets
  - open-source
  - self-hosted
  - agent management
featured: false
updated: 2026-08-01
metaTitle: "Paperclip: The Open-Source Control Plane for AI Agents (2026 Guide)"
metaDescription: A complete guide to Paperclip — the open-source control plane that organizes your AI agents into a managed team with org charts, budgets, and governance.
simple: "A free tool that manages your AI agents like employees. It takes the agents you already use (Claude Code, Codex, Cursor) and organizes them into a team with roles, budgets, and oversight."
example: "Your agents run at a team of 10; Paperclip gives each a budget, an org chart, and a governance board that can pause any agent that goes off track."
goodFor:
  - "Teams running multiple AI coding agents"
  - "Anyone who wants cost control over AI agents"
  - "Self-hosters who want governance over agents"
notFor:
  - "You run a single agent casually"
  - "You want a cloud SaaS with no setup (currently waitlist)"
  - "You don't need budget or governance controls"
faqs:
  - q: What is Paperclip?
    a: Paperclip is an open-source app (control plane) for managing AI agents at work. It organizes any existing agents — Claude Code, Codex, Cursor, OpenClaw, and more — into a "company" with org charts, goals, budgets, and governance, rather than running its own agent.
  - q: Is Paperclip an AI agent?
    a: No — it orchestrates your existing agents into a managed team; it doesn't bring its own agent runtime. Any runtime that accepts a heartbeat can be connected.
  - q: Is Paperclip free?
    a: Yes — it's open source and self-hosted, free under the MIT license, with no Paperclip account required. A cloud version exists but is on waitlist with no published pricing.
  - q: What happens when an agent hits its budget?
    a: It auto-pauses and new tasks are blocked (with a warning at 80%); the owner (board) can override and resume anytime.
  - q: Is my data exposed?
    a: Paperclip is self-hosted and MIT-licensed; agents, data, and infrastructure stay on your own machine or network.
  - q: What's the official website?
    a: The official domain is paperclip.ing (not paperclip.app). The code lives in the paperclipai GitHub organization.
---

As teams adopt multiple AI agents, a new problem appears: how do you manage them? **Paperclip** answers that with a "control plane" — a layer that organizes your agents like employees, with org charts, budgets, and governance. In this guide we'll cover what Paperclip is, who builds it, how it works, its features, and how to get started.

## What is Paperclip?

Paperclip is an **open-source app (control plane) for managing AI agents at work**. Its key insight is that it doesn't run its own agent — instead, it organizes the agents you already use (Claude Code, Codex, Cursor, Gemini CLI, OpenClaw, and more) into a managed "company." Each agent becomes an employee with:

- A place in an **org chart** (with roles and reporting lines).
- **Goals** aligned to your projects.
- A **budget** (hard monthly cost cap).
- **Governance** — a board that can approve, pause, override, or terminate any agent.

This turns a loose collection of AI tools into a managed team you can reason about and control.

## Who creates Paperclip?

Paperclip is built by **Paperclip Labs, Inc.**, a small team. The code lives in the `paperclipai` GitHub organization under an MIT license. It's a young but fast-moving project — the repository was created in **March 2026** and by mid-2026 had roughly **75,000 GitHub stars**, with releases shipping regularly. The cloud version is on waitlist; the local/self-hosted version is available now.

## How Paperclip works

Paperclip uses a **bring-your-own-agent** model. Any agent runtime that accepts a **heartbeat** can be connected — Paperclip tracks what each agent is doing through scheduled heartbeats and tool-call tracing. The flow:

1. **Connect agents** — register your existing agents (Claude Code, Codex, OpenClaw, etc.) via adapters.
2. **Set up the org** — place agents in an org chart with roles and goals.
3. **Assign budgets** — set hard monthly cost caps per agent.
4. **Govern** — approve, pause, override, or terminate agents through a board.
5. **Monitor** — review tool-call traces and an immutable audit log.

Everything runs self-hosted — agents, data, and infrastructure stay on your own machine or network.

## Key features of Paperclip

- **Bring Your Own Agent** — any runtime that accepts a heartbeat.
- **Org Chart** — roles and reporting lines for your agents.
- **Goal Alignment** — mission → project → agent → task.
- **Cost Control** — hard monthly per-agent budgets; auto-pause at 100%, warning at 80%.
- **Ticket System** — full tool-call tracing and an immutable audit log.
- **Governance** — board-level approve/pause/override/terminate.
- **Scheduled Heartbeats** — agents report status on schedule.
- **Self-hosted** — embedded Postgres or your own; no account required.
- **Open source** — MIT licensed, free.

## What can you use Paperclip for?

- **Managing agent teams** — keep many coding agents organized and on-budget.
- **Cost control** — prevent runaway AI spending with hard budgets.
- **Governance and compliance** — audit logs and approval gates.
- **Oversight** — review exactly what each agent did via tool-call traces.
- **Alignment** — ensure agents work toward your actual goals.

## Pricing: what does Paperclip cost?

Paperclip's **self-hosted version is free** under the **MIT license** — no Paperclip account required; it runs on embedded Postgres or your own database. A **cloud version** is on waitlist, with no published pricing yet. For most teams, self-hosting covers everything.

## Integrations

- **Agent runtimes** — Claude, Codex, Gemini, Cursor, Hermes, OpenClaw, Pi, OpenCode, and more via adapters.
- **Any LLM provider** — model-agnostic.
- **REST API** — documented at docs.paperclip.ing.
- **Heartbeats / webhooks** — agent-to-Paperclip communication.

## Who is Paperclip for?

Paperclip is aimed at **teams and organizations running multiple AI agents** who need management and governance. It's a strong fit for:

- **Engineering teams** running several coding agents in parallel.
- **Organizations** that need budgets and audit trails for AI usage.
- **Self-hosters** who want their agent infrastructure private.
- **Platform teams** standardizing how agents are used at work.

If you run a single agent casually, Paperclip is overkill — but once agents multiply, it earns its keep.

## Advantages of Paperclip

- **Free and open source** — MIT, self-hosted, no account.
- **Budget control** — hard caps prevent AI overspend.
- **Governance built-in** — approval, pause, override, terminate.
- **Bring Your Own Agent** — works with the tools you already use.
- **Audit-ready** — immutable audit log and full tracing.
- **Private** — everything on your own infrastructure.

## Limitations and honest considerations

- **Very new** — the repo is only months old; cloud pricing and GA status are still forming.
- **Requires setup** — self-hosting and agent adapters need configuration.
- **No managed option yet** — the cloud is waitlist only.

## Security and privacy

Paperclip's self-hosted model is inherently private: agents, data, and infrastructure stay on your own machine or network. It's MIT-licensed open source, so the code is fully inspectable. Since it manages agents that have real access to your systems, governance features (approvals, pauses, audit logs) are themselves security features — giving you visibility and control over what your agents do.

## Getting started with Paperclip

1. **Visit paperclip.ing** — read the docs and get the repo.
2. **Install it** — self-host with embedded Postgres or your own.
3. **Connect agents** — add adapters for the agents you use.
4. **Set up the org** — create the org chart, goals, and budgets.
5. **Monitor and govern** — review traces and use the board for approvals.

## The bottom line

Paperclip brings management and governance to the AI agent era. As an open-source, self-hosted control plane, it turns a scattered collection of coding agents into an organized team with roles, budgets, and oversight — solving the cost, compliance, and coordination problems that appear once agents multiply. It's young, but the MIT license, BYOA model, and rapid adoption make it a project worth watching for any team serious about running AI agents.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [Paperclip website](https://paperclip.ing), the [Paperclip documentation](https://docs.paperclip.ing), and the [official GitHub repository](https://github.com/paperclipai/paperclip).*
