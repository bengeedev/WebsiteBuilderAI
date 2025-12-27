/**
 * Templates Registry
 *
 * Complete library of 30+ website templates organized by business type and use case.
 */

import type { Template } from "../types";
import type { SectionType } from "../sections/types";
import { getBrandingPreset } from "../branding/presets";

// Helper to create a template with defaults
function createTemplate(
  overrides: Partial<Template> & Pick<Template, "id" | "name" | "subcategory" | "description">
): Template {
  const defaultBranding = getBrandingPreset("modern-tech") || {
    id: "default",
    name: "Default",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e293b",
      accent: "#8b5cf6",
      background: "#ffffff",
      surface: "#f8fafc",
      text: { primary: "#0f172a", secondary: "#475569", muted: "#94a3b8" },
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    typography: {
      headingFont: { family: "Inter", weights: [600, 700], category: "sans-serif", fallback: "system-ui" },
      bodyFont: { family: "Inter", weights: [400, 500], category: "sans-serif", fallback: "system-ui" },
      scale: "normal",
      headingWeight: 700,
      bodyWeight: 400,
    },
  };

  return {
    category: "business",
    thumbnail: undefined,
    previewUrl: undefined,
    pages: [{ name: "Home", slug: "/", sections: [] }],
    defaultSections: [],
    recommendedLayouts: {},
    defaultBranding,
    tone: "professional",
    features: [],
    tags: [],
    ...overrides,
  };
}

// ============================================
// BUSINESS TYPE TEMPLATES (15)
// ============================================

export const restaurantTemplate: Template = createTemplate({
  id: "restaurant",
  name: "Restaurant",
  category: "business",
  subcategory: "food-beverage",
  description: "Perfect for restaurants, cafes, and food businesses. Features menu display, reservations, and location info.",
  industry: "restaurant",
  tone: "friendly",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "about", "menu", "testimonials", "gallery", "contact"] as SectionType[],
    },
    {
      name: "Menu",
      slug: "/menu",
      sections: ["hero", "menu"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Welcome to {businessName}", subtitle: "Authentic cuisine made with love" },
    { id: "about-1", type: "about", title: "Our Story", content: "A family tradition of great food..." },
    { id: "menu-1", type: "menu", title: "Our Menu", subtitle: "Fresh ingredients, bold flavors" },
    { id: "testimonials-1", type: "testimonials", title: "What Our Guests Say" },
    { id: "gallery-1", type: "gallery", title: "Gallery" },
    { id: "contact-1", type: "contact", title: "Visit Us" },
  ],
  recommendedLayouts: {
    hero: ["hero-split", "hero-fullscreen"],
    menu: ["menu-categories", "menu-cards"],
    testimonials: ["testimonials-carousel"],
  },
  features: ["Menu display", "Reservations", "Gallery", "Location map"],
  tags: ["restaurant", "cafe", "food", "dining", "menu"],
});

export const portfolioTemplate: Template = createTemplate({
  id: "portfolio",
  name: "Portfolio",
  category: "business",
  subcategory: "creative",
  description: "Showcase your work with a stunning portfolio. Ideal for designers, photographers, and creatives.",
  industry: "creative",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "portfolio", "about", "services", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "{businessName}", subtitle: "Creating beautiful experiences" },
    { id: "portfolio-1", type: "portfolio", title: "Selected Work" },
    { id: "about-1", type: "about", title: "About Me" },
    { id: "services-1", type: "services", title: "Services" },
    { id: "testimonials-1", type: "testimonials", title: "Client Testimonials" },
    { id: "contact-1", type: "contact", title: "Let's Work Together" },
  ],
  features: ["Project showcase", "Filterable gallery", "Case studies"],
  tags: ["portfolio", "creative", "designer", "photographer", "artist"],
});

export const professionalServicesTemplate: Template = createTemplate({
  id: "professional-services",
  name: "Professional Services",
  category: "business",
  subcategory: "services",
  description: "For consultants, lawyers, accountants and professional service providers.",
  industry: "professional",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "about", "team", "testimonials", "faq", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Expert {businessType} Services", subtitle: "Trusted by businesses nationwide" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "about-1", type: "about", title: "About Our Firm" },
    { id: "team-1", type: "team", title: "Meet Our Team" },
    { id: "testimonials-1", type: "testimonials", title: "Client Success Stories" },
    { id: "faq-1", type: "faq", title: "Frequently Asked Questions" },
    { id: "contact-1", type: "contact", title: "Schedule a Consultation" },
  ],
  features: ["Service listings", "Team profiles", "Testimonials", "Contact form"],
  tags: ["professional", "consulting", "law", "accounting", "services"],
});

