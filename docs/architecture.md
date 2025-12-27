# System Architecture

This document describes the overall architecture of WebsiteBuilderAI, including the monorepo structure, package responsibilities, and data flow.

## Monorepo Structure

WebsiteBuilderAI uses **Turborepo** for monorepo management and **pnpm** for package management.

```
WebsiteBuilderAI/
├── apps/
│   └── web/                    # Next.js 14 web application
├── packages/
│   ├── ai/                     # AI providers and capabilities (@repo/ai)
│   ├── database/               # Prisma client and schema (@repo/database)
│   ├── templates/              # Website templates (@repo/templates)
│   └── ui/                     # Shared UI components (@repo/ui)
├── docs/                       # Developer documentation
├── turbo.json                  # Turborepo configuration
├── pnpm-workspace.yaml         # pnpm workspace definition
└── package.json                # Root package.json
```

## Package Details

### `apps/web` - Next.js Application

The main web application built with Next.js 14 using the App Router.

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes (login, signup)
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   │   └── projects/       # Project management
│   │   │       ├── new/        # New project wizard
│   │   │       └── [id]/       # Project detail/editor
│   │   └── api/                # API routes
│   │       ├── auth/           # NextAuth endpoints
│   │       ├── projects/       # Project CRUD
│   │       ├── ai/             # AI command and suggestion endpoints
│   │       ├── generate/       # Content/image/video generation
│   │       ├── assets/         # Asset management
│   │       └── upload/         # File upload (presigned URLs)
│   ├── components/             # React components
│   │   ├── onboarding/         # Onboarding wizard components
│   │   ├── dashboard/          # Dashboard components
│   │   ├── preview/            # Site preview components
│   │   └── assets/             # Asset management components
│   ├── lib/                    # Utilities and configurations
│   │   ├── auth.ts             # NextAuth configuration
│   │   └── r2.ts               # Cloudflare R2/S3 utilities
│   └── types/                  # TypeScript type definitions
└── ...
```

**Key Dependencies:**
- `next` 14.2.15 - React framework
- `next-auth` - Authentication
- `@anthropic-ai/sdk` - Claude AI
- `@aws-sdk/client-s3` - File storage
- Workspace packages: `@repo/database`, `@repo/ui`, `@repo/ai`, `@repo/templates`

### `packages/ai` - AI Package

Centralized AI functionality including providers, tools, and the capabilities registry.

```
packages/ai/
├── src/
│   ├── index.ts                # Public exports
│   ├── types.ts                # Type definitions
│   ├── generate.ts             # Site content generation
│   ├── router.ts               # AI provider router with fallback
│   ├── providers/
│   │   ├── base.ts             # Base provider interface
│   │   ├── claude.ts           # Anthropic Claude provider
│   │   ├── openai.ts           # OpenAI provider
│   │   ├── dalle.ts            # DALL-E 3 image generation
│   │   └── runway.ts           # Runway ML video generation
│   ├── tools/
│   │   └── site-tools.ts       # AI tools for site modification
│   ├── actions/
│   │   └── executor.ts         # Tool call executor
│   └── capabilities/
│       ├── types.ts            # Capability type definitions
│       ├── registry.ts         # Central capability registry
│       ├── prompt-builder.ts   # Dynamic prompt generation
│       └── index.ts            # Capability exports
```

**Key Components:**

1. **AI Router** (`router.ts`): Routes requests to appropriate providers with automatic fallback
2. **Capabilities Registry** (`capabilities/registry.ts`): Central source of truth for all AI capabilities
3. **Action Executor** (`actions/executor.ts`): Executes tool calls and modifies site state
4. **Prompt Builder** (`capabilities/prompt-builder.ts`): Generates dynamic system prompts

### `packages/database` - Database Package

Prisma ORM configuration and database client.

```
packages/database/
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeding (optional)
├── src/
│   └── index.ts                # Prisma client export
```

**Key Models:**
- `User` - User accounts (NextAuth compatible)
- `Project` - Website projects
- `Site` - Generated websites
- `Page` - Website pages
- `Asset` - Uploaded/generated media
- `Template` - Website templates
- `Generation` - AI generation history

### `packages/templates` - Templates Package

Website templates, sections, and branding system.

```
packages/templates/
├── src/
│   ├── index.ts                # Public exports
│   ├── types.ts                # Type definitions
│   ├── branding/
│   │   ├── colors.ts           # Color presets and utilities
│   │   ├── fonts.ts            # Typography and font pairings
│   │   ├── presets.ts          # Branding presets
│   │   └── index.ts            # Branding exports
│   ├── sections/
│   │   ├── types.ts            # Section type definitions
│   │   ├── layouts.ts          # Section layout variants
│   │   └── index.ts            # Section exports
│   └── templates/
│       ├── index.ts            # Template definitions
│       └── business/           # Business category templates
│       └── usecase/            # Use case category templates
```

**Available Templates:**
- Business: Restaurant, Portfolio, Professional Services, Healthcare, Fitness, Real Estate, Salon, Construction, Automotive, Pet Services, Education, Photography, Travel, Nonprofit, Tech Startup
- Use Case: E-commerce, SaaS, App Landing, Blog, Resume, Event, Coming Soon, Podcast, Course, Agency

**Section Types:**
- hero, about, features, services, testimonials, team, pricing, contact, cta, gallery, faq, blog, newsletter, stats, portfolio, menu

### `packages/ui` - UI Package

Shared UI components and utilities.

```
packages/ui/
├── src/
│   └── index.ts                # Component exports
```

**Utilities:**
- `cn()` - Class name merging (clsx + tailwind-merge)
- `cva` - Class variance authority exports

## Data Flow

### 1. Project Creation Flow

```
User → ConversationalWizard → API: POST /api/projects
                                  ↓
                           Create Project in DB
                                  ↓
                           API: POST /api/generate
                                  ↓
                           AI generates content
                                  ↓
                           Create Site + Pages in DB
                                  ↓
                           Redirect to Dashboard
