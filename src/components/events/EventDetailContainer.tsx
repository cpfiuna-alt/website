import React from "react";
import { EventFrontMatter } from "@/utils/markdownUtils";
import EventDetailHeader from "./EventDetailHeader";
import EventContent from "./EventContent";
import EventSidebarContainer from "./EventSidebarContainer";
import EventRegistrationCTA from "./EventRegistrationCTA";
import EventMobileSpeakers from "./EventMobileSpeakers";

interface EventDetailContainerProps {
  event: EventFrontMatter & { content: string };
}

const EventDetailContainer = ({ event }: EventDetailContainerProps) => {
  return (
    <>
      <EventDetailHeader event={event} />
      
      <div className="container mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Main content column */}
          <div className="md:w-2/3">
            <EventContent event={event} />
          </div>
          
          {/* Sidebar column */}
          <div className="md:w-1/3">
            <EventSidebarContainer event={event} />
          </div>
        </div>
        
        {/* Mobile speakers section */}
        <EventMobileSpeakers speakers={event.speakers} />

        {/* Registration call to action */}
        {event.registrationLink && ( // Changed from registrationUrl
          <EventRegistrationCTA registrationUrl={event.registrationLink} />
        )}
      </div>
    </>
  );
};

export default EventDetailContainer;
