"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type FAQContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  items?: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
  categories?: Array<{
    name: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  }>;
  defaultOpen?: boolean;
  allowMultiple?: boolean;
  contactCta?: {
    text?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
};

export type FAQVariantProps = {
  content: FAQContent;
  className?: string;
};

export function FAQBlock({ content, variant, className }: BlockComponentProps) {
  const faqContent = content as FAQContent;

  switch (variant) {
    case "accordion":
      return <FAQAccordion content={faqContent} className={className} />;
    case "two-column":
      return <FAQTwoColumn content={faqContent} className={className} />;
    case "cards":
      return <FAQCards content={faqContent} className={className} />;
    case "categorized":
      return <FAQCategorized content={faqContent} className={className} />;
    default:
      return <FAQAccordion content={faqContent} className={className} />;
  }
}

function FAQAccordion({ content, className }: FAQVariantProps) {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    content.defaultOpen ? new Set([0]) : new Set()
  );

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!content.allowMultiple) {
          next.clear();
        }
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-[var(--color-text-secondary,#475569)]">
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Accordion */}
        <div className="space-y-4">
          {content.items?.map((item, index) => (
            <div
              key={index}
              className="border border-[var(--color-border,#e2e8f0)] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-[var(--color-surface,#f8fafc)] hover:bg-[var(--color-border,#e2e8f0)]/30 transition-colors"
              >
                <span className="font-medium text-[var(--color-text-primary,#0f172a)]">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    "w-5 h-5 text-[var(--color-text-muted,#94a3b8)] transition-transform",
                    openIndexes.has(index) && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndexes.has(index) && (
                <div className="px-6 py-4 bg-[var(--color-background,#ffffff)]">
                  <p className="text-[var(--color-text-secondary,#475569)]">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        {content.contactCta && (
          <div className="mt-12 text-center p-6 bg-[var(--color-surface,#f8fafc)] rounded-xl">
            <p className="text-[var(--color-text-secondary,#475569)] mb-4">
              {content.contactCta.text || "Still have questions?"}
            </p>
            <a
              href={content.contactCta.buttonUrl || "#contact"}
              className="inline-block px-6 py-3 bg-[var(--color-primary,#2563eb)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              {content.contactCta.buttonText || "Contact Us"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function FAQTwoColumn({ content, className }: FAQVariantProps) {
  const items = content.items || [];
  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {leftColumn.map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold text-[var(--color-text-primary,#0f172a)] mb-2">
                  {item.question}
                </h3>
                <p className="text-[var(--color-text-secondary,#475569)]">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {rightColumn.map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold text-[var(--color-text-primary,#0f172a)] mb-2">
                  {item.question}
                </h3>
                <p className="text-[var(--color-text-secondary,#475569)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQCards({ content, className }: FAQVariantProps) {
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
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items?.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-background,#ffffff)] rounded-xl p-6 shadow-[var(--shadow-sm)]"
            >
              <h3 className="font-semibold text-[var(--color-text-primary,#0f172a)] mb-3">
                {item.question}
              </h3>
              <p className="text-[var(--color-text-secondary,#475569)] text-sm">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQCategorized({ content, className }: FAQVariantProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = content.categories || [];

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

        {/* Category Tabs */}
        {categories.length > 0 && (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-colors",
                    activeCategory === index
                      ? "bg-[var(--color-primary,#2563eb)] text-white"
                      : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-secondary,#475569)] hover:bg-[var(--color-border,#e2e8f0)]"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Active Category FAQs */}
            <div className="space-y-6">
              {categories[activeCategory]?.items.map((item, index) => (
                <div key={index} className="border-b border-[var(--color-border,#e2e8f0)] pb-6 last:border-0">
                  <h3 className="font-semibold text-[var(--color-text-primary,#0f172a)] mb-2">
                    {item.question}
                  </h3>
                  <p className="text-[var(--color-text-secondary,#475569)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
