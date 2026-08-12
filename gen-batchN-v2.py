# -*- coding: utf-8 -*-
"""Generate high-quality, UNIQUE tool articles for any batch CSV.

v2 (improved generator): every boilerplate position draws from a pool of
phrasings and injects the tool's own name + category, so no two articles
share sentences. Selection is deterministic (crc32 of the slug), so
re-running is stable and idempotent. Also sanitizes scraped descriptions
(broken fragments like "Code assistant 12 7 Freemium" or "(from provided
text: X)") so future batches never republish junk.

Usage: python gen-batchN-v2.py <batch-nn.csv> [--out DIR] [--agents|--auto]
Writes to OUT (default: the bla5k-site content dir).
"""
import pandas as pd, json, re, os, sys, zlib
from datetime import date

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "content", "sites")
MASTER = 'FINAL_master_2605_verified.csv'
DEFAULT_BATCH = 'batches_final/batch-02.csv'

BATCH = DEFAULT_BATCH
if len(sys.argv) > 1 and not sys.argv[1].startswith('--'):
    BATCH = sys.argv[1]
if '--out' in sys.argv:
    OUT = sys.argv[sys.argv.index('--out') + 1]
today = date.today().isoformat()
year = date.today().year

df = pd.read_csv(BATCH)
master = pd.read_csv(MASTER)

try:
    full_descs = json.load(open('all_full_descs.json', encoding='utf-8'))
except Exception:
    full_descs = {}
url_map = master.set_index('Slug')['OfficialURL'].to_dict()

PRICING_N = {
    'free': 'free', 'freemium': 'freemium', 'free trial': 'freemium',
    'subscription': 'paid', 'paid': 'paid',
}

# ---- Deterministic variation selection (stable across runs) ----
def pick(pool, slug):
    return pool[zlib.crc32(slug.encode('utf-8')) % len(pool)]

# ---- Variation pools: every entry injects {name} / {cat} / {price_model}
# ---- so each article's sentences are unique to that tool.
BODY_INTRO = [
    "AI has moved well beyond chat for most teams, and focused tools like {name} earn their keep in the jump from demo to daily use.",
    "Teams increasingly use AI beyond simple chat \u2014 and dedicated tools like {name} prove their value in that move from demo to real work.",
    "AI today is about more than chat, and the distance between a slick demo and a real workflow is where tools like {name} make the difference.",
    "Most teams have outgrown casual AI use, and purpose-built tools like {name} matter most in the gap between demo and daily routine.",
    "Beyond chat, teams need AI that works in production \u2014 and that demo-to-workflow gap is exactly where tools like {name} stand out.",
    "AI is no longer just a chat novelty, and the hardest part \u2014 turning a demo into a daily workflow \u2014 is where tools like {name} shine.",
    "Most teams now expect AI to do real work, and the bridge from a flashy demo to steady production is where focused tools like {name} prove themselves.",
    "AI has grown past chat for most teams, and dedicated tools like {name} earn their place when a demo has to become a daily workflow.",
]

BODY_GUIDE = [
    "Below we look at what {name} does, who it suits, what it costs, and how it stacks up against alternatives.",
    "This review breaks down what {name} does, who should use it, what it costs, and where it sits in the market.",
    "Here is what {name} actually does, who it is built for, what it costs, and how it compares to the competition.",
    "In this guide: what {name} does, who it helps, what it costs, and how it compares with similar tools.",
    "This article covers {name}'s core function, the people it suits, the pricing, and how it compares to the alternatives.",
    "We explain what {name} does, who it is for, what it will cost, and where it stands among the options.",
    "This guide walks through what {name} does, who benefits most, what it costs, and how it competes.",
    "Read on for what {name} does, who it fits, what it costs, and how it compares with the other options.",
]

INSHORT = [
    "In short, {name} is built around one clear promise: take your input \u2014 a prompt, a file, or a task \u2014 and return a usable result for {cat} without the manual grind. For plenty of users, that one capability of {name} replaces several steps they used to do by hand.",
    "Put simply, {name} turns your prompt, file, or task into a usable result for {cat} work \u2014 and that one ability of {name} often eliminates several smaller steps from the usual workflow.",
    "At its core, {name} takes an input and returns a usable output for {cat} \u2014 for many users, that single strength of {name} is the reason they switch, since it replaces whole chunks of manual work.",
    "The promise of {name} is straightforward: feed it a prompt, a file, or a task and get a practical result for {cat} \u2014 many users find that this one ability of {name} removes several tasks from their daily routine.",
]

