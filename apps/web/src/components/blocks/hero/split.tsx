"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton, HeroStats } from "./index";

export function HeroSplit({ content, className }: HeroVariantProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-8 lg:gap-12 items-center", className)}>
      {/* Text Content */}
      <div className="order-2 md:order-1 text-center md:text-left">
        {content.badge && (
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 mb-4 sm:mb-6 text-xs sm:text-sm font-medium rounded-full bg-[var(--color-primary,#2563eb)]/10 text-[var(--color-primary,#2563eb)]">
            {content.badge}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[var(--color-text-primary,#0f172a)] leading-tight">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-3 sm:mt-4 text-lg lg:text-xl xl:text-2xl text-[var(--color-primary,#2563eb)] font-medium">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[var(--color-text-secondary,#475569)] leading-relaxed">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
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
                variant={content.secondaryCta.variant || "outline"}
                className="w-full sm:w-auto"
              />
            )}
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <div className="mt-8 sm:mt-12">
            <HeroStats stats={content.stats} className="justify-center md:justify-start" />
          </div>
        )}
      </div>

      {/* Image */}
      <div className="order-1 md:order-2">
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary,#2563eb)]/20 to-[var(--color-accent,#8b5cf6)]/20 rounded-lg sm:rounded-xl flex items-center justify-center">
            <span className="text-[var(--color-text-muted,#94a3b8)]">Hero Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
