
import { parseMarkdown } from './markdownUtils';
import { ContentType, ContentItem } from './contentTypes';

// Function to get all markdown content files of a specific type
export async function getAllContent<T>(
  contentType: ContentType
): Promise<Array<ContentItem & { frontMatter: T }>> {
  // Create the correct glob pattern based on content type
  try {
    // Import all markdown files for the specified content type
    const contentFiles = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default', eager: true });
    
    // Filter files that match our content type
    const filteredFiles = Object.entries(contentFiles).filter(
      ([path]) => path.includes(`/content/${contentType}/`)
    );
    
    // Parse each file and extract front matter and content
    return filteredFiles.map(([path, content]) => {
      // Extract slug from path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Parse the markdown content
      const { frontMatter, content: markdownContent } = parseMarkdown(content as string);
      
      return {
        frontMatter: { ...frontMatter, slug } as T,
        content: markdownContent,
        slug
      };
    });
  } catch (error) {
    console.error(`Error loading ${contentType} content:`, error);
    return [];
  }
}

// Get a single content item by slug
export async function getContentBySlug<T>(
  contentType: ContentType,
  slug: string
): Promise<(ContentItem & { frontMatter: T }) | null> {
  try {
    // Get all content of specified type
    const allContent = await getAllContent<T>(contentType);
    
    // Find the item with matching slug
    const contentItem = allContent.find(item => item.slug === slug);
    
    return contentItem || null;
  } catch (error) {
    console.error(`Error fetching ${contentType} content with slug ${slug}:`, error);
    return null;
  }
}
