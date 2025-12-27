/**
 * AI System Prompt Builder
 *
 * Generates dynamic system prompts based on available capabilities
 * and current site state. Ensures AI always knows what it can do.
 */

import type { SiteState } from "../actions/executor";
import type { SectionContent } from "../types";
import type { Capability, UserContext } from "./types";
import { getAvailableCapabilities, capabilityGroups } from "./registry";

/**
 * Context for building the system prompt
 */
export type PromptContext = {
  /** User's context (plan, integrations, etc.) */
  userContext: UserContext;
  /** Current site state */
  siteState?: SiteState;
  /** Business information */
  businessInfo?: {
    name: string;
    type: string;
    description?: string;
  };
  /** Additional context or instructions */
  additionalContext?: string;
};

/**
 * Build the full system prompt for the AI
 */
export function buildSystemPrompt(context: PromptContext): string {
  const availableCapabilities = getAvailableCapabilities(context.userContext);

  const sections = [
    buildIdentitySection(),
    buildCapabilitiesSection(availableCapabilities),
    buildSiteStateSection(context.siteState),
    buildBusinessSection(context.businessInfo),
    buildInstructionsSection(),
    buildToolUsageSection(availableCapabilities),
    context.additionalContext ? `\n## Additional Context\n${context.additionalContext}` : "",
  ];

  return sections.filter(Boolean).join("\n\n");
}

/**
 * Build the identity section
 */
function buildIdentitySection(): string {
  return `# AI Webmaster

You are an AI webmaster assistant for a website builder. You help users create and customize their websites through natural conversation.

Your role is to:
- Understand what the user wants to achieve
- Use the available tools to make changes to their website
- Explain what you're doing in clear, friendly language
- Suggest improvements when you see opportunities
- Be proactive but not overwhelming`;
}

/**
 * Build the capabilities section
 */
function buildCapabilitiesSection(capabilities: Capability[]): string {
  const groupedCapabilities = new Map<string, Capability[]>();

  // Group by category
  for (const cap of capabilities) {
    const existing = groupedCapabilities.get(cap.category) || [];
    existing.push(cap);
    groupedCapabilities.set(cap.category, existing);
  }

  let content = `## Your Capabilities\n\nYou can help users with the following:\n`;

  for (const group of capabilityGroups) {
    const groupCaps = group.categories.flatMap(
      (cat) => groupedCapabilities.get(cat) || []
    );

    if (groupCaps.length === 0) continue;

    content += `\n### ${group.name}\n`;
    for (const cap of groupCaps) {
      const statusBadge = cap.status === "beta" ? " (Beta)" : "";
      content += `- **${cap.name}**${statusBadge}: ${cap.description}\n`;
    }
  }

  // List coming soon features
  const comingSoon = capabilities.filter((c) => c.status === "coming_soon");
  if (comingSoon.length > 0) {
    content += `\n### Coming Soon\n`;
    for (const cap of comingSoon) {
      content += `- ${cap.name}: ${cap.description}\n`;
    }
    content += `\nFor these features, acknowledge the user's request and let them know it's coming soon.`;
  }

  return content;
}

/**
 * Build the current site state section
 */
function buildSiteStateSection(siteState?: SiteState): string {
  if (!siteState) {
    return "";
  }

  const sectionList = siteState.sections
    .map((s: SectionContent) => `  - ${s.type}: "${s.title}"`)
    .join("\n");

  return `## Current Website State

### Sections (${siteState.sections.length} total)
${sectionList || "  No sections yet"}

### Styles
- Primary Color: ${siteState.styles.primaryColor}
- Secondary Color: ${siteState.styles.secondaryColor}
${siteState.styles.accentColor ? `- Accent Color: ${siteState.styles.accentColor}` : ""}
${siteState.styles.headingFont ? `- Heading Font: ${siteState.styles.headingFont}` : ""}
${siteState.styles.bodyFont ? `- Body Font: ${siteState.styles.bodyFont}` : ""}

### Page Meta
- Title: ${siteState.meta.title}
- Description: ${siteState.meta.description}

Use this information to understand the current state and make appropriate changes.`;
}

/**
 * Build the business information section
 */
function buildBusinessSection(
  businessInfo?: PromptContext["businessInfo"]
): string {
  if (!businessInfo) {
    return "";
  }

  return `## Business Information

- **Name:** ${businessInfo.name}
- **Type:** ${businessInfo.type}
${businessInfo.description ? `- **Description:** ${businessInfo.description}` : ""}

Keep the business context in mind when generating content or making suggestions.`;
}

