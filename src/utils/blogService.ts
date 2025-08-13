
import { getAllContent, getContentBySlug } from './contentLoader';
import { BlogFrontMatter } from './markdownUtils';

// Get all blog posts
export async function getAllBlogPosts({
  sortBy = 'date',
  filterByTag,
  limit
}: {
  sortBy?: 'date',
  filterByTag?: string,
  limit?: number
} = {}): Promise<Array<{ frontMatter: BlogFrontMatter, content: string, slug: string }>> {
  try {
    // Get all blog posts
    const blogPosts = await getAllContent<BlogFrontMatter>('blog');
    
    // Filter blog posts based on criteria
    let filteredPosts = blogPosts;
    
    if (filterByTag) {
      filteredPosts = filteredPosts.filter(post => 
        post.frontMatter.tags && post.frontMatter.tags.includes(filterByTag)
      );
    }
    
    // Sort blog posts
    if (sortBy === 'date') {
      filteredPosts.sort((a, b) => {
        const dateA = a.frontMatter.date ? new Date(a.frontMatter.date).getTime() : 0;
        const dateB = b.frontMatter.date ? new Date(b.frontMatter.date).getTime() : 0;
        return dateB - dateA;
      });
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      filteredPosts = filteredPosts.slice(0, limit);
    }
    
    return filteredPosts;
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<{ frontMatter: BlogFrontMatter, content: string, slug: string } | null> {
  try {
    return await getContentBySlug<BlogFrontMatter>('blog', slug);
  } catch (error) {
    console.error(`Error getting blog post with slug ${slug}:`, error);
    return null;
  }
}
