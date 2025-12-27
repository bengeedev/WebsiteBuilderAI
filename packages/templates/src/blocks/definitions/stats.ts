/**
 * Stats Block Definition
 *
 * Statistics and metrics display.
 */

import type { BlockType } from "../types";

export const statsBlock: BlockType = {
  id: "stats",
  name: "Stats",
  category: "content",
  description: "Display key statistics, metrics, and achievements",
  icon: "bar-chart",

  variants: [
    {
      id: "inline",
      name: "Inline",
      description: "Stats in a horizontal row",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem" },
        grid: {
          columns: { base: 2, md: 4 },
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["stats"],
    },
    {
      id: "cards",
      name: "Cards",
      description: "Each stat in an elevated card",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, sm: 2, lg: 4 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "stats"],
    },
    {
      id: "banner",
      name: "Banner",
      description: "Full-width colored background with stats",
      layout: {
        container: "full",
        padding: { base: "3rem", md: "4rem" },
        background: {
          type: "color",
          value: "var(--color-primary)",
        },
      },
      supportedContent: ["stats"],
    },
    {
      id: "with-icons",
      name: "With Icons",
      description: "Stats with accompanying icons",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, sm: 2, lg: 4 },
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "subtitle", "stats"],
    },
  ],

  defaultVariant: "inline",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Our Impact",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        validation: { maxLength: 120 },
      },
      {
        name: "stats",
        type: "array",
        label: "Statistics",
        required: true,
        fields: [
          {
            name: "value",
            type: "text",
            label: "Value",
            required: true,
            placeholder: "10K+",
          },
          {
            name: "label",
            type: "text",
            label: "Label",
            required: true,
            placeholder: "Happy Customers",
          },
          {
            name: "icon",
            type: "text",
            label: "Icon",
          },
          {
            name: "prefix",
            type: "text",
            label: "Prefix (e.g., $)",
          },
          {
            name: "suffix",
            type: "text",
            label: "Suffix (e.g., +, %)",
          },
          {
            name: "description",
            type: "text",
            label: "Description",
            validation: { maxLength: 100 },
          },
        ],
        validation: { min: 2, max: 6 },
      },
      {
        name: "animate",
        type: "boolean",
        label: "Animate Numbers",
        default: true,
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.primary",
    "colors.text.primary",
    "colors.text.secondary",
    "typography.fontFamily.heading",
  ],

  aiHints: {
    triggers: [
      "stats",
      "statistics",
      "numbers",
      "metrics",
      "achievements",
      "results",
      "impact",
      "data",
    ],
    contentGuidelines:
      "Use impressive but believable numbers. Include context with labels. Round numbers are more readable. Use consistent formats.",
    useCases: [
      "Company achievements",
      "Product metrics",
      "Social proof",
      "Impact sections",
      "About page highlights",
    ],
    priority: 6,
  },
};
