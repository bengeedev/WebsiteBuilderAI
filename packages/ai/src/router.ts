import { BaseAIProvider, AIProviderError } from "./providers/base";
import { ClaudeProvider } from "./providers/claude";
import { OpenAIProvider } from "./providers/openai";
import type { AIRequest, AIResponse, AIProvider, AIModel, AI_MODELS } from "./types";

type RouterConfig = {
  defaultProvider: AIProvider;
  defaultModel: string;
  fallbackProviders?: AIProvider[];
  retryAttempts?: number;
  retryDelay?: number;
};

/**
 * AI Router - Routes requests to the appropriate AI provider
 * Handles fallbacks, retries, and model selection
 */
export class AIRouter {
  private providers: Map<AIProvider, BaseAIProvider> = new Map();
  private config: RouterConfig;

  constructor(config: Partial<RouterConfig> = {}) {
    this.config = {
      defaultProvider: config.defaultProvider || "claude",
      defaultModel: config.defaultModel || "claude-sonnet",
      fallbackProviders: config.fallbackProviders || ["openai"],
      retryAttempts: config.retryAttempts || 2,
      retryDelay: config.retryDelay || 1000,
    };

    this.initializeProviders();
  }

  /**
   * Initialize all available providers
   */
  private initializeProviders(): void {
    // Initialize Claude
    if (process.env.ANTHROPIC_API_KEY) {
      this.providers.set("claude", new ClaudeProvider());
    }

    // Initialize OpenAI
    if (process.env.OPENAI_API_KEY) {
      this.providers.set("openai", new OpenAIProvider());
    }

    // Future: Add Gemini, local models, etc.
  }

  /**
   * Get a specific provider
   */
  getProvider(provider: AIProvider): BaseAIProvider | undefined {
    return this.providers.get(provider);
  }

  /**
   * Get list of available providers
   */
  getAvailableProviders(): AIProvider[] {
    return Array.from(this.providers.keys());
  }

  /**
   * Check if a specific provider is available
   */
  isProviderAvailable(provider: AIProvider): boolean {
    const p = this.providers.get(provider);
    return p ? p.isConfigured() : false;
  }

  /**
   * Route a request to the appropriate provider with fallback support
   */
  async complete(request: AIRequest): Promise<AIResponse> {
    const providersToTry = this.getProvidersToTry(request.model);

    let lastError: Error | null = null;

    for (const providerName of providersToTry) {
      const provider = this.providers.get(providerName);
      if (!provider || !provider.isConfigured()) continue;

      for (let attempt = 0; attempt < this.config.retryAttempts!; attempt++) {
        try {
          return await provider.complete(request);
        } catch (error) {
          lastError = error as Error;

          // Don't retry non-retryable errors
          if (error instanceof AIProviderError && !error.retryable) {
            break;
          }

          // Wait before retrying
          if (attempt < this.config.retryAttempts! - 1) {
            await this.delay(this.config.retryDelay! * (attempt + 1));
          }
        }
      }
    }

    throw lastError || new Error("No AI providers available");
  }

  /**
   * Stream a request with fallback support
   */
  async *stream(request: AIRequest): AsyncGenerator<{ provider: AIProvider; chunk: unknown }> {
    const providersToTry = this.getProvidersToTry(request.model);

    for (const providerName of providersToTry) {
      const provider = this.providers.get(providerName);
      if (!provider || !provider.isConfigured()) continue;

      try {
        for await (const chunk of provider.stream(request)) {
          yield { provider: providerName, chunk };
        }
        return; // Successfully completed
      } catch (error) {
        // Try next provider
        console.error(`Provider ${providerName} failed:`, error);
        continue;
      }
    }

    throw new Error("No AI providers available for streaming");
  }

  /**
   * Get the ordered list of providers to try
   */
  private getProvidersToTry(modelId?: string): AIProvider[] {
    // If a specific model is requested, use its provider first
    if (modelId) {
      const modelInfo = this.getModelInfo(modelId);
      if (modelInfo) {
        const providers: AIProvider[] = [modelInfo.provider];
        // Add fallbacks that aren't the primary
        for (const fallback of this.config.fallbackProviders || []) {
          if (fallback !== modelInfo.provider) {
            providers.push(fallback);
          }
        }
        return providers;
      }
    }

    // Use default order
    return [this.config.defaultProvider, ...(this.config.fallbackProviders || [])];
  }

  /**
   * Get model info from model ID
   */
  private getModelInfo(modelId: string): AIModel | undefined {
    // Import dynamically to avoid circular dependency
    const models = require("./types").AI_MODELS as typeof AI_MODELS;
    return models[modelId];
  }

  /**
   * Helper to delay execution
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Select the best model for a given task
   */
  selectModel(options: {
    task: "generation" | "chat" | "analysis" | "quick";
    quality?: "high" | "medium" | "low";
    maxCost?: number;
  }): string {
    const { task, quality = "high" } = options;

    // Task-based model selection
    switch (task) {
      case "generation":
        // Site generation needs high quality
        return quality === "high" ? "claude-sonnet" : "claude-haiku";
      case "chat":
        // Chat can use faster models
        return quality === "high" ? "claude-sonnet" : "gpt-4o-mini";
      case "analysis":
        // Analysis might need more context
        return "claude-sonnet";
      case "quick":
        // Quick responses use fastest model
        return "claude-haiku";
      default:
        return this.config.defaultModel;
    }
  }
}

// Singleton instance
let routerInstance: AIRouter | null = null;

export function getAIRouter(): AIRouter {
  if (!routerInstance) {
    routerInstance = new AIRouter();
  }
  return routerInstance;
}
