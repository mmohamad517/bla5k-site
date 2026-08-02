---
name: ClawHub
url: https://clawhub.ai
subcategory: dev-ai-agents
tagline: The official skills and plugins registry for the OpenClaw agent ecosystem — a marketplace where creators publish and users install ready-to-use agent skills.
tags:
  - openclaw
  - skills
  - plugins
  - registry
  - marketplace
  - agents
  - cli
  - open-source
featured: false
updated: 2026-08-01
metaTitle: "ClawHub: The OpenClaw Skills & Plugins Registry (2026 Guide)"
metaDescription: A complete guide to ClawHub — the official skills and plugins registry for OpenClaw agents. Browse, publish, and install agent skills with CLI and REST API support.
simple: "An app store for AI agent abilities. You browse ready-made 'skills' and plugins, install them into your OpenClaw assistant with one command, or publish your own for others."
example: "Want your assistant to summarize documents? Search ClawHub for a skills, install it with one CLI command, and your agent gains that capability immediately."
goodFor:
  - "OpenClaw users who want to extend their assistant"
  - "Creators who want to publish agent skills"
  - "Anyone building in the OpenClaw ecosystem"
notFor:
  - "You don't use OpenClaw (it's its registry)"
  - "You want a general software app store"
  - "You prefer a closed, proprietary ecosystem"
faqs:
  - q: What is ClawHub?
    a: ClawHub is the official skill and plugin registry for OpenClaw agents — a marketplace where creators publish and users install skills and plugins ("Claws for your Claws"). It's free, MIT-licensed, and part of the OpenClaw ecosystem.
  - q: Do I need OpenClaw to use ClawHub?
    a: Yes in practice — it's the skill/plugin registry purpose-built for OpenClaw agents, though its CLI can also be used for publishing.
  - q: Can anyone publish a skill?
    a: Yes — creators publish via the ClawHub CLI or GitHub import, and releases go through signed-manifest and moderation checks for safety.
  - q: Is ClawHub free?
    a: Yes — browsing, installing, and publishing are free; the code is MIT-licensed.
  - q: What kinds of skills are on ClawHub?
    a: Skills and plugins for gateway apps like GitHub, Notion, Slack, Gmail, and WhatsApp, plus general-purpose agent capabilities across many categories.
  - q: Who makes ClawHub?
    a: ClawHub is an official OpenClaw project, part of the openclaw GitHub organization that also makes the OpenClaw agent. Its repo has around 9,000 GitHub stars.
---

**ClawHub** is where the OpenClaw ecosystem gets its powers. If OpenClaw is a personal AI assistant, ClawHub is the app store for its abilities — a registry where you browse, install, and publish "skills" and plugins that give your agent new capabilities. In this guide we'll cover what ClawHub is, who builds it, how it works, what's on it, and how to use it.

## What is ClawHub?

ClawHub is the **official skill and plugin registry for OpenClaw agents**. It's a marketplace ("Claws for your Claws") where:

- **Creators publish** skills and plugins — reusable capabilities for OpenClaw agents.
- **Users browse and install** them with a simple CLI command.
- **The ecosystem grows** through moderation, versioning, and trust signals.

It's free, open source under the **MIT license**, and lives at clawhub.ai, with its code in the `openclaw/clawhub` GitHub repository.

## Who creates ClawHub?

ClawHub is an **official OpenClaw project**, part of the openclaw GitHub organization that also develops the OpenClaw agent (which has over 385,000 stars). It's maintained alongside the wider OpenClaw ecosystem — Crabbox, ClickClack, Lobster, and the OpenClaw MCP tooling. It's documented in the official OpenClaw docs at docs.openclaw.ai/clawhub.

## How ClawHub works

ClawHub is built around a straightforward publish-and-install flow:

1. **Browse** — search the registry by category, trending, featured, official, or new.
2. **Install** — add a skill to your OpenClaw agent with a CLI command.
3. **Publish** — creators publish skills via the `clawhub` CLI or GitHub import.
4. **Moderate** — releases go through signed-manifest and moderation checks.
5. **Sync** — skills stay updated across your agents.

