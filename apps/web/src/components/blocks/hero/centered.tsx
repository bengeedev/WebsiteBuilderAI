"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton, HeroStats } from "./index";

export function HeroCentered({ content, className }: HeroVariantProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="max-w-4xl mx-auto">
        {content.badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {content.badge}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] font-[var(--font-heading)]">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-4 text-xl md:text-2xl text-[var(--color-primary)] font-medium">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-6 text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
                variant={content.secondaryCta.variant || "ghost"}
              />
            )}
          </div>
        )}

        {content.image && (
          <div className="mt-12">
            <img
              src={content.image.src}
              alt={content.image.alt}
              className="w-full max-w-3xl mx-auto rounded-xl shadow-2xl"
            />
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
            <HeroStats stats={content.stats} />
          </div>
        )}
      </div>
    </div>
  );
}
