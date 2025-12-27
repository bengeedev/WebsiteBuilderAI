import { prisma, Prisma } from "@repo/database";
import type {
  ProjectMemoryData,
  BusinessDetails,
  DesignDecision,
  ContentVersion,
  SiteGoal,
  DiscoveredInfo,
} from "./types";

const DEFAULT_PROJECT_MEMORY: ProjectMemoryData = {
  businessDetails: {
    name: "",
    type: "",
    description: "",
  },
  designDecisions: [],
  contentHistory: [],
  generatedContentCache: {},
  siteGoals: [],
  discoveredInfo: {},
};

export class ProjectMemoryService {
  private projectId: string;

  constructor(projectId: string) {
    this.projectId = projectId;
  }

  async getMemory(): Promise<ProjectMemoryData> {
    const memory = await prisma.projectMemory.findUnique({
      where: { projectId: this.projectId },
    });

    if (!memory) {
      return DEFAULT_PROJECT_MEMORY;
    }

    return {
      businessDetails: (memory.businessDetails as BusinessDetails) ?? DEFAULT_PROJECT_MEMORY.businessDetails,
      designDecisions: (memory.designDecisions as DesignDecision[]) ?? [],
      contentHistory: (memory.contentHistory as ContentVersion[]) ?? [],
      generatedContentCache: (memory.generatedContentCache as Record<string, unknown>) ?? {},
      siteGoals: (memory.siteGoals as SiteGoal[]) ?? [],
      discoveredInfo: (memory.discoveredInfo as DiscoveredInfo) ?? {},
    };
  }

  async ensureMemoryExists(): Promise<void> {
    await prisma.projectMemory.upsert({
      where: { projectId: this.projectId },
      create: {
        projectId: this.projectId,
        businessDetails: DEFAULT_PROJECT_MEMORY.businessDetails,
        designDecisions: [],
        contentHistory: [],
        generatedContentCache: {},
        siteGoals: [],
        discoveredInfo: {},
      },
      update: {},
    });
  }

  async updateBusinessDetails(details: Partial<BusinessDetails>): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.businessDetails, ...details };

    await prisma.projectMemory.upsert({
      where: { projectId: this.projectId },
      create: {
        projectId: this.projectId,
        businessDetails: updated,
        designDecisions: [],
        contentHistory: [],
        generatedContentCache: {},
        siteGoals: [],
        discoveredInfo: {},
      },
      update: {
        businessDetails: updated,
      },
    });
  }

  async recordDesignDecision(decision: Omit<DesignDecision, "id" | "timestamp">): Promise<void> {
    const current = await this.getMemory();
    const newDecision: DesignDecision = {
      ...decision,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    // Keep last 50 design decisions
    const decisions = [...current.designDecisions, newDecision].slice(-50);

    await prisma.projectMemory.update({
      where: { projectId: this.projectId },
      data: { designDecisions: decisions as Prisma.InputJsonValue },
    });
  }

  async saveContentVersion(sectionId: string, content: unknown): Promise<void> {
    const current = await this.getMemory();
    const newVersion: ContentVersion = {
      id: crypto.randomUUID(),
      sectionId,
      content,
      timestamp: new Date().toISOString(),
    };

    // Keep last 20 versions per section
    const sectionHistory = current.contentHistory.filter((v) => v.sectionId === sectionId);
    const otherHistory = current.contentHistory.filter((v) => v.sectionId !== sectionId);
    const updatedSectionHistory = [...sectionHistory, newVersion].slice(-20);

    await prisma.projectMemory.update({
      where: { projectId: this.projectId },
      data: { contentHistory: [...otherHistory, ...updatedSectionHistory] as Prisma.InputJsonValue },
    });
  }

  async getContentHistory(sectionId: string): Promise<ContentVersion[]> {
    const current = await this.getMemory();
    return current.contentHistory
      .filter((v) => v.sectionId === sectionId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async cacheGeneratedContent(key: string, content: unknown): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.generatedContentCache, [key]: content };

    await prisma.projectMemory.update({
      where: { projectId: this.projectId },
      data: { generatedContentCache: updated as Prisma.InputJsonValue },
    });
  }

  async getCachedContent(key: string): Promise<unknown | null> {
    const current = await this.getMemory();
    return current.generatedContentCache[key] ?? null;
  }

  async setSiteGoals(goals: Omit<SiteGoal, "id">[]): Promise<void> {
    const siteGoals = goals.map((g) => ({
      ...g,
      id: crypto.randomUUID(),
    }));

    await prisma.projectMemory.upsert({
      where: { projectId: this.projectId },
      create: {
        projectId: this.projectId,
        businessDetails: DEFAULT_PROJECT_MEMORY.businessDetails,
        designDecisions: [],
        contentHistory: [],
        generatedContentCache: {},
        siteGoals,
        discoveredInfo: {},
      },
      update: { siteGoals },
    });
  }

  async updateGoalStatus(goalId: string, status: SiteGoal["status"]): Promise<void> {
    const current = await this.getMemory();
    const updated = current.siteGoals.map((g) =>
      g.id === goalId ? { ...g, status } : g
    );

    await prisma.projectMemory.update({
      where: { projectId: this.projectId },
      data: { siteGoals: updated },
    });
  }

  async setDiscoveredInfo(info: DiscoveredInfo): Promise<void> {
    const current = await this.getMemory();
    const updated = { ...current.discoveredInfo, ...info };

    await prisma.projectMemory.upsert({
      where: { projectId: this.projectId },
      create: {
        projectId: this.projectId,
        businessDetails: DEFAULT_PROJECT_MEMORY.businessDetails,
        designDecisions: [],
        contentHistory: [],
        generatedContentCache: {},
        siteGoals: [],
        discoveredInfo: updated,
      },
      update: { discoveredInfo: updated },
    });
  }

  async getDiscoveredInfo(): Promise<DiscoveredInfo> {
    const current = await this.getMemory();
    return current.discoveredInfo;
  }
}
