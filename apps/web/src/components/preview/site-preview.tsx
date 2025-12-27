"use client";

import type { BlockInstance, DesignTokens } from "@repo/templates";
import { defaultTokens } from "@repo/templates";
import { PageRenderer, type PageData } from "../renderer/page-renderer";

// ============================================
// NEW BLOCK-BASED PREVIEW (Primary)
// ============================================

type BlockBasedProps = {
  blocks: BlockInstance[];
  tokens?: Partial<DesignTokens>;
  businessName?: string;
  isEditing?: boolean;
  onSelectBlock?: (blockId: string) => void;
  selectedBlockId?: string;
};

/**
 * Block-based site preview using the new composable renderer
 */
export function SitePreview({
  blocks,
  tokens,
  businessName,
  isEditing = false,
  onSelectBlock,
  selectedBlockId,
}: BlockBasedProps) {
  // Merge provided tokens with defaults
  const mergedTokens: DesignTokens = {
    ...defaultTokens,
    ...tokens,
    colors: {
      ...defaultTokens.colors,
      ...tokens?.colors,
      text: {
        ...defaultTokens.colors.text,
        ...tokens?.colors?.text,
      },
    },
    typography: {
      ...defaultTokens.typography,
      ...tokens?.typography,
      fontFamily: {
        ...defaultTokens.typography.fontFamily,
        ...tokens?.typography?.fontFamily,
      },
      fontSize: {
        ...defaultTokens.typography.fontSize,
        ...tokens?.typography?.fontSize,
      },
      fontWeight: {
        ...defaultTokens.typography.fontWeight,
        ...tokens?.typography?.fontWeight,
      },
      lineHeight: {
        ...defaultTokens.typography.lineHeight,
        ...tokens?.typography?.lineHeight,
      },
      letterSpacing: {
        ...defaultTokens.typography.letterSpacing,
        ...tokens?.typography?.letterSpacing,
      },
    },
    spacing: {
      ...defaultTokens.spacing,
      ...tokens?.spacing,
      section: {
        ...defaultTokens.spacing.section,
        ...tokens?.spacing?.section,
      },
      container: {
        ...defaultTokens.spacing.container,
        ...tokens?.spacing?.container,
      },
      gap: {
        ...defaultTokens.spacing.gap,
        ...tokens?.spacing?.gap,
      },
    },
    effects: {
      ...defaultTokens.effects,
      ...tokens?.effects,
      borderRadius: {
        ...defaultTokens.effects.borderRadius,
        ...tokens?.effects?.borderRadius,
      },
      shadow: {
        ...defaultTokens.effects.shadow,
        ...tokens?.effects?.shadow,
      },
      transition: {
        ...defaultTokens.effects.transition,
        ...tokens?.effects?.transition,
      },
    },
    breakpoints: {
      ...defaultTokens.breakpoints,
      ...tokens?.breakpoints,
    },
  };

  // Create a page object for PageRenderer
  const page: PageData = {
    id: "preview",
    name: "Preview",
    slug: "",
    blocks,
  };

  return (
    <div className="min-h-full bg-[var(--color-background,#ffffff)]">
      <PageRenderer
        page={page}
        tokens={mergedTokens}
        isEditing={isEditing}
        onBlockSelect={onSelectBlock}
        selectedBlockId={selectedBlockId}
      />
    </div>
  );
}

// ============================================
// LEGACY SECTION-BASED PREVIEW (Deprecated)
// ============================================

type LegacySectionData = {
  type?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    price?: string;
    name?: string;
    role?: string;
    quote?: string;
  }>;
  cta?: {
    text?: string;
    url?: string;
  };
};

type LegacyProps = {
  sections: Array<LegacySectionData>;
  styles: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  businessName: string;
};

/**
 * @deprecated Use SitePreview with blocks prop instead
 * Legacy section-based preview for backward compatibility
 */
