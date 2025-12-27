/**
 * Menu Block Definition
 *
 * Restaurant/cafe menu with categories and items.
 */

import type { BlockType } from "../types";

export const menuBlock: BlockType = {
  id: "menu",
  name: "Menu",
  category: "content",
  description: "Restaurant or cafe menu with categories, items, prices, and descriptions",
  icon: "utensils",

  variants: [
    {
      id: "columns",
      name: "Columns",
      description: "Menu items in multi-column layout by category",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2 },
          gap: { base: "2rem", lg: "3rem" },
        },
      },
      supportedContent: ["title", "subtitle", "categories"],
    },
    {
      id: "tabs",
      name: "Tabs",
      description: "Tabbed interface with category switching",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "categories"],
    },
    {
      id: "cards",
      name: "Cards",
      description: "Menu items as visual cards with images",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, sm: 2, lg: 3 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "categories"],
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple list-style menu",
      layout: {
        container: "narrow",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "categories"],
    },
  ],

  defaultVariant: "columns",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Our Menu",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "Fresh ingredients, authentic flavors",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        validation: { maxLength: 300 },
      },
      {
        name: "categories",
        type: "array",
        label: "Menu Categories",
        required: true,
        fields: [
          {
            name: "name",
            type: "text",
            label: "Category Name",
            required: true,
            placeholder: "Appetizers",
          },
          {
            name: "description",
            type: "text",
            label: "Category Description",
          },
          {
            name: "items",
            type: "array",
            label: "Menu Items",
            required: true,
            fields: [
              {
                name: "name",
                type: "text",
                label: "Item Name",
                required: true,
                placeholder: "Bruschetta",
              },
              {
                name: "description",
                type: "text",
                label: "Description",
                placeholder: "Toasted bread with tomatoes and basil",
              },
              {
                name: "price",
                type: "text",
                label: "Price",
                required: true,
                placeholder: "$12",
              },
              {
                name: "image",
                type: "image",
                label: "Item Image",
              },
              {
                name: "tags",
                type: "array",
                label: "Tags (vegetarian, spicy, etc.)",
                fields: [{ name: "tag", type: "text", label: "Tag" }],
              },
              {
                name: "featured",
                type: "boolean",
                label: "Featured Item",
                default: false,
              },
            ],
            validation: { min: 1, max: 20 },
          },
        ],
        validation: { min: 1, max: 10 },
      },
      {
        name: "showPrices",
        type: "boolean",
        label: "Show Prices",
        default: true,
      },
      {
        name: "currency",
        type: "text",
        label: "Currency Symbol",
        default: "$",
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.primary",
    "colors.accent",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
  ],

  aiHints: {
    triggers: [
      "menu",
      "food menu",
      "restaurant menu",
      "dishes",
      "prices",
      "food items",
      "cafe menu",
      "drink menu",
    ],
    contentGuidelines:
      "Organize items into logical categories. Include appetizing descriptions. Keep prices consistent format. Highlight specials or popular items.",
    useCases: [
      "Restaurant websites",
      "Cafe websites",
      "Food truck websites",
      "Catering services",
      "Bar/pub websites",
    ],
    priority: 9,
  },
};
