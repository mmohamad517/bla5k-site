---
name: LlamaIndex
url: https://www.llamaindex.ai
subcategory: dev-ai-agents
tagline: The open-source data framework for building LLM apps and RAG pipelines — plus LlamaParse, an agentic document-OCR platform that turns messy documents into structured, LLM-ready data.
tags:
  - rag
  - llm framework
  - document parsing
  - ocr
  - open-source
  - python
  - typescript
  - llama-parse
  - ai agents
featured: true
updated: 2026-08-01
metaTitle: "LlamaIndex: Data Framework & LlamaParse for LLM Apps (2026 Guide)"
metaDescription: A complete guide to LlamaIndex — the open-source data framework for RAG and LLM apps, plus LlamaParse agentic document OCR. Features, pricing, and getting started.
simple: "A free, open-source toolkit that helps AI apps connect to your data. It takes documents and files, makes them understandable to AI models, and powers 'chat with your data' applications."
example: "Upload a pile of messy PDFs and handwritten notes; LlamaParse turns them into clean, structured text an AI can search and answer questions from."
goodFor:
  - "Developers building RAG apps and document workflows"
  - "Teams that need to make documents AI-searchable"
  - "Data-heavy AI projects (Python or TypeScript)"
notFor:
  - "You want a no-code product"
  - "You need a simple chatbot without data integration"
  - "You're not a developer"
faqs:
  - q: What is LlamaIndex?
    a: LlamaIndex is an open-source data framework (Python and TypeScript) for building LLM applications and RAG pipelines. The company also makes LlamaParse, an agentic document-OCR platform that turns messy multi-modal documents (PDFs, handwriting, tables, charts) into structured, LLM-ready data.
  - q: Is LlamaIndex open source?
    a: Yes — the LlamaIndex framework and Workflows are fully open source under the MIT license. LlamaParse is a commercial SaaS, but offers 10,000 free credits per month (~1,000 pages).
  - q: What is RAG?
    a: RAG (Retrieval-Augmented Generation) is the technique of connecting an LLM to your own data — indexing documents so the model can retrieve and answer from them instead of only its training knowledge.
  - q: Is LlamaIndex SOC 2 / HIPAA / GDPR compliant?
    a: Yes — LlamaParse is certified for SOC 2 Type II, GDPR, and HIPAA, and supports private VPC deployment for enterprises.
  - q: How many credits does parsing a page cost?
    a: As low as 1 credit for basic parsing; layout-aware "agentic" parsing with LLMs/VLMs costs more for higher accuracy. 1,000 credits = $1.25, and the free tier includes 10,000 credits/month.
  - q: Who is behind LlamaIndex?
    a: LlamaIndex, Inc. (GitHub org run-llama), founded by Jerry Liu. The repo was created in November 2022 and has over 51,000 GitHub stars, with 25M+ package downloads/month.
---

**LlamaIndex** sits at the intersection of LLMs and your data. If you want an AI app that can actually answer questions from your own documents — PDFs, notes, databases, tables — LlamaIndex provides the framework to do it, and its **LlamaParse** product turns even messy documents into clean, AI-ready data. In this guide we'll cover what LlamaIndex is, who builds it, how RAG works, pricing, and how to get started.

## What is LlamaIndex?

LlamaIndex is an **open-source data framework for building LLM applications and RAG pipelines**. In plain terms: it helps AI models understand and work with your own data. It provides the tools to:

- **Ingest** data from many sources (files, databases, APIs).
- **Index** it into structures AI models can search.
- **Retrieve** relevant information to answer user questions.
- **Build** LLM apps — chat interfaces, agents, and pipelines that work over your data.

The company also builds **LlamaParse**, an agentic document-OCR platform. Where traditional OCR just extracts text, LlamaParse uses AI agents to *understand* document structure — tables, charts, handwriting — and convert messy multi-modal documents into structured, LLM-ready output.

## Who creates LlamaIndex?

LlamaIndex was founded by **Jerry Liu** and is developed by **LlamaIndex, Inc.** (GitHub org `run-llama`). The project started in **November 2022** as "GPT Index" and has grown into one of the most widely adopted AI data frameworks, with over **51,000 GitHub stars**, 25 million+ package downloads per month, and hundreds of thousands of LlamaParse users.

## How LlamaIndex works

LlamaIndex follows a clear pipeline:

1. **Load** — connect to your data sources (files, cloud storage, databases, APIs).
2. **Parse** — for messy documents, LlamaParse's agentic OCR converts PDFs, handwriting, tables, and charts into clean structured data.
3. **Index** — build searchable structures (LlamaCloud Index handles chunking and embedding automatically).
4. **Query** — the app retrieves the relevant information and answers with an LLM, with citations.
5. **Build** — assemble everything into a chat app, agent, or automated workflow using LlamaIndex's Python or TypeScript APIs.

The key benefit is accuracy: instead of an AI guessing, RAG lets it pull from your actual data.

## Key features of LlamaIndex

