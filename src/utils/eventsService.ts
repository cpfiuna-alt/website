
import { getAllContent, getContentBySlug } from './contentLoader';
import { EventFrontMatter } from './markdownUtils';

// Get all events (with sorting and filtering options)
export async function getAllEvents({
  sortBy = 'date',
  filterByType,
  showUpcomingOnly = false,
  limit
}: {
  sortBy?: 'date',
  filterByType?: string,
  showUpcomingOnly?: boolean,
  limit?: number
} = {}): Promise<Array<{ frontMatter: EventFrontMatter, content: string, slug: string }>> {
  // Get all events
  const events = await getAllContent<EventFrontMatter>('events');
  
  // Filter events based on criteria
  let filteredEvents = events;
  
  if (filterByType && filterByType !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.frontMatter.type === filterByType
    );
  }
  
  if (showUpcomingOnly) {
    filteredEvents = filteredEvents.filter(event => 
      event.frontMatter.isUpcoming
    );
  }
  
  // Sort events
  if (sortBy === 'date') {
    filteredEvents.sort((a, b) => 
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredEvents = filteredEvents.slice(0, limit);
  }
  
  return filteredEvents;
}

// Get a single event by slug
export async function getEventBySlug(slug: string): Promise<{ frontMatter: EventFrontMatter, content: string, slug: string } | null> {
  return getContentBySlug<EventFrontMatter>('events', slug);
}
