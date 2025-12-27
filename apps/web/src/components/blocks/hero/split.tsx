"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton, HeroStats } from "./index";

export function HeroSplit({ content, className }: HeroVariantProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-8 lg:gap-12 items-center", className)}>
      {/* Text Content */}
      <div className="order-2 md:order-1">
        {content.badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {content.badge}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] font-[var(--font-heading)]">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-4 text-xl lg:text-2xl text-[var(--color-primary)] font-medium">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {content.primaryCta && (
              <HeroButton
                text={content.primaryCta.text}
                url={content.primaryCta.url}
                variant={content.primaryCta.variant || "primary"}
              />
            )}
            {content.secondaryCta && (
              <HeroButton
                text={content.secondaryCta.text}
                url={content.secondaryCta.url}
                variant={content.secondaryCta.variant || "outline"}
              />
            )}
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <div className="mt-12">
            <HeroStats stats={content.stats} className="justify-start" />
          </div>
        )}
      </div>

      {/* Image */}
      <div className="order-1 md:order-2">
        {content.image ? (
          <img
            src={content.image.src}
            alt={content.image.alt}
            className="w-full rounded-xl shadow-2xl object-cover"
          />
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 rounded-xl flex items-center justify-center">
            <span className="text-[var(--color-text-muted)]">Hero Image</span>
          </div>
        )}
      </div>
    </div>
  );
}
