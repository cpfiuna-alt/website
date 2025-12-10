
// Define content types for use across the application
export type ContentType = 'events' | 'projects' | 'courses' | 'blog' | 'docs';

export interface ContentItem {
  frontMatter: Record<string, unknown>;
  content: string;
  slug: string;
}

// Course specific type
export interface CourseItem extends ContentItem {
  frontMatter: {
    id: number | string;
    title: string;
    description: string;
    level: string;
    duration: string;
    instructor: string;
    image: string;
    tags: string[];
    slug: string;
    date?: string;
  };
}

// Documentation specific type
export interface DocItem extends ContentItem {
  frontMatter: {
    title: string;
    description: string;
    category: string;
    order?: number;
    tags?: string[];
    author?: string;
    updatedAt?: string;
    readTime?: string;
    githubUrl?: string;
    resources?: Array<{ title: string; url: string }>;
    icon?: string;
    slug: string;
  };
}
