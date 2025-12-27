"use client";

import { useState, useEffect } from "react";

type Asset = {
  id: string;
  name: string;
  type: string;
  url: string;
  metadata?: {
    mimeType?: string;
    size?: number;
    width?: number;
    height?: number;
    source?: string;
  };
  createdAt: string;
};

type AssetGridProps = {
  projectId: string;
  type?: "image" | "logo" | "video" | "document" | "all";
  onSelect?: (asset: Asset) => void;
  onDelete?: (assetId: string) => void;
  selectable?: boolean;
  className?: string;
};

export function AssetGrid({
  projectId,
  type = "all",
  onSelect,
  onDelete,
  selectable = false,
  className = "",
}: AssetGridProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ projectId });
      if (type !== "all") {
        params.set("type", type);
      }

      const res = await fetch(`/api/assets?${params}`);
      if (!res.ok) throw new Error("Failed to fetch assets");

      const data = await res.json();
      setAssets(data.assets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [projectId, type]);

  const handleDelete = async (assetId: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await fetch(`/api/assets/${assetId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete asset");

      setAssets((prev) => prev.filter((a) => a.id !== assetId));
      onDelete?.(assetId);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleSelect = (asset: Asset) => {
    if (selectable) {
      setSelectedId(asset.id);
      onSelect?.(asset);
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-lg border border-red-200 bg-red-50 p-4 text-center dark:border-red-900 dark:bg-red-950/20 ${className}`}>
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchAssets}
          className="mt-2 text-sm text-red-600 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className={`rounded-lg border border-dashed p-8 text-center ${className}`}>
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-2 text-sm text-muted-foreground">No assets yet</p>
        <p className="text-xs text-muted-foreground">
          Upload images, videos, or documents to get started
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {assets.map((asset) => (
        <div
          key={asset.id}
          onClick={() => handleSelect(asset)}
          className={`group relative aspect-square overflow-hidden rounded-lg border bg-muted ${
            selectable ? "cursor-pointer" : ""
          } ${
            selectedId === asset.id
              ? "ring-2 ring-primary ring-offset-2"
              : "hover:ring-1 hover:ring-primary/50"
          }`}
        >
          {/* Thumbnail */}
          {asset.type === "IMAGE" || asset.type === "LOGO" ? (
            <img
              src={asset.url}
              alt={asset.name}
              className="h-full w-full object-cover"
            />
          ) : asset.type === "VIDEO" ? (
            <div className="flex h-full w-full items-center justify-center bg-gray-900">
              <svg
                className="h-12 w-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
              <svg
                className="h-12 w-12 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          )}

          {/* AI Generated Badge */}
          {asset.metadata?.source === "ai_generated" && (
            <div className="absolute left-2 top-2 rounded-full bg-purple-500 px-2 py-0.5 text-[10px] font-medium text-white">
              AI
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
            <p className="truncate text-xs font-medium text-white">
              {asset.name}
            </p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[10px] text-white/80">
                {formatFileSize(asset.metadata?.size)}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(asset.id);
                }}
                className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
