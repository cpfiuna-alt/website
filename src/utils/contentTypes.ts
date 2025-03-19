
// Define content types for use across the application
export type ContentType = 'events' | 'projects' | 'courses' | 'blog' | 'docs';

export interface ContentItem {
  frontMatter: Record<string, any>;
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
