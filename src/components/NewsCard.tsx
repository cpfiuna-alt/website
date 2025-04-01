
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

// Enhanced fallback images by category
const categoryImages = {
  "blog": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "eventos": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "cursos": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "proyectos": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "default": "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

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

  // Get appropriate image or fallback based on category
  const getImage = () => {
    if (!imageSrc || imageSrc === "/placeholder.svg" || !imageSrc.trim()) {
      // Use the category image or default if category doesn't exist in our mapping
      return categoryImages[category.toLowerCase() as keyof typeof categoryImages] || categoryImages.default;
    }
    return imageSrc;
  };

  return (
    <div className="rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px] shadow-md">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <img
          src={getImage()}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement;
            // Fallback to category image on error
            target.src = categoryImages[category.toLowerCase() as keyof typeof categoryImages] || categoryImages.default;
          }}
        />
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
          {excerpt || "Sin descripción disponible"}
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
