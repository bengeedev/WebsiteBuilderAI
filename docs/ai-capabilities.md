# AI Capabilities

This document describes the AI system in WebsiteBuilderAI, including providers, capabilities, tools, and prompt engineering.

## Overview

The AI system is built around three core concepts:

1. **Providers** - External AI services (Claude, OpenAI, DALL-E, Runway)
2. **Capabilities** - What the AI can do (registered in a central registry)
3. **Tools** - Functions the AI can call to modify the website

---

## AI Providers

### Provider Router

The AI Router (`@repo/ai/router.ts`) manages provider selection and fallback:

```typescript
const router = new AIRouter({
  defaultProvider: "claude",
  defaultModel: "claude-sonnet",
  fallbackProviders: ["openai"],
  retryAttempts: 2,
  retryDelay: 1000
});
```

**Features:**
- Automatic provider fallback on failure
- Retry logic with exponential backoff
- Task-based model selection
- Streaming support

### Claude Provider

Primary AI provider using Anthropic's Claude.

**Configuration:**
```bash
ANTHROPIC_API_KEY=sk-ant-...
```

**Default Model:** `claude-sonnet-4-20250514`

**Capabilities:**
- Text generation and conversation
- Tool/function calling
- Streaming responses

**Usage:**
```typescript
import { ClaudeProvider } from "@repo/ai";

const provider = new ClaudeProvider();
const response = await provider.complete({
  system: "You are a helpful assistant.",
  messages: [{ role: "user", content: "Hello" }],
  tools: siteTools,
  maxTokens: 2048
});
```

### OpenAI Provider

Fallback provider and image generation.

**Configuration:**
```bash
OPENAI_API_KEY=sk-...
```

**Models:**
- Text: `gpt-4o`, `gpt-4o-mini`
- Images: `dall-e-3`

### DALL-E 3 (Image Generation)

AI image generation for websites.

**Functions:**
```typescript
import { generateImage, generateHeroImage, generateLogo } from "@repo/ai";

// Custom image
const result = await generateImage({
  prompt: "A cozy Italian restaurant",
  style: "natural",      // "natural" | "vivid"
  quality: "standard",   // "standard" | "hd"
  size: "1024x1024"      // "1024x1024" | "1792x1024" | "1024x1792"
});

// Hero image for a business
const heroImage = await generateHeroImage(
  "restaurant",          // Business type
  "Mario's Kitchen",     // Business name
  "photo"                // "photo" | "illustration" | "abstract"
);

// Logo generation
const logo = await generateLogo(
  "Mario's Kitchen",     // Business name
  "restaurant",          // Business type
  "minimalist",          // Style
  ["#3b82f6"]            // Optional colors
);
```

**Logo Styles:**
- `minimalist` - Simple, clean, geometric
- `bold` - Strong, impactful, dynamic
- `vintage` - Retro, classic, timeless
- `playful` - Fun, colorful, friendly
- `corporate` - Professional, sophisticated

### Runway ML (Video Generation)

AI video generation (beta).

**Configuration:**
```bash
RUNWAY_API_KEY=...
```

**Features:**
- Text-to-video generation
- Image animation
- 5-10 second duration
- Multiple aspect ratios

**Usage:**
```typescript
import { startVideoGeneration, checkVideoStatus, waitForVideo } from "@repo/ai";

// Start generation
const task = await startVideoGeneration({
  prompt: "Smooth camera pan across restaurant",
  duration: 5,
  aspectRatio: "16:9",
  style: "cinematic"
});

// Check status (polling)
const status = await checkVideoStatus(task.id);

// Wait for completion (blocking)
const result = await waitForVideo(task.id, 120000); // 2 min timeout
```

---

## Capabilities Registry

The capabilities registry is the central source of truth for what the AI can do. Located at `@repo/ai/capabilities/registry.ts`.

### Capability Structure

```typescript
type Capability = {
  id: string;              // Unique identifier
  name: string;            // Human-readable name
  description: string;     // Detailed description for AI
  category: CapabilityCategory;
  status: CapabilityStatus;
  triggers: string[];      // Keywords that activate this capability
  toolName?: string;       // Associated tool function
  uiComponent?: string;    // UI component to render
  examples?: string[];     // Example prompts
  requirements?: {
    plan?: "free" | "pro" | "enterprise";
    assets?: string[];
    integrations?: string[];
    featureFlags?: string[];
  };
  priority?: number;       // Higher = more specific match
};
```

### Categories

