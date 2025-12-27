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

      <div className="space-y-16 md:space-y-24">
        {content.features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col md:flex-row items-center gap-8 md:gap-12",
              index % 2 === 1 && "md:flex-row-reverse"
            )}
          >
            {/* Content */}
            <div className="flex-1">
              {feature.icon && (
                <div className="mb-4">
                  <FeatureIcon icon={feature.icon} className="w-14 h-14 text-2xl" />
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4 font-[var(--font-heading)]">
                {feature.title}
              </h3>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                {feature.description}
              </p>
              {feature.link && (
                <a
                  href={feature.link.url}
                  className="inline-flex items-center mt-6 text-base font-medium text-[var(--color-primary)] hover:underline"
                >
                  {feature.link.text}
                  <svg
                    className="w-5 h-5 ml-2"
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
            <div className="flex-1">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
                <span className="text-4xl">{feature.icon || "✨"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
