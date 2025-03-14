
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc?: string;
  link: string;
};

const News = () => {
  // Datos de muestra para las noticias
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Inscripciones abiertas: Curso de Introducción a Python",
      excerpt: "Aprende los fundamentos de Python con nuestro curso práctico para principiantes.",
      date: "15 Oct 2023",
      category: "Cursos",
      imageSrc: "/placeholder.svg",
      link: "/events/python-course",
    },
    {
      id: "2",
      title: "Hackathon Nacional 2023: ¡Inscripciones abiertas!",
      excerpt: "Participa en el mayor evento de programación del país y demuestra tus habilidades.",
      date: "23 Sep 2023",
      category: "Eventos",
      imageSrc: "/placeholder.svg",
      link: "/events/hackathon-2023",
    },
    {
      id: "3",
      title: "Lanzamiento: Nueva plataforma de recursos para miembros",
      excerpt: "Accede a cientos de tutoriales, cursos y herramientas exclusivas para miembros del club.",
      date: "05 Sep 2023",
      category: "Recursos",
      imageSrc: "/placeholder.svg",
      link: "/resources/platform",
    },
    {
      id: "4",
      title: "Entrevista: Egresados exitosos en la industria tech",
      excerpt: "Conoce las historias de ex-miembros del club que están triunfando en empresas globales.",
      date: "28 Ago 2023",
      category: "Blog",
      imageSrc: "/placeholder.svg",
      link: "/blog/alumni-success",
    },
  ];

  return (
    <section className="py-16 section-padding relative">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Últimas <span className="gradient-text">Novedades</span>
          </h2>
          <p className="text-muted-foreground">
            Mantente al día con los últimos acontecimientos, cursos, eventos y recursos del club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <div 
              key={item.id} 
              className="glass-card overflow-hidden group hover:shadow-neon-blue transition-all duration-300"
            >
              <div className="h-40 bg-muted relative overflow-hidden">
                <img 
                  src={item.imageSrc} 
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 right-0 bg-primary/90 text-primary-foreground px-3 py-1 text-xs font-medium">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link 
                  to={item.link}
                  className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                >
                  Leer más
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium transition-all hover:bg-primary/20"
          >
            Ver todas las novedades
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
