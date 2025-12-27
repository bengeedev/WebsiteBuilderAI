import { prisma, Prisma } from "@repo/database";
import type {
  SessionMemoryData,
  SessionTask,
  SessionTaskStatus,
  PendingQuestion,
  WIPState,
  ChatMessageData,
  MessageRole,
} from "./types";

const DEFAULT_SESSION_MEMORY: SessionMemoryData = {
  currentTasks: [],
  pendingQuestions: [],
  wipState: {},
};

export class SessionMemoryService {
  private projectId: string;
  private userId: string;
  private sessionId: string | null = null;

  constructor(projectId: string, userId: string) {
    this.projectId = projectId;
    this.userId = userId;
  }

  async getOrCreateSession(): Promise<string> {
    if (this.sessionId) {
      return this.sessionId;
    }

    // Look for an active session
    const existing = await prisma.chatSession.findFirst({
      where: {
        projectId: this.projectId,
        userId: this.userId,
        status: "ACTIVE",
      },
      orderBy: { lastActivityAt: "desc" },
    });

    if (existing) {
      this.sessionId = existing.id;
      // Update last activity
      await prisma.chatSession.update({
        where: { id: existing.id },
        data: { lastActivityAt: new Date() },
      });
      return existing.id;
    }

    // Create new session
    const session = await prisma.chatSession.create({
      data: {
        projectId: this.projectId,
        userId: this.userId,
        status: "ACTIVE",
        currentTasks: [],
        pendingQuestions: [],
        wipState: {},
      },
    });

    this.sessionId = session.id;
    return session.id;
  }

  async getSessionData(): Promise<SessionMemoryData> {
    const sessionId = await this.getOrCreateSession();
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return DEFAULT_SESSION_MEMORY;
    }

    return {
      currentTasks: (session.currentTasks as SessionTask[]) ?? [],
      pendingQuestions: (session.pendingQuestions as PendingQuestion[]) ?? [],
      wipState: (session.wipState as WIPState) ?? {},
    };
  }

  // --- Conversation History ---

  async getConversationHistory(limit = 20): Promise<ChatMessageData[]> {
    const sessionId = await this.getOrCreateSession();

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return messages
      .reverse()
      .map((m) => ({
        role: m.role as MessageRole,
        content: m.content,
        toolCalls: m.toolCalls as unknown[],
        actions: m.actions as unknown[],
        tokens: m.tokens ?? undefined,
      }));
  }

  async addMessage(
    role: MessageRole,
    content: string,
    metadata?: { toolCalls?: unknown[]; actions?: unknown[]; tokens?: number }
  ): Promise<void> {
    const sessionId = await this.getOrCreateSession();

    await prisma.chatMessage.create({
      data: {
        sessionId,
        role,
        content,
        toolCalls: (metadata?.toolCalls ?? []) as Prisma.InputJsonValue,
        actions: (metadata?.actions ?? []) as Prisma.InputJsonValue,
        tokens: metadata?.tokens,
      },
    });

    // Update last activity
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { lastActivityAt: new Date() },
    });
  }

  // --- Task Management ---

  async getTasks(): Promise<SessionTask[]> {
    const data = await this.getSessionData();
    return data.currentTasks;
  }

  async addTask(task: string, priority = 1): Promise<SessionTask> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const newTask: SessionTask = {
      id: crypto.randomUUID(),
      task,
      status: "pending",
      priority,
      createdAt: new Date().toISOString(),
    };

    const tasks = [...current.currentTasks, newTask].sort((a, b) => b.priority - a.priority);

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { currentTasks: tasks },
    });

    return newTask;
  }

  async updateTaskStatus(taskId: string, status: SessionTaskStatus): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const tasks = current.currentTasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status,
            completedAt: status === "completed" ? new Date().toISOString() : t.completedAt,
          }
        : t
    );

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { currentTasks: tasks },
    });
  }

  async removeTask(taskId: string): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const tasks = current.currentTasks.filter((t) => t.id !== taskId);

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { currentTasks: tasks },
    });
  }

  async clearCompletedTasks(): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const tasks = current.currentTasks.filter((t) => t.status !== "completed");

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { currentTasks: tasks },
    });
  }

  // --- Pending Questions ---

  async getPendingQuestions(): Promise<PendingQuestion[]> {
    const data = await this.getSessionData();
    return data.pendingQuestions;
  }

  async addPendingQuestion(question: Omit<PendingQuestion, "id">): Promise<PendingQuestion> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const newQuestion: PendingQuestion = {
      ...question,
      id: crypto.randomUUID(),
    };

    // Don't add duplicate questions for the same field
    const existing = current.pendingQuestions.find((q) => q.field === question.field);
    if (existing) {
      return existing;
    }

    const questions = [...current.pendingQuestions, newQuestion];

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { pendingQuestions: questions },
    });

    return newQuestion;
  }

  async resolvePendingQuestion(questionId: string): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const questions = current.pendingQuestions.filter((q) => q.id !== questionId);

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { pendingQuestions: questions },
    });
  }

  async resolveQuestionByField(field: string): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const questions = current.pendingQuestions.filter((q) => q.field !== field);

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { pendingQuestions: questions },
    });
  }

  // --- WIP State ---

  async getWIPState(): Promise<WIPState> {
    const data = await this.getSessionData();
    return data.wipState;
  }

  async setWIPState(state: Partial<WIPState>): Promise<void> {
    const sessionId = await this.getOrCreateSession();
    const current = await this.getSessionData();

    const updated = { ...current.wipState, ...state };

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { wipState: updated as Prisma.InputJsonValue },
    });
  }

  async clearWIPState(): Promise<void> {
    const sessionId = await this.getOrCreateSession();

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { wipState: {} },
    });
  }

  // --- Session Management ---

  async pauseSession(): Promise<void> {
    const sessionId = await this.getOrCreateSession();

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: "PAUSED" },
    });

    this.sessionId = null;
  }

  async completeSession(): Promise<void> {
    const sessionId = await this.getOrCreateSession();

    await prisma.chatSession.update({
      where: { id: sessionId },
      data: { status: "COMPLETED" },
    });

    this.sessionId = null;
  }

  async resumeSession(sessionId: string): Promise<void> {
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        status: "ACTIVE",
        lastActivityAt: new Date(),
      },
    });

    this.sessionId = sessionId;
  }

  async listSessions(status?: "ACTIVE" | "PAUSED" | "COMPLETED"): Promise<
    Array<{
      id: string;
      status: string;
      lastActivityAt: Date;
      messageCount: number;
    }>
  > {
    const sessions = await prisma.chatSession.findMany({
      where: {
        projectId: this.projectId,
        userId: this.userId,
        ...(status && { status }),
      },
      orderBy: { lastActivityAt: "desc" },
      include: {
        _count: {
          select: { messages: true },
        },
      },
    });

    return sessions.map((s) => ({
      id: s.id,
      status: s.status,
      lastActivityAt: s.lastActivityAt,
      messageCount: s._count.messages,
    }));
  }
}
