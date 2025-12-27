"use client";

import React, { useState } from "react";
import type { BlockComponentProps } from "../../renderer/block-renderer";
import { cn } from "@repo/ui";

export type GalleryContent = {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: Array<{
    src: string;
    alt?: string;
    caption?: string;
    category?: string;
  }>;
  categories?: string[];
  enableFiltering?: boolean;
  enableLightbox?: boolean;
};

export type GalleryVariantProps = {
  content: GalleryContent;
  className?: string;
};

export function GalleryBlock({ content, variant, className }: BlockComponentProps) {
  const galleryContent = content as GalleryContent;

  switch (variant) {
    case "grid":
      return <GalleryGrid content={galleryContent} className={className} />;
    case "masonry":
      return <GalleryMasonry content={galleryContent} className={className} />;
    case "carousel":
      return <GalleryCarousel content={galleryContent} className={className} />;
    case "featured":
      return <GalleryFeatured content={galleryContent} className={className} />;
    default:
      return <GalleryGrid content={galleryContent} className={className} />;
  }
}

function GalleryGrid({ content, className }: GalleryVariantProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages = activeCategory
    ? content.images?.filter((img) => img.category === activeCategory)
    : content.images;

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-4">
                {content.title}
              </h2>
            )}
            {content.description && (
              <p className="text-[var(--color-text-secondary,#475569)] max-w-2xl mx-auto">
                {content.description}
              </p>
            )}
          </div>
        )}

        {/* Category Filters */}
        {content.enableFiltering && content.categories && content.categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                "px-4 py-2 rounded-full transition-colors",
                !activeCategory
                  ? "bg-[var(--color-primary,#2563eb)] text-white"
                  : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-secondary,#475569)] hover:bg-[var(--color-border,#e2e8f0)]"
              )}
            >
              All
            </button>
            {content.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full transition-colors",
                  activeCategory === category
                    ? "bg-[var(--color-primary,#2563eb)] text-white"
                    : "bg-[var(--color-surface,#f8fafc)] text-[var(--color-text-secondary,#475569)] hover:bg-[var(--color-border,#e2e8f0)]"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages?.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => content.enableLightbox && setLightboxImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {image.caption && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm">{image.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70"
              onClick={() => setLightboxImage(null)}
            >
              &times;
            </button>
            <img
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryMasonry({ content, className }: GalleryVariantProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)] mb-4">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {content.images?.map((image, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => content.enableLightbox && setLightboxImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt || `Gallery image ${index + 1}`}
                className="w-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:opacity-70"
              onClick={() => setLightboxImage(null)}
            >
              &times;
            </button>
            <img
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryCarousel({ content, className }: GalleryVariantProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = content.images || [];

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {/* Carousel */}
        {images.length > 0 && (
          <div className="relative">
            {/* Main Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt || `Slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Caption */}
            {images[currentIndex].caption && (
              <p className="text-center text-[var(--color-text-secondary,#475569)] mt-4">
                {images[currentIndex].caption}
              </p>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Previous"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              aria-label="Next"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentIndex
                      ? "bg-[var(--color-primary,#2563eb)]"
                      : "bg-[var(--color-border,#e2e8f0)]"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function GalleryFeatured({ content, className }: GalleryVariantProps) {
  const images = content.images || [];
  const [featuredIndex, setFeaturedIndex] = useState(0);

  return (
    <section className={cn("py-16 md:py-24 bg-[var(--color-background,#ffffff)]", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(content.title || content.subtitle) && (
          <div className="text-center mb-12">
            {content.subtitle && (
              <span className="text-[var(--color-primary,#2563eb)] font-medium mb-2 block">
                {content.subtitle}
              </span>
            )}
            {content.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary,#0f172a)]">
                {content.title}
              </h2>
            )}
          </div>
        )}

        {images.length > 0 && (
          <div className="grid md:grid-cols-4 gap-4">
            {/* Featured Image */}
            <div className="md:col-span-3 aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src={images[featuredIndex].src}
                alt={images[featuredIndex].alt || "Featured image"}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setFeaturedIndex(index)}
                  className={cn(
                    "flex-shrink-0 aspect-square w-20 md:w-full overflow-hidden rounded-lg transition-opacity",
                    index === featuredIndex ? "ring-2 ring-[var(--color-primary,#2563eb)]" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
