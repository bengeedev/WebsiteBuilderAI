"use client";

import type { OnboardingData } from "@/app/(dashboard)/projects/new/page";

const businessTypes = [
  {
    id: "restaurant",
    name: "Restaurant & Food",
    icon: "🍽️",
    description: "Restaurants, cafes, food trucks, catering",
  },
  {
    id: "portfolio",
    name: "Portfolio & Creative",
    icon: "🎨",
    description: "Artists, designers, photographers, freelancers",
  },
  {
    id: "business",
    name: "Business & Services",
    icon: "💼",
    description: "Consulting, agencies, professional services",
  },
  {
    id: "ecommerce",
    name: "E-commerce & Shop",
    icon: "🛍️",
    description: "Online stores, product businesses",
  },
  {
    id: "blog",
    name: "Blog & Content",
    icon: "✍️",
    description: "Blogs, news sites, content creators",
  },
  {
    id: "other",
    name: "Other",
    icon: "✨",
    description: "Something else entirely",
  },
];

type Props = {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
};

export function StepBusinessType({ data, onUpdate, onNext }: Props) {
  const handleSelect = (type: string) => {
    onUpdate({ businessType: type });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">What type of website are you building?</h1>
        <p className="mt-2 text-muted-foreground">
          This helps us choose the best template and content for you
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`flex items-start gap-4 rounded-lg border p-4 text-left transition-all hover:border-primary ${
              data.businessType === type.id
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "border-border"
            }`}
          >
            <span className="text-3xl">{type.icon}</span>
            <div>
              <h3 className="font-semibold">{type.name}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={!data.businessType}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