export const healthcareTemplate: Template = createTemplate({
  id: "healthcare",
  name: "Healthcare",
  category: "business",
  subcategory: "health",
  description: "For medical practices, clinics, dentists, and healthcare providers.",
  industry: "healthcare",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "about", "team", "testimonials", "faq", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Your Health, Our Priority", subtitle: "Compassionate care for every patient" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "about-1", type: "about", title: "About Our Practice" },
    { id: "team-1", type: "team", title: "Our Medical Team" },
    { id: "testimonials-1", type: "testimonials", title: "Patient Testimonials" },
    { id: "faq-1", type: "faq", title: "Patient FAQ" },
    { id: "contact-1", type: "contact", title: "Book an Appointment" },
  ],
  features: ["Service listings", "Doctor profiles", "Appointment booking", "Patient resources"],
  tags: ["healthcare", "medical", "doctor", "clinic", "dentist"],
});

export const fitnessTemplate: Template = createTemplate({
  id: "fitness",
  name: "Fitness & Gym",
  category: "business",
  subcategory: "health",
  description: "For gyms, fitness studios, personal trainers, and wellness centers.",
  industry: "fitness",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "pricing", "team", "testimonials", "gallery", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Transform Your Body", subtitle: "Start your fitness journey today" },
    { id: "services-1", type: "services", title: "Programs & Classes" },
    { id: "pricing-1", type: "pricing", title: "Membership Plans" },
    { id: "team-1", type: "team", title: "Our Trainers" },
    { id: "testimonials-1", type: "testimonials", title: "Success Stories" },
    { id: "gallery-1", type: "gallery", title: "Our Facility" },
    { id: "contact-1", type: "contact", title: "Get Started" },
  ],
  features: ["Class schedules", "Trainer profiles", "Membership pricing", "Success stories"],
  tags: ["fitness", "gym", "trainer", "wellness", "health"],
});

export const realEstateTemplate: Template = createTemplate({
  id: "real-estate",
  name: "Real Estate",
  category: "business",
  subcategory: "real-estate",
  description: "For real estate agents, property management, and real estate agencies.",
  industry: "realestate",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "services", "testimonials", "about", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Find Your Dream Home", subtitle: "Expert real estate services" },
    { id: "features-1", type: "features", title: "Featured Properties" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "testimonials-1", type: "testimonials", title: "Happy Homeowners" },
    { id: "about-1", type: "about", title: "About Us" },
    { id: "contact-1", type: "contact", title: "Get In Touch" },
  ],
  features: ["Property listings", "Agent profiles", "Search functionality", "Contact forms"],
  tags: ["real estate", "property", "agent", "homes", "listings"],
});

export const salonTemplate: Template = createTemplate({
  id: "salon",
  name: "Salon & Spa",
  category: "business",
  subcategory: "beauty",
  description: "For hair salons, spas, beauty studios, and wellness centers.",
  industry: "salon",
  tone: "elegant",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "pricing", "team", "gallery", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Indulge in Luxury", subtitle: "Beauty and relaxation await" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "pricing-1", type: "pricing", title: "Pricing" },
    { id: "team-1", type: "team", title: "Meet Our Stylists" },
    { id: "gallery-1", type: "gallery", title: "Our Work" },
    { id: "testimonials-1", type: "testimonials", title: "Client Reviews" },
    { id: "contact-1", type: "contact", title: "Book an Appointment" },
  ],
  features: ["Service menu", "Booking system", "Stylist profiles", "Gallery"],
  tags: ["salon", "spa", "beauty", "hair", "wellness"],
});

export const constructionTemplate: Template = createTemplate({
  id: "construction",
  name: "Construction",
  category: "business",
  subcategory: "trades",
  description: "For construction companies, contractors, and building services.",
  industry: "construction",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "portfolio", "about", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Building Excellence", subtitle: "Quality construction you can trust" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "portfolio-1", type: "portfolio", title: "Our Projects" },
    { id: "about-1", type: "about", title: "About Our Company" },
    { id: "testimonials-1", type: "testimonials", title: "Client Testimonials" },
    { id: "contact-1", type: "contact", title: "Get a Quote" },
  ],
  features: ["Project gallery", "Service listings", "Quote request form"],
  tags: ["construction", "contractor", "builder", "renovation"],
});

