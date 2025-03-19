
import React from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, Tag } from "lucide-react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectCardProps {
  project: ProjectFrontMatter;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  return (
    <div className="glass-card group hover:shadow-neon-blue transition-all">
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
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
              Destacado
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <Link to={`/projects/${project.slug}`}>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags && project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-background/60 dark:bg-background/20 backdrop-blur-sm"
            >
              <Tag className="h-3 w-3 mr-1 text-primary" />
              {tag}
            </span>
          ))}
        </div>
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
            to={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-neon-blue"
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
