---
name: OpenAI Codex CLI
url: https://github.com/openai/codex
subcategory: dev-code
tagline: "Open-source terminal coding agent by OpenAI — sandboxed execution, multi-file edits, Apache-2.0 licensed."
tags: [openai, codex, cli, open source, coding agent, terminal, gpt]
featured: false
affiliate: false
metaTitle: "OpenAI Codex CLI: Open-Source Terminal Coding Agent"
metaDescription: "OpenAI Codex CLI — open-source (Apache-2.0) terminal coding agent with sandboxed execution. 75K+ GitHub stars, powered by GPT models."
simple: "An open-source AI that codes in your terminal. It reads your project, proposes changes across multiple files, and runs commands safely in a sandbox."
example: "Run 'codex refactor the API to use async/await' and it scans your codebase, rewrites the functions, and tests them in a safe sandbox."
goodFor:
  - "Open-source enthusiasts (Apache-2.0)"
  - "Safe sandboxed code execution"
  - "Multi-file project changes"
  - "Developers wanting OpenAI models in terminal"
notFor:
  - "Windows without WSL"
  - "Non-developers"
  - "Offline use (needs API)"
faqs:
  - q: "What is the OpenAI Codex CLI?"
    a: "Codex CLI is OpenAI's open-source terminal coding agent. It reads your repository, understands your code, proposes and applies multi-file changes, and can run commands — all from the command line, powered by OpenAI's GPT models."
  - q: "Is Codex CLI free?"
    a: "The Codex CLI software itself is free and open source under the Apache-2.0 license. Using it requires an OpenAI API key or a ChatGPT Plus/Pro subscription, which bills for the underlying model usage."
  - q: "How does Codex CLI keep my system safe?"
    a: "Codex CLI runs commands in a sandboxed environment by default, limiting what the agent can do to your system. You review changes and approve command execution, keeping an extra layer of human control between the AI and your machine."
  - q: "How is Codex CLI different from Claude Code?"
    a: "Codex CLI is OpenAI's answer to Claude Code: both are terminal coding agents. Codex uses OpenAI models and is open source with sandboxed execution; Claude Code uses Anthropic's models with sub-agents and MCP support. Choose based on which model family you prefer."
  - q: "Does Codex CLI work on Windows?"
    a: "Codex CLI targets Unix-like environments; on Windows you'll typically use it through WSL (Windows Subsystem for Linux). macOS and Linux are the primary supported platforms."
---

OpenAI's models are famous — now they have a terminal agent to go with them. **OpenAI Codex CLI** is the open-source coding agent that reads your repository, makes multi-file changes, and runs commands safely in a sandbox, all from the terminal. This guide covers what Codex CLI is, how it works, and how it stacks up against Claude Code and Aider.

For more AI coding tools, explore the [Developer Tools directory](/category/developer/) and our [best AI tools in 2026](/guides/best-ai-tools-2026/) roundup.

## What is OpenAI Codex CLI?

OpenAI Codex CLI is **OpenAI's open-source coding agent for the terminal**. Released in 2025, it quickly became one of the most-starred repositories on GitHub. It brings OpenAI's GPT models directly into your development workflow:

- **Reads your codebase** to understand architecture
- **Proposes multi-file changes** you can review and apply
- **Runs commands** in a sandboxed environment
- **Works with git** for tracked, reversible changes

It's built on the same Codex lineage as OpenAI's coding models, packaged as a lightweight, open tool any developer can run locally.

## How Codex CLI works

The workflow is agentic but controlled:

1. **You run `codex`** in your project directory.
2. **You describe a task** — "add tests for the payment module."
3. **Codex explores** — it reads the relevant files and forms a plan.
4. **Codex proposes edits** — multi-file changes shown for your approval.
5. **You approve** — Codex applies the changes.
6. **Codex runs commands** — tests and builds, in a sandbox, with your review.

The sandbox is the key safety feature: Codex can execute commands, but in a restricted environment, and you decide what actually runs on your system.

## Key features of Codex CLI

### Sandboxed command execution

Codex runs commands **in a sandbox by default**, protecting your system while still letting the agent test and verify its work. You approve real execution.

### Multi-file edits

Codex handles **changes across many files** — refactors, feature additions, and bug fixes that span modules — with diffs you review before applying.

### Open source (Apache-2.0)

The CLI is **fully open source** with a permissive license, so you can inspect, customize, and contribute to the tool itself.

### OpenAI model power

Runs on **OpenAI's GPT family** — including the coding-tuned models — with the option to use different models for different tasks.

### Git-aware workflow

Changes integrate with **git**, so everything is reviewable and reversible like any normal development change.

## Codex CLI vs. Claude Code vs. Aider

| | Codex CLI | Claude Code | Aider |
| --- | --- | --- | --- |
| Open source | ✅ Apache-2.0 | ❌ | ✅ Apache-2.0 |
| Models | OpenAI | Claude | Any LLM |
| Sandboxed commands | ✅ Yes | Partial | Partial |
| Best for | OpenAI stack | Deep agentic work | Model freedom |

**Codex CLI** is the pick when you're in the OpenAI ecosystem. **Claude Code** excels at deep autonomous work with sub-agents. **Aider** offers total model freedom. They're complementary tools in the same category — many developers keep two installed.

## Who is Codex CLI for?

- **OpenAI API users** who want GPT models in the terminal.
- **Open-source enthusiasts** who value Apache-2.0 licensing.
- **Developers** who want safe, sandboxed AI command execution.
- **Teams on macOS/Linux** (or Windows via WSL).

It's **not** for Windows-only developers without WSL, non-developers, or offline use (it requires an API connection). For offline or fully local AI coding, [Aider](/tools/aider/) with a local model is the better path.

## How to get started with Codex CLI

1. **Install Codex CLI** — via npm or a package manager on macOS/Linux (or WSL).
2. **Authenticate** — connect your OpenAI account or set an API key.
3. **Open it in a repo** — `cd your-project && codex`.
4. **Describe a task** — start small, like "fix this failing test."
5. **Review proposed changes** — approve edits and command runs.
6. **Explore the sandbox** — try a task that requires running commands.

Start with a focused bug fix, then expand to refactors and multi-file features as you learn the approval flow.

## The bottom line

OpenAI Codex CLI brings **OpenAI's models to your terminal as a safe, open coding agent**. Sandboxed execution, reviewable multi-file edits, and an Apache-2.0 license make it a strong choice for developers in the OpenAI ecosystem — and a worthy open-source sibling to Claude Code.

For a model-agnostic alternative, try [Aider](/tools/aider/), and for deep agentic workflows, [Claude Code](/tools/claude-code/). Explore more in our [Developer Tools directory](/category/developer/).

*Official resource: [OpenAI Codex CLI on GitHub](https://github.com/openai/codex).*
