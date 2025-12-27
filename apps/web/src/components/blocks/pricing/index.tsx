"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type PricingContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  plans?: Array<{
    name: string;
    description?: string;
    price: {
      monthly?: string;
      yearly?: string;
      custom?: string;
    };
    features: Array<{
      text: string;
      included: boolean;
    }>;
    cta: {
      text: string;
      url: string;
    };
    highlighted?: boolean;
    badge?: string;
  }>;
  showBillingToggle?: boolean;
  currency?: string;
};

export type PricingVariantProps = {
  content: PricingContent;
  className?: string;
};

export function PricingBlock({ content, variant, className }: BlockComponentProps) {
  const pricingContent = content as PricingContent;

  switch (variant) {
    case "cards":
      return <PricingCards content={pricingContent} className={className} />;
    case "comparison":
      return <PricingComparison content={pricingContent} className={className} />;
    case "simple":
      return <PricingSimple content={pricingContent} className={className} />;
    case "toggle":
      return <PricingToggle content={pricingContent} className={className} />;
    default:
      return <PricingCards content={pricingContent} className={className} />;
  }
}

function PricingCards({ content, className }: PricingVariantProps) {
  const [isYearly, setIsYearly] = useState(false);

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

        {/* Billing Toggle */}
        {content.showBillingToggle && (
          <div className="flex justify-center items-center gap-4 mb-12">
            <span className={cn(!isYearly && "font-semibold")}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors",
                isYearly ? "bg-[var(--color-primary,#2563eb)]" : "bg-[var(--color-border,#e2e8f0)]"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-5 h-5 bg-white rounded-full transition-transform",
                  isYearly ? "translate-x-8" : "translate-x-1"
                )}
              />
            </button>
            <span className={cn(isYearly && "font-semibold")}>
              Yearly
              <span className="text-[var(--color-primary,#2563eb)] text-sm ml-1">(Save 20%)</span>
            </span>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.plans?.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl p-8 transition-shadow",
                plan.highlighted
                  ? "bg-[var(--color-primary,#2563eb)] text-white shadow-xl scale-105"
                  : "bg-[var(--color-surface,#f8fafc)] shadow-[var(--shadow-md,0_4px_6px_-1px_rgba(0,0,0,0.1))]"
              )}
            >
              {plan.badge && (
                <span
                  className={cn(
                    "inline-block px-3 py-1 text-xs font-medium rounded-full mb-4",
                    plan.highlighted
                      ? "bg-white/20 text-white"
                      : "bg-[var(--color-primary,#2563eb)]/10 text-[var(--color-primary,#2563eb)]"
                  )}
                >
                  {plan.badge}
                </span>
              )}
              <h3
                className={cn(
                  "text-xl font-bold mb-2",
                  !plan.highlighted && "text-[var(--color-text-primary,#0f172a)]"
                )}
              >
                {plan.name}
              </h3>
              {plan.description && (
                <p
                  className={cn(
                    "text-sm mb-6",
                    plan.highlighted ? "text-white/80" : "text-[var(--color-text-secondary,#475569)]"
                  )}
                >
                  {plan.description}
                </p>
              )}
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {content.currency || "$"}
                  {isYearly ? plan.price.yearly : plan.price.monthly || plan.price.custom}
                </span>
                {(plan.price.monthly || plan.price.yearly) && (
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-white/70" : "text-[var(--color-text-muted,#94a3b8)]"
                    )}
                  >
                    /{isYearly ? "year" : "month"}
                  </span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <svg
                      className={cn(
                        "w-5 h-5 flex-shrink-0 mt-0.5",
                        feature.included
                          ? plan.highlighted
                            ? "text-white"
                            : "text-[var(--color-primary,#2563eb)]"
                          : "text-[var(--color-text-muted,#94a3b8)]"
                      )}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {feature.included ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      )}
                    </svg>
                    <span
                      className={cn(
                        !feature.included && "line-through opacity-50"
                      )}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.url}
                className={cn(
                  "block w-full py-3 text-center font-medium rounded-lg transition-colors",
                  plan.highlighted
                    ? "bg-white text-[var(--color-primary,#2563eb)] hover:bg-white/90"
                    : "bg-[var(--color-primary,#2563eb)] text-white hover:opacity-90"
                )}
              >
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingComparison({ content, className }: PricingVariantProps) {
  const plans = content.plans || [];
  const allFeatures = new Set<string>();
  plans.forEach((plan) => {
    plan.features.forEach((f) => allFeatures.add(f.text));
  });

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

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left py-4 px-4 border-b border-[var(--color-border,#e2e8f0)]">
                  <span className="text-[var(--color-text-secondary,#475569)]">Features</span>
                </th>
                {plans.map((plan, index) => (
                  <th key={index} className="text-center py-4 px-4 border-b border-[var(--color-border,#e2e8f0)]">
                    <div className={cn(plan.highlighted && "text-[var(--color-primary,#2563eb)]")}>
                      <div className="font-bold text-lg">{plan.name}</div>
                      <div className="text-2xl font-bold mt-2">
                        {content.currency || "$"}{plan.price.monthly || plan.price.custom}
                        {plan.price.monthly && (
                          <span className="text-sm font-normal text-[var(--color-text-muted,#94a3b8)]">/mo</span>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from(allFeatures).map((featureText, fIndex) => (
                <tr key={fIndex} className="border-b border-[var(--color-border,#e2e8f0)]">
                  <td className="py-4 px-4 text-[var(--color-text-primary,#0f172a)]">{featureText}</td>
                  {plans.map((plan, pIndex) => {
                    const feature = plan.features.find((f) => f.text === featureText);
                    return (
                      <td key={pIndex} className="text-center py-4 px-4">
                        {feature?.included ? (
                          <svg
                            className="w-5 h-5 text-[var(--color-primary,#2563eb)] mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-[var(--color-text-muted,#94a3b8)] mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-6 px-4" />
                {plans.map((plan, index) => (
                  <td key={index} className="py-6 px-4 text-center">
                    <a
                      href={plan.cta.url}
                      className={cn(
                        "inline-block px-6 py-3 font-medium rounded-lg transition-colors",
                        plan.highlighted
                          ? "bg-[var(--color-primary,#2563eb)] text-white hover:opacity-90"
                          : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-primary,#0f172a)] hover:bg-[var(--color-border,#e2e8f0)]"
                      )}
                    >
                      {plan.cta.text}
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

function PricingSimple({ content, className }: PricingVariantProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Simple Pricing List */}
        <div className="space-y-4">
          {content.plans?.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-xl",
                plan.highlighted
                  ? "bg-[var(--color-primary,#2563eb)] text-white"
                  : "bg-[var(--color-surface,#f8fafc)]"
              )}
            >
              <div className="flex-1">
                <h3 className={cn("text-xl font-bold", !plan.highlighted && "text-[var(--color-text-primary,#0f172a)]")}>
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className={cn("text-sm mt-1", plan.highlighted ? "text-white/80" : "text-[var(--color-text-secondary,#475569)]")}>
                    {plan.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-6">
                <span className="text-3xl font-bold">
                  {content.currency || "$"}{plan.price.monthly || plan.price.custom}
                  {plan.price.monthly && (
                    <span className={cn("text-sm font-normal", plan.highlighted ? "text-white/70" : "text-[var(--color-text-muted,#94a3b8)]")}>
                      /mo
                    </span>
                  )}
                </span>
                <a
                  href={plan.cta.url}
                  className={cn(
                    "px-6 py-2 font-medium rounded-lg transition-colors",
                    plan.highlighted
                      ? "bg-white text-[var(--color-primary,#2563eb)] hover:bg-white/90"
                      : "bg-[var(--color-primary,#2563eb)] text-white hover:opacity-90"
                  )}
                >
                  {plan.cta.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingToggle({ content, className }: PricingVariantProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-surface,#f8fafc)]", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-8">
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

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[var(--color-background,#ffffff)] rounded-full p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-colors",
                !isYearly
                  ? "bg-[var(--color-primary,#2563eb)] text-white"
                  : "text-[var(--color-text-secondary,#475569)]"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-colors",
                isYearly
                  ? "bg-[var(--color-primary,#2563eb)] text-white"
                  : "text-[var(--color-text-secondary,#475569)]"
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8">
          {content.plans?.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "bg-[var(--color-background,#ffffff)] rounded-2xl p-8",
                plan.highlighted && "ring-2 ring-[var(--color-primary,#2563eb)]"
              )}
            >
              {plan.badge && (
                <span className="inline-block bg-[var(--color-primary,#2563eb)]/10 text-[var(--color-primary,#2563eb)] text-xs font-medium px-3 py-1 rounded-full mb-4">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-xl font-bold text-[var(--color-text-primary,#0f172a)] mb-2">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                  {content.currency || "$"}
                  {isYearly ? plan.price.yearly : plan.price.monthly}
                </span>
                <span className="text-[var(--color-text-muted,#94a3b8)]">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.filter((f) => f.included).map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-[var(--color-text-secondary,#475569)]">
                    <svg className="w-5 h-5 text-[var(--color-primary,#2563eb)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.text}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.url}
                className={cn(
                  "block w-full py-3 text-center font-medium rounded-lg transition-colors",
                  plan.highlighted
                    ? "bg-[var(--color-primary,#2563eb)] text-white hover:opacity-90"
                    : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-primary,#0f172a)] hover:bg-[var(--color-border,#e2e8f0)]"
                )}
              >
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
