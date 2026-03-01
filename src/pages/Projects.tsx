
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectFilter, { ProjectCategory } from "@/components/projects/ProjectFilter";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import ProjectsCallToAction from "@/components/projects/ProjectsCallToAction";
import { useProjects } from "@/hooks/useProjects";

// Project categories for filter
const categories: ProjectCategory[] = [
  { value: "all", label: "Todos" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Móvil" },
  { value: "automation", label: "Automatización" },
  { value: "tools", label: "Herramientas" },
  { value: "data", label: "Datos & IA" },
  { value: "infrastructure", label: "Infraestructura" },
  { value: "education", label: "Educación" },
];

const Projects = () => {
  const { allProjects, loading } = useProjects();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter projects based on category, search term, and featured status
  const filteredProjects = allProjects.filter(
    (project) => {
      const matchesCategory = filter === "all" || project.category === filter;
      const matchesSearch = !searchTerm || 
                          project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (project.tags && project.tags.some((tag) =>
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                          ));
      const matchesFeatured = !showFeaturedOnly || project.featured;
      
      return matchesCategory && matchesSearch && matchesFeatured;
    }
  );

  if (loading) {
    return (
      <Layout>
        <section className="pt-24 pb-16">
          <div className="container mx-auto">
            <div className="mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="glass-card animate-pulse">
                    <div className="h-48 bg-muted/50 rounded-t-xl"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted/50 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-muted/50 rounded mb-4 w-full"></div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="h-5 bg-muted/30 rounded-full w-16"></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="h-8 bg-muted/30 rounded w-20"></div>
                        <div className="h-8 bg-muted/50 rounded-full w-28"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectsHero />
      <section className="py-12">
        <div className="container mx-auto">
          <ProjectFilter 
            categories={categories}
            filter={filter}
            setFilter={setFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showFeaturedOnly={showFeaturedOnly}
            setShowFeaturedOnly={setShowFeaturedOnly}
          />
          <ProjectsGrid projects={filteredProjects} />
        </div>
      </section>
      <ProjectsCallToAction />
    </Layout>
  );
};

export default Projects;