```

### 2. AI Command Flow

```
User types command → AICommandBar → API: POST /api/ai/command
                                          ↓
                                    Parse command
                                          ↓
                                    Match capabilities
                                          ↓
                                    Build system prompt
                                          ↓
                                    Call AI Router → Claude/OpenAI
                                          ↓
                                    Execute tool calls (ActionExecutor)
                                          ↓
                                    Update database
                                          ↓
                                    Return updated state
```

### 3. Image Generation Flow

```
User requests image → API: POST /api/generate/image
                            ↓
                     Validate project ownership
                            ↓
                     Call DALL-E 3 (via @repo/ai)
                            ↓
                     Create Asset record
                            ↓
                     Log Generation record
                            ↓
                     Return image URL
```

## Authentication Architecture

NextAuth.js with JWT strategy:

```
┌─────────────────────────────────────────────────────────────┐
│                    NextAuth Configuration                    │
├─────────────────────────────────────────────────────────────┤
│  Adapter: PrismaAdapter                                      │
│  Strategy: JWT                                               │
│  Pages: /login (signIn), /login (error)                      │
├─────────────────────────────────────────────────────────────┤
│                      Providers                               │
├─────────────────────────────────────────────────────────────┤
│  1. Credentials (email/password with bcrypt)                 │
│  2. Google OAuth (optional)                                  │
│  3. GitHub OAuth (optional)                                  │
└─────────────────────────────────────────────────────────────┘
```

## AI Architecture

### Provider Router

The AI Router manages multiple AI providers with automatic fallback:

```typescript
// Default configuration
{
  defaultProvider: "claude",
  defaultModel: "claude-sonnet",
  fallbackProviders: ["openai"],
  retryAttempts: 2,
  retryDelay: 1000
}
```

### Capability Registry

All AI capabilities are centrally registered:

```typescript
// Capability structure
{
  id: "add_section",
  name: "Add Section",
  description: "Add a new section to the website",
  category: "content",
  status: "active",
  triggers: ["add", "new section", ...],
  toolName: "add_section",
  examples: ["Add a testimonials section", ...],
  priority: 10
}
```

Categories: `content`, `design`, `media`, `structure`, `seo`, `integrations`, `publishing`, `ai_generate`

Statuses: `active`, `beta`, `coming_soon`, `deprecated`

### Tool Execution

The ActionExecutor handles tool calls:

```typescript
// Supported actions
add_section, remove_section, edit_section, reorder_sections,
update_colors, update_fonts, update_seo, get_site_info
```

## Turborepo Configuration

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "db:generate": { "cache": false },
    "db:push": { "cache": false }
  }
}
```

## Security Considerations

1. **API Routes**: All protected routes verify session via `getServerSession(authOptions)`
2. **Project Ownership**: All project operations verify `userId: session.user.id`
3. **Input Validation**: Zod schemas validate all API inputs
4. **Password Hashing**: bcrypt for credential authentication
5. **File Uploads**: Presigned URLs with validation for file type and size
6. **Environment Variables**: Sensitive keys stored in `.env.local`

## Performance Optimizations

1. **Turborepo Caching**: Build artifacts cached for faster rebuilds
2. **Database Indexes**: Indexes on frequently queried fields
3. **AI Streaming**: Support for streaming responses (reduces time to first token)
4. **Parallel Tool Execution**: ActionExecutor can batch multiple tool calls
5. **Asset CDN**: R2/S3 for static asset delivery
