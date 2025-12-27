/**
 * FAQ Block Definition
 *
 * Frequently asked questions with accordion display.
 */

import type { BlockType } from "../types";

export const faqBlock: BlockType = {
  id: "faq",
  name: "FAQ",
  category: "content",
  description: "Frequently asked questions with expandable answers",
  icon: "help-circle",

  variants: [
    {
      id: "accordion",
      name: "Accordion",
      description: "Expandable Q&A pairs",
      layout: {
        container: "narrow",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "items"],
    },
    {
      id: "two-column",
      name: "Two Column",
      description: "FAQs in two columns",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "items"],
    },
    {
      id: "cards",
      name: "Cards",
      description: "Each FAQ as a card",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "items"],
    },
    {
      id: "categorized",
      name: "Categorized",
      description: "FAQs grouped by category",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "categories"],
    },
  ],

  defaultVariant: "accordion",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Frequently Asked Questions",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "Find answers to common questions",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        validation: { maxLength: 300 },
      },
      {
        name: "items",
        type: "array",
        label: "FAQ Items",
        required: true,
        fields: [
          {
            name: "question",
            type: "text",
            label: "Question",
            required: true,
          },
          {
            name: "answer",
            type: "richtext",
            label: "Answer",
            required: true,
          },
          {
            name: "category",
            type: "text",
            label: "Category",
          },
        ],
        validation: { min: 1, max: 30 },
      },
      {
        name: "categories",
        type: "array",
        label: "FAQ Categories (for categorized variant)",
        fields: [
          { name: "name", type: "text", label: "Category Name" },
          {
            name: "items",
            type: "array",
            label: "Questions",
            fields: [
              { name: "question", type: "text", label: "Question" },
              { name: "answer", type: "richtext", label: "Answer" },
            ],
          },
        ],
      },
      {
        name: "defaultOpen",
        type: "boolean",
        label: "First Item Open by Default",
        default: true,
      },
      {
        name: "allowMultiple",
        type: "boolean",
        label: "Allow Multiple Open",
        default: false,
      },
      {
        name: "contactCta",
        type: "object",
        label: "Contact CTA",
        fields: [
          { name: "text", type: "text", label: "CTA Text", placeholder: "Still have questions?" },
          { name: "buttonText", type: "text", label: "Button Text", placeholder: "Contact Us" },
          { name: "buttonUrl", type: "text", label: "Button URL" },
        ],
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.border",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.primary",
    "effects.borderRadius",
  ],

  aiHints: {
    triggers: [
      "faq",
      "questions",
      "answers",
      "help",
      "support",
      "common questions",
      "q&a",
    ],
    contentGuidelines:
      "Keep questions clear and concise. Provide helpful, complete answers. Group related questions. Most asked questions first.",
    useCases: [
      "Product/service pages",
      "Support sections",
      "Pricing clarifications",
      "Onboarding help",
      "Legal/policy explanations",
    ],
    priority: 6,
  },
};
