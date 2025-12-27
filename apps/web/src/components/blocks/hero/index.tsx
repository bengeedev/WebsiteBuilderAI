"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";
import { HeroCentered } from "./centered";
import { HeroSplit } from "./split";
import { HeroVideoBg } from "./video-bg";

export type HeroContent = {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: {
    text: string;
    url: string;
    variant?: string;
  };
  secondaryCta?: {
    text: string;
    url: string;
    variant?: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  video?: {
    src: string;
    poster?: string;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
};

const variantComponents: Record<string, React.ComponentType<HeroVariantProps>> = {
  centered: HeroCentered,
  split: HeroSplit,
  "video-bg": HeroVideoBg,
};

export type HeroVariantProps = {
  content: HeroContent;
  className?: string;
};

export function HeroBlock({ content, variant, className }: BlockComponentProps) {
  const heroContent = content as HeroContent;
  const VariantComponent = variantComponents[variant] || HeroCentered;

  return <VariantComponent content={heroContent} className={className} />;
}

// Shared button component for hero CTAs
export function HeroButton({
  text,
  url,
  variant = "primary",
  className,
}: {
  text: string;
  url: string;
  variant?: string;
  className?: string;
}) {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-base";

  const variantStyles: Record<string, string> = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90 shadow-lg hover:shadow-xl",
    secondary: "bg-[var(--color-secondary)] text-white hover:opacity-90",
    outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white",
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-gray-100",
    white: "bg-white text-[var(--color-primary)] hover:bg-gray-100",
    link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
  };

  return (
    <a
      href={url}
      className={cn(baseStyles, variantStyles[variant] || variantStyles.primary, className)}
    >
      {text}
    </a>
  );
}

// Shared stats component
export function HeroStats({
  stats,
  className,
}: {
  stats: HeroContent["stats"];
  className?: string;
}) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap justify-center gap-8 md:gap-12", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
            {stat.value}
          </div>
          <div className="text-sm text-[var(--color-text-muted)] mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
