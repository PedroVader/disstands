import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const FALLBACK_IMAGE = "https://placehold.co/800x600/1A1A1A/FFFFFF?text=Sin+imagen";

/** Ensure an image URL is valid for next/image (absolute or starts with /) */
export function safeImageUrl(url: string | null | undefined): string {
  if (!url) return FALLBACK_IMAGE;
  if (url.startsWith("/") || url.startsWith("http://") || url.startsWith("https://")) return url;
  // Bare domain or other invalid URL — try prefixing https://
  if (url.includes(".")) return `https://${url}`;
  return FALLBACK_IMAGE;
}
