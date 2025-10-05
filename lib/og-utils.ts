/**
 * Utility functions for OG image generation
 */

import { deflateSync, inflateSync } from 'zlib';

export interface OGImageData {
  title: string;
  description: string;
  image?: string;
}

/**
 * Get the base URL for the application
 * Falls back to localhost if not set
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return 'http://localhost:3000';
}

/**
 * Convert base64 to base64url (URL-safe)
 */
function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Convert base64url to base64
 */
function base64UrlToBase64(base64url: string): string {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if needed
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64;
}

/**
 * Compress and encode data for URL (server-side)
 */
export function compressData(data: OGImageData): string {
  const jsonString = JSON.stringify(data);
  const compressed = deflateSync(jsonString);
  const base64 = compressed.toString('base64');
  return base64ToBase64Url(base64);
}

/**
 * Decode and decompress data from URL (server-side)
 */
export function decompressData(encodedData: string): OGImageData {
  const base64 = base64UrlToBase64(encodedData);
  const compressed = Buffer.from(base64, 'base64');
  const decompressed = inflateSync(Uint8Array.from(compressed));
  return JSON.parse(decompressed.toString('utf-8'));
}

/**
 * Generate OG image URL from data (server-side)
 */
export function generateOGImageUrl(data: OGImageData): string {
  const baseUrl = getBaseUrl();
  const encodedData = compressData(data);
  return `${baseUrl}/api/og?data=${encodedData}`;
}

/**
 * Validate and sanitize OG image data
 */
export function validateOGData(data: any): { valid: boolean; error?: string; data?: OGImageData } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid data format' };
  }

  const { title, description, image } = data;

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return { valid: false, error: 'Title is required and must be a non-empty string' };
  }

  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    return { valid: false, error: 'Description is required and must be a non-empty string' };
  }

  if (title.length > 500) {
    return { valid: false, error: 'Title is too long (max 500 characters)' };
  }

  if (description.length > 1000) {
    return { valid: false, error: 'Description is too long (max 1000 characters)' };
  }

  if (image && typeof image !== 'string') {
    return { valid: false, error: 'Image must be a string URL' };
  }

  // Basic URL validation for image
  if (image) {
    try {
      new URL(image);
    } catch {
      return { valid: false, error: 'Image must be a valid URL' };
    }
  }

  return {
    valid: true,
    data: {
      title: title.trim(),
      description: description.trim(),
      image: image?.trim(),
    },
  };
}

/**
 * Get branding configuration
 */
export function getBrandingConfig() {
  return {
    name: process.env.NEXT_PUBLIC_BRAND_NAME || 'Your Brand',
    logo: process.env.NEXT_PUBLIC_BRAND_LOGO || '',
    color: process.env.NEXT_PUBLIC_BRAND_COLOR || '#b19eff',
  };
}

/**
 * Truncate text to a maximum length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
}
