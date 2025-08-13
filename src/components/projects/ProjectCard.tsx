
import React from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectCardProps {
  project: ProjectFrontMatter;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  // Get the badge style based on the project status
  const getStatusBadgeStyle = (status?: string) => {
    if (!status) return "bg-[#F59E0BE6] text-white"; // amber-500 with E6 alpha
    
    switch (status.toLowerCase()) {
      case "completado":
        return "bg-[#10B981E6] text-white"; // green-500 with E6 alpha
      case "abandonado":
        return "bg-[#9CA3AFE6] text-white"; // gray-400 with E6 alpha
      case "en desarrollo":
      default:
        return "bg-[#F59E0BE6] text-white"; // amber-500 with E6 alpha
    }
  };

  return (
    <div className="glass-card group hover:shadow-neon-blue transition-all overflow-hidden rounded-xl">
      <div className="relative">
        <Link to={`/proyectos/${project.slug}`}>
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-48 object-cover object-center rounded-t-xl"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>
        
        {/* Status badge in top left */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(project.status)}`}>
            {project.status || "En desarrollo"}
          </span>
        </div>
        
        {/* Featured badge in top right */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#3C83F6E6] text-white">
              Destacado
            </span>
          </div>
        )}

        {/* Tags positioned at the bottom of the image without dark background container */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {project.tags && project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#3C83F6E6] text-white font-medium"
            >
              {tag.replace(/"/g, '')}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <Link to={`/proyectos/${project.slug}`}>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors text-card-foreground">
            {project.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <a
            href={project.githubLink}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4 mr-1" />
            Código
          </a>
          <Link
            to={`/proyectos/${project.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
          >
            Ver detalles
            <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
