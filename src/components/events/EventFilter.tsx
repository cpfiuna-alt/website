import React from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // Add this import

export type EventType = {
  value: string;
  label: string;
};

interface EventFilterProps {
  eventTypes: EventType[];
  filter: string;
  setFilter: (filter: string) => void;
  showPast: boolean;
  setShowPast: (showPast: boolean) => void;
  searchTerm?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventFilter = ({ 
  eventTypes, 
  filter, 
  setFilter, 
  showPast, 
  setShowPast,
  searchTerm = "",
  onSearchChange
}: EventFilterProps) => {
  return (
    <div className="mb-10 space-y-6">
      {/* Search Bar - Added to match Project Filter */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          id="events-search"
          name="search"
          placeholder="Buscar eventos..."
          aria-label="Buscar eventos"
          autoComplete="off"
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>
      
      {/* Filter buttons - Styled like ProjectFilter */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <span className="text-muted-foreground">Filtrar por:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type.value}
              variant={filter === type.value ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setFilter(type.value)}
            >
              {type.label}
            </Button>
          ))}
          
          <Button
            variant={showPast ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setShowPast(!showPast)}
          >
            {showPast ? "Todos los eventos" : "Solo próximos"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
