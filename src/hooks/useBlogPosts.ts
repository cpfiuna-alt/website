
import { useState, useEffect } from 'react';
import { parseMarkdown, BlogFrontMatter } from '@/utils/markdownUtils';

// Import all blog markdown files
const blogFiles = import.meta.glob('../content/blog/*.md', { as: 'raw', eager: true });

// Default images for blog posts that don't have one
const defaultImages = {
  'programacion-competitiva': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'inteligencia-artificial-2024': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'algoritmos-optimizacion-2024': 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'ciberseguridad-tendencias-2024': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'react-typescript-2024': 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'desarrollo-frontend-moderno': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'inteligencia-artificial-educacion': 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'introduccion-a-la-programacion': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'introduccion-a-react': 'https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
};

// Generic categories with fallback images
const categoryImages = {
  'programming': 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'ai': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'web': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
              
              // Determine appropriate image
              let image = frontMatter.image;
              
              // If no image is provided, try to find a specific one by slug
              if (!image || image === "/placeholder.svg") {
                // First check specific slug matches
                if (defaultImages[slug as keyof typeof defaultImages]) {
                  image = defaultImages[slug as keyof typeof defaultImages];
                } 
                // Then check if any tags match our categories
                else if (frontMatter.tags && Array.isArray(frontMatter.tags)) {
                  const tagLower = frontMatter.tags[0].toLowerCase();
                  if (tagLower.includes('ai') || tagLower.includes('ml') || tagLower.includes('inteligencia')) {
                    image = categoryImages.ai;
                  } else if (tagLower.includes('web') || tagLower.includes('react') || tagLower.includes('angular')) {
                    image = categoryImages.web;
                  } else if (tagLower.includes('program') || tagLower.includes('code') || tagLower.includes('python')) {
                    image = categoryImages.programming;
                  } else {
                    image = categoryImages.default;
                  }
                } else {
                  image = categoryImages.default;
                }
              }
              
              // If tags exist as strings with quotes, clean them up
              let cleanedTags = frontMatter.tags;
              if (Array.isArray(cleanedTags)) {
                cleanedTags = cleanedTags.map(tag => {
                  // Remove quotation marks if they exist
                  if (typeof tag === 'string') {
                    return tag.replace(/^["'](.*)["']$/, '$1');
                  }
                  return tag;
                });
              }
              
              // Ensure frontMatter has all required fields
              const blogPost: BlogFrontMatter = {
                id: frontMatter.id || slug,
                title: frontMatter.title || "Untitled Post", 
                description: frontMatter.excerpt || frontMatter.description || "No description available",
                excerpt: frontMatter.excerpt || "No excerpt available", 
                date: frontMatter.date || new Date().toISOString(),
                author: frontMatter.author || "Anonymous",
                readTime: frontMatter.readTime || "5 min",
                tags: cleanedTags || [],
                image: image,
                slug
              };
              
              return blogPost;
            } catch (error) {
              console.error(`Error parsing blog file ${path}:`, error);
              // Return a default blog object
              const blogPost: BlogFrontMatter = {
                id: slug,
                title: `Post ${slug}`, 
                description: "Error loading post content",
                excerpt: "Error loading post content", 
                date: new Date().toISOString(),
                author: "System",
                readTime: "0 min",
                tags: [],
                image: defaultImages[slug as keyof typeof defaultImages] || categoryImages.default,
                slug
              };
              return blogPost;
            }
          })
        );
        
        // Sort blog posts by date (newest first)
        parsedPosts.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        
        setBlogPosts(parsedPosts);
        
        // Extract all unique tags and clean them from quotation marks
        const allUniqueTags = Array.from(new Set(parsedPosts.flatMap(post => post.tags || [])));
        setAllTags(allUniqueTags);
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
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
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