WHO_FITS = [
    "{name} fits creators, professionals, and small teams with a recurring {cat} need who want a purpose-built tool rather than patching together generic AI assistants. {name} really earns its keep when speed counts \u2014 for daily production, repetitive jobs, or quick iterations. If your need is occasional, the free or freemium tier is usually enough to see whether {name} fits.",
    "{name} suits creators, professionals, and small teams that regularly need {cat} and prefer a focused tool over juggling generic AI assistants. {name} shines wherever pace matters: steady production work, repeatable tasks, or fast iteration cycles. For occasional use, {name}'s free or freemium plan is usually enough to test the waters.",
    "{name} is made for creators, professionals, and small teams with a steady {cat} workload who want a dedicated tool rather than assembling one from general assistants. {name} is most valuable when you need to move fast \u2014 regular output, recurring tasks, or rapid prototyping. If you only dip into {name} now and then, its free or freemium tier will likely cover you.",
    "{name} targets creators, professionals, and small teams with a recurring {cat} need who prefer a purpose-built tool to generic AI assistants. The payoff of {name} is biggest when speed is critical: routine production, repeated jobs, or tight iteration loops. Light users rarely need to pay \u2014 {name}'s free or freemium tier usually does the job.",
]

PRICING_BODY = [
    "{name} currently runs on a {price_model}. {name}'s plans, free limits, and trial windows shift often in this space, so check the official site for the latest figures before you commit.",
    "{name} currently runs on a {price_model}. Pricing and allowances on {name} change regularly \u2014 always confirm the current numbers on the official site before subscribing.",
    "{name} currently runs on a {price_model}. Because pricing, free tiers, and trials evolve quickly, the official website is the only source you should trust for {name}'s up-to-date costs.",
    "{name} currently runs on a {price_model}. This category moves fast on pricing \u2014 verify {name}'s latest plans and free allowances directly on the official site first.",
    "{name} currently runs on a {price_model}. Plan prices and free limits on {name} are updated frequently, so head to the official website for accurate, current numbers before deciding.",
    "{name} currently runs on a {price_model}. Free allowances and trial offers for {name} change often in this market \u2014 check the official site for the latest details before paying.",
    "{name} currently runs on a {price_model}. Pricing details for {name} shift regularly, so the official website is your safest reference for what its plans and free tiers look like today.",
    "{name} currently runs on a {price_model}. Before subscribing to {name}, confirm the current pricing and free allowances on the official site \u2014 they change frequently in this category.",
]

ALT_CROWDED = [
    "The {cat} market is packed, so with {name} the right choice comes down to your volume, budget, and how specialized your needs are.",
    "There is no shortage of {cat} tools, and the best pick among them \u2014 including {name} \u2014 depends on your volume, budget, and how niche your needs are.",
    "The {cat} landscape is crowded \u2014 the ideal tool (possibly {name}) depends on your volume, budget, and how specific your needs are.",
    "Plenty of options exist in the {cat} space, so the right fit \u2014 from {name} to its rivals \u2014 depends on your volume, budget, and how specialized your needs are.",
    "The {cat} category is competitive, and choosing well \u2014 whether {name} or a rival \u2014 comes down to your volume, budget, and how specialized your needs are.",
    "With so many {cat} options out there, the right pick (like {name} vs. the rest) depends on your volume, budget, and how specialized your needs are.",
    "The {cat} space has no shortage of contenders; your volume, budget, and how specialized your needs are will decide whether {name} is the right one.",
    "The {cat} market is crowded, and the best choice \u2014 {name} included \u2014 hinges on your volume, budget, and how specialized your needs are.",
]

ALT_COMPARE = [
    "The best way to compare is to run the same real task through {name} and one or two rivals, judging output quality, speed, and price.",
    "To choose well, run your own task through {name} and a couple of alternatives, then compare output quality, speed, and price.",
    "The most honest comparison: take one real task, run it through {name} and two alternatives, and weigh output, speed, and price.",
    "Try {name} on a real task alongside one or two alternatives and judge output quality, speed, and price for yourself.",
]

ALT_DIFFERS = [
    "What separates {name} from its rivals is mostly output quality, integrations, and how naturally it fits your workflow.",
    "In this category, the real differences are output fidelity, integrations, and how well {name} fits your existing habits.",
    "The main differentiators are output quality, integrations, and how well {name} slots into your current process.",
    "Around {name}, the biggest gaps are output fidelity, ecosystem integrations, and how seamlessly it fits your routine.",
    "Expect the biggest differences between {name} and alternatives in output quality, integrations, and how comfortably it fits how you already work.",
    "The meaningful differences for {name} are output fidelity, integrations, and how well the tool matches your way of working.",
    "What really varies around {name} is output fidelity, integrations, and fit with your existing workflow.",
    "Mostly {name} differs from alternatives on output quality, integrations, and how well it matches your current setup.",
]

CONCLUSION1 = [
    "{name} targets a real pain point in {cat} \u2014 turning an input into a usable result without the manual grind.",
    "{name} goes after a genuine problem in {cat}: getting a usable result from an input without the manual grind.",
    "At bottom, {name} exists to solve a real {cat} pain \u2014 turning an input into a usable result with far less manual effort.",
    "{name} addresses a real need in {cat} \u2014 a usable output from your input, without the grind.",
]

