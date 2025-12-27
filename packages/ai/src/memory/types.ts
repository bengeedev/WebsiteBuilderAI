// ============================================
// AI MEMORY TYPES
// ============================================

// --- User Memory Types ---

export type StylePreferences = {
  preferredColors: string[];
  preferredFonts: { heading: string; body: string };
  designStyle: "modern" | "classic" | "minimal" | "bold";
  layoutPreferences?: {
    headerStyle?: "centered" | "left-aligned" | "logo-left";
    footerComplexity?: "simple" | "detailed";
  };
};

export type BusinessContext = {
  industries: string[];
  brandVoice: "professional" | "friendly" | "casual" | "formal";
  targetAudience?: string[];
  commonGoals?: string[];
};

export type InteractionPatterns = {
  responseStyle: "concise" | "verbose";
  proactivity: "proactive" | "reactive";
  helpLevel: "beginner" | "intermediate" | "advanced";
  preferredLanguage?: string;
};

export type DecisionRecord = {
  context: string;
  decision: string;
  field?: string;
  timestamp: string;
};

export type UserMemoryData = {
  stylePreferences: StylePreferences;
  businessContext: BusinessContext;
  interactionPatterns: InteractionPatterns;
  decisionHistory: DecisionRecord[];
};

// --- Project Memory Types ---

export type BusinessDetails = {
  name: string;
  type: string;
  description: string;
  tagline?: string;
  targetAudience?: string[];
  competitors?: string[];
  uniqueSellingPoints?: string[];
  goals?: string[];
};

export type DesignDecision = {
  id: string;
  type: "color" | "font" | "layout" | "section" | "content";
  before: unknown;
  after: unknown;
  rationale?: string;
  timestamp: string;
};

export type ContentVersion = {
  id: string;
  sectionId: string;
  content: unknown;
  timestamp: string;
};

export type SiteGoal = {
  id: string;
  goal: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "achieved";
};

export type DiscoveredInfo = {
  existingWebsite?: {
    url: string;
    title?: string;
    description?: string;
    colors?: string[];
    logoUrl?: string;
  };
  socialLinks?: Record<string, string>;
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  domain?: string;
};

export type ProjectMemoryData = {
  businessDetails: BusinessDetails;
  designDecisions: DesignDecision[];
  contentHistory: ContentVersion[];
  generatedContentCache: Record<string, unknown>;
  siteGoals: SiteGoal[];
  discoveredInfo: DiscoveredInfo;
};

// --- Session Memory Types ---

export type SessionTaskStatus = "pending" | "in_progress" | "completed" | "blocked";

export type SessionTask = {
  id: string;
  task: string;
  status: SessionTaskStatus;
  priority: number;
  createdAt: string;
  completedAt?: string;
};

export type PendingQuestion = {
  id: string;
  question: string;
  field: string;
  required: boolean;
  options?: string[];
  context?: string;
};

export type WIPState = {
  currentStep?: string;
  pendingAction?: string;
  partialData?: Record<string, unknown>;
};

export type SessionMemoryData = {
  currentTasks: SessionTask[];
  pendingQuestions: PendingQuestion[];
  wipState: WIPState;
};

// --- Combined Context ---

export type AIMemoryContext = {
  user: Partial<UserMemoryData> | null;
  project: Partial<ProjectMemoryData> | null;
  session: Partial<SessionMemoryData> | null;
};

// --- Message Types ---

export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";

export type ChatMessageData = {
  role: MessageRole;
  content: string;
  toolCalls?: unknown[];
  actions?: unknown[];
  tokens?: number;
};
