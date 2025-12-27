/**
 * Icon Library System
 *
 * Provides a unified icon system with support for multiple icon libraries.
 * Primary: Lucide Icons (MIT licensed, comprehensive)
 * Secondary: Heroicons (MIT licensed, Tailwind-friendly)
 */

export type IconLibrary = "lucide" | "heroicons" | "emoji";

export type IconCategory =
  | "navigation"
  | "action"
  | "social"
  | "communication"
  | "commerce"
  | "media"
  | "arrows"
  | "status"
  | "file"
  | "device"
  | "weather"
  | "misc";

export type IconStyle = "outline" | "solid" | "duotone";

export type IconDefinition = {
  id: string;
  name: string;
  category: IconCategory;
  keywords: string[];
  lucide?: string; // Lucide icon name
  heroicons?: string; // Heroicons icon name
  emoji?: string; // Fallback emoji
  aiHints: string[]; // For AI to select appropriate icons
};

// ============================================
// ICON DEFINITIONS
// ============================================

export const icons: IconDefinition[] = [
  // Navigation
  { id: "home", name: "Home", category: "navigation", keywords: ["home", "house", "main"], lucide: "Home", heroicons: "HomeIcon", emoji: "🏠", aiHints: ["homepage", "main page", "start"] },
  { id: "menu", name: "Menu", category: "navigation", keywords: ["menu", "hamburger", "nav"], lucide: "Menu", heroicons: "Bars3Icon", emoji: "☰", aiHints: ["navigation", "menu", "hamburger"] },
  { id: "search", name: "Search", category: "navigation", keywords: ["search", "find", "magnify"], lucide: "Search", heroicons: "MagnifyingGlassIcon", emoji: "🔍", aiHints: ["search", "find", "look"] },
  { id: "settings", name: "Settings", category: "navigation", keywords: ["settings", "gear", "cog"], lucide: "Settings", heroicons: "CogIcon", emoji: "⚙️", aiHints: ["settings", "configuration", "preferences"] },
  { id: "user", name: "User", category: "navigation", keywords: ["user", "person", "profile"], lucide: "User", heroicons: "UserIcon", emoji: "👤", aiHints: ["user", "profile", "account", "person"] },
  { id: "users", name: "Users", category: "navigation", keywords: ["users", "people", "team"], lucide: "Users", heroicons: "UsersIcon", emoji: "👥", aiHints: ["team", "group", "people", "members"] },

  // Action
  { id: "plus", name: "Plus", category: "action", keywords: ["plus", "add", "new"], lucide: "Plus", heroicons: "PlusIcon", emoji: "➕", aiHints: ["add", "create", "new"] },
  { id: "minus", name: "Minus", category: "action", keywords: ["minus", "remove", "subtract"], lucide: "Minus", heroicons: "MinusIcon", emoji: "➖", aiHints: ["remove", "subtract", "less"] },
  { id: "x", name: "Close", category: "action", keywords: ["close", "x", "cancel"], lucide: "X", heroicons: "XMarkIcon", emoji: "✕", aiHints: ["close", "cancel", "dismiss"] },
  { id: "check", name: "Check", category: "action", keywords: ["check", "done", "complete"], lucide: "Check", heroicons: "CheckIcon", emoji: "✓", aiHints: ["done", "complete", "success", "verified"] },
  { id: "edit", name: "Edit", category: "action", keywords: ["edit", "pencil", "write"], lucide: "Pencil", heroicons: "PencilIcon", emoji: "✏️", aiHints: ["edit", "modify", "change"] },
  { id: "trash", name: "Trash", category: "action", keywords: ["trash", "delete", "remove"], lucide: "Trash2", heroicons: "TrashIcon", emoji: "🗑️", aiHints: ["delete", "remove", "discard"] },
  { id: "download", name: "Download", category: "action", keywords: ["download", "save"], lucide: "Download", heroicons: "ArrowDownTrayIcon", emoji: "⬇️", aiHints: ["download", "save", "export"] },
  { id: "upload", name: "Upload", category: "action", keywords: ["upload", "send"], lucide: "Upload", heroicons: "ArrowUpTrayIcon", emoji: "⬆️", aiHints: ["upload", "send", "import"] },
  { id: "share", name: "Share", category: "action", keywords: ["share", "social"], lucide: "Share2", heroicons: "ShareIcon", emoji: "📤", aiHints: ["share", "social", "send"] },
  { id: "copy", name: "Copy", category: "action", keywords: ["copy", "duplicate"], lucide: "Copy", heroicons: "DocumentDuplicateIcon", emoji: "📋", aiHints: ["copy", "duplicate", "clone"] },
  { id: "refresh", name: "Refresh", category: "action", keywords: ["refresh", "reload", "sync"], lucide: "RefreshCw", heroicons: "ArrowPathIcon", emoji: "🔄", aiHints: ["refresh", "reload", "sync"] },

  // Social
  { id: "twitter", name: "Twitter/X", category: "social", keywords: ["twitter", "x", "tweet"], lucide: "Twitter", emoji: "𝕏", aiHints: ["twitter", "x", "social media", "tweet"] },
  { id: "facebook", name: "Facebook", category: "social", keywords: ["facebook", "fb"], lucide: "Facebook", emoji: "📘", aiHints: ["facebook", "social media", "fb"] },
  { id: "instagram", name: "Instagram", category: "social", keywords: ["instagram", "ig"], lucide: "Instagram", emoji: "📸", aiHints: ["instagram", "social media", "ig", "photos"] },
  { id: "linkedin", name: "LinkedIn", category: "social", keywords: ["linkedin", "professional"], lucide: "Linkedin", emoji: "💼", aiHints: ["linkedin", "professional", "networking", "jobs"] },
  { id: "youtube", name: "YouTube", category: "social", keywords: ["youtube", "video"], lucide: "Youtube", emoji: "▶️", aiHints: ["youtube", "video", "watch"] },
  { id: "github", name: "GitHub", category: "social", keywords: ["github", "code", "git"], lucide: "Github", emoji: "🐙", aiHints: ["github", "code", "repository", "open source"] },

  // Communication
  { id: "mail", name: "Email", category: "communication", keywords: ["mail", "email", "message"], lucide: "Mail", heroicons: "EnvelopeIcon", emoji: "✉️", aiHints: ["email", "contact", "message", "mail"] },
  { id: "phone", name: "Phone", category: "communication", keywords: ["phone", "call", "mobile"], lucide: "Phone", heroicons: "PhoneIcon", emoji: "📞", aiHints: ["phone", "call", "contact", "mobile"] },
  { id: "message", name: "Message", category: "communication", keywords: ["message", "chat", "sms"], lucide: "MessageCircle", heroicons: "ChatBubbleLeftIcon", emoji: "💬", aiHints: ["message", "chat", "conversation"] },
  { id: "video", name: "Video Call", category: "communication", keywords: ["video", "call", "meeting"], lucide: "Video", heroicons: "VideoCameraIcon", emoji: "📹", aiHints: ["video", "call", "meeting", "conference"] },

  // Commerce
  { id: "cart", name: "Shopping Cart", category: "commerce", keywords: ["cart", "shopping", "buy"], lucide: "ShoppingCart", heroicons: "ShoppingCartIcon", emoji: "🛒", aiHints: ["cart", "shopping", "buy", "purchase"] },
  { id: "bag", name: "Shopping Bag", category: "commerce", keywords: ["bag", "shopping", "store"], lucide: "ShoppingBag", heroicons: "ShoppingBagIcon", emoji: "🛍️", aiHints: ["bag", "shopping", "retail"] },
  { id: "credit-card", name: "Credit Card", category: "commerce", keywords: ["credit", "card", "payment"], lucide: "CreditCard", heroicons: "CreditCardIcon", emoji: "💳", aiHints: ["payment", "credit card", "checkout"] },
  { id: "dollar", name: "Dollar", category: "commerce", keywords: ["dollar", "money", "currency"], lucide: "DollarSign", heroicons: "CurrencyDollarIcon", emoji: "💵", aiHints: ["money", "price", "cost", "pricing"] },
  { id: "tag", name: "Price Tag", category: "commerce", keywords: ["tag", "price", "sale"], lucide: "Tag", heroicons: "TagIcon", emoji: "🏷️", aiHints: ["price", "sale", "discount", "tag"] },
  { id: "gift", name: "Gift", category: "commerce", keywords: ["gift", "present", "reward"], lucide: "Gift", heroicons: "GiftIcon", emoji: "🎁", aiHints: ["gift", "present", "reward", "offer"] },

  // Media
  { id: "image", name: "Image", category: "media", keywords: ["image", "photo", "picture"], lucide: "Image", heroicons: "PhotoIcon", emoji: "🖼️", aiHints: ["image", "photo", "picture", "gallery"] },
  { id: "camera", name: "Camera", category: "media", keywords: ["camera", "photo"], lucide: "Camera", heroicons: "CameraIcon", emoji: "📷", aiHints: ["camera", "photo", "photography"] },
  { id: "play", name: "Play", category: "media", keywords: ["play", "video", "start"], lucide: "Play", heroicons: "PlayIcon", emoji: "▶️", aiHints: ["play", "video", "start", "watch"] },
  { id: "pause", name: "Pause", category: "media", keywords: ["pause", "stop"], lucide: "Pause", heroicons: "PauseIcon", emoji: "⏸️", aiHints: ["pause", "stop", "hold"] },
  { id: "music", name: "Music", category: "media", keywords: ["music", "audio", "sound"], lucide: "Music", heroicons: "MusicalNoteIcon", emoji: "🎵", aiHints: ["music", "audio", "sound", "podcast"] },
  { id: "mic", name: "Microphone", category: "media", keywords: ["mic", "audio", "record"], lucide: "Mic", heroicons: "MicrophoneIcon", emoji: "🎤", aiHints: ["microphone", "audio", "record", "podcast"] },

  // Arrows
  { id: "arrow-right", name: "Arrow Right", category: "arrows", keywords: ["arrow", "right", "next"], lucide: "ArrowRight", heroicons: "ArrowRightIcon", emoji: "→", aiHints: ["next", "continue", "forward"] },
  { id: "arrow-left", name: "Arrow Left", category: "arrows", keywords: ["arrow", "left", "back"], lucide: "ArrowLeft", heroicons: "ArrowLeftIcon", emoji: "←", aiHints: ["back", "previous", "return"] },
  { id: "arrow-up", name: "Arrow Up", category: "arrows", keywords: ["arrow", "up"], lucide: "ArrowUp", heroicons: "ArrowUpIcon", emoji: "↑", aiHints: ["up", "increase", "rise"] },
  { id: "arrow-down", name: "Arrow Down", category: "arrows", keywords: ["arrow", "down"], lucide: "ArrowDown", heroicons: "ArrowDownIcon", emoji: "↓", aiHints: ["down", "decrease", "drop"] },
  { id: "chevron-right", name: "Chevron Right", category: "arrows", keywords: ["chevron", "right"], lucide: "ChevronRight", heroicons: "ChevronRightIcon", emoji: "›", aiHints: ["expand", "more", "details"] },
  { id: "chevron-down", name: "Chevron Down", category: "arrows", keywords: ["chevron", "down"], lucide: "ChevronDown", heroicons: "ChevronDownIcon", emoji: "˅", aiHints: ["expand", "dropdown", "more"] },
  { id: "external-link", name: "External Link", category: "arrows", keywords: ["external", "link", "new tab"], lucide: "ExternalLink", heroicons: "ArrowTopRightOnSquareIcon", emoji: "↗", aiHints: ["external", "new tab", "open"] },

  // Status
  { id: "check-circle", name: "Check Circle", category: "status", keywords: ["check", "success", "done"], lucide: "CheckCircle", heroicons: "CheckCircleIcon", emoji: "✅", aiHints: ["success", "verified", "approved", "done"] },
  { id: "x-circle", name: "X Circle", category: "status", keywords: ["x", "error", "cancel"], lucide: "XCircle", heroicons: "XCircleIcon", emoji: "❌", aiHints: ["error", "failed", "cancel", "wrong"] },
  { id: "alert", name: "Alert", category: "status", keywords: ["alert", "warning", "caution"], lucide: "AlertTriangle", heroicons: "ExclamationTriangleIcon", emoji: "⚠️", aiHints: ["warning", "caution", "alert"] },
  { id: "info", name: "Info", category: "status", keywords: ["info", "information", "help"], lucide: "Info", heroicons: "InformationCircleIcon", emoji: "ℹ️", aiHints: ["information", "help", "details"] },
  { id: "question", name: "Question", category: "status", keywords: ["question", "help", "faq"], lucide: "HelpCircle", heroicons: "QuestionMarkCircleIcon", emoji: "❓", aiHints: ["question", "help", "faq", "support"] },
  { id: "star", name: "Star", category: "status", keywords: ["star", "rating", "favorite"], lucide: "Star", heroicons: "StarIcon", emoji: "⭐", aiHints: ["rating", "favorite", "featured", "best"] },
  { id: "heart", name: "Heart", category: "status", keywords: ["heart", "love", "like"], lucide: "Heart", heroicons: "HeartIcon", emoji: "❤️", aiHints: ["love", "like", "favorite", "health"] },
  { id: "clock", name: "Clock", category: "status", keywords: ["clock", "time", "schedule"], lucide: "Clock", heroicons: "ClockIcon", emoji: "🕐", aiHints: ["time", "schedule", "hours", "duration"] },

  // Features/Business
  { id: "lightning", name: "Lightning", category: "misc", keywords: ["lightning", "fast", "quick"], lucide: "Zap", heroicons: "BoltIcon", emoji: "⚡", aiHints: ["fast", "speed", "performance", "quick"] },
  { id: "shield", name: "Shield", category: "misc", keywords: ["shield", "security", "safe"], lucide: "Shield", heroicons: "ShieldCheckIcon", emoji: "🛡️", aiHints: ["security", "safe", "protection", "trust"] },
  { id: "lock", name: "Lock", category: "misc", keywords: ["lock", "secure", "private"], lucide: "Lock", heroicons: "LockClosedIcon", emoji: "🔒", aiHints: ["security", "privacy", "protected", "secure"] },
  { id: "globe", name: "Globe", category: "misc", keywords: ["globe", "world", "international"], lucide: "Globe", heroicons: "GlobeAltIcon", emoji: "🌐", aiHints: ["global", "worldwide", "international", "web"] },
  { id: "map-pin", name: "Location", category: "misc", keywords: ["location", "map", "pin"], lucide: "MapPin", heroicons: "MapPinIcon", emoji: "📍", aiHints: ["location", "address", "place", "map"] },
  { id: "calendar", name: "Calendar", category: "misc", keywords: ["calendar", "date", "schedule"], lucide: "Calendar", heroicons: "CalendarIcon", emoji: "📅", aiHints: ["calendar", "date", "schedule", "booking"] },
  { id: "chart", name: "Chart", category: "misc", keywords: ["chart", "graph", "analytics"], lucide: "BarChart2", heroicons: "ChartBarIcon", emoji: "📊", aiHints: ["analytics", "statistics", "data", "growth"] },
  { id: "rocket", name: "Rocket", category: "misc", keywords: ["rocket", "launch", "fast"], lucide: "Rocket", heroicons: "RocketLaunchIcon", emoji: "🚀", aiHints: ["launch", "startup", "growth", "fast"] },
  { id: "sparkles", name: "Sparkles", category: "misc", keywords: ["sparkles", "magic", "ai"], lucide: "Sparkles", heroicons: "SparklesIcon", emoji: "✨", aiHints: ["ai", "magic", "new", "special", "featured"] },
  { id: "target", name: "Target", category: "misc", keywords: ["target", "goal", "aim"], lucide: "Target", heroicons: "FlagIcon", emoji: "🎯", aiHints: ["goal", "target", "objective", "mission"] },
  { id: "award", name: "Award", category: "misc", keywords: ["award", "prize", "achievement"], lucide: "Award", heroicons: "TrophyIcon", emoji: "🏆", aiHints: ["award", "achievement", "recognition", "best"] },
  { id: "bookmark", name: "Bookmark", category: "misc", keywords: ["bookmark", "save", "favorite"], lucide: "Bookmark", heroicons: "BookmarkIcon", emoji: "🔖", aiHints: ["save", "bookmark", "favorite", "remember"] },
  { id: "layers", name: "Layers", category: "misc", keywords: ["layers", "stack", "features"], lucide: "Layers", heroicons: "Square3Stack3DIcon", emoji: "📚", aiHints: ["features", "stack", "layers", "options"] },
  { id: "puzzle", name: "Puzzle", category: "misc", keywords: ["puzzle", "integration", "plugin"], lucide: "Puzzle", heroicons: "PuzzlePieceIcon", emoji: "🧩", aiHints: ["integration", "plugin", "connect", "addon"] },
  { id: "cpu", name: "CPU", category: "device", keywords: ["cpu", "processor", "tech"], lucide: "Cpu", heroicons: "CpuChipIcon", emoji: "🖥️", aiHints: ["technology", "processing", "computing", "performance"] },
  { id: "cloud", name: "Cloud", category: "device", keywords: ["cloud", "storage", "sync"], lucide: "Cloud", heroicons: "CloudIcon", emoji: "☁️", aiHints: ["cloud", "storage", "sync", "online"] },
  { id: "code", name: "Code", category: "device", keywords: ["code", "programming", "developer"], lucide: "Code", heroicons: "CodeBracketIcon", emoji: "💻", aiHints: ["code", "developer", "programming", "api"] },
];

