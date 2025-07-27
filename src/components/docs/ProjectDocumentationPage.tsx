import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  GitBranch,
  ExternalLink,
  Calendar,
  Users,
  Tag,
  ChevronRight,
  Search,
  Star,
  Globe,
  Bot,
  Trophy,
  MessageSquare,
  Library,
  Leaf
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProjectDocs, getProjectDoc } from '@/utils/projectDocsLoader';
import { getProjectById, ProjectConfig } from '@/content/docs-projects/projects-config';
import { ProjectDocStructure, ProjectDoc } from '@/types/projectDocs';
import MarkdownContent from '@/components/markdown/MarkdownContent';

const getProjectIcon = (iconName: string) => {
  const icons = { Globe, Bot, Trophy, MessageSquare, Library, Leaf };
  const IconComponent = icons[iconName as keyof typeof icons] || BookOpen;
  return <IconComponent className="h-6 w-6" />;
};

const ProjectDocumentationPage: React.FC = () => {
  const { projectId, chapterId, sectionId } = useParams<{
    projectId: string;
    chapterId?: string;
    sectionId?: string;
  }>();
  
  const navigate = useNavigate();
  const [docStructure, setDocStructure] = useState<ProjectDocStructure | null>(null);
  const [currentDoc, setCurrentDoc] = useState<ProjectDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');  useEffect(() => {
    const fetchDocumentation = async () => {
      if (!projectId) return;

      setLoading(true);
      try {
        const structure = await getProjectDocs(projectId);
        setDocStructure(structure);

        // Determine which document to show
        let docToShow: ProjectDoc | null = null;
        
        if (sectionId) {
          // Show specific section
          docToShow = await getProjectDoc(projectId, sectionId);
        } else if (chapterId) {
          // Show first section of chapter
          const chapter = structure?.chapters.find(c => c.id === chapterId);
          if (chapter && chapter.sections.length > 0) {
            docToShow = await getProjectDoc(projectId, chapter.sections[0].slug);
          }
        } else {
          // Show overview
          docToShow = structure?.overview || null;
        }

        setCurrentDoc(docToShow);
      } catch (error) {
        console.error('Error fetching project documentation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentation();
  }, [projectId, chapterId, sectionId]);

  const project = projectId ? getProjectById(projectId) : null;

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!project || !docStructure) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
          <p className="text-muted-foreground mb-6">
            El proyecto solicitado no existe o no tiene documentación disponible.
          </p>
          <Button asChild>
            <Link to="/documentacion">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al hub
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">            <ProjectSidebar
              project={project}
              docStructure={docStructure}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              currentPath={sectionId || chapterId || 'overview'}
            />
          </aside>

          {/* Main Content */}
          <main>
            {currentDoc ? (
              <DocumentContent doc={currentDoc} project={project} />
            ) : (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Documento no encontrado</h3>
                <p className="text-muted-foreground">
                  El documento solicitado no existe.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

interface ProjectSidebarProps {
  project: ProjectConfig;
  docStructure: ProjectDocStructure;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentPath: string;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  project,
  docStructure,
  searchQuery,
  onSearchChange,
  currentPath
}) => {
  // Initialize with the first chapter open, or all chapters if there are few
  const [openChapters, setOpenChapters] = useState<string[]>(() => {
    if (docStructure.chapters.length <= 3) {
      // If there are 3 or fewer chapters, open them all by default
      return docStructure.chapters.map(chapter => chapter.id);
    } else {
      // Otherwise, just open the first chapter
      return docStructure.chapters.length > 0 ? [docStructure.chapters[0].id] : [];
    }
  });

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {getProjectIcon(project.icon)}
            </div>
            <div>
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                v{project.version} • {project.status}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2 mb-4">
            {project.repository && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.repository} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="h-4 w-4 mr-1" />
                  Repo
                </a>
              </Button>
            )}
            {project.demo && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {docStructure.totalDocs} documentos • {docStructure.chapters.length} capítulos
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Navegación</CardTitle>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar en docs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-1">
              {/* Overview */}              <Link
                to={`/documentacion/projects/${project.id}`}
                className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  currentPath === 'overview' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Descripción General
              </Link>

              {/* Chapters */}
              {docStructure.chapters.map(chapter => (
                <div key={chapter.id} className="space-y-1">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-muted"
                  >
                    <span>{chapter.title}</span>
                    <ChevronRight 
                      className={`h-4 w-4 transition-transform ${
                        openChapters.includes(chapter.id) ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  
                  {openChapters.includes(chapter.id) && (
                    <div className="ml-4 space-y-1">
                      {chapter.sections.map(section => (
                        <Link
                          key={section.id}
                          to={`/documentacion/projects/${project.id}/${chapter.id}/${section.slug}`}                          className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                            currentPath === section.slug ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                          }`}
                        >
                          <FileText className="h-3 w-3 mr-2" />
                          {section.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Back to Hub */}
      <Button variant="outline" asChild className="w-full">
        <Link to="/documentacion">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Hub
        </Link>
      </Button>
    </div>
  );
};

interface DocumentContentProps {
  doc: ProjectDoc;
  project: ProjectConfig;
}

const DocumentContent: React.FC<DocumentContentProps> = ({ doc, project }) => {
  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold mb-2">{doc.frontMatter.title}</h1>
        {doc.frontMatter.description && (
          <p className="text-lg text-muted-foreground mb-4">
            {doc.frontMatter.description}
          </p>
        )}
          {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {doc.frontMatter.lastUpdate && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Actualizado: {doc.frontMatter.lastUpdate}
            </div>
          )}
          {doc.frontMatter.maintainers && doc.frontMatter.maintainers.length > 0 && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {doc.frontMatter.maintainers.join(', ')}
            </div>
          )}
          {doc.frontMatter.version && (
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-1" />
              v{doc.frontMatter.version}
            </div>
          )}
        </div>

        {/* Tags */}
        {doc.frontMatter.tags && doc.frontMatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {doc.frontMatter.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Document Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownContent content={doc.content} />
      </div>
    </div>
  );
};

const LoadingSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      <aside className="space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-64 bg-muted rounded-lg"></div>
        </div>
      </aside>
      <main className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-4/6"></div>
        </div>
      </main>
    </div>
  </div>
);

export default ProjectDocumentationPage;
