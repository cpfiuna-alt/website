
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { EventFrontMatter } from "@/utils/markdownUtils";

interface EventDetailHeaderProps {
  event: EventFrontMatter;
}

// Enhanced fallback images for events by type
const eventTypeImages = {
  "hackathon": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "workshop": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "meetup": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "challenge": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "conference": "https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "program": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "competition": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "default": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
};

const EventDetailHeader = ({ event }: EventDetailHeaderProps) => {
  // Ensure event has an appropriate image
  const getEventImage = () => {
    if (!event.image || event.image === "/placeholder.svg" || event.image.trim() === "") {
      return eventTypeImages[event.type as keyof typeof eventTypeImages] || eventTypeImages.default;
    }
    return event.image;
  };

  return (
    <section className="relative">
      {/* Superimposed "Volver" button aligned with banner text */}
      <div className="absolute top-6 left-0 right-0 z-30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <Link
              to="/eventos"
              className="inline-flex items-center text-white/90 hover:text-primary transition-colors bg-black/20 backdrop-blur-sm rounded-lg px-3 py-2"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Volver a eventos
            </Link>
          </div>
        </div>
      </div>
      
      <div className="relative w-full h-[300px] md:h-[500px] mb-12">
        <div className="absolute inset-0 bg-black/40 z-10 "></div>
        <img
          src={getEventImage()}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = eventTypeImages[event.type as keyof typeof eventTypeImages] || eventTypeImages.default;
          }}
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-sm font-medium rounded-full mb-4">
                {event.type === "hackathon" && "Hackathons"}
                {event.type === "workshop" && "Talleres"}
                {event.type === "meetup" && "Encuentros"}
                {event.type === "challenge" && "Desafíos"}
                {event.type === "conference" && "Conferencias"}
                {event.type === "program" && "Programas"}
                {event.type === "competition" && "Competencias"}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                {event.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailHeader;
