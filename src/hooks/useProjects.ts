
import { useState, useEffect } from 'react';
import { parseMarkdown, ProjectFrontMatter, GitHubStats } from '@/utils/markdownUtils';

// Import all project markdown files
const projectFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });

export function useProjects() {
  const [allProjects, setAllProjects] = useState<ProjectFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        
        // If no project files were found, set empty array and return
        if (!projectFiles || Object.keys(projectFiles).length === 0) {
          console.error("No project files found");
          setAllProjects([]);
          return;
        }
        
        console.log("Loading projects from", Object.keys(projectFiles).length, "files");
        
        const parsedProjects = await Promise.all(
          Object.entries(projectFiles).map(async ([path, content]) => {
            // Extract slug from path (filename without extension)
            const slug = path.split('/').pop()?.replace('.md', '') || '';
            console.log("Processing project:", slug);
            
            try {
              // Parse the markdown content
              const { frontMatter, content: markdownContent } = parseMarkdown(content as string);
              
              // Ensure team is an array
              let teamData = frontMatter.team || [];
              if (!Array.isArray(teamData)) {
                console.warn(`Team data for ${slug} is not an array:`, teamData);
                teamData = [];
              }
              
              // Convert to ProjectFrontMatter with required fields
              const projectData: ProjectFrontMatter & { content: string } = {
                id: frontMatter.id || slug,
                title: frontMatter.title || "Untitled Project",
                description: frontMatter.description || "",
                technologies: frontMatter.technologies || [],
                image: frontMatter.image || "/placeholder.svg",
                category: frontMatter.category || "web",
                team: teamData,
                // Additional properties used by the existing codebase
                tags: frontMatter.tags || [],
                featured: frontMatter.featured || false,
                slug: slug,
                content: markdownContent,
                status: frontMatter.status,
                lastUpdated: frontMatter.lastUpdated,
                startDate: frontMatter.startDate,
                endDate: frontMatter.endDate,
                githubLink: frontMatter.githubLink || frontMatter.githubUrl || "#",
                demoLink: frontMatter.demoLink || frontMatter.demoUrl || "",
                githubStats: frontMatter.githubStats || { stars: 0, forks: 0, issues: 0, contributors: 0 },
                github: frontMatter.github || frontMatter.githubLink,
                demo: frontMatter.demo || frontMatter.demoLink
              };
              
              return projectData;
            } catch (error) {
              console.error(`Error parsing project file ${path}:`, error);
              // Return a default project object
              return {
                id: slug,
                title: `Project ${slug}`,
                description: "Project description unavailable",
                technologies: ["misc"],
                image: "/placeholder.svg",
                category: "web",
                team: [],
                tags: ["misc"],
                featured: false,
                slug,
                content: "",
                status: "in-progress"
              } as ProjectFrontMatter & { content: string };
            }
          })
        );
        
        console.log("Projects loaded:", parsedProjects.length);
        
        // Sort projects by featured status and then by id
        parsedProjects.sort((a, b) => {
          // First sort by featured status (featured first)
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          // If both have same featured status, sort by id
          if (typeof a.id === 'number' && typeof b.id === 'number') {
            return Number(b.id) - Number(a.id);
          }
          
          // Default sort by string comparison of title
          return String(a.title).localeCompare(String(b.title));
        });
        
        setAllProjects(parsedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setAllProjects([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);

  return { allProjects, loading };
}
