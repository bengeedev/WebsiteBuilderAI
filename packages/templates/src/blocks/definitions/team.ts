/**
 * Team Block Definition
 *
 * Team member profiles and bios.
 */

import type { BlockType } from "../types";

export const teamBlock: BlockType = {
  id: "team",
  name: "Team",
  category: "content",
  description: "Team member profiles with photos, roles, and bios",
  icon: "users",

  variants: [
    {
      id: "grid",
      name: "Grid",
      description: "Team members in a grid layout",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, sm: 2, lg: 4 },
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "subtitle", "members"],
    },
    {
      id: "cards",
      name: "Cards",
      description: "Elevated cards with detailed info",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        grid: {
          columns: { base: 1, sm: 2, lg: 3 },
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "subtitle", "members"],
    },
    {
      id: "horizontal",
      name: "Horizontal",
      description: "Side-by-side photo and bio",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
      },
      supportedContent: ["title", "subtitle", "members"],
    },
    {
      id: "compact",
      name: "Compact",
      description: "Small avatars with names",
      layout: {
        container: "boxed",
        padding: { base: "3rem", md: "4rem", lg: "5rem" },
        flex: {
          direction: { base: "row" },
          align: "center",
          justify: "center",
          gap: { base: "2rem" },
        },
      },
      supportedContent: ["title", "subtitle", "members"],
    },
  ],

  defaultVariant: "grid",

  schema: {
    fields: [
      {
        name: "title",
        type: "text",
        label: "Section Title",
        placeholder: "Meet Our Team",
        validation: { maxLength: 60 },
      },
      {
        name: "subtitle",
        type: "text",
        label: "Subtitle",
        placeholder: "The people behind our success",
        validation: { maxLength: 120 },
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        validation: { maxLength: 300 },
      },
      {
        name: "members",
        type: "array",
        label: "Team Members",
        required: true,
        fields: [
          {
            name: "name",
            type: "text",
            label: "Name",
            required: true,
          },
          {
            name: "role",
            type: "text",
            label: "Role/Title",
            required: true,
            placeholder: "CEO & Founder",
          },
          {
            name: "bio",
            type: "text",
            label: "Short Bio",
            validation: { maxLength: 200 },
          },
          {
            name: "image",
            type: "image",
            label: "Photo",
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
                options: [
                  { label: "LinkedIn", value: "linkedin" },
                  { label: "Twitter", value: "twitter" },
                  { label: "Email", value: "email" },
                  { label: "Website", value: "website" },
                ],
              },
              { name: "url", type: "text", label: "URL" },
            ],
          },
        ],
        validation: { min: 1, max: 20 },
      },
      {
        name: "showSocial",
        type: "boolean",
        label: "Show Social Links",
        default: true,
      },
      {
        name: "showBio",
        type: "boolean",
        label: "Show Bio",
        default: true,
      },
    ],
  },

  styleTokens: [
    "colors.background",
    "colors.surface",
    "colors.text.primary",
    "colors.text.secondary",
    "colors.primary",
    "effects.borderRadius",
    "effects.shadow",
  ],

  aiHints: {
    triggers: [
      "team",
      "staff",
      "people",
      "about us",
      "our team",
      "founders",
      "leadership",
      "employees",
    ],
    contentGuidelines:
      "Use professional photos. Keep bios concise (1-2 sentences). Include relevant social links. Order by seniority or alphabetically.",
    useCases: [
      "Company about pages",
      "Agency team sections",
      "Startup founder intros",
      "Professional services",
      "Medical practice staff",
    ],
    priority: 7,
  },
};
