
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { EventFrontMatter } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdown/formatters";

interface SimilarEventsProps {
  events: EventFrontMatter[];
}

const SimilarEvents = ({ events }: SimilarEventsProps) => {
  if (events.length === 0) return null;
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">Eventos similares</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Link 
            key={event.id} 
            to={`/eventos/${event.slug}`}
            className="glass-card overflow-hidden group hover:shadow-neon-blue transition-all"
          >
            <div className="h-40 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                {event.title}
              </h3>              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>
                  {event.startDate ? (
                    event.endDate && event.startDate !== event.endDate ? (
                      `${formatDate(event.startDate)} - ${formatDate(event.endDate)}`
                    ) : (
                      formatDate(event.startDate)
                    )
                  ) : (
                    formatDate(event.date)
                  )}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarEvents;
