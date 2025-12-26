import type { Tool } from "../types";

/**
 * Tools that the AI can use to modify the website
 * These are passed to the AI and it can "call" them to make changes
 */

export const siteTools: Tool[] = [
  // Section Management
  {
    name: "add_section",
    description: "Add a new section to the website. Use this when the user wants to add content like testimonials, features, team members, etc.",
    parameters: {
      section_type: {
        type: "string",
        description: "The type of section to add",
        enum: [
          "hero",
          "about",
          "features",
          "services",
          "testimonials",
          "team",
          "pricing",
          "contact",
          "cta",
          "gallery",
          "faq",
          "blog",
          "newsletter",
        ],
      },
      position: {
        type: "string",
        description: "Where to place the section",
        enum: ["start", "end", "after_hero", "before_contact"],
      },
      content: {
        type: "object",
        description: "The content for the section",
        properties: {
          title: { type: "string", description: "Section title" },
          subtitle: { type: "string", description: "Section subtitle" },
          items: {
            type: "array",
            description: "Items for the section (testimonials, features, etc.)",
          },
        },
      },
    },
    requiredParams: ["section_type"],
  },

  {
    name: "remove_section",
    description: "Remove a section from the website",
    parameters: {
      section_id: {
        type: "string",
        description: "The ID of the section to remove",
      },
      section_type: {
        type: "string",
        description: "The type of section to remove (if ID not known)",
      },
    },
    requiredParams: [],
  },

  {
    name: "edit_section",
    description: "Edit an existing section's content or styling",
    parameters: {
      section_id: {
        type: "string",
        description: "The ID of the section to edit",
      },
      section_type: {
        type: "string",
        description: "The type of section to edit (if ID not known)",
      },
      updates: {
        type: "object",
        description: "The updates to apply",
        properties: {
          title: { type: "string", description: "New title" },
          subtitle: { type: "string", description: "New subtitle" },
          content: { type: "string", description: "New content text" },
          items: { type: "array", description: "New items array" },
        },
      },
    },
    requiredParams: ["updates"],
  },

  {
    name: "reorder_sections",
    description: "Change the order of sections on the page",
    parameters: {
      section_order: {
        type: "array",
        description: "Array of section IDs in the new order",
      },
    },
    requiredParams: ["section_order"],
  },

  // Style Changes
  {
    name: "update_colors",
    description: "Change the website's color scheme",
    parameters: {
      primary_color: {
        type: "string",
        description: "Primary brand color (hex code)",
      },
      secondary_color: {
        type: "string",
        description: "Secondary color (hex code)",
      },
      accent_color: {
        type: "string",
        description: "Accent color for highlights (hex code)",
      },
    },
    requiredParams: [],
  },

  {
    name: "update_fonts",
    description: "Change the website's typography",
    parameters: {
      heading_font: {
        type: "string",
        description: "Font family for headings",
      },
      body_font: {
        type: "string",
        description: "Font family for body text",
      },
    },
    requiredParams: [],
  },

  // Content Generation
  {
    name: "generate_content",
    description: "Generate new content for a section using AI",
    parameters: {
      section_id: {
        type: "string",
        description: "The section to generate content for",
      },
      content_type: {
        type: "string",
        description: "Type of content to generate",
        enum: ["testimonials", "features", "team_bios", "faq", "blog_post"],
      },
      instructions: {
        type: "string",
        description: "Specific instructions for content generation",
      },
      count: {
        type: "number",
        description: "Number of items to generate",
      },
    },
    requiredParams: ["content_type"],
  },

  // SEO
  {
    name: "update_seo",
    description: "Update SEO meta tags and settings",
    parameters: {
      page_title: {
        type: "string",
        description: "Page title for browser tab and search results",
      },
      meta_description: {
        type: "string",
        description: "Meta description for search results",
      },
      keywords: {
        type: "array",
        description: "Target keywords",
      },
    },
    requiredParams: [],
  },

  {
    name: "analyze_seo",
    description: "Analyze the current SEO and provide recommendations",
    parameters: {
      focus_keyword: {
        type: "string",
        description: "The main keyword to optimize for",
      },
    },
    requiredParams: [],
  },

  // Images
  {
    name: "suggest_images",
    description: "Suggest images for a section based on the content",
    parameters: {
      section_id: {
        type: "string",
        description: "The section to suggest images for",
      },
      style: {
        type: "string",
        description: "Image style preference",
        enum: ["photo", "illustration", "minimal", "vibrant"],
      },
    },
    requiredParams: ["section_id"],
  },

  // Navigation
  {
    name: "update_navigation",
    description: "Update the website navigation menu",
    parameters: {
      items: {
        type: "array",
        description: "Navigation menu items",
      },
      style: {
        type: "string",
        description: "Navigation style",
        enum: ["minimal", "centered", "full"],
      },
    },
    requiredParams: [],
  },

  // Information Retrieval (no changes, just info)
  {
    name: "get_site_info",
    description: "Get information about the current website state",
    parameters: {
      include: {
        type: "array",
        description: "What information to include",
      },
    },
    requiredParams: [],
  },
];

export const blogTools: Tool[] = [
  {
    name: "create_blog_post",
    description: "Create a new blog post",
    parameters: {
      title: {
        type: "string",
        description: "Blog post title",
      },
      topic: {
        type: "string",
        description: "Topic or subject of the post",
      },
      tone: {
        type: "string",
        description: "Writing tone",
        enum: ["professional", "casual", "friendly", "authoritative"],
      },
      length: {
        type: "string",
        description: "Desired length",
        enum: ["short", "medium", "long"],
      },
    },
    requiredParams: ["title"],
  },

  {
    name: "edit_blog_post",
    description: "Edit an existing blog post",
    parameters: {
      post_id: {
        type: "string",
        description: "ID of the post to edit",
      },
      updates: {
        type: "object",
        description: "Updates to apply",
      },
    },
    requiredParams: ["post_id", "updates"],
  },
];

export const socialTools: Tool[] = [
  {
    name: "generate_social_post",
    description: "Generate a social media post",
    parameters: {
      platform: {
        type: "string",
        description: "Target social platform",
        enum: ["instagram", "twitter", "facebook", "linkedin"],
      },
      topic: {
        type: "string",
        description: "Topic of the post",
      },
      include_hashtags: {
        type: "boolean",
        description: "Whether to include hashtags",
      },
    },
    requiredParams: ["platform"],
  },

  {
    name: "schedule_post",
    description: "Schedule a social media post",
    parameters: {
      platform: {
        type: "string",
        description: "Target platform",
      },
      content: {
        type: "string",
        description: "Post content",
      },
      schedule_time: {
        type: "string",
        description: "When to post (ISO datetime)",
      },
    },
    requiredParams: ["platform", "content", "schedule_time"],
  },
];

// Export all tools combined
export const allTools = [...siteTools, ...blogTools, ...socialTools];
