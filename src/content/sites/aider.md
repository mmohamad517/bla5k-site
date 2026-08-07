---
name: Aider
url: https://aider.chat/
image: https://www.google.com/s2/favicons?domain=aider.chat&sz=128
subcategory: dev-code
tagline: "AI pair programming in your terminal — edits code in your local git repo with any LLM."
tags: [aider, pair programming, terminal, git, open source, coding]
featured: false
affiliate: false
metaTitle: "Aider: AI Pair Programming in Your Terminal"
metaDescription: "Aider — open-source AI pair programming tool. Edit code in your git repo using ChatGPT, Claude, or any LLM. Auto-commits with sensible messages."
simple: "Like having a coding partner in your terminal who can edit your files directly. Tell it what to change in plain English and it modifies your code and commits to git."
example: "Say 'add dark mode toggle to the settings page' and Aider edits the right files, creates the component, and auto-commits with a clear message."
goodFor:
  - "Developers who want AI pair programming"
  - "Git-based workflows (auto-commits)"
  - "Works with any LLM (OpenAI, Claude, local)"
  - "Open-source and free"
notFor:
  - "Non-git projects"
  - "Visual/GUI users"
faqs:
  - q: "What is Aider?"
    a: "Aider is an open-source, terminal-based AI pair programming tool. It reads your git repository, understands your codebase, and lets you request changes in plain English — then edits the files and commits the changes to git with sensible commit messages automatically."
  - q: "Is Aider free?"
    a: "Aider itself is free and open source (Apache-2.0). You pay only for the AI model you connect — it works with OpenAI, Anthropic Claude, Google Gemini, local models via Ollama, and any OpenAI-compatible API."
  - q: "Which AI models does Aider support?"
    a: "Aider supports ChatGPT (GPT-4 and newer), Claude, Gemini, DeepSeek, local models through Ollama or llama.cpp, and any OpenAI-compatible endpoint. This model-agnostic design is its biggest difference from single-model tools like Claude Code."
  - q: "How is Aider different from Claude Code or Copilot?"
    a: "Aider is open source, model-agnostic, and deeply git-integrated — every change it makes is a reviewable commit in your repo. Claude Code is Anthropic-only but more agentic (sub-agents, MCP). Copilot is an IDE autocomplete assistant rather than a terminal agent."
  - q: "Do I need to know git to use Aider?"
    a: "A basic understanding of git helps, but Aider automates most of it: it creates branches, stages files, and writes commit messages for you. Being in a git repository is required, since Aider uses git history to understand changes."
  - q: "Can Aider work on large codebases?"
    a: "Yes — Aider uses a repo map to understand the structure of large projects and can work across many files. You can also point it at specific files, and it tracks which files matter for each request."
---

The terminal is where serious coding happens — and increasingly, it's where AI coding happens too. **Aider** is the open-source tool that turned the terminal into an AI pair-programming workspace: it reads your git repository, edits files directly, and commits with sensible messages, using whatever LLM you choose. This guide covers what Aider is, how it works, and how it compares to the other AI coding agents.

For a broader look at AI coding tools, our guide to the [best AI tools in 2026](/guides/best-ai-tools-2026/) and the [Developer Tools directory](/category/developer/) are great companions.

## What is Aider?

Aider is an **open-source AI pair programming tool that runs in your terminal**. Created by Paul Gauthier, it pioneered the idea that the best interface for AI coding is the one developers already live in: the command line, with git underneath.

Unlike chat-based assistants where you paste code back and forth, Aider:

- **Reads your repository** and builds a map of its structure
- **Edits files directly** when you describe a change
- **Auto-commits** to git with clear, conventional messages
- **Works with any LLM** — OpenAI, Anthropic, Google, or local models

It's free, open source, and has become one of the most popular terminal AI tools — with a large community and rapid development.

## How Aider works

Aider's core loop is built around git:

1. **You launch Aider** in your repository directory.
2. **You describe a change** in plain language: "add validation to the signup form."
3. **Aider plans** — it identifies the relevant files using its repo map.
4. **Aider edits** — it modifies the code directly in your working tree.
5. **Aider verifies** — it can run tests or lint commands you configure.
6. **Aider commits** — it stages the changes and creates a commit with a descriptive message.

Because everything flows through git, every change is **reviewable and reversible**. You can see exactly what the AI did, in a normal diff, before you push it.

## Key features of Aider

### Direct file editing with git auto-commit

The signature feature: Aider **edits files and commits automatically**, so every change is tracked, described, and revertible. You review a normal git diff — no magic, no mystery.

### Any LLM you want

Aider is **model-agnostic**: ChatGPT, Claude, Gemini, DeepSeek, or local models via Ollama. You're never locked into one provider, and you can switch models for different tasks.

### Repo map for large codebases

Aider builds a **map of your repository** so it understands architecture — which files matter for your request — even in large projects with hundreds of files.

### Multi-file and multi-language

Aider handles **changes across many files and languages**, with strong support for refactoring, testing, and dependency updates.

### Chat and script modes

Use it **interactively** in the terminal, or drive it **programmatically** in scripts and CI pipelines for automated changes.

## Aider vs. Claude Code vs. Codex CLI

| | Aider | Claude Code | OpenAI Codex CLI |
| --- | --- | --- | --- |
| Open source | ✅ Apache-2.0 | ❌ | ✅ Apache-2.0 |
| Model choice | ✅ Any LLM | Claude only | OpenAI models |
| Git auto-commit | ✅ Core feature | Yes | Yes |
| Sub-agents | ❌ | ✅ Yes | Limited |
| Best for | Model-agnostic pairing | Deep agentic autonomy | OpenAI stack |

**Aider wins on flexibility** — any model, fully open, git-native. **Claude Code** is more agentic with sub-agents and MCP. **OpenAI Codex CLI** is the choice when you want OpenAI's models in the terminal. Many developers use more than one.

## Who is Aider for?

- **Developers who live in the terminal** and want AI that edits their repo.
- **Teams with git-based workflows** — every AI change is a reviewable commit.
- **Users of local or open models** — Aider connects to Ollama and llama.cpp.
- **Open-source enthusiasts** who want full control and no lock-in.

It's **not** for non-git projects, GUI-first developers, or beginners who'd be more comfortable in an IDE. For those, [GitHub Copilot](https://github.com/features/copilot) or [ChatGPT](/tools/chatgpt/) may be better starting points.

## How to get started with Aider

1. **Install Aider** — `pip install aider-chat` (Python required).
2. **Configure a model** — set your API key for OpenAI, Anthropic, or your local model.
3. **Open it in a repo** — `cd your-project && aider`.
4. **Describe a small change** — start with a focused task like adding error handling.
5. **Review the diff** — Aider shows you exactly what it changed.
6. **Scale up** — refactors, multi-file changes, and scripted automation.

Start with a small, well-scoped change to build trust, then let Aider tackle larger work as you get comfortable.

## The bottom line

Aider is the **open, model-agnostic way to do AI pair programming in the terminal**. Its git-native design — direct edits, auto-commits, reviewable diffs — fits how real developers work, and its freedom to use any LLM means you're never locked in. For terminal developers, it's an essential tool.

For deeper agentic coding with sub-agents, pair it with [Claude Code](/tools/claude-code/) or [OpenAI Codex CLI](/tools/codex-cli/), and explore the full [Developer Tools directory](/category/developer/).

*Official resource: [Aider](https://aider.chat/).*
