"use client";

import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";

const colorPresets = [
  { primary: "#2563eb", secondary: "#1e293b", name: "Blue Professional" },
  { primary: "#059669", secondary: "#111827", name: "Green Growth" },
  { primary: "#7c3aed", secondary: "#18181b", name: "Purple Creative" },
  { primary: "#dc2626", secondary: "#1f2937", name: "Red Bold" },
  { primary: "#f59e0b", secondary: "#292524", name: "Orange Warm" },
  { primary: "#ec4899", secondary: "#1e1e1e", name: "Pink Modern" },
];

type Props = {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function StepBranding({ data, onUpdate, onBack, onNext }: Props) {
  const handlePresetSelect = (primary: string, secondary: string) => {
    onUpdate({ primaryColor: primary, secondaryColor: secondary });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Choose your brand colors</h1>
        <p className="mt-2 text-muted-foreground">
          Select a color scheme or customize your own
        </p>
      </div>

      {/* Color Presets */}
      <div className="space-y-4">
        <h2 className="font-semibold">Quick Presets</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset.primary, preset.secondary)}
              className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all hover:border-primary ${
                data.primaryColor === preset.primary
                  ? "border-primary ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="flex gap-1">
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="h-8 w-8 rounded-full"
                  style={{ backgroundColor: preset.secondary }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h2 className="font-semibold">Custom Colors</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="primaryColor" className="text-sm font-medium">
              Primary Color
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
            <label htmlFor="secondaryColor" className="text-sm font-medium">
              Secondary Color
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

      {/* Preview */}
      <div className="space-y-4">
        <h2 className="font-semibold">Preview</h2>
        <div
          className="rounded-lg p-6"
          style={{ backgroundColor: data.secondaryColor }}
        >
          <div className="space-y-4">
            <h3
              className="text-2xl font-bold"
              style={{ color: data.primaryColor }}
            >
              {data.businessName || "Your Business Name"}
            </h3>
            <p className="text-gray-300">
              {data.businessTagline || "Your tagline goes here"}
            </p>
            <button
              className="rounded-md px-4 py-2 font-medium text-white"
              style={{ backgroundColor: data.primaryColor }}
            >
              Call to Action
            </button>
          </div>
        </div>
      </div>

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
