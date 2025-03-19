
import React from "react";
import { Filter } from "lucide-react";

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
}

const EventFilter = ({ 
  eventTypes, 
  filter, 
  setFilter, 
  showPast, 
  setShowPast 
}: EventFilterProps) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-2">
        <Filter className="h-5 w-5 text-muted-foreground" />
        <span className="text-muted-foreground">Filtrar por:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFilter(type.value)}
            className={`px-4 py-2 rounded-full text-sm transition-all
              ${
                filter === type.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
          >
            {type.label}
          </button>
        ))}
        
        <button
          onClick={() => setShowPast(!showPast)}
          className={`px-4 py-2 rounded-full text-sm transition-all ml-2
            ${
              showPast
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
        >
          {showPast ? "Todos los eventos" : "Solo próximos"}
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
