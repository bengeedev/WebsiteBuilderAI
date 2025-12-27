# Block System Documentation

> Composable, Elementor/Wix-style architecture for building website pages from reusable blocks.

## Overview

The Block System is a composable architecture that allows websites to be built from reusable, configurable building blocks. Inspired by page builders like Elementor and Wix, this system provides:

- **Modularity**: Each block is a self-contained unit with its own schema, variants, and AI hints
- **Flexibility**: Blocks can be combined in any order to create unique page layouts
- **AI Integration**: Built-in hints help AI understand when and how to use each block
- **Responsive Design**: All blocks support responsive layouts out of the box
- **Validation**: Content is validated against schemas for data integrity

### Architecture

```
packages/templates/src/blocks/
├── types.ts              # Core type definitions
├── registry.ts           # Block registry and helper functions
└── definitions/          # Individual block definitions
    ├── hero.ts
    ├── text-with-image.ts
    ├── features.ts
    ├── testimonials.ts
    ├── cta.ts
    ├── contact.ts
    └── footer.ts
```

---

## Block Types

The system includes 7 foundational blocks, each serving a specific purpose in website design.

### 1. Hero Section (`hero`)

**Category**: Content | **Priority**: 10 (highest)

The main banner section at the top of a page. Grabs attention and communicates the primary message.

| Variant | Description | Best For |
|---------|-------------|----------|
| `centered` | Classic centered layout with text stacked vertically | Simple, focused messaging |
| `split` | Two-column layout with text and image | Visual impact with product/service imagery |
| `video-bg` | Full-width hero with video background | Maximum visual impact, modern brands |

**When to use**: Landing pages, homepage headers, campaign promotions, product launches.

---

### 2. Text with Image (`text-with-image`)

**Category**: Content | **Priority**: 8

A versatile content section combining text and imagery. Perfect for storytelling and feature highlights.

| Variant | Description | Best For |
|---------|-------------|----------|
| `image-right` | Text left, image right | Standard reading flow |
| `image-left` | Image left, text right | Layout variety, alternating sections |
| `alternating` | Multiple items with alternating positions | Multi-step stories, processes |
| `overlay` | Text overlaid on full-width background | High visual impact sections |

**When to use**: About sections, feature explanations, team introductions, company values.

---

### 3. Features (`features`)

**Category**: Content | **Priority**: 9

Display multiple features, services, or benefits in an organized grid.

| Variant | Description | Best For |
|---------|-------------|----------|
| `grid` | Clean grid layout with equal-sized cards | 3-6 features, balanced presentation |
| `cards` | Elevated cards with shadows | Visual prominence, premium feel |
| `alternating` | Left/right alternating alignment | Storytelling, detailed explanations |
| `icon-left` | List-style with icons on left | Compact, scannable content |

**When to use**: Product features, service offerings, process steps, value propositions.

---

### 4. Testimonials (`testimonials`)

**Category**: Content | **Priority**: 7

Showcase customer reviews and testimonials for social proof.

| Variant | Description | Best For |
|---------|-------------|----------|
| `grid` | Responsive grid showing multiple testimonials | Displaying 3-6 testimonials at once |
| `carousel` | Sliding carousel | Many testimonials, limited space |
| `single-focus` | Large, featured testimonial | Highlighting best review |
| `cards-with-rating` | Cards with star ratings | E-commerce, service reviews |

**When to use**: Customer reviews, success stories, product endorsements, trust building.

---

### 5. Call to Action (`cta`)

**Category**: Content | **Priority**: 7

Compelling call-to-action sections to drive conversions.

| Variant | Description | Best For |
|---------|-------------|----------|
| `banner` | Full-width banner with centered text | High visibility CTAs |
| `split` | Two-column with text and image | Professional, balanced presentation |
| `card` | Contained card with shadow | Standing out from page content |
| `gradient` | Gradient background | Modern appeal, trendy designs |

**When to use**: Newsletter signups, free trial promotions, contact encouragement, demo requests.

---

### 6. Contact (`contact`)