CONCLUSION2 = [
    "If {name} fits your workflow, run it on one real task to see if it holds up.",
    "When {name} lines up with your work, a quick trial on a single concrete task is worthwhile.",
    "If {name} sounds like your situation, it deserves a short test on a real job.",
    "Should {name} match how you work, spend a few minutes testing it on one actual task.",
    "If your needs align with what {name} offers, give it a quick spin on a genuine task before deciding.",
    "When {name} fits the way you work, a brief evaluation on one real task is the best way to judge it.",
    "If {name} matches your daily work, try it once on a specific task to see the difference.",
    "When {name} fits your needs, a short trial on a concrete task is a sensible next step.",
]

CONCLUSION3 = [
    "Test {name}'s results against your existing tools, double-check its price on the official site, and choose based on your real workload.",
    "Judge {name} by running the same job you do today, confirm the cost on the official site, and pick what your actual usage demands.",
    "Weigh {name}'s output against what you already use, verify its pricing on the official site, and go with what your workload really calls for.",
    "Compare {name} side by side with your current stack, confirm its pricing on the official site, and decide by your real usage.",
    "Check {name}'s output against your go-to tools, verify the current price on the official site, and choose for your actual needs.",
    "Match {name} against your existing workflow, confirm the numbers on the official site, and decide on what you truly require.",
    "Set {name} beside your current tools, verify its price on the official site, then decide based on your genuine workload.",
]

TIP = [
    "> **Tip:** Start with one real task, not a demo \u2014 {name}'s output quality on your own work is what matters.",
    "> **Tip:** Judge {name} on a real job from your own workflow, not a canned demo.",
    "> **Tip:** A five-minute test with {name} on your actual task tells you more than any feature list.",
    "> **Tip:** Try {name} with your own data before comparing plans or pricing.",
]

FEATURES = [
    "- {name} is purpose-built for {cat} rather than generic chat\n- {name} delivers fast, practical results from real inputs\n- A free or trial entry point covers most cases with {name}\n- Exports and integrations from {name} drop into an existing workflow",
    "- {name} is focused on {cat} instead of broad chat\n- Quick, usable results from real inputs \u2014 {name}'s core promise\n- Most tools in {name}'s space offer a free or trial start\n- Exports and integrations from {name} slot into existing workflows",
    "- {name} is built around {cat} rather than general chat\n- Fast, practical results from real inputs with {name}\n- Free or trial entry point in most cases with {name}\n- {name} fits an existing workflow via exports and integrations",
]

DO_BULLETS = [
    "- **Go from task to result fast** \u2014 describe what you need (or supply your source material) and let {name} handle the heavy lifting.\n- **Keep your existing pipeline** \u2014 export from {name} into the formats and tools you already use.\n- **Prototype quickly** \u2014 test multiple approaches with {name} in the time it used to take to do one.\n- **Evaluate before committing** \u2014 the free or trial tier (where available) lets you judge {name}'s output quality on your own work first.",
    "- **Describe and done** \u2014 give {name} a prompt or source material and the AI does the heavy lifting.\n- **Fits your stack** \u2014 {name} exports to the formats and tools you already use.\n- **Iterate fast** \u2014 run several approaches with {name} in the time one used to take.\n- **Test first** \u2014 the free or trial tier lets you judge {name}'s output quality on real work.",
    "- **Turn tasks into results** \u2014 a prompt, a file, or your data in, a usable output out with {name}.\n- **Stay in your workflow** \u2014 standard exports and integrations from {name} keep it familiar.\n- **Move quickly** \u2014 try multiple approaches with {name} in the time a single pass used to take.\n- **Validate cheaply** \u2014 judge {name}'s output quality on the free or trial tier first.",
]

ADVANTAGES = [
    "- {name} is purpose-built for {cat} rather than a generic assistant.\n- Fast to evaluate \u2014 {name} offers a free or trial entry point.\n- Designed to drop into an existing workflow via {name}'s standard formats and exports.\n- Iteration speed: generate and refine multiple options quickly with {name}.",
    "- {name} is built for {cat}, not generic chat.\n- Easy to evaluate \u2014 a free or trial tier is common with {name}.\n- {name}'s standard exports and formats keep your workflow intact.\n- Speed of iteration: refine several options in the time one used to take with {name}.",
    "- Dedicated to {cat} \u2014 a focused tool like {name}, not a jack-of-all-trades.\n- Low-risk to try \u2014 free or trial tiers are the norm with {name}.\n- {name} plays well with your stack through standard formats and exports.\n- Quick iteration with {name} lets you compare multiple outputs fast.",
]

LIMITATIONS = [
    "- **Output still needs review** \u2014 AI-generated results from {name} benefit from a human check before production use.\n- **Detail ceilings** \u2014 very complex or highly specialized work may still require manual passes on {name}.\n- **Pricing and features move fast** \u2014 always verify the current plan and limits for {name} on the official site.\n- **Specialization cuts both ways** \u2014 a dedicated tool like {name} is great at its one job but won't replace your entire toolkit.",
    "- **Human review still required** \u2014 check {name}'s output before it goes into production.\n- **Complex work has limits** \u2014 very specialized jobs may still need manual passes with {name}.\n- **Plans change quickly** \u2014 confirm {name}'s pricing and limits on the official site.\n- **One job, one tool** \u2014 {name} excels at its niche but won't replace your whole stack.",
    "- **Review before use** \u2014 {name}'s AI output should be checked by a human first.\n- **Hard ceilings** \u2014 highly complex or niche work can still need manual handling with {name}.\n- **Fast-moving pricing** \u2014 verify {name}'s plans and limits on the official site regularly.\n- **Narrow by design** \u2014 {name} is excellent at one workflow, not a replacement for your full toolkit.",
]

