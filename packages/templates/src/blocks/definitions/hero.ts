/**
 * Hero Block Definition
 *
 * The main banner section at the top of a page.
 * Supports centered, split, and video background variants.
 */

import type { BlockType } from "../types";

export const heroBlock: BlockType = {
  id: "hero",
  name: "Hero Section",
  category: "content",
  description: "Main banner section with headline, description, and call-to-action buttons. Perfect for grabbing attention at the top of your page.",
  icon: "layout-template",

  defaultVariant: "centered",

  variants: [
    {
      id: "centered",
      name: "Centered",
      description: "Classic centered layout with text stacked vertically. Great for simple, focused messaging.",
      layout: {
        container: "boxed",
        padding: { base: "py-16 px-4", md: "py-24 px-8", lg: "py-32" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        minHeight: { base: "auto", md: "80vh" },
      },
      supportedContent: ["title", "subtitle", "description", "primaryCta", "secondaryCta", "badge"],
      className: "text-center",
    },
    {
      id: "split",
      name: "Split",
      description: "Two-column layout with text on one side and image on the other. Great for visual impact.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
        minHeight: { base: "auto", md: "80vh" },
      },
      supportedContent: ["title", "subtitle", "description", "primaryCta", "secondaryCta", "image", "badge"],
      className: "items-center",
    },
    {
      id: "video-bg",
      name: "Video Background",
      description: "Full-width hero with video background and overlay. Maximum visual impact.",
      layout: {
        container: "full",
        padding: { base: "py-24 px-4", md: "py-32 px-8", lg: "py-40" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        minHeight: { base: "100vh" },
        background: {
          type: "video",
          value: "",
          overlay: "rgba(0, 0, 0, 0.5)",
        },
      },
      supportedContent: ["title", "subtitle", "description", "primaryCta", "secondaryCta", "video"],
      className: "text-center text-white relative",
    },
    {
      id: "image-bg",
      name: "Image Background",
      description: "Full-width hero with image background and text overlay. Great for visual storytelling.",
      layout: {
        container: "full",
        padding: { base: "py-24 px-4", md: "py-32 px-8", lg: "py-40" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        minHeight: { base: "100vh" },
        background: {
          type: "image",
          value: "",
          overlay: "rgba(0, 0, 0, 0.4)",
        },
      },
      supportedContent: ["title", "subtitle", "description", "primaryCta", "secondaryCta", "backgroundImage"],
      className: "text-center text-white relative",
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Modern gradient background hero. Trendy and eye-catching.",
      layout: {
        container: "full",
        padding: { base: "py-20 px-4", md: "py-28 px-8", lg: "py-36" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        minHeight: { base: "90vh" },
        background: {
          type: "gradient",
          value: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
        },
      },
      supportedContent: ["title", "subtitle", "description", "primaryCta", "secondaryCta", "badge"],
      className: "text-center text-white",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean, minimal hero with just the essentials. Perfect for elegant, simple sites.",
      layout: {
        container: "narrow",
        padding: { base: "py-16 px-4", md: "py-24 px-8", lg: "py-32" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1rem", md: "1.5rem" },
        },
        minHeight: { base: "auto", md: "60vh" },
      },
      supportedContent: ["title", "description", "primaryCta"],
      className: "text-center",
    },
    {
      id: "with-form",
      name: "With Form",
      description: "Hero with embedded signup form. Perfect for lead generation.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-24" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
        minHeight: { base: "auto", md: "80vh" },
      },
      supportedContent: ["title", "subtitle", "description", "form", "badge"],
      className: "items-center",
    },
  ],

  schema: {
    fields: [
      {
        name: "badge",
        type: "text",
        label: "Badge Text",
        placeholder: "New Feature",
        validation: { maxLength: 50 },
      },
      {
        name: "title",
        type: "text",
        label: "Headline",
        required: true,
        placeholder: "Welcome to Our Website",
        validation: { minLength: 3, maxLength: 100 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "A catchy tagline that supports your headline",
        validation: { maxLength: 150 },
      },
      {
        name: "description",
        type: "richtext",
        label: "Description",
        placeholder: "A longer description of what you offer and why visitors should care.",
        validation: { maxLength: 500 },
      },
      {
        name: "primaryCta",
        type: "object",
        label: "Primary Button",
        fields: [
          { name: "text", type: "text", label: "Button Text", required: true },
          { name: "url", type: "text", label: "Button URL", required: true },
          { name: "variant", type: "select", label: "Style", options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ]},
        ],
      },
      {
        name: "secondaryCta",
        type: "object",
        label: "Secondary Button",
        fields: [
          { name: "text", type: "text", label: "Button Text", required: true },
          { name: "url", type: "text", label: "Button URL", required: true },
          { name: "variant", type: "select", label: "Style", options: [
            { label: "Ghost", value: "ghost" },
            { label: "Link", value: "link" },
            { label: "Outline", value: "outline" },
          ]},
        ],
      },
      {
        name: "image",
        type: "image",
        label: "Hero Image",
        fields: [
          { name: "src", type: "text", label: "Image URL", required: true },
          { name: "alt", type: "text", label: "Alt Text", required: true },
        ],
      },
      {
        name: "video",
        type: "video",
        label: "Background Video",
        fields: [
          { name: "src", type: "text", label: "Video URL", required: true },
          { name: "poster", type: "text", label: "Poster Image" },
        ],
      },
      {
        name: "stats",
        type: "array",
        label: "Statistics",
        fields: [
          { name: "value", type: "text", label: "Value", required: true },
          { name: "label", type: "text", label: "Label", required: true },
        ],
        validation: { maxLength: 4 },
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.secondary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.background",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.4xl",
    "typography.fontSize.xl",
    "effects.borderRadius.md",
    "effects.shadow.lg",
  ],

  aiHints: {
    triggers: [
      "hero",
      "banner",
      "main section",
      "headline",
      "welcome",
      "landing",
      "above the fold",
      "header section",
    ],
    contentGuidelines: `
      - Title should be compelling and action-oriented (6-12 words)
      - Subtitle should support the title with more context
      - Description should explain the value proposition
      - Primary CTA should be action-oriented (e.g., "Get Started", "Learn More")
      - Secondary CTA offers an alternative action
      - Use badge for promotions or announcements
    `,
    useCases: [
      "Landing page first impression",
      "Product/service introduction",
      "Company welcome message",
      "Campaign promotion",
    ],
    priority: 10,
  },
};
