
import React from "react";
import { Filter, Search } from "lucide-react";

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
          placeholder="Buscar proyectos..."
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
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all
                ${
                  filter === category.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
            >
              {category.label}
            </button>
          ))}
          
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`px-4 py-2 rounded-full text-sm transition-all ml-2
              ${
                showFeaturedOnly
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            {showFeaturedOnly ? "Todos" : "Destacados"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilter;
