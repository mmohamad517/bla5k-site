---
name: OpenAI Codex CLI
url: https://github.com/openai/codex
image: /logos/codex-cli.png
screenshot: /screens/codex-cli.webp
subcategory: dev-ai-agents
tagline: OpenAI's lightweight, open-source coding agent that runs in your terminal — reads your repo, writes code, and opens pull requests.
tags:
  - ai coding agent
  - terminal
  - openai
  - codex
  - open-source
  - cli
  - rust
  - devtools
featured: true
updated: 2026-08-01
metaTitle: "OpenAI Codex CLI: The Lightweight Terminal Coding Agent (2026)"
metaDescription: A complete guide to OpenAI's Codex CLI — a lightweight open-source coding agent for your terminal.
simple: "An AI coding assistant you run inside your terminal. It reads your repository, writes and edits code, and can open pull requests on GitHub — powered by OpenAI's Codex models."
example: "Run codex in your repo and ask it to 'add input validation to the signup form' — it edits the code, runs it, and offers to open a pull request."
goodFor:
  - "Developers who like working in the terminal"
  - "Lightweight, open-source AI coding agents"
  - "Turning tasks into GitHub pull requests"
notFor:
  - "You want a full IDE experience with a graphical diff"
  - "You prefer a tightly integrated product with plans bundled"
  - "You need non-OpenAI models out of the box"
faqs:
  - q: What is Codex CLI?
    a: Codex CLI is OpenAI's lightweight coding agent that runs in your terminal. It executes coding tasks using OpenAI's Codex models, reads your repository, writes code, and can generate or propose pull requests. The source is open and available on GitHub under the Apache-2.0 license.
  - q: Is Codex CLI free?
    a: The CLI itself is open source. Usage is free on the Free tier with rate limits; higher limits come with ChatGPT Go, Plus, Pro, Business, and Enterprise plans, or you can bring your own OpenAI API key and pay per usage.
  - q: How do I use Codex CLI?
    a: Install it from the official GitHub repo or npm, sign in with your ChatGPT account or an API key, then run it inside any git repository. It reads project instructions from an AGENTS.md file and works in your terminal or IDE.
  - q: Does Codex CLI work with models other than OpenAI?
    a: It's designed for OpenAI models via ChatGPT sign-in or an API key, and it supports connecting to certain models through the OpenAI Responses API ecosystem.
  - q: Can Codex CLI open pull requests?
    a: Yes — it can generate and propose pull requests on GitHub, and it integrates with your existing repository workflow.
  - q: How does Codex CLI compare to Claude Code or Gemini CLI?
    a: Codex CLI is OpenAI's entry in the terminal coding-agent category, known for being lightweight and open source. Claude Code is Anthropic's offering, and Gemini CLI is Google's — all three compete in the same space.
---

OpenAI's **Codex CLI** is a lightweight, open-source coding agent that runs in your terminal. Where full IDEs and cloud agents bring a heavy interface, Codex CLI stays lean: you open a terminal in any git repository, describe a task, and the agent reads your code, makes changes, and can open a pull request. In this guide we'll cover what Codex CLI is, who builds it, how it works, pricing, and how it compares to rivals like Claude Code and Gemini CLI.

## What is Codex CLI?

Codex CLI is **OpenAI's terminal-based coding agent**. It's a lightweight program that executes coding tasks with OpenAI's Codex family of models directly in your command line. You run it inside a git repository, give it a task in plain language, and it explores the code, writes and edits files, runs commands, and can propose pull requests — all from the terminal.

The project is **open source**, released under the Apache-2.0 license, and lives in the `openai/codex` repository on GitHub. Its official description is simply "a lightweight coding agent that runs in your terminal."

## Who creates Codex CLI?

Codex CLI is built by **OpenAI**, the AI research and deployment company in San Francisco that created ChatGPT, GPT models, and the Codex model family. The Codex name originally referred to the model behind GitHub Copilot; today it's OpenAI's broader line of coding models and agents. The CLI is the official open-source way to use Codex models from your terminal.

## When was Codex CLI launched?

Codex CLI was open-sourced in **April 2025** — the repository was created on April 13, 2025, with the first tagged release later that month. It has been actively maintained ever since, with very frequent releases; by mid-2026 it was at version 0.147.x-alpha. Its GitHub repository has grown to roughly **103,000 stars**, making it one of the most popular coding agents available.

## How Codex CLI works

Codex CLI is built around a simple, terminal-first workflow:

1. **Install and authenticate** — install from the GitHub repo or npm, then sign in with a ChatGPT account or provide an OpenAI API key.
2. **Run it in a repository** — start Codex CLI inside any git repo.
3. **Describe a task** — tell it what you want in natural language.
4. **It works in your repo** — reading files, understanding structure, editing code, and executing commands in a sandboxed environment.
5. **Review and push** — the agent can generate or propose pull requests on GitHub, and you review before merging.

It reads project instructions from an **AGENTS.md** file — a convention for giving the agent project-specific guidance. A **sandboxed execution** mode restricts what the agent can do, reducing risk when it runs commands.

The CLI also pairs with OpenAI's cloud-based Codex agent in the ChatGPT app, so you can move between your terminal and a hosted session.

## Key features of Codex CLI

