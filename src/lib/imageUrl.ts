export function imageUrl(path: string) {
  // Ensure path is relative and no leading slash duplication
  const p = String(path || '').replace(/^\/+/, '');
  // Vite env var (set VITE_IMAGE_BASE_URL in your .env when ready)
  const base = import.meta.env.VITE_IMAGE_BASE_URL || '';

  if (!base) {
    // In dev without R2, serve from local / (public folder) so existing paths keep working
    return `/${p}`;
  }

  // Remove trailing slashes from base
  const normalizedBase = String(base).replace(/\/+$/, '');
  return `${normalizedBase}/${encodeURI(p)}`;
}
