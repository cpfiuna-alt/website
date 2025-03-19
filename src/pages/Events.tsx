
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

// Function to get Spanish label for event types
export const getEventTypeLabel = (type: string): string => {
  const eventType = eventTypes.find(et => et.value === type);
  return eventType ? eventType.label : type;
};

const Events = () => {
  const [filter, setFilter] = useState("all");
  const [showPast, setShowPast] = useState(true);
  const { events: allEvents, loading } = useEvents();

  // Filter events based on type and upcoming/past status
  const filteredEvents = allEvents.filter(
    (event) =>
      (filter === "all" || event.type === filter) &&
      (showPast ? true : event.isUpcoming)
  );

  if (loading) {
    return <EventsLoadingState />;
  }

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
