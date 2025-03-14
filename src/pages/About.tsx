import React, { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  ChevronRight, ChevronLeft, Users, BookOpen, Star, Award, 
  Code, GraduationCap, Heart, Lightbulb, Handshake, 
  MessageSquare, Trophy, Globe, BookOpen as BookIcon
} from "lucide-react";
import TeamMembers from "@/components/about/TeamMembers";

const timelineEvents = [
  {
    year: "2016",
    title: "Preparación del Club",
    description: "Un grupo de estudiantes apasionados comienza a planificar la creación de un club para fomentar la cultura de programación en la facultad, estableciendo las bases de lo que se convertiría en el Club de Programación FIUNA.",
    icon: Users,
    image: "/images/timeline/preparation.jpg"
  },
  {
    year: "2017",
    title: "Fundación del Club",
    description: "El Club de Programación FIUNA es oficialmente fundado, comenzando su misión de fomentar la cultura de desarrollo de software en la facultad.",
    icon: Users,
    image: "/images/timeline/foundation.jpg"
  },
  {
    year: "2018",
    title: "Primer Hackathon FIUNA",
    description: "Organizamos nuestro primer hackathon con más de 50 participantes, estableciendo las bases para una tradición anual que continúa hasta hoy.",
    icon: Code,
    image: "/images/timeline/hackathon.jpg"
  },
  {
    year: "2019",
    title: "Expansión y Crecimiento",
    description: "El club creció significativamente, alcanzando más de 100 miembros activos y estableciendo alianzas con empresas tecnológicas locales.",
    icon: GraduationCap,
    image: "/images/timeline/growth.jpg"
  },
  {
    year: "2020",
    title: "Adaptación Virtual",
    description: "Ante la pandemia global, transformamos todas nuestras actividades a formato virtual, alcanzando a más estudiantes que nunca con webinars y hackatones en línea.",
    icon: BookOpen,
    image: "/images/timeline/virtual.jpg"
  },
  {
    year: "2021",
    title: "Primeros Proyectos Open Source",
    description: "Lanzamos nuestras primeras contribuciones a proyectos de código abierto, estableciendo la cultura de colaboración en el desarrollo de software.",
    icon: Star,
    image: "/images/timeline/opensource.jpg"
  },
  {
    year: "2022",
    title: "Reconocimiento Internacional",
    description: "Miembros del club representaron a Paraguay en competencias internacionales de programación, poniendo a FIUNA en el mapa tecnológico mundial.",
    icon: Award,
    image: "/images/timeline/international.jpg"
  },
  {
    year: "2023",
    title: "Hub de Innovación",
    description: "Establecimos el primer espacio físico permanente del club, convertido en hub de innovación y desarrollo de proyectos para estudiantes.",
    icon: Star,
    image: "/images/timeline/hub.jpg"
  },
  {
    year: "2024",
    title: "Presente y Futuro",
    description: "Continuamos expandiendo nuestra misión con nuevas iniciativas, talleres especializados y proyectos de impacto social a través de la tecnología.",
    icon: Star,
    image: "/images/timeline/present.jpg"
  },
  {
    year: "2025",
    title: "Visión de Futuro",
    description: "Planeamos expandir nuestra influencia más allá de la universidad, creando un ecosistema tecnológico que beneficie a toda la comunidad paraguaya.",
    icon: Star,
    image: "/images/timeline/future.jpg"
  }
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToEvent = (index: number) => {
    if (index >= 0 && index < timelineEvents.length) {
      setActiveIndex(index);
      
      const eventElements = timelineRef.current?.querySelectorAll('.timeline-event');
      if (eventElements && eventElements[index]) {
        eventElements[index].scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
  };

  const nextEvent = () => {
    if (activeIndex < timelineEvents.length - 1) {
      scrollToEvent(activeIndex + 1);
    }
  };

  const prevEvent = () => {
    if (activeIndex > 0) {
      scrollToEvent(activeIndex - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextEvent();
      } else if (e.key === 'ArrowLeft') {
        prevEvent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent dark:from-background dark:to-black/40 z-0"></div>
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl z-0 opacity-70"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Sobre <span className="gradient-text">Nosotros</span>
          </h1>
          
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto">
            Somos una comunidad de estudiantes y profesionales apasionados por la programación 
            y el desarrollo de software en la Facultad de Ingeniería de la Universidad Nacional de Asunción.
          </p>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-muted/50 dark:bg-black/40">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
              <p className="text-muted-foreground">
                Fomentar la cultura de programación y desarrollo de software en la comunidad 
                universitaria, brindando un espacio de aprendizaje, colaboración y crecimiento 
                para todos los interesados en la tecnología.
              </p>
            </div>
            
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
              <p className="text-muted-foreground">
                Ser reconocidos como un referente en innovación tecnológica y formación de 
                profesionales de excelencia, contribuyendo al desarrollo tecnológico del país 
                mediante la creación de soluciones de impacto social positivo.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-6 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Nuestros <span className="gradient-text">Valores</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Pasión</h3>
              <p className="text-sm text-muted-foreground text-center">
                Trabajamos con entusiasmo y dedicación, motivados por nuestro amor a la tecnología y la resolución de problemas.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Handshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Colaboración</h3>
              <p className="text-sm text-muted-foreground text-center">
                Creemos en el poder del trabajo en equipo y el intercambio de conocimientos para lograr objetivos comunes.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Innovación</h3>
              <p className="text-sm text-muted-foreground text-center">
                Buscamos constantemente nuevas ideas y soluciones creativas para enfrentar los desafíos tecnológicos actuales.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Inclusión</h3>
              <p className="text-sm text-muted-foreground text-center">
                Promovemos un ambiente diverso y accesible donde todas las voces son valoradas y respetadas.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Excelencia</h3>
              <p className="text-sm text-muted-foreground text-center">
                Nos esforzamos por alcanzar los más altos estándares de calidad en todo lo que hacemos.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <BookIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Aprendizaje</h3>
              <p className="text-sm text-muted-foreground text-center">
                Valoramos el conocimiento y el crecimiento continuo, compartiendo lo que aprendemos con la comunidad.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.7s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Perseverancia</h3>
              <p className="text-sm text-muted-foreground text-center">
                Mantenemos nuestra determinación frente a los desafíos, valorando el esfuerzo constante.
              </p>
            </div>
            
            <div className="glass-card p-6 transition-all hover:shadow-neon-blue animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Comunicación</h3>
              <p className="text-sm text-muted-foreground text-center">
                Fomentamos el diálogo abierto y honesto, compartiendo ideas y conocimientos de manera clara y efectiva.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Members Section */}
      <TeamMembers />
      
      {/* Comisión Directiva & Secretarías sections are in TeamMembers component */}
      
      {/* Interactive Timeline */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent dark:from-background dark:to-black/60 z-0"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl font-bold mb-16 text-center">
            Nuestra <span className="gradient-text">Historia</span>
          </h2>
          
          <div className="flex justify-center items-center gap-4 mb-12">
            <button 
              onClick={prevEvent}
              disabled={activeIndex === 0}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Evento anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <span className="text-xl font-medium">
              {timelineEvents[activeIndex].year}
            </span>
            
            <button 
              onClick={nextEvent}
              disabled={activeIndex === timelineEvents.length - 1}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Siguiente evento"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          {/* Timeline Line */}
          <div className="relative h-1 bg-muted/50 dark:bg-muted/30 rounded-full mb-8">
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(activeIndex / (timelineEvents.length - 1)) * 100}%` }}
            ></div>
            
            {timelineEvents.map((event, index) => (
              <button
                key={event.year}
                onClick={() => scrollToEvent(index)}
                className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full transition-all duration-300 ${
                  index <= activeIndex ? 'bg-primary' : 'bg-muted'
                } ${index === activeIndex ? 'scale-150' : 'scale-100'}`}
                style={{ left: `${(index / (timelineEvents.length - 1)) * 100}%` }}
                aria-label={`Ver evento de ${event.year}`}
              ></button>
            ))}
          </div>
          
          {/* Timeline Events */}
          <div 
            ref={timelineRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >
            <div className="order-2 md:order-1">
              <div className="glass-card p-8 timeline-event">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {React.createElement(timelineEvents[activeIndex].icon, { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{timelineEvents[activeIndex].title}</h3>
                    <p className="text-muted-foreground text-sm">{timelineEvents[activeIndex].year}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {timelineEvents[activeIndex].description}
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="glass-card overflow-hidden">
                <div className="bg-muted/20 dark:bg-black/30 aspect-video flex items-center justify-center">
                  <Code className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Year Indicators */}
          <div className="flex justify-between mt-10">
            {timelineEvents.map((event, index) => (
              <button
                key={event.year}
                onClick={() => scrollToEvent(index)}
                className={`text-xs font-medium transition-all ${
                  index === activeIndex 
                    ? 'text-primary scale-110' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {event.year}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">
            Sé parte de nuestra <span className="gradient-text">historia</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Unite al Club de Programación FIUNA y contribuí a formar la próxima generación 
            de desarrolladores e innovadores tecnológicos en Paraguay.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
            >
              Unite al club
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
            >
              Ver nuestros proyectos
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
