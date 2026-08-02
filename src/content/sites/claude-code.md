---
name: Claude Code
url: https://code.claude.com
subcategory: dev-ai-agents
tagline: Anthropic's agentic coding tool — reads your codebase, edits files, runs commands, and handles git workflows right from your terminal, IDE, or browser.
tags:
  - ai coding agent
  - terminal
  - anthropic
  - claude
  - mcp
  - agentic coding
  - open-source
  - devtools
featured: true
updated: 2026-08-01
metaTitle: "Claude Code: Anthropic's Agentic Coding Tool (2026 Guide)"
metaDescription: A complete guide to Claude Code — Anthropic's agentic coding tool for terminal, IDE, and browser. Features, pricing, MCP support, and how it compares to Codex CLI and Gemini CLI.
simple: "An AI coding assistant that works inside your terminal or editor. You describe a task in plain English — fix a bug, add a feature — and it reads your code, makes the changes, runs the tests, and commits the work."
example: "Type \"find why the login flow is slow and fix it\" and Claude Code digs through your codebase, pinpoints the bottleneck, edits the code, and proposes a pull request."
goodFor:
  - "Developers who want AI that works inside their real codebase"
  - "Turning a GitHub issue into a pull request"
  - "Reading, refactoring, and debugging large projects"
notFor:
  - "You only want quick one-off answers (use a chatbot instead)"
  - "You need it to act inside other apps on its own"
  - "You'd rather not let an AI touch your git history"
faqs:
  - q: What is Claude Code?
    a: Claude Code is Anthropic's agentic coding tool. It reads your codebase, edits files, runs commands, and integrates with your development tools — available in your terminal, IDE, desktop app, and browser. It can turn GitHub issues into pull requests, run code reviews, and manage git workflows through natural language.
  - q: How much does Claude Code cost?
    a: Claude Code is included with Claude Pro, Max, Team, and Enterprise plans (Pro from about $17/month billed annually). If you use it with an Anthropic Console API account, usage is billed at standard API token pricing instead.
  - q: Is Claude Code secure?
    a: Yes — it runs locally in your terminal and talks directly to model APIs without a backend server or remote code index. It asks permission before changing files or running commands, and Anthropic offers Zero Data Retention for Enterprise. It supports sandboxed Bash execution and permission modes.
  - q: Where can I run Claude Code?
    a: In the terminal on macOS, Linux, and Windows; as VS Code and JetBrains extensions; in the web at claude.ai/code; in the desktop app; on mobile; in Slack; and as a Chrome extension.
  - q: Does Claude Code support MCP?
    a: Yes — it supports MCP (Model Context Protocol) servers, letting it connect to external tools and data sources, along with skills, hooks, subagents, and plugins.
  - q: How is Claude Code different from Codex CLI or Gemini CLI?
    a: All three are coding agents for the terminal. Claude Code is Anthropic's offering, built around Claude models, with a strong focus on permission controls, agent teams, and git-driven workflows like turning issues into pull requests.
---

Anthropic's **Claude Code** is one of the most widely used agentic coding tools in the industry. Where earlier AI assistants answered questions about code, Claude Code works *inside* your codebase — it reads files, makes edits, runs commands, and even opens pull requests for you. In this guide we'll cover what Claude Code is, who builds it, how it works, what it can do, what it costs, and how it compares to alternatives like OpenAI's Codex CLI and Google's Gemini CLI.

## What is Claude Code?

Claude Code is Anthropic's **agentic coding tool**: a program that acts like an engineer on your project rather than a chat companion. You describe a task in plain language — "fix the broken checkout flow," "add a dark mode toggle," "explain what this module does" — and Claude Code reads the relevant parts of your codebase, plans the changes, edits files, runs commands to verify, and can commit the results to git.

It's available in multiple surfaces: a **terminal** tool (macOS, Linux, Windows), **VS Code** and **JetBrains** extensions, a **web** interface at claude.ai/code, a **desktop app**, **mobile**, **Slack**, and even a Chrome extension. Whichever surface you choose, the underlying capability is the same — an AI that can actually do work in your repository.

## Who creates Claude Code?

Claude Code is built by **Anthropic**, an AI safety and research company headquartered in San Francisco. Anthropic is the company behind the Claude family of large language models, and Claude Code is its flagship developer product. The official repository lives under the `anthropics` organization on GitHub, where it has amassed roughly 140,000 stars, making it one of the most popular AI developer tools ever released.

Anthropic's focus on safety and alignment shows in Claude Code's design: it asks permission before editing files or running commands, runs in the terminal without a backend server, and offers enterprise-grade controls like Zero Data Retention for business customers.

