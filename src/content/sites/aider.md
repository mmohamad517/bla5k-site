---
name: Aider
url: https://aider.chat
subcategory: dev-ai-agents
tagline: AI pair programming in your terminal — lets an LLM edit code in your git repo from a terminal chat, with auto-commits and a repository map.
tags:
  - ai coding agent
  - terminal
  - open-source
  - apache-2.0
  - python
  - multi-llm
  - git-integrated
  - devtools
featured: false
updated: 2026-08-01
metaTitle: "Aider: AI Pair Programming in Your Terminal (2026 Guide)"
metaDescription: A complete guide to Aider — the open-source AI pair programmer for your terminal. Git-integrated code edits, repository maps, 100+ languages, and dozens of LLM providers.
simple: "An AI coding partner that lives in your terminal. You chat with it, and it edits code in your project and auto-commits each change to git — like pair programming with a model that actually does the work."
example: "In your project, run aider and say 'add error handling to the API calls' — it edits the files and commits the change to git automatically."
goodFor:
  - "Developers who work in the terminal and use git"
  - "People who want AI code edits committed cleanly"
  - "Users of many different LLM providers, including local models"
notFor:
  - "You want a full IDE experience"
  - "You need a hosted, managed product"
  - "You're not comfortable with git"
faqs:
  - q: What is Aider?
    a: Aider is "AI pair programming in your terminal." It's an open-source tool that lets an LLM edit code in your git repo from a terminal chat. It builds a repository map for context, makes code edits, and auto-commits each change to git.
  - q: Is Aider free?
    a: Yes — Aider is free and open source under the Apache-2.0 license. There's no subscription; you bring your own LLM API keys or provider subscriptions and pay providers at their rates.
  - q: Which LLMs can Aider use?
    a: Many cloud models — OpenAI, Anthropic, Gemini, and more via OpenRouter, Groq, xAI, Azure, Bedrock, and Vertex — plus local models through Ollama and LM Studio.
  - q: How does Aider make its code edits?
    a: It runs in your terminal inside a git repo, builds a compact repository map for codebase context, edits files to implement your requests, and auto-commits each change with a descriptive message.
  - q: Who created Aider?
    a: Aider was created by Paul Gauthier and is now backed by Aider AI LLC. It has grown to roughly 48,000 GitHub stars since its launch in May 2023.
  - q: Does Aider support voice or image input?
    a: Yes — Aider supports voice-to-code and can take images and web pages as input to inform its edits.
---

**Aider** was one of the earliest tools to make "AI pair programming in your terminal" a reality. It's been around since 2023, quietly becoming a favorite of developers who live in the terminal and git. In this guide we'll cover what Aider is, who builds it, how it works, what it costs, and how it compares to the newer generation of coding agents.

## What is Aider?

Aider is **AI pair programming in your terminal**. It's an open-source command-line tool that lets a large language model edit code in your git repository from a terminal chat. You describe what you want in natural language, and Aider:

1. Builds a **repository map** to give the model context about your codebase.
2. Makes the **code edits** across the relevant files.
3. **Auto-commits** each change to git with a descriptive commit message.

Because it works inside git, every change is tracked, reviewable, and reversible. It's a genuinely useful pair programmer for developers comfortable with the command line.

## Who creates Aider?

Aider was created by **Paul Gauthier**, who remains its top contributor with over 12,000 commits. It's now backed by **Aider AI LLC**, the company behind the tool. Since its repository was created in **May 2023**, it has grown to roughly **48,000 GitHub stars** with over 6.8 million PyPI installs and around 15 billion tokens processed weekly.

## How Aider works

Aider's workflow is simple and git-centric:

1. **Run it in a repo** — `aider` in your terminal inside a git repository.
2. **Chat with it** — describe a change you want in plain language.
3. **It builds a repo map** — a compact representation of your codebase so the model understands context.
4. **It edits files** — implementing your request across the relevant files.
5. **It auto-commits** — each change is committed to git with a descriptive message.
6. **You review and iterate** — continue the conversation, ask for tweaks, or revert with git.

The repository map is a key innovation — it lets the model navigate your codebase efficiently without sending the entire repository, keeping costs and context manageable.

## Key features of Aider