/**
 * Build the instructions section
 */
function buildInstructionsSection(): string {
  return `## How to Help Users

1. **Understand the Request**
   - Parse what the user wants to achieve
   - If unclear, ask for clarification
   - Consider the context of their business

2. **Take Action**
   - Use the appropriate tool to make changes
   - Make one logical change at a time
   - Confirm what you did after each action

3. **Be Proactive**
   - Suggest improvements when relevant
   - Point out opportunities to enhance the site
   - But don't overwhelm with too many suggestions

4. **Communicate Clearly**
   - Use simple, friendly language
   - Explain technical concepts when needed
   - Summarize changes in user-friendly terms

## Response Format

When you make changes:
1. Briefly acknowledge what the user asked for
2. Use the appropriate tool to make the change
3. Confirm what was done
4. Optionally suggest related improvements

When you can't do something:
1. Explain why (feature coming soon, requires upgrade, etc.)
2. Suggest alternatives if available
3. Be helpful and positive`;
}

/**
 * Build the tool usage section
 */
function buildToolUsageSection(capabilities: Capability[]): string {
  const toolCapabilities = capabilities.filter(
    (c) => c.toolName && c.status !== "coming_soon"
  );

  if (toolCapabilities.length === 0) {
    return "";
  }

  let content = `## Tool Usage Guidelines\n`;

  // Group tools by category for better organization
  const categories = new Map<string, Capability[]>();
  for (const cap of toolCapabilities) {
    const existing = categories.get(cap.category) || [];
    existing.push(cap);
    categories.set(cap.category, existing);
  }

  for (const [category, caps] of categories) {
    content += `\n### ${category.charAt(0).toUpperCase() + category.slice(1)} Tools\n`;
    for (const cap of caps) {
      content += `\n**${cap.toolName}**\n`;
      content += `Use when: ${cap.triggers.slice(0, 3).join(", ")}\n`;
      if (cap.examples && cap.examples.length > 0) {
        content += `Examples:\n`;
        for (const example of cap.examples.slice(0, 2)) {
          content += `  - "${example}"\n`;
        }
      }
    }
  }

  return content;
}

/**
 * Build a minimal prompt for quick operations
 */
export function buildMinimalPrompt(capabilities: Capability[]): string {
  const capList = capabilities
    .filter((c) => c.status === "active" && c.toolName)
    .map((c) => `- ${c.name}: ${c.toolName}`)
    .join("\n");

  return `You are an AI webmaster. Available tools:\n${capList}\n\nExecute the user's request using the appropriate tool.`;
}

/**
 * Build a prompt for the onboarding wizard suggestions
 */
export function buildOnboardingSuggestionPrompt(
  field: string,
  currentValue: string,
  businessContext: { type: string; name: string; description?: string }
): string {
  return `You are helping a user set up their website for "${businessContext.name}", a ${businessContext.type} business.

${businessContext.description ? `Business description: ${businessContext.description}` : ""}

The user needs help with the "${field}" field.
${currentValue ? `Current value: "${currentValue}"` : "This field is currently empty."}

Provide 3 suggestions for this field that would work well for this type of business. Each suggestion should be:
- Professional and compelling
- Appropriate for the business type
- Unique and creative

Return only the suggestions, one per line, no numbering or extra text.`;
}

/**
 * Build a prompt for analyzing SEO
 */
export function buildSEOAnalysisPrompt(siteState: SiteState): string {
  const sectionTypes = siteState.sections.map((s) => s.type).join(", ");

  return `Analyze the SEO of this website:

Title: ${siteState.meta.title}
Description: ${siteState.meta.description}
Sections: ${sectionTypes}

Provide:
1. Current SEO score (1-100)
2. Top 3 issues to fix
3. Top 3 recommendations
4. Quick wins that can be done right now

Be specific and actionable.`;
}

/**
 * Build a prompt for content improvement
 */
export function buildContentImprovementPrompt(
  section: SectionContent,
  style: "professional" | "casual" | "compelling" | "concise"
): string {
  return `Improve this ${section.type} section content to be more ${style}:

Title: ${section.title}
${section.subtitle ? `Subtitle: ${section.subtitle}` : ""}
${section.content ? `Content: ${section.content}` : ""}

Provide improved versions that:
- Maintain the same meaning and information
- Are more ${style} in tone
- Are optimized for web readability
- Include strong calls-to-action where appropriate

Return the improved content in the same format (title, subtitle, content).`;
}
