"use client";

import React from "react";
import type { BlockInstance, DesignTokens } from "@repo/templates";
import { TokenProvider } from "./token-provider";
import { BlockRenderer } from "./block-renderer";
import { cn } from "@repo/ui";

export type PageData = {
  id: string;
  name: string;
  slug: string;
  blocks: BlockInstance[];
  meta?: {
    title?: string;
    description?: string;
  };
};

type PageRendererProps = {
  page: PageData;
  tokens?: Partial<DesignTokens>;
  isEditing?: boolean;
  selectedBlockId?: string;
  onBlockSelect?: (blockId: string) => void;
  className?: string;
};

export function PageRenderer({
  page,
  tokens,
  isEditing = false,
  selectedBlockId,
  onBlockSelect,
  className,
}: PageRendererProps) {
  return (
    <TokenProvider tokens={tokens}>
      <div
        className={cn(
          "min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)]",
          "font-[var(--font-body)]",
          className
        )}
        style={{
          fontFamily: "var(--font-body)",
        }}
      >
        {page.blocks.map((block, index) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing={isEditing}
            isSelected={selectedBlockId === block.id}
            onSelect={onBlockSelect}
          />
        ))}

        {page.blocks.length === 0 && (
          <div className="flex items-center justify-center min-h-[400px] text-gray-400">
            <div className="text-center">
              <p className="text-lg">No blocks added yet</p>
              {isEditing && (
                <p className="text-sm mt-2">
                  Use the AI command bar to add sections
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </TokenProvider>
  );
}

// Helper component for rendering a full site with multiple pages
type SiteRendererProps = {
  pages: PageData[];
  tokens?: Partial<DesignTokens>;
  activePage?: string;
  isEditing?: boolean;
  selectedBlockId?: string;
  onBlockSelect?: (blockId: string) => void;
};

export function SiteRenderer({
  pages,
  tokens,
  activePage,
  isEditing = false,
  selectedBlockId,
  onBlockSelect,
}: SiteRendererProps) {
  const currentPage = activePage
    ? pages.find((p) => p.slug === activePage || p.id === activePage)
    : pages[0];

  if (!currentPage) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Page not found
      </div>
    );
  }

  return (
    <PageRenderer
      page={currentPage}
      tokens={tokens}
      isEditing={isEditing}
      selectedBlockId={selectedBlockId}
      onBlockSelect={onBlockSelect}
    />
  );
}
