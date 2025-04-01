
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ProjectFrontMatter, GitHubStats } from "@/utils/markdownUtils";
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
      console.log(`Looking for project with slug: ${slug}`);
      console.log(`Total projects available: ${allProjects.length}`);
      
      if (allProjects.length > 0) {
        console.log(`First project slug: ${allProjects[0].slug}`);
      }
      
      const foundProject = allProjects.find(
        (p) => p.slug === slug
      ) as (ProjectFrontMatter & { content: string }) | undefined;
      
      if (foundProject) {
        console.log(`Found project: ${foundProject.title}`);
        setProject(foundProject);
        
        // Find related projects with similar tags or category
        const related = allProjects
          .filter(p => 
            p.slug !== slug && 
            (p.category === foundProject.category || 
              (foundProject.tags && p.tags && 
                p.tags.some(tag => foundProject.tags?.includes(tag))))
          )
          .slice(0, 3);
        
        setRelatedProjects(related);
      } else {
        console.warn(`Project with slug '${slug}' not found`);
      }
    }
  }, [slug, allProjects, loading]);

  // Helper function for formatting dates
  const formatDateIfAvailable = (dateString?: string) => {
    if (!dateString) return "No disponible";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Function to get status badge variant based on status
  const getStatusBadgeVariant = (status?: string) => {
    if (!status) return "bg-amber-500 text-black";
    
    switch (status.toLowerCase()) {
      case "completado":
      case "completed":
        return "bg-green-500 text-white";
      case "abandonado":
      case "planned":
        return "bg-gray-400 text-black";
      case "en desarrollo":
      case "in-progress":
      default:
        return "bg-amber-500 text-black";
    }
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

  return (
    <Layout>
      <div className="bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-8">
          <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Volver a proyectos
          </Link>
          
          <ProjectDetailHeader 
            project={project} 
            formatDateIfAvailable={formatDateIfAvailable}
            getStatusBadgeVariant={getStatusBadgeVariant}
          />
          
          {/* Add project gallery here */}
          <ProjectDetailGallery projectSlug={slug || ''} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <ProjectDetailContent project={project} />
            </div>
            
            <div className="lg:col-span-1 order-1 lg:order-2">
              <ProjectDetailSidebar project={project} relatedProjects={relatedProjects} />
              
              <div className="mt-8">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-semibold">Estadísticas</h3>
                  <span className="text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {project.lastUpdated || "Sin fecha"}
                  </span>
                </div>
                
                <ProjectGithubStats 
                  repoUrl={project.githubLink || "#"} 
                  stats={githubStats} 
                />
                
                {project.team && project.team.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Equipo
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.team.map((member, index) => (
                        <span key={index} className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                          {typeof member === 'string' ? member : member.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
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
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
