"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type FooterContent = {
  logo?: {
    src?: string;
    text?: string;
  };
  tagline?: string;
  columns?: Array<{
    title: string;
    links: Array<{
      text: string;
      url: string;
    }>;
  }>;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  newsletter?: {
    title?: string;
    description?: string;
    placeholder?: string;
    buttonText?: string;
  };
  copyright?: string;
  legalLinks?: Array<{
    text: string;
    url: string;
  }>;
};

export type FooterVariantProps = {
  content: FooterContent;
  className?: string;
};

export function FooterBlock({ content, variant, className }: BlockComponentProps) {
  const footerContent = content as FooterContent;

  switch (variant) {
    case "columns":
      return <FooterColumns content={footerContent} className={className} />;
    case "simple":
      return <FooterSimple content={footerContent} className={className} />;
    case "centered":
      return <FooterCentered content={footerContent} className={className} />;
    case "mega":
      return <FooterMega content={footerContent} className={className} />;
    default:
      return <FooterColumns content={footerContent} className={className} />;
  }
}

function FooterColumns({ content, className }: FooterVariantProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[var(--color-secondary,#1e293b)] text-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Logo & Tagline */}
          <div className="sm:col-span-2 lg:col-span-1">
            {content.logo && (
              <div className="mb-4">
                {content.logo.src ? (
                  <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-8" />
                ) : (
                  <span className="text-xl font-bold">{content.logo.text}</span>
                )}
              </div>
            )}
            {content.tagline && (
              <p className="text-white/70 text-sm leading-relaxed">{content.tagline}</p>
            )}
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {content.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {content.columns?.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-white/60 text-sm">
              {content.copyright || `© ${currentYear} All rights reserved.`}
            </p>
            {content.legalLinks && content.legalLinks.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
                {content.legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSimple({ content, className }: FooterVariantProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[var(--color-surface,#f8fafc)] border-t border-[var(--color-border,#e2e8f0)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          {content.logo && (
            <div className="order-1 sm:order-none">
              {content.logo.src ? (
                <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-6" />
              ) : (
                <span className="font-semibold text-[var(--color-text-primary,#0f172a)]">
                  {content.logo.text}
                </span>
              )}
            </div>
          )}

          <p className="text-[var(--color-text-muted,#94a3b8)] text-sm order-3 sm:order-none">
            {content.copyright || `© ${currentYear} All rights reserved.`}
          </p>

          {content.socialLinks && content.socialLinks.length > 0 && (
            <div className="flex gap-4 order-2 sm:order-none">
              {content.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-[var(--color-text-muted,#94a3b8)] hover:text-[var(--color-primary,#2563eb)] transition-colors text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterCentered({ content, className }: FooterVariantProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[var(--color-surface,#f8fafc)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-center">
        {content.logo && (
          <div className="mb-4 sm:mb-6">
            {content.logo.src ? (
              <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-8 mx-auto" />
            ) : (
              <span className="text-xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.logo.text}
              </span>
            )}
          </div>
        )}

        {content.tagline && (
          <p className="text-[var(--color-text-secondary,#475569)] mb-6 max-w-md mx-auto text-sm sm:text-base">
            {content.tagline}
          </p>
        )}

        {content.columns && content.columns.length > 0 && (
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {content.columns.flatMap((col) =>
              col.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-[var(--color-text-secondary,#475569)] hover:text-[var(--color-primary,#2563eb)] transition-colors text-sm"
                >
                  {link.text}
                </a>
              ))
            )}
          </nav>
        )}

        {content.socialLinks && content.socialLinks.length > 0 && (
          <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {content.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-[var(--color-text-muted,#94a3b8)] hover:text-[var(--color-primary,#2563eb)] transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.platform}
              </a>
            ))}
          </div>
        )}

        <div className="pt-6 sm:pt-8 border-t border-[var(--color-border,#e2e8f0)]">
          <p className="text-[var(--color-text-muted,#94a3b8)] text-sm">
            {content.copyright || `© ${currentYear} All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterMega({ content, className }: FooterVariantProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("bg-[var(--color-secondary,#1e293b)] text-white", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        {content.newsletter && (
          <div className="py-8 sm:py-12 border-b border-white/10">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {content.newsletter.title || "Subscribe to our newsletter"}
              </h3>
              <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">
                {content.newsletter.description || "Get the latest updates and news."}
              </p>
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={content.newsletter.placeholder || "Enter your email"}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-[var(--color-secondary,#1e293b)] font-medium rounded-lg hover:bg-white/90 transition-colors text-sm whitespace-nowrap"
                >
                  {content.newsletter.buttonText || "Subscribe"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {/* Logo & Info */}
          <div className="sm:col-span-2">
            {content.logo && (
              <div className="mb-4">
                {content.logo.src ? (
                  <img src={content.logo.src} alt={content.logo.text || "Logo"} className="h-8" />
                ) : (
                  <span className="text-xl font-bold">{content.logo.text}</span>
                )}
              </div>
            )}
            {content.tagline && (
              <p className="text-white/70 text-sm mb-4 leading-relaxed">{content.tagline}</p>
            )}
            {content.socialLinks && content.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {content.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link Columns */}
          {content.columns?.map((column, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-white/60 text-sm">
              {content.copyright || `© ${currentYear} All rights reserved.`}
            </p>
            {content.legalLinks && content.legalLinks.length > 0 && (
              <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
                {content.legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
