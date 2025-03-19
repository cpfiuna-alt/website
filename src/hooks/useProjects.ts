
import { useState, useEffect } from 'react';
import { parseMarkdown, ProjectFrontMatter } from '@/utils/markdownUtils';

// Import all project markdown files
const projectFiles = import.meta.glob('../content/projects/*.md', { as: 'raw', eager: true });

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
        
        const parsedProjects = await Promise.all(
          Object.entries(projectFiles).map(async ([path, content]) => {
            // Extract slug from path (filename without extension)
            const slug = path.split('/').pop()?.replace('.md', '') || '';
            
            try {
              // Parse the markdown content
              const { frontMatter, content: markdownContent } = parseMarkdown(content as string);
              
              // Ensure frontMatter has all required fields
              return {
                id: frontMatter.id || slug,
                title: frontMatter.title || "Untitled Project",
                description: frontMatter.description || "",
                image: frontMatter.image || "/placeholder.svg",
                tags: frontMatter.tags || [],
                githubLink: frontMatter.githubLink || "#",
                demoLink: frontMatter.demoLink || "",
                category: frontMatter.category || "web",
                featured: frontMatter.featured || false,
                status: frontMatter.status || "En desarrollo",
                lastUpdated: frontMatter.lastUpdated || "",
                team: frontMatter.team || [],
                githubStats: frontMatter.githubStats || { stars: 0, forks: 0, issues: 0 },
                content: markdownContent || "",
                slug: slug // Important: Ensure slug comes from the filename
              } as ProjectFrontMatter & { content: string };
            } catch (error) {
              console.error(`Error parsing project file ${path}:`, error);
              // Return a default project object
              return {
                id: slug,
                title: `Project ${slug}`,
                description: "Project description unavailable",
                image: "/placeholder.svg",
                tags: ["misc"],
                githubLink: "#",
                demoLink: "",
                category: "web",
                featured: false,
                status: "En desarrollo",
                lastUpdated: "",
                team: [],
                githubStats: { stars: 0, forks: 0, issues: 0 },
                content: "",
                slug: slug
              } as ProjectFrontMatter & { content: string };
            }
          })
        );
        
        // Sort projects by featured status and then by id
        parsedProjects.sort((a, b) => {
          // First sort by featured status (featured first)
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          
          // If both have same featured status, sort by id
          if (typeof a.id === 'number' && typeof b.id === 'number') {
            return b.id - a.id;
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
