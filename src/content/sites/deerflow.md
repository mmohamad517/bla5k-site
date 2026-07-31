---
name: DeerFlow
url: https://github.com/bytedance/deer-flow
subcategory: dev-ai-agents
tagline: ByteDance's open-source "super agent" harness that researches, codes, and creates — handling long tasks that take minutes to hours.
tags: ["ai agents", "bytedance", "open-source", "super agent", "autonomous", "llm"]
featured: true
updated: 2026-07-30
metaTitle: "DeerFlow: ByteDance Open-Source Super Agent (2026)"
metaDescription: "DeerFlow is ByteDance’s free, open-source super-agent harness that researches, codes, and creates long-running tasks. Features, DeerFlow 2.0, and setup."
faqs:
  - q: "What is DeerFlow?"
    a: "DeerFlow is an open-source 'super agent' harness from ByteDance that lets AI agents autonomously research, write code, and create deliverables. It provides the full runtime infrastructure an agent needs — sandboxes, long-term memory, tools, skills, sub-agents, and a message gateway — to complete complex, long-horizon tasks that can take anywhere from minutes to hours. It is released under the permissive MIT license."
  - q: "Is DeerFlow free?"
    a: "Yes. DeerFlow is fully open-source and free under the MIT license, so you can use, modify, and self-host it — including commercially. There are no software fees. Your only real costs are the LLM/API usage your agents consume and any infrastructure you run it on."
  - q: "Who created DeerFlow?"
    a: "DeerFlow is created and maintained by ByteDance (the company behind TikTok) and published on its official GitHub repository. It reached the #1 spot on GitHub Trending after its 2.0 launch in early 2026, reflecting strong developer interest."
  - q: "What can DeerFlow do?"
    a: "DeerFlow handles long-horizon tasks end to end — researching a topic across the web, writing and running code in a sandbox, and producing deliverables like reports, slides, and web pages. A lead agent can spawn specialized sub-agents for parallel work, remember context across sessions, and receive tasks directly from chat apps like Telegram, Slack, and Feishu."
  - q: "Which AI models does DeerFlow support?"
    a: "DeerFlow is model-flexible. It works with OpenAI (GPT-4o/GPT-5), Anthropic Claude, Google Gemini via OpenRouter, open-source models via vLLM, and providers ByteDance recommends such as Doubao, DeepSeek, and Kimi. Models with long context, reasoning, and reliable tool use work best."
  - q: "What do I need to run DeerFlow?"
    a: "DeerFlow requires Python 3.12+ for the backend and Node.js 22+ for the frontend. It offers a setup wizard (make setup) and multiple deployment options — Docker (recommended), local development, or Kubernetes. It's a technical, self-hosted tool best suited to developers."
---

Most "AI agents" can talk about a task, but stumble when asked to actually *do* it over any meaningful stretch of time. Real work — researching a topic thoroughly, writing and running code, producing a finished report — takes more than a single clever prompt. It needs an environment: somewhere safe to run code, a memory that persists, tools to reach the web, and the ability to break big jobs into smaller ones. That environment is exactly what **DeerFlow** provides.

DeerFlow is an open-source "super agent" harness from ByteDance that researches, codes, and creates. Rather than being a single agent, it's the full runtime infrastructure that gives AI agents what they need to complete long-horizon tasks — jobs that can take anywhere from minutes to hours. In this guide we'll cover what DeerFlow is, who's behind it, how its architecture works, what changed in the ground-up DeerFlow 2.0 rewrite, and how to get started.

It sits alongside other agent tooling in our directory, like the [AgentScope](/tools/agentscope/) framework, [AgenticSeek](/tools/agenticseek/), and [SkillOpt](/tools/skillopt/) — each tackling a different slice of the fast-moving AI agent space.

## What is DeerFlow?

