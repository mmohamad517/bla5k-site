/**
 * SHOW_EMPTY_CATEGORIES
 *   true  -> during building/preview: show ALL categories (empty ones say "Coming soon").
 *   false -> before going live: hide empty categories (safest for Google / AdSense).
 * Empty categories never get their own indexable page either way.
 */
export const SHOW_EMPTY_CATEGORIES = false;

export type Glow = 'cyan' | 'purple' | 'orange';

export interface Category {
  slug: string;
  name: string;
  icon: string; // emoji, zero-weight
  blurb: string;
  glow: Glow;
}

export interface Subcategory {
  slug: string;      // globally unique
  name: string;
  category: string;  // parent category slug
  icon: string;
}

/**
 * TWO-LEVEL TAXONOMY
 *   Category (top)  ->  Subcategory (nested)  ->  Sites
 * A site references a SUBCATEGORY; its parent category is derived automatically.
 * Add / rename / reorder freely — the whole site updates itself.
 */
export const categories: Category[] = [
  { slug: 'ai-tools',     name: 'AI Tools',              icon: '🤖', glow: 'cyan',   blurb: 'Chatbots, generators, and assistants powering the AI era.' },
  { slug: 'design',       name: 'Design & Creative',     icon: '🎨', glow: 'purple', blurb: 'Where designers create, showcase, and find their next idea.' },
  { slug: 'developer',    name: 'Developer Tools',       icon: '💻', glow: 'cyan',   blurb: 'Code, docs, and platforms engineers rely on daily.' },
  { slug: 'productivity', name: 'Productivity',          icon: '⚡', glow: 'orange', blurb: 'Apps that organize your work, notes, and life.' },
  { slug: 'discovery',    name: 'Discovery & Launches',  icon: '🚀', glow: 'purple', blurb: 'Find new products, alternatives, and what the web is buzzing about.' },
  { slug: 'learning',     name: 'Learning & Courses',    icon: '📚', glow: 'cyan',   blurb: 'Free and world-class education, one click away.' },
  { slug: 'communities',  name: 'Communities & Forums',  icon: '💬', glow: 'orange', blurb: 'Where the internet gathers to ask, answer, and build.' },
  { slug: 'media',        name: 'Media & Assets',        icon: '🖼️', glow: 'purple', blurb: 'Free photos, icons, fonts, and graphics for any project.' },
  { slug: 'no-code',      name: 'No-Code & Automation',  icon: '🧩', glow: 'cyan',   blurb: 'Build apps and automate work without writing code.' },
  { slug: 'utilities',    name: 'Handy Utilities',       icon: '🛠️', glow: 'orange', blurb: 'Small single-purpose tools that save real time.' },

  // --- Expanded coverage ---
  { slug: 'security',      name: 'Security & Privacy',    icon: '🔒', glow: 'purple', blurb: 'Protect your accounts, devices, and identity online.' },
  { slug: 'hosting',       name: 'Web Hosting & Domains', icon: '🌐', glow: 'cyan',   blurb: 'Everything you need to put a website online.' },
  { slug: 'marketing',     name: 'Marketing & SEO',       icon: '📣', glow: 'orange', blurb: 'Grow an audience and rank higher on search.' },
  { slug: 'finance',       name: 'Business & Finance',    icon: '💼', glow: 'cyan',   blurb: 'Run the money side of work and life.' },
  { slug: 'shopping',      name: 'Shopping & Deals',      icon: '🛒', glow: 'purple', blurb: 'Buy smarter with marketplaces, coupons, and deals.' },
  { slug: 'video-audio',   name: 'Video & Audio',         icon: '🎬', glow: 'orange', blurb: 'Create, edit, stream, and record sound and video.' },
  { slug: 'writing',       name: 'Writing & Publishing',  icon: '✍️', glow: 'cyan',   blurb: 'Write, polish, and publish your words.' },
  { slug: 'storage',       name: 'Cloud Storage & Files', icon: '☁️', glow: 'purple', blurb: 'Store, sync, share, and back up your files.' },
  { slug: 'careers',       name: 'Freelance & Careers',   icon: '🧑‍💻', glow: 'orange', blurb: 'Find work, hire talent, and build your career.' },
  { slug: 'social',        name: 'Social & Networking',   icon: '🔗', glow: 'cyan',   blurb: 'Platforms and tools to connect and grow a following.' },
  { slug: 'news',          name: 'News & Reading',        icon: '📰', glow: 'purple', blurb: 'Stay informed and keep track of what to read.' },
  { slug: 'entertainment', name: 'Entertainment & Lifestyle', icon: '🎮', glow: 'orange', blurb: 'Streaming, gaming, travel, and staying healthy.' },
  { slug: 'ios-apps',      name: 'iOS Apps',              icon: '🍏', glow: 'cyan',   blurb: 'The best apps for iPhone and iPad.' },
  { slug: 'android-apps',  name: 'Android Apps',          icon: '📲', glow: 'purple', blurb: 'Top apps and games for Android devices.' },
];

