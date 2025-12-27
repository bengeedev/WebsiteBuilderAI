"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";
import {
  Globe,
  Smartphone,
  Link,
  Mail,
  Check,
  X,
  UtensilsCrossed,
  Palette,
  Briefcase,
  ShoppingBag,
  PenLine,
  Dumbbell,
  CircleDot,
  Pencil,
  Rocket,
  Sparkles,
  RotateCcw,
  Lightbulb,
  Search,
  User,
} from "lucide-react";

type Message = {
  id: string;
  role: "ai" | "user";
  content: string;
  displayedContent?: string;
  options?: Option[];
  input?: InputConfig;
  isTyping?: boolean;
  isRevealing?: boolean;
  revealedOptions?: number;
};

type BusinessUnderstanding = {
  businessName: string;
  summary: string;
  suggestedType: string;
  confidence: "high" | "medium" | "low";
  keyInsights: string[];
  suggestedTagline?: string;
};

type Option = {
  id: string;
  label: string;
  value: string;
  icon?: ReactNode;
  description?: string;
};

type InputConfig = {
  type: "text" | "textarea" | "color";
  placeholder?: string;
  field: keyof OnboardingData;
};

const businessTypeOptions: Option[] = [
  { id: "restaurant", label: "Restaurant & Food", value: "restaurant", icon: <UtensilsCrossed className="w-6 h-6" />, description: "Restaurants, cafes, food trucks" },
  { id: "portfolio", label: "Portfolio & Creative", value: "portfolio", icon: <Palette className="w-6 h-6" />, description: "Artists, designers, photographers" },
  { id: "business", label: "Business & Services", value: "business", icon: <Briefcase className="w-6 h-6" />, description: "Consulting, agencies, services" },
  { id: "ecommerce", label: "E-commerce & Shop", value: "ecommerce", icon: <ShoppingBag className="w-6 h-6" />, description: "Online stores, products" },
  { id: "blog", label: "Blog & Content", value: "blog", icon: <PenLine className="w-6 h-6" />, description: "Blogs, news, content creators" },
  { id: "fitness", label: "Fitness & Health", value: "fitness", icon: <Dumbbell className="w-6 h-6" />, description: "Gyms, trainers, wellness" },
];

const yesNoOptions: Option[] = [
  { id: "yes", label: "Yes", value: "yes", icon: <Check className="w-5 h-5 text-green-500" /> },
  { id: "no", label: "No", value: "no", icon: <X className="w-5 h-5 text-red-500" /> },
];

// Discovery questions in order
const discoveryQuestions: Array<{ key: string; question: string; icon: ReactNode }> = [
  { key: "website", question: "Do you have an existing website you'd like me to analyze and improve?", icon: <Globe className="w-5 h-5 inline-block mr-2" /> },
  { key: "social", question: "Do you have social media accounts for your business?", icon: <Smartphone className="w-5 h-5 inline-block mr-2" /> },
  { key: "domain", question: "Do you already own a domain name?", icon: <Link className="w-5 h-5 inline-block mr-2" /> },
  { key: "email", question: "Do you have a business email address?", icon: <Mail className="w-5 h-5 inline-block mr-2" /> },
];

const colorPresetOptions: Option[] = [
  { id: "blue-pro", label: "Professional Blue", value: "#2563eb,#1e293b", icon: <CircleDot className="w-6 h-6 text-blue-500 fill-blue-500" /> },
  { id: "purple-creative", label: "Creative Purple", value: "#7c3aed,#1f2937", icon: <CircleDot className="w-6 h-6 text-purple-500 fill-purple-500" /> },
  { id: "green-nature", label: "Nature Green", value: "#059669,#064e3b", icon: <CircleDot className="w-6 h-6 text-emerald-500 fill-emerald-500" /> },
  { id: "red-bold", label: "Bold Red", value: "#dc2626,#1f2937", icon: <CircleDot className="w-6 h-6 text-red-500 fill-red-500" /> },
  { id: "orange-warm", label: "Warm Orange", value: "#ea580c,#292524", icon: <CircleDot className="w-6 h-6 text-orange-500 fill-orange-500" /> },
  { id: "pink-playful", label: "Playful Pink", value: "#db2777,#1f2937", icon: <CircleDot className="w-6 h-6 text-pink-500 fill-pink-500" /> },
];

