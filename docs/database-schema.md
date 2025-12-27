# Database Schema

This document describes the database schema used in WebsiteBuilderAI, implemented with Prisma ORM and PostgreSQL.

## Overview

The database is structured around these core concepts:
- **Users** - Authentication and account management
- **Projects** - User-owned website projects
- **Sites** - Generated websites within projects
- **Pages** - Individual pages within sites
- **Assets** - Media files (images, logos, videos)
- **Templates** - Website template definitions
- **Generations** - AI generation history tracking

## Entity Relationship Diagram

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│     User     │───────│   Account    │       │   Session    │
└──────────────┘       └──────────────┘       └──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Project    │───────│    Asset     │       │  Generation  │
└──────────────┘       └──────────────┘       └──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐       ┌──────────────┐
│     Site     │───────│   Template   │
└──────────────┘       └──────────────┘
       │
       │ 1:N
       ▼
┌──────────────┐
│     Page     │
└──────────────┘
```

---

## Models

### User

NextAuth.js compatible user model.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed with bcrypt for credentials auth
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  projects Project[]
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | CUID primary key |
| `name` | String? | User's display name |
| `email` | String | Unique email address |
| `emailVerified` | DateTime? | Email verification timestamp |
| `image` | String? | Profile image URL (from OAuth) |
| `password` | String? | Bcrypt-hashed password (null for OAuth users) |
| `createdAt` | DateTime | Account creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

### Account

OAuth account connections (NextAuth.js).

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}
```

**Supported Providers:**
- `credentials` - Email/password
- `google` - Google OAuth
- `github` - GitHub OAuth

### Session

User sessions (NextAuth.js JWT strategy).

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### VerificationToken

Email verification tokens (NextAuth.js).

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

### Project

A website project owned by a user.

```prisma
model Project {
  id          String   @id @default(cuid())
  userId      String
  name        String
  description String?

  // Business info from onboarding
  businessType    String?
  businessName    String?
  businessTagline String?

  // Branding
  primaryColor   String?
  secondaryColor String?
  logoUrl        String?

  // Settings
  settings Json @default("{}")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user   User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  sites  Site[]
  assets Asset[]

  @@index([userId])
}
```

**Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `id` | String | CUID primary key |
| `userId` | String | Owner's user ID |
| `name` | String | Project display name |
| `description` | String? | Project description |
| `businessType` | String? | Business category (restaurant, portfolio, etc.) |
| `businessName` | String? | Business name for content |
| `businessTagline` | String? | Business tagline/slogan |
| `primaryColor` | String? | Primary brand color (hex) |
| `secondaryColor` | String? | Secondary brand color (hex) |
| `logoUrl` | String? | URL to uploaded/generated logo |
| `settings` | Json | Additional settings (JSON) |

**Indexes:**
- `userId` - For listing user's projects

---

### Site

A generated website within a project.

```prisma
model Site {
  id        String   @id @default(cuid())
  projectId String

  // Template and content
  templateId String?
  content    Json    @default("{}")
  styles     Json    @default("{}")

  // Meta
  title       String?
  description String?
  favicon     String?

  // Status
  status    SiteStatus @default(DRAFT)

  // Publishing
  subdomain    String? @unique
  customDomain String? @unique
  publishedAt  DateTime?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  project  Project   @relation(fields: [projectId], references: [id], onDelete: Cascade)
  template Template? @relation(fields: [templateId], references: [id])
  pages    Page[]

  @@index([projectId])
  @@index([subdomain])
  @@index([customDomain])
}

enum SiteStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

**Content JSON Structure:**
```json
{
  "meta": {
    "title": "Page Title",
    "description": "Meta description"
  },
  "sections": [...]
}
```

**Styles JSON Structure:**
```json
{
  "primaryColor": "#3b82f6",
  "secondaryColor": "#1e293b",
  "accentColor": "#f59e0b",
  "headingFont": "Inter",
  "bodyFont": "Inter"
}
```

---

### Page

Individual pages within a site.

```prisma
model Page {
  id     String @id @default(cuid())
  siteId String

  name     String
  slug     String
  content  Json   @default("{}")

  // SEO
  metaTitle       String?
  metaDescription String?

  // Order for navigation
  order Int @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  site Site @relation(fields: [siteId], references: [id], onDelete: Cascade)

  @@unique([siteId, slug])
  @@index([siteId])
}
```

**Content JSON Structure:**
```json
{
  "sections": [
    {
      "id": "section_123",
      "type": "hero",
      "title": "Welcome",
      "subtitle": "Tagline here",
      "content": "Main paragraph...",
      "cta": {
        "primary": { "text": "Get Started", "url": "#contact" }
      }
    }
  ]
}
```

---

### Asset

Media files uploaded or generated for a project.

```prisma
model Asset {
  id        String @id @default(cuid())
  projectId String

  name     String
  type     AssetType
  url      String
  size     Int?
  mimeType String?
  metadata Json    @default("{}")

  createdAt DateTime @default(now())

  project Project @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@index([projectId])
  @@index([type])
}

