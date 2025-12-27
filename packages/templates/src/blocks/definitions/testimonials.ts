/**
 * Testimonials Block Definition
 *
 * Display customer reviews and testimonials.
 * Build trust with social proof.
 */

import type { BlockType } from "../types";

export const testimonialsBlock: BlockType = {
  id: "testimonials",
  name: "Testimonials",
  category: "content",
  description: "Showcase customer reviews and testimonials. Build trust and credibility with social proof.",
  icon: "quote",

  defaultVariant: "grid",

  variants: [
    {
      id: "grid",
      name: "Grid",
      description: "Testimonials displayed in a responsive grid. Shows multiple testimonials at once.",
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
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "",
    },
    {
      id: "carousel",
      name: "Carousel",
      description: "Testimonials in a sliding carousel. Great for many testimonials in limited space.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "start",
          gap: { base: "2rem", md: "3rem" },
        },
      },
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "text-center",
    },
    {
      id: "single-focus",
      name: "Single Focus",
      description: "Large, featured testimonial. Maximum impact for your best review.",
      layout: {
        container: "boxed",
        padding: { base: "py-16 px-4", md: "py-20 px-8", lg: "py-28" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "2rem", md: "2.5rem" },
        },
        minHeight: { base: "auto", md: "60vh" },
      },
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "text-center",
    },
    {
      id: "cards-with-rating",
      name: "Cards with Rating",
      description: "Testimonial cards with star ratings. Great for e-commerce and services.",
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
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "",
    },
    {
      id: "masonry",
      name: "Masonry",
      description: "Varied-height cards in masonry layout. Dynamic and modern.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: { base: "1.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "",
    },
    {
      id: "logo-bar",
      name: "Logo Bar",
      description: "Simple testimonials with company logos. Subtle trust building.",
      layout: {
        container: "boxed",
        padding: { base: "py-10 px-4", md: "py-14 px-8" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "center",
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "logos", "testimonials"],
      className: "text-center",
    },
    {
      id: "twitter-style",
      name: "Twitter Style",
      description: "Social media-inspired testimonial cards. Familiar and authentic.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, md: 2, lg: 3 },
          gap: { base: "1rem" },
        },
      },
      supportedContent: ["title", "subtitle", "testimonials"],
      className: "",
    },
  ],

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "What Our Customers Say",
        validation: { maxLength: 80 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "Don't just take our word for it",
        validation: { maxLength: 120 },
      },
      {
        name: "testimonials",
        type: "array",
        label: "Testimonials",
        required: true,
        fields: [
          { name: "quote", type: "richtext", label: "Quote", required: true },
          { name: "author", type: "text", label: "Author Name", required: true },
          { name: "role", type: "text", label: "Role/Title" },
          { name: "company", type: "text", label: "Company" },
          {
            name: "avatar",
            type: "object",
            label: "Avatar",
            fields: [
              { name: "src", type: "text", label: "Image URL" },
              { name: "alt", type: "text", label: "Alt Text" },
            ],
          },
          {
            name: "rating",
            type: "number",
            label: "Rating (1-5)",
            validation: { min: 1, max: 5 },
          },
        ],
        validation: { minLength: 1, maxLength: 12 },
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.text.muted",
    "colors.background",
    "colors.surface",
    "colors.border",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.xl",
    "effects.borderRadius.lg",
    "effects.shadow.md",
  ],

  aiHints: {
    triggers: [
      "testimonials",
      "reviews",
      "customer feedback",
      "what people say",
      "social proof",
      "client quotes",
      "success stories",
    ],
    contentGuidelines: `
      - Quotes should be specific and authentic-sounding
      - Include author name and role for credibility
      - Use real photos when possible (or realistic avatars)
      - Ratings add extra trust signals
      - 3-6 testimonials is optimal
      - Vary the testimonial length for visual interest
    `,
    useCases: [
      "Customer reviews section",
      "Client success stories",
      "Product endorsements",
      "Service feedback",
      "Trust building",
    ],
    priority: 7,
  },
};
