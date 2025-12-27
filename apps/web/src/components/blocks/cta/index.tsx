"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type CTAContent = {
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
};

export type CTAVariantProps = {
  content: CTAContent;
  className?: string;
};

export function CTABlock({ content, variant, className }: BlockComponentProps) {
  const ctaContent = content as CTAContent;

  switch (variant) {
    case "banner":
      return <CTABanner content={ctaContent} className={className} />;
    case "split":
      return <CTASplit content={ctaContent} className={className} />;
    case "card":
      return <CTACard content={ctaContent} className={className} />;
    case "gradient":
      return <CTAGradient content={ctaContent} className={className} />;
    default:
      return <CTABanner content={ctaContent} className={className} />;
  }
}

function CTAButton({
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
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200";

  const variantStyles: Record<string, string> = {
    primary: "bg-[var(--color-primary)] text-white hover:opacity-90",
    secondary: "bg-[var(--color-secondary)] text-white hover:opacity-90",
    white: "bg-white text-[var(--color-primary)] hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
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

function CTABanner({ content, className }: CTAVariantProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-primary)] text-white rounded-xl p-8 md:p-12 text-center",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block px-3 py-1 text-sm bg-white/20 rounded-full mb-4">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-heading)]">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.primaryCta && (
            <CTAButton
              text={content.primaryCta.text}
              url={content.primaryCta.url}
              variant="white"
            />
          )}
          {content.secondaryCta && (
            <CTAButton
              text={content.secondaryCta.text}
              url={content.secondaryCta.url}
              variant="outline"
            />
          )}
        </div>
      )}
    </div>
  );
}

function CTASplit({ content, className }: CTAVariantProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-surface)] rounded-xl overflow-hidden",
        className
      )}
    >
      <div className="grid md:grid-cols-2">
        {/* Content */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {content.subtitle && (
            <span className="inline-block text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
              {content.subtitle}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              {content.description}
            </p>
          )}
          {(content.primaryCta || content.secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {content.primaryCta && (
                <a
                  href={content.primaryCta.url}
                  className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  {content.primaryCta.text}
                </a>
              )}
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.url}
                  className="inline-flex items-center justify-center px-6 py-3 text-[var(--color-primary)] font-medium hover:underline"
                >
                  {content.secondaryCta.text}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image */}
        <div className="bg-[var(--color-primary)]/10">
          {content.image ? (
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center text-4xl">
              🚀
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CTACard({ content, className }: CTAVariantProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mx-auto p-8 md:p-12 rounded-xl",
        "bg-[var(--color-surface)] border border-[var(--color-border)]",
        "shadow-lg text-center",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.primaryCta && (
            <a
              href={content.primaryCta.url}
              className="inline-flex items-center justify-center px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              {content.primaryCta.text}
            </a>
          )}
          {content.secondaryCta && (
            <a
              href={content.secondaryCta.url}
              className="inline-flex items-center justify-center px-6 py-3 text-[var(--color-text-secondary)] font-medium hover:text-[var(--color-primary)] transition-colors"
            >
              {content.secondaryCta.text}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function CTAGradient({ content, className }: CTAVariantProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-8 md:p-12 text-center text-white",
        "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block px-3 py-1 text-sm bg-white/20 rounded-full mb-4">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-heading)]">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {content.primaryCta && (
            <CTAButton
              text={content.primaryCta.text}
              url={content.primaryCta.url}
              variant="white"
            />
          )}
          {content.secondaryCta && (
            <CTAButton
              text={content.secondaryCta.text}
              url={content.secondaryCta.url}
              variant="ghost"
            />
          )}
        </div>
      )}
    </div>
  );
}
