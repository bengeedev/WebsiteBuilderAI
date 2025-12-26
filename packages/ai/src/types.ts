// ============================================
// Core AI Types - Provider Agnostic
// ============================================

export type AIProvider = "claude" | "openai" | "gemini" | "local";

export type AIModel = {
  provider: AIProvider;
  modelId: string;
  name: string;
  contextWindow: number;
  maxOutput: number;
  costPer1kInput: number;
  costPer1kOutput: number;
  supportsTools: boolean;
  supportsVision: boolean;
  speed: "fast" | "medium" | "slow";
  quality: "high" | "medium" | "low";
};

// Available models registry
export const AI_MODELS: Record<string, AIModel> = {
  // Claude Models
  "claude-sonnet": {
    provider: "claude",
    modelId: "claude-sonnet-4-20250514",
    name: "Claude Sonnet",
    contextWindow: 200000,
    maxOutput: 8192,
    costPer1kInput: 0.003,
    costPer1kOutput: 0.015,
    supportsTools: true,
    supportsVision: true,
    speed: "fast",
    quality: "high",
  },
  "claude-opus": {
    provider: "claude",
    modelId: "claude-opus-4-20250514",
    name: "Claude Opus",
    contextWindow: 200000,
    maxOutput: 8192,
    costPer1kInput: 0.015,
    costPer1kOutput: 0.075,
    supportsTools: true,
    supportsVision: true,
    speed: "slow",
    quality: "high",
  },
  "claude-haiku": {
    provider: "claude",
    modelId: "claude-3-5-haiku-20241022",
    name: "Claude Haiku",
    contextWindow: 200000,
    maxOutput: 8192,
    costPer1kInput: 0.0008,
    costPer1kOutput: 0.004,
    supportsTools: true,
    supportsVision: true,
    speed: "fast",
    quality: "medium",
  },
  // OpenAI Models
  "gpt-4o": {
    provider: "openai",
    modelId: "gpt-4o",
    name: "GPT-4o",
    contextWindow: 128000,
    maxOutput: 4096,
    costPer1kInput: 0.005,
    costPer1kOutput: 0.015,
    supportsTools: true,
    supportsVision: true,
    speed: "fast",
    quality: "high",
  },
  "gpt-4o-mini": {
    provider: "openai",
    modelId: "gpt-4o-mini",
    name: "GPT-4o Mini",
    contextWindow: 128000,
    maxOutput: 16384,
    costPer1kInput: 0.00015,
    costPer1kOutput: 0.0006,
    supportsTools: true,
    supportsVision: true,
    speed: "fast",
    quality: "medium",
  },
  // Google Models
  "gemini-pro": {
    provider: "gemini",
    modelId: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    contextWindow: 1000000,
    maxOutput: 8192,
    costPer1kInput: 0.00125,
    costPer1kOutput: 0.005,
    supportsTools: true,
    supportsVision: true,
    speed: "medium",
    quality: "high",
  },
};

// ============================================
// Message Types
// ============================================

export type MessageRole = "user" | "assistant" | "system";

export type Message = {
  role: MessageRole;
  content: string;
};

export type ToolCall = {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
};

export type AIResponse = {
  content: string;
  toolCalls?: ToolCall[];
  model: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
  finishReason: "stop" | "tool_use" | "max_tokens" | "error";
};

// ============================================
// Tool/Function Definitions
// ============================================

export type ToolParameter = {
  type: "string" | "number" | "boolean" | "object" | "array";
  description: string;
  required?: boolean;
  enum?: string[];
  items?: ToolParameter;
  properties?: Record<string, ToolParameter>;
};

export type Tool = {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
  requiredParams: string[];
};

// ============================================
// Request/Response Types
// ============================================

export type AIRequest = {
  messages: Message[];
  system?: string;
  model?: string;
  tools?: Tool[];
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
};

export type StreamChunk = {
  type: "text" | "tool_use" | "done";
  content?: string;
  toolCall?: ToolCall;
};

// ============================================
// Site Content Types (for generation)
// ============================================

export type SectionType =
  | "hero"
  | "about"
  | "features"
  | "services"
  | "menu"
  | "portfolio"
  | "gallery"
  | "testimonials"
  | "team"
  | "pricing"
  | "contact"
  | "cta"
  | "newsletter"
  | "faq"
  | "blog";

export type SectionContent = {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    price?: string;
    image?: string;
  }>;
  cta?: {
    text: string;
    url?: string;
  };
  styles?: Record<string, string>;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  sections: SectionContent[];
};

export type GenerateInput = {
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessTagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
};
