/**
 * Block Registry
 *
 * Central registry of all available blocks. The registry provides:
 * - Block type lookup
 * - Variant lookup
 * - Content validation
 * - Category-based filtering
 */

import type {
  BlockType,
  BlockVariant,
  BlockCategory,
  BlockInstance,
  ValidationResult,
  ValidationError,
} from "./types";

// Import block definitions (will be added as we implement each block)
import { heroBlock } from "./definitions/hero";
import { textWithImageBlock } from "./definitions/text-with-image";
import { featuresBlock } from "./definitions/features";
import { testimonialsBlock } from "./definitions/testimonials";
import { ctaBlock } from "./definitions/cta";
import { contactBlock } from "./definitions/contact";
import { footerBlock } from "./definitions/footer";

// ============================================
// REGISTRY
// ============================================

/** Central registry of all block types */
export const blockRegistry = new Map<string, BlockType>();

// Register all blocks
const allBlocks: BlockType[] = [
  heroBlock,
  textWithImageBlock,
  featuresBlock,
  testimonialsBlock,
  ctaBlock,
  contactBlock,
  footerBlock,
];

for (const block of allBlocks) {
  blockRegistry.set(block.id, block);
}

// ============================================
// LOOKUP FUNCTIONS
// ============================================

/**
 * Get a block type by ID
 */
export function getBlock(id: string): BlockType | undefined {
  return blockRegistry.get(id);
}

/**
 * Get a block type by ID, throwing if not found
 */
export function getBlockOrThrow(id: string): BlockType {
  const block = blockRegistry.get(id);
  if (!block) {
    throw new Error(`Block type not found: ${id}`);
  }
  return block;
}

/**
 * Get all registered blocks
 */
export function getAllBlocks(): BlockType[] {
  return Array.from(blockRegistry.values());
}

/**
 * Get blocks filtered by category
 */
export function getBlocksByCategory(category: BlockCategory): BlockType[] {
  return Array.from(blockRegistry.values()).filter(
    (block) => block.category === category
  );
}

/**
 * Get a specific variant of a block
 */
export function getVariant(
  blockId: string,
  variantId: string
): BlockVariant | undefined {
  const block = blockRegistry.get(blockId);
  if (!block) return undefined;
  return block.variants.find((v) => v.id === variantId);
}

/**
 * Get a variant, throwing if not found
 */
export function getVariantOrThrow(
  blockId: string,
  variantId: string
): BlockVariant {
  const block = getBlockOrThrow(blockId);
  const variant = block.variants.find((v) => v.id === variantId);
  if (!variant) {
    throw new Error(`Variant not found: ${variantId} for block ${blockId}`);
  }
  return variant;
}

/**
 * Get the default variant for a block
 */
