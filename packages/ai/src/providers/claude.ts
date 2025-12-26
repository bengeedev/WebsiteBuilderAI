import Anthropic from "@anthropic-ai/sdk";
import { BaseAIProvider, AIProviderError } from "./base";
import type { AIRequest, AIResponse, Tool, Message, StreamChunk } from "../types";

/**
 * Claude (Anthropic) AI Provider
 */
export class ClaudeProvider extends BaseAIProvider {
  private client: Anthropic;

  constructor(apiKey?: string, defaultModel = "claude-sonnet-4-20250514") {
    super(apiKey || process.env.ANTHROPIC_API_KEY || "", defaultModel);
    this.client = new Anthropic({ apiKey: this.apiKey });
  }

  get providerName(): string {
    return "claude";
  }

  /**
   * Convert our universal tool format to Anthropic's format
   */
  formatTools(tools: Tool[]): Anthropic.Tool[] {
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      input_schema: {
        type: "object" as const,
        properties: Object.fromEntries(
          Object.entries(tool.parameters).map(([key, param]) => [
            key,
            {
              type: param.type,
              description: param.description,
              ...(param.enum ? { enum: param.enum } : {}),
            },
          ])
        ),
        required: tool.requiredParams,
      },
    }));
  }

  /**
   * Convert our universal message format to Anthropic's format
   */
  formatMessages(messages: Message[]): Anthropic.MessageParam[] {
    return messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
  }

  /**
   * Send a completion request to Claude
   */
  async complete(request: AIRequest): Promise<AIResponse> {
    try {
      const response = await this.client.messages.create({
        model: request.model || this.defaultModel,
        max_tokens: request.maxTokens || 4096,
        system: request.system,
        messages: this.formatMessages(request.messages),
        ...(request.tools && request.tools.length > 0
          ? { tools: this.formatTools(request.tools) }
          : {}),
        ...(request.temperature !== undefined
          ? { temperature: request.temperature }
          : {}),
      });

      // Extract text content
      const textBlock = response.content.find((block) => block.type === "text");
      const text = textBlock?.type === "text" ? textBlock.text : "";

      // Extract tool calls
      const toolCalls = response.content
        .filter((block) => block.type === "tool_use")
        .map((block) => {
          if (block.type === "tool_use") {
            return {
              id: block.id,
              name: block.name,
              arguments: block.input as Record<string, unknown>,
            };
          }
          return null;
        })
        .filter(Boolean) as AIResponse["toolCalls"];

      return {
        content: text,
        toolCalls: toolCalls?.length ? toolCalls : undefined,
        model: response.model,
        usage: {
          inputTokens: response.usage.input_tokens,
          outputTokens: response.usage.output_tokens,
        },
        finishReason:
          response.stop_reason === "tool_use"
            ? "tool_use"
            : response.stop_reason === "max_tokens"
              ? "max_tokens"
              : "stop",
      };
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        const status = error.status ?? 0;
        throw new AIProviderError(
          error.message,
          "claude",
          status,
          status === 429 || status >= 500
        );
      }
      throw error;
    }
  }

  /**
   * Stream a completion request from Claude
   */
  async *stream(request: AIRequest): AsyncGenerator<StreamChunk> {
    try {
      const stream = this.client.messages.stream({
        model: request.model || this.defaultModel,
        max_tokens: request.maxTokens || 4096,
        system: request.system,
        messages: this.formatMessages(request.messages),
        ...(request.tools && request.tools.length > 0
          ? { tools: this.formatTools(request.tools) }
          : {}),
      });

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          yield {
            type: "text",
            content: event.delta.text,
          };
        } else if (
          event.type === "content_block_start" &&
          event.content_block.type === "tool_use"
        ) {
          // Tool use started - we'll need to accumulate the input
          yield {
            type: "tool_use",
            toolCall: {
              id: event.content_block.id,
              name: event.content_block.name,
              arguments: {},
            },
          };
        } else if (event.type === "message_stop") {
          yield { type: "done" };
        }
      }
    } catch (error) {
      if (error instanceof Anthropic.APIError) {
        const status = error.status ?? 0;
        throw new AIProviderError(
          error.message,
          "claude",
          status,
          status === 429 || status >= 500
        );
      }
      throw error;
    }
  }
}