| Category | Description |
|----------|-------------|
| `content` | Add, edit, remove sections |
| `design` | Colors, fonts, layouts |
| `media` | Images, videos, logos |
| `structure` | Pages, navigation |
| `seo` | Meta tags, optimization |
| `integrations` | Forms, analytics |
| `publishing` | Preview, publish, domains |
| `ai_generate` | AI content generation |

### Status Values

| Status | Description |
|--------|-------------|
| `active` | Fully available |
| `beta` | Available but may have issues |
| `coming_soon` | Not yet implemented |
| `deprecated` | Being phased out |

### Content Capabilities

```typescript
// Add Section
{
  id: "add_section",
  triggers: ["add", "new section", "insert", "create section"],
  toolName: "add_section",
  examples: ["Add a testimonials section", "I need a pricing table"]
}

// Edit Section
{
  id: "edit_section",
  triggers: ["edit", "change", "update", "modify", "fix", "rewrite"],
  toolName: "edit_section",
  examples: ["Change the hero title", "Update the about section text"]
}

// Remove Section
{
  id: "remove_section",
  triggers: ["remove", "delete", "hide", "get rid of"],
  toolName: "remove_section",
  examples: ["Remove the testimonials section", "Delete the pricing table"]
}

// Reorder Sections
{
  id: "reorder_sections",
  triggers: ["move", "reorder", "rearrange", "swap"],
  toolName: "reorder_sections",
  examples: ["Move testimonials above pricing"]
}
```

### Design Capabilities

```typescript
// Change Colors
{
  id: "update_colors",
  triggers: ["color", "palette", "brand color", "theme"],
  toolName: "update_colors",
  examples: ["Make the primary color blue", "Change the color scheme"]
}

// Change Typography
{
  id: "update_fonts",
  triggers: ["font", "typography", "text style"],
  toolName: "update_fonts",
  examples: ["Use Playfair Display for headings"]
}
```

### Media Capabilities

```typescript
// Generate Image
{
  id: "generate_image",
  triggers: ["generate image", "create image", "ai image"],
  toolName: "generate_image",
  requirements: { plan: "pro" },
  examples: ["Generate a hero image of a modern office"]
}

// Generate Logo
{
  id: "generate_logo",
  triggers: ["logo", "brand mark", "create logo"],
  toolName: "generate_logo",
  examples: ["Generate a minimalist logo"]
}

// Generate Video (beta)
{
  id: "generate_video",
  status: "beta",
  triggers: ["video", "animation", "motion"],
  toolName: "generate_video",
  requirements: { plan: "enterprise" }
}
```

---

## AI Tools

Tools are functions the AI can call to modify the website. Defined in `@repo/ai/tools/site-tools.ts`.

### Site Tools

```typescript
// Section Management
add_section     // Add new section
remove_section  // Remove section
edit_section    // Modify section content
reorder_sections // Change section order

// Styling
update_colors   // Change color scheme
update_fonts    // Change typography

// Content
generate_content // AI-generate text content

// SEO
update_seo      // Update meta tags
analyze_seo     // Get SEO recommendations

// Images
suggest_images  // Get image suggestions

// Navigation
update_navigation // Modify menu

// Information
get_site_info   // Get current state
```

### Tool Structure

```typescript
type Tool = {
  name: string;
  description: string;
  parameters: Record<string, {
    type: string;
    description: string;
    enum?: string[];
    properties?: Record<string, unknown>;
  }>;
  requiredParams: string[];
};
```

### Example: add_section

```typescript
{
  name: "add_section",
  description: "Add a new section to the website",
  parameters: {
    section_type: {
      type: "string",
      description: "The type of section to add",
      enum: ["hero", "about", "features", "services", "testimonials",
             "team", "pricing", "contact", "cta", "gallery", "faq",
             "blog", "newsletter"]
    },
    position: {
      type: "string",
      description: "Where to place the section",
      enum: ["start", "end", "after_hero", "before_contact"]
    },
    content: {
      type: "object",
      description: "The content for the section",
      properties: {
        title: { type: "string" },
        subtitle: { type: "string" },
        items: { type: "array" }
      }
    }
  },
  requiredParams: ["section_type"]
}
```

---

## Action Executor

The ActionExecutor (`@repo/ai/actions/executor.ts`) processes tool calls and modifies site state.

### Usage

```typescript
import { ActionExecutor } from "@repo/ai";

const executor = new ActionExecutor(siteState);

// Execute tool calls from AI response
const results = await executor.executeAll(response.toolCalls);

// Get updated state
const newState = executor.getState();
```

### Site State Structure

```typescript
type SiteState = {
  projectId: string;
  siteId: string;
  sections: SectionContent[];
  styles: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
    headingFont?: string;
    bodyFont?: string;
  };
  meta: {
    title: string;
    description: string;
  };
};
```