**Category**: Content | **Priority**: 8

Contact information and form section for visitor inquiries.

| Variant | Description | Best For |
|---------|-------------|----------|
| `split` | Contact info and form side by side | Comprehensive contact pages |
| `centered-form` | Focused form with minimal info | Clean, direct inquiry forms |
| `info-only` | Information without form | Simple contact display |
| `with-map` | Contact info with embedded map | Physical locations, local businesses |

**When to use**: Contact pages, support sections, location pages, inquiry forms.

---

### 7. Footer (`footer`)

**Category**: Structural | **Priority**: 6

Website footer with navigation, contact info, and branding.

| Variant | Description | Best For |
|---------|-------------|----------|
| `columns` | Multi-column with link sections | Content-rich sites, comprehensive navigation |
| `simple` | Minimal with essentials only | Clean, compact sites |
| `centered` | Centered, stacked elements | Modern, focused design |
| `mega` | Large footer with newsletter | Enterprise sites, lead capture |

**When to use**: Every page (essential), site-wide navigation, legal links, newsletter signup.

---

## Type Definitions

### Core Types

#### `BlockCategory`

```typescript
type BlockCategory = "structural" | "content" | "functional";
```

- **structural**: Layout blocks like headers and footers
- **content**: Main content blocks (hero, features, etc.)
- **functional**: Interactive blocks (forms, sliders, etc.)

#### `BlockType`

The main definition for a block type:

```typescript
type BlockType = {
  id: string;              // Unique identifier (e.g., "hero")
  name: string;            // Human-readable name
  category: BlockCategory;
  description: string;     // Description for users and AI
  variants: BlockVariant[];
  defaultVariant: string;  // Default variant ID
  schema: BlockSchema;     // Content schema
  styleTokens: string[];   // Design tokens used
  aiHints: AIBlockHints;   // AI integration hints
  icon?: string;           // Block picker icon
};
```

#### `BlockVariant`

Layout variants for a block:

```typescript
type BlockVariant = {
  id: string;              // Unique variant identifier
  name: string;            // Human-readable name
  description: string;     // Variant style description
  preview?: string;        // Preview image URL
  layout: LayoutConfig;    // Layout configuration
  supportedContent: string[]; // Schema fields rendered
  className?: string;      // Additional CSS classes
};
```

#### `BlockInstance`

An actual usage of a block on a page:

```typescript
type BlockInstance = {
  id: string;              // Unique instance ID
  blockType: string;       // Reference to BlockType.id
  variant: string;         // Reference to BlockVariant.id
  content: Record<string, unknown>; // Content matching schema
  overrides?: StyleOverrides;
  visibility?: ResponsiveVisibility;
  label?: string;          // Custom name for CMS
};
```

### Layout Types

#### `LayoutConfig`

```typescript
type LayoutConfig = {
  container: "full" | "boxed" | "narrow";
  padding: ResponsiveValue<string>;
  grid?: {
    columns: ResponsiveValue<number>;
    gap: ResponsiveValue<string>;
  };
  flex?: {
    direction: ResponsiveValue<"row" | "column">;
    align: "start" | "center" | "end" | "stretch";
    justify: "start" | "center" | "end" | "between" | "around";
    gap: ResponsiveValue<string>;
  };
  minHeight?: ResponsiveValue<string>;
  background?: {
    type: "color" | "gradient" | "image" | "video";
    value: string;
    overlay?: string;
  };
};
```

#### `ResponsiveValue<T>`

Support for responsive breakpoints:

```typescript
type ResponsiveValue<T> = {
  base: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};
```

### Content Types

#### Common Content Types

```typescript
type LinkContent = {
  text: string;
  url: string;
  target?: "_blank" | "_self";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
};

type ImageContent = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type VideoContent = {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
};
```

#### Block-Specific Content Types

Each block has a corresponding content type:

