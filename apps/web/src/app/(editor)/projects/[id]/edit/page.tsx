"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { SitePreview } from "@/components/preview/site-preview";
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Tablet,
  Send,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  Loader2,
} from "lucide-react";
import type { BlockInstance } from "@repo/templates";
import type { DesignTokens } from "@repo/templates";

type PageData = {
  id: string;
  name: string;
  slug: string;
  content: {
    blocks?: BlockInstance[];
    sections?: unknown[];
  };
};

type SiteData = {
  id: string;
  title: string;
  description: string;
  content: {
    blocks?: BlockInstance[];
    meta?: { title: string; description: string };
  };
  styles: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  pages?: PageData[];
};

type ProjectData = {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  primaryColor: string;
  secondaryColor: string;
  sites: SiteData[];
};

type ViewportSize = "desktop" | "tablet" | "mobile";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function SiteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [site, setSite] = useState<SiteData | null>(null);
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! I'm your AI web designer. Tell me what you'd like to change - I can update headlines, swap layouts, add sections, adjust colors, and more. What would you like to improve?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (!res.ok) throw new Error("Failed to load project");

        const projectData = await res.json();
        setProject(projectData);

        if (projectData.sites && projectData.sites.length > 0) {
          const siteData = projectData.sites[0];
          setSite(siteData);

          // Extract blocks
          let extractedBlocks: BlockInstance[] = [];
          if (siteData.content?.blocks && siteData.content.blocks.length > 0) {
            extractedBlocks = siteData.content.blocks;
          } else if (siteData.pages && siteData.pages.length > 0) {
            const pageContent = siteData.pages[0].content;
            if (pageContent?.blocks && pageContent.blocks.length > 0) {
              extractedBlocks = pageContent.blocks;
            }
          }
          setBlocks(extractedBlocks);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [params.id]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isAiThinking) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsAiThinking(true);

    try {
      // TODO: Connect to AI command API
      const res = await fetch("/api/ai/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: params.id,
          command: userMessage.content,
          context: {
            selectedBlockId,
            currentBlocks: blocks.map((b) => ({
              id: b.id,
              blockType: b.blockType,
              variant: b.variant,
            })),
          },
        }),
      });

      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.response || "I've made the changes you requested.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // If the API returns updated blocks, update the preview
      if (data.blocks) {
        setBlocks(data.blocks);
      }
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: "Sorry, I encountered an error. Let me try again...",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const viewportClasses: Record<ViewportSize, string> = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  };

  const designTokens: Partial<DesignTokens> = {
    colors: {
      primary: project?.primaryColor || "#2563eb",
      secondary: project?.secondaryColor || "#1e293b",
      accent: "#8b5cf6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: {
        primary: "#0f172a",
        secondary: "#475569",
        muted: "#94a3b8",
        inverse: "#ffffff",
      },
      border: "#e2e8f0",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your website...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-semibold mb-2">Failed to load</h2>
          <p className="text-muted-foreground mb-4">{error || "Project not found"}</p>
          <button
            onClick={() => router.push("/projects")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚧</div>
          <h2 className="text-xl font-semibold mb-2">No content generated yet</h2>
          <p className="text-muted-foreground mb-4">
            Your website doesn&apos;t have any content blocks yet.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push(`/projects/${params.id}/dashboard`)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
            >
              Back to Dashboard
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#e8e6e3] flex flex-col overflow-hidden">
      {/* Editor Toolbar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/projects/${params.id}/dashboard`)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
            title={isPanelOpen ? "Hide AI panel" : "Show AI panel"}
          >
            {isPanelOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
          <div>
            <h1 className="font-semibold">{project.businessName || project.name}</h1>
            <p className="text-xs text-muted-foreground">
              {blocks.length} blocks • {site?.title || "Untitled"}
            </p>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setViewportSize("desktop")}
            className={`p-2 rounded ${viewportSize === "desktop" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            title="Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportSize("tablet")}
            className={`p-2 rounded ${viewportSize === "tablet" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            title="Tablet"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewportSize("mobile")}
            className={`p-2 rounded ${viewportSize === "mobile" ? "bg-white shadow-sm" : "hover:bg-slate-200"}`}
            title="Mobile"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Publish Button */}
        <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition text-sm font-medium">
          Publish
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* AI Chat Panel */}
        <div
          className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ${
            isPanelOpen ? "w-80" : "w-0"
          } flex-shrink-0`}
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">AI Designer</h2>
                <p className="text-xs text-muted-foreground">Always ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isAiThinking && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selected Block Indicator */}
          {selectedBlockId && (
            <div className="px-4 py-2 bg-violet-50 border-t border-violet-100 flex-shrink-0">
              <p className="text-xs text-violet-700">
                <span className="font-medium">Focus:</span>{" "}
                {blocks.find((b) => b.id === selectedBlockId)?.blockType || "Block"} selected
              </p>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-slate-100 flex-shrink-0">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me what to change..."
                rows={1}
                className="flex-1 resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                style={{ minHeight: "44px", maxHeight: "120px" }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isAiThinking}
                className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isAiThinking ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Tip: Click a block in the preview to focus your request
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 min-h-0 overflow-hidden p-4 sm:p-6 flex justify-center items-start bg-[#e8e6e3]">
          <div
            className={`bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-300 h-full ${viewportClasses[viewportSize]}`}
          >
            <div className="overflow-auto h-full">
              <SitePreview
                blocks={blocks}
                tokens={designTokens}
                businessName={project.businessName}
                isEditing={true}
                onSelectBlock={setSelectedBlockId}
                selectedBlockId={selectedBlockId || undefined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