export const automotiveTemplate: Template = createTemplate({
  id: "automotive",
  name: "Automotive",
  category: "business",
  subcategory: "automotive",
  description: "For auto shops, car dealerships, and automotive services.",
  industry: "automotive",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "features", "about", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Expert Auto Care", subtitle: "Your trusted automotive partner" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "features-1", type: "features", title: "Why Choose Us" },
    { id: "about-1", type: "about", title: "About Our Shop" },
    { id: "testimonials-1", type: "testimonials", title: "Customer Reviews" },
    { id: "contact-1", type: "contact", title: "Schedule Service" },
  ],
  features: ["Service listings", "Quote request", "Hours & location"],
  tags: ["automotive", "auto shop", "car", "mechanic", "dealership"],
});

export const petServicesTemplate: Template = createTemplate({
  id: "pet-services",
  name: "Pet Services",
  category: "business",
  subcategory: "pets",
  description: "For pet grooming, veterinary clinics, pet stores, and pet care services.",
  industry: "pets",
  tone: "friendly",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "pricing", "about", "gallery", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Loving Care for Your Pets", subtitle: "Where pets are family" },
    { id: "services-1", type: "services", title: "Our Services" },
    { id: "pricing-1", type: "pricing", title: "Pricing" },
    { id: "about-1", type: "about", title: "About Us" },
    { id: "gallery-1", type: "gallery", title: "Our Furry Friends" },
    { id: "testimonials-1", type: "testimonials", title: "Happy Pet Parents" },
    { id: "contact-1", type: "contact", title: "Book an Appointment" },
  ],
  features: ["Service listings", "Pet gallery", "Booking system"],
  tags: ["pet", "grooming", "veterinary", "dog", "cat"],
});

export const educationTemplate: Template = createTemplate({
  id: "education",
  name: "Education",
  category: "business",
  subcategory: "education",
  description: "For schools, tutoring services, and educational institutions.",
  industry: "education",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "features", "team", "testimonials", "faq", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Unlock Your Potential", subtitle: "Quality education for everyone" },
    { id: "services-1", type: "services", title: "Our Programs" },
    { id: "features-1", type: "features", title: "Why Choose Us" },
    { id: "team-1", type: "team", title: "Our Educators" },
    { id: "testimonials-1", type: "testimonials", title: "Student Success Stories" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "contact-1", type: "contact", title: "Enroll Today" },
  ],
  features: ["Program listings", "Instructor profiles", "Enrollment form"],
  tags: ["education", "school", "tutoring", "learning", "courses"],
});

export const photographyTemplate: Template = createTemplate({
  id: "photography",
  name: "Photography",
  category: "business",
  subcategory: "creative",
  description: "For photographers, videographers, and visual artists.",
  industry: "photography",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "gallery", "services", "about", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Capturing Moments", subtitle: "Professional photography services" },
    { id: "gallery-1", type: "gallery", title: "Portfolio" },
    { id: "services-1", type: "services", title: "Services" },
    { id: "about-1", type: "about", title: "About Me" },
    { id: "testimonials-1", type: "testimonials", title: "Client Reviews" },
    { id: "contact-1", type: "contact", title: "Book a Session" },
  ],
  features: ["Photo gallery", "Booking system", "Service packages"],
  tags: ["photography", "photographer", "videographer", "visual", "creative"],
});

export const travelTemplate: Template = createTemplate({
  id: "travel",
  name: "Travel & Tourism",
  category: "business",
  subcategory: "travel",
  description: "For travel agencies, tour operators, and hospitality businesses.",
  industry: "travel",
  tone: "friendly",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "services", "gallery", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Explore the World", subtitle: "Unforgettable travel experiences" },
    { id: "features-1", type: "features", title: "Featured Destinations" },
    { id: "services-1", type: "services", title: "Our Packages" },
    { id: "gallery-1", type: "gallery", title: "Travel Gallery" },
    { id: "testimonials-1", type: "testimonials", title: "Traveler Reviews" },
    { id: "contact-1", type: "contact", title: "Plan Your Trip" },
  ],
  features: ["Tour packages", "Destination showcase", "Booking system"],
  tags: ["travel", "tourism", "tours", "vacation", "adventure"],
});

