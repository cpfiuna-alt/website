import { useEffect, useState } from "react";

// X/Twitter feed disabled — returning empty feed to avoid external API usage.
export function useXFeed() {
  const [posts, setPosts] = useState<unknown[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Feature disabled - no API calls made
  return { posts, loading, error };
}

/* Original implementation (disabled):
export function useXFeed() {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    // Control whether the frontend should fetch the X feed.
    // Use Vite env var `VITE_ENABLE_X_FEED=true` to enable fetching during development or testing.
    const ENABLE_X_FEED = import.meta.env.VITE_ENABLE_X_FEED === 'true';

    if (!ENABLE_X_FEED) {
      // Do not fetch to avoid consuming rate limits. Return empty posts and not loading.
      setPosts([]);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;
    setLoading(true);
    fetch('/api/x-timeline')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setPosts(data.posts || []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { posts, loading, error };
}
*/
