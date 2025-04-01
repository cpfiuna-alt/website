
import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, Clock } from "lucide-react";
import { BlogFrontMatter } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdownUtils";

interface BlogPostCardProps {
  post: BlogFrontMatter;
}

const categoryImages = {
  'programacion': 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'ai': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'web': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'react': 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'javascript': 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'typescript': 'https://images.unsplash.com/photo-1628694647666-49929a7e96e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'ciberseguridad': 'https://images.unsplash.com/photo-1563013544-08f7ddeedd82?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'algoritmos': 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'educacion': 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'default': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  // Ensure we always have a description to display
  const displayDescription = post.description || "Sin descripción disponible";
  
  // Get an appropriate fallback image if needed
  const getImageSrc = () => {
    if (post.image && post.image !== "/placeholder.svg" && post.image.trim() !== "") {
      return post.image;
    }
    
    // Try to determine a category from tags
    if (post.tags && post.tags.length > 0) {
      for (const tag of post.tags) {
        const tagLower = tag.toLowerCase();
        // Check if any tag matches our category mappings
        for (const category in categoryImages) {
          if (tagLower.includes(category)) {
            return categoryImages[category as keyof typeof categoryImages];
          }
        }
      }
      
      // If no specific match found, use these broader categories
      const tagLower = post.tags[0].toLowerCase();
      if (tagLower.includes('ai') || tagLower.includes('inteligencia')) {
        return categoryImages.ai;
      } else if (tagLower.includes('web') || tagLower.includes('react')) {
        return categoryImages.web;
      } else if (tagLower.includes('program') || tagLower.includes('code')) {
        return categoryImages.programacion;
      }
    }
    
    // Default fallback
    return categoryImages.default;
  };
  
  return (
    <Link to={`/blog/${post.slug}`} className="group">
      <article className="overflow-hidden rounded-xl bg-black border border-gray-800 transition-all hover:border-primary/50">
        <div className="flex flex-col h-full">
          <div className="relative overflow-hidden h-48">
            <img
              src={getImageSrc()}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = categoryImages.default;
              }}
            />
            {post.tags && post.tags.length > 0 && (
              <div className="absolute bottom-0 left-0 p-3 flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={`${post.slug}-tag-${idx}`}
                    className="text-xs px-2 py-0.5 bg-primary text-white rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 flex flex-col h-full">
            <div className="flex text-xs text-gray-400 items-center mb-2">
              <span className="flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {formatDate(post.date)}
              </span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {post.readTime || "5 min"} de lectura
              </span>
            </div>
            
            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            
            <p className="text-sm text-gray-400 line-clamp-3 mb-3">
              {displayDescription}
            </p>
            
            <div className="mt-auto text-sm text-gray-400">
              Por <span className="text-gray-300">{post.author}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPostCard;
