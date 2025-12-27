/**
 * Features Block Definition
 *
 * Display a grid of features, services, or benefits.
 * Versatile block for showcasing multiple items with icons.
 */

import type { BlockType } from "../types";

export const featuresBlock: BlockType = {
  id: "features",
  name: "Features",
  category: "content",
  description: "Display multiple features, services, or benefits in an organized grid. Perfect for showcasing what you offer.",
  icon: "grid-3x3",

  defaultVariant: "grid",

  variants: [
    {
      id: "grid",
      name: "Grid",
      description: "Clean grid layout with equal-sized feature cards. Best for 3-6 features.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "2rem", md: "3rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "features"],
      className: "",
    },
    {
      id: "cards",
      name: "Cards",
      description: "Features displayed as elevated cards with shadows. More visual prominence.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "2rem", md: "3rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "features"],
      className: "",
    },
    {
      id: "alternating",
      name: "Alternating",
      description: "Features alternate between left and right alignment. Good for storytelling.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "3rem", md: "4rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "features"],
      className: "",
    },
    {
      id: "icon-left",
      name: "Icon Left",
      description: "List-style layout with icons on the left. Compact and scannable.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, md: 2 },
          gap: { base: "1.5rem", md: "2rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "features"],
      className: "",
    },
  ],

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Why Choose Us",
        validation: { maxLength: 80 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "Everything you need to succeed",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "A brief introduction to your features",
        validation: { maxLength: 300 },
      },
      {
        name: "features",
        type: "array",
        label: "Features",
        required: true,
        fields: [
          { name: "icon", type: "text", label: "Icon Name", placeholder: "star" },
          { name: "title", type: "text", label: "Title", required: true },
          { name: "description", type: "text", label: "Description", required: true },
          {
            name: "link",
            type: "object",
            label: "Link",
            fields: [
              { name: "text", type: "text", label: "Link Text" },
              { name: "url", type: "text", label: "URL" },
            ],
          },
        ],
        validation: { minLength: 1, maxLength: 12 },
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.secondary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.background",
    "colors.surface",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.2xl",
    "effects.borderRadius.lg",
    "effects.shadow.md",
    "spacing.gap.md",
  ],

  aiHints: {
    triggers: [
      "features",
      "services",
      "benefits",
      "what we offer",
      "why choose",
      "advantages",
      "capabilities",
      "solutions",
    ],
    contentGuidelines: `
      - Title should introduce the feature set
      - Each feature should have a clear, descriptive title
      - Feature descriptions should be concise (1-2 sentences)
      - Use consistent icon style across all features
      - Order features by importance or logical flow
      - 3-6 features is ideal for most layouts
    `,
    useCases: [
      "Product features showcase",
      "Service offerings",
      "Company benefits",
      "Process steps",
      "Value propositions",
    ],
    priority: 9,
  },
};
