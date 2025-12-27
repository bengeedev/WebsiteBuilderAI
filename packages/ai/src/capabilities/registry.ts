/**
 * AI Capabilities Registry
 *
 * Central source of truth for ALL AI capabilities.
 * The AI uses this registry to know what it can do.
 */

import type {
  Capability,
  CapabilityCategory,
  CapabilityGroup,
  CapabilityMatch,
  CapabilityStatus,
  UserContext,
} from "./types";

/**
 * All available AI capabilities
 */
export const capabilities: Capability[] = [
  // ============================================
  // CONTENT CAPABILITIES
  // ============================================
  {
    id: "add_section",
    name: "Add Section",
    description:
      "Add a new section to the website (hero, features, testimonials, about, services, pricing, contact, FAQ, gallery, team, blog, newsletter, CTA)",
    category: "content",
    status: "active",
    triggers: [
      "add",
      "new section",
      "insert",
      "create section",
      "testimonials",
      "features",
      "about",
      "services",
      "pricing",
      "contact",
      "faq",
      "gallery",
      "team",
      "blog",
    ],
    toolName: "add_section",
    examples: [
      "Add a testimonials section",
      "I need a pricing table",
      "Create an about us section",
      "Add a contact form",
    ],
    priority: 10,
  },
  {
    id: "edit_section",
    name: "Edit Section",
    description: "Modify existing section content including title, subtitle, text, and items",
    category: "content",
    status: "active",
    triggers: [
      "edit",
      "change",
      "update",
      "modify",
      "fix",
      "rewrite",
      "change title",
      "update text",
    ],
    toolName: "edit_section",
    examples: [
      "Change the hero title",
      "Update the about section text",
      "Edit the testimonial quotes",
      "Fix the pricing description",
    ],
    priority: 10,
  },
  {
    id: "remove_section",
    name: "Remove Section",
    description: "Delete a section from the website",
    category: "content",
    status: "active",
    triggers: ["remove", "delete", "hide", "get rid of", "take out"],
    toolName: "remove_section",
    examples: [
      "Remove the testimonials section",
      "Delete the pricing table",
      "Hide the blog section",
    ],
    priority: 10,
  },
  {
    id: "reorder_sections",
    name: "Reorder Sections",
    description: "Change the order of sections on the page",
    category: "content",
    status: "active",
    triggers: ["move", "reorder", "rearrange", "swap", "order", "put before", "put after"],
    toolName: "reorder_sections",
    examples: [
      "Move testimonials above pricing",
      "Put the contact section at the end",
      "Swap features and services",
    ],
    priority: 8,
  },

  // ============================================
  // DESIGN CAPABILITIES
  // ============================================
  {
    id: "update_colors",
    name: "Change Colors",
    description: "Update brand colors including primary, secondary, and accent colors",
    category: "design",
    status: "active",
    triggers: [
      "color",
      "colors",
      "palette",
      "brand color",
      "make it blue",
      "make it red",
      "change color",
      "theme",
    ],
    toolName: "update_colors",
    examples: [
      "Make the primary color blue",
      "Change the color scheme to green",
      "I want a warmer color palette",
      "Use #3b82f6 as the primary color",
    ],
    priority: 10,
  },
  {
    id: "update_fonts",
    name: "Change Typography",
    description: "Update heading and body font families",
    category: "design",
    status: "active",
    triggers: ["font", "fonts", "typography", "text style", "heading font", "body font"],
    toolName: "update_fonts",
    examples: [
      "Use Playfair Display for headings",
      "Change to a more modern font",
      "Make the fonts more elegant",
    ],
    priority: 10,
  },
  {
    id: "change_layout",
    name: "Change Section Layout",
    description: "Switch between different layout variants for a section",
    category: "design",
    status: "active",
    triggers: ["layout", "style", "variant", "look different", "different design", "format"],
    toolName: "change_layout",
    examples: [
      "Change the hero to a split layout",
      "Use a grid layout for features",
      "Make the testimonials a carousel",
    ],
    priority: 8,
  },

  // ============================================
  // MEDIA CAPABILITIES
  // ============================================
  {
    id: "generate_image",
    name: "Generate Image with AI",
    description: "Create custom images using DALL-E 3 AI image generation",
    category: "media",
    status: "active",
    triggers: [
      "generate image",
      "create image",
      "ai image",
      "picture of",
      "make an image",
      "illustration",
    ],
    toolName: "generate_image",
    requirements: { plan: "pro" },
    examples: [
      "Generate a hero image of a modern office",
      "Create an illustration for the about section",
      "Make an image showing our services",
    ],
    priority: 10,
  },
  {
    id: "generate_logo",
    name: "Generate Logo with AI",
    description: "Create logo variations using AI",
    category: "media",
    status: "active",
    triggers: ["logo", "brand mark", "create logo", "generate logo", "company logo"],
    toolName: "generate_logo",
    examples: [
      "Generate a minimalist logo",
      "Create a logo for my bakery",
      "Design a modern tech logo",
    ],
    priority: 10,
  },
  {
    id: "generate_video",
    name: "Generate Video with AI",
    description: "Create short videos using Runway ML for backgrounds and content",
    category: "media",
    status: "beta",
    triggers: ["video", "animation", "motion", "moving background", "generate video"],
    toolName: "generate_video",
    requirements: { plan: "enterprise" },
    examples: [
      "Create a video background for the hero",
      "Generate an animated intro",
      "Make a motion graphic",
    ],
    priority: 10,
  },
  {
    id: "upload_asset",
    name: "Upload Image/Asset",
    description: "Upload your own images, logos, or files to use on the website",
    category: "media",
    status: "active",
    triggers: ["upload", "my image", "add image", "my photo", "import"],
    uiComponent: "AssetUploader",
    examples: [
      "Upload my company logo",
      "Add my product photos",
      "Import images from my computer",
    ],
    priority: 8,
  },
  {
    id: "suggest_images",
    name: "Suggest Images",
    description: "Get AI suggestions for images that would work well in a section",
    category: "media",
    status: "active",
    triggers: ["suggest images", "image ideas", "what images", "recommend photos"],
    toolName: "suggest_images",
    examples: [
      "Suggest images for the hero section",
      "What images would work for testimonials?",
    ],
    priority: 6,
  },

  // ============================================
  // STRUCTURE CAPABILITIES
  // ============================================
  {
    id: "update_navigation",
    name: "Update Navigation",
    description: "Modify the website navigation menu items and style",
    category: "structure",
    status: "active",
    triggers: ["navigation", "menu", "nav", "links", "menu items"],
    toolName: "update_navigation",
    examples: [
      "Add a link to the menu",
      "Remove the blog from navigation",
      "Change the navigation style",
    ],
    priority: 8,
  },
  {
    id: "add_page",
    name: "Add Page",
    description: "Create a new page on the website",
    category: "structure",
    status: "coming_soon",
    triggers: ["new page", "add page", "create page", "another page"],
    examples: ["Add an about page", "Create a services page", "I need a contact page"],
    priority: 8,
  },

  // ============================================
  // SEO CAPABILITIES
  // ============================================
  {
    id: "update_seo",
    name: "Update SEO",
    description: "Change page title, meta description, and keywords for search engines",
    category: "seo",
    status: "active",
    triggers: [
      "seo",
      "meta",
      "title",
      "description",
      "google",
      "search engine",
      "page title",
    ],
    toolName: "update_seo",
    examples: [
      "Update the page title",
      "Change the meta description",
      "Optimize for SEO",
      "Add keywords",
    ],
    priority: 10,
  },
  {
    id: "analyze_seo",
    name: "Analyze SEO",
    description: "Get SEO recommendations and score for the website",
    category: "seo",
    status: "active",
    triggers: ["analyze seo", "seo score", "improve seo", "seo audit", "check seo"],
    toolName: "analyze_seo",
    examples: [
      "Analyze my SEO",
      "How is my SEO?",
      "What can I do to improve search ranking?",
    ],
    priority: 8,
  },

  // ============================================
  // PUBLISHING CAPABILITIES
  // ============================================
  {
    id: "publish_site",
    name: "Publish Website",
    description: "Make the website live on a subdomain",
    category: "publishing",
    status: "active",
    triggers: ["publish", "go live", "launch", "make live", "deploy"],
    toolName: "publish_site",
    examples: [
      "Publish my website",
      "Go live",
      "Launch the site",
      "Make my site public",
    ],
    priority: 10,
  },
  {
    id: "connect_domain",
    name: "Connect Custom Domain",
    description: "Use your own domain name for the website",
    category: "publishing",
    status: "coming_soon",
    triggers: ["domain", "custom domain", "my domain", "connect domain"],
    requirements: { plan: "pro" },
    examples: [
      "Connect my domain",
      "Use mycompany.com",
      "Set up a custom domain",
    ],
    priority: 8,
  },
  {
    id: "preview_site",
    name: "Preview Website",
    description: "View a preview of the website before publishing",
    category: "publishing",
    status: "active",
    triggers: ["preview", "show me", "view site", "see how it looks"],
    uiComponent: "SitePreview",
    examples: [
      "Show me a preview",
      "Let me see how it looks",
      "Preview the website",
    ],
    priority: 6,
  },

  // ============================================
  // AI GENERATION CAPABILITIES
  // ============================================
  {
    id: "generate_content",
    name: "Generate Content",
    description: "AI writes copy for any section including titles, descriptions, and items",
    category: "ai_generate",
    status: "active",
    triggers: [
      "write",
      "generate text",
      "create content",
      "write copy",
      "content for",
      "text for",
    ],
    toolName: "generate_content",
    examples: [
      "Write content for the about section",
      "Generate testimonials",
      "Create FAQ content",
      "Write a compelling hero headline",
    ],
    priority: 10,
  },
  {
    id: "improve_content",
    name: "Improve Content",
    description: "AI enhances and rewrites existing text to be more compelling",
    category: "ai_generate",
    status: "active",
    triggers: ["improve", "rewrite", "make better", "enhance", "polish", "refine"],
    toolName: "improve_content",
    examples: [
      "Improve the hero text",
      "Make the about section more compelling",
      "Rewrite the services descriptions",
    ],
    priority: 8,
  },
  {
    id: "translate_content",
    name: "Translate Content",
    description: "Translate website content to another language",
    category: "ai_generate",
    status: "coming_soon",
    triggers: ["translate", "language", "spanish", "french", "german", "multilingual"],
    examples: [
      "Translate to Spanish",
      "Make a French version",
      "Add multilingual support",
    ],
    priority: 6,
  },

  // ============================================
  // INTEGRATIONS CAPABILITIES
  // ============================================
  {
    id: "add_form",
    name: "Add Contact Form",
    description: "Add a contact or lead capture form",
    category: "integrations",
    status: "active",
    triggers: ["form", "contact form", "lead form", "subscribe form", "email form"],
    toolName: "add_form",
    examples: [
      "Add a contact form",
      "Create a newsletter signup",
      "Add a lead capture form",
    ],
    priority: 8,
  },
  {
    id: "add_analytics",
    name: "Add Analytics",
    description: "Connect Google Analytics or other tracking",
    category: "integrations",
    status: "coming_soon",
    triggers: ["analytics", "tracking", "google analytics", "statistics", "visitors"],
    examples: [
      "Add Google Analytics",
      "Track visitors",
      "Set up analytics",
    ],
    priority: 6,
  },

  // ============================================
  // INFORMATION RETRIEVAL
  // ============================================
  {
    id: "get_site_info",
    name: "Get Site Information",
    description: "Get information about the current website state",
    category: "content",
    status: "active",
    triggers: [
      "what sections",
      "show me",
      "current state",
      "what do I have",
      "list sections",
    ],
    toolName: "get_site_info",
    examples: [
      "What sections do I have?",
      "Show me the current site structure",
      "List all sections",
    ],
    priority: 4,
  },
];

