---
name: SkillOpt
url: https://github.com/microsoft/SkillOpt
image: /logos/skillopt.png
subcategory: dev-ai-agents
tagline: Microsoft’s open-source optimizer that trains self-evolving skills for LLM agents — no model fine-tuning required.
tags: ["ai agents", "microsoft", "open-source", "agent optimization", "self-evolving", "llm"]
featured: true
updated: 2026-07-29
metaTitle: "SkillOpt: Microsoft Self-Evolving Agent Skills (2026)"
metaDescription: "SkillOpt is Microsoft’s free, open-source optimizer that trains self-evolving skills for LLM agents — no fine-tuning needed. How it works and how to start."
simple: "A free Microsoft tool for developers that makes an AI agent better at a task by automatically improving its written instructions — without retraining the whole model."
example: "A developer whose AI agent keeps making the same mistake could use SkillOpt to automatically refine the agent's instructions until it gets the task right."
goodFor:
  - "Developers improving AI agents cheaply"
  - "Boosting agent skill without model fine-tuning"
  - "Python and AI engineers"
notFor:
  - "You're not building AI agents"
  - "You want a consumer app"
  - "You don't code"
faqs:
  - q: "What is SkillOpt?"
    a: "SkillOpt is an open-source tool from Microsoft that improves the skills of LLM agents without changing the underlying model. It treats a short natural-language 'skill document' as a trainable parameter and optimizes it through a training-like loop of rollouts, reflection, bounded edits, and validation gates. The result is a compact best_skill.md file you can deploy to make an agent better at a task."
  - q: "Is SkillOpt free?"
    a: "Yes. SkillOpt is fully open-source under the permissive MIT license, so it is free to use, modify, and deploy — including commercially. It's installable via PyPI with 'pip install skillopt.' Your only costs are the LLM/API usage consumed during the optimization process."
  - q: "Who created SkillOpt?"
    a: "SkillOpt was created by Microsoft and is published on its official GitHub repository (github.com/microsoft/SkillOpt), with an accompanying Microsoft Research write-up and a research paper on arXiv. It's a research-backed, open-source project."
  - q: "How is SkillOpt different from fine-tuning a model?"
    a: "Fine-tuning changes a model's internal weights, which is expensive and requires GPUs and training data. SkillOpt keeps the model completely frozen and instead optimizes a natural-language skill document — the text the agent uses. This 'text-space optimization' is far cheaper, needs no weight training, and produces a portable skill file that adds zero extra inference calls at deployment."
  - q: "Which models and tools does SkillOpt work with?"
    a: "SkillOpt supports multiple backends including OpenAI, Azure, Claude, Qwen, MiniMax, and other OpenAI-compatible APIs. It runs across execution harnesses like direct chat, Codex CLI, Claude Code CLI, and Cursor CLI, and offers integration adapters for Claude Code, Copilot, Devin, and OpenClaw."
  - q: "Who is SkillOpt for?"
    a: "SkillOpt is aimed at developers and researchers building agent systems who want to systematically improve agent performance without fine-tuning a model. It's a technical tool — best suited to people comfortable with Python, LLM APIs, and evaluating agent tasks — used for coding agents, task automation, and agentic workflows."
---

One of the biggest frustrations with AI agents is that they don't naturally get better. You write a prompt or a "skill," the agent uses it, and if the results are mediocre — the dreaded "AI slop" — you're stuck manually tweaking wording and hoping it improves. **SkillOpt**, an open-source project from Microsoft, offers a fundamentally different approach: it treats an agent's skills as something you can *train*, systematically evolving them until they actually work — all without ever touching the model's weights.

SkillOpt is a text-space optimizer that trains reusable natural-language skills for frozen LLM agents. In plain terms, it takes the text that guides an agent and improves it the way you'd train a model — with epochs, validation, and measurable gains — but at a fraction of the cost and complexity. In this guide we'll unpack exactly what SkillOpt is, the clever idea behind it, how it works, what it achieves, and who should use it.

It sits alongside other agent tooling in our directory, like the [AgentScope](/tools/agentscope/) framework and the [OpenClaw agent templates](/tools/openclaw-agent-templates/) — and interestingly, SkillOpt even ships an adapter for OpenClaw. Because it runs across coding-agent harnesses, it also pairs naturally with super-agent runners like [DeerFlow](/tools/deerflow/) and local model routers such as [Codex Router](/tools/codex-router/) that sit in front of the Codex CLI.

## What is SkillOpt?

SkillOpt is an **open-source tool developed by Microsoft** that automatically improves the skills of large language model (LLM) agents. Its central idea is captured in the phrase Microsoft Research uses to describe it: *"agent skills as trainable parameters."*