export const nonprofitTemplate: Template = createTemplate({
  id: "nonprofit",
  name: "Non-Profit",
  category: "business",
  subcategory: "nonprofit",
  description: "For charities, NGOs, and non-profit organizations.",
  industry: "nonprofit",
  tone: "friendly",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "about", "features", "stats", "testimonials", "cta", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Making a Difference", subtitle: "Join our mission to change lives" },
    { id: "about-1", type: "about", title: "Our Mission" },
    { id: "features-1", type: "features", title: "Our Programs" },
    { id: "stats-1", type: "stats", title: "Our Impact" },
    { id: "testimonials-1", type: "testimonials", title: "Stories of Impact" },
    { id: "cta-1", type: "cta", title: "Support Our Cause" },
    { id: "contact-1", type: "contact", title: "Get Involved" },
  ],
  features: ["Donation integration", "Impact stats", "Volunteer signup"],
  tags: ["nonprofit", "charity", "ngo", "cause", "mission"],
});

export const techStartupTemplate: Template = createTemplate({
  id: "tech-startup",
  name: "Tech Startup",
  category: "business",
  subcategory: "technology",
  description: "For technology startups, software companies, and innovative businesses.",
  industry: "technology",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "about", "pricing", "testimonials", "faq", "cta"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "The Future of {industry}", subtitle: "Revolutionary technology that works" },
    { id: "features-1", type: "features", title: "Features" },
    { id: "about-1", type: "about", title: "About Us" },
    { id: "pricing-1", type: "pricing", title: "Pricing" },
    { id: "testimonials-1", type: "testimonials", title: "What Users Say" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "cta-1", type: "cta", title: "Get Started Today" },
  ],
  features: ["Product features", "Pricing tiers", "Demo request"],
  tags: ["startup", "tech", "software", "saas", "innovation"],
});

// ============================================
// USE CASE TEMPLATES (15+)
// ============================================

export const ecommerceTemplate: Template = createTemplate({
  id: "ecommerce",
  name: "E-commerce",
  category: "usecase",
  subcategory: "commerce",
  description: "Online store template with product showcase and shopping features.",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "gallery", "testimonials", "newsletter", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Shop the Collection", subtitle: "Quality products at great prices" },
    { id: "features-1", type: "features", title: "Featured Products" },
    { id: "gallery-1", type: "gallery", title: "New Arrivals" },
    { id: "testimonials-1", type: "testimonials", title: "Customer Reviews" },
    { id: "newsletter-1", type: "newsletter", title: "Join Our Newsletter" },
    { id: "contact-1", type: "contact", title: "Contact Us" },
  ],
  features: ["Product display", "Category pages", "Newsletter signup"],
  tags: ["ecommerce", "shop", "store", "products", "retail"],
});

export const saasTemplate: Template = createTemplate({
  id: "saas",
  name: "SaaS Landing",
  category: "usecase",
  subcategory: "software",
  description: "Software as a Service landing page with features, pricing, and signup.",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "stats", "pricing", "testimonials", "faq", "cta"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Simplify Your Workflow", subtitle: "The all-in-one solution for modern teams" },
    { id: "features-1", type: "features", title: "Powerful Features" },
    { id: "stats-1", type: "stats", title: "Trusted by Thousands" },
    { id: "pricing-1", type: "pricing", title: "Simple Pricing" },
    { id: "testimonials-1", type: "testimonials", title: "Customer Stories" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "cta-1", type: "cta", title: "Start Free Trial" },
  ],
  features: ["Feature showcase", "Pricing table", "Trial signup"],
  tags: ["saas", "software", "app", "platform", "tool"],
});

export const appLandingTemplate: Template = createTemplate({
  id: "app-landing",
  name: "App Landing",
  category: "usecase",
  subcategory: "software",
  description: "Mobile app landing page with screenshots and download links.",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "gallery", "testimonials", "faq", "cta"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "The App That Does It All", subtitle: "Download now for iOS and Android" },
    { id: "features-1", type: "features", title: "Features" },
    { id: "gallery-1", type: "gallery", title: "Screenshots" },
    { id: "testimonials-1", type: "testimonials", title: "User Reviews" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "cta-1", type: "cta", title: "Download Now" },
  ],
  features: ["App screenshots", "Download links", "Feature list"],
  tags: ["app", "mobile", "ios", "android", "download"],
});

