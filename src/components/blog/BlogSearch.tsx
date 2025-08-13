import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
    <div className="mb-10 space-y-6">
      {/* Search Bar - Styled like Project/Event Filter */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar artículos..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      
      {/* Tags Filter - Styled like Project/EventFilter */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Filtrar por:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === "" ? "default" : "outline"}
            className="rounded-full"
            onClick={() => onTagSelect(null)}
          >
            Todos
          </Button>
          {tags.map(tag => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="rounded-full"
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSearch;