## When was Claude Code launched?

Claude Code launched as a public beta in **February 2025**, and the official GitHub repository was created on February 22, 2025. It reached general availability during 2025 and has shipped weekly releases since — as of mid-2026 it sits at version 2.1.x. In under a year and a half it went from beta to one of the standard tools in professional AI-assisted development.

## How Claude Code works

Claude Code works by combining Claude's language understanding with direct access to your project. Here's the mental model:

1. **You give it context** — a task, a file, an issue, or a natural-language instruction.
2. **It explores your codebase** — reading relevant files to understand structure, dependencies, and conventions. A `CLAUDE.md` file in your project root can give it persistent project memory and instructions.
3. **It takes actions** — editing files, running commands, running tests, managing branches, and committing changes, all through an agentic loop.
4. **It asks permission** — before making changes or running commands, so you stay in control. Permission modes can be tuned from "ask me everything" to more permissive setups.
5. **You review** — changes are presented for approval, and features like `/code-review` and checkpointing let you review what it did.

The agent runs locally in your terminal, talking directly to the model API. There's no backend server and no remote index of your code, which is why Anthropic emphasizes it for sensitive codebases.

## Key features of Claude Code

### Agentic terminal coding

The core experience: Claude Code reads your codebase, edits files, runs commands, and manages git workflows through natural language. It handles multi-file changes that require understanding of how your project fits together.

### Issues to pull requests

A signature workflow — point Claude Code at a GitHub or GitLab issue, and it produces a branch and a pull request implementing the fix. This turns "triaging the issue backlog" from a manual task into something you can delegate.

### Code review

The `/code-review` command has Claude review code for bugs, security issues, and style problems, giving you an automated second pass before you merge.

### Agent teams

Claude Code supports running multiple agents on a task — a "lead" agent can delegate sub-tasks to subagents, useful for large or parallelizable work. An **agent view** shows you what each agent is doing.

### CLAUDE.md project memory

A `CLAUDE.md` file in your project gives Claude Code persistent instructions, conventions, and context. Every session inherits it, so the tool always understands your project's ground rules.

### MCP support

Claude Code is a first-class citizen in the MCP (Model Context Protocol) ecosystem. MCP servers connect the agent to external tools and data — your internal APIs, databases, or specialized services.

### Skills, hooks, and plugins

**Skills** are reusable capabilities you can teach the agent. **Hooks** run custom scripts at lifecycle points (before edits, after commands) for guardrails and automation. **Plugins** package functionality for sharing.

### Sandboxed Bash

A sandboxed Bash tool lets Claude run commands with controlled permissions, reducing risk when it executes things like installs, builds, or tests.

### Multiple surfaces

Terminal, VS Code, JetBrains, web, desktop, mobile, Slack, and Chrome — Claude Code follows you across your workflow. **Routines** let you schedule recurring tasks, and **computer use** lets it operate the desktop in supported setups.

## What can you use Claude Code for?

- **Bug fixing** — describe a bug, and Claude Code traces it through your code and fixes it.
- **Feature development** — implement a feature across multiple files, following your existing patterns.
- **Refactoring** — restructure code safely, with tests to verify nothing broke.
- **Code review** — an automated second set of eyes before merging.
- **Issue triage** — turn GitHub/GitLab issues into branches and PRs.
- **Explaining code** — "walk me through the authentication flow" produces a clear guided tour.
- **Testing** — write and run tests, and fix the code they catch.

The through-line is that Claude Code does work *in* your repository rather than answering *about* it.

## Pricing: what does Claude Code cost?

Claude Code is **bundled with Claude subscription plans**:

- **Claude Pro** — around $17/month billed annually ($20 monthly). Includes Claude Code usage.
- **Claude Max** — from $100/month, with higher limits (5x and 20x tiers exist).
- **Team and Enterprise** — per-seat plans with admin controls, increased limits, and Zero Data Retention on Enterprise.

If you use Claude Code with an **Anthropic Console (API)** account instead, you're billed at standard API token rates for the models it uses. In practice, heavy professional use often moves to a Max plan or API billing for the higher limits.

## Integrations

- **Git platforms** — GitHub and GitLab, including issue-to-PR workflows.
- **MCP servers** — connect external tools and data via the Model Context Protocol.
- **Editors** — VS Code and JetBrains extensions.
- **Chat platforms** — Slack.
- **Cloud** — deploy through Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry.
- **SDK** — the Claude Agent SDK for Python and TypeScript lets you build your own agentic tools on the same foundation.

## Who is Claude Code for?

Claude Code is aimed at **developers who want an AI that works inside their real codebase** — not just a chat that answers questions. It's especially valuable for:

