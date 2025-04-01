
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
    if (!status) return "bg-amber-500 text-white";
    
    switch (status.toLowerCase()) {
      case "completado":
        return "bg-green-500 text-white";
      case "abandonado":
        return "bg-gray-400 text-white";
      case "en desarrollo":
      default:
        return "bg-amber-500 text-white";
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg group hover:translate-y-[-5px] transition-all duration-300 border border-border/50 bg-black">
      <div className="relative">
        <Link to={`/projects/${project.slug}`}>
          <img
            src={project.image}
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
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-white">
              Destacado
            </span>
          </div>
        )}

        {/* Tags positioned at the bottom of the image without dark background container */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {project.tags && project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#2563eb] text-white font-medium"
            >
              {tag.replace(/"/g, '')}
            </span>
          ))}
        </div>
      </div>
      <div className="p-6">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors text-white">
            {project.title}
          </h3>
        </Link>
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <a
            href={project.githubLink}
            className="inline-flex items-center text-sm text-gray-400 hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4 mr-1" />
            Código
          </a>
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium transition-all hover:bg-blue-700"
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
