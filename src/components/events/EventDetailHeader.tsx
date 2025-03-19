
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EventFrontMatter } from "@/utils/markdownUtils";

interface EventDetailHeaderProps {
  event: EventFrontMatter;
}

const EventDetailHeader = ({ event }: EventDetailHeaderProps) => {
  return (
    <section className="relative pt-16">
      <div className="container mx-auto px-6 mb-6">
        <Link
          to="/events"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a eventos
        </Link>
      </div>

      <div className="relative w-full h-[300px] md:h-[500px] mb-12">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-sm font-medium rounded-full mb-4">
                {event.type === "hackathon" && "Hackathon"}
                {event.type === "workshop" && "Workshop"}
                {event.type === "meetup" && "Meetup"}
                {event.type === "challenge" && "Challenge"}
                {event.type === "conference" && "Conference"}
                {event.type === "program" && "Program"}
                {event.type === "competition" && "Competition"}
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
