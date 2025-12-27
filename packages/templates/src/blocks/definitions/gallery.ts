/**
 * Gallery Block Definition
 *
 * Image gallery with multiple layout options.
 */

import type { BlockType } from "../types";

export const galleryBlock: BlockType = {
  id: "gallery",
  name: "Gallery",
  category: "content",
  description: "Image gallery for showcasing photos, portfolio work, or products",
  icon: "images",

  variants: [
    {
      id: "grid",
      name: "Grid",
      description: "Uniform grid of images",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 2, md: 3, lg: 4 },
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["title", "subtitle", "images"],
    },
    {
      id: "masonry",
      name: "Masonry",
      description: "Pinterest-style varying height layout",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "images"],
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "Horizontal scrolling gallery",
      layout: {
        container: "full",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "images"],
    },
    {
      id: "featured",
      name: "Featured",
      description: "Large featured image with smaller thumbnails",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, md: 2 },
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["title", "subtitle", "images"],
    },
  ],

  defaultVariant: "grid",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Our Gallery",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        validation: { maxLength: 300 },
      },
      {
        name: "images",
        type: "array",
        label: "Images",
        required: true,
        fields: [
          {
            name: "src",
            type: "text",
            label: "Image URL",
            required: true,
          },
          {
            name: "alt",
            type: "text",
            label: "Alt Text",
            required: true,
          },
          {
            name: "caption",
            type: "text",
            label: "Caption",
          },
          {
            name: "category",
            type: "text",
            label: "Category (for filtering)",
          },
        ],
        validation: { min: 1, max: 50 },
      },
      {
        name: "categories",
        type: "array",
        label: "Filter Categories",
        fields: [
          { name: "id", type: "text", label: "Category ID" },
          { name: "label", type: "text", label: "Category Label" },
        ],
      },
      {
        name: "enableLightbox",
        type: "boolean",
        label: "Enable Lightbox",
        default: true,
      },
      {
        name: "enableFiltering",
        type: "boolean",
        label: "Enable Category Filtering",
        default: false,
      },
      {
        name: "columns",
        type: "number",
        label: "Columns (Grid)",
        default: 4,
        validation: { min: 2, max: 6 },
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.text.primary",
    "effects.borderRadius",
    "effects.shadow",
  ],

  aiHints: {
    triggers: [
      "gallery",
      "photos",
      "images",
      "portfolio",
      "work samples",
      "photo gallery",
      "image gallery",
      "showcase",
    ],
    contentGuidelines:
      "Use high-quality images with consistent aspect ratios when possible. Add descriptive alt text. Group by category if many images.",
    useCases: [
      "Photography portfolios",
      "Restaurant ambiance photos",
      "Real estate listings",
      "Product showcases",
      "Event galleries",
      "Before/after comparisons",
    ],
    priority: 8,
  },
};
