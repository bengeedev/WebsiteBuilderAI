import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Cloudflare R2 Client Configuration
 *
 * R2 is S3-compatible, so we use the AWS SDK
 */

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "websitebuilder-assets";
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || "";

// Check if R2 is configured
export function isR2Configured(): boolean {
  return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);
}

// Create S3 client for R2
export function getR2Client(): S3Client {
  if (!isR2Configured()) {
    throw new Error("Cloudflare R2 is not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY environment variables.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Asset types supported
 */
export type AssetType = "image" | "logo" | "video" | "document";

/**
 * Generate a presigned URL for uploading a file directly to R2
 */
export async function getUploadPresignedUrl(options: {
  projectId: string;
  filename: string;
  contentType: string;
  assetType: AssetType;
}): Promise<{ uploadUrl: string; key: string; publicUrl: string }> {
  const { projectId, filename, contentType, assetType } = options;

  // Generate a unique key for the file
  const timestamp = Date.now();
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `${projectId}/${assetType}/${timestamp}-${sanitizedFilename}`;

  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  // Generate presigned URL (valid for 1 hour)
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

  // Public URL for accessing the file after upload
  const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

  return {
    uploadUrl,
    key,
    publicUrl,
  };
}

/**
 * Generate a presigned URL for reading a file from R2
 */
export async function getDownloadPresignedUrl(key: string): Promise<string> {
  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(client, command, { expiresIn: 3600 });
}

/**
 * Delete a file from R2
 */
export async function deleteFromR2(key: string): Promise<void> {
  const client = getR2Client();
  const command = new DeleteObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
  });

  await client.send(command);
}

/**
 * Get the public URL for a stored asset
 */
export function getAssetPublicUrl(key: string): string {
  if (R2_PUBLIC_URL) {
    return `${R2_PUBLIC_URL}/${key}`;
  }
  return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}

/**
 * Determine asset type from MIME type
 */
export function getAssetTypeFromMime(mimeType: string): AssetType {
  if (mimeType.startsWith("image/")) {
    return "image";
  }
  if (mimeType.startsWith("video/")) {
    return "video";
  }
  return "document";
}

/**
 * Validate file for upload
 */
export function validateFile(file: {
  size: number;
  type: string;
}): { valid: boolean; error?: string } {
  // Max file sizes in bytes
  const maxSizes: Record<string, number> = {
    image: 10 * 1024 * 1024, // 10MB
    video: 100 * 1024 * 1024, // 100MB
    document: 5 * 1024 * 1024, // 5MB
  };

  // Allowed MIME types
  const allowedTypes = [
    // Images
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    // Videos
    "video/mp4",
    "video/webm",
    "video/quicktime",
    // Documents
    "application/pdf",
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  const assetType = getAssetTypeFromMime(file.type);
  const maxSize = maxSizes[assetType] || maxSizes.document;

  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `File size exceeds maximum of ${maxSizeMB}MB for ${assetType}s`,
    };
  }

  return { valid: true };
}
