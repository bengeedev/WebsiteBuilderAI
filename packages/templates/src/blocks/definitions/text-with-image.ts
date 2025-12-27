/**
 * Text With Image Block Definition
 *
 * A versatile content section combining text and imagery.
 * Perfect for about sections, feature highlights, and storytelling.
 */

import type { BlockType } from "../types";

export const textWithImageBlock: BlockType = {
  id: "text-with-image",
  name: "Text with Image",
  category: "content",
  description: "Content section combining text and an image side by side. Great for storytelling, about sections, and feature highlights.",
  icon: "layout-sidebar",

  defaultVariant: "image-right",

  variants: [
    {
      id: "image-right",
      name: "Image Right",
      description: "Text on the left, image on the right. Standard reading flow.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
      },
      supportedContent: ["title", "subtitle", "content", "cta", "image", "features"],
      className: "items-center",
    },
    {
      id: "image-left",
      name: "Image Left",
      description: "Image on the left, text on the right. Alternative layout for variety.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
      },
      supportedContent: ["title", "subtitle", "content", "cta", "image", "features"],
      className: "items-center lg:flex-row-reverse",
    },
    {
      id: "alternating",
      name: "Alternating",
      description: "Multiple items with alternating image positions. Great for multi-step stories.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "stretch",
          justify: "start",
          gap: { base: "3rem", lg: "4rem" },
        },
      },
      supportedContent: ["title", "subtitle", "content", "cta", "image", "features"],
      className: "",
    },
    {
      id: "overlay",
      name: "Image Overlay",
      description: "Text overlaid on a full-width background image. High visual impact.",
      layout: {
        container: "full",
        padding: { base: "py-20 px-4", md: "py-28 px-8", lg: "py-36" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "1.5rem", md: "2rem" },
        },
        background: {
          type: "image",
          value: "",
          overlay: "rgba(0, 0, 0, 0.6)",
        },
      },
      supportedContent: ["title", "subtitle", "content", "cta", "image"],
      className: "text-center text-white relative",
    },
  ],

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Title",
        required: true,
        placeholder: "Our Story",
        validation: { minLength: 2, maxLength: 80 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "A brief introduction",
        validation: { maxLength: 120 },
      },
      {
        name: "content",
        type: "richtext",
        label: "Content",
        required: true,
        placeholder: "Tell your story here. Describe your journey, mission, or what makes you unique.",
        validation: { minLength: 20, maxLength: 1000 },
      },
      {
        name: "image",
        type: "object",
        label: "Image",
        required: true,
        fields: [
          { name: "src", type: "text", label: "Image URL", required: true },
          { name: "alt", type: "text", label: "Alt Text", required: true },
          { name: "width", type: "number", label: "Width" },
          { name: "height", type: "number", label: "Height" },
        ],
      },
      {
        name: "cta",
        type: "object",
        label: "Call to Action",
        fields: [
          { name: "text", type: "text", label: "Button Text", required: true },
          { name: "url", type: "text", label: "Button URL", required: true },
          { name: "variant", type: "select", label: "Style", options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Link", value: "link" },
          ]},
        ],
      },
      {
        name: "features",
        type: "array",
        label: "Feature Points",
        fields: [
          { name: "icon", type: "text", label: "Icon Name" },
          { name: "title", type: "text", label: "Title", required: true },
          { name: "description", type: "text", label: "Description" },
        ],
        validation: { maxLength: 6 },
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.background",
    "colors.surface",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.3xl",
    "typography.fontSize.lg",
    "effects.borderRadius.lg",
    "effects.shadow.md",
  ],

  aiHints: {
    triggers: [
      "about",
      "story",
      "text with image",
      "content section",
      "feature highlight",
      "split section",
      "two column",
    ],
    contentGuidelines: `
      - Title should clearly indicate the section's purpose
      - Content should tell a story or explain a concept
      - Image should support and enhance the text message
      - Use feature points for quick-scan information
      - CTA should lead to relevant next step
    `,
    useCases: [
      "About us section",
      "Feature explanation",
      "Product story",
      "Team introduction",
      "Company values",
    ],
    priority: 8,
  },
};
