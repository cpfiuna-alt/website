
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { useLatestContent } from "@/hooks/useLatestContent";
import { Badge } from "@/components/ui/badge";
import { formatDateEs } from "@/utils/dateUtils";

const NewsCardSkeleton = () => (
  <div className="glass-card animate-pulse hover:shadow-neon-blue transition-all duration-300">
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
      title: "Placeholder",
      excerpt: "Placeholder",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "Placeholder"
    },
    {
      title: "Placeholder",
      excerpt: "Placeholder",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "Placeholder"
    },
    {
      title: "Placeholder",
      excerpt: "Placeholder",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "Placeholder"
    },
    {
      title: "Placeholder",
      excerpt: "Placeholder",
      date: new Date().toISOString(),
      category: "Eventos",
      slug: "Placeholder"
    },
  ];

  const item = fallbackItems[index % fallbackItems.length];
  
  // Determine the correct URL path based on category
  let path = '';
  switch(item.category) {
    case 'Cursos':
      path = `/curso/${item.slug}`;
      break;
    case 'Eventos':
      path = `/eventos/${item.slug}`;
      break;
    case 'Proyectos':
      path = `/proyectos/${item.slug}`;
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
      date={item.date && !isNaN(new Date(item.date).getTime()) ? formatDateEs(new Date(item.date), "d MMM yyyy") : "Fecha no disponible"}
      excerpt={item.excerpt}
      category={item.category}
      imageSrc={"/placeholder.svg"}
      slug={path}
    />
  );
};

const News = () => {
  const { latestContent, isLoading } = useLatestContent(4);

  // Function to get the correct path for each content item
  const getContentPath = (item: { category: string; slug: string }) => {
    switch(item.category) {
      case 'Blog':
        return `/blog/${item.slug}`;
      case 'Eventos':
        return `/eventos/${item.slug}`;
      case 'Proyectos':
        return `/proyectos/${item.slug}`;
      case 'Cursos':
        return `/curso/${item.slug}`;
      default:
        return `/${item.slug}`;
    }
  };

  return (
    <section className="py-16 section-padding relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Últimas <span className="gradient-text">Novedades</span>
          </h2>
          <p className="text-muted-foreground">
            Mantenete al día con los últimos acontecimientos, cursos, eventos y recursos del club.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Show skeletons while loading
            Array(4).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="h-full">
                <NewsCardSkeleton />
              </div>
            ))
          ) : latestContent && latestContent.length > 0 ? (
            // Show actual content
            latestContent.map((item) => (
              <div key={item.id} className="h-full">
                <NewsCard
                  title={item.title}
                  date={item.date && !isNaN(new Date(item.date).getTime()) ? formatDateEs(new Date(item.date), "d MMM yyyy") : "Fecha no disponible"}
                  excerpt={item.excerpt}
                  category={item.category}
                  imageSrc={item.imageSrc}
                  slug={getContentPath(item)}
                  eventType={item.eventType}
                />
              </div>
            ))
          ) : (
            // Use fallback content when no data is available
            Array(4).fill(0).map((_, index) => (
              <div key={`fallback-${index}`} className="h-full">
                <FallbackNewsCard index={index} />
              </div>
            ))
          )}
        </div>

        {/*<div className="mt-10 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary/10 text-primary font-medium transition-all hover:bg-primary/20"
          >
            Ver todas las novedades
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>*/}
      </div>
    </section>
  );
};

export default News;
