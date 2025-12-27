"use client";

import { useState } from "react";
import { getAllBlocks, getBlock, type BlockType, type BlockVariant } from "@repo/templates";
import { BlockRenderer } from "@/components/renderer/block-renderer";
import { defaultTokens } from "@repo/templates";

// Get all blocks at module level
const allBlocks = getAllBlocks();

// Group blocks by category
const blocksByCategory = allBlocks.reduce((acc, block) => {
  const category = block.category;
  if (!acc[category]) acc[category] = [];
  acc[category].push(block);
  return acc;
}, {} as Record<string, BlockType[]>);

const categoryLabels: Record<string, { label: string; icon: string }> = {
  structural: { label: "Structural", icon: "🏗️" },
  hero: { label: "Hero Sections", icon: "🎯" },
  content: { label: "Content", icon: "📝" },
  social: { label: "Social Proof", icon: "⭐" },
  conversion: { label: "Conversion", icon: "🚀" },
  commerce: { label: "Commerce", icon: "🛒" },
  media: { label: "Media", icon: "🖼️" },
};

export default function BlockLibraryPage() {
  const [selectedBlock, setSelectedBlock] = useState<BlockType | null>(allBlocks[0] || null);
  const [selectedVariant, setSelectedVariant] = useState<string>(allBlocks[0]?.defaultVariant || "");
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const handleBlockSelect = (block: BlockType) => {
    setSelectedBlock(block);
    setSelectedVariant(block.defaultVariant);
  };

  const currentVariant = selectedBlock?.variants.find((v) => v.id === selectedVariant);

  // Generate sample content for preview
  const getSampleContent = (block: BlockType): Record<string, unknown> => {
    const samples: Record<string, Record<string, unknown>> = {
      header: {
        logo: { text: "BuilderAI" },
        navigation: [
          { text: "Features", url: "#" },
          { text: "Pricing", url: "#" },
          { text: "About", url: "#" },
        ],
        cta: { text: "Get Started", url: "#" },
      },
      hero: {
        title: "Build Stunning Websites in Minutes",
        subtitle: "AI-Powered",
        description: "Let AI create your perfect website. No coding required.",
        primaryCta: { text: "Start Free", url: "#" },
        secondaryCta: { text: "Watch Demo", url: "#" },
        image: "/api/placeholder/600/400",
      },
      features: {
        title: "Powerful Features",
        subtitle: "Everything you need",
        description: "Build better websites with our comprehensive toolkit.",
        features: [
          { title: "AI Content", description: "Generate content automatically", icon: "sparkles" },
          { title: "Fast Hosting", description: "Lightning-fast global CDN", icon: "bolt" },
          { title: "Analytics", description: "Track your visitors", icon: "chart" },
          { title: "SEO Tools", description: "Rank higher in search", icon: "search" },
        ],
      },
      testimonials: {
        title: "What Our Users Say",
        testimonials: [
          { quote: "BuilderAI saved me hours of work!", author: "Sarah Chen", role: "Founder, TechStartup", rating: 5 },
          { quote: "The AI suggestions are incredibly accurate.", author: "Mike Johnson", role: "Designer", rating: 5 },
          { quote: "Best website builder I've ever used.", author: "Emma Davis", role: "Marketing Director", rating: 5 },
        ],
      },
      cta: {
        title: "Ready to Get Started?",
        description: "Join thousands of businesses already using BuilderAI.",
        primaryCta: { text: "Start Free Trial", url: "#" },
        secondaryCta: { text: "Contact Sales", url: "#" },
      },
      contact: {
        title: "Get in Touch",
        description: "Have questions? We'd love to hear from you.",
        email: "hello@builderai.com",
        phone: "+1 (555) 123-4567",
        address: "123 Builder Street, San Francisco, CA",
      },
      footer: {
        logo: { text: "BuilderAI" },
        description: "AI-powered website builder for modern businesses.",
        copyright: "2024 BuilderAI. All rights reserved.",
        columns: [
          {
            title: "Product",
            links: [
              { text: "Features", url: "#" },
              { text: "Pricing", url: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { text: "About", url: "#" },
              { text: "Blog", url: "#" },
            ],
          },
        ],
        socialLinks: [
          { platform: "twitter", url: "#" },
          { platform: "linkedin", url: "#" },
        ],
      },
      menu: {
        title: "Our Menu",
        subtitle: "Fresh & Delicious",
        categories: [
          {
            name: "Appetizers",
            items: [
              { name: "Bruschetta", description: "Fresh tomatoes on crispy bread", price: "$8" },
              { name: "Soup of the Day", description: "Chef's daily selection", price: "$6" },
            ],
          },
          {
            name: "Main Courses",
            items: [
              { name: "Grilled Salmon", description: "With seasonal vegetables", price: "$24" },
              { name: "Beef Tenderloin", description: "8oz premium cut", price: "$32" },
            ],
          },
        ],
      },
      gallery: {
        title: "Our Work",
        subtitle: "Portfolio",
        images: [
          { src: "/api/placeholder/400/300", alt: "Project 1", caption: "Web Design" },
          { src: "/api/placeholder/400/300", alt: "Project 2", caption: "Branding" },
          { src: "/api/placeholder/400/300", alt: "Project 3", caption: "Development" },
          { src: "/api/placeholder/400/300", alt: "Project 4", caption: "Marketing" },
        ],
      },
      pricing: {
        title: "Simple Pricing",
        subtitle: "No hidden fees",
        plans: [
          { name: "Starter", price: "$9", period: "/month", features: ["1 Website", "Basic Analytics", "Email Support"], cta: { text: "Start Free", url: "#" } },
          { name: "Pro", price: "$29", period: "/month", features: ["5 Websites", "Advanced Analytics", "Priority Support", "Custom Domain"], cta: { text: "Get Pro", url: "#" }, highlighted: true },
          { name: "Enterprise", price: "$99", period: "/month", features: ["Unlimited Sites", "White Label", "Dedicated Support", "SLA"], cta: { text: "Contact Us", url: "#" } },
        ],
      },
      team: {
        title: "Meet Our Team",
        members: [
          { name: "Alex Johnson", role: "CEO & Founder", bio: "10+ years in tech" },
          { name: "Sarah Chen", role: "CTO", bio: "Former Google engineer" },
          { name: "Mike Brown", role: "Head of Design", bio: "Award-winning designer" },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        items: [
          { question: "How does AI website building work?", answer: "Our AI analyzes your business needs and generates a customized website with professional content and design." },
          { question: "Can I edit the AI-generated content?", answer: "Absolutely! You have full control to edit, customize, and refine any content the AI creates." },
          { question: "Is there a free trial?", answer: "Yes, we offer a 14-day free trial with full access to all features." },
        ],
      },
      stats: {
        title: "Our Impact",
        stats: [
          { value: "10K+", label: "Websites Built" },
          { value: "99.9%", label: "Uptime" },
          { value: "50+", label: "Countries" },
          { value: "4.9/5", label: "User Rating" },
        ],
      },
      newsletter: {
        title: "Stay Updated",
        description: "Get the latest tips and updates delivered to your inbox.",
        placeholder: "Enter your email",
        buttonText: "Subscribe",
      },
      "text-with-image": {
        title: "About Our Company",
        subtitle: "Our Story",
        content: "We started with a simple mission: make website building accessible to everyone. Today, we're proud to serve thousands of businesses worldwide.",
        image: "/api/placeholder/600/400",
        cta: { text: "Learn More", url: "#" },
      },
    };

    return samples[block.id] || {};
  };

  const previewWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">Block Library</h1>
            <p className="text-slate-400 text-sm">
              {allBlocks.length} blocks across {Object.keys(blocksByCategory).length} categories
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
            {(["desktop", "tablet", "mobile"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPreviewMode(mode)}
                className={`px-3 py-1.5 rounded text-sm transition ${
                  previewMode === mode ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Block List Sidebar */}
        <div className="w-72 border-r border-slate-800 overflow-y-auto flex-shrink-0">
          {Object.entries(blocksByCategory).map(([category, blocks]) => (
            <div key={category} className="border-b border-slate-800">
              <div className="px-4 py-3 bg-slate-800/50 sticky top-0">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <span>{categoryLabels[category]?.icon || "📦"}</span>
                  {categoryLabels[category]?.label || category}
                </span>
              </div>
              <div className="p-2 space-y-1">
                {blocks.map((block) => (
                  <button
                    key={block.id}
                    onClick={() => handleBlockSelect(block)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition ${
                      selectedBlock?.id === block.id
                        ? "bg-violet-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <p className="font-medium text-sm">{block.name}</p>
                    <p className={`text-xs mt-0.5 ${
                      selectedBlock?.id === block.id ? "text-violet-200" : "text-slate-500"
                    }`}>
                      {block.variants.length} variant{block.variants.length !== 1 ? "s" : ""}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Block Details & Preview */}
        {selectedBlock && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Block Info Header */}
            <div className="p-4 border-b border-slate-800 flex-shrink-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedBlock.name}</h2>
                  <p className="text-slate-400 text-sm mt-1">{selectedBlock.description}</p>
                </div>
                <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400">
                  {selectedBlock.category}
                </span>
              </div>

              {/* Variant Tabs */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {selectedBlock.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition ${
                      selectedVariant === variant.id
                        ? "bg-violet-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-auto bg-slate-950 p-6">
              <div
                className="mx-auto bg-white rounded-lg overflow-hidden shadow-2xl"
                style={{ width: previewWidths[previewMode], maxWidth: "100%" }}
              >
                <BlockRenderer
                  block={{
                    id: "preview",
                    blockType: selectedBlock.id,
                    variant: selectedVariant,
                    content: getSampleContent(selectedBlock),
                  }}
                />
              </div>
            </div>

            {/* Block Metadata Panel */}
            <div className="border-t border-slate-800 p-4 flex-shrink-0 bg-slate-900">
              <div className="grid grid-cols-3 gap-6 text-sm">
                <div>
                  <h4 className="text-slate-400 mb-2">AI Triggers</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBlock.aiHints.triggers.slice(0, 5).map((trigger) => (
                      <span key={trigger} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">
                        {trigger}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-slate-400 mb-2">Use Cases</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedBlock.aiHints.useCases.slice(0, 3).map((useCase) => (
                      <span key={useCase} className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-slate-400 mb-2">Schema Fields</h4>
                  <p className="text-slate-300">
                    {selectedBlock.schema.fields.length} fields
                    {selectedBlock.schema.fields.filter(f => f.required).length > 0 && (
                      <span className="text-slate-500">
                        {" "}({selectedBlock.schema.fields.filter(f => f.required).length} required)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
