import { prisma } from "@repo/database";
import type {
  UserMemoryData,
  StylePreferences,
  BusinessContext,
  InteractionPatterns,
  DecisionRecord,
} from "./types";

const DEFAULT_USER_MEMORY: UserMemoryData = {
  stylePreferences: {
    preferredColors: [],
    preferredFonts: { heading: "Inter", body: "Inter" },
    designStyle: "modern",
  },
  businessContext: {
    industries: [],
    brandVoice: "professional",
  },
  interactionPatterns: {
    responseStyle: "concise",
    proactivity: "proactive",
    helpLevel: "intermediate",
  },
  decisionHistory: [],
};

export class UserMemoryService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async getMemory(): Promise<UserMemoryData> {
    const memory = await prisma.userMemory.findUnique({
      where: { userId: this.userId },
    });

    if (!memory) {
      return DEFAULT_USER_MEMORY;
    }

    return {
      stylePreferences: (memory.stylePreferences as StylePreferences) ?? DEFAULT_USER_MEMORY.stylePreferences,
      businessContext: (memory.businessContext as BusinessContext) ?? DEFAULT_USER_MEMORY.businessContext,
      interactionPatterns: (memory.interactionPatterns as InteractionPatterns) ?? DEFAULT_USER_MEMORY.interactionPatterns,
      decisionHistory: (memory.decisionHistory as DecisionRecord[]) ?? [],
    };
  }

  async ensureMemoryExists(): Promise<void> {
    await prisma.userMemory.upsert({
      where: { userId: this.userId },
      create: {
        userId: this.userId,
        stylePreferences: DEFAULT_USER_MEMORY.stylePreferences,
        businessContext: DEFAULT_USER_MEMORY.businessContext,
        interactionPatterns: DEFAULT_USER_MEMORY.interactionPatterns,
        decisionHistory: [],
      },
      update: {},
    });
  }

  async updateStylePreferences(prefs: Partial<StylePreferences>): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.stylePreferences, ...prefs };

    await prisma.userMemory.upsert({
      where: { userId: this.userId },
      create: {
        userId: this.userId,
        stylePreferences: updated,
        businessContext: DEFAULT_USER_MEMORY.businessContext,
        interactionPatterns: DEFAULT_USER_MEMORY.interactionPatterns,
        decisionHistory: [],
      },
      update: {
        stylePreferences: updated,
      },
    });
  }

  async updateBusinessContext(context: Partial<BusinessContext>): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.businessContext, ...context };

    await prisma.userMemory.upsert({
      where: { userId: this.userId },
      create: {
        userId: this.userId,
        stylePreferences: DEFAULT_USER_MEMORY.stylePreferences,
        businessContext: updated,
        interactionPatterns: DEFAULT_USER_MEMORY.interactionPatterns,
        decisionHistory: [],
      },
      update: {
        businessContext: updated,
      },
    });
  }

  async updateInteractionPatterns(patterns: Partial<InteractionPatterns>): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.interactionPatterns, ...patterns };

    await prisma.userMemory.upsert({
      where: { userId: this.userId },
      create: {
        userId: this.userId,
        stylePreferences: DEFAULT_USER_MEMORY.stylePreferences,
        businessContext: DEFAULT_USER_MEMORY.businessContext,
        interactionPatterns: updated,
        decisionHistory: [],
      },
      update: {
        interactionPatterns: updated,
      },
    });
  }

  async learnFromDecision(context: string, decision: string, field?: string): Promise<void> {
    const current = await this.getMemory();
    const newRecord: DecisionRecord = {
      context,
      decision,
      field,
      timestamp: new Date().toISOString(),
    };

    // Keep last 100 decisions
    const history = [...current.decisionHistory, newRecord].slice(-100);

    await prisma.userMemory.upsert({
      where: { userId: this.userId },
      create: {
        userId: this.userId,
        stylePreferences: DEFAULT_USER_MEMORY.stylePreferences,
        businessContext: DEFAULT_USER_MEMORY.businessContext,
        interactionPatterns: DEFAULT_USER_MEMORY.interactionPatterns,
        decisionHistory: history,
      },
      update: {
        decisionHistory: history,
      },
    });
  }

  async inferPreferences(): Promise<Partial<StylePreferences>> {
    const memory = await this.getMemory();
    const colorDecisions = memory.decisionHistory.filter((d) => d.field === "color");

    if (colorDecisions.length === 0) {
      return {};
    }

    // Extract most common colors from decisions
    const colorCounts = new Map<string, number>();
    for (const decision of colorDecisions) {
      const color = decision.decision;
      colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
    }

    const preferredColors = [...colorCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([color]) => color);

    return { preferredColors };
  }
}
