import { useState, useEffect } from 'react';
import { parseMarkdown, EventFrontMatter } from '@/utils/markdownUtils';
import { isUpcomingEventWithFields, getPrimaryDateWithFields } from '@/utils/markdown/formatters';

// Import all event markdown files
const eventFiles = import.meta.glob('../content/events/*.md', { query: '?raw', import: 'default', eager: true });

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
          
          // Calculate isUpcoming based on date comparison
          const isUpcoming = isUpcomingEventWithFields(frontMatter.date, frontMatter.startDate, frontMatter.endDate);

          // Ensure frontMatter has all required fields
          const eventData: EventFrontMatter = {
            id: frontMatter.id || slug,
            title: frontMatter.title || "Untitled Event",
            date: frontMatter.date || new Date().toISOString(),
            startDate: frontMatter.startDate,
            endDate: frontMatter.endDate,
            location: frontMatter.location || "TBD",
            description: frontMatter.description || "",
            image: frontMatter.image || "/placeholder.svg",
            type: frontMatter.type || "meetup",
            isUpcoming: isUpcoming,
            slug,
            time: frontMatter.time || "TBD",
            organizer: frontMatter.organizer,
            registrationLink: frontMatter.registrationLink || frontMatter.registrationUrl,
            speakers: frontMatter.speakers,
            topics: frontMatter.topics,
            prerequisites: frontMatter.prerequisites,
            resources: frontMatter.resources,
            sponsors: frontMatter.sponsors
          };
          
          return eventData;
        } catch (error) {
          console.error(`Error parsing event file ${path}:`, error);
          // Return a default event object
          return {
            id: slug,
            title: `Event ${slug}`,
            date: new Date().toISOString(),
            location: "TBD",
            description: "Event description unavailable",
            image: "/placeholder.svg",
            type: "meetup",
            isUpcoming: false,
            slug
          } as EventFrontMatter;
        }
      });
      
      // Sort events by date (newest first)
      parsedEvents.sort((a, b) => {
        return getPrimaryDateWithFields(b.date, b.startDate, b.endDate).getTime() - 
               getPrimaryDateWithFields(a.date, a.startDate, a.endDate).getTime();
      });
      
      setEvents(parsedEvents);
    } catch (error: unknown) {
      console.error("Error parsing event files:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
      // Fallback to empty array
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { events, loading, error };
}
