
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
          className={`${getStatusBadgeVariant(project.status)} hover:!bg-[var(--badge-bg)] hover:!text-[var(--badge-text)]`}
          style={{
            '--badge-bg': ((): string => {
              const s = (project.status || '').toLowerCase();
              if (s.includes('complet')) return '#3C83F6E6'; // blue (completed)
              if (s.includes('aband') || s.includes('archiv')) return '#9CA3AFE6'; // gray
              if (s.includes('activo')) return '#10B981E6'; // green (active)
              return '#F59E0BE6'; // amber (in development / default)
            })(),
            '--badge-text': '#ffffff'
          } as React.CSSProperties}
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
            className="bg-[#3C83F6E6] text-white text-xs px-3 py-1 rounded-full border-none hover:bg-[#3C83F6E6]"
          >
            {tag.replace(/"/g, '')}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetailHeader;