export function LegacySitePreview({ sections, styles, businessName }: LegacyProps) {
  const primaryColor = styles.primaryColor || "#2563eb";
  const secondaryColor = styles.secondaryColor || "#1e293b";

  return (
    <div className="min-h-full">
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 px-6 py-4"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white">{businessName}</span>
          <div className="flex items-center gap-6">
            {sections.slice(1, 5).map((section, index) => (
              <a
                key={index}
                href={`#${section.type}`}
                className="text-sm text-gray-300 hover:text-white"
              >
                {section.title || section.type}
              </a>
            ))}
            <button
              className="px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Sections */}
      {sections.map((section, index) => (
        <LegacySection
          key={index}
          section={section}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          isFirst={index === 0}
        />
      ))}

      {/* Footer */}
      <footer
        className="px-6 py-12"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function LegacySection({
  section,
  primaryColor,
  secondaryColor,
  isFirst,
}: {
  section: LegacySectionData;
  primaryColor: string;
  secondaryColor: string;
  isFirst: boolean;
}) {
  const type = section.type || "default";

  if (type === "hero" || isFirst) {
    return (
      <section
        id={type}
        className="px-6 py-24 text-center"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="text-xl text-gray-300 mb-8">{section.subtitle}</p>
          )}
          {section.content && (
            <p className="text-lg text-gray-400 mb-8">{section.content}</p>
          )}
          {section.cta && (
            <button
              className="px-8 py-3 rounded-md text-lg font-medium text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {section.cta.text}
            </button>
          )}
        </div>
      </section>
    );
  }

  if (type === "about") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-lg text-gray-600 mb-6">{section.subtitle}</p>
          )}
          {section.content && (
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          )}
        </div>
      </section>
    );
  }

  if (type === "features" || type === "services") {
    return (
      <section id={type} className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-center text-gray-600 mb-12">{section.subtitle}</p>
          )}
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: secondaryColor }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "menu") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-center text-gray-600 mb-12">{section.subtitle}</p>
          )}
          <div className="space-y-6">
            {section.items?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-b pb-4"
              >
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: secondaryColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {item.price && (
                  <span
                    className="font-bold"
                    style={{ color: primaryColor }}
                  >
                    {item.price}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "testimonials") {
    return (
      <section id={type} className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  &ldquo;{item.quote || item.description}&rdquo;
                </p>
                <p className="font-semibold" style={{ color: secondaryColor }}>
                  {item.name || item.title}
                </p>
                {item.role && (
                  <p className="text-sm text-gray-500">{item.role}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "team") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  {item.icon || "👤"}
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: secondaryColor }}
                >
                  {item.title || item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {item.role || "Team Member"}
                </p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "contact" || type === "cta") {
    return (
      <section
        id={type}
        className="px-6 py-20"
        style={{ backgroundColor: type === "cta" ? primaryColor : "white" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              type === "cta" ? "text-white" : ""
            }`}
            style={type === "cta" ? {} : { color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.content && (
            <p
              className={`mb-8 ${
                type === "cta" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {section.content}
            </p>
          )}
          {section.cta && (
            <button
              className={`px-8 py-3 rounded-md text-lg font-medium ${
                type === "cta"
                  ? "bg-white"
                  : "text-white"
              }`}
              style={
                type === "cta"
                  ? { color: primaryColor }
                  : { backgroundColor: primaryColor }
              }
            >
              {section.cta.text}
            </button>
          )}
        </div>
      </section>
    );
  }

  // Default section
  return (
    <section id={type} className="px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: secondaryColor }}
        >
          {section.title}
        </h2>
        {section.content && (
          <p className="text-gray-600">{section.content}</p>
        )}
      </div>
    </section>
  );
}

// ============================================
// HELPER: Convert legacy sections to blocks
// ============================================

/**
 * Convert legacy section format to block instances
 * Useful for migrating existing sites to the new format
 */
export function convertSectionsToBlocks(
  sections: LegacySectionData[],
  styles: { primaryColor?: string; secondaryColor?: string },
  businessName: string
): BlockInstance[] {
  const blocks: BlockInstance[] = [];
  let blockIndex = 0;

  const generateId = () => `block_${Date.now()}_${blockIndex++}`;

  for (const section of sections) {
    const type = section.type || "default";

    switch (type) {
      case "hero":
        blocks.push({
          id: generateId(),
          blockType: "hero",
          variant: "centered",
          content: {
            title: section.title || "",
            subtitle: section.subtitle || "",
            description: section.content || "",
            primaryCta: section.cta
              ? { text: section.cta.text || "Get Started", url: section.cta.url || "#" }
              : undefined,
          },
        });
        break;

      case "about":
        blocks.push({
          id: generateId(),
          blockType: "text-with-image",
          variant: "image-right",
          content: {
            title: section.title || "",
            subtitle: section.subtitle || "",
            content: section.content || "",
          },
        });
        break;

      case "features":
      case "services":
        blocks.push({
          id: generateId(),
          blockType: "features",
          variant: "grid",
          content: {
            title: section.title || "",
            subtitle: section.subtitle || "",
            features: (section.items || []).map((item) => ({
              title: item.title || "",
              description: item.description || "",
              icon: item.icon || "star",
            })),
          },
        });
        break;

      case "menu":
        blocks.push({
          id: generateId(),
          blockType: "menu",
          variant: "columns",
          content: {
            title: section.title || "",
            subtitle: section.subtitle || "",
            categories: [
              {
                name: "Menu",
                items: (section.items || []).map((item) => ({
                  name: item.title || "",
                  description: item.description || "",
                  price: item.price || "",
                })),
              },
            ],
          },
        });
        break;

      case "testimonials":
        blocks.push({
          id: generateId(),
          blockType: "testimonials",
          variant: "grid",
          content: {
            title: section.title || "",
            testimonials: (section.items || []).map((item) => ({
              quote: item.quote || item.description || "",
              author: item.name || item.title || "",
              role: item.role || "",
            })),
          },
        });
        break;

      case "team":
        blocks.push({
          id: generateId(),
          blockType: "team",
          variant: "grid",
          content: {
            title: section.title || "",
            members: (section.items || []).map((item) => ({
              name: item.name || item.title || "",
              role: item.role || "",
              bio: item.description || "",
            })),
          },
        });
        break;

      case "cta":
        blocks.push({
          id: generateId(),
          blockType: "cta",
          variant: "banner",
          content: {
            title: section.title || "",
            description: section.content || "",
            primaryCta: section.cta
              ? { text: section.cta.text || "Get Started", url: section.cta.url || "#" }
              : undefined,
          },
        });
        break;

      case "contact":
        blocks.push({
          id: generateId(),
          blockType: "contact",
          variant: "simple",
          content: {
            title: section.title || "",
            description: section.content || "",
          },
        });
        break;

      default:
        // Generic content block
        blocks.push({
          id: generateId(),
          blockType: "text-with-image",
          variant: "image-right",
          content: {
            title: section.title || "",
            content: section.content || "",
          },
        });
    }
  }

  // Add header at the beginning
  blocks.unshift({
    id: generateId(),
    blockType: "header",
    variant: "simple",
    content: {
      logo: { text: businessName },
      navigation: sections
        .filter((s) => s.type && s.type !== "hero")
        .slice(0, 4)
        .map((s) => ({
          text: s.title || s.type || "",
          url: `#${s.type}`,
        })),
      cta: { text: "Contact", url: "#contact" },
    },
  });

  // Add footer at the end
  blocks.push({
    id: generateId(),
    blockType: "footer",
    variant: "simple",
    content: {
      logo: { text: businessName },
      copyright: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
    },
  });

  return blocks;
}
