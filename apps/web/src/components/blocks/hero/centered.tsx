"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton, HeroStats } from "./index";

export function HeroCentered({ content, className }: HeroVariantProps) {
  return (
    <div className={cn("text-center px-4", className)}>
      <div className="max-w-4xl mx-auto">
        {content.badge && (
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium rounded-full bg-[var(--color-primary,#2563eb)]/10 text-[var(--color-primary,#2563eb)]">
            {content.badge}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary,#0f172a)] leading-tight">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-[var(--color-primary,#2563eb)] font-medium">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[var(--color-text-secondary,#475569)] max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {content.primaryCta && (
              <HeroButton
                text={content.primaryCta.text}
                url={content.primaryCta.url}
                variant={content.primaryCta.variant || "primary"}
                className="w-full sm:w-auto"
              />
            )}
            {content.secondaryCta && (
              <HeroButton
                text={content.secondaryCta.text}
                url={content.secondaryCta.url}
                variant={content.secondaryCta.variant || "ghost"}
                className="w-full sm:w-auto"
              />
            )}
          </div>
        )}

        {content.image && (
          <div className="mt-8 sm:mt-12">
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full max-w-3xl mx-auto rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl"
            />
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[var(--color-border,#e2e8f0)]">
            <HeroStats stats={content.stats} />
          </div>
        )}
      </div>
    </div>
  );
}