Here's what that means. When you use an AI agent, its behavior is shaped by instructions — a skill document written in natural language that tells it how to approach a task. Normally, improving that document is a manual, trial-and-error chore. SkillOpt turns it into an optimization process. It treats that compact skill document as the **trainable state** of the agent, and learns a better version of it through structured feedback, while keeping the underlying language model completely frozen.

The output is a single, deployable artifact: a **`best_skill.md`** file, typically just 300–2,000 tokens, that encodes the improved skill. You drop it into your agent, and — crucially — it adds **zero additional inference calls at deployment.** The optimization happens ahead of time; what you ship is simply a better set of instructions.

SkillOpt is released under the permissive **MIT license**, backed by a Microsoft Research paper, and available on Microsoft's official GitHub repository. It represents a serious, research-grade approach to a very practical problem.

## Why an agent's skills matter so much

It's easy to underestimate how much of an AI agent's performance comes down to its instructions. The same underlying model, given a vague or poorly structured skill, will flounder — misunderstanding tasks, skipping steps, or producing inconsistent output. Given a sharp, well-crafted skill, that identical model can perform dramatically better. The intelligence is largely there in the model already; the skill document is what unlocks it for a specific job.

This is precisely why prompt and skill quality has become one of the highest-leverage variables in the whole agent stack. A small change in wording can swing results significantly, which is both a blessing and a curse: the upside is huge, but finding the right wording by hand is slow, subjective, and hard to reproduce. Teams end up with brittle prompts that "seem to work," no clear record of why, and no reliable way to know whether a change actually helped or just felt better.

SkillOpt's contribution is to treat this high-leverage variable with the seriousness it deserves. Instead of leaving skill quality to intuition, it makes it measurable and improvable — turning the fuzzy art of prompt tweaking into something closer to an engineering discipline. In a field where a few well-chosen sentences can be worth more than a bigger model, having a systematic way to discover those sentences is genuinely valuable. That's the gap SkillOpt fills, and why "skills as trainable parameters" is more than a catchy phrase.

## The core idea: skills as trainable parameters

To appreciate why SkillOpt is notable, it helps to contrast it with the two usual ways of making an agent better.

The first is **prompt engineering** — manually rewriting instructions until they work. This is accessible but unsystematic: you're guessing, and improvements are hard to measure or reproduce.

The second is **fine-tuning** — actually retraining the model's weights on your data. This can be powerful but is expensive, requires significant compute (GPUs), needs training data, and produces a heavy, model-specific result.

SkillOpt introduces a third path that captures much of the benefit of training without the cost of fine-tuning. It performs **text-space optimization**: rather than adjusting millions of model weights, it adjusts the *words* of a skill document, guided by measured performance. As Microsoft describes it, SkillOpt trains agent skills "like neural networks — with epochs, (mini-)batch size, learning rates, and validation gates — but without touching model weights." You get the rigor and measurability of training, applied to plain text.

This is a genuinely elegant reframing. It means anyone can systematically improve an agent's capability using nothing but the model's own outputs and a way to score them — no GPU cluster, no weight surgery.

## How SkillOpt works

Under the hood, SkillOpt runs a training-like loop that should feel familiar to anyone who has trained a model, even though no weights are involved.

The cycle is: **rollout → reflect → aggregate → select → update → evaluate.** In practice, this means SkillOpt runs the agent on tasks (rollouts), reflects on what went right and wrong, aggregates that feedback, selects promising changes, updates the skill document, and evaluates the result. The edits it makes to the skill document are **bounded** — controlled add, delete, and replace operations — so the optimization stays stable rather than lurching around.

Two mechanisms make this reliable:

- **Validation-gated updates.** A proposed change to the skill is only accepted if it produces a strict improvement on a held-out validation set. This prevents the optimizer from "overfitting" to noise and mirrors best practice in machine learning.
- **Continuous scoring.** SkillOpt uses real, continuous scoring (based on token logit expectation) rather than crude pass/fail signals, giving it a fine-grained gradient-like sense of whether an edit helped.

It also does something clever: it **automatically discovers missing capabilities from failed trajectories.** When the agent fails a task, SkillOpt analyzes why and proposes skills to fill the gap. Over epochs, the skill document evolves from a rough draft into a validated, high-performing artifact — the `best_skill.md` you deploy.

## A worked example: from failure to skill

To ground the mechanics, imagine you're optimizing a coding agent that keeps making the same mistake — say, forgetting to handle edge cases when writing a function. Here's how SkillOpt's loop would address it, based on its documented design.