- `HeroContent` - Title, subtitle, CTAs, image/video, stats
- `TextWithImageContent` - Title, content, image, features list
- `FeaturesContent` - Title, features array with icons
- `TestimonialsContent` - Title, testimonials with ratings
- `CTAContent` - Title, description, CTA buttons
- `ContactContent` - Contact info, form fields, social links
- `FooterContent` - Logo, columns, social links, newsletter

---

## Registry Functions

The registry (`registry.ts`) provides helper functions for working with blocks.

### Lookup Functions

#### `getBlock(id: string): BlockType | undefined`

Get a block type by ID. Returns `undefined` if not found.

```typescript
const hero = getBlock("hero");
```

#### `getBlockOrThrow(id: string): BlockType`

Get a block type by ID, throwing an error if not found.

```typescript
const hero = getBlockOrThrow("hero"); // Throws if "hero" doesn't exist
```

#### `getAllBlocks(): BlockType[]`

Get all registered blocks.

```typescript
const blocks = getAllBlocks();
// Returns array of all 7 blocks
```

#### `getBlocksByCategory(category: BlockCategory): BlockType[]`

Filter blocks by category.

```typescript
const contentBlocks = getBlocksByCategory("content");
// Returns hero, text-with-image, features, testimonials, cta, contact

const structuralBlocks = getBlocksByCategory("structural");
// Returns footer
```

#### `getVariant(blockId: string, variantId: string): BlockVariant | undefined`

Get a specific variant of a block.

```typescript
const splitVariant = getVariant("hero", "split");
```

#### `getVariantOrThrow(blockId: string, variantId: string): BlockVariant`

Get a variant, throwing if not found.

```typescript
const variant = getVariantOrThrow("hero", "split");
```

#### `getDefaultVariant(blockId: string): BlockVariant | undefined`

Get the default variant for a block.

```typescript
const defaultHeroVariant = getDefaultVariant("hero");
// Returns the "centered" variant
```

### Validation Functions

#### `validateBlockContent(blockId: string, content: Record<string, unknown>): ValidationResult`

Validate content against a block's schema.

```typescript
const result = validateBlockContent("hero", {
  title: "Welcome",
  // ... other fields
});

if (!result.valid) {
  console.error(result.errors);
}
```

#### `validateBlockInstance(instance: BlockInstance): ValidationResult`

Validate a complete block instance (type, variant, and content).

```typescript
const result = validateBlockInstance({
  id: "block_123",
  blockType: "hero",
  variant: "centered",
  content: { title: "Welcome" }
});
```

### Instance Helpers

#### `generateBlockInstanceId(): string`

Generate a unique ID for a block instance.

```typescript
const id = generateBlockInstanceId();
// Returns something like "block_1703894400000_abc1234"
```

#### `createBlockInstance(blockId: string, variantId?: string, content?: Partial<Record<string, unknown>>): BlockInstance`

Create a new block instance with default content.

```typescript
// Create with defaults
const heroInstance = createBlockInstance("hero");

// Create with specific variant
const splitHero = createBlockInstance("hero", "split");

// Create with custom content
const customHero = createBlockInstance("hero", "centered", {
  title: "My Custom Title",
  subtitle: "A great subtitle"
});
```

### AI Helper Functions

#### `matchBlocksToIntent(query: string, category?: BlockCategory): { block: BlockType; score: number }[]`

Find blocks that match a user intent or query. Returns blocks sorted by relevance score.

```typescript
const matches = matchBlocksToIntent("I need a section for customer reviews");
// Returns testimonials block with high score

const matches = matchBlocksToIntent("features", "content");
// Returns features block, filtered to content category
```

Scoring algorithm:
- Name match: +10 points
- Description match: +5 points
- AI trigger match: +8 points (query in trigger) or +3 points (trigger in query)
- Use case match: +4 points
- Priority bonus: +priority value

#### `getRecommendedBlocks(businessType: string): BlockType[]`

Get recommended blocks for a business type.

```typescript
const blocks = getRecommendedBlocks("restaurant");
// Returns: hero, text-with-image, features, testimonials, contact, footer

const blocks = getRecommendedBlocks("ecommerce");
// Returns: hero, features, testimonials, cta, contact, footer
```

