
import React from "react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import { Link } from "react-router-dom";
import { Tag, Calendar, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/markdownUtils";
import ProjectGithubStats from "@/components/projects/ProjectGithubStats";

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
    <aside className="space-y-6">
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Acerca del proyecto</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de inicio</h4>
              <div className="flex items-center text-sm">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                {formatDate(project.startDate)}
              </div>
            </div>

            {project.endDate && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Fecha de finalización</h4>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-primary" />
                  {formatDate(project.endDate)}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">Equipo</h3>
          {renderTeamMembers()}
        </CardContent>
      </Card>

      {project.githubLink && project.githubLink !== '#' && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Estadísticas de GitHub</h3>
            </div>
            <div>
              <ProjectGithubStats
                repoUrl={project.githubLink}
                stats={project.githubStats || { stars: 0, forks: 0, issues: 0, contributors: 0 }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {relatedProjects.length > 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-3">Proyectos relacionados</h3>
            <div className="space-y-4">
              {relatedProjects.map((related) => (
                <Link 
                  key={related.slug}
                  to={`/proyectos/${related.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                      <img 
                        src={related.image || "/placeholder.svg"} 
                        alt={related.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
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
          </CardContent>
        </Card>
      )}
    </aside>
  );
};

export default ProjectDetailSidebar;
