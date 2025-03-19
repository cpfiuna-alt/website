
import React from "react";
import { Users } from "lucide-react";
import EventCard from "./EventCard";
import { EventFrontMatter } from "@/utils/markdownUtils";

interface EventsGridProps {
  events: EventFrontMatter[];
  getEventTypeLabel: (type: string) => string;
}

const EventsGrid = ({ events, getEventTypeLabel }: EventsGridProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No hay eventos disponibles</h3>
        <p className="text-muted-foreground">
          No se encontraron eventos con los filtros actuales.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
          getEventTypeLabel={getEventTypeLabel} 
        />
      ))}
    </div>
  );
};

export default EventsGrid;
