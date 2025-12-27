"use client";

import { useState, useEffect } from "react";

type AISuggestionProps = {
  field: string;
  currentValue: string;
  businessContext: {
    type: string;
    name: string;
    description?: string;
  };
  onAccept: (suggestion: string) => void;
  className?: string;
  autoGenerate?: boolean; // Auto-generate on mount
};

export function AISuggestion({
  field,
  currentValue,
  businessContext,
  onAccept,
  className = "",
  autoGenerate = true, // Default to auto-generate
}: AISuggestionProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [autoTriggered, setAutoTriggered] = useState(false);

  // Auto-generate suggestions when component mounts with valid context
  useEffect(() => {
    if (
      autoGenerate &&
      !autoTriggered &&
      !hasGenerated &&
      businessContext.name &&
      businessContext.type &&
      !currentValue // Only auto-suggest if field is empty
    ) {
      setAutoTriggered(true);
      generateSuggestions();
    }
  }, [businessContext.name, businessContext.type, autoGenerate, autoTriggered, hasGenerated, currentValue]);

  const generateSuggestions = async () => {
    if (!businessContext.name || !businessContext.type) {
      setError("Please fill in your business name and type first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field,
          currentValue,
          businessContext,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate suggestions");
      }

      const data = await res.json();
      setSuggestions(data.suggestions || []);
      setHasGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = (suggestion: string) => {
    onAccept(suggestion);
    // Clear suggestions after selection
    setSuggestions([]);
    setHasGenerated(false);
  };

  return (
    <div className={`mt-2 ${className}`}>
      {/* Generate Button */}
      {!hasGenerated && (
        <button
          type="button"
          onClick={generateSuggestions}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-violet-500 to-purple-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:from-violet-600 hover:to-purple-600 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span>AI Suggestions</span>
            </>
          )}
        </button>
      )}

      {/* Error Message */}
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}

      {/* Suggestions List */}
      {suggestions.length > 0 && (
        <div className="mt-3 rounded-lg border border-dashed border-purple-300 bg-purple-50/50 p-3 dark:border-purple-800 dark:bg-purple-950/20">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
              AI Suggestions
            </span>
            <button
              type="button"
              onClick={() => {
                setSuggestions([]);
                setHasGenerated(false);
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Dismiss
            </button>
          </div>
          <div className="space-y-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAccept(suggestion)}
                className="block w-full rounded-md border border-transparent bg-white p-2 text-left text-sm transition-all hover:border-purple-300 hover:bg-purple-50 dark:bg-gray-900 dark:hover:border-purple-700 dark:hover:bg-purple-950/50"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={generateSuggestions}
            disabled={isLoading}
            className="mt-2 text-xs text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
          >
            {isLoading ? "Generating..." : "Generate more"}
          </button>
        </div>
      )}
    </div>
  );
}
