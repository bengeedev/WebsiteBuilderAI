"use client";

import { useState } from "react";
import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";
import {
  colorPresets,
  fontPairings,
  type ColorPreset,
  type FontPairing,
} from "@repo/templates";

type Props = {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onBack: () => void;
  onNext: () => void;
};

// Group presets by tone for better organization
const presetGroups = {
  professional: colorPresets.filter((p) => p.tone === "professional"),
  vibrant: colorPresets.filter((p) => p.tone === "vibrant" || p.tone === "bold"),
  elegant: colorPresets.filter((p) => p.tone === "elegant"),
  warm: colorPresets.filter((p) => p.tone === "warm"),
  cool: colorPresets.filter((p) => p.tone === "cool"),
  minimal: colorPresets.filter((p) => p.tone === "minimal"),
};

// Group fonts by tone
const fontGroups = {
  modern: fontPairings.filter((f) => f.tone === "modern"),
  elegant: fontPairings.filter((f) => f.tone === "elegant"),
  bold: fontPairings.filter((f) => f.tone === "bold"),
  creative: fontPairings.filter((f) => f.tone === "creative"),
  professional: fontPairings.filter((f) => f.tone === "professional"),
  minimal: fontPairings.filter((f) => f.tone === "minimal"),
  friendly: fontPairings.filter((f) => f.tone === "friendly"),
};

export function StepBranding({ data, onUpdate, onBack, onNext }: Props) {
  const [activeColorTab, setActiveColorTab] = useState<keyof typeof presetGroups>("professional");
  const [activeFontTab, setActiveFontTab] = useState<keyof typeof fontGroups>("modern");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handlePresetSelect = (preset: ColorPreset) => {
    onUpdate({
      primaryColor: preset.colors.primary,
      secondaryColor: preset.colors.secondary,
      // Store the full preset for extended colors (we'll use this in the site)
    });
  };

  const handleFontSelect = (pairing: FontPairing) => {
    onUpdate({
      headingFont: pairing.heading.family,
      bodyFont: pairing.body.family,
    });
  };

  const selectedFontPairing = fontPairings.find(
    (p) => p.heading.family === data.headingFont && p.body.family === data.bodyFont
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Design your brand</h1>
        <p className="mt-2 text-muted-foreground">
          Choose colors and typography that represent your business
        </p>
      </div>

      {/* Color Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Color Scheme</h2>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {showAdvanced ? "Hide" : "Show"} custom colors
          </button>
        </div>

        {/* Tone Tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(presetGroups) as Array<keyof typeof presetGroups>).map((tone) => (
            <button
              key={tone}
              onClick={() => setActiveColorTab(tone)}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors ${
                activeColorTab === tone
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Color Presets Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {presetGroups[activeColorTab].map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`group relative flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-primary ${
                data.primaryColor === preset.colors.primary
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              }`}
            >
              {/* Color Circles */}
              <div className="flex gap-1">
                <div
                  className="h-10 w-10 rounded-full shadow-sm"
                  style={{ backgroundColor: preset.colors.primary }}
                />
                <div
                  className="h-10 w-10 rounded-full shadow-sm"
                  style={{ backgroundColor: preset.colors.secondary }}
                />
                <div
                  className="h-10 w-10 rounded-full shadow-sm"
                  style={{ backgroundColor: preset.colors.accent }}
                />
              </div>
              <span className="text-xs font-medium">{preset.name}</span>
              <span className="text-[10px] text-muted-foreground">{preset.description}</span>
            </button>
          ))}
        </div>

        {/* Custom Colors (Advanced) */}
        {showAdvanced && (
          <div className="rounded-lg border border-dashed p-4">
            <h3 className="mb-3 text-sm font-medium">Custom Colors</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="primaryColor" className="text-sm text-muted-foreground">
                  Primary
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={data.primaryColor}
                    onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border border-input"
                  />
                  <input
                    type="text"
                    value={data.primaryColor}
                    onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm uppercase"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="secondaryColor" className="text-sm text-muted-foreground">
                  Secondary
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="secondaryColor"
                    value={data.secondaryColor}
                    onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                    className="h-10 w-14 cursor-pointer rounded border border-input"
                  />
                  <input
                    type="text"
                    value={data.secondaryColor}
                    onChange={(e) => onUpdate({ secondaryColor: e.target.value })}
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm uppercase"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Typography Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Typography</h2>

        {/* Font Tone Tabs */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(fontGroups) as Array<keyof typeof fontGroups>).map((tone) => (
            <button
              key={tone}
              onClick={() => setActiveFontTab(tone)}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors ${
                activeFontTab === tone
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        {/* Font Pairings Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fontGroups[activeFontTab].map((pairing) => (
            <button
              key={pairing.id}
              onClick={() => handleFontSelect(pairing)}
              className={`flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all hover:border-primary ${
                data.headingFont === pairing.heading.family
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border"
              }`}
            >
              <span
                className="text-lg font-bold"
                style={{ fontFamily: `"${pairing.heading.family}", ${pairing.heading.fallback}` }}
              >
                {pairing.name}
              </span>
              <span
                className="text-sm text-muted-foreground"
                style={{ fontFamily: `"${pairing.body.family}", ${pairing.body.fallback}` }}
              >
                {pairing.description}
              </span>
              <span className="mt-1 text-xs text-muted-foreground/60">
                {pairing.heading.family} + {pairing.body.family}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Live Preview</h2>
        <div
          className="overflow-hidden rounded-lg"
          style={{ backgroundColor: data.secondaryColor }}
        >
          {/* Navbar preview */}
          <div
            className="flex items-center justify-between px-6 py-3"
            style={{ backgroundColor: `${data.secondaryColor}ee` }}
          >
            <span
              className="text-lg font-bold"
              style={{
                color: data.primaryColor,
                fontFamily: selectedFontPairing
                  ? `"${selectedFontPairing.heading.family}", ${selectedFontPairing.heading.fallback}`
                  : undefined,
              }}
            >
              {data.businessName || "Your Brand"}
            </span>
            <div className="flex gap-4">
              <span className="text-sm text-gray-400">Home</span>
              <span className="text-sm text-gray-400">About</span>
              <span className="text-sm text-gray-400">Services</span>
            </div>
          </div>

          {/* Hero preview */}
          <div className="p-8 text-center">
            <h3
              className="text-3xl font-bold text-white"
              style={{
                fontFamily: selectedFontPairing
                  ? `"${selectedFontPairing.heading.family}", ${selectedFontPairing.heading.fallback}`
                  : undefined,
              }}
            >
              {data.businessName || "Your Business Name"}
            </h3>
            <p
              className="mx-auto mt-2 max-w-md text-gray-300"
              style={{
                fontFamily: selectedFontPairing
                  ? `"${selectedFontPairing.body.family}", ${selectedFontPairing.body.fallback}`
                  : undefined,
              }}
            >
              {data.businessTagline || "Your compelling tagline that captures what you do"}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                className="rounded-md px-6 py-2 font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: data.primaryColor }}
              >
                Get Started
              </button>
              <button
                className="rounded-md border px-6 py-2 font-medium text-white"
                style={{ borderColor: data.primaryColor, color: data.primaryColor }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
