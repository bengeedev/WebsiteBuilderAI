export type SectionType =
  | "hero"
  | "about"
  | "features"
  | "services"
  | "menu"
  | "portfolio"
  | "gallery"
  | "testimonials"
  | "team"
  | "pricing"
  | "contact"
  | "cta"
  | "newsletter"
  | "faq";

export type SectionContent = {
  type: SectionType;
  title: string;
  subtitle?: string;
  content: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
    price?: string;
    image?: string;
  }>;
  cta?: {
    text: string;
    url?: string;
  };
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
  };
  sections: SectionContent[];
};

export type GenerateInput = {
  businessType: string;
  businessName: string;
  businessDescription: string;
  businessTagline?: string;
};
