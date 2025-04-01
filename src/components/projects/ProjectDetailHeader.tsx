
import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectFrontMatter } from "@/utils/markdownUtils";

interface ProjectDetailHeaderProps {
  project: ProjectFrontMatter;
  formatDateIfAvailable: (dateString?: string) => string;
  getStatusBadgeVariant: (status?: string) => string;
}

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({
  project,
  formatDateIfAvailable,
  getStatusBadgeVariant
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Badge 
          variant="default" 
          className={getStatusBadgeVariant(project.status)}
        >
          {project.status || "En desarrollo"}
        </Badge>
        <div className="inline-flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          Actualizado el {formatDateIfAvailable(project.lastUpdated)}
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        {project.title}
      </h1>
      
      <p className="text-xl text-muted-foreground mb-6">
        {project.description}
      </p>
      
      {/* Tags/technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags && project.tags.map((tag, index) => (
          <Badge 
            key={index}
            variant="secondary" 
            className="bg-[#2563eb] text-white text-xs px-3 py-1 rounded-full border-none"
          >
            {tag.replace(/"/g, '')}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
