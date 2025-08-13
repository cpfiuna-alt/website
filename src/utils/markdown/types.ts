
// Type for blog front matter
export interface BlogFrontMatter {
  title: string;
  description: string;
  date: string;
  author: string;
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
  price?: string;
  tags?: string[];
  syllabus?: string[];
  youtubeUrl?: string;
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
