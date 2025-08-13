
import React from "react";
import { EventFrontMatter } from "@/utils/markdownUtils";
import EventDetailSidebar from "./EventDetailSidebar";

interface EventSidebarContainerProps {
  event: EventFrontMatter;
}

const EventSidebarContainer = ({ event }: EventSidebarContainerProps) => {
  return (
    <>
      <EventDetailSidebar event={event} />
      
      {/* Sponsors section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <div className="mt-8 p-6 bg-muted/10 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Patrocinadores</h3>
          <div className="flex flex-wrap gap-4">
            {event.sponsors.map((sponsor, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  {/* Placeholder for sponsor logo */}
                  <span className="text-xs text-muted-foreground">{sponsor}</span>
                </div>
                <div className="text-sm">{sponsor}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventSidebarContainer;
