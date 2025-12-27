/**
 * Footer Block Definition
 *
 * Website footer with links, contact info, and branding.
 * The closing section of every page.
 */

import type { BlockType } from "../types";

export const footerBlock: BlockType = {
  id: "footer",
  name: "Footer",
  category: "structural",
  description: "Website footer with navigation links, contact information, social links, and copyright. Essential for every website.",
  icon: "layout-bottom",

  defaultVariant: "columns",

  variants: [
    {
      id: "columns",
      name: "Multi-Column",
      description: "Classic footer with multiple link columns. Comprehensive and organized.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "2rem", md: "3rem" },
        },
        background: {
          type: "color",
          value: "var(--color-surface)",
        },
      },
      supportedContent: ["logo", "tagline", "columns", "socialLinks", "newsletter", "copyright"],
      className: "",
    },
    {
      id: "simple",
      name: "Simple",
      description: "Minimal footer with essential info only. Clean and compact.",
      layout: {
        container: "boxed",
        padding: { base: "py-8 px-4", md: "py-12 px-8" },
        flex: {
          direction: { base: "column", md: "row" },
          align: "center",
          justify: "between",
          gap: { base: "1.5rem" },
        },
        background: {
          type: "color",
          value: "var(--color-surface)",
        },
      },
      supportedContent: ["logo", "tagline", "socialLinks", "copyright"],
      className: "",
    },
    {
      id: "centered",
      name: "Centered",
      description: "Centered footer with stacked elements. Modern and focused.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        background: {
          type: "color",
          value: "var(--color-surface)",
        },
      },
      supportedContent: ["logo", "tagline", "socialLinks", "copyright"],
      className: "text-center",
    },
    {
      id: "mega",
      name: "Mega Footer",
      description: "Large footer with newsletter and detailed info. For content-rich sites.",
      layout: {
        container: "full",
        padding: { base: "py-16 px-4", md: "py-20 px-8" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "3rem", md: "4rem" },
        },
        background: {
          type: "color",
          value: "var(--color-secondary)",
        },
      },
      supportedContent: ["logo", "tagline", "columns", "socialLinks", "newsletter", "copyright"],
      className: "text-white",
    },
  ],

  schema: {
    fields: [
      {
        name: "logo",
        type: "object",
        label: "Logo",
        fields: [
          { name: "src", type: "text", label: "Logo URL" },
          { name: "alt", type: "text", label: "Alt Text" },
          { name: "width", type: "number", label: "Width" },
          { name: "height", type: "number", label: "Height" },
        ],
      },
      {
        name: "tagline",
        type: "text",
        label: "Tagline",
        placeholder: "Building amazing experiences since 2024",
        validation: { maxLength: 150 },
      },
      {
        name: "columns",
        type: "array",
        label: "Link Columns",
        fields: [
          { name: "title", type: "text", label: "Column Title", required: true },
          {
            name: "links",
            type: "array",
            label: "Links",
            fields: [
              { name: "text", type: "text", label: "Link Text", required: true },
              { name: "url", type: "text", label: "URL", required: true },
            ],
          },
        ],
        validation: { maxLength: 5 },
        default: [
          {
            title: "Company",
            links: [
              { text: "About", url: "/about" },
              { text: "Careers", url: "/careers" },
              { text: "Contact", url: "/contact" },
            ],
          },
          {
            title: "Resources",
            links: [
              { text: "Blog", url: "/blog" },
              { text: "Help Center", url: "/help" },
              { text: "Privacy Policy", url: "/privacy" },
            ],
          },
        ],
      },
      {
        name: "socialLinks",
        type: "array",
        label: "Social Links",
        fields: [
          {
            name: "platform",
            type: "select",
            label: "Platform",
            required: true,
            options: [
              { label: "Facebook", value: "facebook" },
              { label: "Twitter/X", value: "twitter" },
              { label: "Instagram", value: "instagram" },
              { label: "LinkedIn", value: "linkedin" },
              { label: "YouTube", value: "youtube" },
              { label: "TikTok", value: "tiktok" },
              { label: "GitHub", value: "github" },
            ],
          },
          { name: "url", type: "text", label: "Profile URL", required: true },
          { name: "icon", type: "text", label: "Custom Icon" },
        ],
        validation: { maxLength: 8 },
      },
      {
        name: "newsletter",
        type: "object",
        label: "Newsletter Signup",
        fields: [
          { name: "title", type: "text", label: "Title", default: "Subscribe to our newsletter" },
          { name: "description", type: "text", label: "Description" },
          { name: "placeholder", type: "text", label: "Input Placeholder", default: "Enter your email" },
          { name: "buttonText", type: "text", label: "Button Text", default: "Subscribe" },
        ],
      },
      {
        name: "copyright",
        type: "text",
        label: "Copyright Text",
        placeholder: "© 2024 Company Name. All rights reserved.",
        default: "© 2024 Company Name. All rights reserved.",
        validation: { maxLength: 200 },
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.secondary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.text.muted",
    "colors.background",
    "colors.surface",
    "colors.border",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "effects.borderRadius.md",
    "spacing.gap.md",
  ],

  aiHints: {
    triggers: [
      "footer",
      "bottom",
      "copyright",
      "site footer",
      "page footer",
      "links footer",
    ],
    contentGuidelines: `
      - Include essential navigation links
      - Add social media links for engagement
      - Copyright should include current year
      - Newsletter signup for lead capture
      - Keep link columns organized by category
      - Logo reinforces brand at the bottom
    `,
    useCases: [
      "Every page footer",
      "Site-wide navigation",
      "Legal links",
      "Social presence",
      "Newsletter signup",
    ],
    priority: 6,
  },
};
