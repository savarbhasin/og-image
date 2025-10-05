/**
 * Client-side OG utilities for browser environments
 */

import pako from 'pako';

export interface OGImageData {
  title: string;
  description: string;
  image?: string;
}

/**
 * Convert base64 to base64url (URL-safe)
 */
function base64ToBase64Url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Compress and encode data for URL (client-side)
 */
export function compressDataClient(data: OGImageData): string {
  const jsonString = JSON.stringify(data);
  const compressed = pako.deflate(jsonString);
  
  // Convert Uint8Array to base64
  let binary = '';
  const bytes = new Uint8Array(compressed);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  
  return base64ToBase64Url(base64);
}

/**
 * Get the base URL for the application (client-side)
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
}

/**
 * Generate OG image URL from data (client-side)
 */
export function generateOGImageUrl(data: OGImageData): string {
  const baseUrl = getBaseUrl();
  const encodedData = compressDataClient(data);
  return `${baseUrl}/api/og?data=${encodedData}`;
}
