import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin } from "lucide-react";
import { EventFrontMatter } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdown/formatters";

interface EventCardProps {
  event: EventFrontMatter;
  getEventTypeLabel: (type: string) => string;
}

// Fallback images by event type
const eventTypeImages = {
  "hackathon": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "workshop": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "meetup": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "challenge": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "conference": "https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "program": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "competition": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "default": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

const EventCard = ({ event, getEventTypeLabel }: EventCardProps) => {
  const isPastEvent = !event.isUpcoming;
  
  // Get appropriate image based on event type or use provided image
  const getEventImage = () => {
    if (!event.image || event.image === "/placeholder.svg") {
      return eventTypeImages[event.type as keyof typeof eventTypeImages] || eventTypeImages.default;
    }
    return event.image;
  };

  return (
    <div className={`glass-card group hover:shadow-neon-blue transition-all ${isPastEvent ? 'opacity-80 dark:opacity-70' : ''}`}>
      <Link to={`/eventos/${event.slug}`} className="block">
        <div className="relative">
          <img
            src={getEventImage()}
            alt={event.title}
            className="w-full h-48 object-cover object-center rounded-t-xl"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = eventTypeImages.default;
            }}
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
        <Link to={`/eventos/${event.slug}`}>
          <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
            {event.title}
          </h3>
        </Link>
        
        {/* Increased space for description - increased line-clamp */}
        <p className="text-muted-foreground mb-5 line-clamp-4">
          {event.description}
        </p>
        
        {/* Event details take full width initially */}
        <div className="space-y-2 mb-4">          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
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
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Button container - aligned to the right */}
        <div className="flex justify-end mt-4">
          {event.isUpcoming ? (
            <Link
              to={`/eventos/${event.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
            >
              Ver detalles
            </Link>
            ) : (
            <Link
              to={`/eventos/${event.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-muted/70 text-muted-foreground text-sm font-medium transition-all hover:bg-muted hover:scale-105 hover:shadow-sm"
            >
              Ver resumen
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
