
import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  imageSrc: string;
  slug: string;
  eventType?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  date,
  excerpt,
  category,
  imageSrc,
  slug,
  eventType,
}) => {
  // Get the correct badge color based on category
  const getBadgeColor = () => {
    switch (category.toLowerCase()) {
      case "blog":
        return "bg-purple-500";
      case "eventos":
        return "bg-green-500";
      case "cursos":
        return "bg-blue-500";
      case "proyectos":
        return "bg-orange-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <img src="/placeholder.svg" alt="Placeholder" className="w-12 h-12 opacity-50" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className={`${getBadgeColor()} text-white text-xs font-semibold`}>
            {category}
          </Badge>
        </div>
        {eventType && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="text-xs font-semibold">
              {eventType}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-6 bg-black/80 text-white">
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2 text-sm">
          {excerpt}
        </p>
        <Link
          to={slug}
          className="inline-flex items-center text-blue-400 font-medium hover:underline text-sm"
        >
          Leer más <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
