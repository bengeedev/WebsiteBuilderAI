# WebsiteBuilderAI Developer Documentation

> The AI-powered website builder that creates professional websites through natural conversation.

## Overview

WebsiteBuilderAI is a modern, AI-first website builder that enables users to create complete, professional websites simply by chatting with an AI assistant. The platform combines Claude AI for intelligent content generation, DALL-E 3 for image creation, and Runway ML for video generation.

### Key Features

- **Conversational Onboarding**: Guide users through website creation via a chat-based wizard
- **AI Content Generation**: Automatically generate website copy, sections, and layouts
- **AI Image Generation**: Create custom images and logos using DALL-E 3
- **AI Video Generation**: Generate video backgrounds using Runway ML (beta)
- **Real-time Preview**: See changes instantly as you build
- **Multi-provider AI**: Support for Claude (primary) and OpenAI with automatic fallback
- **Template Library**: 25+ industry-specific templates ready to customize

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0
- PostgreSQL database
- API keys for Anthropic Claude (required), OpenAI (optional)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd WebsiteBuilderAI

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Generate Prisma client
pnpm db:generate

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

### Environment Variables

Create a `.env.local` file with:

```bash
# Required
DATABASE_URL="postgresql://user:password@localhost:5432/builderai"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
ANTHROPIC_API_KEY="sk-ant-..."

# Optional - OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Optional - Image/Video Generation
OPENAI_API_KEY=""  # For DALL-E 3
RUNWAY_API_KEY=""  # For video generation

# Optional - File Storage (Cloudflare R2/S3)
S3_ACCESS_KEY_ID=""
S3_SECRET_ACCESS_KEY=""
S3_BUCKET=""
S3_REGION=""
S3_ENDPOINT=""
```

### Development Commands

```bash
# Start all apps in development mode
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Open Prisma Studio (database browser)
pnpm db:studio

# Generate Prisma client after schema changes
pnpm db:generate

# Push schema changes to database
pnpm db:push
```

## Documentation Index

| Document | Description |
|----------|-------------|
| [Architecture](./architecture.md) | Monorepo structure, packages, and system design |
| [Block System](./block-system.md) | Composable block system for page building |
| [Features](./features.md) | Complete feature list (implemented and planned) |
| [API Reference](./api-reference.md) | REST API endpoints documentation |
| [Database Schema](./database-schema.md) | Prisma schema and data models |
| [AI Capabilities](./ai-capabilities.md) | AI registry, tools, and providers |
| [Components](./components.md) | Key React components and their usage |
| [Deployment](./deployment.md) | Production deployment guide |

## Project Structure

```
WebsiteBuilderAI/
├── apps/
│   └── web/                 # Next.js 14 web application
│       ├── src/
│       │   ├── app/         # App router pages and API routes
│       │   ├── components/  # React components
│       │   └── lib/         # Utilities and configurations
│       └── ...
├── packages/
│   ├── ai/                  # AI providers, tools, and capabilities
│   ├── database/            # Prisma client and schema
│   ├── templates/           # Website templates and sections
│   └── ui/                  # Shared UI components
├── docs/                    # This documentation
└── ...
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js |
| AI (Text) | Anthropic Claude, OpenAI GPT-4 |
| AI (Images) | OpenAI DALL-E 3 |
| AI (Video) | Runway ML Gen-3 |
| File Storage | Cloudflare R2 / S3 |
| Monorepo | Turborepo + pnpm |

## Contributing

1. Read the [Architecture](./architecture.md) document to understand the system
2. Check [Features](./features.md) for the roadmap and planned features
3. Follow the TypeScript and ESLint configurations
4. Write clear commit messages
5. Test your changes before submitting PRs

## Support

For questions or issues:
- Check the documentation in this folder
- Review existing code patterns
- Consult the AI capabilities registry for understanding AI behavior