export const blogTemplate: Template = createTemplate({
  id: "blog",
  name: "Blog",
  category: "usecase",
  subcategory: "content",
  description: "Blog template with article listings and categories.",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "blog", "newsletter", "about"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Welcome to the Blog", subtitle: "Insights, tips, and stories" },
    { id: "blog-1", type: "blog", title: "Latest Posts" },
    { id: "newsletter-1", type: "newsletter", title: "Subscribe" },
    { id: "about-1", type: "about", title: "About the Author" },
  ],
  features: ["Article listings", "Categories", "Newsletter signup"],
  tags: ["blog", "articles", "content", "writing", "news"],
});

export const resumeTemplate: Template = createTemplate({
  id: "resume",
  name: "Resume / CV",
  category: "usecase",
  subcategory: "personal",
  description: "Personal resume or CV website for job seekers.",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "about", "services", "portfolio", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "{businessName}", subtitle: "Full Stack Developer" },
    { id: "about-1", type: "about", title: "About Me" },
    { id: "services-1", type: "services", title: "Skills & Expertise" },
    { id: "portfolio-1", type: "portfolio", title: "Portfolio" },
    { id: "testimonials-1", type: "testimonials", title: "Recommendations" },
    { id: "contact-1", type: "contact", title: "Get In Touch" },
  ],
  features: ["Skills showcase", "Work history", "Downloadable resume"],
  tags: ["resume", "cv", "personal", "career", "job"],
});

export const eventTemplate: Template = createTemplate({
  id: "event",
  name: "Event",
  category: "usecase",
  subcategory: "events",
  description: "Event landing page for conferences, weddings, or gatherings.",
  tone: "elegant",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "about", "features", "team", "faq", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Event Name 2024", subtitle: "Join us for an unforgettable experience" },
    { id: "about-1", type: "about", title: "About the Event" },
    { id: "features-1", type: "features", title: "Schedule" },
    { id: "team-1", type: "team", title: "Speakers" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "contact-1", type: "contact", title: "Register Now" },
  ],
  features: ["Event schedule", "Speaker profiles", "Registration form"],
  tags: ["event", "conference", "wedding", "gathering", "seminar"],
});

export const comingSoonTemplate: Template = createTemplate({
  id: "coming-soon",
  name: "Coming Soon",
  category: "usecase",
  subcategory: "launch",
  description: "Simple coming soon page with email capture.",
  tone: "minimal",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "newsletter"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Something Amazing is Coming", subtitle: "We're working hard to bring you something special" },
    { id: "newsletter-1", type: "newsletter", title: "Be the First to Know" },
  ],
  features: ["Countdown timer", "Email capture", "Social links"],
  tags: ["coming soon", "launch", "preview", "teaser"],
});

export const podcastTemplate: Template = createTemplate({
  id: "podcast",
  name: "Podcast",
  category: "usecase",
  subcategory: "content",
  description: "Podcast website with episode listings and player.",
  tone: "friendly",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "about", "testimonials", "newsletter", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "The {businessName} Podcast", subtitle: "Conversations that matter" },
    { id: "features-1", type: "features", title: "Latest Episodes" },
    { id: "about-1", type: "about", title: "About the Show" },
    { id: "testimonials-1", type: "testimonials", title: "Listener Reviews" },
    { id: "newsletter-1", type: "newsletter", title: "Subscribe" },
    { id: "contact-1", type: "contact", title: "Contact" },
  ],
  features: ["Episode listings", "Audio player", "Subscribe links"],
  tags: ["podcast", "audio", "episodes", "show", "host"],
});

export const courseTemplate: Template = createTemplate({
  id: "course",
  name: "Online Course",
  category: "usecase",
  subcategory: "education",
  description: "Online course landing page with curriculum and enrollment.",
  tone: "professional",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "features", "about", "pricing", "testimonials", "faq", "cta"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "Master {topic}", subtitle: "The complete course from beginner to expert" },
    { id: "features-1", type: "features", title: "What You'll Learn" },
    { id: "about-1", type: "about", title: "About Your Instructor" },
    { id: "pricing-1", type: "pricing", title: "Pricing" },
    { id: "testimonials-1", type: "testimonials", title: "Student Success Stories" },
    { id: "faq-1", type: "faq", title: "FAQ" },
    { id: "cta-1", type: "cta", title: "Enroll Now" },
  ],
  features: ["Curriculum", "Instructor bio", "Enrollment form"],
  tags: ["course", "learning", "education", "online", "training"],
});

