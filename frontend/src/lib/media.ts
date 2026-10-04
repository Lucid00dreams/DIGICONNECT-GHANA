/**
 * Media helper functions for DigiConnect Ghana platform.
 * Usable across both Server Components and Client Components in Next.js.
 */

export function isVideoMedia(url?: string): boolean {
  if (!url) return false;
  return (
    url.startsWith("data:video/") ||
    /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url)
  );
}
