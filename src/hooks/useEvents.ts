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
          const dateStr = String(frontMatter.date || '');
          const startDateStr = frontMatter.startDate ? String(frontMatter.startDate) : undefined;
          const endDateStr = frontMatter.endDate ? String(frontMatter.endDate) : undefined;
          const isUpcoming = isUpcomingEventWithFields(dateStr, startDateStr, endDateStr);

          // Ensure frontMatter has all required fields
          const eventData: EventFrontMatter = {
            id: String(frontMatter.id || slug),
            title: String(frontMatter.title || "Untitled Event"),
            date: dateStr || new Date().toISOString(),
            startDate: startDateStr,
            endDate: endDateStr,
            location: String(frontMatter.location || "TBD"),
            description: String(frontMatter.description || ""),
            image: String(frontMatter.image || "/placeholder.svg"),
            type: String(frontMatter.type || "meetup"),
            isUpcoming: isUpcoming,
            slug,
            time: String(frontMatter.time || "TBD"),
            organizer: frontMatter.organizer ? String(frontMatter.organizer) : undefined,
            registrationLink: String(frontMatter.registrationLink || frontMatter.registrationUrl || ''),
            speakers: Array.isArray(frontMatter.speakers) ? frontMatter.speakers as { name: string; role?: string; bio?: string; image?: string; }[] : undefined,
            topics: Array.isArray(frontMatter.topics) ? frontMatter.topics as string[] : undefined,
            prerequisites: Array.isArray(frontMatter.prerequisites) ? frontMatter.prerequisites as string[] : undefined,
            resources: Array.isArray(frontMatter.resources) ? frontMatter.resources as { title: string; url: string; }[] : undefined,
            sponsors: Array.isArray(frontMatter.sponsors) ? frontMatter.sponsors as string[] : undefined
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
