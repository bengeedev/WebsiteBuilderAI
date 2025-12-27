/**
 * Contact Block Definition
 *
 * Contact information and form section.
 * Enable visitors to get in touch.
 */

import type { BlockType } from "../types";

export const contactBlock: BlockType = {
  id: "contact",
  name: "Contact",
  category: "content",
  description: "Contact section with information and optional form. Make it easy for visitors to reach you.",
  icon: "mail",

  defaultVariant: "split",

  variants: [
    {
      id: "split",
      name: "Split Layout",
      description: "Contact info on one side, form on the other. Balanced and comprehensive.",
      layout: {
        container: "boxed",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "2rem", lg: "4rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "email", "phone", "address", "socialLinks", "formFields"],
      className: "",
    },
    {
      id: "centered-form",
      name: "Centered Form",
      description: "Focused contact form with minimal info. Clean and direct.",
      layout: {
        container: "narrow",
        padding: { base: "py-12 px-4", md: "py-16 px-8", lg: "py-20" },
        flex: {
          direction: { base: "column" },
          align: "center",
          justify: "start",
          gap: { base: "2rem", md: "2.5rem" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "formFields"],
      className: "text-center",
    },
    {
      id: "info-only",
      name: "Info Only",
      description: "Contact information without form. Simple and straightforward.",
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
      supportedContent: ["title", "subtitle", "description", "email", "phone", "address", "socialLinks", "mapUrl"],
      className: "text-center",
    },
    {
      id: "with-map",
      name: "With Map",
      description: "Contact info alongside an embedded map. Great for physical locations.",
      layout: {
        container: "full",
        padding: { base: "py-0", md: "py-0" },
        grid: {
          columns: { base: 1, lg: 2 },
          gap: { base: "0" },
        },
      },
      supportedContent: ["title", "subtitle", "description", "email", "phone", "address", "socialLinks", "mapUrl", "formFields"],
      className: "",
    },
  ],

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Get in Touch",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "We'd love to hear from you",
        validation: { maxLength: 100 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "Have questions? Fill out the form and we'll get back to you within 24 hours.",
        validation: { maxLength: 300 },
      },
      {
        name: "email",
        type: "text",
        label: "Email Address",
        placeholder: "hello@example.com",
        validation: { pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" },
      },
      {
        name: "phone",
        type: "text",
        label: "Phone Number",
        placeholder: "+1 (555) 123-4567",
      },
      {
        name: "address",
        type: "text",
        label: "Address",
        placeholder: "123 Main St, City, State 12345",
        validation: { maxLength: 200 },
      },
      {
        name: "mapUrl",
        type: "text",
        label: "Google Maps Embed URL",
        placeholder: "https://www.google.com/maps/embed?...",
      },
      {
        name: "socialLinks",
        type: "array",
        label: "Social Links",
        fields: [
          {
            name: "platform",
            type: "select",
            label: "Platform",
            required: true,
            options: [
              { label: "Facebook", value: "facebook" },
              { label: "Twitter/X", value: "twitter" },
              { label: "Instagram", value: "instagram" },
              { label: "LinkedIn", value: "linkedin" },
              { label: "YouTube", value: "youtube" },
              { label: "TikTok", value: "tiktok" },
            ],
          },
          { name: "url", type: "text", label: "Profile URL", required: true },
        ],
        validation: { maxLength: 8 },
      },
      {
        name: "formFields",
        type: "array",
        label: "Form Fields",
        fields: [
          {
            name: "type",
            type: "select",
            label: "Field Type",
            required: true,
            options: [
              { label: "Text", value: "text" },
              { label: "Email", value: "email" },
              { label: "Phone", value: "phone" },
              { label: "Text Area", value: "textarea" },
              { label: "Select", value: "select" },
            ],
          },
          { name: "name", type: "text", label: "Field Name", required: true },
          { name: "label", type: "text", label: "Label", required: true },
          { name: "placeholder", type: "text", label: "Placeholder" },
          { name: "required", type: "boolean", label: "Required" },
          { name: "options", type: "text", label: "Options (comma-separated, for select)" },
        ],
        validation: { maxLength: 10 },
        default: [
          { type: "text", name: "name", label: "Name", required: true },
          { type: "email", name: "email", label: "Email", required: true },
          { type: "textarea", name: "message", label: "Message", required: true },
        ],
      },
    ],
  },

  styleTokens: [
    "colors.primary",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.background",
    "colors.surface",
    "colors.border",
    "typography.fontFamily.heading",
    "typography.fontFamily.body",
    "typography.fontSize.2xl",
    "effects.borderRadius.md",
    "effects.shadow.sm",
    "spacing.gap.md",
  ],

  aiHints: {
    triggers: [
      "contact",
      "get in touch",
      "reach us",
      "contact form",
      "email",
      "phone",
      "location",
      "message us",
    ],
    contentGuidelines: `
      - Title should be welcoming and inviting
      - Include multiple contact methods when possible
      - Form should ask only necessary questions
      - Add social links for alternative contact
      - Use map for physical locations
    `,
    useCases: [
      "Contact page section",
      "Footer contact info",
      "Support page",
      "Location page",
      "Inquiry form",
    ],
    priority: 8,
  },
};
