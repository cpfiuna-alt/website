
import React from "react";
import { Code } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import { Container } from "@/components/ui/container";

interface ProjectsGridProps {
  projects: ProjectFrontMatter[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  if (projects.length === 0) {
    return (
      <Container size="full" className="mx-auto">
        <div className="text-center py-16 bg-black/80 rounded-xl border border-border/50">
          <Code className="h-12 w-12 mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">No hay proyectos disponibles</h3>
          <p className="text-gray-400">
            No se encontraron proyectos con los filtros actuales.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container size="full" className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
};

export default ProjectsGrid;