Supported business types:
- `restaurant`
- `portfolio`
- `business`
- `ecommerce`
- `blog`
- `default` (fallback)

---

## Content Schemas

Each block defines a schema specifying what content it accepts.

### Schema Field Types

```typescript
type SchemaFieldType =
  | "text"      // Single-line text
  | "richtext"  // Multi-line formatted text
  | "image"     // Image with src/alt
  | "video"     // Video with src/poster
  | "link"      // URL with text
  | "array"     // List of items
  | "object"    // Nested object
  | "color"     // Color value
  | "select"    // Dropdown selection
  | "boolean"   // True/false toggle
  | "number";   // Numeric value
```

### Schema Field Definition

```typescript
type SchemaField = {
  name: string;           // Field identifier
  type: SchemaFieldType;
  label: string;          // Display label
  required?: boolean;
  default?: unknown;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select fields
  fields?: SchemaField[]; // For object/array fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;     // Regex pattern
  };
};
```

### Block Schema Examples

#### Hero Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `badge` | text | No | Badge text (max 50 chars) |
| `title` | text | Yes | Headline (3-100 chars) |
| `subtitle` | text | No | Subtitle (max 150 chars) |
| `description` | richtext | No | Description (max 500 chars) |
| `primaryCta` | object | No | Primary button (text, url, variant) |
| `secondaryCta` | object | No | Secondary button |
| `image` | image | No | Hero image (src, alt) |
| `video` | video | No | Background video |
| `stats` | array | No | Statistics (max 4 items) |

#### Features Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | text | No | Section title (max 80 chars) |
| `subtitle` | text | No | Subtitle (max 120 chars) |
| `description` | text | No | Description (max 300 chars) |
| `features` | array | Yes | Feature items (1-12 items) |

Each feature item contains:
- `icon` (text): Icon name
- `title` (text, required): Feature title
- `description` (text, required): Feature description
- `link` (object): Optional link

#### Contact Schema Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | text | No | Section title (max 60 chars) |
| `subtitle` | text | No | Subtitle (max 100 chars) |
| `description` | text | No | Description (max 300 chars) |
| `email` | text | No | Email address (validated pattern) |
| `phone` | text | No | Phone number |
| `address` | text | No | Physical address (max 200 chars) |
| `mapUrl` | text | No | Google Maps embed URL |
| `socialLinks` | array | No | Social media links (max 8) |
| `formFields` | array | No | Form field definitions (max 10) |

---

## AI Integration

The block system includes AI hints to help intelligent agents select and populate blocks.

### AIBlockHints Structure

```typescript
type AIBlockHints = {
  triggers: string[];        // Keywords that suggest this block
  contentGuidelines: string; // How to generate content
  useCases: string[];        // When to use this block
  priority: number;          // Selection priority (higher = preferred)
};
```

### AI Triggers by Block

| Block | Triggers |
|-------|----------|
| Hero | "hero", "banner", "main section", "headline", "welcome", "landing", "above the fold" |
| Text with Image | "about", "story", "text with image", "content section", "feature highlight", "split section" |
| Features | "features", "services", "benefits", "what we offer", "why choose", "advantages", "capabilities" |
| Testimonials | "testimonials", "reviews", "customer feedback", "social proof", "client quotes" |
| CTA | "cta", "call to action", "get started", "sign up", "contact us", "conversion" |
| Contact | "contact", "get in touch", "reach us", "contact form", "email", "phone", "location" |
| Footer | "footer", "bottom", "copyright", "site footer", "page footer" |

### Priority Ranking

1. **Hero** (10) - First consideration for page headers
2. **Features** (9) - High priority for showcasing offerings
3. **Text with Image** (8) - Versatile content sections
4. **Contact** (8) - Essential for visitor engagement
5. **Testimonials** (7) - Social proof
6. **CTA** (7) - Conversion-focused sections
7. **Footer** (6) - Required but lower priority

### Content Guidelines

AI should follow block-specific guidelines when generating content:

