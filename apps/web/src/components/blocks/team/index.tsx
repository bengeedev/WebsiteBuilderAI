"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type TeamContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  members?: Array<{
    name: string;
    role: string;
    bio?: string;
    image?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  }>;
  showSocial?: boolean;
  showBio?: boolean;
};

export type TeamVariantProps = {
  content: TeamContent;
  className?: string;
};

export function TeamBlock({ content, variant, className }: BlockComponentProps) {
  const teamContent = content as TeamContent;

  switch (variant) {
    case "grid":
      return <TeamGrid content={teamContent} className={className} />;
    case "cards":
      return <TeamCards content={teamContent} className={className} />;
    case "horizontal":
      return <TeamHorizontal content={teamContent} className={className} />;
    case "compact":
      return <TeamCompact content={teamContent} className={className} />;
    default:
      return <TeamGrid content={teamContent} className={className} />;
  }
}

function TeamGrid({ content, className }: TeamVariantProps) {
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

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {content.members?.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-xl mx-auto max-w-[200px]">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-surface,#f8fafc)] flex items-center justify-center">
                    <span className="text-4xl text-[var(--color-text-muted,#94a3b8)]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary,#0f172a)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--color-primary,#2563eb)]">{member.role}</p>
              {content.showBio && member.bio && (
                <p className="text-sm text-[var(--color-text-secondary,#475569)] mt-2">
                  {member.bio}
                </p>
              )}
              {content.showSocial && member.socialLinks && member.socialLinks.length > 0 && (
                <div className="flex justify-center gap-3 mt-3">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-text-muted,#94a3b8)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCards({ content, className }: TeamVariantProps) {
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

        {/* Team Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.members?.map((member, index) => (
            <div
              key={index}
              className="bg-[var(--color-background,#ffffff)] rounded-2xl overflow-hidden shadow-[var(--shadow-md,0_4px_6px_-1px_rgba(0,0,0,0.1))] group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-surface,#f8fafc)] flex items-center justify-center">
                    <span className="text-6xl text-[var(--color-text-muted,#94a3b8)]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--color-text-primary,#0f172a)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary,#2563eb)] mb-3">{member.role}</p>
                {content.showBio && member.bio && (
                  <p className="text-[var(--color-text-secondary,#475569)] text-sm mb-4">
                    {member.bio}
                  </p>
                )}
                {content.showSocial && member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted,#94a3b8)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamHorizontal({ content, className }: TeamVariantProps) {
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

        {/* Horizontal Team Layout */}
        <div className="space-y-12">
          {content.members?.map((member, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col md:flex-row gap-8 items-center",
                index % 2 === 1 && "md:flex-row-reverse"
              )}
            >
              <div className="w-48 h-48 flex-shrink-0 overflow-hidden rounded-full">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-surface,#f8fafc)] flex items-center justify-center">
                    <span className="text-5xl text-[var(--color-text-muted,#94a3b8)]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className={cn("flex-1 text-center md:text-left", index % 2 === 1 && "md:text-right")}>
                <h3 className="text-2xl font-semibold text-[var(--color-text-primary,#0f172a)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary,#2563eb)] mb-3">{member.role}</p>
                {content.showBio && member.bio && (
                  <p className="text-[var(--color-text-secondary,#475569)]">
                    {member.bio}
                  </p>
                )}
                {content.showSocial && member.socialLinks && member.socialLinks.length > 0 && (
                  <div
                    className={cn(
                      "flex gap-4 mt-4",
                      "justify-center md:justify-start",
                      index % 2 === 1 && "md:justify-end"
                    )}
                  >
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-text-muted,#94a3b8)] hover:text-[var(--color-primary,#2563eb)] transition-colors"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCompact({ content, className }: TeamVariantProps) {
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

        {/* Compact Team Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {content.members?.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--color-surface,#f8fafc)] flex items-center justify-center">
                    <span className="text-2xl text-[var(--color-text-muted,#94a3b8)]">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-[var(--color-text-primary,#0f172a)]">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary,#475569)]">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
