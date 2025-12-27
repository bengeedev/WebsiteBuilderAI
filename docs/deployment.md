# Deployment Guide

This document covers deploying WebsiteBuilderAI to production.

## Prerequisites

Before deploying, ensure you have:

- [ ] PostgreSQL database (production-ready)
- [ ] Anthropic API key (for Claude AI)
- [ ] OpenAI API key (optional, for DALL-E images)
- [ ] Runway API key (optional, for video generation)
- [ ] S3-compatible storage (for file uploads)
- [ ] OAuth credentials (optional, for social login)

---

## Environment Variables

### Required Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/builderai?schema=public"

# NextAuth.js
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI Provider (at least one required)
ANTHROPIC_API_KEY="sk-ant-..."
```

### Optional Variables

```bash
# OpenAI (for DALL-E 3 image generation)
OPENAI_API_KEY="sk-..."

# Runway ML (for video generation)
RUNWAY_API_KEY="..."

# OAuth Providers
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."

# File Storage (S3-compatible)
S3_ACCESS_KEY_ID="..."
S3_SECRET_ACCESS_KEY="..."
S3_BUCKET="your-bucket-name"
S3_REGION="auto"
S3_ENDPOINT="https://account-id.r2.cloudflarestorage.com"
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

---

## Deployment Platforms

### Vercel (Recommended)

The easiest deployment option for Next.js applications.

**Steps:**

1. **Connect Repository**
   ```
   1. Go to vercel.com and sign in
   2. Click "Import Project"
   3. Select your Git repository
   ```

2. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: apps/web
   Build Command: cd ../.. && pnpm build --filter=web
   Install Command: cd ../.. && pnpm install
   Output Directory: .next
   ```

3. **Set Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Use Vercel's environment variable UI or CLI

4. **Deploy**
   - Vercel will automatically deploy on push to main branch

**Turborepo Configuration for Vercel:**
```json
{
  "buildCommand": "cd ../.. && pnpm turbo build --filter=web...",
  "framework": "nextjs"
}
```

### Docker

For self-hosted deployments.

**Dockerfile:**
```dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/*/package.json ./packages/
RUN pnpm install --frozen-lockfile

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY . .

# Generate Prisma client
RUN pnpm db:generate

# Build
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build --filter=web

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/web/server.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/builderai
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=builderai

volumes:
  postgres_data:
```

**Build and Run:**
```bash
docker-compose up --build
```

### Railway

Simple cloud deployment with managed PostgreSQL.

**Steps:**

1. Create new project on railway.app
2. Add PostgreSQL service
3. Connect GitHub repository
4. Set environment variables
5. Configure build:
   ```
   Build Command: pnpm build --filter=web
   Start Command: pnpm start --filter=web
   ```

### Fly.io

Global edge deployment.

**fly.toml:**
```toml
app = "websitebuilderai"
primary_region = "iad"

[build]
  builder = "heroku/buildpacks:20"

[env]
  NODE_ENV = "production"
  PORT = "3000"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true

[[services.http_checks]]
  interval = "30s"
  timeout = "5s"
  path = "/api/health"
```

---

## Database Setup

### PostgreSQL on Supabase

1. Create project on supabase.com
2. Get connection string from Settings > Database
3. Set `DATABASE_URL` in environment

### PostgreSQL on Neon

1. Create project on neon.tech
2. Get connection string from dashboard
3. Use pooled connection for serverless

### Running Migrations

```bash
# Push schema changes (development)
pnpm db:push

# Run migrations (production)
npx prisma migrate deploy

# Generate Prisma client
pnpm db:generate
```

---

## Storage Setup

### Cloudflare R2

Recommended for S3-compatible storage.

1. Create R2 bucket in Cloudflare dashboard
2. Create API token with R2 permissions
3. Configure environment:
   ```bash
   S3_ACCESS_KEY_ID="your-access-key"
   S3_SECRET_ACCESS_KEY="your-secret-key"
   S3_BUCKET="your-bucket"
   S3_REGION="auto"
   S3_ENDPOINT="https://account-id.r2.cloudflarestorage.com"
   ```

### AWS S3

1. Create S3 bucket
2. Create IAM user with S3 permissions
3. Configure environment:
   ```bash
   S3_ACCESS_KEY_ID="AKIA..."
   S3_SECRET_ACCESS_KEY="..."
   S3_BUCKET="your-bucket"
   S3_REGION="us-east-1"
   # S3_ENDPOINT not needed for AWS
   ```

### CORS Configuration

For R2/S3, enable CORS:
```json
{
  "AllowedOrigins": ["https://your-domain.com"],
  "AllowedMethods": ["GET", "PUT", "POST"],
  "AllowedHeaders": ["*"],
  "ExposeHeaders": ["ETag"]
}
```

---

## OAuth Setup

### Google OAuth

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Set authorized redirect: `https://your-domain.com/api/auth/callback/google`
4. Add to environment:
   ```bash
   GOOGLE_CLIENT_ID="..."
   GOOGLE_CLIENT_SECRET="..."
   ```

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create new OAuth app
3. Set callback URL: `https://your-domain.com/api/auth/callback/github`
4. Add to environment:
   ```bash
   GITHUB_CLIENT_ID="..."
   GITHUB_CLIENT_SECRET="..."
   ```

---

## Health Checks

Add a health check endpoint for monitoring:

**`apps/web/src/app/api/health/route.ts`:**
```typescript
import { NextResponse } from "next/server";
import { prisma } from "@repo/database";

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
```

---

## Monitoring

### Error Tracking (Sentry)

1. Install Sentry:
   ```bash
   pnpm add @sentry/nextjs --filter=web
   ```

2. Configure `sentry.client.config.ts`:
   ```typescript
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 0.1,
   });
   ```

### Logging

For production logging, consider:
- Vercel Logs (automatic on Vercel)
- Axiom
- LogTail
- Papertrail

---

## Performance Optimization

### Edge Caching

For Vercel, configure caching in `next.config.js`:
```javascript
module.exports = {
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        { key: "Cache-Control", value: "s-maxage=60, stale-while-revalidate" }
      ]
    }
  ]
};
```

### Image Optimization

Next.js Image component is automatically optimized on Vercel.

For self-hosted, configure a loader or use Cloudflare Images.

### Database Connection Pooling

For serverless, use connection pooling:
- Supabase: Use pooled connection string
- Neon: Enable serverless driver
- PgBouncer: For self-hosted PostgreSQL

---

## Security Checklist

- [ ] HTTPS enabled (automatic on most platforms)
- [ ] `NEXTAUTH_SECRET` is a strong random value
- [ ] API keys are not exposed to client
- [ ] Database is not publicly accessible
- [ ] CORS configured correctly for storage
- [ ] Rate limiting configured (if needed)
- [ ] Environment variables not logged

---

## Rollback Procedure

### Vercel

1. Go to Deployments
2. Find previous working deployment
3. Click "..." > "Instant Rollback"

### Docker

```bash
# List images
docker images

# Run previous version
docker run -d previous-image:tag
```

---

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Check DATABASE_URL format
- Verify network access/firewall rules
- Check SSL requirements

**NEXTAUTH_URL Mismatch:**
- Ensure NEXTAUTH_URL matches actual domain
- Include https:// prefix
- No trailing slash

**Build Failures:**
- Run `pnpm install` locally first
- Check for TypeScript errors
- Verify all environment variables are set

**File Upload Failures:**
- Check S3/R2 credentials
- Verify CORS configuration
- Check bucket permissions

### Debug Mode

Set `DEBUG=*` environment variable for verbose logging.

---

## Scaling

### Horizontal Scaling

- Vercel: Automatic
- Docker: Use container orchestration (Kubernetes, ECS)
- Database: Use read replicas for heavy read loads

### Vertical Scaling

- Increase memory for AI-heavy operations
- Consider dedicated compute for video generation

### CDN

- Enable Vercel Edge Network (automatic)
- Or use Cloudflare CDN in front of your app
