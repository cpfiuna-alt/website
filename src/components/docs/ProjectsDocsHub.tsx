import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Globe, 
  Bot, 
  Trophy, 
  MessageSquare, 
  Library, 
  Leaf,
  ArrowRight,
  Star,
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  Code,
  Zap
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllProjectsWithDocs } from '@/utils/projectDocsLoader';
import { ProjectConfig } from '@/content/docs-projects/projects-config';

interface ProjectWithDocs extends ProjectConfig {
  hasDocumentation: boolean;
  totalDocs: number;
  chaptersCount: number;
}

const getProjectIcon = (iconName: string) => {
  const icons = {
    Globe,
    Bot,
    Trophy,
    MessageSquare,
    Library,
    Leaf
  };
  const IconComponent = icons[iconName as keyof typeof icons] || BookOpen;
  return <IconComponent className="h-8 w-8" />;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'beta': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'web': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'bot': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
    case 'education': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'ai': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
    case 'infrastructure': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300';
    case 'iot': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'Activo';
    case 'beta': return 'Beta';
    case 'planning': return 'Planificación';
    case 'archived': return 'Archivado';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'web': return 'Web';
    case 'bot': return 'Bot';
    case 'education': return 'Educación';
    case 'ai': return 'IA';
    case 'infrastructure': return 'Infraestructura';
    case 'iot': return 'IoT';
    default: return category.charAt(0).toUpperCase() + category.slice(1);
  }
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  // If already in DD-MM-YYYY, return as-is
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) return dateStr;
  // Match YYYY-MM-DD (optionally with time) and flip
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]}`;
  }
  // Fallback to Date parse
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  }
  return dateStr;
};

const ProjectsDocsHub: React.FC = () => {
  const [projects, setProjects] = useState<ProjectWithDocs[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getAllProjectsWithDocs();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === '' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const featuredProjects = projects.filter(p => p.featured);
  const categories = [...new Set(projects.map(p => p.category))];
  const statuses = [...new Set(projects.map(p => p.status))];

  return (
    <div className="min-h-screen bg-background">
       <section className="pt-24 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
                <div className="container mx-auto px-6 relative z-10">
                  <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
                      <span className="gradient-text">Documentación</span> del Club
                    </h1>
                    
                    <p className="text-xl text-muted-foreground">
                      Centro de documentación completa para todos los proyectos del Club de Programación FIUNA. Explora guías técnicas, APIs, tutoriales y recursos para cada uno de nuestros desarrollos.
                    </p>                  
                    </div>
                </div>
              </section>

      {/* Stats and Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Search Bar + Category Filter (inline on md+, stacked on small) */}
          <div className="relative max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  id="docs-search"
                  name="docsSearch"
                  placeholder="Buscar en toda la documentación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

            {/* Category filter placed to the right of the search on larger screens */}
            <div className="w-full md:w-64">
              <select
                id="project-category-filter"
                name="categoryFilter"
                aria-label="Filtrar proyectos por categoría"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="container mx-auto px-4 py-8">
        {/* All Projects (Featured first) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {searchQuery || selectedCategory || selectedStatus ? 'Resultados' : 'Todos los Proyectos'}
            </h2>
            <div className="text-sm text-muted-foreground">
              {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="glass-card-static h-80">
                    <div className="p-6">
                      <div className="h-8 w-8 bg-muted rounded-full mb-2"></div>
                      <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                    </div>
                    <div className="p-6 pt-0">
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No se encontraron proyectos</h3>
              <p className="text-muted-foreground">
                Intenta ajustar los filtros o términos de búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Show featured projects first, then non-featured */}
              {[...filteredProjects].sort((a, b) => {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
                return 0;
              }).map(project => (
                <ProjectCard key={project.id} project={project} featured={project.featured} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: ProjectWithDocs;
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    // Previously the featured card applied a ring: `featured ? 'ring-2 ring-primary/20' : ''`.
    // Kept as a comment so it can be re-enabled quickly if needed.
    <div className="glass-card h-full transition-all duration-300 group hover:shadow-neon-blue">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-lg mr-3">
              {getProjectIcon(project.icon)}
            </div>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              {featured && (
                <Badge variant="secondary" className="mt-1 inline-flex items-center justify-center">
                  <Star className="h-3 w-3 mr-1" />
                  Destacado
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={`${getStatusColor(project.status)} inline-flex items-center justify-center text-center`}>
              {getStatusLabel(project.status)}
            </Badge>
            <Badge variant="outline" className={`${getCategoryColor(project.category)} inline-flex items-center justify-center text-center`}>
              {getCategoryLabel(project.category)}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="p-6 pt-0">
        <div className="space-y-4">
          {/* Project Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(project.lastUpdate) || 'Sin fecha'}
            </div>
            <div className="flex items-center">
              {/* keep space for future actions or small metadata */}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="secondary" className="inline-flex items-center justify-center px-2 py-0.5 text-xs text-center leading-none">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" className="inline-flex items-center justify-center px-2 py-0.5 text-xs text-center leading-none">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {project.hasDocumentation ? (
                <Button asChild className="flex-1 rounded-full transition-transform duration-200 hover:scale-105">
                <Link to={`/docs/${project.id}`}>
                  Ver Docs
                </Link>
              </Button>
            ) : (
              <Button variant="outline" className="flex-1 rounded-full" disabled>
                <Code className="h-4 w-4 mr-2" />
                En desarrollo
              </Button>
            )}
            
            {project.repository && (
              <Button variant="outline" size="icon" className="rounded-full transition-transform duration-200 hover:scale-105" asChild>
                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4" />
                </a>
              </Button>
            )}
            
            {project.demo && (
              <Button variant="outline" size="icon" className="rounded-full transition-transform duration-200 hover:scale-105" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDocsHub;
