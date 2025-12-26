"use client";

type SectionData = {
  type?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    title?: string;
    description?: string;
    icon?: string;
    price?: string;
    name?: string;
    role?: string;
    quote?: string;
  }>;
  cta?: {
    text?: string;
    url?: string;
  };
};

type Props = {
  sections: Array<SectionData>;
  styles: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  businessName: string;
};

export function SitePreview({ sections, styles, businessName }: Props) {
  const primaryColor = styles.primaryColor || "#2563eb";
  const secondaryColor = styles.secondaryColor || "#1e293b";

  return (
    <div className="min-h-full">
      {/* Navigation */}
      <nav
        className="sticky top-0 z-50 px-6 py-4"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-white">{businessName}</span>
          <div className="flex items-center gap-6">
            {sections.slice(1, 5).map((section, index) => (
              <a
                key={index}
                href={`#${section.type}`}
                className="text-sm text-gray-300 hover:text-white"
              >
                {section.title || section.type}
              </a>
            ))}
            <button
              className="px-4 py-2 rounded-md text-sm font-medium text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Sections */}
      {sections.map((section, index) => (
        <Section
          key={index}
          section={section}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          isFirst={index === 0}
        />
      ))}

      {/* Footer */}
      <footer
        className="px-6 py-12"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Section({
  section,
  primaryColor,
  secondaryColor,
  isFirst,
}: {
  section: SectionData;
  primaryColor: string;
  secondaryColor: string;
  isFirst: boolean;
}) {
  const type = section.type || "default";

  if (type === "hero" || isFirst) {
    return (
      <section
        id={type}
        className="px-6 py-24 text-center"
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {section.title}
          </h1>
          {section.subtitle && (
            <p className="text-xl text-gray-300 mb-8">{section.subtitle}</p>
          )}
          {section.content && (
            <p className="text-lg text-gray-400 mb-8">{section.content}</p>
          )}
          {section.cta && (
            <button
              className="px-8 py-3 rounded-md text-lg font-medium text-white"
              style={{ backgroundColor: primaryColor }}
            >
              {section.cta.text}
            </button>
          )}
        </div>
      </section>
    );
  }

  if (type === "about") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-lg text-gray-600 mb-6">{section.subtitle}</p>
          )}
          {section.content && (
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          )}
        </div>
      </section>
    );
  }

  if (type === "features" || type === "services") {
    return (
      <section id={type} className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-center text-gray-600 mb-12">{section.subtitle}</p>
          )}
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: secondaryColor }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "menu") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="text-center text-gray-600 mb-12">{section.subtitle}</p>
          )}
          <div className="space-y-6">
            {section.items?.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start border-b pb-4"
              >
                <div>
                  <h3
                    className="font-semibold"
                    style={{ color: secondaryColor }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {item.price && (
                  <span
                    className="font-bold"
                    style={{ color: primaryColor }}
                  >
                    {item.price}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "testimonials") {
    return (
      <section id={type} className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  &ldquo;{item.quote || item.description}&rdquo;
                </p>
                <p className="font-semibold" style={{ color: secondaryColor }}>
                  {item.name || item.title}
                </p>
                {item.role && (
                  <p className="text-sm text-gray-500">{item.role}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "team") {
    return (
      <section id={type} className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: secondaryColor }}
          >
            {section.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {section.items?.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${primaryColor}20` }}
                >
                  {item.icon || "👤"}
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: secondaryColor }}
                >
                  {item.title || item.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {item.role || "Team Member"}
                </p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "contact" || type === "cta") {
    return (
      <section
        id={type}
        className="px-6 py-20"
        style={{ backgroundColor: type === "cta" ? primaryColor : "white" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-3xl font-bold mb-4 ${
              type === "cta" ? "text-white" : ""
            }`}
            style={type === "cta" ? {} : { color: secondaryColor }}
          >
            {section.title}
          </h2>
          {section.content && (
            <p
              className={`mb-8 ${
                type === "cta" ? "text-white/80" : "text-gray-600"
              }`}
            >
              {section.content}
            </p>
          )}
          {section.cta && (
            <button
              className={`px-8 py-3 rounded-md text-lg font-medium ${
                type === "cta"
                  ? "bg-white"
                  : "text-white"
              }`}
              style={
                type === "cta"
                  ? { color: primaryColor }
                  : { backgroundColor: primaryColor }
              }
            >
              {section.cta.text}
            </button>
          )}
        </div>
      </section>
    );
  }

  // Default section
  return (
    <section id={type} className="px-6 py-20 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: secondaryColor }}
        >
          {section.title}
        </h2>
        {section.content && (
          <p className="text-gray-600">{section.content}</p>
        )}
      </div>
    </section>
  );
}
