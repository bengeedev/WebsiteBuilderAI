"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton } from "./index";

export function HeroMinimal({ content, className }: HeroVariantProps) {
  return (
    <div
      className={cn(
        "min-h-[60vh] flex items-center justify-center text-center",
        className
      )}
    >
      <div className="px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary,#0f172a)] leading-tight">
          {content.title}
        </h1>

        {content.description && (
          <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary,#475569)] leading-relaxed">
            {content.description}
          </p>
        )}

        {content.primaryCta && (
          <div className="mt-8">
            <HeroButton
              text={content.primaryCta.text}
              url={content.primaryCta.url}
              variant={content.primaryCta.variant || "primary"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
