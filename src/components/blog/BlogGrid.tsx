
import React from "react";
import { BlogFrontMatter } from "@/utils/markdownUtils";
import BlogPostCard from "./BlogPostCard";

interface BlogGridProps {
  posts: BlogFrontMatter[];
  loading?: boolean;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={`skeleton-${i}`} className="animate-pulse">
            <div className="h-48 bg-muted/50 rounded-t-xl"></div>
            <div className="p-4 border border-t-0 border-gray-800 rounded-b-xl">
              <div className="h-4 bg-muted/50 rounded mb-3 w-1/3"></div>
              <div className="h-6 bg-muted/50 rounded mb-4 w-full"></div>
              <div className="h-4 bg-muted/50 rounded mb-3 w-full"></div>
              <div className="h-4 bg-muted/50 rounded mb-3 w-5/6"></div>
              <div className="h-4 bg-muted/50 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard key={`post-${post.slug}`} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;
