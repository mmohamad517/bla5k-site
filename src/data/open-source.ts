/**
 * Open-source tools on GitHub — curated, every repo URL verified live (HTTP 200).
 *
 * Two sources feed the /open-source-ai-tools/ page:
 *   1. Tools whose article `url` field IS a github.com repo (auto-detected in
 *      the page, minus the few non-OSS exceptions below).
 *   2. Tools whose article URL is their product site but that are open source
 *      — mapped here (keyed by article slug) to their real GitHub repo.
 *
 * Adding a new open-source tool? Add its slug here and the page picks it up.
 */
export const OPEN_SOURCE_REPOS: Record<string, string> = {
  aider: 'https://github.com/Aider-AI/aider',
  agentscope: 'https://github.com/agentscope-ai/agentscope',
  'chatbot-ui': 'https://github.com/mckaywrigley/chatbot-ui',
  comfyui: 'https://github.com/comfyanonymous/ComfyUI',
  coolify: 'https://github.com/coollabsio/coolify',
  freedomgpt: 'https://github.com/ohmplatform/FreedomGPT',
  'frigate-nvr': 'https://github.com/blakeblackshear/frigate',
  'gemini-cli': 'https://github.com/google-gemini/gemini-cli',
  'glm-zhipu': 'https://github.com/THUDM/GLM-4',
  'goose-ai-agent': 'https://github.com/block/goose',
  humanlayer: 'https://github.com/humanlayer/humanlayer',
  'hunyuan3d-2-0': 'https://github.com/Tencent/Hunyuan3D-2',
  'jan-ai': 'https://github.com/janhq/jan',
  'kilocode-ai': 'https://github.com/Kilo-Org/kilocode',
  maxkb: 'https://github.com/1Panel-dev/MaxKB',
  multica: 'https://github.com/multica-ai/multica',
  n8n: 'https://github.com/n8n-io/n8n',
  openclaw: 'https://github.com/openclaw/openclaw',
  'opencode-ai': 'https://github.com/sst/opencode',
  'openinterpreter-com': 'https://github.com/OpenInterpreter/open-interpreter',
  openwahatsapp: 'https://github.com/open-wa/wa-automate-nodejs',
  paperclip: 'https://github.com/paperclipai/paperclip',
  pi: 'https://github.com/earendil-works/pi',
  pinokio: 'https://github.com/pinokiocomputer/pinokio',
  riffusion: 'https://github.com/riffusion/riffusion',
  'stable-audio': 'https://github.com/Stability-AI/stable-audio-tools',
  superagi: 'https://github.com/TransformerOptimus/SuperAGI',
  'twenty-com': 'https://github.com/twentyhq/twenty',
  'understand-anything': 'https://github.com/Egonex-AI/Understand-Anything',
};

/**
 * github.com-URL tools that are NOT open-source software (platforms or
 * proprietary products that happen to live on github.com). Excluded from the
 * page even though their `url` field is a github.com link.
 */
export const NON_OSS_GITHUB_SLUGS = new Set([
  'github', // the GitHub platform itself
  'github-copilot', // proprietary product
  'hugging-face', // platform (open libs, closed service)
  'replicate', // hosted platform
]);