# ---- FAQ variation pools ----
FAQ_CORE = [
    " That is the core of what {name} does \u2014 {cat} handled by a dedicated AI tool rather than a general-purpose chatbot.",
    " That is the heart of {name}: {cat} handled by a purpose-built tool instead of a generic chatbot.",
    " That is what {name} centers on \u2014 dedicated {cat} handling rather than general chatbot answers.",
    " That is the essence of {name} \u2014 {cat} work done by a focused tool, not a general-purpose assistant.",
]

FAQ_FREE_YES = [
    "Yes \u2014 {name} is currently free to use. The exact limits and any future pricing changes should be confirmed on the official website, as tools in this category occasionally introduce paid tiers.",
    "{name} is free to use right now. Limits and future pricing can change, so check the official website before relying on it for production work.",
    "Currently {name} is free. Since free tiers in this category sometimes shrink, verify the latest limits on the official website first.",
]

FAQ_FREEMIUM = [
    "{name} uses a freemium model, so there is a usable free tier with paid upgrades available. For exact limits and the current price of the paid plan{price_txt}, check the official website \u2014 pricing changes often.",
    "{name} runs a freemium model \u2014 a solid free tier plus paid upgrades. For the exact limits and paid plan price{price_txt}, see the official website, since pricing changes often.",
    "{name} is freemium: a genuinely useful free tier with paid upgrades on top. Confirm the current limits and price of the paid plan{price_txt} on the official website \u2014 rates shift frequently.",
]

FAQ_PAID = [
    "{name} is a paid tool (subscription or one-off pricing). Some tools in this category offer a free trial, so check the official website for the current plans and any trial before subscribing.",
    "{name} is paid (subscription or one-off pricing). Many tools here offer a trial \u2014 check the official website for current plans and any free trial before committing.",
    "{name} is a paid tool. Plans are subscription or one-off; some competitors offer trials, so confirm the current pricing and trial availability on the official site.",
]

FAQ_WHAT_CAN = [
    "In practice, {name} is used to speed up {cat} work: {s0}. The exact feature set is best confirmed with a quick test on the official site.",
    "You would reach for {name} to move faster on {cat}: {s0}. Confirm the precise feature set with a quick test on the official site.",
    "{name} helps with real {cat} tasks \u2014 {s0}. A quick hands-on test on the official site is the best way to see the full feature set.",
]

FAQ_WHO_BEST = [
    "It suits creators, professionals, and small teams with a recurring {cat} need who want a purpose-built tool instead of juggling generic AI assistants. If you only need it occasionally, the free or trial tier is usually enough to judge it.",
    "It is best for creators, professionals, and small teams with steady {cat} work who prefer a dedicated tool over generic AI assistants. For occasional use, the free or trial tier is usually enough to evaluate it.",
    "It fits creators, professionals, and small teams that regularly handle {cat} and want a focused tool rather than a general assistant. Occasional users can usually judge it on the free or trial tier.",
]

FAQ_START = [
    "Go to the official website, create an account if required, and run one real task through {name} \u2014 a prompt, an upload, or your own data. Testing with your actual work is the fastest way to judge output quality.",
    "Head to the official website, sign up if needed, and run one real task \u2014 a prompt, an upload, or your own data. Your actual work is the fastest way to judge {name}.",
    "Start at the official website: create an account if required, then run a real task through {name} \u2014 a prompt, a file, or your data. Real-work testing beats any demo.",
]

FAQ_CHATBOT = [
    "A chatbot answers questions with text; a dedicated tool like {name} is built around one workflow, which usually means better output for that task but less flexibility overall.",
    "A general chatbot replies in text; a focused tool like {name} is built around a single workflow \u2014 better results for that job, less flexibility elsewhere.",
    "Chatbots give text answers; {name} is built around one specific workflow, so it usually produces better results for that task at the cost of overall flexibility.",
]