DeerFlow is an **open-source SuperAgent harness** — a runtime environment that gives AI agents the full infrastructure to actually complete work, not just describe it. Its own description captures the ambition: it "researches, codes, and creates," handling "different levels of tasks that could take minutes to hours."

The key word is *harness*. DeerFlow isn't a chatbot and it isn't a single model. It's the scaffolding around a large language model that turns raw intelligence into a working agent: isolated sandboxes to run code safely, persistent memory to carry context, a library of tools and skills, the ability to spawn sub-agents, and a gateway that lets you hand it tasks from your everyday chat apps. Give it a goal, and DeerFlow coordinates all of these pieces to see the job through.

It is released under the permissive **MIT license**, making it free to use, modify, and self-host — including in commercial products.

## Who created DeerFlow?

DeerFlow is developed and maintained by **ByteDance**, the technology company behind TikTok, and is published openly on its official GitHub repository. Its credibility is reflected in its reception: following the DeerFlow 2.0 launch in early 2026, the project reached the **#1 spot on GitHub Trending**, a strong signal of genuine developer interest and momentum.

That backing matters when choosing infrastructure to build on. A super agent harness is a serious foundation, and having it stewarded by a major engineering organization — with an active open-source community around it — gives it a stability and long-term outlook that many newer agent projects lack.

## The DeerFlow architecture: how it works

DeerFlow's power comes from how its components work together. Understanding the pieces makes the whole system click.

### Sandboxes — a safe place to run code

At the core is the **sandbox**: an isolated execution environment where agents can safely write and run code. DeerFlow supports multiple sandbox backends — local, Docker, or Kubernetes — so an agent can execute programs, run commands, and manipulate files without endangering the host system. This is what lets DeerFlow genuinely *code*, not just suggest code.

### Memory — context that persists

DeerFlow includes a **persistent long-term memory** system that carries context across sessions, with support for multiple backends (DeerMem, mem0, and others). Its architecture separates global user context from agent-specific facts, so agents stay consistent and personalized over long, multi-step work rather than forgetting everything between steps.

### Skills — modular, progressively loaded capabilities

**Skills** are extensible, modular capabilities defined in simple Markdown that agents load progressively as they need them, with safety scanning built in. DeerFlow ships with built-in skills for research, report generation, slides, and web pages — so it can produce real deliverables out of the box.

### Tools — reaching the outside world

Through its **tools** layer, DeerFlow gives agents web search, file operations, bash execution, and custom tools via MCP servers. An optional Playwright-based browser-control capability adds interactive web navigation and form submission for tasks that require clicking through real websites.

### Sub-agents — divide and conquer

For complex jobs, a lead agent can spawn specialized **sub-agents** with isolated contexts to handle parallel or delegated work. This mirrors how a human team splits a big project, and it's central to DeerFlow's ability to tackle long-horizon tasks that a single agent would struggle with.

### Message gateway — tasks from your chat apps

Finally, the **message gateway** lets you hand DeerFlow tasks directly from the messaging platforms you already use. It connects natively to Telegram, Slack, and Feishu — and also WeChat, WeCom, and DingTalk — often without requiring a public IP address. You send a request in chat; DeerFlow does the work and reports back.

## DeerFlow 2.0: a ground-up rewrite

It's worth being clear about versions. **DeerFlow 2.0 is a complete, ground-up rewrite** that shares no code with version 1. The original — known as the Deep Research framework, focused on autonomous research — is maintained on the `1.x` branch, while 2.0 reimagines the project as a full super agent harness.

The shift is significant. Where DeerFlow 1.x was primarily a research tool, DeerFlow 2.0 is a **runtime environment** that gives agents the infrastructure to complete real work: running code, remembering context, using skills, and delegating to sub-agents. It's this expansion — from "deep research" to "super agent" — that propelled 2.0 to the top of GitHub Trending after its launch on February 28, 2026.

## What can you build with DeerFlow?

Because it's a general harness, DeerFlow suits a wide range of long-running, autonomous tasks:

