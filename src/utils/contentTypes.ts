
// Define content types for use across the application
export type ContentType = 'events' | 'projects' | 'courses' | 'blog' | 'docs';

export interface ContentItem {
  frontMatter: Record<string, any>;
  content: string;
  slug: string;
}