**Hero**:
- Title should be compelling and action-oriented (6-12 words)
- Primary CTA should use action verbs ("Get Started", "Learn More")
- Use badge for promotions or announcements

**Features**:
- Each feature needs a clear, descriptive title
- Descriptions should be concise (1-2 sentences)
- 3-6 features is ideal for most layouts

**Testimonials**:
- Quotes should be specific and authentic-sounding
- Include author name and role for credibility
- 3-6 testimonials is optimal

---

## Usage Examples

### Creating a Basic Page

```typescript
import {
  createBlockInstance,
  getAllBlocks,
  getRecommendedBlocks
} from "@repo/templates/blocks";

// Get recommended blocks for a business website
const recommendedBlocks = getRecommendedBlocks("business");

// Create instances for a landing page
const page = [
  createBlockInstance("hero", "split", {
    title: "Transform Your Business Today",
    subtitle: "AI-powered solutions for modern companies",
    description: "We help businesses grow with cutting-edge technology.",
    primaryCta: { text: "Get Started", url: "/signup", variant: "primary" },
    secondaryCta: { text: "Learn More", url: "/about", variant: "ghost" }
  }),

  createBlockInstance("features", "grid", {
    title: "Why Choose Us",
    subtitle: "Everything you need to succeed",
    features: [
      { icon: "zap", title: "Fast", description: "Lightning-fast performance" },
      { icon: "shield", title: "Secure", description: "Enterprise-grade security" },
      { icon: "heart", title: "Reliable", description: "99.9% uptime guarantee" }
    ]
  }),

  createBlockInstance("testimonials", "cards-with-rating", {
    title: "What Our Customers Say",
    testimonials: [
      {
        quote: "This product changed our workflow completely.",
        author: "Jane Smith",
        role: "CEO",
        company: "TechCorp",
        rating: 5
      }
    ]
  }),

  createBlockInstance("cta", "banner", {
    title: "Ready to Get Started?",
    description: "Join thousands of satisfied customers today.",
    primaryCta: { text: "Start Free Trial", url: "/trial", variant: "white" }
  }),

  createBlockInstance("footer", "columns")
];
```

### Validating Content

```typescript
import { validateBlockContent, validateBlockInstance } from "@repo/templates/blocks";

// Validate just the content
const contentResult = validateBlockContent("hero", {
  title: "Welcome"  // Valid
});

// Validate a complete instance
const instanceResult = validateBlockInstance({
  id: "block_123",
  blockType: "hero",
  variant: "centered",
  content: { title: "" }  // Invalid - title is required
});

if (!instanceResult.valid) {
  instanceResult.errors.forEach(error => {
    console.error(`${error.field}: ${error.message}`);
  });
}
```

### AI-Powered Block Selection

```typescript
import { matchBlocksToIntent, getRecommendedBlocks } from "@repo/templates/blocks";

// Find blocks matching user intent
const userQuery = "I want to show customer reviews";
const matches = matchBlocksToIntent(userQuery);

console.log(matches[0].block.id);  // "testimonials"
console.log(matches[0].score);     // High score due to trigger matches

// Get a full page recommendation
const businessType = "restaurant";
const pageBlocks = getRecommendedBlocks(businessType);
// Returns blocks optimized for restaurant websites
```

### Working with Variants

```typescript
import { getBlock, getVariant, getDefaultVariant } from "@repo/templates/blocks";

const heroBlock = getBlock("hero");

// List all available variants
heroBlock.variants.forEach(variant => {
  console.log(`${variant.id}: ${variant.description}`);
});

// Get specific variant details
const splitVariant = getVariant("hero", "split");
console.log(splitVariant.layout.grid);  // Grid configuration

// Get default variant
const defaultVariant = getDefaultVariant("hero");
console.log(defaultVariant.id);  // "centered"
```

---

## Related Documentation

- [Architecture](./architecture.md) - System overview and package structure
- [Templates](./templates.md) - Template system documentation (if available)
- [AI Capabilities](./ai-capabilities.md) - AI registry and tools
- [Components](./components.md) - React component documentation
