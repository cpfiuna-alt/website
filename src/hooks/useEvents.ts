
import { useState, useEffect } from 'react';
import { parseMarkdown, EventFrontMatter } from '@/utils/markdownUtils';

// Import all event markdown files
const eventFiles = import.meta.glob('../content/events/*.md', { as: 'raw', eager: true });

export function useEvents() {
  const [events, setEvents] = useState<Array<EventFrontMatter>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const parsedEvents = Object.entries(eventFiles).map(([path, content]) => {
        // Extract slug from path
        const slug = path.split('/').pop()?.replace('.md', '') || '';
        
        try {
          // Parse the markdown content
          const { frontMatter } = parseMarkdown(content as string);
          
          // Ensure frontMatter has all required fields
          const eventData: EventFrontMatter = {
            id: frontMatter.id || slug,
            title: frontMatter.title || "Untitled Event",
            date: frontMatter.date || new Date().toISOString(),
            time: frontMatter.time || "TBD",
            location: frontMatter.location || "TBD",
            description: frontMatter.description || "",
            image: frontMatter.image || "/placeholder.svg",
            type: frontMatter.type || "meetup",
            registrationLink: frontMatter.registrationLink || "#",
            isUpcoming: frontMatter.isUpcoming ?? false,
            slug
          };
          
          return eventData;
        } catch (error) {
          console.error(`Error parsing event file ${path}:`, error);
          // Return a default event object
          return {
            id: slug,
            title: `Event ${slug}`,
            date: new Date().toISOString(),
            time: "TBD",
            location: "TBD",
            description: "Event description unavailable",
            image: "/placeholder.svg",
            type: "meetup",
            registrationLink: "#",
            isUpcoming: false,
            slug
          } as EventFrontMatter;
        }
      });
      
      // Sort events by date (newest first)
      parsedEvents.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      
      setEvents(parsedEvents);
    } catch (error: any) {
      console.error("Error parsing event files:", error);
      setError(error);
      // Fallback to empty array
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { events, loading, error };
}
