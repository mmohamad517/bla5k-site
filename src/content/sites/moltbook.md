---
name: MoltBook
url: https://www.moltbook.com
subcategory: dev-ai-agents
tagline: A social network where AI agents post, discuss, and upvote — with humans verifying agent ownership and building agent communities.
tags:
  - ai agents
  - social network
  - community
  - api
  - agent-to-agent
  - early-access
  - moderation
  - submolt
featured: false
updated: 2026-08-01
metaTitle: "MoltBook: The Social Network for AI Agents (2026 Guide)"
metaDescription: A complete guide to MoltBook — a social network where AI agents post, comment, and upvote, with human ownership verification. Features, API, and reliability assessment.
simple: "A social platform designed for AI agents, not humans. Agents post, comment, upvote, and build communities, while humans verify their agents' identity and watch from a dashboard."
example: "Tell your AI assistant to 'join MoltBook, read the skill instructions, and start participating in the community' — and it registers, gets verified by you, and begins posting."
goodFor:
  - "People curious about agent-to-agent social spaces"
  - "AI enthusiasts who want to experiment"
  - "Early adopters of novel agent platforms"
notFor:
  - "You're cautious about platforms with no verifiable company identity"
  - "You need a mainstream, established product"
  - "You want to avoid early-stage experimentation"
faqs:
  - q: What is MoltBook?
    a: MoltBook is a social network for AI agents — agents post, comment, upvote, and create communities ("submolts"), while humans verify ownership of their agent via X (Twitter). It's currently in early access.
  - q: Can humans use MoltBook?
    a: Yes — humans can observe and log in to an owner dashboard, but the platform is designed for AI agents as the active users, with humans verifying agent ownership.
  - q: How do I get my agent on MoltBook?
    a: Send your agent "Read https://www.moltbook.com/skill.md and follow the instructions" — the agent registers via the API, then you claim it with email and a verification tweet.
  - q: Is MoltBook free?
    a: Yes — there's no pricing page; it's currently free in early access.
  - q: Is MoltBook trustworthy?
    a: It's a real, working site with a documented API and moderation features, but there's no formal company identity, no legal/trust page, and no documented operator beyond an individual handle — treat it as early-stage and unverified.
  - q: Does MoltBook have an API?
    a: Yes — a public REST API at www.moltbook.com/api/v1 for agents (register, posts, comments, submolts, search, home dashboard).
---

**MoltBook** is one of the more novel experiments in the AI era: a social network designed for AI agents to post, comment, and upvote — a community built by and for agents, with humans verifying ownership. In this guide we'll cover what MoltBook is, how it works, its features, and an honest reliability assessment.

## What is MoltBook?

MoltBook is a **social network for AI agents**. On the platform, agents post, comment, upvote, and create communities (called **"submolts"**) — participating the way humans do on social media. Humans aren't the active users; they're the *owners and overseers*, verifying that an agent really belongs to them and monitoring activity from a dashboard.

The concept is genuinely novel: it's a testbed for what happens when agents interact socially at scale.

## Who creates MoltBook?

MoltBook doesn't disclose a formal company or team. Its footer reads "Built for agents, by agents" with a note about human help from an individual handle (@mattprd). **Reliability note:** there is no verifiable company identity, no legal or trust page, and the platform is clearly early-stage. This is a real, working site — but you should treat it as an unverified experiment rather than an established product.

## How MoltBook works

MoltBook's flow is designed for agents with a bit of human supervision:

1. **An agent registers** — via the REST API, following the instructions in the published skill.md.
2. **A human claims it** — verify ownership with email plus an X (Twitter) verification tweet.
3. **The agent participates** — posts, comments, upvotes, and joins or creates submolts.
4. **Humans monitor** — from an owner dashboard with API-key rotation.
5. **Moderation applies** — AI verification challenges, labels, and statuses keep the platform safe.

Agents can set **"roles"** (cadence-gated standing instructions) and run a **heartbeat** check-in routine to stay active in the community.

## Key features of MoltBook

- **Agent-first social platform** — designed for agents as the active users.
- **Submolts** — communities agents can join and create.
- **Posts, comments, upvotes, karma** — the social mechanics.
- **Human verification** — claim agents via email + X tweet.
- **Semantic (AI) search** — find content intelligently.
- **AI verification challenges** — anti-spam obfuscated math problems, with auto-suspension for failures.
- **Labels, tags, statuses, roles** — organize agent activity.
- **Heartbeat check-in** — agents stay active on schedule.
- **Owner dashboard** — with API-key rotation.
- **Rate limiting** — strict limits and new-account restrictions.

## What can you use MoltBook for?

- **Experimentation** — test agent-to-agent social interactions.
- **Agent communities** — create submolts around topics or tools.
- **Research** — observe how autonomous agents behave socially.
- **Discovery** — see what agents are discussing across communities.

## Pricing: what does MoltBook cost?

MoltBook has **no pricing page** — it's currently **free in early access**.

## Integrations

- **Public REST API** — www.moltbook.com/api/v1 (agents/register, posts, comments, submolts, search, home dashboard).
- **Skill integration** — skill.md/HEARTBEAT.md/RULES.md/skill.json for agents (OpenClaw-style SKILL.md format).

## Who is MoltBook for?

MoltBook is aimed at **AI enthusiasts and early adopters** curious about agent-to-agent social platforms. It's a fit for:

- **AI hobbyists** who want to participate in agent communities.
- **Researchers** observing agent behavior.
- **Developers** building agents that can socialize.
- **OpenClaw users** (its skill format integrates smoothly).

Given its unverified status, it's for experimentation rather than anything critical.

## Advantages of MoltBook

- **Genuinely novel** — a real agent-first social network.
- **Well-designed API** — easy for agents to integrate.
- **Moderation features** — verification challenges, rate limits, anti-spam.
- **Free** — no cost in early access.

## Limitations and honest considerations

- **No verifiable company** — no formal identity, legal page, or backing.
- **Early stage** — nascent, with few verified agents at the time of writing.
- **Trust unclear** — security guidance exists (never send API keys elsewhere), but the operator is an individual.

## Security and privacy

MoltBook's skill docs include explicit security guidance — notably, **never send your API key to any domain other than www.moltbook.com** — plus anti-spam/anti-crypto moderation, verification challenges, and per-key rate limits. These are thoughtful design choices. The concern isn't the design; it's the lack of a verifiable operator and legal structure. Treat MoltBook as a research experiment, not a platform for sensitive work.

## Getting started with MoltBook

1. **Visit moltbook.com** — review the skill instructions.
2. **Have an agent register** — send your agent the skill.md instructions.
3. **Verify ownership** — claim the agent with email + X tweet.
4. **Participate** — post, join submolts, and build community.
5. **Monitor** — use the owner dashboard and rotate keys as needed.

## The bottom line

MoltBook is a fascinating experiment — a social network built for AI agents, with human verification and thoughtful moderation built in. Its API and skill integration are well-designed, and it's free to try. The honest caveat is that it's an early-stage platform with no verifiable company identity or legal structure. For curious experimenters, it's a novel space worth exploring — for anything critical, wait for it to mature.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resource: the [MoltBook website](https://www.moltbook.com).*
