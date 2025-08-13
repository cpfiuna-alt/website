import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { EventFrontMatter } from "@/utils/markdownUtils";
import { getEventBySlug } from "@/utils/eventsService";
import NotFound from "./NotFound";
import EventDetailContainer from "@/components/events/EventDetailContainer";
import EventDetailSkeleton from "@/components/events/EventDetailSkeleton";
import { ChevronLeft } from "lucide-react";

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<EventFrontMatter & { content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!slug) return;
      
      setLoading(true);
      try {
        const eventData = await getEventBySlug(slug);
        if (eventData) {
          setEvent({
            ...eventData.frontMatter,
            content: eventData.content
          } as EventFrontMatter & { content: string });
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvent();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <EventDetailSkeleton />
      </Layout>
    );
  }

  if (!event) {
    return <NotFound />;
  }

  return (
    <Layout>
      <EventDetailContainer event={event} />
    </Layout>
  );
};

export default EventDetail;