# ---- GROUP_SUB (unchanged from gen-batchN.py) ----
GROUP_SUB = {
    '3D': 'design-3d', '3d': 'design-3d', 'AI Agents': 'dev-ai-agents', 'Assistants': 'ai-chat',
    'Chat': 'ai-chat', 'AI detection': 'ai-productivity', 'Generation': 'ai-image',
    'Content creation': 'ai-writing', 'Writing': 'ai-writing', 'Copywriting': 'ai-writing',
    'Marketing': 'mkt-social', 'Sales': 'ai-productivity', 'Customer support': 'ai-productivity',
    'Management': 'ai-productivity', 'Business': 'fin-fintech', 'Builders': 'nc-builders',
    'Automation': 'nc-automation', 'Design': 'design-graphics', 'Avatars': 'ai-image',
    'Audio': 'ai-video-audio', 'Planning': 'ai-productivity', 'Resources': 'ai-productivity',
    'Coaching': 'learn-courses', 'Developer': 'dev-code', 'Verification': 'ai-productivity',
    'Web3': 'dev-ai-agents', 'Automotive': 'ent-travel', 'Prints': 'design-graphics',
    'Video generation': 'ai-video-audio', 'Video Editing': 'ai-video-audio', 'Video': 'ai-video-audio',
    'Text-to-video': 'ai-video-audio', 'Text-to-speech': 'ai-video-audio', 'Speech-to-text': 'ai-video-audio',
    'Transcriber': 'ai-video-audio', 'Audio generation': 'ai-video-audio', 'Audio editing': 'ai-video-audio',
    'Voice': 'ai-video-audio', 'Voice Communication': 'ai-video-audio', 'Music': 'ai-video-audio',
    'Podcasting': 'va-podcast', 'Motion capture': 'ai-video-audio', 'Noise cancellation': 'ai-video-audio',
    'Animation Generation': 'ai-video-audio', 'Art Generation': 'ai-image', 'Image generation': 'ai-image',
    'Image editing': 'ai-image', 'Image Analysis': 'ai-image', 'Photo Retouching': 'ai-image',
    'Product Image': 'ai-image', 'Professional Portrait': 'ai-image', 'Face Swapping': 'ai-image',
    'Background Removal': 'ai-image', 'Image Enhancement': 'ai-image', 'Image Management': 'ai-image',
    'Image scanning': 'ai-image', 'Image Search': 'ai-image', 'Image Annotation': 'ai-image',
    'Image Collation': 'ai-image', 'Image Upscaling': 'ai-image', 'Colorization': 'ai-image',
    'Wallpaper Generation': 'ai-image', 'Family Portraits': 'ai-image', 'Avatar': 'ai-image',
    'Anime Generation': 'ai-image', 'Watermark Removal': 'ai-image', 'Texture Generation': 'ai-image',
    'Web Placeholders': 'ai-image', 'Art Style Transfer': 'ai-image', 'Virtual Staging': 'ai-image',
    'Writing assistant': 'ai-writing', 'Content Writing': 'ai-writing', 'Essay writer': 'ai-writing',
    'Stories Generation': 'ai-writing', 'Translation': 'ai-writing', 'Paraphraser': 'ai-writing',
    'Poem writer': 'ai-writing', 'Grammar checker': 'write-grammar', 'Summarizer': 'ai-productivity',
    'Data extraction': 'ai-productivity', 'Legal': 'ai-productivity', 'Document assistant': 'ai-productivity',
    'Meeting assistant': 'ai-productivity', 'Sentiment analysis': 'ai-productivity',
    'Knowledge base management': 'ai-productivity', 'Operational management': 'ai-productivity',
    'Recommendation Systems': 'ai-productivity', 'Product Information': 'ai-productivity',
    'Compliance &amp; Verification': 'ai-productivity', 'Regulatory Compliance': 'ai-productivity',
    'Communication Monitoring': 'ai-productivity', 'Virtual Presence': 'ai-productivity',
    'Web Monitoring': 'ai-productivity', 'Search engine': 'ai-productivity',
    'Scheduling assistant': 'ai-productivity', 'Human resources': 'ai-productivity',
    'Real estate': 'ai-productivity', 'Property Management': 'ai-productivity',
    'Shipping Logistics': 'ai-productivity', 'Data Labeling': 'ai-productivity',
    'Fraud Detection': 'ai-productivity', 'Developer tools': 'dev-code', 'Code assistant': 'dev-code',
    'API': 'dev-code', 'SQL': 'dev-code', 'Web Development': 'dev-code', 'Software Testing': 'dev-code',
    'Code Debugging': 'dev-code', 'Databases': 'dev-code', 'Engineering Analytics': 'dev-code',
    'User Testing': 'dev-code', 'Development': 'dev-code', 'Documentation Generation': 'dev-docs',
    'SEO': 'mkt-seo', 'Email': 'mkt-email', 'Email assistant': 'mkt-email',
    'Social media management': 'mkt-social', 'Social media content': 'mkt-social',
    'Social media': 'mkt-social', 'Social media engagement': 'mkt-social',
    'Social media growth': 'mkt-social', 'Advertising': 'mkt-social', 'Branding': 'mkt-social',
    'Digital Marketing': 'mkt-social', 'Review Management': 'mkt-social',
    'Brand Monitoring': 'mkt-social', 'Market research': 'ai-productivity',
    'Education': 'learn-courses', 'Language Learning': 'learn-courses', 'Study assistant': 'learn-courses',
    'Quiz generator': 'learn-courses', 'Homework assistant': 'learn-courses',
    'Teacher assistant': 'learn-courses', 'Course Generator': 'learn-courses',
    'Self-improvement': 'learn-courses', 'Investment': 'fin-investing', 'Personal finance': 'fin-budgeting',
    'Finance': 'fin-fintech', 'Tax assistant': 'fin-accounting', 'Accounting assistant': 'fin-accounting',
    'Financial Reporting': 'fin-fintech', 'Business planning': 'fin-fintech',
    'Lending Services': 'fin-fintech', 'Payments Security': 'fin-fintech',
    'Grant Funding': 'fin-fintech', 'Crypto and Web3': 'dev-ai-agents',
    'Workflow Automation': 'nc-automation', 'Industrial Automation': 'nc-automation',
    'Communication Automation': 'nc-automation', 'No-code': 'nc-builders',
    'App Builder': 'nc-builders', 'AI website builder': 'nc-builders',
    'Form Builder': 'nc-builders', 'Landing Page Generator': 'nc-builders',
    'Chatbot builder': 'nc-builders', 'Productivity': 'prod-tasks', 'Task management': 'prod-tasks',
    'Project management': 'prod-tasks', 'Team Collaboration': 'prod-tasks',
    'Virtual team': 'prod-tasks', 'Note taking': 'prod-notes',
    'Personal knowledge base': 'prod-notes', 'Presentations': 'prod-notes',
    'Spreadsheets': 'prod-data', 'Data analysis': 'prod-data',
    'Data visualization': 'prod-data', 'Forecasting': 'prod-data',
    'User Behavior': 'prod-data', 'Spatial Analytics': 'prod-data',
    'Report Generation': 'prod-data', 'Document management': 'prod-data',
    'Fitness': 'ent-health', 'Mental Health Support': 'ent-health',
    'Medical Diagnostics': 'ent-health', 'Medical Scribes': 'ent-health',
    'Nutrition Assistants': 'ent-health', 'Personal Wellness': 'ent-health',
    'Healthcare Management': 'ent-health', 'Health': 'ent-health',
    'Medical Information': 'ent-health', 'Symptom Checkers': 'ent-health',
    'Family Health': 'ent-health', 'Veterinary Tools': 'ent-health', 'Sports': 'ent-health',
    'Recipe Generator': 'ent-health', 'Pets': 'ent-health',
    'Gaming': 'ent-gaming', 'Game Engine': 'ent-gaming',
    'Travel': 'ent-travel', 'Interior design': 'design-3d', 'Landscape Design': 'design-3d',
    'Architectural Design': 'design-3d', 'UI Generation': 'design-ui',
    'Icon Generation': 'design-graphics', 'Diagram Generation': 'design-graphics',
    'Emoji Generation': 'design-graphics', 'Vector Generation': 'design-graphics',
    'Vector Conversion': 'design-graphics', 'Sketching': 'design-graphics',
    'Poster Design': 'design-graphics', 'QR Code Generation': 'design-graphics',
    'Typography': 'design-graphics', 'Ad Mockup': 'design-graphics',
    'Character Design': 'design-graphics', 'Coloring': 'design-graphics',
    'Coloring Pages': 'design-graphics', 'Job Search': 'career-jobs',
    'News': 'news-news', 'Startup tools': 'disc-launches',
    'E-commerce': 'shop-marketplaces', 'Shopping Assistants': 'shop-marketplaces',
    'Gift ideas': 'shop-marketplaces', 'File management': 'util-files',
    'Utilities': 'util-files', 'Domain Management': 'host-domains',
    'Infrastructure tools': 'host-hosting', 'Personal assistant': 'ai-chat',
    'Personal Chatbot': 'ai-chat', 'Omnichannel chatbot': 'ai-chat',
    'Omnichannel Inbox': 'ai-chat', 'Dating Chat': 'ai-chat',
    'Leading AI Assistants': 'ai-chat', 'AI Assistant': 'ai-chat',
    'Life assistant': 'ai-chat', 'LLM': 'dev-ai-agents', 'AI Model Builder': 'dev-ai-agents',
    'Model Training': 'dev-ai-agents', 'Recommendation': 'ai-productivity',
}


