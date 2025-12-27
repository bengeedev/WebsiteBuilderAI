/**
 * Section Layout Registry
 *
 * All available layout variants for each section type
 */

import type { SectionLayout, LayoutVariant } from "./types";

// ============================================
// HERO SECTION LAYOUTS
// ============================================

export const heroLayouts: LayoutVariant[] = [
  {
    id: "hero-centered",
    name: "Centered",
    description: "Classic centered layout with headline, subheadline, and CTA buttons",
    style: "centered",
    isDefault: true,
  },
  {
    id: "hero-split",
    name: "Split",
    description: "Text on left, image/video on right with balanced layout",
    style: "split",
  },
  {
    id: "hero-fullscreen",
    name: "Fullscreen",
    description: "Full viewport height with dramatic background image or video",
    style: "bold",
  },
  {
    id: "hero-minimal",
    name: "Minimal",
    description: "Clean, text-focused design with subtle accents",
    style: "minimal",
  },
  {
    id: "hero-asymmetric",
    name: "Asymmetric",
    description: "Modern asymmetric design with floating elements",
    style: "asymmetric",
  },
];

// ============================================
// FEATURES SECTION LAYOUTS
// ============================================

export const featuresLayouts: LayoutVariant[] = [
  {
    id: "features-grid-3",
    name: "3-Column Grid",
    description: "Three features per row in a clean grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "features-grid-4",
    name: "4-Column Grid",
    description: "Four compact features per row",
    style: "minimal",
  },
  {
    id: "features-alternating",
    name: "Alternating",
    description: "Features alternate left/right with large images",
    style: "split",
  },
  {
    id: "features-cards",
    name: "Cards",
    description: "Elevated cards with shadows and hover effects",
    style: "bold",
  },
  {
    id: "features-icons",
    name: "Icon Focus",
    description: "Large icons with minimal text underneath",
    style: "minimal",
  },
];

// ============================================
// TESTIMONIALS SECTION LAYOUTS
// ============================================

export const testimonialsLayouts: LayoutVariant[] = [
  {
    id: "testimonials-cards",
    name: "Card Grid",
    description: "Testimonials displayed as cards in a grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "testimonials-carousel",
    name: "Carousel",
    description: "Scrolling carousel of testimonials",
    style: "bold",
  },
  {
    id: "testimonials-single",
    name: "Single Focus",
    description: "One large testimonial at a time with navigation",
    style: "minimal",
  },
  {
    id: "testimonials-masonry",
    name: "Masonry",
    description: "Varied height cards in masonry layout",
    style: "asymmetric",
  },
  {
    id: "testimonials-quotes",
    name: "Quote Style",
    description: "Large quotation marks with elegant styling",
    style: "minimal",
  },
];

// ============================================
// PRICING SECTION LAYOUTS
// ============================================

export const pricingLayouts: LayoutVariant[] = [
  {
    id: "pricing-cards",
    name: "Card Comparison",
    description: "Side-by-side pricing cards with highlighted popular option",
    style: "centered",
    isDefault: true,
  },
  {
    id: "pricing-table",
    name: "Feature Table",
    description: "Detailed comparison table with checkmarks",
    style: "minimal",
  },
  {
    id: "pricing-minimal",
    name: "Minimal",
    description: "Simple clean pricing without cards",
    style: "minimal",
  },
  {
    id: "pricing-tiered",
    name: "Tiered",
    description: "Stepped cards showing progression",
    style: "asymmetric",
  },
];

// ============================================
// ABOUT SECTION LAYOUTS
// ============================================

export const aboutLayouts: LayoutVariant[] = [
  {
    id: "about-split",
    name: "Split",
    description: "Image on one side, text on the other",
    style: "split",
    isDefault: true,
  },
  {
    id: "about-centered",
    name: "Centered",
    description: "Centered text with optional image above or below",
    style: "centered",
  },
  {
    id: "about-timeline",
    name: "Timeline",
    description: "Company history shown as a timeline",
    style: "minimal",
  },
  {
    id: "about-stats",
    name: "With Stats",
    description: "About text with key statistics",
    style: "bold",
  },
];

// ============================================
// SERVICES SECTION LAYOUTS
// ============================================

