// Site generation
export { generateSiteContent } from "./generate";

// Types
export type {
  SiteContent,
  SectionContent,
  SectionType,
  AIRequest,
  AIResponse,
  AIProvider,
  AIModel,
  Tool,
  ToolCall,
  Message,
  StreamChunk,
} from "./types";
export { AI_MODELS } from "./types";

// Providers
export { BaseAIProvider, AIProviderError } from "./providers/base";
export { ClaudeProvider } from "./providers/claude";
export { OpenAIProvider } from "./providers/openai";

// DALL-E Image Generation
export {
  isDalleConfigured,
  generateImage,
  generateHeroImage,
  generateSectionImage,
  generateLogo,
  generateLogoVariations,
  type ImageStyle,
  type ImageQuality,
  type ImageSize,
  type GenerateImageOptions,
  type GeneratedImage,
  type GenerateImageResult,
} from "./providers/dalle";

// Runway ML Video Generation
export {
  isRunwayConfigured,
  startVideoGeneration,
  checkVideoStatus,
  waitForVideo,
  generateHeroVideo,
  animateImage,
  type VideoAspectRatio,
  type VideoDuration,
  type VideoStyle,
  type GenerateVideoOptions,
  type VideoGenerationTask,
} from "./providers/runway";

// Router
export { AIRouter, getAIRouter } from "./router";

// Tools
export { siteTools, blogTools, socialTools, allTools } from "./tools/site-tools";

// Actions
export { ActionExecutor } from "./actions/executor";
export type { ActionResult, SiteState } from "./actions/executor";

// Capabilities Registry
export {
  // Types
  type Capability,
  type CapabilityCategory,
  type CapabilityStatus,
  type CapabilityRequirements,
  type CapabilityGroup,
  type CapabilityMatch,
  type UserContext,
  type PlanTier,
  type PromptContext,
  // Registry
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
  // Prompt Builder
  buildSystemPrompt,
  buildMinimalPrompt,
  buildOnboardingSuggestionPrompt,
  buildSEOAnalysisPrompt,
  buildContentImprovementPrompt,
} from "./capabilities";

// Memory Services
export {
  UserMemoryService,
  ProjectMemoryService,
  SessionMemoryService,
  MemoryContextBuilder,
  // Types
  type StylePreferences,
  type BusinessContext,
  type InteractionPatterns,
  type DecisionRecord,
  type UserMemoryData,
  type BusinessDetails,
  type DesignDecision,
  type ContentVersion,
  type SiteGoal,
  type DiscoveredInfo,
  type ProjectMemoryData,
  type SessionTaskStatus,
  type SessionTask,
  type PendingQuestion,
  type WIPState,
  type SessionMemoryData,
  type AIMemoryContext,
  type MessageRole,
  type ChatMessageData,
} from "./memory";

// Pipeline
export {
  PipelineOrchestrator,
  InputValidator,
  PIPELINE_STEPS,
  INPUT_REQUIREMENTS,
  BUSINESS_TYPE_DEFAULTS,
  FONT_RECOMMENDATIONS,
  type OrchestratorConfig,
  type ValidationResult,
  type PipelineStep,
  type PipelineState,
  type PipelineEvent,
  type StepConfig,
  type InputRequirement,
  type FallbackStrategy,
} from "./pipeline";
