/**
 * Pricing Block Definition
 *
 * Pricing tables for services, subscriptions, or packages.
 */

import type { BlockType } from "../types";

export const pricingBlock: BlockType = {
  id: "pricing",
  name: "Pricing",
  category: "content",
  description: "Pricing tables for services, subscriptions, or product tiers",
  icon: "dollar-sign",

  variants: [
    {
      id: "cards",
      name: "Cards",
      description: "Side-by-side pricing cards",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "plans", "toggle"],
    },
    {
      id: "comparison",
      name: "Comparison",
      description: "Feature comparison table",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "plans", "features"],
    },
    {
      id: "simple",
      name: "Simple",
      description: "Minimal pricing display",
      layout: {
        container: "narrow",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "plans"],
    },
    {
      id: "toggle",
      name: "Toggle",
      description: "Monthly/yearly toggle with savings",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "plans", "toggle"],
    },
  ],

  defaultVariant: "cards",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Pricing Plans",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "Choose the plan that works for you",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        validation: { maxLength: 300 },
      },
      {
        name: "plans",
        type: "array",
        label: "Pricing Plans",
        required: true,
        fields: [
          {
            name: "name",
            type: "text",
            label: "Plan Name",
            required: true,
            placeholder: "Pro",
          },
          {
            name: "description",
            type: "text",
            label: "Plan Description",
            placeholder: "Best for growing businesses",
          },
          {
            name: "price",
            type: "text",
            label: "Price",
            required: true,
            placeholder: "$29",
          },
          {
            name: "priceYearly",
            type: "text",
            label: "Yearly Price",
            placeholder: "$290",
          },
          {
            name: "period",
            type: "text",
            label: "Billing Period",
            default: "/month",
          },
          {
            name: "features",
            type: "array",
            label: "Features",
            fields: [
              { name: "text", type: "text", label: "Feature" },
              { name: "included", type: "boolean", label: "Included", default: true },
            ],
          },
          {
            name: "cta",
            type: "object",
            label: "CTA Button",
            fields: [
              { name: "text", type: "text", label: "Button Text", default: "Get Started" },
              { name: "url", type: "text", label: "Button URL" },
            ],
          },
          {
            name: "highlighted",
            type: "boolean",
            label: "Highlight This Plan",
            default: false,
          },
          {
            name: "badge",
            type: "text",
            label: "Badge Text",
            placeholder: "Most Popular",
          },
        ],
        validation: { min: 1, max: 5 },
      },
      {
        name: "showToggle",
        type: "boolean",
        label: "Show Monthly/Yearly Toggle",
        default: false,
      },
      {
        name: "yearlySavings",
        type: "text",
        label: "Yearly Savings Text",
        placeholder: "Save 20%",
      },
      {
        name: "comparisonFeatures",
        type: "array",
        label: "Comparison Features (for comparison variant)",
        fields: [
          { name: "name", type: "text", label: "Feature Name" },
          { name: "tooltip", type: "text", label: "Tooltip Description" },
        ],
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.primary",
    "colors.accent",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.border",
    "effects.borderRadius",
    "effects.shadow",
  ],

  aiHints: {
    triggers: [
      "pricing",
      "prices",
      "plans",
      "subscription",
      "packages",
      "tiers",
      "cost",
      "rates",
    ],
    contentGuidelines:
      "Show 2-4 plans. Highlight recommended plan. List most important features first. Use clear CTAs. Consider annual discounts.",
    useCases: [
      "SaaS products",
      "Service packages",
      "Membership tiers",
      "Consulting rates",
      "Subscription services",
    ],
    priority: 8,
  },
};
