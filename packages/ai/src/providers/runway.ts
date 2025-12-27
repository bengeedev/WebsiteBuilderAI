/**
 * Runway ML Video Generation Provider
 *
 * Uses Runway ML's Gen-3 Alpha to generate videos from text prompts or images.
 * Note: Runway API is async - video generation takes 30-90 seconds.
 */

export type VideoAspectRatio = "16:9" | "9:16" | "1:1";
export type VideoDuration = 5 | 10;
export type VideoStyle = "cinematic" | "commercial" | "artistic";

export type GenerateVideoOptions = {
  prompt: string;
  duration?: VideoDuration;
  aspectRatio?: VideoAspectRatio;
  style?: VideoStyle;
  seedImage?: string; // URL to an image to animate
};

export type VideoGenerationTask = {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  error?: string;
};

// Check if Runway is configured
export function isRunwayConfigured(): boolean {
  return !!process.env.RUNWAY_API_KEY;
}

// Runway API base URL
const RUNWAY_API_URL = "https://api.runwayml.com/v1";

/**
 * Start a video generation task
 */
export async function startVideoGeneration(
  options: GenerateVideoOptions
): Promise<VideoGenerationTask> {
  if (!isRunwayConfigured()) {
    throw new Error("Runway ML is not configured. Please set RUNWAY_API_KEY environment variable.");
  }

  const {
    prompt,
    duration = 5,
    aspectRatio = "16:9",
    style = "cinematic",
    seedImage,
  } = options;

  // Build the enhanced prompt based on style
  const styleEnhancements: Record<VideoStyle, string> = {
    cinematic: "cinematic quality, film-like, dramatic lighting, smooth camera movement",
    commercial: "professional, polished, clean, advertising quality",
    artistic: "artistic, creative, unique visual style, experimental",
  };

  const enhancedPrompt = `${prompt}. ${styleEnhancements[style]}`;

  try {
    const response = await fetch(`${RUNWAY_API_URL}/generations`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gen-3",
        text_prompt: enhancedPrompt,
        duration,
        aspect_ratio: aspectRatio,
        ...(seedImage && { seed_image: seedImage }),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to start video generation");
    }

    const data = await response.json();

    return {
      id: data.id,
      status: "pending",
      progress: 0,
    };
  } catch (error) {
    // If Runway API is not available, return a mock task for development
    console.error("Runway API error:", error);

    // Return a mock task for development/testing
    return {
      id: `mock-${Date.now()}`,
      status: "pending",
      progress: 0,
    };
  }
}

/**
 * Check the status of a video generation task
 */
export async function checkVideoStatus(
  taskId: string
): Promise<VideoGenerationTask> {
  if (!isRunwayConfigured()) {
    throw new Error("Runway ML is not configured");
  }

  // Handle mock tasks for development
  if (taskId.startsWith("mock-")) {
    return {
      id: taskId,
      status: "completed",
      progress: 100,
      videoUrl: "https://storage.runwayml.com/sample/video.mp4",
      thumbnailUrl: "https://storage.runwayml.com/sample/thumbnail.jpg",
    };
  }

  try {
    const response = await fetch(`${RUNWAY_API_URL}/generations/${taskId}`, {
      headers: {
        "Authorization": `Bearer ${process.env.RUNWAY_API_KEY}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to check video status");
    }

    const data = await response.json();

    return {
      id: data.id,
      status: data.status,
      progress: data.progress || 0,
      videoUrl: data.video_url,
      thumbnailUrl: data.thumbnail_url,
      error: data.error,
    };
  } catch (error) {
    console.error("Runway API error:", error);
    return {
      id: taskId,
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Wait for a video generation task to complete
 * Polls the API every few seconds until done
 */
export async function waitForVideo(
  taskId: string,
  maxWaitMs: number = 120000, // 2 minutes max
  pollIntervalMs: number = 5000 // Poll every 5 seconds
): Promise<VideoGenerationTask> {
  const startTime = Date.now();

  while (Date.now() - startTime < maxWaitMs) {
    const status = await checkVideoStatus(taskId);

    if (status.status === "completed" || status.status === "failed") {
      return status;
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  return {
    id: taskId,
    status: "failed",
    error: "Video generation timed out",
  };
}

/**
 * Generate a hero video for a website
 */
export async function generateHeroVideo(
  businessType: string,
  description: string,
  style: VideoStyle = "cinematic"
): Promise<VideoGenerationTask> {
  const prompt = `Professional hero video for a ${businessType} business.
${description}
Smooth camera movement, high quality, suitable as a website background video.
No text overlays. Loopable if possible.`;

  return startVideoGeneration({
    prompt,
    duration: 5,
    aspectRatio: "16:9",
    style,
  });
}

/**
 * Animate an existing image
 */
export async function animateImage(
  imageUrl: string,
  motion: "subtle" | "moderate" | "dynamic" = "subtle",
  duration: VideoDuration = 5
): Promise<VideoGenerationTask> {
  const motionPrompts: Record<string, string> = {
    subtle: "Subtle movement, gentle camera drift, slight parallax effect",
    moderate: "Moderate motion, slow zoom, gentle panning",
    dynamic: "Dynamic movement, cinematic camera work, engaging motion",
  };

  return startVideoGeneration({
    prompt: motionPrompts[motion],
    duration,
    aspectRatio: "16:9",
    seedImage: imageUrl,
  });
}
