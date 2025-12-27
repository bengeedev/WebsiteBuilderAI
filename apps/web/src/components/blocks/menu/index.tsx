"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type MenuContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  categories?: Array<{
    name: string;
    description?: string;
    items: Array<{
      name: string;
      description?: string;
      price: string;
      image?: string;
      tags?: string[];
      featured?: boolean;
    }>;
  }>;
  currency?: string;
  showImages?: boolean;
};

export type MenuVariantProps = {
  content: MenuContent;
  className?: string;
};

export function MenuBlock({ content, variant, className }: BlockComponentProps) {
  const menuContent = content as MenuContent;

  switch (variant) {
    case "columns":
      return <MenuColumns content={menuContent} className={className} />;
    case "tabs":
      return <MenuTabs content={menuContent} className={className} />;
    case "cards":
      return <MenuCards content={menuContent} className={className} />;
    case "minimal":
      return <MenuMinimal content={menuContent} className={className} />;
    default:
      return <MenuColumns content={menuContent} className={className} />;
  }
}

function MenuColumns({ content, className }: MenuVariantProps) {
  return (
    <section className={cn("py-12 sm:py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-8 sm:mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] text-sm sm:text-base font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-3 sm:mb-4">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-sm sm:text-base text-[var(--color-text-secondary,#475569)] max-w-2xl mx-auto">
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Menu Categories in Columns */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          {content.categories?.map((category, catIndex) => (
            <div key={catIndex}>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary,#0f172a)] mb-2 border-b border-[var(--color-border,#e2e8f0)] pb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-[var(--color-text-muted,#94a3b8)] mb-4 sm:mb-6 text-sm italic">
                  {category.description}
                </p>
              )}
              <div className="space-y-4 sm:space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between items-start gap-3 sm:gap-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <h4 className="font-semibold text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                          {item.name}
                        </h4>
                        {item.featured && (
                          <span className="text-xs bg-[var(--color-primary,#2563eb)] text-white px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-[var(--color-text-secondary,#475569)] mt-1">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs text-[var(--color-text-muted,#94a3b8)] bg-[var(--color-surface,#f8fafc)] px-2 py-0.5 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-[var(--color-primary,#2563eb)] whitespace-nowrap">
                      {content.currency || "$"}{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuTabs({ content, className }: MenuVariantProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Tabs */}
        {content.categories && content.categories.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {content.categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "px-6 py-2 rounded-full transition-colors",
                    activeTab === index
                      ? "bg-[var(--color-primary,#2563eb)] text-white"
                      : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-secondary,#475569)] hover:bg-[var(--color-border,#e2e8f0)]"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Active Category Items */}
            <div className="space-y-4">
              {content.categories[activeTab]?.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center gap-4 p-4 bg-[var(--color-surface,#f8fafc)] rounded-lg"
                >
                  {content.showImages && item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-[var(--color-text-primary,#0f172a)]">
                        {item.name}
                      </h4>
                      {item.featured && (
                        <span className="text-xs bg-[var(--color-primary,#2563eb)] text-white px-2 py-0.5 rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-[var(--color-text-secondary,#475569)] mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-bold text-lg text-[var(--color-primary,#2563eb)]">
                    {content.currency || "$"}{item.price}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function MenuCards({ content, className }: MenuVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-surface,#f8fafc)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-4">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-[var(--color-text-secondary,#475569)] max-w-2xl mx-auto">
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Categories with Cards */}
        {content.categories?.map((category, catIndex) => (
          <div key={catIndex} className="mb-12 last:mb-0">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary,#0f172a)] mb-6 text-center">
              {category.name}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="bg-[var(--color-background,#ffffff)] rounded-xl overflow-hidden shadow-[var(--shadow-md,0_4px_6px_-1px_rgba(0,0,0,0.1))]"
                >
                  {content.showImages && item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[var(--color-text-primary,#0f172a)]">
                        {item.name}
                      </h4>
                      <span className="font-bold text-[var(--color-primary,#2563eb)]">
                        {content.currency || "$"}{item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-[var(--color-text-secondary,#475569)]">
                        {item.description}
                      </p>
                    )}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs text-[var(--color-text-muted,#94a3b8)] bg-[var(--color-surface,#f8fafc)] px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MenuMinimal({ content, className }: MenuVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block uppercase tracking-wider text-sm">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Minimal Menu List */}
        {content.categories?.map((category, catIndex) => (
          <div key={catIndex} className="mb-10 last:mb-0">
            <h3 className="text-xl font-bold text-[var(--color-text-primary,#0f172a)] mb-6 text-center uppercase tracking-wider">
              {category.name}
            </h3>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-baseline gap-2">
                  <h4 className="font-medium text-[var(--color-text-primary,#0f172a)]">
                    {item.name}
                  </h4>
                  <span className="flex-1 border-b border-dotted border-[var(--color-border,#e2e8f0)]" />
                  <span className="font-medium text-[var(--color-text-primary,#0f172a)]">
                    {content.currency || "$"}{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
