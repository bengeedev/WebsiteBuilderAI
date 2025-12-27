# React Components

This document describes the key React components in WebsiteBuilderAI, their purpose, props, and usage.

## Component Organization

```
apps/web/src/components/
├── onboarding/                 # Onboarding wizard components
│   ├── conversational-wizard.tsx
│   ├── step-business-type.tsx
│   ├── step-business-info.tsx
│   ├── step-branding.tsx
│   ├── step-preview.tsx
│   ├── ai-suggestion.tsx
│   └── ai-branding-recommendation.tsx
├── dashboard/                  # Dashboard components
│   ├── ai-command-bar.tsx
│   └── dashboard-card.tsx
├── preview/                    # Site preview components
│   └── site-preview.tsx
├── assets/                     # Asset management
│   ├── upload-zone.tsx
│   └── asset-grid.tsx
└── providers.tsx               # React context providers
```

---

## Onboarding Components

### ConversationalWizard

The main onboarding component that guides users through website creation via a chat interface.

**File:** `components/onboarding/conversational-wizard.tsx`

**Features:**
- Chat-style interface with AI personality
- Progressive disclosure of options
- Typing animation for AI responses
- Real-time AI tagline suggestions
- Project creation and site generation

**Props:**
```typescript
type Props = {
  initialData: OnboardingData;
  onComplete: (data: OnboardingData) => void;
};

type OnboardingData = {
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessTagline?: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
};
```

**Usage:**
```tsx
import { ConversationalWizard } from "@/components/onboarding/conversational-wizard";

function NewProjectPage() {
  const initialData = {
    businessType: "",
    businessName: "",
    businessDescription: "",
    primaryColor: "#3b82f6",
    secondaryColor: "#1e293b"
  };

  const handleComplete = (data: OnboardingData) => {
    // Data is automatically saved and user is redirected
  };

  return (
    <ConversationalWizard
      initialData={initialData}
      onComplete={handleComplete}
    />
  );
}
```

**Internal State:**
- `step` - Current wizard step (0-5)
- `messages` - Chat history
- `currentInput` - User's current text input
- `isGenerating` - Loading state for AI operations
- `data` - Accumulated onboarding data

**Steps:**
1. Welcome + Business Type selection
2. Business Name input
3. Business Description input
4. Color scheme selection
5. Tagline selection (with AI suggestions)
6. Final preview + Generate

**Animations:**
- Character-by-character text reveal (20ms/char)
- Sequential option reveal (150ms between)
- Typing indicator with bouncing dots
- Progress bar animation

**Example Message Structure:**
```typescript
type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
  displayedContent?: string;    // For typing animation
  options?: Option[];           // Clickable choices
  input?: InputConfig;          // Text input config
  isTyping?: boolean;           // Show typing indicator
  isRevealing?: boolean;        // Currently animating
  revealedOptions?: number;     // Options revealed so far
};
```

---

### AI Suggestion Component

Fetches and displays AI-generated suggestions for form fields.

**File:** `components/onboarding/ai-suggestion.tsx`

**Usage:**
```tsx
<AISuggestion
  field="tagline"
  businessContext={{
    type: "restaurant",
    name: "Mario's Kitchen",
    description: "Family-owned Italian restaurant"
  }}
  onSelect={(suggestion) => setTagline(suggestion)}
/>
```

---

### AI Branding Recommendation

Displays AI-generated branding recommendations (colors, fonts).

**File:** `components/onboarding/ai-branding-recommendation.tsx`

---

## Dashboard Components

### AICommandBar

A persistent command bar at the bottom of the screen for AI interactions.

**File:** `components/dashboard/ai-command-bar.tsx`

**Features:**
- Fixed position at screen bottom
- Expandable chat history view
- Command suggestions
- Real-time typing feedback
- Keyboard shortcut support (Cmd+K)

**Props:**
```typescript
type Props = {
  messages: Message[];
  onSendCommand: (command: string) => void;
  isThinking: boolean;
  projectName: string;
};

type Message = {
  role: string;
  content: string;
};
```

**Usage:**
```tsx
import { AICommandBar } from "@/components/dashboard/ai-command-bar";

function ProjectDashboard({ project }) {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSendCommand = async (command: string) => {
    setIsThinking(true);
    setMessages(prev => [...prev, { role: "user", content: command }]);

    const response = await fetch("/api/ai/command", {
      method: "POST",
      body: JSON.stringify({ projectId: project.id, command, history: messages })
    });

    const result = await response.json();
    setMessages(prev => [...prev, { role: "assistant", content: result.response }]);
    setIsThinking(false);
  };

  return (
    <>
      {/* Dashboard content */}
      <AICommandBar
        messages={messages}
        onSendCommand={handleSendCommand}
        isThinking={isThinking}
        projectName={project.name}
      />
    </>
  );
}
```