def group_name_fallback(g):
    if not g:
        return 'AI work'
    low = g.lower()
    if low.startswith('ai '):
        return low
    return 'AI ' + low


def yaml_str(v):
    v = str(v).strip()
    if not v:
        return '""'
    leading_special = "#-[]{}?,:|>&*!%@`\"'~"
    if (v[0] in leading_special
            or any(c in v for c in ":" + chr(10) + chr(34))
            or v in ("null", "Null", "NULL", "true", "True", "false", "False")):
        q = v.replace(chr(34), "\\" + chr(34)).replace(chr(10), "\\n")
        return chr(34) + q + chr(34)
    if v.isdigit() or (v.replace(".", "", 1).isdigit() and "." in v):
        return chr(34) + v + chr(34)
    return v


def sentences(desc):
    return [s.strip() for s in re.split(r'(?<=[.!?])\s+', desc) if len(s.strip()) > 15]


# ---- Scraped-data sanitizer: removes broken fragments so future batches
# ---- never republish the "Code assistant 12 7 Freemium" class of junk.
def clean_desc(desc, name):
    d = desc
    # scraped provenance markers
    d = re.sub(r'\([^)]*(?:from provided text|tool_description)[^)]*\)', '', d, flags=re.I)
    d = re.sub(r'\b(?:from provided text|tool_description from)\s*:?\s*[\w.\-]+', '', d, flags=re.I)
    # stuck table fragment: "Category [& Category] N N Freemium [ - $x/mo]"
    # Only stripped when the fragment carries a number, & or currency price —
    # a safety gate so legitimate prose ending in "free" is never touched.
    TOK = r'(?:Freemium|Free trial|Free trail|Paid|Free|Contact us|Subscription)(?:\s*-\s*[$€]\S+)?'
    CATW = r'[A-Za-z0-9][A-Za-z0-9&\'\-]{0,40}'
    FRAG = (r'((?:' + CATW + r'(?:\s+&\s+' + CATW + r')?(?:\s+' + CATW + r'){0,6}'
            r'(?:\s+\d{1,4}){0,4}\s*' + TOK + r'))')

    def strip_if_junk(m):
        frag = m.group(1)
        if re.search(r'\d|&|[$€]', frag):
            return '.'
        return m.group(0)

    d = re.sub(r'\.\s*' + FRAG + r'(?=\s+That is the core|\s*\n\s*\n|$)',
               strip_if_junk, d, flags=re.I)
    # Position-anchored strip for fragments WITHOUT digits/&/$ (e.g. "AI Agents
    # Freemium"): only removed when jammed right before a generator connector
    # phrase ("That is the core", "At its core", ...) or a paragraph break —
    # legitimate prose ending in "free" never sits at those positions.
    CONNECTOR = r'(?:That is the core|That is the heart|That is what|That is the essence|At its core|In short|Put simply|The promise of)'
    FRAG2 = (r'\.\s*((?:' + CATW + r'(?:\s+&\s+' + CATW + r')?(?:\s+' + CATW + r'){0,6}'
             r'(?:\s+\d{1,4}){0,4}\s*' + TOK + r'))(?=\s*' + CONNECTOR + r'|\s*\n\s*\n|$)')
    d = re.sub(FRAG2, '.', d, flags=re.I)
    # trailing ' AI' from the scraper
    d = re.sub(r'\s+AI\s*$', '', d)
    return d.strip()


