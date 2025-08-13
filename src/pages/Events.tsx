
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import EventsHero from "@/components/events/EventsHero";
import EventFilter, { EventType } from "@/components/events/EventFilter";
import EventsGrid from "@/components/events/EventsGrid";
import EventsCallToAction from "@/components/events/EventsCallToAction";
import EventsLoadingState from "@/components/events/EventsLoadingState";
import { useEvents } from "@/hooks/useEvents";

// Event types for filter with Spanish translations
const eventTypes: EventType[] = [
  { value: "all", label: "Todos" },
  { value: "hackathon", label: "Hackathons" },
  { value: "workshop", label: "Talleres" },
  { value: "meetup", label: "Encuentros" },
  { value: "challenge", label: "Desafíos" },
  { value: "conference", label: "Conferencias" },
  { value: "program", label: "Programas" },
  { value: "competition", label: "Competencias" },
];

// Fallback images for events by type
const eventTypeImages = {
  "hackathon": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "workshop": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "meetup": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "challenge": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "conference": "https://images.unsplash.com/photo-1560439513-74b037a25d84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "program": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "competition": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "default": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

// Function to get Spanish label for event types
export const getEventTypeLabel = (type: string): string => {
  const eventType = eventTypes.find(et => et.value === type);
  return eventType ? eventType.label : type;
};

const Events = () => {
  const [filter, setFilter] = useState("all");
  const [showPast, setShowPast] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { events: allEventsRaw, loading } = useEvents();

  // Ensure all events have images
  const allEvents = allEventsRaw.map(event => {
    // If event has no image or placeholder image, replace with type-specific image
    if (!event.image || event.image === "/placeholder.svg") {
      return {
        ...event,
        image: eventTypeImages[event.type as keyof typeof eventTypeImages] || eventTypeImages.default
      };
    }
    return event;
  });

  // Filter events based on type, upcoming/past status, and search term
  const filteredEvents = allEvents.filter(
    (event) => {
      const matchesType = filter === "all" || event.type === filter;
      const matchesStatus = showPast ? true : event.isUpcoming;
      const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesType && matchesStatus && matchesSearch;
    }
  );

  if (loading) {
    return <EventsLoadingState />;
  }

  // Event search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <EventsHero />
      <section className="py-12">
        <div className="container mx-auto px-6">
          <EventFilter 
            eventTypes={eventTypes}
            filter={filter}
            setFilter={setFilter}
            showPast={showPast}
            setShowPast={setShowPast}
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
          />
          <EventsGrid 
            events={filteredEvents} 
            getEventTypeLabel={getEventTypeLabel}
          />
        </div>
      </section>
      <EventsCallToAction />
    </Layout>
  );
};

export default Events;