export const servicesLayouts: LayoutVariant[] = [
  {
    id: "services-grid",
    name: "Service Grid",
    description: "Services displayed in a responsive grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "services-cards",
    name: "Service Cards",
    description: "Each service in its own elevated card",
    style: "bold",
  },
  {
    id: "services-list",
    name: "Service List",
    description: "Clean list format with icons",
    style: "minimal",
  },
  {
    id: "services-accordion",
    name: "Accordion",
    description: "Expandable service details",
    style: "minimal",
  },
];

// ============================================
// TEAM SECTION LAYOUTS
// ============================================

export const teamLayouts: LayoutVariant[] = [
  {
    id: "team-grid",
    name: "Team Grid",
    description: "Team members in a photo grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "team-cards",
    name: "Team Cards",
    description: "Team members with detailed cards",
    style: "bold",
  },
  {
    id: "team-minimal",
    name: "Minimal",
    description: "Small photos with name and role",
    style: "minimal",
  },
  {
    id: "team-carousel",
    name: "Carousel",
    description: "Scrollable team member carousel",
    style: "centered",
  },
];

// ============================================
// CONTACT SECTION LAYOUTS
// ============================================

export const contactLayouts: LayoutVariant[] = [
  {
    id: "contact-split",
    name: "Split",
    description: "Form on one side, contact info on the other",
    style: "split",
    isDefault: true,
  },
  {
    id: "contact-centered",
    name: "Centered",
    description: "Centered form with contact info below",
    style: "centered",
  },
  {
    id: "contact-minimal",
    name: "Minimal",
    description: "Simple form with no extra decoration",
    style: "minimal",
  },
  {
    id: "contact-map",
    name: "With Map",
    description: "Contact form with embedded map",
    style: "split",
  },
];

// ============================================
// CTA SECTION LAYOUTS
// ============================================

export const ctaLayouts: LayoutVariant[] = [
  {
    id: "cta-centered",
    name: "Centered",
    description: "Centered headline with CTA button",
    style: "centered",
    isDefault: true,
  },
  {
    id: "cta-split",
    name: "Split",
    description: "Text on left, button on right",
    style: "split",
  },
  {
    id: "cta-banner",
    name: "Banner",
    description: "Full-width colorful banner",
    style: "bold",
  },
  {
    id: "cta-minimal",
    name: "Minimal",
    description: "Subtle CTA with link style",
    style: "minimal",
  },
];

// ============================================
// GALLERY SECTION LAYOUTS
// ============================================

export const galleryLayouts: LayoutVariant[] = [
  {
    id: "gallery-grid",
    name: "Grid",
    description: "Uniform image grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "gallery-masonry",
    name: "Masonry",
    description: "Pinterest-style masonry layout",
    style: "asymmetric",
  },
  {
    id: "gallery-carousel",
    name: "Carousel",
    description: "Sliding image carousel",
    style: "bold",
  },
  {
    id: "gallery-featured",
    name: "Featured",
    description: "One large image with smaller thumbnails",
    style: "split",
  },
];

// ============================================
// FAQ SECTION LAYOUTS
// ============================================

export const faqLayouts: LayoutVariant[] = [
  {
    id: "faq-accordion",
    name: "Accordion",
    description: "Expandable question/answer pairs",
    style: "minimal",
    isDefault: true,
  },
  {
    id: "faq-two-column",
    name: "Two Column",
    description: "FAQs in two columns",
    style: "split",
  },
  {
    id: "faq-cards",
    name: "Cards",
    description: "Each FAQ as a separate card",
    style: "centered",
  },
];

// ============================================
// BLOG SECTION LAYOUTS
// ============================================

export const blogLayouts: LayoutVariant[] = [
  {
    id: "blog-grid",
    name: "Grid",
    description: "Blog posts in a grid layout",
    style: "centered",
    isDefault: true,
  },
  {
    id: "blog-list",
    name: "List",
    description: "Blog posts in a list format",
    style: "minimal",
  },
  {
    id: "blog-featured",
    name: "Featured",
    description: "One featured post with smaller recent posts",
    style: "asymmetric",
  },
];

// ============================================
// NEWSLETTER SECTION LAYOUTS
// ============================================

