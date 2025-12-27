"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type HeaderContent = {
  logo?: {
    src?: string;
    text?: string;
  };
  navigation?: Array<{
    text: string;
    url: string;
    children?: Array<{
      text: string;
      url: string;
    }>;
  }>;
  cta?: {
    text: string;
    url: string;
  };
  secondaryCta?: {
    text: string;
    url: string;
  };
  topBar?: {
    text?: string;
    phone?: string;
    email?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
  sticky?: boolean;
};

export type HeaderVariantProps = {
  content: HeaderContent;
  className?: string;
};

export function HeaderBlock({ content, variant, className }: BlockComponentProps) {
  const headerContent = content as HeaderContent;

  switch (variant) {
    case "simple":
      return <HeaderSimple content={headerContent} className={className} />;
    case "centered":
      return <HeaderCentered content={headerContent} className={className} />;
    case "transparent":
      return <HeaderTransparent content={headerContent} className={className} />;
    case "with-topbar":
      return <HeaderWithTopbar content={headerContent} className={className} />;
    default:
      return <HeaderSimple content={headerContent} className={className} />;
  }
}

function HeaderSimple({ content, className }: HeaderVariantProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("bg-[var(--color-background,#ffffff)] border-b border-[var(--color-border,#e2e8f0)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {content.logo?.src ? (
              <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-7 sm:h-8" />
            ) : (
              <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.logo?.text || "Logo"}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {content.navigation?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-sm text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
              >
                {item.text}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.url}
                className="text-sm text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
              >
                {content.secondaryCta.text}
              </a>
            )}
            {content.cta && (
              <a
                href={content.cta.url}
                className="px-4 py-2 text-sm bg-[var(--color-primary,#2563eb)] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                {content.cta.text}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-[var(--color-text-primary,#0f172a)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border,#e2e8f0)]">
            <nav className="flex flex-col gap-3">
              {content.navigation?.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="py-2 text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                >
                  {item.text}
                </a>
              ))}
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.url}
                  className="py-2 text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                >
                  {content.secondaryCta.text}
                </a>
              )}
              {content.cta && (
                <a
                  href={content.cta.url}
                  className="mt-2 px-4 py-3 bg-[var(--color-primary,#2563eb)] text-white rounded-lg text-center hover:opacity-90 transition-opacity"
                >
                  {content.cta.text}
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeaderCentered({ content, className }: HeaderVariantProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("bg-[var(--color-background,#ffffff)] border-b border-[var(--color-border,#e2e8f0)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Logo left, hamburger right */}
        <div className="flex md:hidden justify-between items-center h-14">
          <div className="flex-shrink-0">
            {content.logo?.src ? (
              <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-7" />
            ) : (
              <span className="text-lg font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.logo?.text || "Logo"}
              </span>
            )}
          </div>
          <button
            className="p-2 -mr-2 text-[var(--color-text-primary,#0f172a)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop: Centered layout */}
        <div className="hidden md:flex flex-col items-center py-4">
          {/* Logo */}
          <div className="mb-4">
            {content.logo?.src ? (
              <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-10" />
            ) : (
              <span className="text-2xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.logo?.text || "Logo"}
              </span>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 lg:gap-8">
            {content.navigation?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-sm text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
              >
                {item.text}
              </a>
            ))}
            {content.cta && (
              <a
                href={content.cta.url}
                className="px-4 py-2 text-sm bg-[var(--color-primary,#2563eb)] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                {content.cta.text}
              </a>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--color-border,#e2e8f0)]">
            <nav className="flex flex-col items-center gap-3">
              {content.navigation?.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="py-2 text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                >
                  {item.text}
                </a>
              ))}
              {content.cta && (
                <a
                  href={content.cta.url}
                  className="mt-2 px-4 py-3 bg-[var(--color-primary,#2563eb)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {content.cta.text}
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeaderTransparent({ content, className }: HeaderVariantProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("absolute top-0 left-0 right-0 z-50 bg-transparent", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {content.logo?.src ? (
              <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-7 sm:h-8" />
            ) : (
              <span className="text-lg sm:text-xl font-bold text-white">
                {content.logo?.text || "Logo"}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {content.navigation?.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                {item.text}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            {content.secondaryCta && (
              <a
                href={content.secondaryCta.url}
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                {content.secondaryCta.text}
              </a>
            )}
            {content.cta && (
              <a
                href={content.cta.url}
                className="px-4 py-2 text-sm bg-white text-[var(--color-primary,#2563eb)] rounded-lg hover:bg-white/90 transition-colors font-medium"
              >
                {content.cta.text}
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 mx-2 bg-black/90 backdrop-blur-sm rounded-lg">
            <nav className="flex flex-col gap-1 px-4">
              {content.navigation?.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="py-3 text-white/90 hover:text-white transition-colors"
                >
                  {item.text}
                </a>
              ))}
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.url}
                  className="py-3 text-white/90 hover:text-white transition-colors"
                >
                  {content.secondaryCta.text}
                </a>
              )}
              {content.cta && (
                <a
                  href={content.cta.url}
                  className="mt-2 px-4 py-3 bg-white text-[var(--color-primary,#2563eb)] rounded-lg text-center font-medium hover:bg-white/90 transition-colors"
                >
                  {content.cta.text}
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function HeaderWithTopbar({ content, className }: HeaderVariantProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("", className)}>
      {/* Top Bar - Hidden on mobile */}
      {content.topBar && (
        <div className="hidden sm:block bg-[var(--color-secondary,#1e293b)] text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs sm:text-sm">
            <span className="truncate">{content.topBar.text}</span>
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {content.topBar.phone && (
                <a href={`tel:${content.topBar.phone}`} className="hover:opacity-80 hidden sm:inline">
                  {content.topBar.phone}
                </a>
              )}
              {content.topBar.email && (
                <a href={`mailto:${content.topBar.email}`} className="hover:opacity-80 hidden lg:inline">
                  {content.topBar.email}
                </a>
              )}
              {content.topBar.socialLinks?.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-[var(--color-background,#ffffff)] border-b border-[var(--color-border,#e2e8f0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {content.logo?.src ? (
                <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-7 sm:h-8" />
              ) : (
                <span className="text-lg sm:text-xl font-bold text-[var(--color-text-primary,#0f172a)]">
                  {content.logo?.text || "Logo"}
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {content.navigation?.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="text-sm text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                >
                  {item.text}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {content.secondaryCta && (
                <a
                  href={content.secondaryCta.url}
                  className="text-sm text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                >
                  {content.secondaryCta.text}
                </a>
              )}
              {content.cta && (
                <a
                  href={content.cta.url}
                  className="px-4 py-2 text-sm bg-[var(--color-primary,#2563eb)] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {content.cta.text}
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 -mr-2 text-[var(--color-text-primary,#0f172a)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[var(--color-border,#e2e8f0)]">
              <nav className="flex flex-col gap-3">
                {content.navigation?.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    className="py-2 text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                  >
                    {item.text}
                  </a>
                ))}
                {content.secondaryCta && (
                  <a
                    href={content.secondaryCta.url}
                    className="py-2 text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                  >
                    {content.secondaryCta.text}
                  </a>
                )}
                {content.cta && (
                  <a
                    href={content.cta.url}
                    className="mt-2 px-4 py-3 bg-[var(--color-primary,#2563eb)] text-white rounded-lg text-center hover:opacity-90 transition-opacity"
                  >
                    {content.cta.text}
                  </a>
                )}
                {/* Mobile contact info */}
                {content.topBar?.phone && (
                  <a
                    href={`tel:${content.topBar.phone}`}
                    className="py-2 text-[var(--color-text-muted,#94a3b8)] text-sm"
                  >
                    📞 {content.topBar.phone}
                  </a>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
