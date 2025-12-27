/**
 * Newsletter Block Definition
 *
 * Email signup and newsletter subscription forms.
 */

import type { BlockType } from "../types";

export const newsletterBlock: BlockType = {
  id: "newsletter",
  name: "Newsletter",
  category: "content",
  description: "Email signup form for newsletter subscriptions",
  icon: "mail",

  variants: [
    {
      id: "inline",
      name: "Inline",
      description: "Horizontal form with input and button",
      layout: {
        container: "narrow",
        padding: { base: "3rem", md: "4rem" },
      },
      supportedContent: ["title", "description", "form"],
    },
    {
      id: "card",
      name: "Card",
      description: "Contained card with form",
      layout: {
        container: "narrow",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "description", "form", "features"],
    },
    {
      id: "split",
      name: "Split",
      description: "Two-column with image",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2 },
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "description", "form", "image"],
    },
    {
      id: "banner",
      name: "Banner",
      description: "Full-width colored banner",
      layout: {
        container: "full",
        padding: { base: "3rem", md: "4rem" },
        background: {
          type: "color",
          value: "var(--color-primary)",
        },
      },
      supportedContent: ["title", "description", "form"],
    },
  ],

  defaultVariant: "inline",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "Subscribe to Our Newsletter",
        validation: { maxLength: 80 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "Get the latest updates delivered to your inbox",
        validation: { maxLength: 200 },
      },
      {
        name: "placeholder",
        type: "text",
        label: "Input Placeholder",
        default: "Enter your email",
      },
      {
        name: "buttonText",
        type: "text",
        label: "Button Text",
        default: "Subscribe",
      },
      {
        name: "successMessage",
        type: "text",
        label: "Success Message",
        default: "Thanks for subscribing!",
      },
      {
        name: "features",
        type: "array",
        label: "Features/Benefits",
        fields: [
          { name: "text", type: "text", label: "Feature Text" },
        ],
        validation: { max: 4 },
      },
      {
        name: "image",
        type: "image",
        label: "Image (for split variant)",
      },
      {
        name: "privacyText",
        type: "text",
        label: "Privacy Text",
        placeholder: "We respect your privacy. Unsubscribe anytime.",
      },
      {
        name: "privacyLink",
        type: "text",
        label: "Privacy Policy Link",
      },
      {
        name: "includeNameField",
        type: "boolean",
        label: "Include Name Field",
        default: false,
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.primary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.border",
    "effects.borderRadius",
  ],

  aiHints: {
    triggers: [
      "newsletter",
      "subscribe",
      "email signup",
      "mailing list",
      "updates",
      "stay informed",
    ],
    contentGuidelines:
      "Clear value proposition. Simple form (email only ideally). Include privacy assurance. Mention frequency if relevant.",
    useCases: [
      "Blog subscriptions",
      "Product updates",
      "Lead generation",
      "Content marketing",
      "E-commerce promotions",
    ],
    priority: 6,
  },
};
