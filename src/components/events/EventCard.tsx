
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventFrontMatter } from "@/utils/markdownUtils";

interface EventCardProps {
  event: EventFrontMatter;
  getEventTypeLabel: (type: string) => string;
}

const EventCard = ({ event, getEventTypeLabel }: EventCardProps) => {
  const isPastEvent = !event.isUpcoming;
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
    target.onerror = null; // Prevent infinite loop if placeholder also fails to load
  };

  return (
    <div className={`glass-card group hover:shadow-neon-blue transition-all ${isPastEvent ? 'opacity-80 dark:opacity-70' : ''}`}>
      <Link to={`/events/${event.slug}`} className="block">
        <div className="relative">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-48 object-cover object-center rounded-t-xl"
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              event.isUpcoming 
                ? "bg-primary/90 text-primary-foreground" 
                : "bg-muted/90 text-muted-foreground"
            }`}>
              {event.isUpcoming ? "Próximo" : "Pasado"}
            </span>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
              {getEventTypeLabel(event.type)}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/events/${event.slug}`}>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
        </Link>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {new Date(event.date).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        {event.isUpcoming ? (
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-neon-blue"
          >
            Ver detalles
          </Link>
        ) : (
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium transition-colors hover:bg-muted/80"
          >
            Ver resumen
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
