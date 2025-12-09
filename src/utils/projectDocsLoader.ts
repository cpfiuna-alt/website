import { parseMarkdown } from '@/utils/markdownUtils';
import { ProjectDoc, ProjectDocFrontMatter, ProjectDocStructure, ProjectChapter } from '@/types/projectDocs';
import { getProjectById, loadProjectsConfig } from '@/content/docs-projects/projects-config';

// Search interfaces
export interface SearchResult {
  project: string;
  projectTitle: string;
  chapter?: string;
  section: string;
  title: string;
  description?: string;
  content: string;
  url: string;
  relevanceScore: number;
  highlights: string[];
}

export interface SearchOptions {
  projectId?: string;
  category?: string;
  status?: string;
  limit?: number;
  includeContent?: boolean;
}

/**
 * Load all markdown files for a specific project
 */
async function loadProjectMarkdownFiles(projectId: string): Promise<Array<{ frontMatter: ProjectDocFrontMatter; content: string; slug: string; path: string }>> {
  try {    // Import all markdown files from the project directory
    const contentFiles = import.meta.glob('../content/docs-projects/**/*.md', { query: '?raw', import: 'default', eager: true });
    
    // Filter files that belong to the specific project
    const projectFiles = Object.entries(contentFiles).filter(
      ([path]) => path.includes(`/docs-projects/${projectId}/`)
    );
    
    // Parse each file and extract front matter and content
    return projectFiles.map(([path, content]) => {
      // Extract slug from path
      const slug = path.split('/').pop()?.replace('.md', '') || '';
      
      // Parse the markdown content
      const { frontMatter, content: markdownContent } = parseMarkdown(content as string);
      
      return {
        frontMatter: frontMatter as ProjectDocFrontMatter,
        content: markdownContent,
        slug,
        path: `docs-projects/${projectId}/${slug}`
      };
    });
  } catch (error) {
    console.error(`Error loading project docs for ${projectId}:`, error);
    return [];
  }
}

/**
 * Get all documentation for a specific project
 */
export async function getProjectDocs(projectId: string): Promise<ProjectDocStructure | null> {
  try {
    const project = await getProjectById(projectId);
    if (!project) return null;

    // Get all docs for this project
    const docs = await loadProjectMarkdownFiles(projectId);
    
    if (docs.length === 0) return null;

    // Find the overview/index document
    const overview = docs.find(doc => doc.slug === 'index' || doc.slug === projectId);
    if (!overview) return null;

    // Group remaining docs by chapter
    const chapterDocs = docs.filter(doc => doc.slug !== 'index' && doc.slug !== projectId);
    
    // Create chapters structure
    const chaptersMap = new Map<string, ProjectChapter>();
    
    chapterDocs.forEach(doc => {
      const chapter = doc.frontMatter.chapter || 'General';
      const section = doc.frontMatter.section || doc.frontMatter.title;
      
      if (!chaptersMap.has(chapter)) {
        chaptersMap.set(chapter, {
          id: chapter.toLowerCase().replace(/\s+/g, '-'),
          title: chapter,
          order: doc.frontMatter.order || 0,
          sections: []
        });
      }
      
      const chapterObj = chaptersMap.get(chapter)!;
      chapterObj.sections.push({
        id: doc.slug,
        title: section,
        description: doc.frontMatter.description,
        order: doc.frontMatter.order || 0,
        slug: doc.slug,
        path: doc.path
      });
    });

    // Sort chapters and sections
    const chapters = Array.from(chaptersMap.values())
      .sort((a, b) => a.order - b.order)
      .map(chapter => ({
        ...chapter,
        sections: chapter.sections.sort((a, b) => a.order - b.order)
      }));    return {
      projectId,
      overview: {
        frontMatter: overview.frontMatter,
        content: overview.content,
        slug: overview.slug,
        projectId,
        path: overview.path
      },
      chapters,
      totalDocs: docs.length
    };
  } catch (error) {
    console.error(`Error loading docs for project ${projectId}:`, error);
    return null;
  }
}

/**
 * Get all available projects with their documentation status
 */
export async function getAllProjectsWithDocs() {
  const allProjects = await loadProjectsConfig();
  const projectsWithDocs = await Promise.all(
    allProjects.map(async (project) => {
      const docStructure = await getProjectDocs(project.id);
      return {
        ...project,
        hasDocumentation: !!docStructure,
        totalDocs: docStructure?.totalDocs || 0,
        chaptersCount: docStructure?.chapters.length || 0
      };
    })
  );

  return projectsWithDocs;
}

