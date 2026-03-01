
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
              
              // Ensure team is an array
              let teamData: (string | { name: string; role?: string; })[] = [];
              if (Array.isArray(frontMatter.team)) {
                teamData = frontMatter.team as (string | { name: string; role?: string; })[];
              } else if (frontMatter.team) {
                console.warn(`Team data for ${slug} is not an array:`, frontMatter.team);
              }

              // Get image with proper typing
              const imageStr = frontMatter.image ? String(frontMatter.image) : '';
              
              // Convert to ProjectFrontMatter with required fields
              const projectData: ProjectFrontMatter & { content: string } = {
                id: String(frontMatter.id || slug),
                title: String(frontMatter.title || "Untitled Project"),
                description: String(frontMatter.description || ""),
                technologies: Array.isArray(frontMatter.technologies) ? frontMatter.technologies as string[] : [],
                image: imageStr
                  ? (
                      // If the image is already an absolute URL (http/https) or a root-relative path, keep it as-is.
                      // Otherwise, prefix with a slash to make it a root-relative path for local assets.
                      imageStr.startsWith('/') || /^https?:\/\//i.test(imageStr)
                        ? imageStr
                        : `/${imageStr}`
                    )
                  : "/placeholder.svg",
                category: String(frontMatter.category || "web"),
                team: teamData,
                // Additional properties used by the existing codebase
                tags: Array.isArray(frontMatter.tags) ? frontMatter.tags as string[] : [],
                featured: Boolean(frontMatter.featured),
                slug: slug,
                content: markdownContent,
                status: frontMatter.status ? String(frontMatter.status) : undefined,
                lastUpdated: frontMatter.lastUpdated ? String(frontMatter.lastUpdated) : undefined,
                startDate: frontMatter.startDate ? String(frontMatter.startDate) : undefined,
                endDate: frontMatter.endDate ? String(frontMatter.endDate) : undefined,
                githubLink: String(frontMatter.githubLink || frontMatter.githubUrl || "#"),
                demoLink: String(frontMatter.demoLink || frontMatter.demoUrl || ""),
                githubStats: (frontMatter.githubStats as GitHubStats) || { stars: 0, forks: 0, issues: 0, contributors: 0 },
                github: frontMatter.github ? String(frontMatter.github) : (frontMatter.githubLink ? String(frontMatter.githubLink) : undefined),
                demo: frontMatter.demo ? String(frontMatter.demo) : (frontMatter.demoLink ? String(frontMatter.demoLink) : undefined),
                // New frontmatter options for demo button behavior
                demoButtonType: frontMatter.demoButtonType as "demo" | "project" | undefined,
                hideDemoIfMissing: !!frontMatter.hideDemoIfMissing,
                gallery: Array.isArray(frontMatter.gallery) ? frontMatter.gallery as string[] : [] // Add gallery field
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
        // Attempt to fetch GitHub stats for projects that expose a GitHub link.
        // We do this after parsing so that frontmatter parsing errors don't block stats fetch.
        const token = (import.meta.env && (import.meta.env.VITE_GITHUB_TOKEN as string)) || '';

        async function fetchStatsForProject(p: ProjectFrontMatter & { content: string }) {
          const url = p.githubLink || p.github || '';
          if (!url || !url.includes('github.com')) return p;

          const match = url.match(/github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+)(?:\.git|\/|$)/i);
          if (!match || !(match.groups && match.groups.owner && match.groups.repo)) return p;

          const owner = match.groups.owner;
          const repo = match.groups.repo.replace(/\.git$/i, '');

          // Check localStorage cache to avoid hitting GitHub API too often.
          // Cache key: githubStats:<owner>/<repo>
          try {
            const cacheKey = `githubStats:${owner}/${repo}`;
            const cachedRaw = typeof localStorage !== 'undefined' ? localStorage.getItem(cacheKey) : null;
            if (cachedRaw) {
              const cached = JSON.parse(cachedRaw) as { stats: GitHubStats; fetchedAt: number };
              const age = Date.now() - (cached.fetchedAt || 0);
              const twelveHours = 12 * 60 * 60 * 1000;
              if (cached && cached.stats && age < twelveHours) {
                p.githubStats = cached.stats;
                return p;
              }
            }
          } catch (err) {
            // If localStorage access fails, continue to fetch fresh data.
            console.warn('LocalStorage unavailable for GitHub stats cache', err);
          }

          try {
            const headers: Record<string, string> = {
              'Accept': 'application/vnd.github+json'
            };
            if (token) headers['Authorization'] = `token ${token}`;

            // Repo info (stars, forks, issues)
            const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
            if (!repoRes.ok) throw new Error(`GitHub repo fetch failed: ${repoRes.status}`);
            const repoJson = await repoRes.json();

            // Contributors: try to get contributors count from contributors endpoint (may be paginated)
            // We'll request per_page=1 and inspect the Link header for the last page if present.
            const contribRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`, { headers });
            let contributors = 0;
            if (contribRes.ok) {
              const link = contribRes.headers.get('Link');
              if (link) {
                // Find last page number in Link header
                const m = link.match(/&page=(\d+)>; rel="last"/);
                if (m && m[1]) contributors = Number(m[1]);
                else {
                  // Fallback: count items in this page
                  const arr = await contribRes.json();
                  contributors = Array.isArray(arr) ? arr.length : 0;
                }
              } else {
                const arr = await contribRes.json();
                contributors = Array.isArray(arr) ? arr.length : 0;
              }
            }

            p.githubStats = {
              stars: Number(repoJson.stargazers_count || 0),
              forks: Number(repoJson.forks_count || 0),
              issues: Number(repoJson.open_issues_count || 0),
              contributors: contributors || 0
            } as GitHubStats;
            // Save into localStorage cache with timestamp (best-effort)
            try {
              const cacheKey = `githubStats:${owner}/${repo}`;
              if (typeof localStorage !== 'undefined') {
                const payload = JSON.stringify({ stats: p.githubStats, fetchedAt: Date.now() });
                localStorage.setItem(cacheKey, payload);
              }
            } catch (err) {
              // ignore localStorage errors
            }
          } catch (err) {
            // Do not fail the whole load if GitHub API fails; leave defaults in place
            console.warn('Failed to fetch GitHub stats for', p.slug, err);
            p.githubStats = p.githubStats || { stars: 0, forks: 0, issues: 0, contributors: 0 };
          }

          return p;
        }

        // Fetch stats in parallel but keep reasonable concurrency (simple Promise.all here)
        const projectsWithStats = await Promise.all(parsedProjects.map((p) => fetchStatsForProject(p)));

        setAllProjects(projectsWithStats);
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
