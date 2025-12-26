"use client";

import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";

const businessTypeLabels: Record<string, string> = {
  restaurant: "Restaurant & Food",
  portfolio: "Portfolio & Creative",
  business: "Business & Services",
  ecommerce: "E-commerce & Shop",
  blog: "Blog & Content",
  other: "Other",
};

type Props = {
  data: OnboardingData;
  onBack: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
};

export function StepPreview({ data, onBack, onGenerate, isGenerating }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Ready to generate your website!</h1>
        <p className="mt-2 text-muted-foreground">
          Review your information below, then let our AI create your site
        </p>
      </div>

      {/* Summary Card */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Summary</h2>
        <dl className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <dt className="text-muted-foreground">Business Type</dt>
            <dd className="font-medium">
              {businessTypeLabels[data.businessType] || data.businessType}
            </dd>
          </div>
          <div className="flex justify-between border-b pb-2">
            <dt className="text-muted-foreground">Business Name</dt>
            <dd className="font-medium">{data.businessName}</dd>
          </div>
          {data.businessTagline && (
            <div className="flex justify-between border-b pb-2">
              <dt className="text-muted-foreground">Tagline</dt>
              <dd className="font-medium">{data.businessTagline}</dd>
            </div>
          )}
          <div className="border-b pb-2">
            <dt className="text-muted-foreground mb-1">Description</dt>
            <dd className="text-sm">{data.businessDescription}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Brand Colors</dt>
            <dd className="flex gap-2">
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: data.primaryColor }}
                title={`Primary: ${data.primaryColor}`}
              />
              <div
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: data.secondaryColor }}
                title={`Secondary: ${data.secondaryColor}`}
              />
            </dd>
          </div>
        </dl>
      </div>

      {/* What happens next */}
      <div className="rounded-lg bg-muted/50 p-6">
        <h3 className="font-semibold mb-3">What happens next?</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="text-primary">1.</span>
            Our AI will analyze your business and select the best template
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">2.</span>
            Custom content will be generated for all sections of your site
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">3.</span>
            Your brand colors will be applied throughout
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">4.</span>
            You can preview and edit everything before publishing
          </li>
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isGenerating}
          className="rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating your site...
            </span>
          ) : (
            "Generate My Website"
          )}
        </button>
      </div>
    </div>
  );
}
