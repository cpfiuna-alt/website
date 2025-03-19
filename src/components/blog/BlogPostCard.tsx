
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/markdownUtils";
import { BlogFrontMatter } from "@/utils/markdownUtils";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";

interface BlogPostCardProps {
  post: BlogFrontMatter;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  // Handle missing image with a placeholder
  const imageSrc = post.image || "/placeholder.svg";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="glass-card overflow-hidden h-full flex flex-col group hover:shadow-neon-blue transition-all">
      <div className="relative h-48 overflow-hidden">
        <Link to={`/blog/${post.slug}`}>
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags && post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex flex-col space-y-2 mt-auto">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{post.readTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-2" />
            <span>{post.author}</span>
          </div>
          
          <Link
            to={`/blog/${post.slug}`}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Leer más
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
