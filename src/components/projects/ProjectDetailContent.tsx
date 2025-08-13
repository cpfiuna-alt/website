
import React from "react";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import MarkdownContent from "@/components/markdown/MarkdownContent";

interface ProjectDetailContentProps {
  project: ProjectFrontMatter & { content: string };
}

const ProjectDetailContent: React.FC<ProjectDetailContentProps> = ({ project }) => {
  // Function to remove the first h1 heading from markdown content
  const processContent = (content: string): string => {
    if (!content) return content;
    
    // Remove the first H1 heading (which is typically the project title)
    // This regex matches the first # heading at the start of a line
    const withoutFirstH1 = content.replace(/^#\s+.*\n?/m, '');
    
    return withoutFirstH1;
  };

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Render markdown content using MarkdownContent component */}
      {project.content && (
        <MarkdownContent content={processContent(project.content)} />
      )}
      
      {/* Fallback content sections if no markdown content */}
      {!project.content && (
        <div className="space-y-10 text-center">
          <div className="flex flex-col items-center space-y-4">
            <img 
              src="/placeholder.svg" 
              alt="No content available" 
              className="w-32 h-32 opacity-50"
            />
            <div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                No se pudo cargar la información
              </h3>
              <p className="text-muted-foreground">
                El contenido de este proyecto no está disponible en este momento.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailContent;
