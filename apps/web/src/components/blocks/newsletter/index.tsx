"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type NewsletterContent = {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  features?: Array<{
    text: string;
  }>;
  image?: string;
  privacyText?: string;
  privacyLink?: string;
  includeNameField?: boolean;
};

export type NewsletterVariantProps = {
  content: NewsletterContent;
  className?: string;
};

export function NewsletterBlock({ content, variant, className }: BlockComponentProps) {
  const newsletterContent = content as NewsletterContent;

  switch (variant) {
    case "inline":
      return <NewsletterInline content={newsletterContent} className={className} />;
    case "card":
      return <NewsletterCard content={newsletterContent} className={className} />;
    case "split":
      return <NewsletterSplit content={newsletterContent} className={className} />;
    case "banner":
      return <NewsletterBanner content={newsletterContent} className={className} />;
    default:
      return <NewsletterInline content={newsletterContent} className={className} />;
  }
}

function NewsletterInline({ content, className }: NewsletterVariantProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background)]", className)}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {content.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            {content.title}
          </h2>
        )}
        {content.description && (
          <p className="text-[var(--color-text-secondary)] mb-8">
            {content.description}
          </p>
        )}

        {submitted ? (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg">
            {content.successMessage || "Thanks for subscribing!"}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            {content.includeNameField && (
              <input
                type="text"
                placeholder="Your name"
                className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
              />
            )}
            <input
              type="email"
              placeholder={content.placeholder || "Enter your email"}
              required
              className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {content.buttonText || "Subscribe"}
            </button>
          </form>
        )}

        {content.privacyText && (
          <p className="text-sm text-[var(--color-text-muted)] mt-4">
            {content.privacyText}
            {content.privacyLink && (
              <a href={content.privacyLink} className="underline hover:text-[var(--color-primary)]">
                {" "}Privacy Policy
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}

function NewsletterCard({ content, className }: NewsletterVariantProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-surface)]", className)}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--color-background)] rounded-2xl p-8 shadow-[var(--shadow-lg)] text-center">
          {content.title && (
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              {content.title}
            </h2>
          )}
          {content.description && (
            <p className="text-[var(--color-text-secondary)] mb-6">
              {content.description}
            </p>
          )}

          {content.features && content.features.length > 0 && (
            <ul className="text-left mb-6 space-y-2">
              {content.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature.text}
                </li>
              ))}
            </ul>
          )}

          {submitted ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg">
              {content.successMessage || "Thanks for subscribing!"}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              {content.includeNameField && (
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                />
              )}
              <input
                type="email"
                placeholder={content.placeholder || "Enter your email"}
                required
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                {content.buttonText || "Subscribe"}
              </button>
            </form>
          )}

          {content.privacyText && (
            <p className="text-xs text-[var(--color-text-muted)] mt-4">
              {content.privacyText}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function NewsletterSplit({ content, className }: NewsletterVariantProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-[var(--color-text-secondary)] mb-6">
                {content.description}
              </p>
            )}

            {content.features && content.features.length > 0 && (
              <ul className="space-y-3 mb-8">
                {content.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                    <svg className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature.text}
                  </li>
                ))}
              </ul>
            )}

            {submitted ? (
              <div className="p-4 bg-green-50 text-green-700 rounded-lg">
                {content.successMessage || "Thanks for subscribing!"}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={content.placeholder || "Enter your email"}
                  required
                  className="flex-1 px-4 py-3 border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {content.buttonText || "Subscribe"}
                </button>
              </form>
            )}
          </div>

          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
            {content.image ? (
              <img
                src={content.image}
                alt="Newsletter"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[var(--color-surface)] flex items-center justify-center">
                <svg className="w-24 h-24 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function NewsletterBanner({ content, className }: NewsletterVariantProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={cn("py-12 md:py-16 bg-[var(--color-primary)]", className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-white">
            {content.title && (
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-white/80">
                {content.description}
              </p>
            )}
          </div>

          {submitted ? (
            <div className="p-4 bg-white/20 text-white rounded-lg">
              {content.successMessage || "Thanks for subscribing!"}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <input
                type="email"
                placeholder={content.placeholder || "Enter your email"}
                required
                className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-[var(--color-primary)] font-medium rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                {content.buttonText || "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
