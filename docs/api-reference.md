# API Reference

This document describes all API endpoints available in WebsiteBuilderAI.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://your-domain.com/api`

## Authentication

All protected endpoints require a valid session. The API uses NextAuth.js JWT sessions.

Include the session cookie in all requests:
```
Cookie: next-auth.session-token=<token>
```

Unauthenticated requests return:
```json
{ "error": "Unauthorized" }
```
Status: `401`

---

## Authentication Endpoints

### POST `/api/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "id": "cuid...",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Errors:**
- `400` - Invalid input (email format, password requirements)
- `409` - Email already exists

### NextAuth Endpoints

Standard NextAuth.js endpoints at `/api/auth/[...nextauth]`:
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/providers` - List available providers

---

## Project Endpoints

### GET `/api/projects`

List all projects for the authenticated user.

**Response:**
```json
[
  {
    "id": "cuid...",
    "userId": "cuid...",
    "name": "My Restaurant",
    "description": "A family-owned Italian restaurant",
    "businessType": "restaurant",
    "businessName": "Mario's Kitchen",
    "businessTagline": "Authentic Italian Cuisine",
    "primaryColor": "#3b82f6",
    "secondaryColor": "#1e293b",
    "logoUrl": null,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "sites": [
      {
        "id": "cuid...",
        "status": "PUBLISHED",
        "subdomain": "marios-kitchen",
        "publishedAt": "2024-01-15T11:00:00Z"
      }
    ]
  }
]
```

### POST `/api/projects`

Create a new project.

**Request Body:**
```json
{
  "businessType": "restaurant",
  "businessName": "Mario's Kitchen",
  "businessDescription": "A family-owned Italian restaurant serving authentic cuisine since 1985.",
  "businessTagline": "Authentic Italian Cuisine",
  "primaryColor": "#3b82f6",
  "secondaryColor": "#1e293b",
  "logoUrl": "https://..."
}
```

**Required Fields:**
- `businessType` (string)
- `businessName` (string)
- `businessDescription` (string)
- `primaryColor` (string)
- `secondaryColor` (string)

**Response:**
```json
{
  "id": "cuid...",
  "userId": "cuid...",
  "name": "Mario's Kitchen",
  "description": "A family-owned Italian restaurant...",
  "businessType": "restaurant",
  "businessName": "Mario's Kitchen",
  "businessTagline": "Authentic Italian Cuisine",
  "primaryColor": "#3b82f6",
  "secondaryColor": "#1e293b",
  "logoUrl": null,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### GET `/api/projects/[id]`

Get a specific project with its sites and pages.

**Response:**
```json
{
  "id": "cuid...",
  "name": "Mario's Kitchen",
  "sites": [
    {
      "id": "cuid...",
      "templateId": null,
      "content": { ... },
      "styles": { "primaryColor": "#3b82f6" },
      "title": "Mario's Kitchen",
      "description": "Authentic Italian Cuisine",
      "status": "DRAFT",
      "subdomain": null,
      "customDomain": null,
      "pages": [
        {
          "id": "cuid...",
          "name": "Home",
          "slug": "",
          "content": { "sections": [...] }
        }
      ]
    }
  ]
}
```

### PATCH `/api/projects/[id]`

Update a project.

**Request Body:** (partial update)
```json
{
  "name": "New Name",
  "primaryColor": "#10b981"
}
```

**Response:**
```json
{ "success": true }
```

### DELETE `/api/projects/[id]`

Delete a project and all associated data.

**Response:**
```json
{ "success": true }
```

---

## AI Endpoints

### POST `/api/ai/command`

Send a natural language command to the AI webmaster.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "command": "Add a testimonials section with 3 customer reviews",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

**Response:**
```json
{
  "response": "I've added a testimonials section with 3 customer reviews.",
  "actions": [
    {
      "action": "add_section",
      "description": "Added testimonials section"
    }
  ],
  "siteUpdated": true,
  "newState": {
    "sections": [...],
    "styles": {...},
    "meta": {...}
  },
  "matchedCapabilities": [
    {
      "id": "add_section",
      "name": "Add Section",
      "confidence": 0.85
    }
  ]
}
```

### POST `/api/ai/suggest`

Get AI suggestions for form fields during onboarding.

**Request Body:**
```json
{
  "field": "tagline",
  "currentValue": "",
  "businessContext": {
    "type": "restaurant",
    "name": "Mario's Kitchen",
    "description": "Family-owned Italian restaurant"
  }
}
```

**Response:**
```json
{
  "suggestions": [
    "Where Every Meal is Made with Love",
    "Authentic Italian, Family Tradition",
    "Taste the Heart of Italy"
  ]
}
```

---

## Generation Endpoints

### POST `/api/generate`

Generate complete website content for a project.

**Request Body:**
```json
{
  "projectId": "cuid..."
}
```

**Response:**
```json
{
  "site": {
    "id": "cuid...",
    "projectId": "cuid...",
    "templateId": null,
    "content": {...},
    "styles": {...},
    "title": "Mario's Kitchen",
    "description": "..."
  },
  "content": {
    "meta": {
      "title": "Mario's Kitchen | Authentic Italian Cuisine",
      "description": "..."
    },
    "sections": [...]
  }
}
```

### POST `/api/generate/image`

Generate an image using DALL-E 3.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "type": "hero",  // "custom" | "hero" | "section"
  "prompt": "A cozy Italian restaurant interior",
  "sectionType": "about",  // For type="section"
  "style": "photo",  // "photo" | "illustration"
  "quality": "standard",  // "standard" | "hd"
  "size": "1024x1024"  // "1024x1024" | "1792x1024" | "1024x1792"
}
```

**Response:**
```json
{
  "success": true,
  "image": {
    "id": "cuid...",
    "url": "https://...",
    "prompt": "A cozy Italian restaurant interior with warm lighting..."
  }
}
```

**Errors:**
- `503` - Image generation not configured (missing OPENAI_API_KEY)

### POST `/api/generate/logo`

Generate logo variations using DALL-E 3.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "style": "minimalist",  // "minimalist" | "bold" | "vintage" | "playful" | "corporate"
  "colors": ["#3b82f6", "#1e293b"],
  "generateVariations": true,
  "variationCount": 3  // Max 5
}
```