- **Professional developers** doing day-to-day feature work, bug fixes, and refactoring.
- **Teams** that want to turn issue backlogs into pull requests efficiently.
- **Solo developers and indie makers** who want a capable pair programmer.
- **Engineers working with sensitive code** who value local execution and permission controls.

If you only want quick answers or code snippets without the agentic loop, a plain chatbot is simpler. Claude Code's power is in working with your actual project, which also means it works best for people comfortable with git, terminals, and reviewing AI-generated changes.

## Advantages of Claude Code

- **Works in your codebase** — real file edits, command execution, and git workflows, not just suggestions.
- **Multi-surface** — terminal, IDE, web, desktop, mobile, Slack.
- **Strong permission model** — asks before acting; sandboxed Bash; configurable modes.
- **No backend server** — runs locally, good for sensitive projects.
- **MCP-native** — connects to a huge ecosystem of tools.
- **Issue-to-PR workflows** — turns backlog into branches and pull requests.
- **Huge ecosystem** — ~140k GitHub stars, active weekly releases, enterprise adoption.

## Limitations and honest considerations

- **It's still an AI** — it can produce confident-sounding wrong changes. Review what it edits, especially in unfamiliar code.
- **Best with context** — it shines when you give it good task descriptions and a `CLAUDE.md`; vague prompts get mediocre results.
- **Permission fatigue** — in strict permission modes it asks often, which can slow you down (though you can relax modes).
- **Cost at scale** — heavy professional use can push you toward Max plans or API billing.
- **You must review git history** — it commits and branches for you; make sure you understand what it changed.

None of these are disqualifying — they're the normal trade-offs of delegating real work to an AI. The key is using its permission system and reviewing its output.

## Security and privacy

Claude Code is designed with local execution in mind: the agent runs in your terminal and communicates directly with model APIs, without a backend server or remote code index. Anthropic offers **Zero Data Retention** for Enterprise customers, and permission modes plus the sandboxed Bash tool give you control over what it can execute.

As with any AI coding tool, your code is sent to the model provider for processing, so review Anthropic's data policies for sensitive work. For teams with strict compliance needs, Enterprise features (admin controls, ZDR, SSO) are designed to address those requirements.

## Claude Code vs. Codex CLI vs. Gemini CLI

| | Claude Code | OpenAI Codex CLI | Google Gemini CLI |
| --- | --- | --- | --- |
| **Developer** | Anthropic | OpenAI | Google |
| **Models** | Claude family | Codex / GPT family | Gemini family |
| **Signature feature** | Issue-to-PR, agent teams, strong permissions | Lightweight open-source terminal agent | Deep Google/MCP ecosystem, open source |
| **Surfaces** | Terminal, IDE, web, desktop, mobile, Slack | Terminal, IDE | Terminal, IDE (VS Code, Zed) |
| **License** | Open-source (permissive) | Apache-2.0 | Apache-2.0 |
| **Free to start** | Bundled with Claude plans | Free tier / ChatGPT plans | Free tier / Google AI plans |

All three are excellent agentic coding tools, and which one fits depends largely on your model and ecosystem preferences. Claude Code is Anthropic's offering — worth trying if you use Claude models or want its issue-to-PR and permission-first design.

## Getting started with Claude Code

Getting started takes minutes:

1. **Install it** — follow the official install guide at code.claude.com for your platform (npm install is the common path).
2. **Sign in** — authenticate with a Claude Pro/Max/Team account or an Anthropic API key.
3. **Run it in a repo** — open a terminal in your project and launch Claude Code.
4. **Add a CLAUDE.md** — give it project context and conventions for better results.
5. **Start simple** — try a small refactor or a bug fix first, review what it does, then scale up to issues-to-PR workflows.

A great first task: pick a small, well-understood bug in your own project and ask Claude Code to fix it. You'll quickly see how it explores your code, proposes changes, and works with git.

## The bottom line

Claude Code is Anthropic's answer to a simple question: *what if the AI actually did the work in your codebase?* It reads, edits, runs, and commits — turning plain-language instructions into real changes, from bug fixes to full pull requests. With a local-first design, strong permission controls, MCP support, and a huge community behind it, it has become one of the standard agentic coding tools.

It's bundled with Claude plans, works across terminal, IDE, and web, and shines for developers and teams who want an AI pair programmer that operates inside their real project. If you're already in the Claude ecosystem — or you want the most capable agentic workflow available — Claude Code deserves a serious look.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [Claude Code website](https://code.claude.com), the [Claude Code documentation](https://docs.claude.com), and the [official GitHub repository](https://github.com/anthropics/claude-code).*
