import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    // Fetch the website
    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BuilderAI/1.0; +https://builderai.com)",
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const html = await response.text();

    // Extract metadata
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    const description = descriptionMatch ? descriptionMatch[1].trim() : null;

    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : null;

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const ogDescription = ogDescMatch ? ogDescMatch[1].trim() : null;

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : null;

    // Extract colors from inline styles and CSS
    const colorMatches = html.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\([^)]+\)|rgba\([^)]+\)/g) || [];
    const uniqueColors = [...new Set(colorMatches)].slice(0, 10);

    // Extract contact info
    const emailMatch = html.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const email = emailMatch ? emailMatch[0] : null;

    const phoneMatch = html.match(/(?:\+?1[-.]?)?\(?[0-9]{3}\)?[-.]?[0-9]{3}[-.]?[0-9]{4}/);
    const phone = phoneMatch ? phoneMatch[0] : null;

    // Extract logo (common patterns)
    const logoMatch = html.match(/<img[^>]*(?:class=["'][^"']*logo[^"']*["']|id=["'][^"']*logo[^"']*["']|alt=["'][^"']*logo[^"']*["'])[^>]*src=["']([^"']+)["']/i)
      || html.match(/<img[^>]*src=["']([^"']+logo[^"']+)["']/i);
    let logoUrl = logoMatch ? logoMatch[1] : null;

    // Make logo URL absolute if relative
    if (logoUrl && !logoUrl.startsWith("http")) {
      const baseUrl = new URL(normalizedUrl);
      logoUrl = new URL(logoUrl, baseUrl.origin).href;
    }

    // Extract social links
    const socialLinks: Record<string, string> = {};
    const instagramMatch = html.match(/https?:\/\/(?:www\.)?instagram\.com\/([a-zA-Z0-9._]+)/);
    if (instagramMatch) socialLinks.instagram = instagramMatch[1];

    const facebookMatch = html.match(/https?:\/\/(?:www\.)?facebook\.com\/([a-zA-Z0-9.]+)/);
    if (facebookMatch) socialLinks.facebook = facebookMatch[1];

    const twitterMatch = html.match(/https?:\/\/(?:www\.)?(?:twitter|x)\.com\/([a-zA-Z0-9_]+)/);
    if (twitterMatch) socialLinks.twitter = twitterMatch[1];

    const linkedinMatch = html.match(/https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/([a-zA-Z0-9-]+)/);
    if (linkedinMatch) socialLinks.linkedin = linkedinMatch[1];

    return NextResponse.json({
      url: normalizedUrl,
      title: ogTitle || title,
      description: ogDescription || description,
      image: ogImage,
      logoUrl,
      colors: uniqueColors,
      contactInfo: {
        email,
        phone,
      },
      socialLinks: Object.keys(socialLinks).length > 0 ? socialLinks : undefined,
    });
  } catch (error) {
    console.error("Website analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}
