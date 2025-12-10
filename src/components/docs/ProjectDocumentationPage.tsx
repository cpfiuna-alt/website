import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Leaf,
  List
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProjectDocs, getProjectDoc } from '@/utils/projectDocsLoader';
import { getProjectById, ProjectConfig } from '@/content/docs-projects/projects-config';
import { ProjectDocStructure, ProjectDoc } from '@/types/projectDocs';
import MarkdownContent from '@/components/markdown/MarkdownContent';

// Local TocHeading type and DOM-based TOC extraction used to ensure
// IDs on rendered headings match the TOC links (avoids mismatches between
// parser-based headings and the rendered DOM).
type TocHeading = { id: string; text: string; level: number };

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

        // Load project metadata (from dynamic loader)
        try {
          const proj = await getProjectById(projectId);
          setProject(proj || null);
        } catch (err) {
          console.warn('Could not load project metadata for', projectId, err);
          setProject(null);
        }

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
  // Table of contents is generated from the rendered DOM to ensure
  // IDs match what MarkdownContent actually emits. This avoids
  // mismatches between a parser-based TOC and rendered headings.
  const [tocHeadings, setTocHeadings] = useState<TocHeading[]>([]);

  const [project, setProject] = useState<ProjectConfig | null>(null);

  const slugify = (s: string) =>
    String(s)
      .toLowerCase()
      .trim()
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\n+\w\s-]/g, '')
      .replace(/\s+/g, '-');

  useEffect(() => {
    if (!currentDoc) {
      setTocHeadings([]);
      return;
    }

    // Allow the MarkdownContent to render into the DOM, then collect headings
    const t = setTimeout(() => {
      const container = document.getElementById('project-doc-content');
      if (!container) return;
      const elements = container.querySelectorAll('h2,h3,h4');
      const headings: TocHeading[] = Array.from(elements).map((el) => {
        const text = (el.textContent || '').trim();
        let id = (el as HTMLElement).id;

        if (!id) {
          // generate slug and assign it to the element so links can find it
          const base = slugify(text || 'heading');
          let unique = base;
          let i = 1;
          while (document.getElementById(unique)) {
            unique = `${base}-${i++}`;
          }
          id = unique;
          (el as HTMLElement).id = id;
          // Debug log for troubleshooting missing ids
          // id assigned for TOC
        } else {
          // eslint-disable-next-line no-console
          // found existing heading id
        }

        return { id, text, level: Number(el.tagName.replace('H', '')) };
      });
      setTocHeadings(headings);
    }, 40);

    return () => clearTimeout(t);
  }, [currentDoc]);

  // Ensure we scroll when the URL hash changes (covers clicks, manual hash edits,
  // and replaceState calls). This runs independently of the TOC click handler
  // and retries a few times if the element isn't present immediately.
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');

    const attemptScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        return true;
      }
      return false;
    };

    if (!attemptScroll()) {
      let tries = 0;
      const retry = () => {
        if (attemptScroll() || tries >= 6) return;
        tries += 1;
        window.setTimeout(retry, 100);
      };
      window.setTimeout(retry, 0);
    }
  }, [location.hash, currentDoc]);

  

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
            <Link to="/docs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al hub
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-[300px] lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <ProjectSidebar
                project={project}
                docStructure={docStructure}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                currentPath={sectionId || chapterId || 'overview'}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
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

          {/* Table of Contents - Right Sidebar */}
          {tocHeadings.length > 0 && (
            <aside className="hidden xl:block w-[220px] flex-shrink-0">
              <div className="sticky top-24">
                <TableOfContents headings={tocHeadings} />
              </div>
            </aside>
          )}
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
      {/* Back to Hub - Above project info */}
      <Link 
        to="/docs" 
        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Volver al Hub
      </Link>

      {/* Project Header */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-border">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {getProjectIcon(project.icon)}
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-none tracking-tight">{project.name}</h3>
              <p className="text-sm text-muted-foreground">
                v{project.version} • {project.status}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="flex gap-2">
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
          
          {/* Maintainers */}
          {project.maintainers && project.maintainers.length > 0 && (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <span>{project.maintainers.join(', ')}</span>
            </div>
          )}
          
          {/* Last Update */}
          {project.lastUpdate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
              <span>Actualizado: {new Date(project.lastUpdate).toLocaleDateString('es-PY', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-border">
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <h3 className="text-base font-semibold leading-none tracking-tight">Navegación</h3>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              id={`docs-sidebar-search-${project.id}`}
              name="docsSidebarSearch"
              placeholder="Buscar en docs..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="max-h-[400px] overflow-y-auto">
            <div className="space-y-1">
              {/* Overview */}
              <Link
                to={`/docs/${project.id}`}
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
                          to={`/docs/${project.id}/${chapter.id}/${section.slug}`}                          className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
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
          </div>
        </div>
      </div>
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
      {/* Document Content */}
      <div id="project-doc-content">
        <MarkdownContent content={doc.content} />
      </div>
    </div>
  );
};

interface TableOfContentsProps {
  headings: TocHeading[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-border">
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <List className="h-4 w-4" />
          En esta pagina
        </div>
      </div>
      <div className="p-6 pt-0">
        <nav className="space-y-1">
          {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm py-1 transition-colors hover:text-foreground ${
                  heading.level === 2 ? 'pl-0' : heading.level === 3 ? 'pl-3' : 'pl-6'
                } ${
                  activeId === heading.id
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
                onClick={(e) => {
                  e.preventDefault();

                  // Update the hash so the URL reflects the target (no native jump)
                  try {
                    history.replaceState(null, '', `#${heading.id}`);
                  } catch (err) {
                    // ignore
                  }

                  // Attempt a robust scroll using the browser's native behavior.
                  // The Markdown headings already have `scroll-mt-*` set, so
                  // `scrollIntoView` will respect the offset for sticky headers.
                  const attemptScroll = () => {
                    const el = document.getElementById(heading.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                      setActiveId(heading.id);
                      return true;
                    }
                    return false;
                  };

                  if (!attemptScroll()) {
                    // Retry a few times in case IDs are assigned shortly after click
                    let tries = 0;
                    const retry = () => {
                      if (attemptScroll() || tries >= 5) return;
                      tries += 1;
                      window.setTimeout(retry, 100);
                    };
                    // Run on next tick to give React a chance to assign IDs
                    window.setTimeout(retry, 0);
                  }
                }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
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
