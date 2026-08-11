---
name: Step-Audio
url: https://github.com/stepfun-ai/Step-Audio
image: /logos/step-audio.png
screenshot: /screens/step-audio.webp
subcategory: ai-video-audio
tagline: "Open-source end-to-end speech AI model from StepFun — real-time voice understanding, generation, and editing in a single system."
tags:
  - AI Audio
  - Speech AI
  - Voice Generation
  - Open Source
  - StepFun
  - Text to Speech
featured: false
updated: 2026-08-05
metaTitle: "Step-Audio - Open-Source Real-Time Speech AI (2026)"
metaDescription: "Step-Audio is an open-source end-to-end speech AI from StepFun. Real-time voice understanding, generation, and expressive editing in one unified system."
simple: "An AI system that can understand speech, generate natural-sounding voices, and edit audio expressions — all in one model. Think of it as a voice AI that can listen, respond, and adjust how it sounds, running as a single intelligent system rather than separate tools stitched together."
example: "Feed Step-Audio a voice recording and ask it to change the emotion to excited — it edits the vocal expression while keeping the same voice and words, all processed through one unified AI model."
goodFor:
  - "Developers building voice-enabled AI applications"
  - "Researchers working on speech AI and audio models"
  - "Projects that need real-time voice generation and editing"
notFor:
  - "You want to generate music or songs"
  - "You need a simple GUI tool without coding"
  - "You're looking for a consumer-ready product"
faqs:
  - q: What is Step-Audio?
    a: Step-Audio is a family of open-source speech AI models from StepFun (the same team behind ACE-Step music generation). It's an end-to-end system where audio goes in and audio comes out through a single unified model, supporting voice understanding, generation, and expressive editing.
  - q: Is Step-Audio free?
    a: Yes. Step-Audio models and code are open source on GitHub and Hugging Face. You can download and run them on your own hardware at no cost.
  - q: What's the difference between Step-Audio and ACE-Step?
    a: ACE-Step generates music and songs. Step-Audio handles speech — voice understanding, text-to-speech, and vocal expression editing. Both are from StepFun but serve entirely different purposes.
  - q: What versions of Step-Audio exist?
    a: As of 2026, StepFun has released Step-Audio (original), Step-Audio 2, Step-Audio 2.5 Realtime (for live voice applications), Step-Audio-R1 (audio reasoning), and Step-Audio-EditX (expressive audio editing).
---

## What is Step-Audio?

Step-Audio is a family of open-source, end-to-end speech AI models developed by StepFun — the same Chinese AI lab behind the ACE-Step music generation model. While [ACE-Step UI](/tools/ace-step-ui/) generates songs and instrumental tracks, Step-Audio focuses on speech: understanding spoken language, generating natural voices, and editing vocal expressions.

The models are [available on GitHub](https://github.com/stepfun-ai/Step-Audio). The key distinction is "end-to-end." Traditional speech pipelines chain separate components together — a speech recognition model, a language model, and a text-to-speech model. Step-Audio processes voice input and produces voice output through a single unified model, which preserves nuances like tone, emotion, and speaking style that get lost when audio is converted to text and back.

## How Step-Audio works

The end-to-end architecture means Step-Audio doesn't treat speech as an intermediate text problem. When you send it a voice recording, the model processes the raw waveform directly, understands the content, context, and emotional tone, and produces a response as natural-sounding speech — all without an explicit text transcription step in between.

This approach has several practical advantages. The model captures and reproduces paralinguistic features — pitch variations, emphasis, hesitation, emotional coloring — that text-based pipelines inherently discard. The result is voice interaction that sounds more natural and contextually appropriate.

For text-to-speech use cases, Step-Audio still accepts text input, but the generation benefits from the model's understanding of how speech naturally sounds rather than just converting phonemes to waveforms.

## Model family

StepFun has released several specialized variants, each targeting a different speech AI use case:

**Step-Audio 2.5 Realtime** is the latest flagship model, built for live voice applications. It supports fully customizable personas with distinct speaking styles and personalities, handles Chinese and English natively, and connects via WebSocket API for real-time interaction with minimal latency. This model is designed for building conversational voice assistants, customer service bots, and interactive characters.

**Step-Audio-EditX** is a 3-billion-parameter model specialized in expressive voice editing. Feed it an existing recording and describe how you want the expression to change — "make this sound more excited," "slow down the pace," "add warmth to the tone" — and it modifies the vocal characteristics while preserving the original voice identity and words. It supports Japanese and Korean alongside Chinese and English.

**Step-Audio-R1** is an audio reasoning model that goes beyond simple transcription. It can analyze recordings, understand context, answer questions about what was said and how it was said, and reason about the emotional and informational content. This makes it useful for applications like meeting analysis, sentiment detection, and intelligent voice search.

**Step-Audio 2** is the general-purpose conversational model, handling multi-turn voice dialogue with consistent persona maintenance across extended conversations.

## Use cases

**Voice assistants and chatbots** — Step-Audio 2.5 Realtime's low-latency WebSocket API makes it practical for building voice interfaces that feel responsive and natural. The persona system lets you create distinct characters with consistent speaking styles.

**Content production** — Step-Audio-EditX enables post-production editing of vocal recordings without re-recording. Adjust the emotional delivery, fix pacing issues, or change the speaking style of existing voice content.

**Accessibility tools** — the combination of speech understanding and natural generation makes Step-Audio valuable for building tools that convert between speech and text with high fidelity in both directions.

**Research** — as an open-source model family, Step-Audio provides a foundation for academic and industrial speech AI research without licensing restrictions.

## How Step-Audio relates to the ACE-Step ecosystem

Step-Audio and [ACE-Step](/tools/ace-step-ui/) come from the same lab but serve different domains. ACE-Step generates songs with vocals, instruments, and lyrics. Step-Audio handles speech — conversation, narration, voice editing, and spoken interaction. They share architectural DNA (both use end-to-end approaches rather than pipeline architectures) but target completely different applications.

If you want to generate a song, use [ACE-Step UI](/tools/ace-step-ui/). If you want to build a voice assistant or edit spoken recordings, Step-Audio is the right tool.

## Who is Step-Audio for?

Step-Audio is a developer and researcher tool — it's open-source code and models on GitHub, not a polished consumer app. It's ideal for building voice-enabled AI applications, creating custom voice assistants, and speech AI research. Installation requires Python, PyTorch, and familiarity with running model inference. For one-click installation of simpler AI tools, [Pinokio](/tools/pinokio/) handles that category. For consumer-ready text-to-speech without coding, dedicated TTS services are more accessible.

## Conclusion

Step-Audio represents the speech side of StepFun's AI ambitions. As an open-source, end-to-end speech model family with specialized variants for real-time conversation, expression editing, and reasoning, it's a powerful foundation for developers building the next generation of voice-enabled applications.