// ============================================
// ICON REGISTRY & UTILITIES
// ============================================

export const iconRegistry = new Map<string, IconDefinition>(
  icons.map((icon) => [icon.id, icon])
);

/**
 * Get icon by ID
 */
export function getIcon(id: string): IconDefinition | undefined {
  return iconRegistry.get(id);
}

/**
 * Get icons by category
 */
export function getIconsByCategory(category: IconCategory): IconDefinition[] {
  return icons.filter((icon) => icon.category === category);
}

/**
 * Search icons by keyword
 */
export function searchIcons(query: string): IconDefinition[] {
  const queryLower = query.toLowerCase();
  return icons.filter((icon) =>
    icon.name.toLowerCase().includes(queryLower) ||
    icon.keywords.some((k) => k.includes(queryLower)) ||
    icon.aiHints.some((h) => h.includes(queryLower))
  );
}

/**
 * Get icon recommendations for a concept (for AI use)
 */
export function getIconsForConcept(concept: string): IconDefinition[] {
  const conceptLower = concept.toLowerCase();

  const scored = icons.map((icon) => {
    let score = 0;

    // Check name match
    if (icon.name.toLowerCase().includes(conceptLower)) score += 10;

    // Check keywords
    icon.keywords.forEach((kw) => {
      if (kw.includes(conceptLower) || conceptLower.includes(kw)) score += 5;
    });

    // Check AI hints
    icon.aiHints.forEach((hint) => {
      if (hint.includes(conceptLower) || conceptLower.includes(hint)) score += 8;
    });

    return { icon, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.icon)
    .slice(0, 5);
}

/**
 * Get emoji fallback for an icon
 */
export function getIconEmoji(id: string): string {
  const icon = iconRegistry.get(id);
  return icon?.emoji || "•";
}

/**
 * Get all icon categories with counts
 */
export function getIconCategories(): { category: IconCategory; count: number }[] {
  const categories = new Map<IconCategory, number>();

  icons.forEach((icon) => {
    categories.set(icon.category, (categories.get(icon.category) || 0) + 1);
  });

  return Array.from(categories.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

// ============================================
// ICON SETS FOR SPECIFIC USE CASES
// ============================================

export type IconSet = {
  id: string;
  name: string;
  description: string;
  icons: string[]; // Icon IDs
};

export const iconSets: IconSet[] = [
  {
    id: "features",
    name: "Features",
    description: "Common icons for feature sections",
    icons: ["lightning", "shield", "sparkles", "rocket", "target", "chart", "layers", "puzzle"],
  },
  {
    id: "social",
    name: "Social Media",
    description: "Social media platform icons",
    icons: ["twitter", "facebook", "instagram", "linkedin", "youtube", "github"],
  },
  {
    id: "contact",
    name: "Contact",
    description: "Contact and communication icons",
    icons: ["mail", "phone", "message", "map-pin", "globe", "video"],
  },
  {
    id: "commerce",
    name: "E-commerce",
    description: "Shopping and commerce icons",
    icons: ["cart", "bag", "credit-card", "dollar", "tag", "gift"],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "UI navigation icons",
    icons: ["menu", "search", "home", "user", "settings", "arrow-right", "chevron-down"],
  },
  {
    id: "status",
    name: "Status",
    description: "Status and feedback icons",
    icons: ["check-circle", "x-circle", "alert", "info", "star", "heart"],
  },
];

/**
 * Get icon set by ID
 */
export function getIconSet(id: string): IconSet | undefined {
  return iconSets.find((set) => set.id === id);
}

/**
 * Get icons from a set
 */
export function getIconsFromSet(setId: string): IconDefinition[] {
  const set = getIconSet(setId);
  if (!set) return [];

  return set.icons
    .map((id) => iconRegistry.get(id))
    .filter((icon): icon is IconDefinition => icon !== undefined);
}