export function getDefaultVariant(blockId: string): BlockVariant | undefined {
  const block = blockRegistry.get(blockId);
  if (!block) return undefined;
  return block.variants.find((v) => v.id === block.defaultVariant);
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate block instance content against its schema
 */
export function validateBlockContent(
  blockId: string,
  content: Record<string, unknown>
): ValidationResult {
  const block = blockRegistry.get(blockId);
  if (!block) {
    return {
      valid: false,
      errors: [{ field: "_block", message: `Unknown block type: ${blockId}` }],
    };
  }

  const errors: ValidationError[] = [];

  for (const field of block.schema.fields) {
    const value = content[field.name];

    // Check required fields
    if (field.required && (value === undefined || value === null || value === "")) {
      errors.push({
        field: field.name,
        message: `${field.label} is required`,
      });
      continue;
    }

    // Skip validation if field is empty and not required
    if (value === undefined || value === null) continue;

    // Type-specific validation
    if (field.validation) {
      if (field.type === "text" || field.type === "richtext") {
        const strValue = String(value);
        if (field.validation.minLength && strValue.length < field.validation.minLength) {
          errors.push({
            field: field.name,
            message: `${field.label} must be at least ${field.validation.minLength} characters`,
          });
        }
        if (field.validation.maxLength && strValue.length > field.validation.maxLength) {
          errors.push({
            field: field.name,
            message: `${field.label} must be at most ${field.validation.maxLength} characters`,
          });
        }
        if (field.validation.pattern && !new RegExp(field.validation.pattern).test(strValue)) {
          errors.push({
            field: field.name,
            message: `${field.label} has invalid format`,
          });
        }
      }

      if (field.type === "number") {
        const numValue = Number(value);
        if (field.validation.min !== undefined && numValue < field.validation.min) {
          errors.push({
            field: field.name,
            message: `${field.label} must be at least ${field.validation.min}`,
          });
        }
        if (field.validation.max !== undefined && numValue > field.validation.max) {
          errors.push({
            field: field.name,
            message: `${field.label} must be at most ${field.validation.max}`,
          });
        }
      }

      if (field.type === "array" && Array.isArray(value)) {
        if (field.validation.minLength && value.length < field.validation.minLength) {
          errors.push({
            field: field.name,
            message: `${field.label} must have at least ${field.validation.minLength} items`,
          });
        }
        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          errors.push({
            field: field.name,
            message: `${field.label} must have at most ${field.validation.maxLength} items`,
          });
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate a complete block instance
 */
export function validateBlockInstance(instance: BlockInstance): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate block type exists
  const block = blockRegistry.get(instance.blockType);
  if (!block) {
    errors.push({
      field: "blockType",
      message: `Unknown block type: ${instance.blockType}`,
    });
    return { valid: false, errors };
  }

  // Validate variant exists
  const variant = block.variants.find((v) => v.id === instance.variant);
  if (!variant) {
    errors.push({
      field: "variant",
      message: `Unknown variant: ${instance.variant} for block ${instance.blockType}`,
    });
  }

  // Validate content
  const contentValidation = validateBlockContent(instance.blockType, instance.content);
  errors.push(...contentValidation.errors);

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================
// BLOCK INSTANCE HELPERS
// ============================================

/**
 * Generate a unique ID for a block instance
 */
export function generateBlockInstanceId(): string {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create a new block instance with default content
 */
export function createBlockInstance(
  blockId: string,
  variantId?: string,
  content?: Partial<Record<string, unknown>>
): BlockInstance {
  const block = getBlockOrThrow(blockId);
  const variant = variantId || block.defaultVariant;

  // Build default content from schema
  const defaultContent: Record<string, unknown> = {};
  for (const field of block.schema.fields) {
    if (field.default !== undefined) {
      defaultContent[field.name] = field.default;
    } else if (field.type === "array") {
      defaultContent[field.name] = [];
    } else if (field.type === "object") {
      defaultContent[field.name] = {};
    } else if (field.type === "boolean") {
      defaultContent[field.name] = false;
    } else if (field.type === "number") {
      defaultContent[field.name] = 0;
    } else {
      defaultContent[field.name] = "";
    }
  }

  return {
    id: generateBlockInstanceId(),
    blockType: blockId,
    variant,
    content: { ...defaultContent, ...content },
  };
}

// ============================================
// AI HELPERS
// ============================================

/**
 * Find blocks that match a user intent/query
 */
export function matchBlocksToIntent(
  query: string,
  category?: BlockCategory
): { block: BlockType; score: number }[] {
  const queryLower = query.toLowerCase();
  const blocks = category ? getBlocksByCategory(category) : getAllBlocks();

  const results = blocks.map((block) => {
    let score = 0;

    // Check name match
    if (block.name.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Check description match
    if (block.description.toLowerCase().includes(queryLower)) {
      score += 5;
    }

    // Check AI triggers
    for (const trigger of block.aiHints.triggers) {
      if (queryLower.includes(trigger.toLowerCase())) {
        score += 8;
      }
      if (trigger.toLowerCase().includes(queryLower)) {
        score += 3;
      }
    }

    // Check use cases
    for (const useCase of block.aiHints.useCases) {
      if (useCase.toLowerCase().includes(queryLower)) {
        score += 4;
      }
    }

    // Apply priority bonus
    score += block.aiHints.priority;

    return { block, score };
  });

  // Sort by score descending and filter out zero scores
  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * Get recommended blocks for a business type
 */
export function getRecommendedBlocks(businessType: string): BlockType[] {
  const recommendations: Record<string, string[]> = {
    restaurant: ["hero", "text-with-image", "features", "testimonials", "contact", "footer"],
    portfolio: ["hero", "features", "testimonials", "contact", "footer"],
    business: ["hero", "features", "text-with-image", "testimonials", "cta", "contact", "footer"],
    ecommerce: ["hero", "features", "testimonials", "cta", "contact", "footer"],
    blog: ["hero", "text-with-image", "contact", "footer"],
    default: ["hero", "features", "testimonials", "contact", "footer"],
  };

  const blockIds = recommendations[businessType] || recommendations.default;
  return blockIds
    .map((id) => blockRegistry.get(id))
    .filter((b): b is BlockType => b !== undefined);
}