- **Deep research** — investigating a topic across the web, synthesizing sources, and producing a structured report.
- **Coding tasks** — writing, running, and debugging code inside a sandbox to build or fix something.
- **Content creation** — generating deliverables like reports, slides, and web pages via built-in skills.
- **Multi-step operations** — jobs that require planning, parallel sub-tasks, and hours of sustained work.
- **Chat-driven automation** — tasks you fire off from Telegram, Slack, or Feishu and collect when done.

The unifying theme is **long-horizon autonomy**: DeerFlow shines when a task is too big for one prompt and needs an agent that can plan, act, remember, and persist.

## Supported models and integrations

DeerFlow is deliberately **model-flexible** rather than tied to one provider. It supports a broad range of LLMs, including:

- **OpenAI** (GPT-4o, and GPT-5 via the Responses API)
- **Anthropic Claude** models, including a Claude Code integration
- **Google Gemini** via OpenRouter
- **Open-source models** served through vLLM
- **Doubao, DeepSeek, and Kimi** — providers ByteDance recommends

The project notes that models work best when they support long context windows (100k+ tokens), reasoning, multimodal inputs, and reliable tool use — all important for sustained agentic work. For developers using Claude Code, DeerFlow even ships a `claude-to-deerflow` skill that lets you drive it directly from a Claude Code terminal session.

On observability, DeerFlow integrates with LangSmith, Langfuse, and OpenTelemetry-based tracing — the kind of production tooling that signals it's built for real deployment, not just demos.

## Who is DeerFlow for?

DeerFlow is aimed at **developers, technical teams, and organizations** who want to build or run autonomous agents that complete substantial work. It's a particularly strong fit for:

- **Developers building agentic products** who need a complete, self-hostable runtime rather than assembling one from scratch.
- **Teams automating research, coding, or content workflows** that run for minutes to hours.
- **Organizations that want control** — self-hosting, RBAC authorization, and their own infrastructure and data.
- **Chat-first teams** on Telegram, Slack, or Feishu who want to dispatch tasks from where they already work.

It is a **technical, self-hosted tool**. Setup involves Python, Node.js, sandboxes, and model configuration — so some engineering comfort is expected. For that audience, though, DeerFlow offers an unusually complete foundation. You'll find more developer-grade agent tooling across our [Developer Tools directory](/category/developer/).

## Advantages of DeerFlow

- **A complete runtime, not just a library.** Sandboxes, memory, tools, skills, sub-agents, and a message gateway in one harness.
- **Built for long-horizon work.** Designed for tasks that take minutes to hours, with context management and sub-agent delegation to sustain them.
- **Real deliverables out of the box.** Built-in skills for research, reports, slides, and web pages.
- **Model-flexible.** Works across OpenAI, Claude, Gemini, open-source models, and more.
- **Chat-native.** Native integration with Telegram, Slack, Feishu, and other platforms.
- **Free, open, and well-backed.** MIT-licensed, from ByteDance, and #1 on GitHub Trending.

## Limitations and honest considerations

A fair assessment includes the trade-offs.

- **It's technical and self-hosted.** DeerFlow expects Python 3.12+, Node.js 22+, and comfort with Docker or Kubernetes. It is not a click-to-use consumer app.
- **You bring the model and infrastructure.** The software is free, but running capable agents means paying for LLM usage and hosting, which scale with your work.
- **Autonomous power demands care.** Agents that run code and browse the web are powerful; the project includes explicit security notices about sandbox isolation and credential management for good reason. Supervise and configure it responsibly.
- **2.0 is a young rewrite.** As a ground-up 2.0 release, expect rapid iteration and evolving documentation, as with any leading-edge project.

None of these are reasons to avoid DeerFlow — they're simply the realities of adopting a powerful, self-hosted agent harness.

## Pricing: what does DeerFlow cost?