During a rollout, the agent attempts several tasks, and on some it fails because it ignored an edge case. SkillOpt doesn't just record a pass/fail; it uses continuous scoring to measure *how* good each attempt was, and it reflects on the failing trajectories to understand the pattern. It recognizes a missing capability — robust edge-case handling — and proposes a bounded edit to the skill document, perhaps adding a concise instruction to enumerate and handle edge cases before finalizing code.

Crucially, that proposed edit isn't accepted on faith. SkillOpt runs it against a held-out validation set and only keeps it if it produces a strict improvement in the scores. If the new instruction genuinely helps, it stays; if it doesn't, it's discarded. This validation gate is what separates SkillOpt from hopeful prompt tweaking — every change has to earn its place with evidence.

Repeat this over epochs across many tasks, and the skill document accumulates only the edits that measurably work, converging on a compact `best_skill.md`. The final file might be a few hundred well-chosen tokens that reliably steer the frozen model toward better behavior. You then deploy that file, and the agent performs better — with no extra runtime cost, because all the "training" already happened.

## SkillOpt-Sleep: overnight self-evolution

A standout feature introduced in SkillOpt v0.2.0 is **SkillOpt-Sleep**, a nightly offline self-evolution companion for local coding agents. The name is apt: it works while you sleep.

SkillOpt-Sleep reviews an agent's past sessions, replays recurring tasks, and consolidates validated skills — all behind the same validation gate that ensures only genuine improvements are kept. Shipped as the `skillopt-sleep` CLI, it turns skill optimization into an ongoing, hands-off process: your coding agent quietly gets better over time by learning from its own history. This "self-evolving" behavior is exactly what the "no more AI slop" framing points to — an agent that improves itself rather than plateauing.

## What results does it achieve?

SkillOpt isn't just a neat idea; Microsoft reports strong measured results. Across **six benchmarks, seven target models, and three execution harnesses**, SkillOpt achieved best or tied-best results on all **52 evaluated configurations** — a remarkably consistent outcome.

The reported accuracy gains are substantial. On a strong model, improvements reached **+23.5 points in direct chat, +24.8 points in a Codex agentic loop, and +19.1 points with Claude Code.** Double-digit accuracy improvements from optimizing text alone — with no fine-tuning — is a striking demonstration of how much headroom lives in an agent's instructions. (As with any benchmark figures, these come from Microsoft's own evaluations, so treat them as strong evidence of the approach's potential rather than a guarantee for every use case.)

## Supported models, harnesses, and integrations

SkillOpt is built to be broadly compatible rather than locked to one ecosystem.

- **Model backends:** OpenAI, Azure, Claude, Qwen, MiniMax, and other OpenAI-compatible APIs.
- **Execution harnesses:** direct chat, Codex CLI, Claude Code CLI, and Cursor CLI.
- **Integration plugins/adapters:** Claude Code, Copilot, Devin, and OpenClaw.

This flexibility means SkillOpt can slot into whatever agent setup you already use — including popular coding-agent CLIs — and improve the skills that drive them. The OpenClaw adapter in particular ties it neatly to the config-first agent ecosystem covered elsewhere in this directory.

## Who is SkillOpt for?

SkillOpt is aimed squarely at **developers and researchers building agent systems** who want to improve performance systematically, without the cost and complexity of fine-tuning. It's an especially good fit for:

- **Engineers building coding agents** who want their agents to get measurably better at real tasks.
- **AI researchers** exploring agent self-improvement and text-space optimization.
- **Teams running agentic workflows** who need a rigorous, repeatable way to raise quality rather than hand-tuning prompts.

It is a **technical tool**, not a consumer app. Using it well means being comfortable with Python, LLM APIs, and — importantly — defining tasks and validation sets so the optimizer has something to score against. For the right audience, though, it offers something rare: a principled method to make agents better. You'll find more agent-building tools throughout our [Developer Tools directory](/category/developer/).

## Common use cases

Given its design, SkillOpt suits any situation where you want an agent to reliably improve at a definable task:

- **Optimizing coding agents** to handle recurring engineering tasks more accurately.
- **Improving task-automation agents** whose success can be scored on validation examples.
- **Research on agent self-evolution**, using SkillOpt as a rigorous experimental tool.
- **Continuous improvement** of a local coding agent via SkillOpt-Sleep's overnight runs.

## Advantages of SkillOpt

- **Training-grade rigor without fine-tuning.** Epochs, validation gates, and measurable gains — applied to text, not weights.
- **Cheap and portable.** No GPU weight training; the output is a small `best_skill.md` with zero extra inference cost at deployment.
- **Genuinely self-evolving.** SkillOpt-Sleep lets agents improve from their own history automatically.
- **Broadly compatible.** Works across many models, CLIs, and popular agent tools.
- **Strong, benchmarked results.** Best-or-tied on all 52 tested configurations in Microsoft's evaluation.
- **Open-source and research-backed.** MIT license, Microsoft stewardship, and a published paper.