def faqs_for(name, desc, pricing_n, price, cat_h, slug):
    low = desc.lower()
    qs = []
    core = pick(FAQ_CORE, slug + ':core').format(name=name, cat=cat_h)
    qs.append(('What is ' + name + '?', desc + core))
    price_txt = ''
    if pricing_n == 'free':
        ans = pick(FAQ_FREE_YES, slug + ':free').format(name=name)
    elif pricing_n == 'freemium':
        price_txt = (", around " + price.replace("- ", "")) if (price and 'nan' not in str(price).lower()) else ""
        ans = pick(FAQ_FREEMIUM, slug + ':freemium').format(name=name, price_txt=price_txt)
    else:
        ans = pick(FAQ_PAID, slug + ':paid').format(name=name)
    qs.append(('Is ' + name + ' free?', ans))
    s0 = sentences(desc)[0] if sentences(desc) else ('handle ' + cat_h.lower() + ' for you')
    qs.append(('What can you do with ' + name + '?',
               pick(FAQ_WHAT_CAN, slug + ':can').format(name=name, cat=cat_h, s0=s0)))
    qs.append(('Who is ' + name + ' best for?',
               pick(FAQ_WHO_BEST, slug + ':who').format(name=name, cat=cat_h)))
    qs.append(('How do I start with ' + name + '?',
               pick(FAQ_START, slug + ':start').format(name=name)))
    qs.append(('How does ' + name + ' compare with a general AI chatbot?',
               pick(FAQ_CHATBOT, slug + ':bot').format(name=name)))
    return qs