/**
 * Capability groups for UI organization
 */
export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "content",
    name: "Content",
    description: "Add, edit, and organize your website content",
    categories: ["content"],
    icon: "file-text",
  },
  {
    id: "design",
    name: "Design",
    description: "Customize colors, fonts, and layouts",
    categories: ["design"],
    icon: "palette",
  },
  {
    id: "media",
    name: "Media",
    description: "Add images, videos, and other media",
    categories: ["media"],
    icon: "image",
  },
  {
    id: "seo",
    name: "SEO",
    description: "Optimize for search engines",
    categories: ["seo"],
    icon: "search",
  },
  {
    id: "ai",
    name: "AI Tools",
    description: "AI-powered content and image generation",
    categories: ["ai_generate"],
    icon: "sparkles",
  },
  {
    id: "publishing",
    name: "Publishing",
    description: "Preview and publish your website",
    categories: ["publishing"],
    icon: "globe",
  },
];

/**
 * Get a capability by ID
 */
export function getCapability(id: string): Capability | undefined {
  return capabilities.find((c) => c.id === id);
}

/**
 * Get capabilities by category
 */
export function getCapabilitiesByCategory(category: CapabilityCategory): Capability[] {
  return capabilities.filter((c) => c.category === category);
}

/**
 * Get capabilities by status
 */
