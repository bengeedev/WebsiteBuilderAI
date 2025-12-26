import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create initial templates
  const templates = [
    {
      id: "template-restaurant",
      name: "Restaurant",
      category: "food",
      description: "Perfect for restaurants, cafes, and food businesses",
      tags: ["restaurant", "food", "cafe", "menu"],
      structure: {
        sections: [
          { type: "hero", name: "Hero" },
          { type: "about", name: "About Us" },
          { type: "menu", name: "Menu" },
          { type: "gallery", name: "Gallery" },
          { type: "testimonials", name: "Reviews" },
          { type: "contact", name: "Contact" },
        ],
      },
      defaultStyles: {
        primaryColor: "#c41e3a",
        secondaryColor: "#2c2c2c",
        fontFamily: "Playfair Display",
        bodyFont: "Open Sans",
      },
    },
    {
      id: "template-portfolio",
      name: "Portfolio",
      category: "creative",
      description: "Showcase your work with this elegant portfolio template",
      tags: ["portfolio", "creative", "artist", "designer"],
      structure: {
        sections: [
          { type: "hero", name: "Hero" },
          { type: "about", name: "About Me" },
          { type: "portfolio", name: "Work" },
          { type: "skills", name: "Skills" },
          { type: "testimonials", name: "Testimonials" },
          { type: "contact", name: "Contact" },
        ],
      },
      defaultStyles: {
        primaryColor: "#6366f1",
        secondaryColor: "#1f2937",
        fontFamily: "Inter",
        bodyFont: "Inter",
      },
    },
    {
      id: "template-business",
      name: "Business",
      category: "business",
      description: "Professional template for businesses and services",
      tags: ["business", "corporate", "professional", "services"],
      structure: {
        sections: [
          { type: "hero", name: "Hero" },
          { type: "features", name: "Services" },
          { type: "about", name: "About Us" },
          { type: "team", name: "Our Team" },
          { type: "testimonials", name: "Testimonials" },
          { type: "cta", name: "Call to Action" },
          { type: "contact", name: "Contact" },
        ],
      },
      defaultStyles: {
        primaryColor: "#2563eb",
        secondaryColor: "#1e293b",
        fontFamily: "Inter",
        bodyFont: "Inter",
      },
    },
    {
      id: "template-ecommerce",
      name: "E-commerce",
      category: "ecommerce",
      description: "Sell your products online with this store template",
      tags: ["ecommerce", "shop", "store", "products"],
      structure: {
        sections: [
          { type: "hero", name: "Hero" },
          { type: "featured-products", name: "Featured Products" },
          { type: "categories", name: "Categories" },
          { type: "about", name: "About Us" },
          { type: "testimonials", name: "Reviews" },
          { type: "newsletter", name: "Newsletter" },
        ],
      },
      defaultStyles: {
        primaryColor: "#059669",
        secondaryColor: "#111827",
        fontFamily: "Poppins",
        bodyFont: "Inter",
      },
    },
    {
      id: "template-blog",
      name: "Blog",
      category: "blog",
      description: "Share your stories with this clean blog template",
      tags: ["blog", "writer", "content", "articles"],
      structure: {
        sections: [
          { type: "hero", name: "Hero" },
          { type: "featured-posts", name: "Featured Posts" },
          { type: "categories", name: "Categories" },
          { type: "about", name: "About" },
          { type: "newsletter", name: "Subscribe" },
        ],
      },
      defaultStyles: {
        primaryColor: "#7c3aed",
        secondaryColor: "#18181b",
        fontFamily: "Merriweather",
        bodyFont: "Source Sans Pro",
      },
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: template,
      create: template,
    });
  }

  console.log(`Seeded ${templates.length} templates`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
