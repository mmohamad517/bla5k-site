---
name: Unfox AI
url: https://unfox.ai
subcategory: ai-writing
pricing: freemium
tagline: A free AI-text detector that marks the suspect sentences instead of just giving you a percentage.
tags:
  - AI detector
  - plagiarism
  - content verification
  - multilingual
  - Chinese
updated: 2026-08-17
metaTitle: "Unfox AI Detector: What Its Score Can and Cannot Prove"
metaDescription: Unfox AI flags AI-written text sentence by sentence across 17 languages, Chinese included. How it works, how far to trust the score, and why no detector should decide anything on its own.
simple: "You paste in some writing and it tells you which sentences look machine-written, highlighting them one by one rather than handing you a single number for the whole document."
example: "A teacher pastes in a submitted essay. Three paragraphs come back highlighted as AI-suspected while the rest reads as human — which is a starting point for a conversation with the student, not a verdict."
goodFor:
  - "A first pass over writing before you publish or submit it"
  - "Checking Chinese-language text, which most Western detectors handle badly"
  - "Teams that need bulk checking or an API rather than one box at a time"
notFor:
  - "Deciding whether to fail a student or fire a writer — no detector is reliable enough for that"
  - "Proving anything about text a non-native speaker wrote; they get false-flagged constantly"
  - "Heavily edited AI drafts, which every detector in this category misses"
faqs:
  - q: What is Unfox AI?
    a: Unfox AI is a free online detector that estimates whether text was written by an AI model. It analyses statistical properties of the writing and marks individual sentences as AI-suspected or human-written, rather than returning only a document-level percentage.
  - q: How does it decide?
    a: "It measures statistical fingerprints of the text — chiefly perplexity (how predictable each word is given the ones before it) and burstiness (how much sentence length and complexity vary). Machine-written text tends to be smoother and more uniform than human writing, and detectors look for that flatness."
  - q: Which models and languages does it cover?
    a: It targets output from the major models including ChatGPT, Claude and Gemini, and supports 17 languages. Its Chinese-language detection is a genuine differentiator — most detectors are trained overwhelmingly on English and degrade badly outside it.
  - q: Is it accurate enough to accuse someone?
    a: "No, and neither is any competitor. Every detector in this category produces both false positives and false negatives, and the false positives fall hardest on non-native English writers, whose more uniform sentence construction reads as machine-like. Use a flag to start a conversation, never to end one."
  - q: What happens to text I paste in?
    a: Unfox states that content is discarded immediately after detection rather than stored. That is the right policy for this kind of tool, but it is a claim you are trusting — do not paste anything confidential into any detector, this one included.
  - q: Does it catch AI text that has been rewritten?
    a: Sometimes. Unfox claims to catch polished and rewritten output, and light editing does often leave the statistical signature intact. Substantial human rewriting defeats every detector on the market, because at that point the text genuinely is part human.
---

AI text detectors occupy an awkward position: enormous demand, and a job that cannot be done reliably. Unfox AI is one of the better-built entries — free, multilingual, and unusually good at Chinese — and it is still a tool whose output should never be the last word on anything.

This page covers what it does well, and the limits that apply to it and to every product in its category.

## What it does differently

Most detectors return a single number: *87% AI*. That is close to useless in practice, because a document is rarely all one thing and a percentage tells you nothing about which parts to look at.

Unfox **highlights sentence by sentence**, marking each as AI-suspected or human-written. That shifts the output from a verdict into something you can actually inspect. If three sentences light up in an otherwise clean essay, you can go read those three and form your own judgement.

The second differentiator is **language coverage**. It supports 17 languages, and its Chinese detection is treated as a first-class capability rather than an afterthought. Most detectors are trained overwhelmingly on English and get noticeably worse everywhere else — if you work in Chinese, that alone may decide the choice for you.

## How detection actually works

Every detector in this category rests on the same two statistical ideas.

**Perplexity** measures how surprising each word is given the words before it. Language models are trained to pick likely next words, so their output tends to be *less* surprising than human writing. Low perplexity looks machine-made.

**Burstiness** measures how much sentence length and complexity vary across a passage. Humans write unevenly — a long winding sentence, then a short one. Models produce flatter, more even prose. Low burstiness looks machine-made.

Understanding this explains both the tool's successes and its failures. It is not detecting *AI*. It is detecting **statistical smoothness**, and inferring AI from it. Anything else that produces smooth, even prose gets caught in the same net.

## The false-positive problem, stated plainly

This is the part most detector marketing skips, and it matters more than any feature.

**Non-native English writers are false-flagged constantly.** Someone writing in a second language tends to use a narrower vocabulary, more consistent sentence structures, and safer constructions — the exact profile of low perplexity and low burstiness. The detector cannot distinguish careful non-native writing from machine writing, because on the metrics it measures they genuinely look alike.

The same trap catches formal technical writing, legal and academic prose with mandated structure, and anyone who writes plainly on purpose.

If you are using a detector to make a decision *about a person*, this is disqualifying. A flag means "this text is statistically smooth", and that is all it means.

## Where it fits properly

**As a self-check before you publish.** Run your own draft, see what looks machine-flat, and rewrite those sentences to have more life in them. Here a false positive costs you nothing.

**As a screening pass over volume.** With bulk upload and an API, checking a large batch and pulling a shortlist for human review is a legitimate workflow — as long as the human review is real and has authority to overturn the flag.

**As one input among several.** Alongside draft history, the writer's track record, and an actual conversation. Never on its own.

## Where it does not fit

**Academic misconduct decisions.** Institutions that have leaned on detector scores have had to walk cases back. A flag is a reason to talk to a student, not a finding against them.

**Employment decisions.** Same reasoning, higher stakes, and a false positive costs someone their livelihood.

**Confidential material.** Unfox says text is discarded immediately after checking, which is the correct policy. It is still a claim, and unpublished client work does not belong in any third-party box.

## Honest limitations

- **Heavy editing defeats it** — as it defeats every detector. Substantially rewritten AI text is genuinely part human, and there is no signature left to find.
- **Short passages are unreliable** — the statistics need enough text to mean anything. A couple of sentences is noise.
- **The model target moves** — detectors are tuned against the models that exist now, and each new generation resets the problem.
- **No detector publishes an honest error rate on real-world mixed text**, this one included. Treat any accuracy claim in this category with scepticism.

## The verdict

Unfox AI is a well-made version of a tool that cannot do what people want it to do. The sentence-level highlighting is a real improvement over a bare percentage, the Chinese support fills a genuine gap, and free access with no storage is the right shape for the job.

Use it to improve your own writing, or to decide what a human should read next. The moment it starts deciding something *about a person*, it is being asked for a certainty it does not have.

> **Before you act on a flag:** paste in a page of writing you know a human wrote — ideally a non-native speaker's. Watching what the tool does with it will calibrate how much weight the score deserves.

*Official resource: [Unfox AI](https://unfox.ai)*