---

## Prompt Builder

The prompt builder (`@repo/ai/capabilities/prompt-builder.ts`) generates dynamic system prompts.

### System Prompt Generation

```typescript
import { buildSystemPrompt } from "@repo/ai";

const systemPrompt = buildSystemPrompt({
  userContext: {
    plan: "pro",
    connectedIntegrations: [],
    availableAssets: [],
    enabledFeatureFlags: []
  },
  siteState: currentSiteState,
  businessInfo: {
    name: "Mario's Kitchen",
    type: "restaurant",
    description: "Italian restaurant"
  },
  additionalContext: "User is editing the hero section"
});
```

### Prompt Structure

The generated prompt includes:

1. **Identity Section** - Who the AI is
2. **Capabilities Section** - What the AI can do (from registry)
3. **Site State Section** - Current website structure
4. **Business Section** - Context about the business
5. **Instructions Section** - How to help users
6. **Tool Usage Section** - How to use each tool

### Specialized Prompts

```typescript
// Onboarding suggestions
buildOnboardingSuggestionPrompt(field, currentValue, businessContext);

// SEO analysis
buildSEOAnalysisPrompt(siteState);

// Content improvement
buildContentImprovementPrompt(section, style);
```

---

## Capability Matching

The system matches user input to capabilities:

```typescript
import { matchCapabilities, getAvailableCapabilities } from "@repo/ai";

const userContext = {
  plan: "pro",
  connectedIntegrations: [],
  availableAssets: [],
  enabledFeatureFlags: []
};

// Get capabilities available to this user
const available = getAvailableCapabilities(userContext);

// Match user input to capabilities
const matches = matchCapabilities("add a testimonials section", available);

// matches[0].capability.name === "Add Section"
// matches[0].confidence === 0.85
// matches[0].matchedTriggers === ["add", "testimonials"]
```

### Confidence Scoring

- Longer trigger matches = higher confidence
- Higher priority capabilities = bonus confidence
- Multiple trigger matches = cumulative score
- Normalized to 0-1 range

---

## Content Generation

Site content generation (`@repo/ai/generate.ts`):

```typescript
import { generateSiteContent } from "@repo/ai";

const content = await generateSiteContent({
  businessType: "restaurant",
  businessName: "Mario's Kitchen",
  businessDescription: "Family-owned Italian restaurant",
  businessTagline: "Authentic Italian Cuisine"
});

// Returns:
// {
//   meta: { title: "...", description: "..." },
//   sections: [
//     { type: "hero", title: "...", subtitle: "...", cta: {...} },
//     { type: "about", title: "...", content: "..." },
//     ...
//   ]
// }
```

### Template Sections by Business Type

| Business Type | Sections |
|---------------|----------|
| restaurant | hero, about, menu, gallery, testimonials, contact |
| portfolio | hero, about, portfolio, services, testimonials, contact |
| business | hero, features, about, team, testimonials, cta, contact |
| ecommerce | hero, features, testimonials, faq, newsletter, contact |
| blog | hero, about, newsletter, contact |
| other | hero, about, features, testimonials, contact |

---

## Best Practices

### Adding New Capabilities

1. Add capability to registry in `@repo/ai/capabilities/registry.ts`
2. Create tool definition in `@repo/ai/tools/site-tools.ts`
3. Implement action in `@repo/ai/actions/executor.ts`
4. Add API endpoint if needed
5. Update documentation

### Prompt Engineering

1. Be specific about capabilities in system prompt
2. Include examples for each tool
3. Provide current state context
4. Set clear behavior guidelines
5. Test with varied user inputs

### Error Handling

```typescript
try {
  const response = await router.complete(request);
} catch (error) {
  if (error instanceof AIProviderError) {
    // Handle provider-specific error
    if (error.retryable) {
      // Can retry
    }
  }
}
```

### Performance

1. Use streaming for long responses
2. Cache capability lookups
3. Batch tool executions when possible
4. Set appropriate token limits
5. Use cheaper models for simple tasks

---

## Debugging

### Enable Logging

```typescript
// In development, tool calls are logged
console.log("Tool calls:", response.toolCalls);
console.log("Executed actions:", results);
```

### Test Capability Matching

```typescript
const matches = matchCapabilities(userInput, getActiveCapabilities());
console.log("Matched capabilities:", matches.map(m => ({
  name: m.capability.name,
  confidence: m.confidence,
  triggers: m.matchedTriggers
})));
```

### Inspect System Prompt

```typescript
const prompt = buildSystemPrompt(context);
console.log("System prompt length:", prompt.length);
console.log("System prompt:", prompt);
```
