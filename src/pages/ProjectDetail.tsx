
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ProjectFrontMatter, GitHubStats } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdown/formatters";
import NotFound from "./NotFound";
import { ChevronLeft, Github, ExternalLink, Calendar, Users } from "lucide-react";
import ProjectGithubStats from "@/components/projects/ProjectGithubStats";
import ProjectDetailSidebar from "@/components/projects/ProjectDetailSidebar";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";
import ProjectDetailHeader from "@/components/projects/ProjectDetailHeader";
import ProjectDetailGallery from "@/components/projects/ProjectDetailGallery";
import { useProjects } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { allProjects, loading } = useProjects();
  const [project, setProject] = useState<(ProjectFrontMatter & { content: string }) | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectFrontMatter[]>([]);
  useEffect(() => {
    if (!loading && slug) {
      const foundProject = allProjects.find(
        (p) => p.slug === slug
      ) as (ProjectFrontMatter & { content: string }) | undefined;
      
      if (foundProject) {
        setProject(foundProject);
        
        // Find related projects with similar tags or category
        const related = allProjects
          .filter(p => 
            p.slug !== slug && 
            (p.category === foundProject.category || 
              (foundProject.tags && p.tags && 
                p.tags.some(tag => foundProject.tags?.includes(tag)))))
          .slice(0, 3);
        
        setRelatedProjects(related);
      }
    }
  }, [slug, allProjects, loading]);
  // Helper function for formatting dates using centralized parser/formatter
  const formatDateIfAvailable = (dateString?: string) => {
    if (!dateString) return "No disponible";
    try {
      return formatDate(dateString);
    } catch (e) {
      return dateString;
    }
  };
  
  // Function to get status badge variant based on status
  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return "bg-[#F59E0BE6] text-white"; // default: amber
    const s = status.toLowerCase();

    // Map common Spanish and English variants to consistent colors
    if (s.includes('complet')) return "bg-[#3C83F6E6] text-white"; // blue (completed)
    if (s.includes('aband') || s.includes('archiv')) return "bg-[#9CA3AFE6] text-white"; // gray
    if (s.includes('activo')) return "bg-[#10B981E6] text-white"; // green (active)
    // default: any kind of development/in-progress state
    return "bg-[#F59E0BE6] text-white"; // amber
  };
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-16">
          <div className="animate-pulse">
            <div className="h-10 bg-muted/50 w-3/4 rounded mb-4"></div>
            <div className="h-6 bg-muted/50 w-1/2 rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="h-80 bg-muted/50 rounded-lg mb-6"></div>
                <div className="h-4 bg-muted/50 rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted/50 rounded mb-2 w-full"></div>
                <div className="h-4 bg-muted/50 rounded mb-2 w-3/4"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-40 bg-muted/50 rounded-lg mb-4"></div>
                <div className="h-40 bg-muted/50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return <NotFound />;
  }

  // Ensure that githubStats always has the contributors property
  const githubStats: GitHubStats = project.githubStats || { 
    stars: 0, 
    forks: 0, 
    issues: 0, 
    contributors: 0 
  };
  // Prefer explicit github link fields if available
  const repoUrl = project.githubLink || project.github || "#";

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <Link to="/proyectos" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a proyectos
          </Link>
          
          <ProjectDetailHeader 
            project={project} 
            formatDateIfAvailable={formatDateIfAvailable}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
          
          {/* Add project gallery here */}
          <ProjectDetailGallery project={project} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            <div className="lg:col-span-2">
                <ProjectDetailContent project={project} />
              </div>
            
              <div className="lg:col-span-1">
                <ProjectDetailSidebar project={project} relatedProjects={relatedProjects} />
              
              <div className="mt-8">
                <div className="flex gap-4 mt-8">
                  <a
                    href={project.githubLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Código
                  </a>

                  {(() => {
                    // New rule: base behavior on demoLink only.
                    // If demoLink is empty => show a gray disabled button (non-clickable).
                    // If demoLink exists => show active button with label determined by demoButtonType.
                    const buttonType = project.demoButtonType as "demo" | "project" | undefined;
                    const demoLink = project.demoLink || "";

                    const labelAvailable = buttonType === "project" ? "Ver proyecto" : "Ver demo";
                    const labelMissing = buttonType === "project" ? "Proyecto no disponible" : "No disponible";

                    if (!demoLink) {
                      return (
                        <button
                          key="demo-disabled-gray"
                          disabled
                          aria-disabled
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 cursor-not-allowed border border-gray-200"
                        >
                          {labelMissing}
                        </button>
                      );
                    }

                    return (
                      <a
                        key="demo-active"
                        href={demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                      >
                        {labelAvailable}
                      </a>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>

        {/* Collaboration CTA — same style as EventRegistrationCTA */}
        <div className="mt-16 p-8 bg-primary/10 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Querés colaborar con este proyecto?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            El repositorio es público, no necesitás ser experto para colaborar, siempre estamos abiertos a contribuciones y sugerencias.
          </p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors text-lg font-medium"
          >
            <Github className="mr-2 h-5 w-5" />
            Contribuir en GitHub
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
