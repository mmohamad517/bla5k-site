---
name: Claude Code
url: https://docs.anthropic.com/en/docs/claude-code
image: https://www.google.com/s2/favicons?domain=docs.anthropic.com&sz=128
subcategory: dev-code
pricing: paid
tagline: "Anthropic's agentic coding CLI — reads, writes, tests, and debugs your codebase from the terminal."
tags: [claude code, anthropic, cli, coding agent, terminal, ai coding]
featured: false
affiliate: false
metaTitle: "Claude Code: Anthropic's Terminal AI Coding Agent"
metaDescription: "Claude Code by Anthropic — agentic CLI that reads, writes, tests, and refactors code autonomously. Sub-agents, MCP support, and multi-repo orchestration."
simple: "An AI coding partner that lives in your terminal. Describe what you want changed and it reads your code, edits files, runs tests, and fixes bugs — all by itself."
example: "Type 'fix the login bug in auth.ts' and Claude Code reads the file, finds the issue, writes the fix, runs the tests, and commits — hands-free."
goodFor:
  - "Professional developers who live in the terminal"
  - "Complex multi-file refactoring"
  - "Automated testing and debugging"
  - "Teams using git-based workflows"
notFor:
  - "Beginners (requires terminal comfort)"
  - "Visual/GUI-first developers"
  - "Non-coding tasks"
faqs:
  - q: "What is Claude Code?"
    a: "Claude Code is Anthropic's agentic coding tool that runs directly in your terminal. Unlike a chatbot you copy-paste code into, Claude Code can read your entire project, plan changes across multiple files, edit code, run tests and commands, and iterate until the task is done — all within your existing git workflow."
  - q: "Is Claude Code free to use?"
    a: "Claude Code requires an Anthropic API key or a Claude Pro/Max subscription. It bills per token used, and usage is typically much lower than the cost of manual back-and-forth prompting because it reads only the files it needs. Anthropic regularly includes Claude Code access with higher-tier subscriptions."
  - q: "How is Claude Code different from ChatGPT or Copilot?"
    a: "ChatGPT and GitHub Copilot are assistants you prompt manually. Claude Code is agentic: it can autonomously read your repo, decide which files matter, make edits, run tests, and correct its own mistakes across multiple steps. It also supports sub-agents that work in parallel and MCP servers that connect it to external tools and data."
  - q: "Can Claude Code be used in CI/CD?"
    a: "Yes. Claude Code is designed for automation and can run headless in CI pipelines. Teams use it for automated refactoring, dependency updates, test generation, and code review, orchestrating it across multiple repositories with its multi-repo mode."
  - q: "Does Claude Code support other models?"
    a: "Claude Code is built around Anthropic's Claude models, but its MCP (Model Context Protocol) support lets it connect to external tools, databases, and services. For a model-agnostic terminal coding agent, developers often compare it with tools like Aider, which work with any LLM."
---

Terminal-based AI coding tools have changed how developers work, and **Claude Code** is one of the most capable agentic coding CLIs available. Instead of pasting code into a chatbot, you run Claude Code in your project directory and it becomes an active collaborator: reading your files, understanding your architecture, making edits, running tests, and fixing what breaks. In this complete guide, we'll cover what Claude Code is, how it works, its standout features, how it compares to alternatives, and how to start using it today.

For a wider view of the AI coding landscape, our guide to the [best AI tools to boost productivity in 2026](/guides/top-7-ai-tools-to-boost-productivity-in-2026-a-complete-guide/) is a great companion read.

## What is Claude Code?

Claude Code is **Anthropic's agentic coding assistant that runs in your terminal**. It was built on the observation that the most powerful way to use a frontier model for software work is to give it direct access to your codebase and the tools to act on it.

Concretely, Claude Code can:

- Read and understand an entire repository structure
- Edit multiple files in a single session
- Run terminal commands, tests, and linters
- Create and manage git branches and commits
- Route sub-tasks to parallel sub-agents
- Connect to external services via MCP servers

It works on macOS, Linux, and Windows, integrates natively with git, and was designed from the ground up for real software workflows — not toy examples. Claude Code quickly became one of the most widely adopted agentic coding tools after its release, with developers using it for everything from bug fixes to full-scale refactors.

## How Claude Code works

The core loop is simple: you describe a task, and Claude Code plans and executes it autonomously.

