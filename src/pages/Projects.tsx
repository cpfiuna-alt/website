import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Github, ExternalLink, Search, Filter, Code, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";

// Sample project data
const allProjects = [
  {
    id: 1,
    title: "Sistema de Gestión Académica",
    description: "Aplicación web para la gestión de cursos, estudiantes y calificaciones para instituciones educativas.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB"],
    githubLink: "#",
    demoLink: "#",
    category: "web",
    featured: true,
  },
  {
    id: 2,
    title: "Análisis de Datos Climáticos",
    description: "Herramienta de visualización y análisis de datos meteorológicos históricos para Paraguay.",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Pandas", "Matplotlib", "Data Science"],
    githubLink: "#",
    demoLink: "#",
    category: "data",
    featured: true,
  },
  {
    id: 3,
    title: "App de Monitoreo de Salud",
    description: "Aplicación móvil para el seguimiento de indicadores de salud y actividad física.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Flutter", "Firebase", "Health"],
    githubLink: "#",
    demoLink: "#",
    category: "mobile",
    featured: false,
  },
  {
    id: 4,
    title: "Bot Asistente para Discord",
    description: "Bot para administrar comunidades en Discord con capacidades de moderación y entretenimiento.",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["JavaScript", "Discord.js", "Node.js"],
    githubLink: "#",
    demoLink: "#",
    category: "tools",
    featured: false,
  },
  {
    id: 5,
    title: "Plataforma de Aprendizaje Online",
    description: "Sistema LMS completo para la creación y gestión de cursos online con seguimiento de progreso.",
    image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Vue.js", "Express", "PostgreSQL", "Education"],
    githubLink: "#",
    demoLink: "#",
    category: "web",
    featured: true,
  },
  {
    id: 6,
    title: "API de Reconocimiento de Imágenes",
    description: "Servicio de reconocimiento y clasificación de imágenes utilizando técnicas de aprendizaje profundo.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "TensorFlow", "FastAPI", "AI"],
    githubLink: "#",
    demoLink: "#",
    category: "ml",
    featured: false,
  },
  {
    id: 7,
    title: "Sistema de Control de Inventario",
    description: "Aplicación para la gestión de inventarios en pequeñas y medianas empresas.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Express", "MySQL", "Business"],
    githubLink: "#",
    demoLink: "#",
    category: "web",
    featured: false,
  },
  {
    id: 8,
    title: "Juego Educativo de Programación",
    description: "Juego interactivo para enseñar conceptos básicos de programación a niños y adolescentes.",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Unity", "C#", "Education", "Game"],
    githubLink: "#",
    demoLink: "#",
    category: "game",
    featured: false,
  },
];

// Project categories for filter
const categories = [
  { value: "all", label: "Todos" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Móvil" },
  { value: "data", label: "Datos" },
  { value: "ml", label: "Machine Learning" },
  { value: "tools", label: "Herramientas" },
  { value: "game", label: "Juegos" },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter projects based on category, search term, and featured status
  const filteredProjects = allProjects.filter(
    (project) =>
      (filter === "all" || project.category === filter) &&
      (!showFeaturedOnly || project.featured) &&
      (searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos</h1>
            <p className="text-xl text-muted-foreground">
              Explora los proyectos de código abierto desarrollados por nuestra comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Filtrar por:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setFilter(category.value)}
                    className={`px-4 py-2 rounded-full text-sm transition-all
                      ${
                        filter === category.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
                
                <button
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ml-2
                    ${
                      showFeaturedOnly
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                >
                  {showFeaturedOnly ? "Todos" : "Destacados"}
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card group hover:shadow-neon-blue transition-all"
                >
                  <div className="relative">
                    <Link to={`/projects/${project.id}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover object-center rounded-t-xl"
                        loading="lazy"
                      />
                    </Link>
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
                          Destacado
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <Link to={`/projects/${project.id}`}>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-background/60 dark:bg-background/20 backdrop-blur-sm"
                        >
                          <Tag className="h-3 w-3 mr-1 text-primary" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <a
                        href={project.githubLink}
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Código
                      </a>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all hover:shadow-neon-blue"
                      >
                        Ver detalles
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Code className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hay proyectos disponibles</h3>
              <p className="text-muted-foreground">
                No se encontraron proyectos con los filtros actuales.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">¿Tienes una idea de proyecto?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              ¿Quieres contribuir a alguno de nuestros proyectos o proponer uno nuevo?
              ¡Nos encantaría colaborar contigo!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://github.com/cpfiuna"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue"
              >
                <User className="mr-2 h-5 w-5" />
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
