import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Calendar, Clock, MapPin, Users, ExternalLink, Filter } from "lucide-react";
import { Link } from "react-router-dom";

// Sample event data
const allEvents = [
  {
    id: 1,
    title: "Hackathon: Soluciones Sostenibles",
    date: "2024-07-15",
    time: "09:00 - 20:00",
    location: "Campus FIUNA, Bloque A",
    description: "Un hackathon de 48 horas para desarrollar soluciones tecnológicas a problemas ambientales actuales.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "hackathon",
    registrationLink: "#",
    isUpcoming: true,
    slug: "hackathon-soluciones-tecnologicas-desarrollo-sostenible"
  },
  {
    id: 2,
    title: "Workshop: Introducción a React",
    date: "2024-06-22",
    time: "14:00 - 17:00",
    location: "Laboratorio de Informática, FIUNA",
    description: "Aprende los fundamentos de React y crea tu primera aplicación en este taller práctico.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "workshop",
    registrationLink: "#",
    isUpcoming: true,
    slug: "workshop-introduccion-apis-desarrollo-sostenible"
  },
  {
    id: 3,
    title: "Charla: Inteligencia Artificial en la Industria",
    date: "2024-06-10",
    time: "18:30 - 20:00",
    location: "Auditorio FIUNA",
    description: "Expertos de la industria discutirán el impacto actual y futuro de la IA en diversos sectores.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "meetup",
    registrationLink: "#",
    isUpcoming: true,
    slug: "conferencia-tecnologia-innovacion-social"
  },
  {
    id: 4,
    title: "Coding Challenge: Algoritmos y Estructuras de Datos",
    date: "2024-05-20",
    time: "16:00 - 19:00",
    location: "Virtual (Discord)",
    description: "Compite en desafíos de programación y mejora tus habilidades de resolución de problemas.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "challenge",
    registrationLink: "#",
    isUpcoming: false,
    slug: "meetup-presentacion-resultados-hackathon"
  },
  {
    id: 5,
    title: "Workshop: Desarrollo de APIs con Node.js",
    date: "2024-05-05",
    time: "15:00 - 18:00",
    location: "Laboratorio de Informática, FIUNA",
    description: "Aprende a crear APIs RESTful robustas con Node.js y Express en este taller práctico.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "workshop",
    registrationLink: "#",
    isUpcoming: false,
    slug: "workshop-desarrollo-apis-nodejs"
  },
  {
    id: 6,
    title: "Hackathon: Innovación en Salud",
    date: "2024-04-10",
    time: "09:00 - 18:00",
    location: "Campus FIUNA",
    description: "Desarrolla soluciones tecnológicas para mejorar la atención médica y la salud pública.",
    image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    type: "hackathon",
    registrationLink: "#",
    isUpcoming: false,
    slug: "hackathon-innovacion-salud"
  },
];

// Event types for filter
const eventTypes = [
  { value: "all", label: "Todos" },
  { value: "hackathon", label: "Hackathons" },
  { value: "workshop", label: "Workshops" },
  { value: "meetup", label: "Meetups" },
  { value: "challenge", label: "Challenges" },
];

const Events = () => {
  const [filter, setFilter] = useState("all");
  const [showPast, setShowPast] = useState(false);

  // Filter events based on type and upcoming/past status
  const filteredEvents = allEvents.filter(
    (event) =>
      (filter === "all" || event.type === filter) &&
      (showPast ? true : event.isUpcoming)
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Eventos</h1>
            <p className="text-xl text-muted-foreground">
              Hackathons, workshops, meetups y challenges para la comunidad tecnológica.
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Filtrar por:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFilter(type.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-all
                    ${
                      filter === type.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {type.label}
                </button>
              ))}
              
              <button
                onClick={() => setShowPast(!showPast)}
                className={`px-4 py-2 rounded-full text-sm transition-all ml-2
                  ${
                    showPast
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
              >
                {showPast ? "Todos los eventos" : "Solo próximos"}
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="glass-card group hover:shadow-neon-blue transition-all"
                >
                  <Link to={`/events/${event.slug}`} className="block">
                    <div className="relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover object-center rounded-t-xl"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.isUpcoming 
                            ? "bg-primary/90 text-primary-foreground" 
                            : "bg-muted/90 text-muted-foreground"
                        }`}>
                          {event.isUpcoming ? "Próximo" : "Pasado"}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-background/90 text-foreground">
                          {event.type === "hackathon" && "Hackathon"}
                          {event.type === "workshop" && "Workshop"}
                          {event.type === "meetup" && "Meetup"}
                          {event.type === "challenge" && "Challenge"}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <Link to={`/events/${event.slug}`}>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                    </Link>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>
                          {new Date(event.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    {event.isUpcoming ? (
                      <Link
                        to={`/events/${event.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-neon-blue"
                      >
                        Ver detalles
                      </Link>
                    ) : (
                      <Link
                        to={`/events/${event.slug}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium transition-colors hover:bg-muted/80"
                      >
                        Ver resumen
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hay eventos disponibles</h3>
              <p className="text-muted-foreground">
                No se encontraron eventos con los filtros actuales.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Quieres proponer un evento?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Si tienes ideas para workshops, charlas o cualquier evento relacionado con la programación,
              nos encantaría escucharlas.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