1. **You launch Claude Code** inside your project directory.
2. **You describe the goal** — for example, "add pagination to the orders table" or "migrate this from CommonJS to ESM".
3. **Claude Code explores** — it reads your file tree, opens the relevant files, and checks your dependencies and configuration.
4. **It plans and edits** — it proposes changes, writes them to files, and shows you a diff.
5. **It verifies** — it runs tests, type checks, or linters, and iterates on failures.
6. **You review and approve** — Claude Code can even commit the final result with a sensible message.

Because it's a CLI, Claude Code is non-destructive by default: it shows you what it plans to change and can run in a review mode where it only proposes edits. You stay in control of what gets applied, while the agent handles the mechanical work.

## Key features of Claude Code

### Agentic multi-file editing

The headline capability. Claude Code **edits across your whole codebase**, not just one file. It understands how changes in one module affect another and can update tests, documentation, and configuration alongside the code itself.

### Autonomous command execution

Claude Code can **run terminal commands**: build your project, run tests, install packages, and check the results. When something fails, it reads the error output and tries again — closing the loop that manual prompting leaves open.

### Sub-agents for parallel work

For large tasks, Claude Code spins up **sub-agents that work in parallel**, each focused on a piece of the problem. This dramatically speeds up big refactors and multi-module changes, and it's a capability few other coding tools offer at the same level.

### MCP (Model Context Protocol) support

Claude Code connects to **MCP servers**, giving it access to external tools, APIs, databases, and internal documentation. This turns it from a code editor into a general automation agent that can, for example, query your production database, check your issue tracker, or read internal wikis while it works.

### Multi-repository orchestration

Claude Code can work across **multiple repositories in a single session** — useful for monorepos, microservice architectures, and cross-project changes where a fix in one repo requires updates in another.

### Git-native workflow

Every change is **git-aware**. Claude Code creates branches, shows diffs, and writes conventional commit messages. This makes it safe to use in real teams where review discipline matters.

## Claude Code vs. other AI coding tools

| | Claude Code | Aider | GitHub Copilot |
| --- | --- | --- | --- |
| Where it runs | Terminal CLI | Terminal CLI | IDE extension |
| Agentic multi-step work | Yes, with sub-agents | Yes | Limited |
| Runs commands/tests itself | Yes | Yes (limited) | No |
| Model choice | Claude models | Any LLM | Multiple |
| Best for | Deep, autonomous refactoring | Model-agnostic terminal pairing | Inline completion while typing |

If you want to run a terminal coding agent with **any** LLM — including local models — [Aider](/tools/aider/) is the popular open-source option. If you want deep, autonomous, multi-file work powered by Anthropic's strongest models, Claude Code is the reference implementation.

## Who is Claude Code for?

Claude Code is built for **developers who are comfortable in the terminal** and want to move faster on real work. It shines for:

- **Professional software engineers** doing daily feature work and refactoring
- **Full-stack developers** touching frontend, backend, and infrastructure in one session
- **Tech leads** who want AI to handle boilerplate while they review architecture
- **Open-source maintainers** automating dependency bumps, test coverage, and PR polish

It is **not** for absolute beginners, GUI-first developers who prefer a visual editor experience, or people who want AI for non-coding tasks. For those cases, a chatbot like [ChatGPT](/tools/chatgpt/) or [DeepSeek](/tools/deepseek/) is the right starting point.

## How to get started with Claude Code

1. **Install the CLI** — follow the official Anthropic docs for your platform (macOS, Linux, or Windows).
2. **Authenticate** — connect your Anthropic account or set an API key.
3. **Open your project** — `cd` into any repository and launch Claude Code.
4. **Describe your first task** — start small: "add error handling to this function" or "write tests for this module".
5. **Watch it iterate** — approve edits, review diffs, and let it run the tests to verify.
6. **Explore advanced features** — enable sub-agents for big tasks and connect MCP servers once you're comfortable.

Start with a small, well-scoped task to build trust, then scale up to full features and refactors. Most teams report that the tool's value compounds once you learn how to write clear, specific task descriptions.

## The bottom line

Claude Code represents a genuine shift in how coding work gets done: instead of an autocomplete assistant waiting for your keystrokes, it's an **agent that takes a goal and executes it end to end** — reading, editing, testing, and fixing with real autonomy. It's not for everyone, and it's not free, but for professional developers doing serious work, the productivity gain is dramatic.

If you're evaluating terminal AI coding tools, the short version is: choose Claude Code for deep agentic autonomy with Anthropic's models, and [Aider](/tools/aider/) if you want an open-source, model-agnostic alternative. Both belong in a modern developer's toolbox.

*Official resource: [Anthropic Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code).*
