"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";
import { FeaturesGrid } from "./grid";
import { FeaturesCards } from "./cards";
import { FeaturesAlternating } from "./alternating";
import { FeaturesIconLeft } from "./icon-left";

export type FeatureItem = {
  icon?: string;
  title: string;
  description: string;
  link?: {
    text: string;
    url: string;
  };
};

export type FeaturesContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  features: FeatureItem[];
};

const variantComponents: Record<string, React.ComponentType<FeaturesVariantProps>> = {
  grid: FeaturesGrid,
  cards: FeaturesCards,
  alternating: FeaturesAlternating,
  "icon-left": FeaturesIconLeft,
};

export type FeaturesVariantProps = {
  content: FeaturesContent;
  className?: string;
};

export function FeaturesBlock({ content, variant, className }: BlockComponentProps) {
  const featuresContent = content as FeaturesContent;
  const VariantComponent = variantComponents[variant] || FeaturesGrid;

  return <VariantComponent content={featuresContent} className={className} />;
}

// Shared section header
export function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  className,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}) {
  if (!title && !subtitle && !description) return null;

  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {subtitle && (
        <span className="inline-block text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
          {subtitle}
        </span>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] font-[var(--font-heading)]">
          {title}
        </h2>
      )}
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-[var(--color-text-secondary)]",
            centered && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

// Shared feature icon component
export function FeatureIcon({
  icon,
  className,
}: {
  icon?: string;
  className?: string;
}) {
  if (!icon) return null;

  // Simple icon mapping - in production, use a proper icon library
  const iconMap: Record<string, string> = {
    zap: "⚡",
    shield: "🛡️",
    heart: "❤️",
    star: "⭐",
    check: "✓",
    clock: "🕐",
    users: "👥",
    globe: "🌐",
    settings: "⚙️",
    code: "💻",
    chart: "📈",
    lock: "🔒",
    rocket: "🚀",
    target: "🎯",
    award: "🏆",
    phone: "📱",
    mail: "✉️",
    calendar: "📅",
  };

  const displayIcon = iconMap[icon.toLowerCase()] || icon;

  return (
    <div
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-lg",
        "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        "text-xl",
        className
      )}
    >
      {displayIcon}
    </div>
  );
}
