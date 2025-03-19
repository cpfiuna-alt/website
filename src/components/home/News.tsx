
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { useLatestContent } from "@/hooks/useLatestContent";
import { Badge } from "@/components/ui/badge";
import { formatDateEs } from "@/utils/dateUtils";

const NewsCardSkeleton = () => (
  <div className="glass-card animate-pulse rounded-xl overflow-hidden">
    <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
    <div className="p-6 space-y-3">
      <div className="flex items-center text-sm space-x-2">
        <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

// Add a fallback card in case we need to show demo content
const FallbackNewsCard = ({ index }: { index: number }) => {
  const fallbackItems = [
    {
      title: "Nuevo curso de Python para principiantes",
      excerpt: "Aprende los fundamentos de la programación con uno de los lenguajes más populares.",
      date: new Date().toISOString(),
      category: "Cursos",
      slug: "python-principiantes"
    },
    {
      title: "Hackathon: Soluciones tecnológicas sostenibles",
      excerpt: "Participa en este evento de 48 horas para crear soluciones a problemas ambientales.",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "hackathon-soluciones-sostenibles"
    },
    {
      title: "Proyecto destacado: Análisis de datos climáticos",
      excerpt: "Herramienta de visualización y análisis de datos meteorológicos históricos.",
      date: new Date().toISOString(),
      category: "Proyectos",
      slug: "analisis-datos-climaticos"
    },
    {
      title: "Workshop: Introducción a React",
      excerpt: "Aprende los fundamentos de React y crea tu primera aplicación en este taller práctico.",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "workshop-introduccion-react"
    }
  ];

  const item = fallbackItems[index % fallbackItems.length];
  
  // Determine the correct URL path based on category
  let path = '';
  switch(item.category) {
    case 'Cursos':
      path = `/course/${item.slug}`;
      break;
    case 'Eventos':
      path = `/events/${item.slug}`;
      break;
    case 'Proyectos':
      path = `/projects/${item.slug}`;
      break;
    case 'Blog':
      path = `/blog/${item.slug}`;
      break;
    default:
      path = `/${item.slug}`;
  }
  
  return (
    <NewsCard
      key={`fallback-${index}`}
      title={item.title}
      date={formatDateEs(new Date(item.date), "d MMM yyyy")}
      excerpt={item.excerpt}
      category={item.category}
      imageSrc={"/placeholder.svg"}
      slug={path}
    />
  );
};

const News = () => {
  const { latestContent, isLoading } = useLatestContent(4);
  console.log("Latest content in News component:", latestContent);

  // Function to get the correct path for each content item
  const getContentPath = (item: { category: string; slug: string }) => {
    switch(item.category) {
      case 'Blog':
        return `/blog/${item.slug}`;
      case 'Eventos':
        return `/events/${item.slug}`;
      case 'Proyectos':
        return `/projects/${item.slug}`;
      case 'Cursos':
        return `/course/${item.slug}`;
      default:
        return `/${item.slug}`;
    }
  };

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
          {isLoading ? (
            // Show skeletons while loading
            Array(4).fill(0).map((_, index) => (
              <NewsCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : latestContent && latestContent.length > 0 ? (
            // Show actual content
            latestContent.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                date={formatDateEs(new Date(item.date), "d MMM yyyy")}
                excerpt={item.excerpt}
                category={item.category}
                imageSrc={item.imageSrc}
                slug={getContentPath(item)}
                eventType={item.eventType}
              />
            ))
          ) : (
            // Use fallback content when no data is available
            Array(4).fill(0).map((_, index) => (
              <FallbackNewsCard key={`fallback-${index}`} index={index} />
            ))
          )}
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
