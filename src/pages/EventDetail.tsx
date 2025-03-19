
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Calendar, Clock, MapPin, Users, ArrowLeft, ExternalLink } from "lucide-react";
import MarkdownContent from "@/components/markdown/MarkdownContent";
import { parseMarkdown, EventFrontMatter } from "@/utils/markdownUtils";

// Import all event markdown files
const eventFiles = import.meta.glob('../content/events/*.md', { as: 'raw', eager: true });

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState<{frontMatter: EventFrontMatter, content: string} | null>(null);
  const [similarEvents, setSimilarEvents] = useState<Array<{
    id: string | number;
    title: string;
    date: string;
    image: string;
    slug: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Load the event data
    setLoading(true);
    
    try {
      // Parse all events
      const allEvents = Object.entries(eventFiles).map(([path, content]) => {
        // Extract slug from path
        const fileSlug = path.split('/').pop()?.replace('.md', '') || '';
        
        // Parse the markdown content
        const { frontMatter, content: eventContent } = parseMarkdown(content);
        
        return {
          frontMatter: { ...frontMatter, slug: fileSlug } as EventFrontMatter,
          content: eventContent
        };
      });

      // Find the current event
      const currentEvent = allEvents.find(event => event.frontMatter.slug === slug);
      
      if (currentEvent) {
        setEvent(currentEvent);
        
        // Get similar events (same type but not the current one)
        const similar = allEvents
          .filter(e => 
            e.frontMatter.slug !== slug && 
            e.frontMatter.type === currentEvent.frontMatter.type
          )
          .map(e => ({
            id: e.frontMatter.id,
            title: e.frontMatter.title,
            date: e.frontMatter.date,
            image: e.frontMatter.image,
            slug: e.frontMatter.slug
          }))
          .slice(0, 3); // Get up to 3 similar events
        
        setSimilarEvents(similar);
      } else {
        console.error(`Event with slug "${slug}" not found`);
        setEvent(null);
      }
    } catch (error) {
      console.error("Error loading event:", error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted/50 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-muted/30 rounded w-1/2 mb-12"></div>
            <div className="h-80 bg-muted/20 rounded mb-8"></div>
            <div className="h-4 bg-muted/30 rounded mb-2"></div>
            <div className="h-4 bg-muted/30 rounded mb-2"></div>
            <div className="h-4 bg-muted/30 rounded mb-2"></div>
            <div className="h-4 bg-muted/30 rounded w-3/4"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Evento no encontrado</h2>
            <p className="text-muted-foreground mb-8">
              Lo sentimos, no pudimos encontrar el evento que estás buscando.
            </p>
            <Link 
              to="/events"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a eventos
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const { frontMatter, content } = event;

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative pt-16">
        <div className="container mx-auto px-6 mb-6">
          <Link
            to="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a eventos
          </Link>
        </div>

        <div className="relative w-full h-[300px] md:h-[500px] mb-12">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={frontMatter.image}
            alt={frontMatter.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-sm font-medium rounded-full mb-4">
                  {frontMatter.type === "hackathon" && "Hackathon"}
                  {frontMatter.type === "workshop" && "Workshop"}
                  {frontMatter.type === "meetup" && "Meetup"}
                  {frontMatter.type === "challenge" && "Challenge"}
                  {frontMatter.type === "conference" && "Conference"}
                  {frontMatter.type === "program" && "Program"}
                  {frontMatter.type === "competition" && "Competition"}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {frontMatter.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  {frontMatter.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event details */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main content */}
            <div className="lg:w-2/3">
              <div className="mb-12 glass-card p-8">
                <MarkdownContent content={content} />
              </div>
              
              {/* Registration section */}
              {frontMatter.isUpcoming && (
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-8 mb-12">
                  <h2 className="text-2xl font-bold mb-4">¿Te interesa este evento?</h2>
                  <p className="text-muted-foreground mb-6">
                    Regístrate ahora para asegurar tu lugar. Los espacios son limitados y 
                    se asignan por orden de inscripción.
                  </p>
                  <a
                    href={frontMatter.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
                  >
                    Registrarme
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
              
              {/* Similar events */}
              {similarEvents.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Eventos similares</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {similarEvents.map((event) => (
                      <Link 
                        key={event.id} 
                        to={`/events/${event.slug}`}
                        className="glass-card overflow-hidden group hover:shadow-neon-blue transition-all"
                      >
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>
                              {new Date(event.date).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="glass-card p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Detalles del evento</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">Fecha</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(frontMatter.date).toLocaleDateString("es-ES", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">Horario</div>
                        <div className="text-sm text-muted-foreground">{frontMatter.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">Ubicación</div>
                        <div className="text-sm text-muted-foreground">{frontMatter.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <div className="font-medium">Organizador</div>
                        <div className="text-sm text-muted-foreground">Club de Programación FIUNA</div>
                      </div>
                    </div>
                  </div>
                  
                  {frontMatter.isUpcoming && (
                    <a
                      href={frontMatter.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center px-4 py-2 mt-6 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-neon-blue"
                    >
                      Registrarme ahora
                    </a>
                  )}
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Compartir evento</h3>
                  <div className="flex gap-3">
                    <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </button>
                    <button className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetail;
