
import React from "react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import { Link } from "react-router-dom";
import { Tag, Calendar } from "lucide-react";
import { formatDate } from "@/utils/markdownUtils";

interface ProjectDetailSidebarProps {
  project: ProjectFrontMatter & { content: string };
  relatedProjects: ProjectFrontMatter[];
}

const ProjectDetailSidebar: React.FC<ProjectDetailSidebarProps> = ({ project, relatedProjects }) => {
  // Helper function to render team members
  const renderTeamMembers = () => {
    if (!project.team || project.team.length === 0) {
      return <p className="text-muted-foreground">No hay miembros listados para este proyecto.</p>;
    }

    return (
      <div className="space-y-3">
        {project.team.map((member, index) => {
          if (typeof member === 'string') {
            return (
              <div key={index} className="p-2 rounded-md bg-muted/20">
                <p className="font-medium">{member}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="p-2 rounded-md bg-muted/20">
                <p className="font-medium">{member.name}</p>
                {member.role && <p className="text-xs text-muted-foreground">{member.role}</p>}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Project metadata */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Acerca del proyecto</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Categoría</h4>
            <span className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm">
              {project.category}
            </span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Tecnologías</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-muted/50 rounded-md text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {project.tags && project.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Etiquetas</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 bg-muted/30 rounded text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de inicio</h4>
            <div className="flex items-center text-sm">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {formatDate(project.startDate)}
            </div>
          </div>
          
          {project.endDate && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de finalización</h4>
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                {formatDate(project.endDate)}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Team section */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Equipo</h3>
        {renderTeamMembers()}
      </div>
      
      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Proyectos relacionados</h3>
          <div className="space-y-4">
            {relatedProjects.map((related) => (
              <Link 
                key={related.slug}
                to={`/projects/${related.slug}`}
                className="block group"
              >
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailSidebar;
