"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: string;
  content: string;
};

type Props = {
  messages: Message[];
  onSendCommand: (command: string) => void;
  isThinking: boolean;
  projectName: string;
};

export function AICommandBar({ messages, onSendCommand, isThinking, projectName }: Props) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    onSendCommand(input.trim());
    setInput("");
    setIsExpanded(true);
  };

  const suggestions = [
    "Add a testimonials section",
    "Change the hero image",
    "Write a blog post about...",
    "Improve my SEO score",
    "Add a contact form",
    "Change colors to more vibrant",
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded chat view */}
      {isExpanded && (
        <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            {/* Messages */}
            <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-white/10 text-gray-100"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">🤖</span>
                        <span className="text-xs text-purple-400 font-medium">AI Webmaster</span>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🤖</span>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Collapse button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-2 right-4 p-2 hover:bg-white/10 rounded-lg transition"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="bg-[#0a0a0f] border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto p-4">
          {/* Suggestions */}
          {!isExpanded && (
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-purple-500/50 focus-within:bg-white/10 transition-all">
              <span className="text-xl">🤖</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => setIsExpanded(true)}
                placeholder={`Ask me anything about ${projectName}...`}
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm"
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>

          {/* Keyboard shortcut hint */}
          <p className="text-center text-xs text-gray-600 mt-2">
            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-gray-400">⌘K</kbd> anywhere to open AI command
          </p>
        </div>
      </div>
    </div>
  );
}
