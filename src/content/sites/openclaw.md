---
name: OpenClaw
url: https://openclaw.ai
image: /logos/openclaw.png
screenshot: /screens/openclaw.webp
subcategory: dev-ai-agents
tagline: The open-source personal AI assistant that lives on your devices and acts through the chat apps you already use — WhatsApp, Telegram, iMessage, Slack, Discord, and more.
tags:
  - open-source
  - ai agent
  - personal assistant
  - agent framework
  - self-hosted
  - whatsapp
  - telegram
  - skills
  - mit
featured: true
updated: 2026-08-01
metaTitle: "OpenClaw: The Open-Source Personal AI Assistant (2026 Guide)"
metaDescription: A complete guide to OpenClaw — the open-source, local-first personal AI assistant that runs on your devices and connects to WhatsApp, Telegram, iMessage, and 25+ channels.
simple: "A free, open-source AI assistant that runs on your own devices and lives inside the messaging apps you already use. You chat with it on WhatsApp or Telegram, and it can check email, manage your calendar, and get things done."
example: "Message your OpenClaw on Telegram to 'find a flight next Tuesday and put it in my calendar' — it searches, books, and updates your schedule while you chat."
goodFor:
  - "People who want a private, self-hosted AI assistant"
  - "Users of WhatsApp, Telegram, Slack, Discord, and iMessage"
  - "Tinkerers who like open-source software"
notFor:
  - "You want a managed cloud assistant with zero setup"
  - "You're not comfortable with some technical configuration"
  - "You need a coding-focused agent rather than a personal assistant"
faqs:
  - q: What is OpenClaw?
    a: OpenClaw is an open-source personal AI assistant ("lobster") that runs on your own devices and connects to the messaging apps you already use — WhatsApp, Telegram, iMessage, Slack, Discord, Signal, and more — so it can do real tasks like managing email, calendar, and flights while you chat with it.
  - q: What does OpenClaw cost?
    a: Nothing — it's free and open source under the MIT license. You only pay for the AI model or API you choose to use.
  - q: Which platforms does OpenClaw support?
    a: It runs on macOS, Linux, and Windows and connects to 25+ channels including WhatsApp, Telegram, iMessage, Slack, Discord, Signal, SMS (via Twilio), IRC, Teams, Matrix, Feishu, LINE, and more.
  - q: Is OpenClaw safe to use?
    a: It defaults to secure DM pairing (unknown senders must be approved), supports sandboxing (Docker/SSH/OpenShell) for non-main sessions, and publishes security guidance. As with any agent that can act on your accounts, review your own configuration.
  - q: Who makes OpenClaw?
    a: OpenClaw is developed in the open by the OpenClaw Foundation, a non-profit announced July 2026, created by Peter Steinberger. It became one of the most-starred software repositories on GitHub with over 380,000 stars.
  - q: What can OpenClaw do?
    a: Multi-agent routing, voice wake and talk mode, live canvas with A2UI, browser tools, cron jobs, webhooks, and a skills system with the ClawHub registry — plus first-class tools for common tasks.
---

**OpenClaw** is one of the most remarkable open-source projects of the AI era — a personal AI assistant that runs on your own devices and acts through the chat apps you already use. It went from a weekend project to one of the most-starred repositories on GitHub in under five months. In this guide we'll cover what OpenClaw is, who builds it, how it works, what it can do, security, and how to get started.

## What is OpenClaw?

OpenClaw is an **open-source personal AI assistant** that runs on your own devices and connects to the messaging platforms you already use. It's built around a simple idea: instead of opening a new app to talk to an AI, you talk to it **where you already chat** — WhatsApp, Telegram, iMessage, Slack, Discord, Signal, and 25+ other channels.

