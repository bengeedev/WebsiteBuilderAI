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
    "inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base";

  const variantStyles: Record<string, string> = {
    primary: "bg-[var(--color-primary,#2563eb)] text-white hover:opacity-90",
    secondary: "bg-[var(--color-secondary,#1e293b)] text-white hover:opacity-90",
    white: "bg-white text-[var(--color-primary,#2563eb)] hover:bg-gray-100",
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
        "bg-[var(--color-primary,#2563eb)] text-white rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block px-3 py-1 text-xs sm:text-sm bg-white/20 rounded-full mb-3 sm:mb-4">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {content.primaryCta && (
            <CTAButton
              text={content.primaryCta.text}
              url={content.primaryCta.url}
              variant="white"
              className="w-full sm:w-auto"
            />
          )}
          {content.secondaryCta && (
            <CTAButton
              text={content.secondaryCta.text}
              url={content.secondaryCta.url}
              variant="outline"
              className="w-full sm:w-auto"
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
        "bg-[var(--color-surface,#f8fafc)] rounded-lg sm:rounded-xl overflow-hidden",
        className
      )}
    >
      <div className="grid md:grid-cols-2">
        {/* Content */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
          {content.subtitle && (
            <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-primary,#2563eb)] uppercase tracking-wider mb-2">
              {content.subtitle}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] mb-6 sm:mb-8">
              {content.description}
            </p>
          )}
          {(content.primaryCta || content.secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              {content.primaryCta && (
                <a
                  href={content.primaryCta.url}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--color-primary,#2563eb)] text-white text-sm sm:text-base font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  {content.primaryCta.text}
                </a>
              )}
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.url}
                  className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-[var(--color-primary,#2563eb)] text-sm sm:text-base font-medium hover:underline"
                >
                  {content.secondaryCta.text}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Image */}
        <div className="bg-[var(--color-primary,#2563eb)]/10 order-first md:order-last">
          {content.image ? (
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full h-48 sm:h-64 md:h-full object-cover"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 md:h-full min-h-[200px] md:min-h-[300px] flex items-center justify-center text-3xl sm:text-4xl">
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
        "max-w-2xl mx-auto p-6 sm:p-8 md:p-12 rounded-lg sm:rounded-xl",
        "bg-[var(--color-surface,#f8fafc)] border border-[var(--color-border,#e2e8f0)]",
        "shadow-lg text-center",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block text-xs sm:text-sm font-semibold text-[var(--color-primary,#2563eb)] uppercase tracking-wider mb-2">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] mb-6 sm:mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {content.primaryCta && (
            <a
              href={content.primaryCta.url}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-[var(--color-primary,#2563eb)] text-white text-sm sm:text-base font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              {content.primaryCta.text}
            </a>
          )}
          {content.secondaryCta && (
            <a
              href={content.secondaryCta.url}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-[var(--color-text-secondary,#475569)] text-sm sm:text-base font-medium hover:text-[var(--color-primary,#2563eb)] transition-colors"
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
        "rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-12 text-center text-white",
        "bg-gradient-to-r from-[var(--color-primary,#2563eb)] to-[var(--color-accent,#8b5cf6)]",
        className
      )}
    >
      {content.subtitle && (
        <span className="inline-block px-3 py-1 text-xs sm:text-sm bg-white/20 rounded-full mb-3 sm:mb-4">
          {content.subtitle}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
        {content.title}
      </h2>
      {content.description && (
        <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto mb-6 sm:mb-8">
          {content.description}
        </p>
      )}
      {(content.primaryCta || content.secondaryCta) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {content.primaryCta && (
            <CTAButton
              text={content.primaryCta.text}
              url={content.primaryCta.url}
              variant="white"
              className="w-full sm:w-auto"
            />
          )}
          {content.secondaryCta && (
            <CTAButton
              text={content.secondaryCta.text}
              url={content.secondaryCta.url}
              variant="ghost"
              className="w-full sm:w-auto"
            />
          )}
        </div>
      )}
    </div>
  );
}
