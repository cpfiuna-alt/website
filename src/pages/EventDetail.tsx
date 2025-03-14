
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowLeft, 
  Share2, 
  Users, 
  Tag,
  ExternalLink,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Sample event data (in a real app, this would come from an API/PayloadCMS)
const event = {
  id: "1",
  title: "Hackathon: Soluciones Tecnológicas para el Desarrollo Sostenible",
  slug: "hackathon-soluciones-tecnologicas-desarrollo-sostenible",
  date: new Date("2023-11-15T09:00:00"),
  endDate: new Date("2023-11-16T18:00:00"),
  location: {
    name: "Facultad de Ingeniería - UNA",
    address: "Campus Universitario, San Lorenzo",
    mapUrl: "https://maps.google.com",
    isVirtual: false,
    meetingUrl: null
  },
  organizers: ["Club de Programación FIUNA", "IEEE Student Branch FIUNA"],
  attendees: 120,
  maxAttendees: 150,
  tags: ["Hackathon", "Desarrollo Sostenible", "Innovación", "ODS"],
  coverImage: "https://images.unsplash.com/photo-1540304453527-62f979142a17?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  excerpt: "Únete a este desafío de 24 horas donde equipos multidisciplinarios desarrollarán soluciones tecnológicas para abordar los Objetivos de Desarrollo Sostenible.",
  description: `
    <h2>Acerca del Hackathon</h2>
    <p>Este hackathon está diseñado para reunir a estudiantes, profesionales y entusiastas de la tecnología para desarrollar soluciones innovadoras que aborden los Objetivos de Desarrollo Sostenible (ODS) de las Naciones Unidas, con un enfoque especial en los desafíos locales de Paraguay.</p>
    
    <p>Durante 24 horas intensivas, los participantes trabajarán en equipos para conceptualizar, diseñar y prototipar soluciones tecnológicas que puedan tener un impacto positivo en áreas como:</p>
    
    <ul>
      <li>Agua limpia y saneamiento (ODS 6)</li>
      <li>Energía asequible y no contaminante (ODS 7)</li>
      <li>Educación de calidad (ODS 4)</li>
      <li>Reducción de las desigualdades (ODS 10)</li>
      <li>Acción por el clima (ODS 13)</li>
    </ul>
    
    <h2>Dinámica del evento</h2>
    
    <h3>Día 1 (15 de Noviembre)</h3>
    <ul>
      <li><strong>09:00 - 10:00:</strong> Registro y bienvenida</li>
      <li><strong>10:00 - 11:00:</strong> Presentación de los desafíos y formación de equipos</li>
      <li><strong>11:00 - 12:00:</strong> Charlas inspiradoras: "Tecnología para el Desarrollo Sostenible"</li>
      <li><strong>12:00 - 13:00:</strong> Almuerzo</li>
      <li><strong>13:00 - 20:00:</strong> Desarrollo de soluciones (mentorías disponibles)</li>
      <li><strong>20:00 - 21:00:</strong> Cena</li>
      <li><strong>21:00 - 09:00:</strong> Hackathon continúa (los participantes pueden quedarse toda la noche)</li>
    </ul>
    
    <h3>Día 2 (16 de Noviembre)</h3>
    <ul>
      <li><strong>09:00 - 12:00:</strong> Últimos ajustes a los proyectos</li>
      <li><strong>12:00 - 13:00:</strong> Almuerzo</li>
      <li><strong>13:00 - 16:00:</strong> Preparación de presentaciones</li>
      <li><strong>16:00 - 18:00:</strong> Pitch final y evaluación del jurado</li>
      <li><strong>18:00:</strong> Ceremonia de premiación y clausura</li>
    </ul>
    
    <h2>Premios</h2>
    <p>Los equipos ganadores recibirán:</p>
    <ul>
      <li><strong>1er lugar:</strong> Gs. 5.000.000 + Incubación del proyecto + Mentoría por 3 meses</li>
      <li><strong>2do lugar:</strong> Gs. 3.000.000 + Acceso a espacio de coworking por 6 meses</li>
      <li><strong>3er lugar:</strong> Gs. 1.500.000 + Cursos de emprendimiento</li>
      <li><strong>Premio Innovación:</strong> Kit de hardware IoT y mentoría técnica</li>
    </ul>
    
    <h2>Requisitos para participar</h2>
    <ul>
      <li>Mayores de 18 años o estudiantes universitarios</li>
      <li>Equipos de 3 a 5 personas (puedes registrarte individualmente y formar equipo durante el evento)</li>
      <li>Traer laptop, cargador y cualquier hardware específico que planees utilizar</li>
      <li>Conocimientos básicos de programación o diseño (no excluyente)</li>
      <li>Muchas ganas de innovar y colaborar</li>
    </ul>
    
    <h2>Jurado</h2>
    <p>Los proyectos serán evaluados por un panel de expertos en tecnología, innovación y desarrollo sostenible, incluyendo representantes de:</p>
    <ul>
      <li>Facultad de Ingeniería UNA</li>
      <li>CONACYT</li>
      <li>Empresas tecnológicas locales</li>
      <li>ONGs enfocadas en desarrollo sostenible</li>
    </ul>
    
    <h2>Patrocinadores</h2>
    <p>Este evento es posible gracias al apoyo de:</p>
    <ul>
      <li>FIUNA</li>
      <li>CONACYT</li>
      <li>IEEE</li>
      <li>TechPy</li>
    </ul>
    
    <p>¡No pierdas la oportunidad de ser parte de este emocionante evento donde la tecnología se encuentra con el impacto social! Las plazas son limitadas, así que asegura tu lugar registrándote lo antes posible.</p>
  `,
  status: "upcoming", // upcoming, ongoing, past
  registrationUrl: "#",
  price: "Gratuito",
  relatedEvents: [
    {
      id: "2",
      title: "Workshop: Introducción a las APIs para el Desarrollo Sostenible",
      slug: "workshop-introduccion-apis-desarrollo-sostenible",
      date: new Date("2023-11-10T14:00:00"),
      coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "3",
      title: "Conferencia: Tecnología e Innovación Social",
      slug: "conferencia-tecnologia-innovacion-social",
      date: new Date("2023-11-20T18:00:00"),
      coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "4",
      title: "Meetup: Presentación de Resultados del Hackathon",
      slug: "meetup-presentacion-resultados-hackathon",
      date: new Date("2023-11-30T19:00:00"),
      coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ]
};

const EventDetail = () => {
  // In a real app, we would fetch the event based on the slug
  const { slug } = useParams<{ slug: string }>();
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = `${event.title} | Club de Programación FIUNA`;
  }, []);

  // Calculate if registration is still open
  const isRegistrationOpen = new Date() < new Date(event.date);
  
  // Format event dates
  const eventDate = format(event.date, "EEEE d 'de' MMMM, yyyy", { locale: es });
  const eventTime = `${format(event.date, "HH:mm")} - ${format(event.endDate, "HH:mm")}`;
  const isMultiDay = event.date.getDate() !== event.endDate.getDate();
  const dateDisplay = isMultiDay
    ? `${format(event.date, "d")} - ${format(event.endDate, "d 'de' MMMM, yyyy")}`
    : eventDate;

  return (
    <Layout>
      <article className="relative py-12 md:py-20">
        {/* Back to events button */}
        <div className="container mx-auto px-6 mb-8">
          <Link 
            to="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a eventos
          </Link>
        </div>
        
        {/* Cover image */}
        <div className="relative w-full h-[300px] md:h-[500px] mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src={event.coverImage} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="container px-6 mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {event.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {event.title}
                </h1>
                <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                  {event.excerpt}
                </p>
                
                {event.status === "upcoming" && (
                  <div className="flex justify-center">
                    <a 
                      href={event.registrationUrl}
                      className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Registrarme
                    </a>
                  </div>
                )}
                
                {event.status === "ongoing" && (
                  <div className="px-4 py-2 rounded-full bg-green-500/80 text-white inline-flex items-center">
                    <span className="relative flex h-3 w-3 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    En curso ahora
                  </div>
                )}
                
                {event.status === "past" && (
                  <div className="px-4 py-2 rounded-full bg-muted/50 text-white inline-flex items-center">
                    Evento finalizado
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Event content */}
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar with event details */}
            <div className="md:col-span-1 order-2 md:order-1">
              <div className="bg-muted/30 rounded-xl p-6 mb-8 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Detalles del evento</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Fecha</div>
                      <div className="text-sm text-muted-foreground">{dateDisplay}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Hora</div>
                      <div className="text-sm text-muted-foreground">{eventTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Ubicación</div>
                      <div className="text-sm text-muted-foreground">{event.location.name}</div>
                      <div className="text-sm text-muted-foreground">{event.location.address}</div>
                      {event.location.mapUrl && (
                        <a 
                          href={event.location.mapUrl}
                          className="text-xs text-primary hover:underline mt-1 inline-flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver en mapa
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Organizadores</div>
                      <div className="text-sm text-muted-foreground">
                        {event.organizers.join(", ")}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Participantes</div>
                      <div className="text-sm text-muted-foreground">
                        {event.attendees}/{event.maxAttendees} registrados
                      </div>
                      <div className="w-full h-1.5 bg-muted/50 rounded-full mt-2">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ 
                            width: `${(event.attendees / event.maxAttendees) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Tag className="h-5 w-5 text-primary mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Etiquetas</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {event.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="inline-block px-2 py-0.5 bg-muted/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {isRegistrationOpen ? (
                  <a 
                    href={event.registrationUrl}
                    className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Registrarme ahora
                  </a>
                ) : (
                  <div className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 rounded-full bg-muted text-muted-foreground font-medium">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Registro cerrado
                  </div>
                )}
                
                <button className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:bg-primary/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir evento
                </button>
              </div>
            </div>
            
            {/* Main event content */}
            <div className="md:col-span-2 order-1 md:order-2">
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
              
              {/* Related events */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Eventos relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {event.relatedEvents.map((relatedEvent) => (
                    <Link 
                      key={relatedEvent.id} 
                      to={`/events/${relatedEvent.slug}`}
                      className="group"
                    >
                      <div className="rounded-lg overflow-hidden mb-3">
                        <img 
                          src={relatedEvent.coverImage} 
                          alt={relatedEvent.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors">
                        {relatedEvent.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(relatedEvent.date, "d 'de' MMMM, yyyy", { locale: es })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default EventDetail;
