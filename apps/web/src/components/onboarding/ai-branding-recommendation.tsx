"use client";

import { useEffect, useState } from "react";
import {
  getPresetsForIndustry,
  getFontPairingsByTone,
  type BrandingPreset,
  type FontPairing,
} from "@repo/templates";

type Props = {
  businessType: string;
  businessName: string;
  onApplyPreset: (preset: {
    primaryColor: string;
    secondaryColor: string;
    headingFont: string;
    bodyFont: string;
  }) => void;
};

export function AIBrandingRecommendation({
  businessType,
  businessName,
  onApplyPreset,
}: Props) {
  const [recommendations, setRecommendations] = useState<{
    presets: BrandingPreset[];
    fonts: FontPairing[];
  }>({ presets: [], fonts: [] });
  const [showRecommendations, setShowRecommendations] = useState(true);

  useEffect(() => {
    // Get industry-specific presets
    const presets = getPresetsForIndustry(businessType);

    // Get font pairings based on industry tone
    const industryTones: Record<string, string> = {
      restaurant: "friendly",
      cafe: "friendly",
      portfolio: "creative",
      agency: "modern",
      startup: "modern",
      law: "professional",
      medical: "professional",
      fitness: "bold",
      salon: "elegant",
      realestate: "professional",
      construction: "bold",
      ecommerce: "modern",
      blog: "minimal",
    };
    const tone = industryTones[businessType.toLowerCase()] || "modern";
    const fonts = getFontPairingsByTone(tone as Parameters<typeof getFontPairingsByTone>[0]);

    setRecommendations({
      presets: presets.slice(0, 2),
      fonts: fonts.slice(0, 2),
    });
  }, [businessType]);

  if (!showRecommendations || recommendations.presets.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 rounded-lg border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 p-4 dark:border-purple-900 dark:from-purple-950/30 dark:to-violet-950/30">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-purple-600 dark:text-purple-400"
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
          <span className="font-medium text-purple-900 dark:text-purple-100">
            AI Recommendations for {businessName || businessType}
          </span>
        </div>
        <button
          onClick={() => setShowRecommendations(false)}
          className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400"
        >
          Dismiss
        </button>
      </div>

      <p className="mb-4 text-sm text-purple-700 dark:text-purple-300">
        Based on your business type, we recommend these brand styles:
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        {recommendations.presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() =>
              onApplyPreset({
                primaryColor: preset.colors.primary,
                secondaryColor: preset.colors.secondary,
                headingFont: preset.typography.headingFont.family,
                bodyFont: preset.typography.bodyFont.family,
              })
            }
            className="flex items-center gap-3 rounded-lg border border-purple-200 bg-white p-3 text-left transition-all hover:border-purple-400 hover:shadow-md dark:border-purple-800 dark:bg-gray-900"
          >
            <div className="flex -space-x-1">
              <div
                className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: preset.colors.primary }}
              />
              <div
                className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: preset.colors.secondary }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{preset.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {preset.typography.headingFont.family} + {preset.typography.bodyFont.family}
              </div>
            </div>
            <svg
              className="h-4 w-4 text-purple-500 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
