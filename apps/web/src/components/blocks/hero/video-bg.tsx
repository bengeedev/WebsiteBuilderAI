"use client";

import React from "react";
import { cn } from "@repo/ui";
import type { HeroVariantProps } from "./index";
import { HeroButton, HeroStats } from "./index";

export function HeroVideoBg({ content, className }: HeroVariantProps) {
  return (
    <div className={cn("relative min-h-[80vh] flex items-center justify-center overflow-hidden", className)}>
      {/* Video Background */}
      {content.video ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={content.video.poster}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={content.video.src} type="video/mp4" />
        </video>
      ) : content.image ? (
        <img
          src={content.image.src}
          alt={content.image.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        {content.badge && (
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm">
            {content.badge}
          </span>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-[var(--font-heading)]">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="mt-4 text-xl md:text-2xl font-medium text-white/90">
            {content.subtitle}
          </p>
        )}

        {content.description && (
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            {content.description}
          </p>
        )}

        {(content.primaryCta || content.secondaryCta) && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {content.primaryCta && (
              <HeroButton
                text={content.primaryCta.text}
                url={content.primaryCta.url}
                variant="white"
              />
            )}
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.url}
                className="inline-flex items-center justify-center px-6 py-3 text-white font-medium border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {content.secondaryCta.text}
              </a>
            )}
          </div>
        )}

        {content.stats && content.stats.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {content.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
