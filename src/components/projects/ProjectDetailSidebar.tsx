
import React from "react";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectDetailSidebarProps {
  project: ProjectFrontMatter;
  relatedProjects: ProjectFrontMatter[];
}

const ProjectDetailSidebar = ({ project, relatedProjects }: ProjectDetailSidebarProps) => {
  return (
    <div className="md:col-span-1 order-2 md:order-1">
      <div className="bg-muted/30 rounded-xl p-6 mb-8 sticky top-24">
        {project.contributors !== undefined && (
          <>
            <h3 className="text-lg font-semibold mb-4">Equipo del proyecto</h3>
            <div className="flex items-center mb-6">
              <Users className="h-5 w-5 mr-2 text-primary" />
              <span>{project.contributors} contribuidores</span>
            </div>
          </>
        )}
        
        {relatedProjects.length > 0 && (
          <div className="pt-6 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Proyectos relacionados</h3>
            
            <div className="space-y-4">
              {relatedProjects.map((related) => (
                <Link 
                  key={related.slug}
                  to={`/projects/${related.slug}`}
                  className="block group"
                >
                  <div className="flex items-start space-x-3">
                    <img 
                      src={related.image || "/placeholder.svg"} 
                      alt={related.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {related.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {related.tags && related.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="inline-block px-2 py-0.5 bg-muted/50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailSidebar;