def body(name, desc, cat_h, url, pricing_n, slug):
    price_model = ('free model \u2014 no paywall' if pricing_n == 'free'
                   else ('freemium model with a free tier plus paid upgrades' if pricing_n == 'freemium'
                         else 'paid model (subscription or one-off pricing)'))
    fmt = dict(name=name, desc=desc, cat=cat_h, url=url, price_model=price_model)
    intro = pick(BODY_INTRO, slug + ':intro').format(**fmt)
    guide = pick(BODY_GUIDE, slug + ':guide').format(**fmt)
    inshort = pick(INSHORT, slug + ':short').format(**fmt)
    who = pick(WHO_FITS, slug + ':who').format(**fmt)
    pricing = pick(PRICING_BODY, slug + ':price').format(**fmt)
    crowded = pick(ALT_CROWDED, slug + ':crowd').format(**fmt)
    compare = pick(ALT_COMPARE, slug + ':cmp').format(**fmt)
    differs = pick(ALT_DIFFERS, slug + ':diff').format(**fmt)
    c1 = pick(CONCLUSION1, slug + ':c1').format(**fmt)
    c2 = pick(CONCLUSION2, slug + ':c2').format(**fmt)
    c3 = pick(CONCLUSION3, slug + ':c3').format(**fmt)
    tip = pick(TIP, slug + ':tip').format(**fmt)
    feats = pick(FEATURES, slug + ':feat').format(**fmt)
    do_b = pick(DO_BULLETS, slug + ':do').format(**fmt)
    adv = pick(ADVANTAGES, slug + ':adv').format(**fmt)
    lim = pick(LIMITATIONS, slug + ':lim').format(**fmt)

    return f"""{intro} {guide}

## What is {name}?

{desc}

{inshort}

## Key features

{feats}

## What you can do with it

{do_b}

## Who is it for?

{who}

## Pricing

{pricing}

## Advantages

{adv}

## Limitations and honest considerations

{lim}

## Alternatives and comparisons

{crowded} {compare} {differs}

## Conclusion

{c1} {c2} {c3}

{tip}

*Official resource: [{name}]({url})*"""


def main():
    os.makedirs(OUT, exist_ok=True)
    written = 0
    skipped = 0
    for _, r in df.iterrows():
        name = str(r['title']).strip()
        slug = str(r['slug']).strip()
        status = str(r.get('status', '')).strip()
        if not name or not slug:
            continue
        if status == 'http404':
            skipped += 1
            print('  SKIP dead:', slug, name)
            continue
        url = url_map.get(slug) or r['official_url']
        if not url or str(url).startswith('nan'):
            skipped += 1
            print('  SKIP no-url:', slug)
            continue
        desc = full_descs.get(slug) or str(r['description'])
        desc = clean_desc(desc, name)
        if len(desc) < 60:
            desc = name + ' is an AI-powered tool for ' + str(r.get('category', '')).lower() + '. ' + desc
        group = str(r['group']).strip() if pd.notna(r.get('group')) else 'Assistants'
        sub = GROUP_SUB.get(group, 'ai-productivity')
        cat_h = group_name_fallback(group)
        pricing_n = PRICING_N.get(str(r['pricing']).strip().lower(), 'freemium')
        price = str(r['price']).replace('- ', '') if pd.notna(r['price']) else ''

        body_md = body(name, desc, cat_h, url, pricing_n, slug)
        tags = [group, 'AI', 'Tool']

        tagline = sentences(desc)[0] if sentences(desc) else (name + ' — AI tool for ' + cat_h.lower() + '.')
        if len(tagline) > 160:
            tagline = tagline[:157].rsplit(' ', 1)[0] + '...'
        simple_s = sentences(desc)[0] if sentences(desc) else (name + ' uses AI to handle ' + cat_h.lower() + ' for you.')
        example_s = 'Give ' + name + ' one real task — a prompt, a file, or a request — and it returns a usable result for your ' + cat_h.lower() + ' workflow.'
        if 'agent' in group.lower() or 'automation' in group.lower():
            example_s = 'Give ' + name + ' one real workflow — a research task, a support query, or a dev job — and it orchestrates the AI agents needed to complete it.'

        simple_y = yaml_str(simple_s)
        example_y = yaml_str(example_s)
        faqs = faqs_for(name, desc, pricing_n, price, cat_h, slug)
        faq_yaml = '\n'.join('  - q: ' + yaml_str(q) + '\n    a: ' + yaml_str(a) for q, a in faqs)
        tags_yaml = '\n'.join('  - ' + t for t in tags)

        md = """---
name: {name}
url: {url}
# No image/screenshot — batch published without images (requested).
subcategory: {sub}
pricing: {pricing_n}
tagline: {tagline}
tags:
{tags_yaml}
featured: false
updated: {today}
metaTitle: {meta_title}
metaDescription: {tagline}
simple: {simple_y}
example: {example_y}
goodFor:
  - "People who want a purpose-built tool for {cat_h_low}"
  - "Creators, designers, and developers with a recurring need"
  - "Testing on a free or freemium tier before paying"
notFor:
  - "You need the absolute best specialist for a highly niche format"
  - "You require an enterprise support contract"
  - "You prefer one all-in-one assistant over many focused tools"
faqs:
{faq_yaml}
---
{body_md}
""".format(
            name=yaml_str(name), url=yaml_str(url), sub=sub,
            pricing_n=pricing_n, tagline=yaml_str(tagline), tags_yaml=tags_yaml,
            today=today, meta_title=yaml_str(name + ' - AI Tool Review & Guide ' + str(year)),
            simple_y=simple_y, example_y=example_y, cat_h_low=cat_h.lower(),
            faq_yaml=faq_yaml, body_md=body_md,
        )
        with open(os.path.join(OUT, slug + '.md'), 'w', encoding='utf-8') as f:
            f.write(md)
        written += 1
    print('written', written, 'articles to', OUT, '| skipped', skipped)


if __name__ == '__main__':
    main()
