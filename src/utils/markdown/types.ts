
// Type for blog front matter
export interface BlogFrontMatter {
  title: string;
  description: string;
  date: string;
  author: string;
  /** Optional single reference URL for this post (visible in the blog post page) */
  referenceLink?: string;
  /** Optional list of references. Each entry should be an object with `text` and `url`.
   * Parsers will also accept an array of strings where each string contains the
   * display text and URL separated by a comma. The UI normalizes both formats.
   */
  references?: Array<{ text: string; url: string }>;
  tags?: string[];
  image?: string;
  readTime?: string;
  slug: string;
  id?: string;
  excerpt?: string;
}

// Type for event front matter
export interface EventFrontMatter {
  id: string;
  title: string;
  date: string;
  startDate?: string;
  endDate?: string;
  location: string;
  type: string;
  description: string;
  image?: string;
  isUpcoming: boolean;
  slug: string;
  time?: string;
  organizer?: string;
  registrationLink?: string;
  speakers?: Array<{
    name: string;
    role?: string;
    bio?: string;
    image?: string;
  }>;
  topics?: string[];
  prerequisites?: string[];
  resources?: Array<{
    title: string;
    url: string;
  }>;
  sponsors?: string[];
}

// Type for project front matter
export interface ProjectFrontMatter {
  id: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  technologies: string[];
  team: Array<string | { name: string; role?: string }>;
  tags?: string[];
  github?: string;
  demo?: string;
  /**
   * Control label/behavior for the secondary action button in project pages.
   * - 'demo' (default): label will be "Ver demo"
   * - 'project': label will be "Ver proyecto"
   */
  demoButtonType?: "demo" | "project" | null;
  /**
   * If true and there's no URL for the demo/project, the button will be hidden.
   * Otherwise a disabled button with a "no disponible" label will be shown.
   */
  hideDemoIfMissing?: boolean;
  featured: boolean;
  slug: string;
  status?: string;
  lastUpdated?: string;
  startDate?: string;
  endDate?: string;
  githubLink?: string;
  demoLink?: string;
  githubStats?: GitHubStats;
  gallery?: string[]; // Array of image URLs for project gallery
}

// Type for GitHub stats
export interface GitHubStats {
  stars: number;
  forks: number;
  issues: number;
  contributors: number;
}

// Type for course front matter
export interface CourseFrontMatter {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  instructorBio?: string;
  duration: string;
  level: string;
  /**
   * Generic price label (fallback). Prefer using `priceMember` and `priceNonMember`
   * for explicit member/non-member pricing.
   */
  price?: string;
  /** Price shown to members, e.g. "Gratuito (miembros)" or "Gratis" */
  priceMember?: string;
  /** Price shown to non-members, e.g. "30.000 Gs. (no miembros)" */
  priceNonMember?: string;
  tags?: string[];
  syllabus?: string[];
  youtubeUrl?: string;
  registrationLink?: string;
  slug: string;
  date?: string;
}

// Type for documentation front matter
export interface DocFrontMatter {
  title: string;
  description: string;
  category: string;
  order?: number;
  tags?: string[];
  icon?: string;
  resources?: Array<{
    title: string;
    url: string;
  }>;
  slug: string;
  author?: string;
  updatedAt?: string;
  readTime?: string;
  githubUrl?: string;
}
