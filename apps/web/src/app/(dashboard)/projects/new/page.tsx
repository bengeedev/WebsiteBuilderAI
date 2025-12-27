"use client";

import { ConversationalWizard } from "@/components/onboarding/conversational-wizard";

export type OnboardingData = {
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessTagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  headingFont: string;
  bodyFont: string;
  logoUrl?: string;
};

const initialData: OnboardingData = {
  businessType: "",
  businessName: "",
  businessDescription: "",
  businessTagline: "",
  primaryColor: "#2563eb",
  secondaryColor: "#1e293b",
  headingFont: "Inter",
  bodyFont: "Inter",
};

export default function NewProjectPage() {
  const handleComplete = (data: OnboardingData) => {
    console.log("Wizard completed with data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-100 to-stone-50 dark:from-slate-950 dark:to-slate-900 py-6">
      <div className="container">
        <ConversationalWizard
          initialData={initialData}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
