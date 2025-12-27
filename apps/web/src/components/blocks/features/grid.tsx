"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { FeaturesVariantProps } from "./index";
import { SectionHeader, FeatureIcon } from "./index";

export function FeaturesGrid({ content, className }: FeaturesVariantProps) {
  const columns = content.features.length <= 3 ? 3 : content.features.length <= 4 ? 2 : 3;

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div
        className={cn(
          "grid gap-4 sm:gap-6 md:gap-8",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {content.features.map((feature, index) => (
          <div
            key={index}
            className="group text-center p-4 sm:p-6 rounded-lg sm:rounded-xl hover:bg-[var(--color-surface,#f8fafc)] transition-colors duration-200"
          >
            {feature.icon && (
              <div className="flex justify-center mb-3 sm:mb-4">
                <FeatureIcon icon={feature.icon} />
              </div>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary,#0f172a)] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary,#475569)]">
              {feature.description}
            </p>
            {feature.link && (
              <a
                href={feature.link.url}
                className="inline-flex items-center mt-3 sm:mt-4 text-sm font-medium text-[var(--color-primary,#2563eb)] hover:underline"
              >
                {feature.link.text}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
