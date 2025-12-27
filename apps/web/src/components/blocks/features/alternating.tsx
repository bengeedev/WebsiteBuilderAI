"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { FeaturesVariantProps } from "./index";
import { SectionHeader, FeatureIcon } from "./index";

export function FeaturesAlternating({ content, className }: FeaturesVariantProps) {
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
              "flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12",
              index % 2 === 1 && "md:flex-row-reverse"
            )}
          >
            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              {feature.icon && (
                <div className="mb-3 sm:mb-4 flex justify-center md:justify-start">
                  <FeatureIcon icon={feature.icon} className="w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl" />
                </div>
              )}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary,#475569)] leading-relaxed">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link.url}
                  className="inline-flex items-center mt-4 sm:mt-6 text-sm sm:text-base font-medium text-[var(--color-primary,#2563eb)] hover:underline"
                >
                  {feature.link.text}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Placeholder image area */}
            <div className="flex-1 w-full">
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
