---
name: Read Their Lips
url: https://readtheirlips.com
subcategory: ai-video-audio
pricing: freemium
tagline: Upload a silent clip and get a transcript read from the speaker's mouth, not the audio track.
tags:
  - lip reading
  - video transcription
  - silent video
  - accessibility
  - Symphonic Labs
updated: 2026-08-17
metaTitle: "Read Their Lips: How Accurate Is AI Lip Reading, Really?"
metaDescription: Symphonic Labs' lip-reading tool turns silent video into text by watching the speaker's mouth. What it gets right, where it reliably fails, and why you should not trust a single transcript.
simple: "You give it a video with no usable sound, and it works out what the person said by watching their mouth move. No audio is involved at any point — it is reading lips, the way a person would, only faster."
example: "You have footage of a press conference where the microphone cut out for thirty seconds. You upload the clip, mark that stretch, point the tool at the speaker's face, and get back a text guess at what was said while the sound was gone."
goodFor:
  - "Recovering dialogue from clips where the audio failed or was never recorded"
  - "Video editors working with muted or corrupted source footage"
  - "Curiosity — it is genuinely interesting to watch a model attempt this"
notFor:
  - "Anything you intend to quote, publish, or rely on as fact"
  - "Video where the speaker's mouth is small, angled, blurred, or partly hidden"
  - "Evidence, legal work, or accusations — the failure mode is a confident wrong sentence"
faqs:
  - q: What is Read Their Lips?
    a: Read Their Lips is a tool from Symphonic Labs that transcribes speech from silent video by analysing the speaker's lip movements. You upload a clip, optionally narrow it to a time range, choose which face to track, and it returns its best guess at the words. Audio is never used.
  - q: How does it work?
    a: A convolutional neural network trained on labelled video maps mouth shapes to phonemes — the individual sound units of speech — then assembles those phonemes into words. It is pattern matching on visual mouth shapes, not hearing.
  - q: How accurate is it?
    a: "Good enough to be interesting, not good enough to trust. Lip reading has a hard ceiling that no model removes: many different sounds look identical on the mouth. Independent testing has found it confusing phrases as far apart as \"island view\" and \"I love you\". Treat every transcript as a hypothesis."
  - q: Why do some words come out completely wrong?
    a: "Because they are visually identical. The consonant groups p/b/m, f/v, and t/d/n each produce the same mouth shape, so a lip reader — human or machine — cannot separate them from the mouth alone. People fill that gap with context; a model guesses. \"Pat\", \"bat\" and \"mat\" are the same picture."
  - q: What makes a clip work well?
    a: A face that is large in frame, well lit, facing roughly toward the camera, and not obscured by a hand, a microphone, or facial hair over the mouth. Fast speech, strong accents, and side angles all degrade it sharply.
  - q: Can I use it to work out what someone said in a video I found online?
    a: Technically yes, and this is where most people's curiosity leads. Be careful. The tool produces fluent, confident sentences that can be entirely wrong, and a wrong sentence attributed to a real person is defamation regardless of whether software wrote it. Never present its output as what someone said.
---

Lip reading has been a human skill for as long as there have been deaf people and noisy rooms, and it has always been an unreliable one — the best human lip readers work at roughly 30–45% word accuracy on unfamiliar speakers. Read Their Lips, from **Symphonic Labs**, is an attempt to do the same job with a neural network: upload a silent clip, and it returns what it believes was said.

It is a genuinely impressive demonstration and a genuinely dangerous tool to trust. Both of those need saying on the same page, because the output does not look uncertain — it looks like a transcript.

## What it actually does

You upload a video, optionally narrow it to a time range, and select which face to track when more than one person is on screen. The tool then analyses the movement of that person's mouth and returns text.

**No audio is used at any stage.** That is the whole point — it works on footage where the sound failed, was never captured, or was stripped. If your clip has usable audio, ordinary speech-to-text will be far more accurate and you should use that instead.

## How it works, and why that matters

Under the hood a convolutional neural network maps mouth shapes to **phonemes** — the individual sound units of speech — and then assembles those phonemes into plausible words. It was trained on a large body of video where the phonemes were labelled.

The important consequence sits in that description: it is matching pictures of mouths, and **many distinct sounds produce identical pictures**.

| These sounds | Look like this on the mouth |
|---|---|
| p · b · m | lips pressed together, then released |
| f · v | top teeth on bottom lip |
| t · d · n | tongue behind the teeth, invisible from outside |

"Pat", "bat" and "mat" are the same image. So are "fan" and "van". A human lip reader closes that gap with context, expectation, and knowing the speaker. A model closes it with a guess — and the guess arrives phrased as a fact.

That is the mechanism behind the tool's most-quoted failure: testing by Newsweek found it rendering "island view" as "I love you". Those two phrases genuinely do look near-identical on a mouth. The model was not malfunctioning; it hit the ceiling the task has.

## What a good clip looks like

Accuracy swings enormously with input quality. It needs:

- **A large, sharp face** — mouth detail is the entire signal
- **Good, even lighting** on the lower face
- **A roughly front-on angle** — profile shots lose most of the information
- **An unobstructed mouth** — no hand, microphone, or heavy moustache
- **Unhurried, clearly articulated speech**

Miss two or three of those and the output degrades from "roughly right" to "fluent invention".

## Where it earns its place

**Recovering your own footage.** You shot an interview, the lav mic died for forty seconds, and you need to know roughly what was covered so you can re-record or caption around it. Here a rough guess is worth a lot, and you can check it against your memory of the shoot.

**Editing muted source material.** Working out which take is which, or where a sentence begins, without hunting for a separate audio file.

**Accessibility experiments.** Real-time lip reading for deaf users is the ambition this technology serves, and tools like this are how it gets tested in public.

## Where it does real harm

The tool's output is fluent English. That fluency is the danger — a wrong transcript does not look wrong. It looks like a quote.

**Do not use it on footage of people to work out what they "really said."** This is the most common use it gets put to and the worst. A confidently generated sentence attributed to a real person is defamation whether a human or a model wrote it, and you would have no way to prove the words were ever spoken.

**Do not treat it as evidence.** It is not admissible, it is not reproducible, and its failure mode is producing something plausible rather than producing nothing.

## Honest limitations

- **A hard accuracy ceiling** — set by the task, not the model. Identical mouth shapes cannot be separated visually.
- **Steep quality dependence** — angle, lighting, and resolution move accuracy more than anything else.
- **No uncertainty signal in the output** — you get sentences, not confidence scores, so a guess reads exactly like a correct reading.
- **Language and accent limits** — training data determines what it can handle, and coverage outside clear standard English is thin.

## The verdict

Read Their Lips is worth trying, and worth understanding before you rely on a word of it. As a way to recover the gist of dialogue from footage you shot yourself and can sanity-check, it does something no other tool does. As a source of truth about what a person said, it is not one, and the confident phrasing of its output makes that easy to forget.

> **A rule that will keep you out of trouble:** if you could not independently confirm the sentence some other way, do not repeat it as something the person said.

*Official resource: [Read Their Lips](https://readtheirlips.com)*