**Built-in Suggestions:**
```typescript
const suggestions = [
  "Add a testimonials section",
  "Change the hero image",
  "Write a blog post about...",
  "Improve my SEO score",
  "Add a contact form",
  "Change colors to more vibrant",
];
```

**States:**
- Collapsed: Shows input bar with suggestions
- Expanded: Shows full chat history with messages

---

### DashboardCard

Reusable card component for dashboard sections.

**File:** `components/dashboard/dashboard-card.tsx`

---

## Preview Components

### SitePreview

Renders a live preview of the website.

**File:** `components/preview/site-preview.tsx`

**Features:**
- Real-time content rendering
- Style application (colors, fonts)
- Responsive preview modes
- Section-by-section rendering

---

## Asset Components

### UploadZone

Drag-and-drop file upload component.

**File:** `components/assets/upload-zone.tsx`

**Features:**
- Drag and drop support
- File type validation
- Size limit enforcement
- Upload progress indication
- Presigned URL handling

**Usage:**
```tsx
import { UploadZone } from "@/components/assets/upload-zone";

function AssetManager({ projectId }) {
  const handleUploadComplete = (asset) => {
    console.log("Uploaded:", asset);
  };

  return (
    <UploadZone
      projectId={projectId}
      onUploadComplete={handleUploadComplete}
      acceptedTypes={["image/*", "video/*"]}
      maxSize={10 * 1024 * 1024} // 10MB
    />
  );
}
```

---

### AssetGrid

Displays uploaded and generated assets in a grid.

**File:** `components/assets/asset-grid.tsx`

**Features:**
- Grid layout with thumbnails
- Asset type filtering
- Lightbox preview
- Delete functionality
- Metadata display

---

## Provider Components

### Providers

Root provider component wrapping the application.

**File:** `components/providers.tsx`

**Includes:**
- NextAuth SessionProvider

**Usage:**
```tsx
// In layout.tsx
import { Providers } from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## UI Package Components

The `@repo/ui` package provides shared utilities:

### cn (Class Name Utility)

Combines class names with Tailwind merge support.

```typescript
import { cn } from "@repo/ui";

<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" ? "bg-blue-500" : "bg-gray-500"
)} />
```

### cva (Class Variance Authority)

Type-safe variant management for components.

```typescript
import { cva, type VariantProps } from "@repo/ui";

const buttonVariants = cva(
  "px-4 py-2 rounded font-medium",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: "border border-primary text-primary"
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = VariantProps<typeof buttonVariants>;

function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
```

---

## Component Patterns

### Loading States

```tsx
{isLoading ? (
  <div className="flex gap-1">
    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
) : (
  <Content />
)}
```

### Error Handling

```tsx
{error && (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
    {error}
  </div>
)}
```

### Animation Classes

Common Tailwind animation patterns:
```tsx
// Fade in + slide up
className="animate-in fade-in slide-in-from-bottom-2 duration-300"

// With stagger delay
style={{ animationDelay: `${index * 50}ms` }}

// Pulse animation
className="animate-pulse"

// Bounce animation
className="animate-bounce"
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4" />

// Hide on mobile
<div className="hidden md:block" />

// Show only on mobile
<div className="block md:hidden" />
```

---

## Best Practices

### Component Organization

1. **One component per file** - Keep components focused
2. **Co-locate related files** - Types, tests, styles together
3. **Use descriptive names** - `AICommandBar` not `CommandBar`
4. **Export from index** - Use barrel exports when needed

### State Management

1. **Local state first** - Use useState for component state
2. **Lift when needed** - Pass state up only when required
3. **Server state** - Use fetch + state for API data
4. **No global state library** - Keep it simple

### Performance

1. **useCallback for handlers** - Especially in lists
2. **useMemo for expensive calculations** - Cache computed values
3. **Lazy load heavy components** - Use dynamic imports
4. **Virtualize long lists** - When rendering many items

### Accessibility

1. **Semantic HTML** - Use proper elements
2. **Keyboard navigation** - Support Tab, Enter, Escape
3. **ARIA labels** - For icons and buttons
4. **Focus management** - Proper focus handling

### TypeScript

1. **Type all props** - No implicit any
2. **Use type over interface** - For consistency
3. **Export types** - When used externally
4. **Generic components** - For reusability
