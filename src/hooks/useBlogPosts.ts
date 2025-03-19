
import { useState, useEffect } from 'react';
import { parseMarkdown, BlogFrontMatter } from '@/utils/markdownUtils';

// Import all blog markdown files
const blogFiles = import.meta.glob('../content/blog/*.md', { as: 'raw', eager: true });

// Default images for blog posts that don't have one
const defaultImages = {
  'programacion-competitiva': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'inteligencia-artificial-2024': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'algoritmos-optimizacion-2024': 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'ciberseguridad-tendencias-2024': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  'react-typescript-2024': 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
};

export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState<BlogFrontMatter[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        
        // If no blog files were found, set empty arrays and return
        if (!blogFiles || Object.keys(blogFiles).length === 0) {
          console.error("No blog files found");
          setBlogPosts([]);
          setAllTags([]);
          return;
        }
        
        const parsedPosts = await Promise.all(
          Object.entries(blogFiles).map(async ([path, content]) => {
            // Extract slug from path
            const slug = path.split('/').pop()?.replace('.md', '') || '';
            
            try {
              // Parse the markdown content
              const { frontMatter } = parseMarkdown(content as string);
              
              // Use a default image if one is not provided
              const image = frontMatter.image || defaultImages[slug] || "/placeholder.svg";
              
              // Ensure frontMatter has all required fields
              return {
                id: frontMatter.id || slug,
                title: frontMatter.title || "Untitled Post", 
                excerpt: frontMatter.excerpt || "No excerpt available", 
                date: frontMatter.date || new Date().toISOString(),
                author: frontMatter.author || "Anonymous",
                readTime: frontMatter.readTime || "5 min",
                tags: frontMatter.tags || [],
                image: image,
                slug
              } as BlogFrontMatter;
            } catch (error) {
              console.error(`Error parsing blog file ${path}:`, error);
              // Return a default blog object
              return {
                id: slug,
                title: `Post ${slug}`, 
                excerpt: "Error loading post content", 
                date: new Date().toISOString(),
                author: "System",
                readTime: "0 min",
                tags: [],
                image: defaultImages[slug] || "/placeholder.svg",
                slug
              } as BlogFrontMatter;
            }
          })
        );
        
        // Sort blog posts by date (newest first)
        parsedPosts.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setBlogPosts(parsedPosts);
        
        // Extract all unique tags
        const tags = Array.from(new Set(parsedPosts.flatMap(post => post.tags || [])));
        setAllTags(tags);
      } catch (error) {
        console.error("Error parsing blog files:", error);
        setBlogPosts([]);
        setAllTags([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogPosts();
  }, []);

  // Filter posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchTerm || 
                          post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || (post.tags || []).includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return { 
    blogPosts, 
    allTags, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedTag, 
    setSelectedTag, 
    filteredPosts 
  };
}
