"use client";

import { useState, useCallback, useRef } from "react";

type UploadZoneProps = {
  projectId: string;
  onUploadComplete: (asset: {
    id: string;
    name: string;
    type: string;
    url: string;
  }) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  children?: React.ReactNode;
};

type UploadState = "idle" | "dragging" | "uploading" | "complete" | "error";

export function UploadZone({
  projectId,
  onUploadComplete,
  onUploadError,
  accept = "image/*,video/*,.pdf",
  maxSizeMB = 10,
  className = "",
  children,
}: UploadZoneProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setState("uploading");
    setProgress(0);
    setErrorMessage(null);

    try {
      // Step 1: Get presigned URL
      const presignRes = await fetch("/api/upload/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignRes.ok) {
        const error = await presignRes.json();
        throw new Error(error.error || "Failed to get upload URL");
      }

      const { uploadUrl, key, publicUrl, assetType } = await presignRes.json();
      setProgress(20);

      // Step 2: Upload directly to R2
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file");
      }
      setProgress(80);

      // Step 3: Get image dimensions if it's an image
      let width: number | undefined;
      let height: number | undefined;
      if (file.type.startsWith("image/")) {
        const dimensions = await getImageDimensions(file);
        width = dimensions.width;
        height = dimensions.height;
      }

      // Step 4: Confirm upload and create asset record
      const confirmRes = await fetch("/api/upload/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          key,
          publicUrl,
          filename: file.name,
          assetType,
          mimeType: file.type,
          size: file.size,
          width,
          height,
        }),
      });

      if (!confirmRes.ok) {
        const error = await confirmRes.json();
        throw new Error(error.error || "Failed to confirm upload");
      }

      const { asset } = await confirmRes.json();
      setProgress(100);
      setState("complete");

      // Notify parent
      onUploadComplete(asset);

      // Reset after a short delay
      setTimeout(() => {
        setState("idle");
        setProgress(0);
      }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setErrorMessage(message);
      setState("error");
      onUploadError?.(message);

      // Reset after showing error
      setTimeout(() => {
        setState("idle");
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setState("idle");

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        // Check file size
        const file = files[0];
        if (file.size > maxSizeMB * 1024 * 1024) {
          setErrorMessage(`File size exceeds ${maxSizeMB}MB limit`);
          setState("error");
          return;
        }
        uploadFile(file);
      }
    },
    [maxSizeMB]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState("dragging");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState("idle");
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxSizeMB * 1024 * 1024) {
        setErrorMessage(`File size exceeds ${maxSizeMB}MB limit`);
        setState("error");
        return;
      }
      uploadFile(file);
    }
    // Reset input
    e.target.value = "";
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`
        relative cursor-pointer rounded-lg border-2 border-dashed p-6
        transition-all duration-200
        ${state === "dragging" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}
        ${state === "uploading" ? "pointer-events-none" : ""}
        ${state === "error" ? "border-red-500 bg-red-50 dark:bg-red-950/20" : ""}
        ${state === "complete" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : ""}
        ${className}
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {state === "idle" && (
        <div className="text-center">
          {children || (
            <>
              <svg
                className="mx-auto h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-medium text-primary">Click to upload</span>{" "}
                or drag and drop
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Images, videos, or PDFs up to {maxSizeMB}MB
              </p>
            </>
          )}
        </div>
      )}

      {state === "dragging" && (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <p className="mt-2 font-medium text-primary">Drop to upload</p>
        </div>
      )}

      {state === "uploading" && (
        <div className="text-center">
          <div className="mx-auto h-12 w-12">
            <svg
              className="h-12 w-12 animate-spin text-primary"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
          <p className="mt-2 font-medium">Uploading...</p>
          <div className="mx-auto mt-2 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {state === "complete" && (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="mt-2 font-medium text-green-600">Upload complete!</p>
        </div>
      )}

      {state === "error" && (
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <p className="mt-2 font-medium text-red-600">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

// Helper to get image dimensions
function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      resolve({ width: 0, height: 0 });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
}