- **RAG framework** — build retrieval-augmented generation pipelines in Python or TypeScript.
- **LlamaParse** — agentic document OCR for 50+ (some say 130+) file formats and 80+ languages, handling tables, charts, handwriting, and schema-based structured output.
- **LlamaExtract** — extract structured data from documents.
- **LlamaCloud Index** — managed chunking and embedding pipeline.
- **Classify & Split** — smart document segmentation.
- **LiteParse** — fully open-source local parsing, no cloud or tokens required.
- **Workflows** — agent orchestration on top of the framework.
- **SaaS platform** — Global and EU regions, with VPC deployment for enterprises.
- **Security compliance** — SOC 2 Type II, HIPAA, and GDPR certified.

## What can you use LlamaIndex for?

- **"Chat with your data"** — Q&A over your documents, notes, and databases.
- **Document intelligence** — turn messy PDFs and scans into structured data.
- **Knowledge management** — make your company's knowledge AI-searchable.
- **Agent workflows** — build agents that retrieve and act on data.
- **Research and analysis** — synthesize information from many sources.
- **Compliance-ready AI** — enterprise use cases needing HIPAA/SOC 2.

## Pricing: what does LlamaIndex cost?

LlamaIndex has a free core and a credit-based SaaS:

- **Framework** — free, MIT open source (Python and TypeScript).
- **Free tier** — 10,000 credits/month (~1,000 pages).
- **Starter** — $50/month (40,000 credits, pay-as-you-go up to 400,000).
- **Pro** — $500/month (400,000 credits, pay-as-you-go up to 4,000,000).
- **Enterprise** — custom pricing (volume discounts, 5x rate limits, SSO, VPC/hybrid, dedicated account manager).
- **Credit economics** — 1,000 credits = $1.25; parsing a page costs as low as 1 credit.

## Integrations

- **Data sources** — files, cloud storage, databases, APIs.
- **Cloud** — AWS and Azure marketplaces.
- **SaaS API** — cloud.llamaindex.ai.
- **SDKs** — Python and TypeScript.
- **Webhooks / API callbacks** — integrate into your pipelines.
- **EU region** — data residency for European customers.
- **Community** — GitHub and Discord.

## Who is LlamaIndex for?

LlamaIndex is aimed at **developers and data teams building LLM applications over their own data**. It's a strong fit for:

- **AI/ML engineers** building RAG systems.
- **Data engineers** making documents AI-searchable.
- **Startups** building document-intelligence products.
- **Enterprises** with compliance requirements (SOC 2, HIPAA, GDPR).

If you're not a developer, you'll want a no-code layer on top — but for data-heavy AI work, LlamaIndex is a core building block.

## Advantages of LlamaIndex

- **Open source** — MIT framework, huge adoption.
- **Best-in-class parsing** — LlamaParse handles messy documents agents actually understand.
- **Data-native** — connects to real data sources, not just text.
- **Compliance-ready** — SOC 2, HIPAA, GDPR, VPC.
- **Local option** — LiteParse runs entirely on-device.
- **Active ecosystem** — 51k+ stars, huge community, both Python and TypeScript.

## Limitations and honest considerations

- **Developer-focused** — requires coding (Python or TypeScript).
- **Costs at scale** — LlamaParse is credit-based; heavy use adds up.
- **Complexity** — RAG systems have many moving parts (chunking, embeddings, retrieval).

## Security and privacy

LlamaParse is **SOC 2 Type II, HIPAA, and GDPR compliant** and supports **private VPC deployment** for enterprises, plus an EU region for data residency. For privacy-first use cases, **LiteParse** runs entirely locally with no cloud calls or tokens. These options make LlamaIndex unusually flexible for sensitive-data workloads — the strongest compliance story of any tool in this space.

## LlamaIndex vs. alternatives

| | LlamaIndex | LangChain | CrewAI |
| --- | --- | --- | --- |
| **Focus** | Data + RAG for LLM apps | Broad LLM app components | Role-based agent crews |
| **Parsing** | LlamaParse (best-in-class) | Limited | N/A |
| **Best for** | Document/data-heavy AI | General LLM apps | Multi-agent teams |

LlamaIndex's niche is data — indexing, parsing, and retrieval. It often pairs with other frameworks rather than competing with them.

## Getting started with LlamaIndex

1. **Install it** — `pip install llama-index` or the TypeScript SDK.
2. **Connect data** — point it at a folder, database, or API.
3. **Try LlamaParse** — upload a messy PDF and see structured output.
4. **Build a query engine** — ask questions over your data.
5. **Scale up** — add LlamaCloud for managed indexing and enterprise features.

## The bottom line

LlamaIndex is the standard open-source framework for connecting LLMs to your data. With its RAG pipeline, best-in-class agentic parsing via LlamaParse, strong compliance story, and a huge community, it's the go-to choice for developers building data-powered AI applications. Free to start and MIT-licensed, it scales from a hobby project to enterprise compliance workloads.

If you want AI that works over your actual documents and data, LlamaIndex is where you should start.

To discover more developer tools and AI agents, browse our [Developer Tools](/category/developer/) and [AI Tools](/category/ai-tools/) categories, or explore the full [bla5k directory](/#directory).

*Official resources: the [LlamaIndex website](https://www.llamaindex.ai) and the [official GitHub repository](https://github.com/run-llama/llama_index).*