A CLI (`clawhub login`, `clawhub skill publish`, `clawhub package publish`) handles publishing and syncing, and a REST API (`/api/v1/skills`) supports programmatic access.

## Key features of ClawHub

- **Skill and plugin registry** — browse, search, install, and publish.
- **Trending / featured / official / new sections** — discover quality skills.
- **Signed manifests** — packages are cryptographically signed.
- **Moderated releases** — moderation checks for safety.
- **Version history** — track skill versions.
- **Trust signals** — publisher and org verification, "Official" creators, audits.
- **CLI** — publish and sync from your terminal.
- **REST API** — programmatic access (`/api/v1/skills`).
- **GitHub import** — publish from your repositories.
- **Gateway plugins** — GitHub, Notion, Slack, Gmail, WhatsApp, and more.

## What can you find on ClawHub?

ClawHub hosts skills and plugins spanning the OpenClaw ecosystem:

- **Gateway app plugins** — connect your agent to GitHub, Notion, Slack, Gmail, WhatsApp, and other apps.
- **General-purpose skills** — capabilities you can teach any OpenClaw agent.
- **Community and official skills** — both verified and community-built.
- **Specialized agents** — ready-made behaviors for specific roles.

## Pricing: what does ClawHub cost?

ClawHub is **free** — browsing, installing, and publishing are all free, and the code is MIT-licensed. There are no paid tiers or marketplace fees.

## Integrations

- **OpenClaw** — the primary integration; install skills into your agents.
- **ClawHub CLI** — publish and sync from the terminal.
- **REST API** — `/api/v1/skills` for programmatic access.
- **GitHub** — import and publish from repositories.
- **OpenClaw ecosystem** — Crabbox, ClickClack, Lobster, and OpenClaw MCP tooling.

## Who is ClawHub for?

ClawHub is aimed at **the OpenClaw community**. It's a strong fit for:

- **OpenClaw users** who want to extend their assistant with new skills.
- **Creators** who want to publish and share agent skills.
- **Developers** building in the OpenClaw ecosystem.
- **Anyone exploring** the local-first AI agent world.

If you don't use OpenClaw, ClawHub isn't for you — but if you do, it's the fastest way to make your agent more capable.

## Advantages of ClawHub

- **Official and open** — MIT-licensed, part of the OpenClaw project.
- **Safety features** — signed manifests, moderation, trust signals.
- **Easy publishing** — CLI and GitHub import.
- **Programmatic access** — REST API.
- **Active ecosystem** — growing library and community.

## Limitations and honest considerations

- **Tied to OpenClaw** — only useful within the OpenClaw ecosystem.
- **Young ecosystem** — newer than mature package registries.
- **Moderation is human/community** — trust signals exist but vetting is evolving.

## Security and privacy

ClawHub's design prioritizes package integrity: **signed manifests**, **moderated releases**, **trust signals** for publishers and orgs, and "Official" creator verification. Because skills give your agent new capabilities, installing only from verified publishers is sensible. The platform publishes a status page and is part of the reputable, MIT-licensed OpenClaw ecosystem.

## Getting started with ClawHub

1. **Visit clawhub.ai** — browse the registry.
2. **Install the CLI** — set up the `clawhub` command.
3. **Install a skill** — add one to your OpenClaw agent and test it.
4. **Publish (optional)** — share your own skill via CLI or GitHub import.

## The bottom line

ClawHub is the marketplace that powers the OpenClaw ecosystem — a free, MIT-licensed registry where skills and plugins are published, moderated, and installed with one command. For OpenClaw users, it's the fastest way to make your personal AI assistant more capable. For creators, it's a growing platform to share your work. And for anyone watching local-first AI, it's proof that the ecosystem around it is maturing quickly.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [ClawHub website](https://clawhub.ai), the [OpenClaw docs](https://docs.openclaw.ai/clawhub/), and the [official GitHub repository](https://github.com/openclaw/clawhub).*
