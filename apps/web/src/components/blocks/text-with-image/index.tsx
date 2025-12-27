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
    <div className={cn("grid md:grid-cols-2 gap-8 lg:gap-12 items-center", className)}>
      {/* Text Content */}
      <div>
        {content.subtitle && (
          <span className="inline-block text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.content && (
          <div
            className="prose prose-lg text-[var(--color-text-secondary)]"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}
        {content.features && content.features.length > 0 && (
          <ul className="space-y-4 mb-6">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.icon && (
                  <span className="text-[var(--color-primary)] mt-1">{feature.icon}</span>
                )}
                <div>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {feature.title}
                  </span>
                  {feature.description && (
                    <p className="text-sm text-[var(--color-text-muted)]">
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
            className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline"
          >
            {content.cta.text}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>

      {/* Image */}
      <div>
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-xl flex items-center justify-center">
            <span className="text-[var(--color-text-muted)]">Image</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ImageLeft({ content, className }: TextWithImageVariantProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-8 lg:gap-12 items-center", className)}>
      {/* Image */}
      <div>
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-xl flex items-center justify-center">
            <span className="text-[var(--color-text-muted)]">Image</span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div>
        {content.subtitle && (
          <span className="inline-block text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.features && content.features.length > 0 && (
          <ul className="space-y-4 mb-6">
            {content.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                {feature.icon && (
                  <span className="text-[var(--color-primary)] mt-1">{feature.icon}</span>
                )}
                <div>
                  <span className="font-medium text-[var(--color-text-primary)]">
                    {feature.title}
                  </span>
                  {feature.description && (
                    <p className="text-sm text-[var(--color-text-muted)]">
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
            className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline"
          >
            {content.cta.text}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <div className="space-y-16 md:space-y-24">
        {content.features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "grid md:grid-cols-2 gap-8 lg:gap-12 items-center",
              index % 2 === 1 && "md:flex-row-reverse"
            )}
          >
            <div className={cn(index % 2 === 1 && "md:order-2")}>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
                {feature.title}
              </h3>
              {feature.description && (
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              )}
            </div>
            <div className={cn(index % 2 === 1 && "md:order-1")}>
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
                <span className="text-4xl">{feature.icon || "✨"}</span>
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
        "relative min-h-[60vh] flex items-center justify-center rounded-xl overflow-hidden",
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
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto py-16">
        {content.subtitle && (
          <span className="inline-block px-4 py-1.5 text-sm bg-white/20 rounded-full mb-4">
            {content.subtitle}
          </span>
        )}
        {content.title && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-[var(--font-heading)]">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            {content.description}
          </p>
        )}
        {content.cta && (
          <a
            href={content.cta.url}
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[var(--color-primary)] font-medium rounded-lg hover:bg-white/90 transition-colors"
          >
            {content.cta.text}
          </a>
        )}
      </div>
    </div>
  );
}
