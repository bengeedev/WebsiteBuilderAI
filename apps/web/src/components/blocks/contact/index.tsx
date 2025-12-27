"use client";

import React from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";
import { SectionHeader } from "../features";

export type ContactContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  mapUrl?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  formFields?: Array<{
    type: string;
    name: string;
    label: string;
    required?: boolean;
    placeholder?: string;
  }>;
};

export type ContactVariantProps = {
  content: ContactContent;
  className?: string;
};

export function ContactBlock({ content, variant, className }: BlockComponentProps) {
  const contactContent = content as ContactContent;

  switch (variant) {
    case "split":
      return <ContactSplit content={contactContent} className={className} />;
    case "centered-form":
      return <ContactCenteredForm content={contactContent} className={className} />;
    case "info-only":
      return <ContactInfoOnly content={contactContent} className={className} />;
    case "with-map":
      return <ContactWithMap content={contactContent} className={className} />;
    default:
      return <ContactSplit content={contactContent} className={className} />;
  }
}

function ContactSplit({ content, className }: ContactVariantProps) {
  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 font-[var(--font-heading)]">
            Get in Touch
          </h3>
          <div className="space-y-4">
            {content.email && (
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-primary)]">✉️</span>
                <a
                  href={`mailto:${content.email}`}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                >
                  {content.email}
                </a>
              </div>
            )}
            {content.phone && (
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-primary)]">📞</span>
                <a
                  href={`tel:${content.phone}`}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                >
                  {content.phone}
                </a>
              </div>
            )}
            {content.address && (
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">📍</span>
                <span className="text-[var(--color-text-secondary)]">
                  {content.address}
                </span>
              </div>
            )}
          </div>

          {content.socialLinks && content.socialLinks.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {content.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <ContactForm fields={content.formFields} />
      </div>
    </div>
  );
}

function ContactCenteredForm({ content, className }: ContactVariantProps) {
  return (
    <div className={cn("max-w-2xl mx-auto", className)}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
        centered
      />
      <ContactForm fields={content.formFields} />
    </div>
  );
}

function ContactInfoOnly({ content, className }: ContactVariantProps) {
  return (
    <div className={cn("text-center", className)}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
        centered
      />

      <div className="grid sm:grid-cols-3 gap-8 mt-8">
        {content.email && (
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <span className="text-2xl mb-3 block">✉️</span>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Email</h4>
            <a
              href={`mailto:${content.email}`}
              className="text-[var(--color-primary)] hover:underline"
            >
              {content.email}
            </a>
          </div>
        )}
        {content.phone && (
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <span className="text-2xl mb-3 block">📞</span>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Phone</h4>
            <a
              href={`tel:${content.phone}`}
              className="text-[var(--color-primary)] hover:underline"
            >
              {content.phone}
            </a>
          </div>
        )}
        {content.address && (
          <div className="p-6 rounded-xl bg-[var(--color-surface)]">
            <span className="text-2xl mb-3 block">📍</span>
            <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Address</h4>
            <span className="text-[var(--color-text-secondary)]">{content.address}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactWithMap({ content, className }: ContactVariantProps) {
  return (
    <div className={className}>
      <SectionHeader
        title={content.title}
        subtitle={content.subtitle}
        description={content.description}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4 mb-8">
            {content.email && (
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-primary)]">✉️</span>
                <a href={`mailto:${content.email}`} className="hover:text-[var(--color-primary)]">
                  {content.email}
                </a>
              </div>
            )}
            {content.phone && (
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-primary)]">📞</span>
                <a href={`tel:${content.phone}`} className="hover:text-[var(--color-primary)]">
                  {content.phone}
                </a>
              </div>
            )}
            {content.address && (
              <div className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">📍</span>
                <span>{content.address}</span>
              </div>
            )}
          </div>
          <ContactForm fields={content.formFields} />
        </div>

        {/* Map */}
        <div className="aspect-square lg:aspect-auto rounded-xl overflow-hidden bg-[var(--color-surface)]">
          {content.mapUrl ? (
            <iframe
              src={content.mapUrl}
              className="w-full h-full min-h-[300px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full min-h-[300px] flex items-center justify-center text-[var(--color-text-muted)]">
              Map will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactForm({ fields }: { fields?: ContactContent["formFields"] }) {
  const defaultFields = [
    { type: "text", name: "name", label: "Name", required: true, placeholder: "Your name" },
    { type: "email", name: "email", label: "Email", required: true, placeholder: "your@email.com" },
    { type: "textarea", name: "message", label: "Message", required: true, placeholder: "Your message..." },
  ];

  const formFields = fields && fields.length > 0 ? fields : defaultFields;

  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      {formFields.map((field, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full px-4 py-2 rounded-lg border border-[var(--color-border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
      >
        Send Message
      </button>
    </form>
  );
}
