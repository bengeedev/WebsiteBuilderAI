"use client";

import React from "react";
import type { BlockInstance } from "@repo/templates";
import { getBlock, getVariant } from "@repo/templates";
import { cn } from "@repo/ui";

// Block component imports
import { HeroBlock } from "../blocks/hero";
import { FeaturesBlock } from "../blocks/features";
import { TestimonialsBlock } from "../blocks/testimonials";
import { CTABlock } from "../blocks/cta";
import { ContactBlock } from "../blocks/contact";
import { FooterBlock } from "../blocks/footer";
import { TextWithImageBlock } from "../blocks/text-with-image";
import { HeaderBlock } from "../blocks/header";
import { MenuBlock } from "../blocks/menu";
import { GalleryBlock } from "../blocks/gallery";
import { PricingBlock } from "../blocks/pricing";
import { TeamBlock } from "../blocks/team";
import { FAQBlock } from "../blocks/faq";
import { StatsBlock } from "../blocks/stats";
import { NewsletterBlock } from "../blocks/newsletter";

// Block component registry
const blockComponents: Record<string, React.ComponentType<BlockComponentProps>> = {
  hero: HeroBlock,
  features: FeaturesBlock,
  testimonials: TestimonialsBlock,
  cta: CTABlock,
  contact: ContactBlock,
  footer: FooterBlock,
  "text-with-image": TextWithImageBlock,
  header: HeaderBlock,
  menu: MenuBlock,
  gallery: GalleryBlock,
  pricing: PricingBlock,
  team: TeamBlock,
  faq: FAQBlock,
  stats: StatsBlock,
  newsletter: NewsletterBlock,
};

export type BlockComponentProps = {
  content: Record<string, unknown>;
  variant: string;
  className?: string;
};

type BlockRendererProps = {
  block: BlockInstance;
  isEditing?: boolean;
  onSelect?: (blockId: string) => void;
  isSelected?: boolean;
  className?: string;
};

export function BlockRenderer({
  block,
  isEditing = false,
  onSelect,
  isSelected = false,
  className,
}: BlockRendererProps) {
  const blockType = getBlock(block.blockType);
  const variant = getVariant(block.blockType, block.variant);

  if (!blockType) {
    console.warn(`Unknown block type: ${block.blockType}`);
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
        Unknown block type: {block.blockType}
      </div>
    );
  }

  if (!variant) {
    console.warn(`Unknown variant: ${block.variant} for block ${block.blockType}`);
  }

  const Component = blockComponents[block.blockType];

  if (!Component) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded text-yellow-700 text-sm">
        Block component not yet implemented: {block.blockType}
      </div>
    );
  }

  const containerClass = getContainerClass(variant?.layout.container || "boxed");
  const paddingClass = getPaddingClass(variant?.layout.padding);

  return (
    <section
      id={`block-${block.id}`}
      data-block-type={block.blockType}
      data-block-variant={block.variant}
      className={cn(
        "relative",
        containerClass,
        paddingClass,
        isEditing && "group cursor-pointer",
        isEditing && isSelected && "ring-2 ring-primary ring-offset-2",
        isEditing && !isSelected && "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2",
        className
      )}
      onClick={isEditing && onSelect ? () => onSelect(block.id) : undefined}
    >
      {isEditing && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
            {blockType.name} - {variant?.name || block.variant}
          </span>
        </div>
      )}
      <Component
        content={block.content}
        variant={block.variant}
        className={variant?.className}
      />
    </section>
  );
}

function getContainerClass(container: "full" | "boxed" | "narrow"): string {
  switch (container) {
    case "full":
      return "w-full";
    case "narrow":
      return "max-w-3xl mx-auto px-4";
    case "boxed":
    default:
      return "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  }
}

function getPaddingClass(padding?: { base: string; sm?: string; md?: string; lg?: string }): string {
  if (!padding) return "py-12 md:py-16 lg:py-20";

  // Map token values to Tailwind classes
  const paddingMap: Record<string, string> = {
    "3rem": "py-12",
    "4rem": "py-16",
    "5rem": "py-20",
    "6rem": "py-24",
  };

  const baseClass = paddingMap[padding.base] || "py-16";
  const mdClass = padding.md ? paddingMap[padding.md] : "";
  const lgClass = padding.lg ? paddingMap[padding.lg] : "";

  return cn(baseClass, mdClass && `md:${mdClass}`, lgClass && `lg:${lgClass}`);
}