## Limitations and honest considerations

A straight assessment means naming the trade-offs.

- **It's a technical, developer-facing tool.** SkillOpt is not a click-to-use app. You need Python, API access, and the ability to define tasks and validation criteria. Non-developers won't get value from it directly.
- **You need a way to measure success.** The whole method depends on scoring rollouts against validation examples. If you can't define what "better" means for your task, SkillOpt has nothing to optimize toward.
- **It's an early, fast-moving project.** At v0.2.0, SkillOpt is a young (if impressive) release. Expect ongoing changes and the rough edges typical of cutting-edge research code.
- **Optimization consumes API calls.** While cheaper than fine-tuning, the rollout-and-evaluate loop uses LLM inference, which has a real (if modest) cost during optimization.

None of these diminish the idea — they simply define who benefits and what it takes to use it well.

## Pricing: what does SkillOpt cost?

SkillOpt is **free and open-source under the MIT license.** There are no fees to use the software; you install it with `pip install skillopt`. The only real cost is the **LLM/API usage** consumed while it optimizes — the rollouts and evaluations call your chosen model. Because it keeps the model frozen and produces a deployment artifact with no added inference cost, the ongoing expense after optimization is essentially nil beyond normal agent operation. For a tool that can deliver double-digit accuracy gains, that's an exceptional value proposition.

## Security and privacy

As an open-source, MIT-licensed tool that you run yourself, SkillOpt keeps you in control. You connect it to your own model provider using your own credentials, and you decide where it runs — locally or in your own environment. The full source is available for security-minded users to audit. The usual caution applies: whichever LLM backend you connect (OpenAI, Azure, Claude, and so on) will process the rollouts according to that provider's data policy, so review those terms if your tasks involve sensitive material. Run locally-hosted or privacy-preserving backends, and you can keep the entire optimization loop within your own boundaries.

## SkillOpt vs. the alternatives

Positioning SkillOpt against the usual options clarifies its niche.

| Approach | Cost | Rigor | Portability |
| --- | --- | --- | --- |
| **Manual prompt tuning** | Low | Low (guesswork) | High |
| **Fine-tuning weights** | High (GPUs, data) | High | Low (model-specific) |
| **SkillOpt (text-space)** | Low–moderate (API calls) | High (validated) | High (`best_skill.md`) |

SkillOpt effectively captures the measurable rigor of fine-tuning while retaining the low cost and portability of prompt tuning — a genuinely appealing middle ground. It complements, rather than replaces, agent frameworks: you might build an agent with a framework like [AgentScope](/tools/agentscope/), then use SkillOpt to sharpen the skills that agent relies on.

## Getting started with SkillOpt

For developers, trying SkillOpt is straightforward:

1. **Check requirements.** You'll need Python 3.10+ and access to an LLM backend (OpenAI, Azure, Claude, Qwen, MiniMax, or an OpenAI-compatible API).
2. **Install it.** Run `pip install skillopt` from PyPI. The current release is v0.2.0.
3. **Define your task and validation set.** Provide the tasks you want the agent to master and a way to score them — this is what SkillOpt optimizes against.
4. **Run the optimizer.** Let SkillOpt's loop evolve your skill document, producing a validated `best_skill.md`.
5. **Deploy and (optionally) keep evolving.** Ship the skill file to your agent, and consider using SkillOpt-Sleep for ongoing overnight improvement. An optional web UI dashboard is available for monitoring.

The official documentation, project page, and research paper provide deeper detail on configuration and methodology.

## The bottom line

SkillOpt reframes a stubborn problem — agents that don't improve — into something you can actually optimize. By treating an agent's skills as trainable parameters and refining them in text space, Microsoft's open-source tool delivers training-grade rigor and measurable gains without the cost of fine-tuning, then hands you a portable `best_skill.md` that runs for free. With SkillOpt-Sleep, agents can even evolve themselves overnight.

It's a technical tool for developers and researchers, and it asks you to define what success looks like — but for anyone serious about making AI agents genuinely better, it's one of the most compelling ideas in the space right now. Free, open-source, benchmark-proven, and backed by Microsoft, SkillOpt earns a place on any agent builder's radar.

To keep exploring the tools shaping the AI-agent era, browse our [AI Tools](/category/ai-tools/) and [Developer Tools](/category/developer/) categories, read our roundup of the [best AI tools in 2026](/guides/best-ai-tools-2026/), or explore the full [bla5k directory](/#directory).

*Official resources: the [SkillOpt GitHub repository](https://github.com/microsoft/SkillOpt) and the [SkillOpt project page](https://microsoft.github.io/SkillOpt/).*
