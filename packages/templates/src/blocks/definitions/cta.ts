/**
 * CTA (Call to Action) Block Definition
 *
 * Drive conversions with compelling call-to-action sections.
 * Perfect for encouraging sign-ups, purchases, or contact.
 */

import type { BlockType } from "../types";

export const ctaBlock: BlockType = {
  id: "cta",
  name: "Call to Action",
  category: "content",
  description: "Compelling call-to-action section to drive conversions. Encourage visitors to take the next step.",
  icon: "megaphone",

  defaultVariant: "banner",

  variants: [
    {
      id: "banner",
      name: "Banner",
      description: "Full-width banner with centered text. High visibility call-to-action.",
      layout: {
        container: "full",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        background: {
          type: "color",
          value: "var(--color-primary)",
        },
      },
      supportedContent: ["title", "description", "primaryCta", "secondaryCta"],
      className: "text-center text-white",
    },
    {
      id: "split",
      name: "Split",
      description: "Two-column layout with text and buttons. Professional and balanced.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
      },
      supportedContent: ["title", "description", "primaryCta", "secondaryCta", "image"],
      className: "items-center",
    },
    {
      id: "card",
      name: "Card",
      description: "Contained card with shadow. Stands out from the page.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["title", "description", "primaryCta", "secondaryCta"],
      className: "text-center",
    },
    {
      id: "gradient",
      name: "Gradient",
      description: "Gradient background for modern appeal. Eye-catching and trendy.",
      layout: {
        container: "full",
        padding: { base: "py-16 px-4", md: "py-20 px-8", lg: "py-28" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        background: {
          type: "gradient",
          value: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
        },
      },
      supportedContent: ["title", "description", "primaryCta", "secondaryCta"],
      className: "text-center text-white",
    },
  ],

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Headline",
        required: true,
        placeholder: "Ready to Get Started?",
        validation: { minLength: 5, maxLength: 80 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "Join thousands of satisfied customers today.",
        validation: { maxLength: 200 },
      },
      {
        name: "primaryCta",
        type: "object",
        label: "Primary Button",
        required: true,
        fields: [
          { name: "text", type: "text", label: "Button Text", required: true },
          { name: "url", type: "text", label: "Button URL", required: true },
          { name: "variant", type: "select", label: "Style", options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "White", value: "white" },
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
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
            { label: "Link", value: "link" },
          ]},
        ],
      },
      {
        name: "image",
        type: "object",
        label: "Image (for split variant)",
        fields: [
          { name: "src", type: "text", label: "Image URL" },
          { name: "alt", type: "text", label: "Alt Text" },
        ],
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.secondary",
    "colors.accent",
    "colors.text.primary",
    "colors.background",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.3xl",
    "typography.fontSize.lg",
    "effects.borderRadius.lg",
    "effects.shadow.lg",
  ],

  aiHints: {
    triggers: [
      "cta",
      "call to action",
      "get started",
      "sign up",
      "contact us",
      "conversion",
      "action section",
      "banner",
    ],
    contentGuidelines: `
      - Headline should create urgency or excitement
      - Description should reinforce the value proposition
      - Primary CTA should use action words (Get, Start, Join, Try)
      - Secondary CTA offers an alternative (Learn More, View Demo)
      - Keep text concise - this is about action, not information
    `,
    useCases: [
      "Newsletter signup",
      "Free trial promotion",
      "Contact encouragement",
      "Product purchase",
      "Demo request",
    ],
    priority: 7,
  },
};