/**
 * Get a specific document from a project
 */
export async function getProjectDoc(projectId: string, docSlug: string): Promise<ProjectDoc | null> {
  try {
    const docs = await loadProjectMarkdownFiles(projectId);
    const doc = docs.find(d => d.slug === docSlug);
    
    if (!doc) return null;

    return {
      frontMatter: doc.frontMatter,
      content: doc.content,
      slug: doc.slug,
      projectId,
      path: doc.path
    };
  } catch (error) {
    console.error(`Error loading doc ${docSlug} for project ${projectId}:`, error);
    return null;
  }
}

/**
 * Search across all project documentation
 */
export async function searchProjectDocs(query: string, options: SearchOptions = {}): Promise<SearchResult[]> {
  try {
    const { 
      projectId, 
      category, 
      status, 
      limit = 50, 
      includeContent = false 
    } = options;

    // Determine which projects to search
    let projectsToSearch = await loadProjectsConfig();

    if (projectId) {
      projectsToSearch = projectsToSearch.filter(p => p.id === projectId);
    }

    if (category) {
      projectsToSearch = projectsToSearch.filter(p => p.category === category);
    }

    if (status) {
      projectsToSearch = projectsToSearch.filter(p => p.status === status);
    }

    const allResults: SearchResult[] = [];
    const queryLower = query.toLowerCase();

    for (const project of projectsToSearch) {
      const docs = await loadProjectMarkdownFiles(project.id);
      
      for (const doc of docs) {
        const relevanceScore = calculateRelevanceScore(doc, queryLower);
        
        if (relevanceScore > 0) {
          const highlights = extractHighlights(doc, queryLower);
          
          allResults.push({
            project: project.id,
            projectTitle: project.name,
            chapter: doc.frontMatter.chapter,
            section: doc.frontMatter.section || doc.frontMatter.title,
            title: doc.frontMatter.title,
            description: doc.frontMatter.description,
            content: includeContent ? doc.content : '',
            url: `/docs/${project.id}/${doc.slug}`,
            relevanceScore,
            highlights
          });
        }
      }
    }

    // Sort by relevance score and limit results
    return allResults
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  } catch (error) {
    console.error('Error searching project docs:', error);
    return [];
  }
}

/**
 * Calculate relevance score for a document based on search query
 */
function calculateRelevanceScore(doc: { frontMatter: ProjectDocFrontMatter; content: string; slug: string; path: string }, queryLower: string): number {
  let score = 0;
  
  // Title match (highest weight)
  if (doc.frontMatter.title.toLowerCase().includes(queryLower)) {
    score += 10;
  }
  
  // Description match
  if (doc.frontMatter.description?.toLowerCase().includes(queryLower)) {
    score += 5;
  }
  
  // Tags match
  if (doc.frontMatter.tags?.some((tag: string) => tag.toLowerCase().includes(queryLower))) {
    score += 3;
  }
  
  // Content match (lower weight)
  const contentMatches = (doc.content.toLowerCase().match(new RegExp(queryLower, 'g')) || []).length;
  score += contentMatches * 0.5;
  
  // Chapter/section match
  if (doc.frontMatter.chapter?.toLowerCase().includes(queryLower)) {
    score += 2;
  }
  
  return score;
}

/**
 * Extract text highlights around search matches
 */
function extractHighlights(doc: { frontMatter: ProjectDocFrontMatter; content: string; slug: string; path: string }, queryLower: string): string[] {
  const highlights: string[] = [];
  const content = doc.content.toLowerCase();
  const contentOriginal = doc.content;
  
  let index = content.indexOf(queryLower);
  let count = 0;
  
  while (index !== -1 && count < 3) {
    const start = Math.max(0, index - 50);
    const end = Math.min(contentOriginal.length, index + queryLower.length + 50);
    
    let excerpt = contentOriginal.substring(start, end);
    
    // Clean up excerpt
    excerpt = excerpt.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    if (excerpt.length > 0) {
      highlights.push(excerpt);
    }
    
    index = content.indexOf(queryLower, index + 1);
    count++;
  }
  
  return highlights;
}

/**
 * Get featured projects for documentation hub
 */
export async function getFeaturedProjects() {
  const all = await loadProjectsConfig();
  return all
    .filter(project => project.featured)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string) {
  const all = await loadProjectsConfig();
  return all
    .filter(project => project.category === category)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status: string) {
  const all = await loadProjectsConfig();
  return all
    .filter(project => project.status === status)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}
