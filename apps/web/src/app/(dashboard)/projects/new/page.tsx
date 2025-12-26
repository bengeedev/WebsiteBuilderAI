"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepBusinessType } from "@/components/onboarding/step-business-type";
import { StepBusinessInfo } from "@/components/onboarding/step-business-info";
import { StepBranding } from "@/components/onboarding/step-branding";
import { StepPreview } from "@/components/onboarding/step-preview";

export type OnboardingData = {
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessTagline: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
};

const initialData: OnboardingData = {
  businessType: "",
  businessName: "",
  businessDescription: "",
  businessTagline: "",
  primaryColor: "#2563eb",
  secondaryColor: "#1e293b",
};

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateData = (updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Create project and generate site
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const project = await res.json();

      // Generate site content
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id }),
      });

      if (!generateRes.ok) throw new Error("Failed to generate site");

      router.push(`/projects/${project.id}`);
    } catch (error) {
      console.error("Generation error:", error);
      setIsGenerating(false);
    }
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="container max-w-3xl py-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      {step === 1 && (
        <StepBusinessType
          data={data}
          onUpdate={updateData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <StepBusinessInfo
          data={data}
          onUpdate={updateData}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <StepBranding
          data={data}
          onUpdate={updateData}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <StepPreview
          data={data}
          onBack={() => setStep(3)}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
}