enum AssetType {
  IMAGE
  LOGO
  FAVICON
  VIDEO
  DOCUMENT
}
```

**Metadata JSON Structure (AI-generated):**
```json
{
  "source": "ai_generated",
  "model": "dall-e-3",
  "prompt": "Original prompt...",
  "type": "hero",
  "style": "photo"
}
```

**Metadata JSON Structure (Uploaded):**
```json
{
  "source": "upload",
  "originalFilename": "hero.jpg",
  "dimensions": { "width": 1920, "height": 1080 }
}
```

---

### Template

Website template definitions.

```prisma
model Template {
  id       String @id @default(cuid())
  name     String
  category String

  // Template definition
  structure     Json @default("{}")
  defaultStyles Json @default("{}")
  previewUrl    String?
  thumbnailUrl  String?

  // Metadata
  description String?
  tags        String[]

  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sites Site[]

  @@index([category])
  @@index([isActive])
}
```

**Structure JSON:**
```json
{
  "pages": [
    {
      "name": "Home",
      "slug": "",
      "sections": ["hero", "about", "features", "contact"]
    }
  ],
  "defaultSections": [...]
}
```

---

### Generation

AI generation history for tracking and debugging.

```prisma
model Generation {
  id        String @id @default(cuid())
  projectId String

  // Input
  prompt     String
  parameters Json    @default("{}")

  // Output
  result Json @default("{}")

  // Tracking
  model      String
  tokens     Int?
  durationMs Int?
  status     GenerationStatus @default(PENDING)
  error      String?

  createdAt DateTime @default(now())

  @@index([projectId])
  @@index([status])
}

enum GenerationStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}
```

**Parameters JSON (Site Generation):**
```json
{
  "businessType": "restaurant",
  "businessName": "Mario's Kitchen"
}
```

**Parameters JSON (AI Command):**
```json
{
  "tools": ["add_section", "update_colors"]
}
```

**Result JSON (AI Command):**
```json
{
  "response": "AI response text",
  "actions": [
    { "action": "add_section", "description": "Added testimonials section" }
  ],
  "newState": {
    "sections": [...],
    "styles": {...}
  }
}
```

---

## Indexes

Performance indexes are defined on:
- `Project.userId` - User's projects lookup
- `Site.projectId` - Project's sites lookup
- `Site.subdomain` - Subdomain resolution
- `Site.customDomain` - Custom domain resolution
- `Page.siteId` - Site's pages lookup
- `Asset.projectId` - Project's assets lookup
- `Asset.type` - Asset type filtering
- `Template.category` - Template category filtering
- `Template.isActive` - Active template filtering
- `Generation.projectId` - Project's generations lookup
- `Generation.status` - Status filtering

---

## Database Commands

```bash
# Generate Prisma client after schema changes
pnpm db:generate

# Push schema to database (development)
pnpm db:push

# Run migrations (production)
pnpm db:migrate

# Open Prisma Studio (database browser)
pnpm db:studio

# Seed database (if seed script exists)
pnpm db:seed
```

---

## Migrations

For production, use Prisma migrations:

```bash
# Create a new migration
npx prisma migrate dev --name add_feature_x

# Apply migrations in production
npx prisma migrate deploy
```

---

## Best Practices

1. **Cascading Deletes**: All child records are deleted when parent is deleted (configured via `onDelete: Cascade`)

2. **JSON Fields**: Used for flexible schema (content, metadata, settings). Validate structure in application code.

3. **Timestamps**: All models include `createdAt` and `updatedAt` (except join tables)

4. **Soft Deletes**: Not implemented. Consider adding `deletedAt` for audit requirements.

5. **Unique Constraints**:
   - `User.email`
   - `Site.subdomain`
   - `Site.customDomain`
   - `Page.[siteId, slug]`

6. **Index Strategy**: Indexes on foreign keys and frequently filtered columns
