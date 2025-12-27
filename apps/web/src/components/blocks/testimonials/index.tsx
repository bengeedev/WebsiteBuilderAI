"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";
import { SectionHeader } from "../features";

export type TestimonialItem = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
};

export type TestimonialsContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  testimonials: TestimonialItem[];
};

export type TestimonialsVariantProps = {
  content: TestimonialsContent;
  className?: string;
};

export function TestimonialsBlock({ content, variant, className }: BlockComponentProps) {
  const testimonialsContent = content as TestimonialsContent;

  switch (variant) {
    case "grid":
      return <TestimonialsGrid content={testimonialsContent} className={className} />;
    case "carousel":
      return <TestimonialsCarousel content={testimonialsContent} className={className} />;
    case "single-focus":
      return <TestimonialsSingleFocus content={testimonialsContent} className={className} />;
    case "cards-with-rating":
      return <TestimonialsCardsWithRating content={testimonialsContent} className={className} />;
    default:
      return <TestimonialsGrid content={testimonialsContent} className={className} />;
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn(
            "text-base sm:text-lg",
            star <= rating ? "text-yellow-400" : "text-gray-300"
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function TestimonialsGrid({ content, className }: TestimonialsVariantProps) {
  const columns = content.testimonials.length <= 2 ? 2 : 3;

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {content.testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-[var(--color-surface,#f8fafc)] border border-[var(--color-border,#e2e8f0)]"
          >
            <p className="text-sm sm:text-base text-[var(--color-text-secondary,#475569)] mb-3 sm:mb-4 italic">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary,#2563eb)]/10 flex items-center justify-center text-[var(--color-primary,#2563eb)] font-semibold text-sm sm:text-base">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                  {testimonial.author}
                </p>
                {(testimonial.role || testimonial.company) && (
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted,#94a3b8)]">
                    {testimonial.role}
                    {testimonial.role && testimonial.company && " at "}
                    {testimonial.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsCarousel({ content, className }: TestimonialsVariantProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {content.testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-2 sm:px-4">
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary,#475569)] mb-4 sm:mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex flex-col items-center">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mb-2 sm:mb-3"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--color-primary,#2563eb)]/10 flex items-center justify-center text-[var(--color-primary,#2563eb)] font-semibold text-lg sm:text-xl mb-2 sm:mb-3">
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <p className="font-semibold text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                    {testimonial.author}
                  </p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted,#94a3b8)]">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && " at "}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation dots */}
        {content.testimonials.length > 1 && (
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {content.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors",
                  index === activeIndex
                    ? "bg-[var(--color-primary,#2563eb)]"
                    : "bg-[var(--color-border,#e2e8f0)] hover:bg-[var(--color-primary,#2563eb)]/50"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TestimonialsSingleFocus({ content, className }: TestimonialsVariantProps) {
  const testimonial = content.testimonials[0];

  if (!testimonial) return null;

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-4 sm:mb-6">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto text-[var(--color-primary,#2563eb)]/20"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
          </svg>
        </div>
        <p className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-primary,#0f172a)] mb-6 sm:mb-8 leading-relaxed">
          "{testimonial.quote}"
        </p>
        <div className="flex flex-col items-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.author}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-4"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--color-primary,#2563eb)]/10 flex items-center justify-center text-[var(--color-primary,#2563eb)] font-semibold text-xl sm:text-2xl mb-3 sm:mb-4">
              {testimonial.author.charAt(0)}
            </div>
          )}
          <p className="text-base sm:text-lg font-semibold text-[var(--color-text-primary,#0f172a)]">
            {testimonial.author}
          </p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm sm:text-base text-[var(--color-text-muted,#94a3b8)]">
              {testimonial.role}
              {testimonial.role && testimonial.company && " at "}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function TestimonialsCardsWithRating({ content, className }: TestimonialsVariantProps) {
  const columns = content.testimonials.length <= 2 ? 2 : 3;

  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div
        className={cn(
          "grid gap-4 sm:gap-6",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {content.testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-[var(--color-surface,#f8fafc)] border border-[var(--color-border,#e2e8f0)] shadow-sm"
          >
            {testimonial.rating && (
              <div className="mb-3 sm:mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
            )}
            <p className="text-sm sm:text-base text-[var(--color-text-secondary,#475569)] mb-3 sm:mb-4">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary,#2563eb)]/10 flex items-center justify-center text-[var(--color-primary,#2563eb)] font-semibold text-sm sm:text-base">
                  {testimonial.author.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm sm:text-base text-[var(--color-text-primary,#0f172a)]">
                  {testimonial.author}
                </p>
                {(testimonial.role || testimonial.company) && (
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted,#94a3b8)]">
                    {testimonial.role}
                    {testimonial.role && testimonial.company && " at "}
                    {testimonial.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
