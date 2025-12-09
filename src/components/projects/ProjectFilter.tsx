import React from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ProjectCategory = {
  value: string;
  label: string;
};

interface ProjectFilterProps {
  categories: ProjectCategory[];
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showFeaturedOnly: boolean;
  setShowFeaturedOnly: (featured: boolean) => void;
}

const ProjectFilter = ({
  categories,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  showFeaturedOnly,
  setShowFeaturedOnly,
}: ProjectFilterProps) => {
  return (
    <div className="mb-10 space-y-6">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          id="projects-search"
          name="search"
          placeholder="Buscar proyectos..."
          aria-label="Buscar proyectos"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Filtrar por:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={filter === category.value ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(category.value)}
            >
              {category.label}
            </Button>
          ))}
          
          <Button
            variant={showFeaturedOnly ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          >
            {showFeaturedOnly ? "Todos" : "Destacados"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