DeerFlow's pricing is straightforward: **it is free and open-source under the MIT license.** There are no license fees; you self-host it yourself. Your real costs come from two places outside the software — the **LLM/API usage** your agents consume (which can add up for long, tool-heavy tasks) and any **infrastructure** you run it on. Because DeerFlow is model-flexible and self-hostable, you retain control over both, and can choose cost-effective or open-source models to manage spending.

## Security and privacy

As an **open-source, self-hosted** harness, DeerFlow keeps you in control of where agents run and what they access — a meaningful advantage over fully cloud-bound platforms. The project is transparent under MIT, so security-minded teams can audit it, and it includes **role-based access control (RBAC)** for production deployments.

Because agents in DeerFlow can execute code and browse the web, the project is explicit about **sandbox isolation and careful credential management** — and rightly so. Running tools inside proper sandboxes, protecting your API keys, and supervising autonomous runs are essential practices. As always, whichever LLM provider you connect will process task data under its own policies, so choose backends appropriate to your data's sensitivity, or use self-hostable open-source models to keep everything in your environment.

## DeerFlow vs. other agent tools

DeerFlow occupies a distinctive spot: it's a **complete super agent harness**, not just a framework library or a single agent.

| | DeerFlow | Agent frameworks (e.g. AgentScope) | Single local agents (e.g. AgenticSeek) |
| --- | --- | --- | --- |
| What it is | Full runtime harness | Library to build agents | A ready-to-run agent |
| Scope | Long-horizon, multi-hour tasks | Whatever you build | Personal autonomous tasks |
| Infrastructure | Sandboxes, memory, gateway built in | You assemble it | Bundled, simpler |
| Backing | ByteDance, MIT | Varies | Community, MIT |

Where a framework like [AgentScope](/tools/agentscope/) gives you the building blocks to *construct* an agent application, DeerFlow provides the whole environment for running capable agents on long tasks. And where a local agent like [AgenticSeek](/tools/agenticseek/) is a ready-made assistant, DeerFlow is heavier infrastructure aimed at sustained, production-style work. They reflect different points on the spectrum of the AI agent movement.

## Getting started with DeerFlow

If you're technically comfortable, trying DeerFlow is well-documented:

1. **Check the requirements.** You'll need Python 3.12+ (backend) and Node.js 22+ (frontend).
2. **Clone the repository** from the official GitHub and run the setup wizard with `make setup`, which guides you through configuring LLM providers, web search, and execution preferences.
3. **Choose a deployment.** Docker is recommended; local development and Kubernetes are also supported.
4. **Connect a model and a channel.** Configure your preferred LLM and, optionally, bind a chat platform like Telegram or Slack to send tasks.
5. **Read the docs.** The official site and repository cover configuration, skills, and production deployment in depth.

Start with a simple task to confirm the setup, then explore skills, sub-agents, and chat integration as you grow comfortable.

## The bottom line

DeerFlow answers a question that separates real agents from demos: *what does an AI agent need to actually finish a long, complex job?* ByteDance's answer is a complete super agent harness — sandboxes to run code, memory to persist, skills and tools to act, sub-agents to divide the work, and a gateway to receive tasks from your chat apps. Free and open-source under MIT, model-flexible, and battle-tested enough to top GitHub Trending, it's one of the most capable open agent runtimes available.

It's a technical, self-hosted tool built for developers and teams — not a consumer app — but for that audience, DeerFlow offers a remarkably complete foundation for autonomous work. If you want agents that research, code, and create over the long haul, it deserves a serious look.

To keep exploring the tools shaping the AI-agent era, browse our [AI Tools](/category/ai-tools/) and [Developer Tools](/category/developer/) categories, read our roundup of the [best AI tools in 2026](/guides/best-ai-tools-2026/), or explore the full [bla5k directory](/#directory).

*Official resources: the [DeerFlow website](https://deerflow.tech) and the [DeerFlow GitHub repository](https://github.com/bytedance/deer-flow).*