Because it's local-first and self-hosted, OpenClaw can do real things: check your inbox, manage your calendar, look up flights, and take actions across your accounts — with your data staying on your devices. It's often described as "a space-lobster AI assistant" (the project's mascot), built to be personal, private, and useful.

## Who creates OpenClaw?

OpenClaw was created by **Peter Steinberger** (@steipete), originally as a personal project for his assistant "Molty." It grew so fast that the **OpenClaw Foundation**, a non-profit, was announced in **July 2026** to steward the project. The software is MIT-licensed and open source.

Its growth has been extraordinary: it became the most-starred software repository on GitHub in under five months, and by mid-2026 its repository showed over **385,000 stars** and 80,000 forks, with major sponsors including OpenAI, GitHub, NVIDIA, and Vercel.

## How OpenClaw works

OpenClaw runs as a **local-first Gateway daemon** (on port 18789) on a device you control. Here's the model:

1. **Install it** — run the OpenClaw gateway on your Mac, Windows, or Linux machine (or a phone/tablet via companion apps).
2. **Connect your channels** — link WhatsApp, Telegram, iMessage, Slack, Discord, etc.
3. **Connect models** — use Anthropic, OpenAI, Gemini, Grok, OpenRouter, or local models, including OAuth sign-in with existing ChatGPT, Claude, or Copilot subscriptions.
4. **Chat to act** — message it in your chat app and it takes real actions — managing inbox, calendar, browser tasks, cron jobs, and more.
5. **Supervise** — DM pairing keeps untrusted senders out; sandboxing isolates non-main sessions.

The gateway coordinates multi-agent routing: complex requests can be split among specialized agents, with results reported back in your chat.

## Key features of OpenClaw

- **25+ messaging channels** — WhatsApp, Telegram, Slack, Discord, Signal, iMessage, SMS (Twilio), IRC, Teams, Matrix, Feishu, LINE, Mattermost, Nostr, QQ, WebChat, and more.
- **Local-first Gateway** — your assistant runs on your hardware.
- **Multi-agent routing** — specialized agents collaborate on tasks.
- **Voice wake + talk mode** — macOS, iOS, and Android.
- **Live Canvas with A2UI** — interactive UI for agent output.
- **First-class tools** — browser, canvas, nodes, cron, sessions.
- **Skills system + ClawHub** — install skills from the official registry.
- **Companion apps** — macOS app, Windows Hub, iOS/Android nodes.
- **Cron jobs and webhooks** — scheduled and triggered actions.
- **Model-agnostic** — Anthropic, OpenAI, Gemini, Grok, OpenRouter, Copilot, MiniMax, local models.

## What can you use OpenClaw for?

- **Email and calendar** — manage your inbox and schedule from chat.
- **Flights and travel** — search, plan, and track trips.
- **Research and browsing** — browser tools for web tasks.
- **Automation** — cron jobs, scheduled reports, webhooks.
- **Personal assistant** — reminders, notes, quick answers.
- **Team help** — via Slack, Teams, or Discord, agents can help your whole workspace.

## Pricing: what does OpenClaw cost?

OpenClaw is **free and open source** under the **MIT license**. There are no paid tiers. Your only cost is the AI model or API you choose to use — and with OAuth sign-in, you can even use existing ChatGPT, Claude, or Copilot subscriptions. For privacy, you can run local models entirely on-device.

## Integrations

- **25+ chat channels** — WhatsApp, Telegram, iMessage, Slack, Discord, Signal, and more.
- **Model providers** — Anthropic, OpenAI, Gemini, Grok, OpenRouter, Copilot, MiniMax, local models.
- **ClawHub** — the official skills and plugins registry.
- **Browser tools** — web actions.
- **Cron and webhooks** — scheduled automation.
- **Docker / SSH / OpenShell** — sandboxing options for isolation.

## Who is OpenClaw for?

OpenClaw is aimed at **people who want a private, self-hosted AI assistant**. It's a strong fit for:

- **Privacy-conscious users** who want their AI on their own devices.
- **Messaging app power users** who want AI in their existing chat flow.
- **Self-hosters and tinkerers** who enjoy open-source software.
- **Anyone curious** about local-first, personal AI.

Because it's self-hosted, some technical setup is involved — but the project has become popular precisely because the payoff is so high.

## Advantages of OpenClaw

- **Free and open source** — MIT licensed.
- **Private and local-first** — runs on your devices.
- **Chat-native** — lives in the apps you already use.
- **Huge community** — 385k+ GitHub stars, major sponsors.
- **Model-agnostic** — use any provider, even local models.
- **Extensible** — skills, plugins, multi-agent routing.

## Limitations and honest considerations

- **Setup required** — self-hosting involves configuration.
- **Security responsibility** — it can act on your accounts; you must configure DM pairing and sandboxing properly.
- **Fast-moving project** — expect frequent changes as it evolves.
- **Non-profit stewardship is new** — the foundation structure is young.

## Security and privacy

OpenClaw defaults to **secure DM pairing**: unknown senders must be approved before they can message your assistant, which protects against untrusted inbound messages. Non-main sessions can be **sandboxed** with Docker, SSH, or OpenShell, and the project publishes security guidance and an exposure runbook for remote access. Because it's self-hosted, your data stays on your devices. The main risk — as with any autonomous agent — is configuration: follow the documented best practices and supervise what your assistant can access.

## Getting started with OpenClaw

1. **Visit openclaw.ai** — read the docs and get the install guide.
2. **Run the gateway** — install and start the daemon on your device.
3. **Connect a channel** — link WhatsApp, Telegram, or your preferred app.
4. **Add a model** — connect your provider (or use an existing subscription).
5. **Start chatting** — try a simple task, then add skills from ClawHub.

## The bottom line

OpenClaw is the poster child for local-first, open-source AI — a personal assistant that lives on your devices and works through the chat apps you already use. It's free, private, model-agnostic, and backed by one of the largest communities in open-source software. The trade-off is setup and security responsibility: self-hosting means you manage it. For anyone who wants a genuinely private AI assistant that lives where they chat, OpenClaw is extraordinary.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/directory/).

*Official resources: the [OpenClaw website](https://openclaw.ai), the [OpenClaw documentation](https://docs.openclaw.ai), and the [official GitHub repository](https://github.com/openclaw/openclaw).*
