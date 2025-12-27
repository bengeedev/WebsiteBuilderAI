"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type StatsContent = {
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
    prefix?: string;
    suffix?: string;
    description?: string;
  }>;
  animate?: boolean;
};

export type StatsVariantProps = {
  content: StatsContent;
  className?: string;
};

export function StatsBlock({ content, variant, className }: BlockComponentProps) {
  const statsContent = content as StatsContent;

  switch (variant) {
    case "inline":
      return <StatsInline content={statsContent} className={className} />;
    case "cards":
      return <StatsCards content={statsContent} className={className} />;
    case "banner":
      return <StatsBanner content={statsContent} className={className} />;
    case "with-icons":
      return <StatsWithIcons content={statsContent} className={className} />;
    default:
      return <StatsInline content={statsContent} className={className} />;
  }
}

function StatsInline({ content, className }: StatsVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-[var(--color-text-secondary)] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsCards({ content, className }: StatsVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-surface)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.stats?.map((stat, index) => (
            <div
              key={index}
              className="bg-[var(--color-background)] rounded-xl p-6 text-center shadow-[var(--shadow-md)]"
            >
              <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-[var(--color-text-primary)] font-medium mb-1">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-[var(--color-text-secondary)]">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBanner({ content, className }: StatsVariantProps) {
  return (
    <section className={cn("py-16 md:py-20 bg-[var(--color-primary)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.stats?.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsWithIcons({ content, className }: StatsVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Stats with Icons */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats?.map((stat, index) => (
            <div key={index} className="text-center">
              {stat.icon && (
                <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-[var(--color-primary)]">{stat.icon}</span>
                </div>
              )}
              <div className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-[var(--color-text-secondary)] font-medium">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-sm text-[var(--color-text-muted)] mt-1">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
