
import React from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (term: string) => void;
  tags: string[];
  onTagSelect: (tag: string | null) => void;
  selectedTag: string;
}

const BlogSearch = ({ 
  onSearch, 
  tags, 
  onTagSelect, 
  selectedTag 
}: BlogSearchProps) => {
  return (
    <section className="py-8 px-6 bg-muted/30 dark:bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 space-y-6">
          {/* Search Bar - Styled like ProjectFilter */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          
          {/* Tags Filter - Styled like ProjectFilter */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Filtrar por:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onTagSelect(null)}
                className={`px-4 py-2 rounded-full text-sm transition-all
                  ${
                    selectedTag === ""
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                Todos
              </button>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagSelect(tag)}
                  className={`px-4 py-2 rounded-full text-sm transition-all
                    ${
                      selectedTag === tag
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSearch;