export function getCapabilitiesByStatus(status: CapabilityStatus): Capability[] {
  return capabilities.filter((c) => c.status === status);
}

/**
 * Get all active capabilities
 */
export function getActiveCapabilities(): Capability[] {
  return capabilities.filter((c) => c.status === "active" || c.status === "beta");
}

/**
 * Filter capabilities based on user context (plan, integrations, etc.)
 */
export function getAvailableCapabilities(userContext: UserContext): Capability[] {
  return getActiveCapabilities().filter((capability) => {
    if (!capability.requirements) return true;

    const { plan, assets, integrations, featureFlags } = capability.requirements;

    // Check plan requirement
    if (plan) {
      const planHierarchy: Record<string, number> = { free: 0, pro: 1, enterprise: 2 };
      if (planHierarchy[userContext.plan] < planHierarchy[plan]) {
        return false;
      }
    }

    // Check asset requirements
    if (assets && assets.length > 0) {
      if (!assets.every((a) => userContext.availableAssets.includes(a))) {
        return false;
      }
    }

    // Check integration requirements
    if (integrations && integrations.length > 0) {
      if (!integrations.every((i) => userContext.connectedIntegrations.includes(i))) {
        return false;
      }
    }

    // Check feature flags
    if (featureFlags && featureFlags.length > 0) {
      if (!featureFlags.every((f) => userContext.enabledFeatureFlags.includes(f))) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Match user input to relevant capabilities
 */
export function matchCapabilities(
  userInput: string,
  availableCapabilities: Capability[]
): CapabilityMatch[] {
  const input = userInput.toLowerCase();
  const matches: CapabilityMatch[] = [];

  for (const capability of availableCapabilities) {
    const matchedTriggers: string[] = [];
    let confidence = 0;

    for (const trigger of capability.triggers) {
      if (input.includes(trigger.toLowerCase())) {
        matchedTriggers.push(trigger);
        // Longer triggers are more specific, so higher confidence
        confidence += trigger.length / 10;
      }
    }

    if (matchedTriggers.length > 0) {
      // Add priority bonus
      confidence += (capability.priority || 5) / 10;
      // Normalize confidence to 0-1 range
      confidence = Math.min(confidence / 3, 1);

      matches.push({
        capability,
        confidence,
        matchedTriggers,
      });
    }
  }

  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Get the tool name for a capability
 */
export function getCapabilityToolName(capabilityId: string): string | undefined {
  return getCapability(capabilityId)?.toolName;
}

/**
 * Check if a capability requires a UI component
 */
export function capabilityRequiresUI(capabilityId: string): boolean {
  const capability = getCapability(capabilityId);
  return capability?.uiComponent !== undefined;
}
