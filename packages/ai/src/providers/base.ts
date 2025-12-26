import type { AIRequest, AIResponse, Tool, Message, StreamChunk } from "../types";

/**
 * Base class for all AI providers
 * Each provider (Claude, OpenAI, Gemini, etc.) extends this class
 */
export abstract class BaseAIProvider {
  protected apiKey: string;
  protected defaultModel: string;

  constructor(apiKey: string, defaultModel: string) {
    this.apiKey = apiKey;
    this.defaultModel = defaultModel;
  }

  /**
   * Send a completion request to the AI provider
   */
  abstract complete(request: AIRequest): Promise<AIResponse>;

  /**
   * Stream a completion request (returns async iterator)
   */
  abstract stream(request: AIRequest): AsyncGenerator<StreamChunk>;

  /**
   * Convert our universal tool format to provider-specific format
   */
  abstract formatTools(tools: Tool[]): unknown;

  /**
   * Convert our universal message format to provider-specific format
   */
  abstract formatMessages(messages: Message[]): unknown;

  /**
   * Get the provider name
   */
  abstract get providerName(): string;

  /**
   * Check if the provider is properly configured
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  /**
   * Helper to generate a unique ID for tool calls
   */
  protected generateId(): string {
    return `call_${Math.random().toString(36).substring(2, 15)}`;
  }
}

/**
 * Error thrown when an AI provider encounters an error
 */
export class AIProviderError extends Error {
  public readonly provider: string;
  public readonly statusCode?: number;
  public readonly retryable: boolean;

  constructor(
    message: string,
    provider: string,
    statusCode?: number,
    retryable = false
  ) {
    super(message);
    this.name = "AIProviderError";
    this.provider = provider;
    this.statusCode = statusCode;
    this.retryable = retryable;
  }
}
