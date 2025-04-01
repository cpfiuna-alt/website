
import React from "react";
import { EventFrontMatter } from "@/utils/markdownUtils";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { ExternalLink } from "lucide-react";

interface EventContentProps {
  event: EventFrontMatter & { content: string };
}

const EventContent = ({ event }: EventContentProps) => {
  return (
    <>
      {/* Event details */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer content={event.content} />
        
        {/* If no content is available, show a default message */}
        {!event.content && (
          <p>{event.description}</p>
        )}
      </div>
      
      {/* Topics section */}
      {event.topics && event.topics.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Temas a tratar</h2>
          <ul className="space-y-2">
            {event.topics.map((topic, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary text-sm mr-3">
                  {index + 1}
                </span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Prerequisites section */}
      {event.prerequisites && event.prerequisites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Requisitos previos</h2>
          <ul className="space-y-2">
            {event.prerequisites.map((prerequisite, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span>{prerequisite}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Registration section */}
      {event.registrationUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">¿Cómo participar?</h2>
          <div className="bg-muted p-6 rounded-xl">
            <p className="mb-4">
              Para participar en este evento, es necesario registrarse previamente 
              a través del siguiente enlace:
            </p>
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Registrarse
            </a>
          </div>
        </div>
      )}
      
      {/* Resources section */}
      {event.resources && event.resources.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recursos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-lg border border-muted hover:bg-muted/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4">
                  <ExternalLink className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium">{resource.title}</div>
                  <div className="text-sm text-muted-foreground">Recurso externo</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default EventContent;
