import { UserMemoryService } from "./user-memory";
import { ProjectMemoryService } from "./project-memory";
import { SessionMemoryService } from "./session-memory";
import type { AIMemoryContext, ChatMessageData } from "./types";

export class MemoryContextBuilder {
  private userId: string;
  private projectId: string;

  private userMemory: UserMemoryService;
  private projectMemory: ProjectMemoryService;
  private sessionMemory: SessionMemoryService;

  constructor(userId: string, projectId: string) {
    this.userId = userId;
    this.projectId = projectId;

    this.userMemory = new UserMemoryService(userId);
    this.projectMemory = new ProjectMemoryService(projectId);
    this.sessionMemory = new SessionMemoryService(projectId, userId);
  }

  getUserMemory(): UserMemoryService {
    return this.userMemory;
  }

  getProjectMemory(): ProjectMemoryService {
    return this.projectMemory;
  }

  getSessionMemory(): SessionMemoryService {
    return this.sessionMemory;
  }

  async buildContext(): Promise<AIMemoryContext> {
    const [userMemory, projectMemory, sessionData] = await Promise.all([
      this.userMemory.getMemory(),
      this.projectMemory.getMemory(),
      this.sessionMemory.getSessionData(),
    ]);

    return {
      user: userMemory,
      project: projectMemory,
      session: sessionData,
    };
  }

  async getConversationHistory(limit = 20): Promise<ChatMessageData[]> {
    return this.sessionMemory.getConversationHistory(limit);
  }

  buildSystemPromptSection(context: AIMemoryContext): string {
    const sections: string[] = [];

    // User preferences section
    if (context.user) {
      const userSection: string[] = [];

      if (context.user.stylePreferences) {
        const { preferredColors, preferredFonts, designStyle } = context.user.stylePreferences;
        if (preferredColors && preferredColors.length > 0) {
          userSection.push(`- Preferred colors: ${preferredColors.join(", ")}`);
        }
        if (preferredFonts) {
          userSection.push(`- Preferred fonts: ${preferredFonts.heading} (headings), ${preferredFonts.body} (body)`);
        }
        if (designStyle) {
          userSection.push(`- Design style preference: ${designStyle}`);
        }
      }

      if (context.user.interactionPatterns) {
        const { responseStyle, helpLevel } = context.user.interactionPatterns;
        userSection.push(`- User prefers ${responseStyle} responses`);
        userSection.push(`- Skill level: ${helpLevel}`);
      }

      if (userSection.length > 0) {
        sections.push(`## User Preferences\n${userSection.join("\n")}`);
      }
    }

    // Project context section
    if (context.project) {
      const projectSection: string[] = [];

      if (context.project.businessDetails) {
        const { name, type, description, targetAudience, goals } = context.project.businessDetails;
        if (name) projectSection.push(`- Business name: ${name}`);
        if (type) projectSection.push(`- Business type: ${type}`);
        if (description) projectSection.push(`- Description: ${description}`);
        if (targetAudience && targetAudience.length > 0) {
          projectSection.push(`- Target audience: ${targetAudience.join(", ")}`);
        }
        if (goals && goals.length > 0) {
          projectSection.push(`- Business goals: ${goals.join(", ")}`);
        }
      }

      if (context.project.discoveredInfo) {
        const { existingWebsite, socialLinks, contactInfo } = context.project.discoveredInfo;
        if (existingWebsite?.url) {
          projectSection.push(`- Existing website: ${existingWebsite.url}`);
        }
        if (socialLinks && Object.keys(socialLinks).length > 0) {
          const links = Object.entries(socialLinks)
            .map(([k, v]) => `${k}: ${v}`)
            .join(", ");
          projectSection.push(`- Social links: ${links}`);
        }
        if (contactInfo?.email) {
          projectSection.push(`- Contact email: ${contactInfo.email}`);
        }
      }

      if (context.project.siteGoals && context.project.siteGoals.length > 0) {
        const goals = context.project.siteGoals
          .filter((g) => g.status === "pending")
          .map((g) => `${g.goal} (${g.priority})`)
          .join(", ");
        if (goals) {
          projectSection.push(`- Site goals: ${goals}`);
        }
      }

      if (projectSection.length > 0) {
        sections.push(`## Project Context\n${projectSection.join("\n")}`);
      }
    }

    // Session state section
    if (context.session) {
      const sessionSection: string[] = [];

      if (context.session.currentTasks && context.session.currentTasks.length > 0) {
        const tasks = context.session.currentTasks
          .filter((t) => t.status !== "completed")
          .map((t) => `- [${t.status}] ${t.task}`)
          .join("\n");
        if (tasks) {
          sessionSection.push(`### Current Tasks\n${tasks}`);
        }
      }

      if (context.session.pendingQuestions && context.session.pendingQuestions.length > 0) {
        const questions = context.session.pendingQuestions
          .map((q) => `- ${q.question} (field: ${q.field}, required: ${q.required})`)
          .join("\n");
        sessionSection.push(`### Pending Questions (ASK BEFORE PROCEEDING)\n${questions}`);
      }

      if (context.session.wipState?.currentStep) {
        sessionSection.push(`### Current Step: ${context.session.wipState.currentStep}`);
      }

      if (sessionSection.length > 0) {
        sections.push(`## Session State\n${sessionSection.join("\n\n")}`);
      }
    }

    if (sections.length === 0) {
      return "";
    }

    return `\n# AI Memory Context\n\n${sections.join("\n\n")}`;
  }

  formatConversationForPrompt(messages: ChatMessageData[]): Array<{ role: "user" | "assistant"; content: string }> {
    return messages
      .filter((m) => m.role !== "SYSTEM")
      .map((m) => ({
        role: m.role === "USER" ? "user" as const : "assistant" as const,
        content: m.content,
      }));
  }
}