// Helper to get pipeline defaults for a business type
async function getPipelineDefaults(businessType: string): Promise<{
  primaryColor: string;
  secondaryColor: string;
  headingFont: string;
  bodyFont: string;
} | null> {
  try {
    const res = await fetch("/api/pipeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "get_defaults",
        data: { businessType },
      }),
    });
    if (res.ok) {
      return res.json();
    }
  } catch (e) {
    console.error("Failed to get pipeline defaults:", e);
  }
  return null;
}

type Props = {
  initialData: OnboardingData;
  onComplete: (data: OnboardingData) => void;
};

export function ConversationalWizard({ initialData, onComplete }: Props) {
  const router = useRouter();
  const [data, setData] = useState<OnboardingData>(initialData);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(-1); // -1 = discovery, 0+ = regular flow
  const [discoveryMode, setDiscoveryMode] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [discoveryQuestionIndex, setDiscoveryQuestionIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [aiUnderstanding, setAiUnderstanding] = useState<BusinessUnderstanding | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const revealText = useCallback((messageId: string, fullContent: string, options?: Option[], input?: InputConfig) => {
    let charIndex = 0;
    const speed = 20; // ms per character

    const typeInterval = setInterval(() => {
      charIndex++;
      setMessages(prev => prev.map(m =>
        m.id === messageId
          ? { ...m, displayedContent: fullContent.slice(0, charIndex) }
          : m
      ));

      if (charIndex >= fullContent.length) {
        clearInterval(typeInterval);
        // Mark as done revealing text, start revealing options
        setMessages(prev => prev.map(m =>
          m.id === messageId
            ? { ...m, isRevealing: false, revealedOptions: 0 }
            : m
        ));

        // Reveal options one by one
        if (options && options.length > 0) {
          let optionIndex = 0;
          const optionInterval = setInterval(() => {
            optionIndex++;
            setMessages(prev => prev.map(m =>
              m.id === messageId
                ? { ...m, revealedOptions: optionIndex }
                : m
            ));
            if (optionIndex >= options.length) {
              clearInterval(optionInterval);
            }
          }, 150); // 150ms between each option
        }
      }
    }, speed);
  }, []);

  // Start the conversation (only once)
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      const firstQuestion = discoveryQuestions[0];
      const welcomeContent = `Hey! I'm your AI website builder. Let me learn a bit about you first.\n\n${firstQuestion.question}`;
      setDiscoveryMode("ask-" + firstQuestion.key);
      setMessages([{
        id: "welcome",
        role: "ai",
        content: welcomeContent,
        displayedContent: "",
        options: yesNoOptions,
        isRevealing: true,
        revealedOptions: 0,
      }]);
      // Start revealing the welcome message
      setTimeout(() => revealText("welcome", welcomeContent, yesNoOptions), 300);
    }
  }, [hasStarted, revealText]);

  const addAIMessage = useCallback((content: string, options?: Option[], input?: InputConfig) => {
    const id = `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Show typing indicator
    setMessages(prev => {
      // Prevent duplicate typing indicators
      if (prev.some(m => m.isTyping)) return prev;
      return [...prev, { id: id + "-typing", role: "ai", content: "", isTyping: true }];
    });

    // Then show actual message after delay
    setTimeout(() => {
      setMessages(prev => {
        // Remove typing indicator and add real message
        const filtered = prev.filter(m => !m.isTyping);
        // Prevent duplicate messages with same content
        if (filtered.some(m => m.content === content && m.role === "ai")) return filtered;
        return [...filtered, {
          id,
          role: "ai",
          content,
          displayedContent: "",
          options,
          input,
          isRevealing: true,
          revealedOptions: 0
        }];
      });
      // Start revealing text
      setTimeout(() => revealText(id, content, options, input), 50);
    }, 600);
  }, [revealText]);

  const addUserMessage = (content: string) => {
    const id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages(prev => {
      // Prevent duplicate user messages
      const lastUserMsg = [...prev].reverse().find(m => m.role === "user");
      if (lastUserMsg?.content === content) return prev;
      return [...prev, { id, role: "user", content }];
    });
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  // Move to the next discovery question or finish discovery
  const moveToNextDiscoveryQuestion = useCallback(() => {
    const nextIndex = discoveryQuestionIndex + 1;

    if (nextIndex >= discoveryQuestions.length) {
      // All discovery questions done
      setDiscoveryMode(null);

      if (data.businessType) {
        // Business type already set from website analysis
        setStep(1);
        setTimeout(() => {
          const nameFromData = aiUnderstanding?.businessName || data.businessName;
          if (nameFromData) {
            addAIMessage(
              `Perfect! Now let's confirm your details.\n\nI've got you as "${nameFromData}".\n\nIs this correct?`,
              [
                { id: "keep-name", label: `Keep "${nameFromData}"`, value: "keep", icon: <Check className="w-5 h-5 text-green-500" /> },
                { id: "change-name", label: "Use a different name", value: "change", icon: <Pencil className="w-5 h-5" /> },
              ]
            );
          } else {
            addAIMessage(
              `Perfect! Now let's build your site.\n\nWhat's the name of your business?`,
              undefined,
              { type: "text", placeholder: "e.g., Mario's Italian Kitchen", field: "businessName" }
            );
          }
        }, 300);
      } else {
        // Need to ask for business type
        setStep(0);
        setTimeout(() => {
          addAIMessage(
            "Great! Now I have a better picture.\n\nWhat type of website are you building?",
            businessTypeOptions
          );
        }, 300);
      }
    } else {
      // Ask the next discovery question
      setDiscoveryQuestionIndex(nextIndex);
      const nextQuestion = discoveryQuestions[nextIndex];
      setDiscoveryMode("ask-" + nextQuestion.key);
      setTimeout(() => {
        addAIMessage(
          nextQuestion.question,
          yesNoOptions
        );
      }, 300);
    }
  }, [discoveryQuestionIndex, data.businessType, data.businessName, aiUnderstanding, addAIMessage]);

  // Handle yes/no answer to discovery questions
  const handleDiscoveryYesNo = useCallback((answer: "yes" | "no") => {
    const currentQuestion = discoveryQuestions[discoveryQuestionIndex];

    if (answer === "no") {
      addUserMessage("No");
      moveToNextDiscoveryQuestion();
    } else {
      addUserMessage("Yes");
      // Switch to input mode for this question
      setDiscoveryMode(currentQuestion.key);

      setTimeout(() => {
        switch (currentQuestion.key) {
          case "website":
            addAIMessage(
              "Great! I'll analyze your website and extract your branding, content, and style.\n\nWhat's your website URL?",
              undefined,
              { type: "text", placeholder: "https://www.example.com", field: "businessName" }
            );
            break;
          case "social":
            addAIMessage(
              "Nice! What's your main social media handle?\n\n(Instagram, Facebook, LinkedIn, or Twitter)",
              undefined,
              { type: "text", placeholder: "@yourbusiness or facebook.com/yourbusiness", field: "businessName" }
            );
            break;
          case "domain":
            addAIMessage(
              "What's your domain name?",
              undefined,
              { type: "text", placeholder: "yourbusiness.com", field: "businessName" }
            );
            break;
          case "email":
            addAIMessage(
              "What's your business email?",
              undefined,
              { type: "text", placeholder: "hello@yourbusiness.com", field: "businessName" }
            );
            break;
        }
      }, 300);
    }
  }, [discoveryQuestionIndex, addUserMessage, addAIMessage, moveToNextDiscoveryQuestion]);


  const handleDiscoveryInput = async () => {
    if (!currentInput.trim()) return;
    const value = currentInput.trim();
    setCurrentInput("");
    addUserMessage(value);

    if (discoveryMode === "website") {
      updateData({ existingWebsite: value });
      setIsAnalyzing(true);

      // Show analyzing message
      addAIMessage("Analyzing your website... Give me a moment to understand your business.");

      try {
        // Call API to scrape website
        const scrapeRes = await fetch("/api/ai/analyze-website", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: value }),
        });

        if (!scrapeRes.ok) throw new Error("Scrape failed");

        const scraped = await scrapeRes.json();
        updateData({
          scrapedData: scraped,
          businessName: scraped.title || "",
          businessDescription: scraped.description || "",
        });

        // Now call AI to understand the business
        const understandRes = await fetch("/api/ai/understand-business", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scrapedData: scraped }),
        });

        if (understandRes.ok) {
          const understanding = await understandRes.json() as BusinessUnderstanding;
          setAiUnderstanding(understanding);

          // Update data with AI's understanding
          updateData({
            businessName: understanding.businessName || scraped.title || "",
            businessDescription: scraped.description || "",
            businessTagline: understanding.suggestedTagline || "",
          });

          // Build insights string
          const insights = understanding.keyInsights?.filter(Boolean).slice(0, 3) || [];
          const insightsText = insights.length > 0
            ? `\n\nI also noticed:\n${insights.map(i => `• ${i}`).join("\n")}`
            : "";

          // Show what AI understood
          addAIMessage(
            `Got it! Here's what I learned about your business:\n\n` +
            `${understanding.summary}${insightsText}`
          );

          // Find the suggested type label
          const suggestedType = businessTypeOptions.find(t => t.value === understanding.suggestedType);
          const confidenceText = understanding.confidence === "high" ? "(high confidence)" : understanding.confidence === "medium" ? "(I think)" : "";

          // After a delay, ask for confirmation of business type
          setTimeout(() => {
            if (suggestedType && understanding.confidence !== "low") {
              addAIMessage(
                `Based on your website, I think you're building a **${suggestedType.label}** website ${confidenceText}\n\nIs that right?`,
                [
                  { id: "confirm-type", label: `Yes, that's right!`, value: "confirm", icon: <Check className="w-5 h-5 text-green-500" /> },
                  { id: "change-type", label: "No, let me choose", value: "choose", icon: <RotateCcw className="w-5 h-5" /> },
                ]
              );
              setDiscoveryMode("confirm-type");
            } else {
              // Low confidence - ask them to choose
              addAIMessage(
                "I couldn't quite determine your website type. What kind of site are you building?",
                businessTypeOptions
              );
              setDiscoveryMode(null);
              setStep(0);
            }
          }, 1500);
        } else {
          // AI understanding failed, but we have scraped data - show basic info
          addAIMessage(
            `Found your website!\n\n` +
            `**${scraped.title || 'Your Website'}**\n` +
            `${scraped.description ? `"${scraped.description.substring(0, 100)}..."` : ''}`
          );
          setTimeout(() => moveToNextDiscoveryQuestion(), 1200);
        }
      } catch {
        addAIMessage("I couldn't fully analyze that URL, but no worries! Let's continue.");
        setTimeout(() => moveToNextDiscoveryQuestion(), 800);
      } finally {
        setIsAnalyzing(false);
      }
    } else if (discoveryMode === "social") {
      updateData({ existingSocials: { instagram: value } });
      addAIMessage(`Got it! Noted: ${value}`);
      setTimeout(() => moveToNextDiscoveryQuestion(), 800);
    } else if (discoveryMode === "domain") {
      updateData({ existingDomain: value });
      addAIMessage(`Perfect! Domain saved: ${value}`);
      setTimeout(() => moveToNextDiscoveryQuestion(), 800);
    } else if (discoveryMode === "email") {
      updateData({ existingEmail: value });
      addAIMessage(`Great! Email noted: ${value}`);
      setTimeout(() => moveToNextDiscoveryQuestion(), 800);
    }
  };

  const handleEmailCheck = (option: Option) => {
    addUserMessage(option.icon ? `${option.icon} ${option.label}` : option.label);

    if (option.value === "yes") {
      setDiscoveryMode("email-input");
      setTimeout(() => {
        addAIMessage(
          "What's your business email?",
          undefined,
          { type: "text", placeholder: "hello@yourbusiness.com", field: "businessName" }
        );
      }, 300);
    } else {
      setStep(0);
      setTimeout(() => {
        addAIMessage(
          "No problem! Let's continue.\n\nWhat type of website are you building?",
          businessTypeOptions
        );
      }, 300);
    }
  };

  const handleOptionSelect = async (option: Option) => {
    addUserMessage(option.icon ? `${option.icon} ${option.label}` : option.label);

    switch (step) {
      case 0: // Business type selected
        updateData({ businessType: option.value });

        // Fetch pipeline defaults for this business type
        const defaults = await getPipelineDefaults(option.value);
        if (defaults) {
          updateData({
            primaryColor: defaults.primaryColor,
            secondaryColor: defaults.secondaryColor,
            headingFont: defaults.headingFont,
            bodyFont: defaults.bodyFont,
          });
          console.log("[Pipeline] Applied defaults for", option.value, defaults);
        }

        setStep(1);
        setTimeout(() => {
          const nameFromScrape = data.scrapedData?.title || data.businessName;
          if (nameFromScrape) {
            addAIMessage(
              `Great choice! I see you're "${nameFromScrape}".\n\nIs this correct, or would you like to use a different name?`,
              [
                { id: "keep-name", label: `Keep "${nameFromScrape}"`, value: "keep", icon: <Check className="w-5 h-5 text-green-500" /> },
                { id: "change-name", label: "Use a different name", value: "change", icon: <Pencil className="w-5 h-5" /> },
              ]
            );
          } else {
            addAIMessage(
              `Great choice! ${option.label} websites are one of my specialties.\n\nWhat's the name of your business?`,
              undefined,
              { type: "text", placeholder: "e.g., Mario's Italian Kitchen", field: "businessName" }
            );
          }
        }, 300);
        break;

      case 3: // Color selected
        const [primary, secondary] = option.value.split(",");
        updateData({ primaryColor: primary, secondaryColor: secondary });
        setStep(4);
        setTimeout(() => {
          generateTaglineSuggestions();
        }, 300);
        break;
    }
  };

  const handleInputSubmit = async () => {
    if (!currentInput.trim()) return;

    const value = currentInput.trim();
    setCurrentInput("");

    switch (step) {
      case 1: // Business name entered
        addUserMessage(value);
        updateData({ businessName: value });
        setStep(2);
        setTimeout(() => {
          addAIMessage(
            `"${value}" - love it! \n\nNow, tell me a bit about what makes your business special. What do you do and who do you serve?`,
            undefined,
            { type: "textarea", placeholder: "We're a family-owned bakery specializing in artisan sourdough...", field: "businessDescription" }
          );
        }, 300);
        break;

      case 2: // Description entered
        addUserMessage(value.length > 100 ? value.substring(0, 100) + "..." : value);
        updateData({ businessDescription: value });
        setStep(3);
        setTimeout(() => {
          // Build color options with recommended first
          let colorOptions = [...colorPresetOptions];
          if (data.primaryColor) {
            // Find if current color matches a preset
            const matchingPreset = colorPresetOptions.find(
              (c) => c.value.startsWith(data.primaryColor!)
            );
            if (matchingPreset) {
              // Move matching preset to first and mark as recommended
              colorOptions = [
                { ...matchingPreset, label: `${matchingPreset.label} (Recommended)` },
                ...colorPresetOptions.filter((c) => c.id !== matchingPreset.id),
              ];
            }
          }

          addAIMessage(
            `Perfect! I'm getting a great picture of your business. \n\nNow let's pick your brand colors. Which vibe fits "${data.businessName || 'your business'}" best?`,
            colorOptions
          );
        }, 300);
        break;

      case 4: // Tagline confirmed or custom entered
        addUserMessage(value);
        updateData({ businessTagline: value });
        setStep(5);
        setTimeout(() => {
          showFinalPreview();
        }, 300);
        break;
    }
  };

  const generateTaglineSuggestions = async () => {
    addAIMessage("Based on everything you've told me, here are some tagline ideas for your website...", undefined);

    setIsGenerating(true);

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "tagline",
          currentValue: "",
          businessContext: {
            type: data.businessType,
            name: data.businessName,
            description: data.businessDescription,
          },
        }),
      });

      if (res.ok) {
        const result = await res.json();
        const taglineOptions: Option[] = (result.suggestions || []).map((s: string, i: number) => ({
          id: `tagline-${i}`,
          label: s,
          value: s,
        }));

        // Add custom option
        taglineOptions.push({
          id: "tagline-custom",
          label: "Write my own tagline",
          value: "__custom__",
          icon: <Pencil className="w-5 h-5" />,
        });

        setTimeout(() => {
          addAIMessage(
            "Here are my suggestions! Click one to use it, or write your own:",
            taglineOptions,
            { type: "text", placeholder: "Or type your own tagline...", field: "businessTagline" }
          );
        }, 500);
      } else {
        throw new Error("Failed to generate");
      }
    } catch {
      // Fallback suggestions if API fails
      const fallbackOptions: Option[] = [
        { id: "t1", label: `Quality ${data.businessType} you can trust`, value: `Quality ${data.businessType} you can trust` },
        { id: "t2", label: `Your success is our mission`, value: `Your success is our mission` },
        { id: "t3", label: `Excellence in every detail`, value: `Excellence in every detail` },
        { id: "tagline-custom", label: "Write my own tagline", value: "__custom__", icon: <Pencil className="w-5 h-5" /> },
      ];

      setTimeout(() => {
        addAIMessage(
          "Here are some tagline ideas! Click one or write your own:",
          fallbackOptions,
          { type: "text", placeholder: "Or type your own tagline...", field: "businessTagline" }
        );
      }, 500);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTaglineSelect = (option: Option) => {
    if (option.value === "__custom__") {
      // Focus on input for custom tagline
      return;
    }
    addUserMessage(`"${option.label}"`);
    updateData({ businessTagline: option.value });
    setStep(5);
    setTimeout(() => {
      showFinalPreview();
    }, 300);
  };

  const showFinalPreview = () => {
    addAIMessage(
      `Amazing! Here's what I've got:\n\n` +
      `**${data.businessName}**\n` +
      `"${data.businessTagline || 'Your tagline here'}"\n\n` +
      `I'm ready to generate your complete website with:\n` +
      `• Professional hero section\n` +
      `• About page\n` +
      `• Services/Features\n` +
      `• Contact form\n` +
      `• And more!\n\n` +
      `Ready to see the magic?`,
      [
        { id: "generate", label: "Generate My Website!", value: "generate", description: "Takes about 10 seconds", icon: <Rocket className="w-5 h-5" /> },
        { id: "edit", label: "Go back and edit", value: "edit", icon: <Pencil className="w-5 h-5" /> },
      ]
    );
  };

  const handleFinalAction = async (option: Option) => {
    if (option.value === "edit") {
      // Reset to beginning
      setStep(0);
      setMessages([]);
      return;
    }

    addUserMessage("Generate My Website!");
    setIsGenerating(true);

    addAIMessage("On it! Creating your website now...");

    try {
      // Create project
      const projectRes = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!projectRes.ok) throw new Error("Failed to create project");
      const project = await projectRes.json();

      // Generate site
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });

      if (!generateRes.ok) throw new Error("Failed to generate site");

      addAIMessage("Your website is ready! Redirecting you now...");

      setTimeout(() => {
        router.push(`/projects/${project.id}/dashboard`);
      }, 1500);

    } catch (error) {
      console.error("Generation error:", error);
      addAIMessage("Oops! Something went wrong. Let me try again...", [
        { id: "retry", label: "Try Again", value: "generate", icon: <RotateCcw className="w-5 h-5" /> },
      ]);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto bg-[#faf9f7] dark:bg-slate-900 rounded-3xl border border-stone-200 dark:border-slate-800 shadow-sm">
      {/* Header */}
      <div className="text-center py-6 border-b border-stone-200 dark:border-slate-700 bg-[#fdfcfa] dark:bg-slate-800/50 rounded-t-3xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-1.5 text-sm font-medium text-white mb-3">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          AI Website Builder
        </div>
        <h1 className="text-2xl font-bold">Create Your Website</h1>
        <p className="text-muted-foreground text-sm mt-1">Chat with AI to build your site in minutes</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] ${message.role === "user" ? "order-1" : ""}`}>
              {/* Avatar */}
              <div className={`flex items-start gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "ai"
                    ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  {message.role === "ai" ? <Sparkles className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                <div className={`rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white dark:from-slate-800 dark:to-slate-900 border border-stone-200 dark:border-slate-700 shadow-sm"
                }`}>
                  {message.isTyping ? (
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : (
                    <div className={`whitespace-pre-wrap ${message.role === "ai" ? "text-base leading-relaxed" : "text-sm"}`}>
                      {message.role === "ai" ? (
                        <>
                          {message.displayedContent ?? message.content}
                          {message.isRevealing && <span className="inline-block w-0.5 h-5 bg-purple-500 ml-0.5 animate-pulse" />}
                        </>
                      ) : message.content}
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              {message.options && !message.isTyping && !message.isRevealing && (
                <div className="mt-4 ml-[60px] grid gap-3">
                  {message.options.slice(0, message.revealedOptions ?? message.options.length).map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        // Handle yes/no discovery questions
                        if (discoveryMode?.startsWith("ask-")) {
                          handleDiscoveryYesNo(option.value as "yes" | "no");
                        } else if (discoveryMode === "email-check") {
                          handleEmailCheck(option);
                        } else if (discoveryMode === "confirm-type") {
                          // AI suggested a business type, user confirms or wants to choose
                          addUserMessage(option.icon ? `${option.icon} ${option.label}` : option.label);
                          if (option.value === "confirm" && aiUnderstanding?.suggestedType) {
                            // User confirmed AI's suggestion
                            updateData({ businessType: aiUnderstanding.suggestedType });
                            // Continue with remaining discovery questions
                            setTimeout(() => moveToNextDiscoveryQuestion(), 300);
                          } else {
                            // User wants to choose their own type - continue discovery first
                            setTimeout(() => moveToNextDiscoveryQuestion(), 300);
                          }
                        } else if (option.value === "keep" || option.value === "change") {
                          // Name confirmation after scrape
                          addUserMessage(option.icon ? `${option.icon} ${option.label}` : option.label);
                          if (option.value === "keep") {
                            setStep(2);
                            setTimeout(() => {
                              const descFromScrape = data.scrapedData?.description || data.businessDescription;
                              if (descFromScrape) {
                                addAIMessage(
                                  `I found this description:\n\n"${descFromScrape.substring(0, 150)}..."\n\nWant to keep it or write something new?`,
                                  [
                                    { id: "keep-desc", label: "Keep this description", value: "keep-desc", icon: <Check className="w-5 h-5 text-green-500" /> },
                                    { id: "change-desc", label: "Write something new", value: "change-desc", icon: <Pencil className="w-5 h-5" /> },
                                  ]
                                );
                              } else {
                                addAIMessage(
                                  `Great! Now, tell me a bit about what makes your business special. What do you do and who do you serve?`,
                                  undefined,
                                  { type: "textarea", placeholder: "We're a family-owned bakery specializing in artisan sourdough...", field: "businessDescription" }
                                );
                              }
                            }, 300);
                          } else {
                            setTimeout(() => {
                              addAIMessage(
                                `No problem! What's the name of your business?`,
                                undefined,
                                { type: "text", placeholder: "e.g., Mario's Italian Kitchen", field: "businessName" }
                              );
                            }, 300);
                          }
                        } else if (option.value === "keep-desc" || option.value === "change-desc") {
                          addUserMessage(option.icon ? `${option.icon} ${option.label}` : option.label);
                          if (option.value === "keep-desc") {
                            setStep(3);
                            setTimeout(() => {
                              addAIMessage(
                                `Perfect! Now let's pick your brand colors. Which vibe fits best?`,
                                colorPresetOptions
                              );
                            }, 300);
                          } else {
                            setTimeout(() => {
                              addAIMessage(
                                `Tell me about your business in your own words:`,
                                undefined,
                                { type: "textarea", placeholder: "We're a family-owned bakery specializing in artisan sourdough...", field: "businessDescription" }
                              );
                            }, 300);
                          }
                        } else if (step === 4 || option.id.startsWith("tagline")) {
                          handleTaglineSelect(option);
                        } else if (step === 5 || option.value === "generate" || option.value === "edit") {
                          handleFinalAction(option);
                        } else {
                          handleOptionSelect(option);
                        }
                      }}
                      disabled={isGenerating}
                      className="flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all hover:shadow-md disabled:opacity-50 animate-in fade-in slide-in-from-bottom-2 duration-300 border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary hover:bg-violet-50 dark:hover:bg-slate-700"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">{option.label}</span>
                        </div>
                        {option.description && (
                          <div className="text-sm text-muted-foreground mt-0.5">{option.description}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Input field */}
              {message.input && !message.isTyping && !message.isRevealing && (
                <div className="mt-4 ml-[60px] animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {message.input.type === "textarea" ? (
                    <textarea
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder={message.input.placeholder}
                      rows={4}
                      className="w-full rounded-2xl border-2 border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          discoveryMode ? handleDiscoveryInput() : handleInputSubmit();
                        }
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      placeholder={message.input.placeholder}
                      className="w-full rounded-2xl border-2 border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          discoveryMode ? handleDiscoveryInput() : handleInputSubmit();
                        }
                      }}
                    />
                  )}
                  <button
                    onClick={() => discoveryMode ? handleDiscoveryInput() : handleInputSubmit()}
                    disabled={!currentInput.trim() || isGenerating || isAnalyzing}
                    className="mt-3 rounded-xl bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all hover:shadow-md"
                  >
                    Continue →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Progress indicator */}
      <div className="border-t border-stone-200 dark:border-slate-700 p-4 bg-[#fdfcfa] dark:bg-slate-800/50 rounded-b-3xl">
        <div className="flex justify-between text-xs text-stone-500 dark:text-slate-400 mb-2">
          <span>Progress</span>
          <span>{Math.min(Math.round(((step + 1) / 6) * 100), 100)}%</span>
        </div>
        <div className="h-2 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
            style={{ width: `${Math.min(((step + 1) / 6) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
