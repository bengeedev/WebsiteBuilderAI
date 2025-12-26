"use client";

import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";

type Props = {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onBack: () => void;
  onNext: () => void;
};

export function StepBusinessInfo({ data, onUpdate, onBack, onNext }: Props) {
  const isValid =
    data.businessName.trim() !== "" && data.businessDescription.trim() !== "";

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Tell us about your business</h1>
        <p className="mt-2 text-muted-foreground">
          Our AI will use this to create personalized content for your site
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium">
            Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            value={data.businessName}
            onChange={(e) => onUpdate({ businessName: e.target.value })}
            placeholder="e.g., Sunrise Bakery"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="businessTagline" className="text-sm font-medium">
            Tagline (optional)
          </label>
          <input
            id="businessTagline"
            type="text"
            value={data.businessTagline}
            onChange={(e) => onUpdate({ businessTagline: e.target.value })}
            placeholder="e.g., Fresh baked goods since 1985"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="businessDescription" className="text-sm font-medium">
            Describe your business *
          </label>
          <textarea
            id="businessDescription"
            value={data.businessDescription}
            onChange={(e) => onUpdate({ businessDescription: e.target.value })}
            rows={5}
            placeholder="Tell us what you do, who your customers are, and what makes you unique. The more detail, the better the result!

Example: We're a family-owned bakery in downtown Seattle specializing in artisan sourdough bread and French pastries. Our customers are local food lovers who appreciate handcrafted, organic ingredients. We've been serving the community for over 30 years."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Be as detailed as possible - our AI uses this to write your website content
          </p>
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
          disabled={!isValid}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
