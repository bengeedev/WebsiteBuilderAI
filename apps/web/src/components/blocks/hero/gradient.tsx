"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton } from "./index";

export function HeroGradient({ content, className }: HeroVariantProps) {
  return (
    <div
      className={cn(
        "min-h-[90vh] flex items-center justify-center text-center text-white",
        className
      )}
      style={{
        background: "linear-gradient(135deg, var(--color-primary, #2563eb) 0%, var(--color-secondary, #7c3aed) 100%)",
      }}
    >
      <div className="px-4 max-w-4xl mx-auto">
        {content.badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
            {content.badge}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium opacity-90">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-85">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.primaryCta && (
              <HeroButton
                text={content.primaryCta.text}
                url={content.primaryCta.url}
                variant="white"
                className="w-full sm:w-auto"
              />
            )}
            {content.secondaryCta && (
              <HeroButton
                text={content.secondaryCta.text}
                url={content.secondaryCta.url}
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
