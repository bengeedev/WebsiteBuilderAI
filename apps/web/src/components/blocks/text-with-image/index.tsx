"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";
import { SectionHeader } from "../features";

export type TextWithImageContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: {
    src: string;
    alt: string;
  };
  features?: Array<{
    icon?: string;
    title: string;
    description?: string;
  }>;
  cta?: {
    text: string;
    url: string;
  };
};

export type TextWithImageVariantProps = {
  content: TextWithImageContent;
  className?: string;
};

export function TextWithImageBlock({ content, variant, className }: BlockComponentProps) {
  const textWithImageContent = content as TextWithImageContent;

  switch (variant) {
    case "image-right":
      return <ImageRight content={textWithImageContent} className={className} />;
    case "image-left":
      return <ImageLeft content={textWithImageContent} className={className} />;
    case "alternating":
      return <Alternating content={textWithImageContent} className={className} />;
    case "overlay":
      return <Overlay content={textWithImageContent} className={className} />;
    default:
      return <ImageRight content={textWithImageContent} className={className} />;
  }
}

function ImageRight({ content, className }: TextWithImageVariantProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center", className)}>
      {/* Text Content */}
      <div className="text-center md:text-left order-2 md:order-1">
        {content.subtitle && (
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-primary,#2563eb)] uppercase tracking-wider mb-2">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] mb-4 sm:mb-6 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.content && (
          <div
            className="prose prose-sm sm:prose-lg text-[var(--color-text-secondary,#475569)]"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}
        {content.features && content.features.length > 0 && (
          <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 justify-center md:justify-start">
                {feature.icon && (
                  <span className="text-[var(--color-primary,#2563eb)] mt-0.5 sm:mt-1">{feature.icon}</span>
                )}
                <div>
                  <span className="font-medium text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                    {feature.title}
                  </span>
                  {feature.description && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted,#94a3b8)]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {content.cta && (
          <a
            href={content.cta.url}
            className="inline-flex items-center text-sm sm:text-base text-[var(--color-primary,#2563eb)] font-medium hover:underline"
          >
            {content.cta.text}
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>

      {/* Image */}
      <div className="order-1 md:order-2">
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-lg sm:rounded-xl shadow-lg object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary,#2563eb)]/10 to-[var(--color-accent,#8b5cf6)]/10 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-sm text-[var(--color-text-muted,#94a3b8)]">Image</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageLeft({ content, className }: TextWithImageVariantProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center", className)}>
      {/* Image */}
      <div>
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-lg sm:rounded-xl shadow-lg object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary,#2563eb)]/10 to-[var(--color-accent,#8b5cf6)]/10 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-sm text-[var(--color-text-muted,#94a3b8)]">Image</span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className="text-center md:text-left">
        {content.subtitle && (
          <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-primary,#2563eb)] uppercase tracking-wider mb-2">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] mb-4 sm:mb-6 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.features && content.features.length > 0 && (
          <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 sm:gap-3 justify-center md:justify-start">
                {feature.icon && (
                  <span className="text-[var(--color-primary,#2563eb)] mt-0.5 sm:mt-1">{feature.icon}</span>
                )}
                <div>
                  <span className="font-medium text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                    {feature.title}
                  </span>
                  {feature.description && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted,#94a3b8)]">
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {content.cta && (
          <a
            href={content.cta.url}
            className="inline-flex items-center text-sm sm:text-base text-[var(--color-primary,#2563eb)] font-medium hover:underline"
          >
            {content.cta.text}
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

function Alternating({ content, className }: TextWithImageVariantProps) {
  // For alternating, we show multiple sections if features exist
  if (!content.features || content.features.length === 0) {
    return <ImageRight content={content} className={className} />;
  }

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="space-y-12 sm:space-y-16 md:space-y-24">
        {content.features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center",
              index % 2 === 1 && "md:flex-row-reverse"
            )}
          >
            <div className={cn("text-center md:text-left", index % 2 === 1 && "md:order-2")}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] leading-relaxed">
                  {feature.description}
                </p>
              )}
            </div>
            <div className={cn(index % 2 === 1 && "md:order-1")}>
              <div className="aspect-video rounded-lg sm:rounded-xl bg-gradient-to-br from-[var(--color-primary,#2563eb)]/10 to-[var(--color-accent,#8b5cf6)]/10 flex items-center justify-center">
                <span className="text-3xl sm:text-4xl">{feature.icon || "✨"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Overlay({ content, className }: TextWithImageVariantProps) {
  return (
    <div
      className={cn(
        "relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center rounded-lg sm:rounded-xl overflow-hidden",
        className
      )}
    >
      {/* Background Image */}
      {content.image ? (
        <img
          src={content.image.src}
          alt={content.image.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary,#2563eb)] to-[var(--color-secondary,#1e293b)]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto py-12 sm:py-16">
        {content.subtitle && (
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm bg-white/20 rounded-full mb-3 sm:mb-4">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.cta && (
          <a
            href={content.cta.url}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[var(--color-primary,#2563eb)] text-sm sm:text-base font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            {content.cta.text}
          </a>
        )}
      </div>
    </div>
  );
}