export const agencyTemplate: Template = createTemplate({
  id: "agency",
  name: "Agency",
  category: "usecase",
  subcategory: "services",
  description: "Digital agency website showcasing work and services.",
  tone: "bold",
  pages: [
    {
      name: "Home",
      slug: "/",
      sections: ["hero", "services", "portfolio", "team", "testimonials", "contact"] as SectionType[],
    },
  ],
  defaultSections: [
    { id: "hero-1", type: "hero", title: "We Build Digital Experiences", subtitle: "Creative agency for ambitious brands" },
    { id: "services-1", type: "services", title: "What We Do" },
    { id: "portfolio-1", type: "portfolio", title: "Our Work" },
    { id: "team-1", type: "team", title: "The Team" },
    { id: "testimonials-1", type: "testimonials", title: "Client Testimonials" },
    { id: "contact-1", type: "contact", title: "Start a Project" },
  ],
  features: ["Project portfolio", "Service listings", "Team showcase"],
  tags: ["agency", "digital", "creative", "marketing", "design"],
});

// ============================================
// TEMPLATE REGISTRY
// ============================================

// Business templates
export const businessTemplates: Template[] = [
  restaurantTemplate,
  portfolioTemplate,
  professionalServicesTemplate,
  healthcareTemplate,
  fitnessTemplate,
  realEstateTemplate,
  salonTemplate,
  constructionTemplate,
  automotiveTemplate,
  petServicesTemplate,
  educationTemplate,
  photographyTemplate,
  travelTemplate,
  nonprofitTemplate,
  techStartupTemplate,
];

// Use case templates
export const usecaseTemplates: Template[] = [
  ecommerceTemplate,
  saasTemplate,
  appLandingTemplate,
  blogTemplate,
  resumeTemplate,
  eventTemplate,
  comingSoonTemplate,
  podcastTemplate,
  courseTemplate,
  agencyTemplate,
];

// All templates
export const allTemplates: Template[] = [
  ...businessTemplates,
  ...usecaseTemplates,
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a template by ID
 */
export function getTemplate(id: string): Template | undefined {
  return allTemplates.find((t) => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: "business" | "usecase"): Template[] {
  return allTemplates.filter((t) => t.category === category);
}

/**
 * Get templates by industry
 */
export function getTemplatesByIndustry(industry: string): Template[] {
  return allTemplates.filter((t) => t.industry === industry);
}

/**
 * Get templates by tag
 */
export function getTemplatesByTag(tag: string): Template[] {
  return allTemplates.filter((t) => t.tags.includes(tag.toLowerCase()));
}

/**
 * Search templates by keyword
 */
export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return allTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some((tag) => tag.includes(lowerQuery))
  );
}

/**
 * Get recommended template for a business type
 */
export function getRecommendedTemplate(businessType: string): Template | undefined {
  const typeMap: Record<string, string> = {
    restaurant: "restaurant",
    cafe: "restaurant",
    bakery: "restaurant",
    portfolio: "portfolio",
    designer: "portfolio",
    photographer: "photography",
    consulting: "professional-services",
    law: "professional-services",
    accounting: "professional-services",
    medical: "healthcare",
    dental: "healthcare",
    fitness: "fitness",
    gym: "fitness",
    "real estate": "real-estate",
    salon: "salon",
    spa: "salon",
    construction: "construction",
    contractor: "construction",
    automotive: "automotive",
    pets: "pet-services",
    veterinary: "pet-services",
    education: "education",
    tutoring: "education",
    travel: "travel",
    nonprofit: "nonprofit",
    charity: "nonprofit",
    tech: "tech-startup",
    startup: "tech-startup",
    saas: "saas",
    software: "saas",
    app: "app-landing",
    blog: "blog",
    event: "event",
    conference: "event",
    podcast: "podcast",
    course: "course",
    agency: "agency",
    ecommerce: "ecommerce",
    store: "ecommerce",
  };

  const templateId = typeMap[businessType.toLowerCase()];
  return templateId ? getTemplate(templateId) : techStartupTemplate;
}

/**
 * Get total template count
 */
export function getTemplateCount(): number {
  return allTemplates.length;
}