**Response:**
```json
{
  "success": true,
  "logos": [
    {
      "id": "cuid...",
      "url": "https://...",
      "prompt": "..."
    }
  ]
}
```

### POST `/api/generate/video`

Start video generation using Runway ML.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "type": "hero",  // "custom" | "hero" | "animate"
  "prompt": "Smooth camera pan across restaurant",
  "imageUrl": "https://...",  // For type="animate"
  "duration": 5,  // 5 | 10
  "aspectRatio": "16:9",  // "16:9" | "9:16" | "1:1"
  "style": "cinematic",  // "cinematic" | "commercial" | "artistic"
  "motion": "subtle"  // For animate: "subtle" | "moderate" | "dynamic"
}
```

**Response:**
```json
{
  "success": true,
  "taskId": "runway-task-id",
  "status": "pending",
  "message": "Video generation started. Poll /api/generate/video/status for updates."
}
```

### GET `/api/generate/video`

Check video generation status.

**Query Parameters:**
- `taskId` (required) - The Runway task ID
- `projectId` (optional) - For asset creation on completion

**Response:**
```json
{
  "id": "runway-task-id",
  "status": "completed",  // "pending" | "processing" | "completed" | "failed"
  "progress": 100,
  "videoUrl": "https://...",
  "thumbnailUrl": "https://...",
  "assetId": "cuid..."  // If completed and projectId provided
}
```

---

## Asset Endpoints

### GET `/api/assets`

List assets for a project.

**Query Parameters:**
- `projectId` (required)
- `type` (optional) - Filter by type: `IMAGE`, `LOGO`, `FAVICON`, `VIDEO`, `DOCUMENT`

**Response:**
```json
{
  "assets": [
    {
      "id": "cuid...",
      "name": "Hero Image",
      "type": "IMAGE",
      "url": "https://...",
      "metadata": {
        "source": "ai_generated",
        "model": "dall-e-3"
      },
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### DELETE `/api/assets/[id]`

Delete an asset.

**Response:**
```json
{ "success": true }
```

---

## Upload Endpoints

### POST `/api/upload/presign`

Get a presigned URL for direct upload to S3/R2.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "filename": "hero-image.jpg",
  "contentType": "image/jpeg",
  "size": 1048576
}
```

**Response:**
```json
{
  "uploadUrl": "https://storage.example.com/presigned-url...",
  "key": "projects/cuid.../images/hero-image-123456.jpg",
  "publicUrl": "https://cdn.example.com/projects/cuid.../images/hero-image-123456.jpg",
  "assetType": "IMAGE"
}
```

**Errors:**
- `400` - Invalid file type or size
- `503` - File storage not configured

### POST `/api/upload/confirm`

Confirm upload completion and create asset record.

**Request Body:**
```json
{
  "projectId": "cuid...",
  "key": "projects/cuid.../images/hero-image-123456.jpg",
  "filename": "hero-image.jpg",
  "contentType": "image/jpeg",
  "size": 1048576,
  "assetType": "IMAGE"
}
```

**Response:**
```json
{
  "asset": {
    "id": "cuid...",
    "name": "hero-image.jpg",
    "type": "IMAGE",
    "url": "https://cdn.example.com/..."
  }
}
```

---

## Error Responses

All endpoints follow a consistent error format:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common Status Codes:**
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `404` - Not Found (resource doesn't exist or not owned by user)
- `500` - Internal Server Error
- `503` - Service Unavailable (external service not configured)

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider:
- Per-user request limits
- AI endpoint throttling
- Upload size limits

---

## Webhooks

No webhooks are currently implemented. Planned for future releases:
- Site published notification
- Video generation complete
- Form submission received
