
import { getAllContent, getContentBySlug } from './contentLoader';
import { ProjectFrontMatter } from './markdownUtils';

// Get all projects (with sorting and filtering options)
export async function getAllProjects({
  sortBy = 'featured',
  filterByCategory,
  filterByTag,
  featuredOnly = false,
  limit
}: {
  sortBy?: 'featured',
  filterByCategory?: string,
  filterByTag?: string,
  featuredOnly?: boolean,
  limit?: number
} = {}): Promise<Array<{ frontMatter: ProjectFrontMatter, content: string, slug: string }>> {
  // Get all projects
  const projects = await getAllContent<ProjectFrontMatter>('projects');
  
  // Filter projects based on criteria
  let filteredProjects = projects;
  
  if (filterByCategory && filterByCategory !== 'all') {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.category === filterByCategory
    );
  }
  
  if (filterByTag) {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.tags && project.frontMatter.tags.includes(filterByTag)
    );
  }
  
  if (featuredOnly) {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.featured
    );
  }
  
  // Sort projects
  if (sortBy === 'featured') {
    filteredProjects.sort((a, b) => {
      // First sort by featured status (featured first)
      if (a.frontMatter.featured && !b.frontMatter.featured) return -1;
      if (!a.frontMatter.featured && b.frontMatter.featured) return 1;
      
      // If both have same featured status, sort by id
      return Number(b.frontMatter.id) - Number(a.frontMatter.id);
    });
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredProjects = filteredProjects.slice(0, limit);
  }
  
  return filteredProjects;
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<{ frontMatter: ProjectFrontMatter, content: string, slug: string } | null> {
  return getContentBySlug<ProjectFrontMatter>('projects', slug);
}
