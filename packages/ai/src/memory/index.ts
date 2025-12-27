// Memory services
export { UserMemoryService } from "./user-memory";
export { ProjectMemoryService } from "./project-memory";
export { SessionMemoryService } from "./session-memory";
export { MemoryContextBuilder } from "./context-builder";

// Types
export type {
  // User memory types
  StylePreferences,
  BusinessContext,
  InteractionPatterns,
  DecisionRecord,
  UserMemoryData,
  // Project memory types
  BusinessDetails,
  DesignDecision,
  ContentVersion,
  SiteGoal,
  DiscoveredInfo,
  ProjectMemoryData,
  // Session memory types
  SessionTaskStatus,
  SessionTask,
  PendingQuestion,
  WIPState,
  SessionMemoryData,
  // Combined types
  AIMemoryContext,
  MessageRole,
  ChatMessageData,
} from "./types";
