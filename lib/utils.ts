import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(email: string): string {
  if (!email) return 'U';

  const parts = email.split('@')[0].split(/[._-]/);
  const initials = parts
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  return initials || 'U';
}

/**
 * Encodes a URL, specifically handling spaces in S3/Contabo storage paths
 * @param url The raw URL from the database
 * @returns The encoded URL safe for browser usage
 */
export function encodeS3Url(url: string | null | undefined): string {
  if (!url) return '';

  // If it's already encoded or doesn't have spaces, we can still run it through URL
  // to ensure it's valid, but specifically we want to handle raw paths with spaces
  try {
    // Check if it's already a full URL
    const urlObj = new URL(url);

    // Check if it's a Contabo URL
    if (urlObj.hostname.includes('contabostorage.com')) {
      // In S3-style URLs, the pathname needs to be encoded, but we must preserve slashes
      const segments = urlObj.pathname.split('/');
      const encodedSegments = segments.map(segment => encodeURIComponent(segment));
      urlObj.pathname = encodedSegments.join('/');

      // Some browsers/players have issues with double encoded paths, 
      // but URL() handles the structure. We need to decode the %2F back to /
      // Actually urlObj.pathname = ... already handles the / correctly if we set it as a string
      return urlObj.toString().replace(/%2F/g, '/');
    }

    return url;
  } catch (e) {
    // If not a valid URL, it might be a relative path or just a broken string
    return url.replace(/ /g, '%20');
  }
}