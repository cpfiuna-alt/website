
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterSectionProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  tags,
  selectedTags,
  onTagToggle,
  onClearFilters,
  searchQuery = "",
  onSearchChange,
  showSearch = false
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-8">
      <Button 
        variant="outline" 
        className="flex items-center mb-4" 
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-4 w-4 mr-2" />
        {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
      </Button>
      
      {showFilters && (
        <div className="glass-card p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h3 className="text-xl font-semibold mb-4 md:mb-0">Filtros</h3>
            {selectedTags.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters}>
                Limpiar filtros
              </Button>
            )}
          </div>
          
          {showSearch && onSearchChange && (
            <div className="mb-4">
              <p className="text-sm mb-2 text-[#94a3b8]">Buscar:</p>
              <Input 
                type="text" 
                placeholder="Buscar..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full mb-4"
              />
            </div>
          )}
          
          <div>
            <p className="text-sm mb-2 text-[#94a3b8]">Categorías:</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
