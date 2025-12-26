"use client";

import { useState, useEffect } from "react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { AICommandBar } from "@/components/dashboard/ai-command-bar";
import { useParams } from "next/navigation";

type Project = {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  primaryColor: string;
  secondaryColor: string;
};

export default function ProjectDashboard() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [aiMessages, setAiMessages] = useState<Array<{role: string; content: string}>>([
    { role: "assistant", content: "Hey! I'm your AI webmaster. What would you like me to do today?" }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  useEffect(() => {
    // Fetch project data
    fetch(`/api/projects/${params.id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(console.error);
  }, [params.id]);

  const handleAiCommand = async (command: string) => {
    setAiMessages(prev => [...prev, { role: "user", content: command }]);
    setIsAiThinking(true);

    try {
      const res = await fetch("/api/ai/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: params.id,
          command,
          history: aiMessages
        }),
      });

      const data = await res.json();
      setAiMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setAiMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Let me try again..."
      }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const cards = [
    {
      id: "website",
      title: "Website",
      icon: "🌐",
      status: "Live",
      statusColor: "green",
      metric: "Edit Site",
      href: `/projects/${params.id}`,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "seo",
      title: "SEO",
      icon: "📈",
      status: "Score: 72",
      statusColor: "yellow",
      metric: "5 tasks",
      href: `/projects/${params.id}/seo`,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "domain",
      title: "Domain",
      icon: "🔗",
      status: "Setup",
      statusColor: "gray",
      metric: "Connect →",
      href: `/projects/${params.id}/domain`,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "blog",
      title: "Blog",
      icon: "📝",
      status: "0 posts",
      statusColor: "gray",
      metric: "Create →",
      href: `/projects/${params.id}/blog`,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "shop",
      title: "Shop",
      icon: "🛒",
      status: "Coming Soon",
      statusColor: "gray",
      metric: "Setup →",
      href: `/projects/${params.id}/shop`,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      id: "social",
      title: "Social",
      icon: "📱",
      status: "Not connected",
      statusColor: "gray",
      metric: "Connect →",
      href: `/projects/${params.id}/social`,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: "📊",
      status: "0 views",
      statusColor: "gray",
      metric: "Coming Soon",
      href: `/projects/${params.id}/analytics`,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: "email",
      title: "Email",
      icon: "✉️",
      status: "Not setup",
      statusColor: "gray",
      metric: "Setup →",
      href: `/projects/${params.id}/email`,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "ai-tasks",
      title: "AI Tasks",
      icon: "🤖",
      status: "Idle",
      statusColor: "blue",
      metric: "0 running",
      href: `/projects/${params.id}/ai-tasks`,
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${project?.primaryColor || '#6366f1'}, ${project?.secondaryColor || '#8b5cf6'})`
              }}
            >
              {project?.businessName?.charAt(0) || "B"}
            </div>
            <div>
              <h1 className="font-bold text-lg">{project?.businessName || "Loading..."}</h1>
              <p className="text-sm text-gray-400">{project?.businessType || "Website"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm">
              Preview Site
            </button>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition text-sm font-medium">
              Publish
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 pb-32">
        {/* Welcome section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Command Center</h2>
          <p className="text-gray-400">Manage your entire web presence from one place</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <DashboardCard key={card.id} {...card} />
          ))}
        </div>
      </main>

      {/* AI Command Bar - Fixed at bottom */}
      <AICommandBar
        messages={aiMessages}
        onSendCommand={handleAiCommand}
        isThinking={isAiThinking}
        projectName={project?.businessName || "your site"}
      />
    </div>
  );
}
