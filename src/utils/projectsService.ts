
import { getAllContent, getContentBySlug } from './contentLoader';
import { ProjectFrontMatter } from './markdownUtils';

// Get all projects (with sorting and filtering options)
export async function getAllProjects({
  sortBy = 'date',
  filterByCategory,
  filterByTag,
  limit
}: {
  sortBy?: 'date',
  filterByCategory?: string,
  filterByTag?: string,
  limit?: number
} = {}): Promise<Array<{ frontMatter: ProjectFrontMatter, content: string, slug: string }>> {
  // Get all projects
  const projects = await getAllContent<ProjectFrontMatter>('projects');
  
  // Process team data for all projects to ensure it's valid
  projects.forEach(project => {
    // Make sure team is properly formatted if it exists
    if (typeof project.frontMatter.team === 'string') {
      try {
        // Handle string team data by parsing it or converting to array 
        project.frontMatter.team = safeParseTeam(project.frontMatter.team);
      } catch (error) {
        console.warn(`Error parsing team data for ${project.slug}:`, error);
        project.frontMatter.team = [];
      }
    } else if (!Array.isArray(project.frontMatter.team)) {
      project.frontMatter.team = [];
    }
  });
  
  // Filter projects based on criteria
  let filteredProjects = projects;
  
  if (filterByCategory && filterByCategory !== 'all') {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.category === filterByCategory
    );
  }
  
  if (filterByTag && filterByTag !== 'all') {
    filteredProjects = filteredProjects.filter(project => 
      project.frontMatter.tags && 
      project.frontMatter.tags.includes(filterByTag)
    );
  }
  
  // Sort projects
  if (sortBy === 'date') {
    filteredProjects.sort((a, b) => 
      new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime()
    );
  }
  
  // Apply limit if specified
  if (limit && limit > 0) {
    filteredProjects = filteredProjects.slice(0, limit);
  }
  
  return filteredProjects;
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<{ frontMatter: ProjectFrontMatter, content: string, slug: string } | null> {
  const project = await getContentBySlug<ProjectFrontMatter>('projects', slug);
  
  if (project && typeof project.frontMatter.team === 'string') {
    try {
      project.frontMatter.team = safeParseTeam(project.frontMatter.team);
    } catch (error) {
      console.warn(`Error parsing team data for ${slug}:`, error);
      project.frontMatter.team = [];
    }
  }
  
  return project;
}

// Helper to safely parse team data from string
function safeParseTeam(teamData: string): Array<{name: string, role: string, avatar?: string}> {
  if (!teamData) return [];
  
  try {
    // First try parsing it as JSON
    const parsed = JSON.parse(teamData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (e) {
    // If it's not valid JSON, try to handle it as a string representation of an array
    if (teamData.trim().startsWith('[') && teamData.trim().endsWith(']')) {
      // Try to create a proper JSON string by replacing single quotes with double quotes
      const fixedJson = teamData
        .replace(/'/g, '"')
        .replace(/(\w+):/g, '"$1":');
      
      try {
        const parsed = JSON.parse(fixedJson);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        // If still fails, return empty array
        console.error("Could not parse team data even after cleanup:", teamData);
      }
    }
    return [];
  }
}
