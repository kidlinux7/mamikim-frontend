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

  try {
    // Attempt to parse as a full URL
    let urlObj: URL;
    try {
      urlObj = new URL(url);
    } catch (e) {
      // If it's just a path (e.g. "videos/..."), construct the full URL
      const endpoint = process.env.NEXT_PUBLIC_CONTABO_ENDPOINT || 'https://eu2.contabostorage.com';
      const tenantId = process.env.NEXT_PUBLIC_CONTABO_TENANT_ID || '7f46490e5a1444b7936e15fd196f9685';
      const bucket = process.env.NEXT_PUBLIC_CONTABO_BUCKET_NAME || 'coursecontent';

      const cleanPath = url.startsWith('/') ? url.substring(1) : url;
      // Handle if the path already starts with the bucket name
      const finalPath = cleanPath.startsWith(`${bucket}/`)
        ? cleanPath.substring(bucket.length + 1)
        : cleanPath;

      const encodedKey = finalPath.split('/').map(s => encodeURIComponent(s)).join('/');
      return `${endpoint}/${tenantId}:${bucket}/${encodedKey}`;
    }

    if (urlObj.hostname.includes('contabostorage.com')) {
      const tenantId = process.env.NEXT_PUBLIC_CONTABO_TENANT_ID || '7f46490e5a1444b7936e15fd196f9685';
      const bucket = process.env.NEXT_PUBLIC_CONTABO_BUCKET_NAME || 'coursecontent';

      let pathname = urlObj.pathname;
      if (pathname.startsWith('/')) pathname = pathname.substring(1);

      // If it already has the colon format, just ensure the rest of the key is encoded
      if (pathname.includes(':')) {
        const segments = pathname.split('/');
        const firstSegment = segments[0]; // tenant:bucket
        const restOfPath = segments.slice(1).map(s => encodeURIComponent(s)).join('/');
        return `${urlObj.origin}/${firstSegment}/${restOfPath}`;
      }

      // If it starts with the bucket name, extract the key
      if (pathname.startsWith(`${bucket}/`)) {
        pathname = pathname.substring(bucket.length + 1);
      }

      const encodedKey = pathname.split('/').map(s => encodeURIComponent(s)).join('/');
      return `${urlObj.origin}/${tenantId}:${bucket}/${encodedKey}`;
    }

    return url;
  } catch (e) {
    return url.replace(/ /g, '%20');
  }
}