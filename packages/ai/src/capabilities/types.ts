/**
 * AI Capabilities Registry - Type Definitions
 *
 * The central type system for all AI capabilities.
 * Ensures the AI always knows what it can do.
 */

/**
 * Categories of AI capabilities
 */
export type CapabilityCategory =
  | "content" // Add/edit text, sections
  | "design" // Colors, fonts, layouts
  | "media" // Images, videos, logos
  | "structure" // Pages, navigation
  | "seo" // Meta, sitemap, analytics
  | "integrations" // Forms, payments, email
  | "publishing" // Domain, hosting, SSL
  | "ai_generate"; // AI content/image generation

/**
 * Capability status
 */
export type CapabilityStatus = "active" | "beta" | "coming_soon" | "deprecated";

/**
 * User plan tiers
 */
export type PlanTier = "free" | "pro" | "enterprise";

/**
 * Requirements for a capability to be available
 */
export type CapabilityRequirements = {
  /** Minimum plan required */
  plan?: PlanTier;
  /** Required assets to be present */
  assets?: string[];
  /** Required integrations to be connected */
  integrations?: string[];
  /** Required feature flags to be enabled */
  featureFlags?: string[];
};

/**
 * A single AI capability
 */
export type Capability = {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Detailed description for AI context */
  description: string;
  /** Category for organization */
  category: CapabilityCategory;
  /** Current status */
  status: CapabilityStatus;

  /** Keywords/phrases that trigger this capability */
  triggers: string[];

  /** Requirements to use this capability */
  requirements?: CapabilityRequirements;

  /** Name of the tool to call (if any) */
  toolName?: string;

  /** UI component to render (if capability requires UI) */
  uiComponent?: string;

  /** Example prompts for AI to understand usage */
  examples?: string[];

  /** Related capability IDs */
  relatedCapabilities?: string[];

  /** Priority for capability matching (higher = more specific) */
  priority?: number;
};

/**
 * Capability groups for UI organization
 */
export type CapabilityGroup = {
  id: string;
  name: string;
  description: string;
  categories: CapabilityCategory[];
  icon?: string;
};

/**
 * User context for capability filtering
 */
export type UserContext = {
  plan: PlanTier;
  connectedIntegrations: string[];
  availableAssets: string[];
  enabledFeatureFlags: string[];
};

/**
 * Result of matching a user request to capabilities
 */
export type CapabilityMatch = {
  capability: Capability;
  confidence: number;
  matchedTriggers: string[];
};
