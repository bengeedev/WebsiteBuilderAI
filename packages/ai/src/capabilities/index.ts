/**
 * AI Capabilities Module
 *
 * Central registry of all AI capabilities. The AI uses this
 * to know what it can do and to build dynamic system prompts.
 */

// Types
export type {
  Capability,
  CapabilityCategory,
  CapabilityStatus,
  CapabilityRequirements,
  CapabilityGroup,
  CapabilityMatch,
  UserContext,
  PlanTier,
} from "./types";

// Registry
export {
  capabilities,
  capabilityGroups,
  getCapability,
  getCapabilitiesByCategory,
  getCapabilitiesByStatus,
  getActiveCapabilities,
  getAvailableCapabilities,
  matchCapabilities,
  getCapabilityToolName,
  capabilityRequiresUI,
} from "./registry";

// Prompt Builder
export type { PromptContext } from "./prompt-builder";
export {
  buildSystemPrompt,
  buildMinimalPrompt,
  buildOnboardingSuggestionPrompt,
  buildSEOAnalysisPrompt,
  buildContentImprovementPrompt,
} from "./prompt-builder";
