"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { FeaturesVariantProps } from "./index";
import { SectionHeader, FeatureIcon } from "./index";

export function FeaturesIconLeft({ content, className }: FeaturesVariantProps) {
  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {content.features.map((feature, index) => (
          <div key={index} className="flex gap-3 sm:gap-4">
            {feature.icon && (
              <div className="flex-shrink-0">
                <FeatureIcon icon={feature.icon} />
              </div>
            )}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary,#0f172a)] mb-1">
                {feature.title}
              </h3>
              <p className="text-[var(--color-text-secondary,#475569)] text-sm">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link.url}
                  className="inline-flex items-center mt-2 text-sm font-medium text-[var(--color-primary,#2563eb)] hover:underline"
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
          </div>
        ))}
      </div>
    </div>
  );
}