- **Terminal-based pair programming** — edit code through natural-language chat.
- **Repository map** — codebase context that keeps edits relevant.
- **Git-integrated** — auto-commits every change; everything is reviewable.
- **100+ languages** — broad language support.
- **Many LLM providers** — OpenAI, Anthropic, Gemini, OpenRouter, Groq, xAI, Azure, Bedrock, Vertex, plus local Ollama and LM Studio.
- **Voice-to-code** — speak your requests.
- **Image and web-page input** — give the model visual or page context.
- **IDE watch mode** — works alongside your editor.
- **Scripting API** — automate Aider in your own tooling.
- **LLM code-editing leaderboards** — the site maintains benchmarks of model code-editing ability.

## What can you use Aider for?

- **Feature implementation** — describe a feature, Aider implements it.
- **Bug fixes** — explain the bug, Aider finds and fixes it.
- **Refactoring** — restructure code with git-tracked changes.
- **Learning a codebase** — ask questions and get context-aware answers.
- **Automated changes** — scripted edits via the API.
- **Local-model coding** — run Aider with Ollama or LM Studio for private, on-device AI.

## Pricing: what does Aider cost?

Aider is **free and open source** under the **Apache-2.0** license. There's no subscription and no managed service — you bring your own LLM API keys or provider subscriptions and pay those providers at their rates. This makes Aider one of the most cost-flexible options: you choose the model and pay only for the tokens you use.

## Integrations

- **LLM providers** — OpenAI, Anthropic, Gemini, OpenRouter, Groq, xAI, Azure, Bedrock, Vertex, Ollama, LM Studio, and more.
- **Git** — every edit is a commit.
- **Terminal and browser** — terminal chat plus a browser interface.
- **IDE watch mode** — pairs with your editor.
- **Python scripting API** — build custom automation.

## Who is Aider for?

Aider is aimed at **developers who are comfortable in the terminal and use git**. It's a strong fit for:

- **Terminal-focused developers** who want AI pair programming.
- **Git users** who value every change being committed and reviewable.
- **Model-agnostic users** who want to choose their LLM provider, including local models.
- **Privacy-conscious users** who want on-device AI with Ollama or LM Studio.

If you want a hosted product or a full IDE, Aider isn't that — but for terminal-and-git developers it's a proven, capable tool.

## Advantages of Aider

- **Free and open source** — Apache-2.0, no subscription.
- **Git-native** — auto-commits make changes safe and reviewable.
- **Model-agnostic** — dozens of providers, cloud and local.
- **Proven** — since 2023, ~48k stars, 6.8M+ installs.
- **Repository map** — efficient, relevant codebase context.
- **Voice, image, and web input** — flexible ways to express intent.

## Limitations and honest considerations

- **Terminal-focused** — not a full IDE experience.
- **Requires git comfort** — the workflow is built around git commits.
- **You manage providers** — bring your own API keys and handle costs.
- **AI caveats** — as with any AI coding tool, review its edits.

## Security and privacy

Aider runs locally in your terminal, and your choice of provider determines where your code goes. For private work, local models (Ollama, LM Studio) keep everything on your machine. It has an optional analytics feature you can disable. As always, review your provider's data policies for sensitive codebases.

## Aider vs. Claude Code vs. Codex CLI

| | Aider | Claude Code | Codex CLI |
| --- | --- | --- | --- |
| **Style** | Git-auto-commit pair programming | Feature-rich agentic coding | Lightweight terminal agent |
| **Since** | 2023 | 2025 | 2025 |
| **License** | Apache-2.0 | Open source | Apache-2.0 |
| **Model choice** | Very broad, incl. local | Claude-focused | OpenAI-focused |
| **Signature** | Repo map + auto-commit | Issue-to-PR, agent teams | Minimal, open source |

Aider's longevity and broad model support make it a distinctive choice — it doesn't lock you into one vendor.

## Getting started with Aider

1. **Install it** — `pip install aider-chat` (or use the installer on aider.chat).
2. **Add a provider** — set your API key for the LLM you want to use.
3. **Open a repo** — run `aider` in your project.
4. **Chat** — describe a change you want.
5. **Review commits** — check the auto-commits and continue iterating.

A great first task: add a small feature to a side project and watch Aider edit and commit it.

## The bottom line

Aider is a proven, open-source AI pair programmer that lives where many developers already work — the terminal and git. Its repository map and auto-commit workflow make AI code edits safe, reviewable, and reversible, and its support for dozens of providers (including local models) means no vendor lock-in and full control over cost. If you're a terminal-and-git developer, Aider is a genuinely useful addition to your toolkit.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [Aider website](https://aider.chat) and the [official GitHub repository](https://github.com/Aider-AI/aider).*