export const subcategories: Subcategory[] = [
  // AI Tools
  { slug: 'ai-writing',      name: 'Content Writing',       category: 'ai-tools',     icon: '✍️' },
  { slug: 'ai-image',        name: 'Image Generation',      category: 'ai-tools',     icon: '🖌️' },
  { slug: 'ai-video-audio',  name: 'Video & Audio',         category: 'ai-tools',     icon: '🎬' },
  { slug: 'ai-chat',         name: 'Chatbots & Assistants', category: 'ai-tools',     icon: '💬' },
  { slug: 'ai-productivity', name: 'AI Productivity',        category: 'ai-tools',     icon: '⚙️' },

  // Design & Creative
  { slug: 'design-ui',        name: 'UI / UX Design',       category: 'design',       icon: '📐' },
  { slug: 'design-inspo',     name: 'Inspiration Galleries', category: 'design',      icon: '✨' },
  { slug: 'design-color',     name: 'Color & Palettes',     category: 'design',       icon: '🌈' },
  { slug: 'design-graphics',  name: 'Graphics & Editing',   category: 'design',       icon: '🖼️' },
  { slug: 'design-3d',        name: '3D & Home Design',     category: 'design',       icon: '🏠' },

  // Developer Tools
  { slug: 'dev-code',      name: 'Code & Hosting',       category: 'developer',  icon: '🐙' },
  { slug: 'dev-docs',      name: 'Docs & Reference',     category: 'developer',  icon: '📖' },
  { slug: 'dev-play',      name: 'Playgrounds',          category: 'developer',  icon: '🧪' },
  { slug: 'dev-ai-agents', name: 'AI Agents & Frameworks', category: 'developer', icon: '🕸️' },

  // Productivity
  { slug: 'prod-notes', name: 'Notes & Docs',      category: 'productivity', icon: '📝' },
  { slug: 'prod-tasks', name: 'Tasks & Projects',  category: 'productivity', icon: '✅' },
  { slug: 'prod-data',  name: 'Databases & Sheets',category: 'productivity', icon: '📊' },

  // Discovery & Launches
  { slug: 'disc-launches',     name: 'New Launches',            category: 'discovery', icon: '🆕' },
  { slug: 'disc-alternatives', name: 'Alternatives & Compare',  category: 'discovery', icon: '🔀' },
  { slug: 'disc-news',         name: 'Tech News',               category: 'discovery', icon: '📰' },

  // Learning & Courses
  { slug: 'learn-code',    name: 'Learn to Code',   category: 'learning', icon: '⌨️' },
  { slug: 'learn-courses', name: 'Online Courses',  category: 'learning', icon: '🎓' },
  { slug: 'learn-free',    name: 'Free University',  category: 'learning', icon: '🆓' },

  // Communities & Forums
  { slug: 'comm-forums',  name: 'Forums & Q&A',        category: 'communities', icon: '🗣️' },
  { slug: 'comm-makers',  name: 'Makers & Founders',   category: 'communities', icon: '🚀' },
  { slug: 'comm-dev',     name: 'Developer Circles',   category: 'communities', icon: '👩‍💻' },

  // Media & Assets
  { slug: 'media-photos',   name: 'Stock Photos',       category: 'media', icon: '📷' },
  { slug: 'media-icons',    name: 'Icons',              category: 'media', icon: '🔶' },
  { slug: 'media-graphics', name: 'Graphics & Vectors', category: 'media', icon: '🎨' },
  { slug: 'media-fonts',    name: 'Fonts',              category: 'media', icon: '🔤' },

  // No-Code & Automation
  { slug: 'nc-builders',   name: 'App & Site Builders', category: 'no-code', icon: '🏗️' },
  { slug: 'nc-automation', name: 'Automation',          category: 'no-code', icon: '🔗' },

  // Handy Utilities
  { slug: 'util-images', name: 'Image Tools', category: 'utilities', icon: '🗜️' },
  { slug: 'util-files',  name: 'Files & PDF', category: 'utilities', icon: '📁' },

  // Security & Privacy
  { slug: 'sec-vpn',       name: 'VPNs',              category: 'security', icon: '🛡️' },
  { slug: 'sec-passwords', name: 'Password Managers', category: 'security', icon: '🔑' },
  { slug: 'sec-antivirus', name: 'Antivirus & Malware', category: 'security', icon: '🦠' },

  // Web Hosting & Domains
  { slug: 'host-hosting',  name: 'Web Hosting',   category: 'hosting', icon: '🖥️' },
  { slug: 'host-domains',  name: 'Domains',       category: 'hosting', icon: '🏷️' },
  { slug: 'host-builders', name: 'Site Builders', category: 'hosting', icon: '🧱' },

  // Marketing & SEO
  { slug: 'mkt-seo',       name: 'SEO Tools',        category: 'marketing', icon: '🔍' },
  { slug: 'mkt-email',     name: 'Email Marketing',  category: 'marketing', icon: '📧' },
  { slug: 'mkt-social',    name: 'Social Media',     category: 'marketing', icon: '📱' },
  { slug: 'mkt-analytics', name: 'Analytics',        category: 'marketing', icon: '📈' },

  // Business & Finance
  { slug: 'fin-accounting', name: 'Accounting & Invoicing', category: 'finance', icon: '🧾' },
  { slug: 'fin-budgeting',  name: 'Budgeting',              category: 'finance', icon: '💰' },
  { slug: 'fin-fintech',    name: 'Banking & Fintech',      category: 'finance', icon: '🏦' },
  { slug: 'fin-investing',  name: 'Investing',              category: 'finance', icon: '📊' },

  // Shopping & Deals
  { slug: 'shop-marketplaces',   name: 'Marketplaces',   category: 'shopping', icon: '🏬' },
  { slug: 'shop-coupons',        name: 'Coupons & Deals', category: 'shopping', icon: '🎟️' },
  { slug: 'shop-software-deals', name: 'Software Deals',  category: 'shopping', icon: '💸' },
  { slug: 'shop-price',          name: 'Price Trackers',  category: 'shopping', icon: '🏷️' },

  // Video & Audio
  { slug: 'va-video-edit', name: 'Video Editing',    category: 'video-audio', icon: '✂️' },
  { slug: 'va-screen',     name: 'Screen Recording', category: 'video-audio', icon: '⏺️' },
  { slug: 'va-streaming',  name: 'Streaming',        category: 'video-audio', icon: '📡' },
  { slug: 'va-podcast',    name: 'Podcasting',       category: 'video-audio', icon: '🎙️' },

  // Writing & Publishing
  { slug: 'write-grammar',     name: 'Grammar & Style', category: 'writing', icon: '🖊️' },
  { slug: 'write-blogging',    name: 'Blogging',        category: 'writing', icon: '📓' },
  { slug: 'write-newsletters', name: 'Newsletters',     category: 'writing', icon: '📩' },
  { slug: 'write-ebooks',      name: 'eBooks',          category: 'writing', icon: '📕' },

  // Cloud Storage & Files
  { slug: 'store-cloud',   name: 'Cloud Storage', category: 'storage', icon: '☁️' },
  { slug: 'store-sharing', name: 'File Sharing',  category: 'storage', icon: '🔁' },
  { slug: 'store-backup',  name: 'Backup',        category: 'storage', icon: '💾' },

  // Freelance & Careers
  { slug: 'career-freelance', name: 'Freelance Marketplaces', category: 'careers', icon: '🤝' },
  { slug: 'career-jobs',      name: 'Remote Jobs',            category: 'careers', icon: '🌍' },
  { slug: 'career-resume',    name: 'Résumé & Portfolio',     category: 'careers', icon: '📄' },

  // Social & Networking
  { slug: 'social-platforms', name: 'Social Platforms', category: 'social', icon: '🌐' },
  { slug: 'social-bio',       name: 'Link-in-Bio',      category: 'social', icon: '🔗' },
  { slug: 'social-community', name: 'Community Tools',   category: 'social', icon: '👥' },

  // News & Reading
  { slug: 'news-news',      name: 'News',              category: 'news', icon: '🗞️' },
  { slug: 'news-rss',       name: 'RSS & Read-Later',  category: 'news', icon: '📥' },
  { slug: 'news-reference', name: 'Reference',         category: 'news', icon: '📚' },

  // Entertainment & Lifestyle
  { slug: 'ent-streaming', name: 'Streaming',         category: 'entertainment', icon: '🍿' },
  { slug: 'ent-watch',     name: 'What to Watch',     category: 'entertainment', icon: '🎞️' },
  { slug: 'ent-gaming',    name: 'Gaming',            category: 'entertainment', icon: '🎮' },
  { slug: 'ent-travel',    name: 'Travel',            category: 'entertainment', icon: '✈️' },
  { slug: 'ent-health',    name: 'Health & Fitness',  category: 'entertainment', icon: '💪' },

  // iOS Apps
  { slug: 'ios-productivity', name: 'Productivity',  category: 'ios-apps', icon: '⚡' },
  { slug: 'ios-photo-video',  name: 'Photo & Video', category: 'ios-apps', icon: '📸' },
  { slug: 'ios-games',        name: 'Games',         category: 'ios-apps', icon: '🎮' },
  { slug: 'ios-utilities',    name: 'Utilities',     category: 'ios-apps', icon: '🧰' },

  // Android Apps
  { slug: 'and-productivity', name: 'Productivity',  category: 'android-apps', icon: '⚡' },
  { slug: 'and-photo-video',  name: 'Photo & Video', category: 'android-apps', icon: '📸' },
  { slug: 'and-games',        name: 'Games',         category: 'android-apps', icon: '🎮' },
  { slug: 'and-utilities',    name: 'Utilities',     category: 'android-apps', icon: '🧰' },
];

// ---- Helpers ----
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const subcategoryBySlug = (slug: string) => subcategories.find((s) => s.slug === slug);
export const subcategoriesOf = (categorySlug: string) =>
  subcategories.filter((s) => s.category === categorySlug);
export const categoryOfSub = (subSlug: string) => {
  const sub = subcategoryBySlug(subSlug);
  return sub ? categoryBySlug(sub.category) : undefined;
};

export const allSubcategorySlugs = subcategories.map((s) => s.slug) as [string, ...string[]];
export const allCategorySlugs = categories.map((c) => c.slug) as [string, ...string[]];
export const totalCategories = categories.length;
