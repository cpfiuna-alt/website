
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectDetailHeaderProps {
  project: ProjectFrontMatter;
}

const ProjectDetailHeader = ({ project }: ProjectDetailHeaderProps) => {
  return (
    <div className="container mx-auto px-6 mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          {project.status && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
              {project.status}
            </span>
          )}
          
          {(project.date || project.lastUpdated) && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Actualizado el {format(parseISO(project.date || project.lastUpdated || new Date().toISOString()), "dd/MM/yyyy")}
            </div>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags && project.tags.map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-muted/70 hover:bg-muted transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {project.githubLink && (
            <a 
              href={project.githubLink}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              Ver repositorio
            </a>
          )}
          
          {project.demoLink && (
            <a 
              href={project.demoLink}
              className="inline-flex items-center px-4 py-2 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:bg-primary/10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Ver demo
            </a>
          )}
        </div>
        
        {project.image && (
          <div className="mb-12 rounded-xl overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