export const newsletterLayouts: LayoutVariant[] = [
  {
    id: "newsletter-inline",
    name: "Inline",
    description: "Email input with inline button",
    style: "centered",
    isDefault: true,
  },
  {
    id: "newsletter-card",
    name: "Card",
    description: "Newsletter signup in a styled card",
    style: "bold",
  },
  {
    id: "newsletter-minimal",
    name: "Minimal",
    description: "Simple text with email field",
    style: "minimal",
  },
];

// ============================================
// STATS SECTION LAYOUTS
// ============================================

export const statsLayouts: LayoutVariant[] = [
  {
    id: "stats-row",
    name: "Row",
    description: "Statistics in a horizontal row",
    style: "centered",
    isDefault: true,
  },
  {
    id: "stats-cards",
    name: "Cards",
    description: "Each stat in its own card",
    style: "bold",
  },
  {
    id: "stats-minimal",
    name: "Minimal",
    description: "Simple number and label pairs",
    style: "minimal",
  },
];

// ============================================
// PORTFOLIO SECTION LAYOUTS
// ============================================

export const portfolioLayouts: LayoutVariant[] = [
  {
    id: "portfolio-grid",
    name: "Grid",
    description: "Projects in a filterable grid",
    style: "centered",
    isDefault: true,
  },
  {
    id: "portfolio-masonry",
    name: "Masonry",
    description: "Varied height project cards",
    style: "asymmetric",
  },
  {
    id: "portfolio-showcase",
    name: "Showcase",
    description: "Large featured projects",
    style: "bold",
  },
];

// ============================================
// MENU SECTION LAYOUTS (Restaurants)
// ============================================

export const menuLayouts: LayoutVariant[] = [
  {
    id: "menu-categories",
    name: "By Category",
    description: "Menu items organized by category",
    style: "minimal",
    isDefault: true,
  },
  {
    id: "menu-cards",
    name: "Cards",
    description: "Each item as a detailed card with image",
    style: "bold",
  },
  {
    id: "menu-grid",
    name: "Grid",
    description: "Items in a visual grid layout",
    style: "centered",
  },
];

// ============================================
// LAYOUT REGISTRY
// ============================================

export const sectionLayouts: SectionLayout[] = [
  { sectionType: "hero", variants: heroLayouts },
  { sectionType: "features", variants: featuresLayouts },
  { sectionType: "testimonials", variants: testimonialsLayouts },
  { sectionType: "pricing", variants: pricingLayouts },
  { sectionType: "about", variants: aboutLayouts },
  { sectionType: "services", variants: servicesLayouts },
  { sectionType: "team", variants: teamLayouts },
  { sectionType: "contact", variants: contactLayouts },
  { sectionType: "cta", variants: ctaLayouts },
  { sectionType: "gallery", variants: galleryLayouts },
  { sectionType: "faq", variants: faqLayouts },
  { sectionType: "blog", variants: blogLayouts },
  { sectionType: "newsletter", variants: newsletterLayouts },
  { sectionType: "stats", variants: statsLayouts },
  { sectionType: "portfolio", variants: portfolioLayouts },
  { sectionType: "menu", variants: menuLayouts },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get all layout variants for a section type
 */
export function getLayoutsForSection(sectionType: string): LayoutVariant[] {
  const layout = sectionLayouts.find((l) => l.sectionType === sectionType);
  return layout?.variants || [];
}

/**
 * Get a specific layout variant by ID
 */
export function getLayoutById(layoutId: string): LayoutVariant | undefined {
  for (const section of sectionLayouts) {
    const variant = section.variants.find((v) => v.id === layoutId);
    if (variant) return variant;
  }
  return undefined;
}

/**
 * Get the default layout for a section type
 */
export function getDefaultLayout(sectionType: string): LayoutVariant | undefined {
  const variants = getLayoutsForSection(sectionType);
  return variants.find((v) => v.isDefault) || variants[0];
}

/**
 * Get all section types
 */
export function getSectionTypes(): string[] {
  return sectionLayouts.map((l) => l.sectionType);
}

/**
 * Get total number of layout variants
 */
export function getTotalLayoutCount(): number {
  return sectionLayouts.reduce((sum, layout) => sum + layout.variants.length, 0);
}