- **Terminal-native** — a lightweight agent that runs wherever you run code.
- **Agentic coding** — reads your repo, edits files, and runs commands to complete tasks.
- **AGENTS.md support** — per-project instructions the agent follows automatically.
- **Sandboxed execution** — safer command execution for agent tasks.
- **Pull request generation** — propose changes as GitHub PRs.
- **MCP support** — connect external tools through the Model Context Protocol.
- **Sign in with ChatGPT or API key** — flexible authentication, with free API credits on Plus and Pro plans.
- **Open source** — Apache-2.0 licensed; a community fork exists for providers beyond OpenAI.

## What can you use Codex CLI for?

- **Writing and editing code** — implement features, fix bugs, and refactor across files.
- **Repository exploration** — "explain how this module works" produces a guided walkthrough.
- **Automated changes** — scripted, repeatable code changes across a project.
- **Pull request proposals** — turn a task description into a ready-to-review PR.
- **Local development tasks** — running builds, tests, and commands in your repo.

## Pricing: what does Codex CLI cost?

Codex CLI usage follows OpenAI's tiered plans:

- **Free tier** — $0, with rate limits; enough to try the agent.
- **Go** — $8/month, a mid-tier for higher limits.
- **ChatGPT Plus** — $20/month, includes higher Codex usage.
- **Pro** — from $100/month for heavy use.
- **Business** — $20/user/month (annual) for teams.
- **Enterprise** — custom.

Alternatively, you can bring your own OpenAI API key and be billed **per usage** at API rates. The CLI tool itself is free and open source — the cost is in the model usage it drives.

## Integrations

- **GitHub** — repository workflow, pull request generation.
- **ChatGPT app** — pairs with the hosted Codex cloud agent.
- **Terminal / CLI** — runs in any git repository.
- **VS Code** — works alongside your editor.
- **MCP servers** — Model Context Protocol for external tools.
- **OpenAI Responses API** — models like `codex-mini-latest` accessible programmatically.

## Who is Codex CLI for?

Codex CLI is aimed at **developers who live in the terminal** and want a fast, open-source AI coding agent. It's a strong fit for:

- **Terminal-focused developers** who prefer CLI tools over heavy IDE integrations.
- **Open-source enthusiasts** who want to inspect and extend the tool itself.
- **Anyone in the OpenAI ecosystem** using ChatGPT plans or the Codex API.
- **Developers who want lightweight, scriptable agentic coding**.

If you prefer a more opinionated, bundled product or need a graphical diff-heavy IDE experience, other tools may fit better. Codex CLI's appeal is its simplicity and openness.

## Advantages of Codex CLI

- **Lightweight** — runs in the terminal, no heavy interface.
- **Open source** — Apache-2.0, inspectable and extensible (with community forks).
- **Free to start** — free tier and free API credits on Plus/Pro.
- **Git-native** — works in any repo, generates pull requests.
- **Sandboxed execution** — safer command running.
- **Actively maintained** — very frequent releases and ~103k GitHub stars.

## Limitations and honest considerations

- **OpenAI models only (mostly)** — designed for the Codex model family via ChatGPT or API key; the community fork addresses other providers.
- **Terminal-first** — you manage the command line, not a graphical IDE experience.
- **Review needed** — as with any agent, review its edits before merging.
- **Rate limits** — free tier limits can be restrictive for heavy use.

## Security and privacy

Codex CLI runs locally and uses **sandboxed execution** for agent tasks, reducing the blast radius of commands the agent runs. It's Apache-2.0 open source, so the code is inspectable. Your code and prompts are processed by OpenAI's models when you sign in with ChatGPT or an API key — review OpenAI's data policies for sensitive work, and use an API key with enterprise controls where needed.

## Codex CLI vs. Claude Code vs. Gemini CLI

| | Codex CLI | Claude Code | Gemini CLI |
| --- | --- | --- | --- |
| **Developer** | OpenAI | Anthropic | Google |
| **Models** | Codex / GPT family | Claude family | Gemini family |
| **Style** | Lightweight, minimal | Feature-rich, permission-first | Deep Google/MCP ecosystem |
| **License** | Apache-2.0 | Open source | Apache-2.0 |
| **Pricing** | Free tier + ChatGPT plans + API | Bundled with Claude plans | Free tier + Google AI plans |
| **Best for** | Terminal purists, OSS fans | Teams wanting issue-to-PR workflows | Google ecosystem users |

All three are excellent terminal coding agents. Codex CLI's angle is **lightness and openness** — a minimal, fast, open-source agent in the OpenAI ecosystem.

## Getting started with Codex CLI

1. **Install it** — follow the install steps in the official GitHub repo (`openai/codex`) or install via npm.
2. **Authenticate** — sign in with ChatGPT or set an OpenAI API key.
3. **Open a repository** — run it in a terminal inside any git project.
4. **Add an AGENTS.md** — optional, but it improves results with project context.
5. **Try a task** — start with something small, review the diff, and merge or iterate.

A good first experiment: ask it to add a feature to a side project and watch it work through the repo, then review and merge the pull request it proposes.

## The bottom line

Codex CLI is OpenAI's lightweight answer to agentic coding in the terminal. It's open source, fast, and git-native — reading your repo, writing code, and opening pull requests on command. Free to start, with usage covered by ChatGPT plans or pay-per-use API billing, it's a strong choice for developers who live in the terminal and want the OpenAI ecosystem.

If you're already on ChatGPT or use OpenAI's Codex models, it's the natural terminal companion. And for the broader landscape of agentic coding tools, compare it against Claude Code and Gemini CLI to find the right fit.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/directory/).

*Official resources: the [Codex CLI GitHub repository](https://github.com/openai/codex) and [Codex documentation](https://learn.chatgpt.com/codex/).*
