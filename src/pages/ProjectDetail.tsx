
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Calendar, 
  Code, 
  User, 
  Users,
  Tag,
  Star,
  GitFork,
  MessageSquare
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { useProjects } from "@/hooks/useProjects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ProjectFrontMatter } from "@/utils/markdownUtils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { allProjects, loading } = useProjects();
  const [project, setProject] = useState<ProjectFrontMatter | null>(null);
  const [contentSections, setContentSections] = useState<{[key: string]: string}>({});
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    if (!loading && allProjects.length > 0 && slug) {
      const foundProject = allProjects.find(p => p.slug === slug);
      
      if (foundProject) {
        setProject(foundProject);
        
        // Set page title
        document.title = `${foundProject.title} | Club de Programación FIUNA`;
        
        // Parse content sections if available (this would be populated from markdown)
        // In a full implementation, this would parse the markdown to identify sections
        setContentSections({
          overview: foundProject.description || "",
          keyFeatures: "Lista de características principales del proyecto",
          technologies: "Tecnologías utilizadas en el desarrollo",
          challenges: "Desafíos técnicos enfrentados y soluciones implementadas",
          outcome: "Resultados e impacto del proyecto"
        });
      } else {
        console.error(`Project with slug "${slug}" not found`);
        // Redirect to projects page if the slug doesn't exist
        navigate('/projects');
      }
    }
  }, [slug, loading, allProjects, navigate]);

  if (loading || !project) {
    return (
      <Layout>
        <Container className="py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-muted/30 rounded w-64 mb-4"></div>
            <div className="h-12 bg-muted/50 rounded w-full max-w-2xl mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 bg-muted/30 rounded w-full"></div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="h-64 bg-muted/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  // Helper function to format date if available
  const formatDateIfAvailable = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (e) {
      return dateString;
    }
  };

  // Mock data for GitHub stats (in a real app, these would come from GitHub API)
  const githubStats = {
    stars: 45,
    forks: 18, 
    issues: 7
  };

  // Get related projects (excluding current project)
  const relatedProjects = allProjects
    .filter(p => p.slug !== project.slug)
    .filter(p => p.category === project.category || 
                (p.tags && project.tags && 
                 p.tags.some(tag => project.tags.includes(tag))))
    .slice(0, 3);

  return (
    <Layout>
      <article className="pb-20 bg-background text-foreground">
        {/* Back navigation */}
        <div className="pt-8 pb-4 px-6 md:px-8 lg:px-12">
          <Container>
            <Link 
              to="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a proyectos
            </Link>
          </Container>
        </div>
        
        {/* Project header with status badge and date */}
        <Container className="px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge 
              variant="default" 
              className="bg-amber-500/90 hover:bg-amber-500 text-black font-medium"
            >
              En desarrollo
            </Badge>
            <div className="inline-flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              Actualizado el 24/10/2023
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            {project.title}
          </h1>
          
          {/* Tags/technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags && project.tags.map((tag) => (
              <Badge 
                key={tag}
                variant="secondary" 
                className="bg-background/80 text-foreground text-xs px-3 py-1 rounded-full border border-border"
              >
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href={project.githubLink}
              className="inline-flex items-center px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              Ver repositorio
            </a>
            
            {project.demoLink && (
              <a 
                href={project.demoLink}
                className="inline-flex items-center px-5 py-2 rounded-full bg-background text-primary border border-primary font-medium transition-all hover:bg-primary/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Ver demo
              </a>
            )}
          </div>
          
          {/* GitHub stats */}
          <div className="flex flex-wrap gap-6 mb-12 text-muted-foreground">
            <div className="inline-flex items-center">
              <Star className="mr-2 h-5 w-5 text-amber-400" />
              <span>{githubStats.stars} estrellas</span>
            </div>
            <div className="inline-flex items-center">
              <GitFork className="mr-2 h-5 w-5 text-blue-400" />
              <span>{githubStats.forks} forks</span>
            </div>
            <div className="inline-flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-green-400" />
              <span>{githubStats.issues} issues</span>
            </div>
          </div>
        </Container>
        
        {/* Project screenshots carousel/gallery */}
        <Container className="px-6 md:px-8 lg:px-12 mb-16">
          <div className="grid grid-cols-4 gap-4 h-80">
            <div className="col-span-2 bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Project screenshot" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Project screenshot" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-1 bg-muted rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Project screenshot" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
        
        {/* Project content - Main grid with content and sidebar */}
        <Container className="px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content - Case study */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Descripción del proyecto</h2>
                <p className="mb-6">{project.description}</p>
                
                {/* Case study sections */}
                <div className="space-y-10">
                  {/* Overview section */}
                  <section>
                    <h3 className="text-xl font-bold mb-4">Resumen del proyecto</h3>
                    <p>
                      {project.description}
                    </p>
                  </section>
                  
                  {/* Key Features section */}
                  <section>
                    <h3 className="text-xl font-bold mb-4">Características principales</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Gestión de estudiantes y profesores</li>
                      <li>Administración de cursos y mallas curriculares</li>
                      <li>Registro y cálculo de calificaciones</li>
                      <li>Generación de reportes académicos</li>
                      <li>Comunicación entre estudiantes y profesores</li>
                      <li>Calendario de eventos y actividades académicas</li>
                    </ul>
                  </section>
                  
                  {/* Technologies Used section */}
                  <section>
                    <h3 className="text-xl font-bold mb-4">Tecnologías utilizadas</h3>
                    <p className="mb-3">Este proyecto ha sido desarrollado utilizando el stack MERN:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>MongoDB:</strong> Base de datos NoSQL para almacenar la información de estudiantes, cursos y calificaciones.</li>
                      <li><strong>Express:</strong> Framework de Node.js para la creación de la API REST.</li>
                      <li><strong>React:</strong> Biblioteca de JavaScript para la construcción de la interfaz de usuario.</li>
                      <li><strong>Node.js:</strong> Entorno de ejecución para JavaScript en el servidor.</li>
                    </ul>
                    <p className="mt-3">Además, se han utilizado las siguientes tecnologías y herramientas:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>JWT para la autenticación y autorización</li>
                      <li>Redux para la gestión del estado global</li>
                      <li>Tailwind CSS para el diseño responsive</li>
                      <li>Jest y React Testing Library para pruebas</li>
                      <li>GitHub Actions para CI/CD</li>
                      <li>Docker para la contenerización de la aplicación</li>
                    </ul>
                  </section>
                  
                  {/* Challenges and Engineering Solutions section */}
                  <section>
                    <h3 className="text-xl font-bold mb-4">Desafíos y soluciones de ingeniería</h3>
                    <p className="mb-3">Durante el desarrollo del proyecto, nos enfrentamos a varios desafíos técnicos:</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold">Gestión de permisos y roles</h4>
                        <p>Implementamos un sistema de autorización basado en JWT con control granular de acceso que permite definir permisos específicos para diferentes tipos de usuarios.</p>
                      </div>
                      <div>
                        <h4 className="font-bold">Rendimiento con grandes volúmenes de datos</h4>
                        <p>Optimizamos las consultas a la base de datos utilizando índices compuestos y agregaciones en MongoDB, logrando tiempos de respuesta rápidos incluso con miles de registros.</p>
                      </div>
                      <div>
                        <h4 className="font-bold">Integración con sistemas existentes</h4>
                        <p>Desarrollamos una capa de compatibilidad que permite la sincronización bidireccional con sistemas legados mediante un sistema de eventos y colas de mensajes.</p>
                      </div>
                    </div>
                  </section>
                  
                  {/* Outcome section */}
                  <section>
                    <h3 className="text-xl font-bold mb-4">Resultado e impacto</h3>
                    <p>El Sistema de Gestión Académica ha sido implementado exitosamente en varias instituciones educativas, mejorando significativamente la eficiencia administrativa y la experiencia de usuarios.</p>
                    <div className="mt-4 space-y-2">
                      <p>Los resultados principales incluyen:</p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Reducción del 60% en el tiempo dedicado a tareas administrativas</li>
                        <li>Aumento del 40% en la satisfacción de estudiantes y profesores</li>
                        <li>Disminución de errores en registros académicos en un 85%</li>
                        <li>Mejora en la comunicación entre todos los actores del proceso educativo</li>
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            
            {/* Sidebar content */}
            <div className="lg:col-span-1">
              <div className="space-y-8 sticky top-24">
                {/* Project Team section */}
                <div className="glass-card p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">Equipo del proyecto</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                        <img 
                          src="https://i.pravatar.cc/100?img=1" 
                          alt="Ana Martínez" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Ana Martínez</h4>
                        <p className="text-sm text-muted-foreground">Front-end Lead</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                        <img 
                          src="https://i.pravatar.cc/100?img=3" 
                          alt="Juan Pérez" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Juan Pérez</h4>
                        <p className="text-sm text-muted-foreground">Back-end Developer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                        <img 
                          src="https://i.pravatar.cc/100?img=4" 
                          alt="Carlos Gómez" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Carlos Gómez</h4>
                        <p className="text-sm text-muted-foreground">DevOps Engineer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                        <img 
                          src="https://i.pravatar.cc/100?img=5" 
                          alt="Sofía Vega" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">Sofía Vega</h4>
                        <p className="text-sm text-muted-foreground">UX/UI Designer</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Related Projects section */}
                {relatedProjects.length > 0 && (
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Proyectos relacionados</h3>
                    <div className="space-y-4">
                      {relatedProjects.map((relatedProject) => (
                        <Link 
                          key={relatedProject.slug}
                          to={`/projects/${relatedProject.slug}`}
                          className="block group"
                        >
                          <div className="flex items-start space-x-3">
                            <img 
                              src={relatedProject.image || "/placeholder.svg"} 
                              alt={relatedProject.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium group-hover:text-primary transition-colors">
                                {relatedProject.title}
                              </h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {relatedProject.tags && relatedProject.tags.slice(0, 2).map((tag) => (
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
          </div>
        </Container>
      </article>
    </Layout>
  );
};

export default ProjectDetail;
