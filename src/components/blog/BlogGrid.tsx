
import React from "react";
import BlogPostCard from "./BlogPostCard";
import { BlogFrontMatter } from "@/utils/markdownUtils";
import { Book } from "lucide-react";
import { Container } from "@/components/ui/container";

interface BlogGridProps {
  filteredPosts: BlogFrontMatter[];
  loading: boolean;
}

const BlogGrid = ({ filteredPosts, loading }: BlogGridProps) => {
  if (loading) {
    return (
      <Container className="px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card animate-pulse">
              <div className="h-48 bg-muted/50 rounded-t-xl"></div>
              <div className="p-6">
                <div className="h-6 bg-muted/50 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-muted/50 rounded mb-4 w-full"></div>
                <div className="flex gap-2 mb-4">
                  {[1, 2].map((j) => (
                    <div key={j} className="h-6 bg-muted/30 rounded-full w-16"></div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-muted/30 rounded w-24"></div>
                  <div className="h-4 bg-muted/30 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <Container className="px-6 mx-auto">
        <div className="text-center py-16">
          <Book className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No se encontraron artículos</h3>
          <p className="text-muted-foreground">
            No hay artículos que coincidan con tu búsqueda o filtros.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="px-6 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
};

export default BlogGrid;
