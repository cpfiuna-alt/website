// Instagram feed disabled — returning empty feed to avoid external API usage.
export function useInstagramFeed() {
  return { posts: [], loading: false, error: null };
}

export default useInstagramFeed;
