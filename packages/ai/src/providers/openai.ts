import OpenAI from "openai";
import { BaseAIProvider, AIProviderError } from "./base";
import type { AIRequest, AIResponse, Tool, Message, StreamChunk } from "../types";

/**
 * OpenAI AI Provider (GPT-4, GPT-4o, etc.)
 */
export class OpenAIProvider extends BaseAIProvider {
  private client: OpenAI;

  constructor(apiKey?: string, defaultModel = "gpt-4o") {
    super(apiKey || process.env.OPENAI_API_KEY || "", defaultModel);
    this.client = new OpenAI({ apiKey: this.apiKey });
  }

  get providerName(): string {
    return "openai";
  }

  /**
   * Convert our universal tool format to OpenAI's format
   */
  formatTools(tools: Tool[]): OpenAI.Chat.ChatCompletionTool[] {
    return tools.map((tool) => ({
      type: "function" as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: {
          type: "object",
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
      },
    }));
  }

  /**
   * Convert our universal message format to OpenAI's format
   */
  formatMessages(
    messages: Message[],
    systemPrompt?: string
  ): OpenAI.Chat.ChatCompletionMessageParam[] {
    const formatted: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    // Add system message if provided
    if (systemPrompt) {
      formatted.push({
        role: "system",
        content: systemPrompt,
      });
    }

    // Add other messages
    for (const message of messages) {
      if (message.role === "system") {
        formatted.push({
          role: "system",
          content: message.content,
        });
      } else if (message.role === "user") {
        formatted.push({
          role: "user",
          content: message.content,
        });
      } else if (message.role === "assistant") {
        formatted.push({
          role: "assistant",
          content: message.content,
        });
      }
    }

    return formatted;
  }

  /**
   * Send a completion request to OpenAI
   */
  async complete(request: AIRequest): Promise<AIResponse> {
    try {
      const response = await this.client.chat.completions.create({
        model: request.model || this.defaultModel,
        max_tokens: request.maxTokens || 4096,
        messages: this.formatMessages(request.messages, request.system),
        ...(request.tools && request.tools.length > 0
          ? { tools: this.formatTools(request.tools) }
          : {}),
        ...(request.temperature !== undefined
          ? { temperature: request.temperature }
          : {}),
      });

      const choice = response.choices[0];
      const message = choice.message;

      // Extract tool calls
      const toolCalls = message.tool_calls?.map((tc) => ({
        id: tc.id,
        name: tc.function.name,
        arguments: JSON.parse(tc.function.arguments) as Record<string, unknown>,
      }));

      return {
        content: message.content || "",
        toolCalls: toolCalls?.length ? toolCalls : undefined,
        model: response.model,
        usage: response.usage
          ? {
              inputTokens: response.usage.prompt_tokens,
              outputTokens: response.usage.completion_tokens,
            }
          : undefined,
        finishReason:
          choice.finish_reason === "tool_calls"
            ? "tool_use"
            : choice.finish_reason === "length"
              ? "max_tokens"
              : "stop",
      };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new AIProviderError(
          error.message,
          "openai",
          error.status,
          error.status === 429 || (error.status ?? 0) >= 500
        );
      }
      throw error;
    }
  }

  /**
   * Stream a completion request from OpenAI
   */
  async *stream(request: AIRequest): AsyncGenerator<StreamChunk> {
    try {
      const stream = await this.client.chat.completions.create({
        model: request.model || this.defaultModel,
        max_tokens: request.maxTokens || 4096,
        messages: this.formatMessages(request.messages, request.system),
        ...(request.tools && request.tools.length > 0
          ? { tools: this.formatTools(request.tools) }
          : {}),
        stream: true,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;

        if (delta?.content) {
          yield {
            type: "text",
            content: delta.content,
          };
        }

        if (delta?.tool_calls) {
          for (const toolCall of delta.tool_calls) {
            if (toolCall.function?.name) {
              yield {
                type: "tool_use",
                toolCall: {
                  id: toolCall.id || this.generateId(),
                  name: toolCall.function.name,
                  arguments: toolCall.function.arguments
                    ? JSON.parse(toolCall.function.arguments)
                    : {},
                },
              };
            }
          }
        }

        if (chunk.choices[0]?.finish_reason) {
          yield { type: "done" };
        }
      }
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new AIProviderError(
          error.message,
          "openai",
          error.status,
          error.status === 429 || (error.status ?? 0) >= 500
        );
      }
      throw error;
    }
  }
}
