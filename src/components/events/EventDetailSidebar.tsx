
import React from "react";
import { CalendarIcon, Clock, MapPin, ExternalLink, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventFrontMatter } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdown/formatters";
import { Card, CardContent } from "@/components/ui/card";

interface EventDetailSidebarProps {
  event: EventFrontMatter;
  isFull?: boolean;
}

const EventDetailSidebar = ({ event, isFull = false }: EventDetailSidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Event details card */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Detalles del Evento</h3>
          
          <div className="space-y-4">
            {/* Date info */}
            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">Fecha</div>
                <div className="text-muted-foreground">{formatDate(event.date)}</div>
              </div>
            </div>
            
            {/* Time info */}
            <div className="flex items-start">
              <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">Hora</div>
                <div className="text-muted-foreground">{event.time}</div>
              </div>
            </div>
            
            {/* Location info */}
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
              <div>
                <div className="font-medium">Ubicación</div>
                <div className="text-muted-foreground">{event.location}</div>
              </div>
            </div>
            
            {/* Organizer info if available */}
            {event.organizer && (
              <div className="flex items-start">
                <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <div className="font-medium">Organizador</div>
                  <div className="text-muted-foreground">{event.organizer}</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Registration button */}
          <Button 
            className="w-full mt-6"
            variant="default"
            asChild
          >
            <a 
              href={event.registrationLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Registrarse
            </a>
          </Button>
        </CardContent>
      </Card>
      
      {/* Speakers section if available */}
      {event.speakers && event.speakers.length > 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Users className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-lg font-semibold">Ponentes</h3>
            </div>
            
            <div className="space-y-4">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 overflow-hidden">
                    {speaker.image ? (
                      <img 
                        src={speaker.image} 
                        alt={speaker.name} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{speaker.name}</div>
                    {speaker.role && (
                      <div className="text-sm text-muted-foreground">{speaker.role}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};

export default EventDetailSidebar;
