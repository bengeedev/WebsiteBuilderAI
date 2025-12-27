/**
 * Header Block Definition
 *
 * Site navigation header with logo and menu items.
 */

import type { BlockType } from "../types";

export const headerBlock: BlockType = {
  id: "header",
  name: "Header",
  category: "structural",
  description: "Site navigation header with logo, menu items, and optional CTA button",
  icon: "menu",

  variants: [
    {
      id: "simple",
      name: "Simple",
      description: "Clean header with logo and horizontal navigation",
      layout: {
        container: "boxed",
        padding: { base: "1rem" },
        flex: {
          direction: { base: "row" },
          align: "center",
          justify: "between",
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["logo", "navItems", "cta"],
    },
    {
      id: "centered",
      name: "Centered",
      description: "Centered logo with navigation below",
      layout: {
        container: "boxed",
        padding: { base: "1rem" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["logo", "navItems", "cta"],
    },
    {
      id: "transparent",
      name: "Transparent",
      description: "Transparent header that overlays hero section",
      layout: {
        container: "boxed",
        padding: { base: "1rem" },
        flex: {
          direction: { base: "row" },
          align: "center",
          justify: "between",
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["logo", "navItems", "cta"],
      className: "absolute top-0 left-0 right-0 z-50 bg-transparent",
    },
    {
      id: "with-topbar",
      name: "With Top Bar",
      description: "Header with announcement or contact bar above",
      layout: {
        container: "full",
        padding: { base: "0" },
      },
      supportedContent: ["topBar", "logo", "navItems", "cta"],
    },
  ],

  defaultVariant: "simple",

  schema: {
    fields: [
      {
        name: "logo",
        type: "object",
        label: "Logo",
        fields: [
          { name: "src", type: "text", label: "Logo Image URL" },
          { name: "text", type: "text", label: "Logo Text (fallback)" },
          { name: "href", type: "text", label: "Logo Link", default: "/" },
        ],
      },
      {
        name: "navItems",
        type: "array",
        label: "Navigation Items",
        fields: [
          { name: "text", type: "text", label: "Link Text", required: true },
          { name: "url", type: "text", label: "URL", required: true },
          {
            name: "children",
            type: "array",
            label: "Dropdown Items",
            fields: [
              { name: "text", type: "text", label: "Link Text" },
              { name: "url", type: "text", label: "URL" },
            ],
          },
        ],
        validation: { max: 8 },
      },
      {
        name: "cta",
        type: "object",
        label: "CTA Button",
        fields: [
          { name: "text", type: "text", label: "Button Text" },
          { name: "url", type: "text", label: "Button URL" },
          {
            name: "variant",
            type: "select",
            label: "Style",
            options: [
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
              { label: "Outline", value: "outline" },
            ],
          },
        ],
      },
      {
        name: "topBar",
        type: "object",
        label: "Top Bar",
        fields: [
          { name: "text", type: "text", label: "Announcement Text" },
          { name: "link", type: "text", label: "Link URL" },
          { name: "phone", type: "text", label: "Phone Number" },
          { name: "email", type: "text", label: "Email Address" },
        ],
      },
      {
        name: "sticky",
        type: "boolean",
        label: "Sticky Header",
        default: true,
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.text.primary",
    "colors.primary",
    "typography.fontFamily.body",
    "effects.shadow",
  ],

  aiHints: {
    triggers: ["header", "navigation", "nav", "menu bar", "top bar", "navbar"],
    contentGuidelines:
      "Navigation should be clear and concise. Limit to 5-7 main items. Use descriptive link text. CTA should stand out.",
    useCases: [
      "Every page needs a header",
      "Site-wide navigation",
      "Brand identity placement",
    ],
    priority: 10,
  },
};
