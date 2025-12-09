export interface ProjectConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'beta' | 'planning' | 'archived';
  category: 'web' | 'bot' | 'education' | 'iot' | 'ai' | 'infrastructure';
  tags: string[];
  repository?: string;
  demo?: string;
  version?: string;
  lastUpdate: string;
  maintainers: string[];
  featured: boolean;
  order?: number;
}

import fm from 'front-matter';

// Dynamically load project folders by reading their `index.md` frontmatter.
// This uses Vite's `import.meta.glob` and returns a Promise-based API.
// Consumers should `await` these helpers (or use Suspense / effects in React).

export async function loadProjectsConfig(): Promise<ProjectConfig[]> {
  // `as: 'raw'` gives us the file contents as a string. The glob returns
  // an object where each value is an async resolver function.
  const modules = import.meta.glob('./*/index.md', { as: 'raw' });

  const entries = Object.entries(modules) as [string, () => Promise<string>][];

  const projects = await Promise.all(
    entries.map(async ([path, resolver]) => {
      const raw = await resolver();
      const parsed = fm(raw || '');
      // `front-matter` exposes attributes on `parsed.attributes`
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = (parsed && (parsed.attributes as any)) || {};

      // path is like './discord-bot-cpf/index.md'
      const parts = path.split('/');
      const id = parts.length >= 2 ? parts[1] : path;

      const cfg: ProjectConfig = {
        id,
        name: (data && (data.title || data.name)) || id,
        description: (data && data.description) || '',
        icon: (data && data.icon) || 'FileText',
        status: (data && data.status) || 'active',
        category: (data && data.category) || 'web',
        tags: (data && data.tags) || [],
        repository: (data && data.repository) || undefined,
        demo: (data && data.demo) || undefined,
        version: (data && data.version) || undefined,
        lastUpdate: (data && data.lastUpdate) || (data && data.updated) || new Date().toISOString(),
        maintainers: (data && data.maintainers) || [],
        featured: !!(data && data.featured),
        order: (data && typeof data.order === 'number' ? data.order : 999),
      };

      return cfg;
    })
  );

  projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  return projects;
}

export async function getProjectById(id: string): Promise<ProjectConfig | undefined> {
  const projects = await loadProjectsConfig();
  return projects.find((p) => p.id === id);
}

export async function getFeaturedProjects(): Promise<ProjectConfig[]> {
  const projects = await loadProjectsConfig();
  return projects.filter((p) => p.featured);
}

export async function getProjectsByCategory(category: string): Promise<ProjectConfig[]> {
  const projects = await loadProjectsConfig();
  return projects.filter((p) => p.category === category);
}

export async function getProjectsByStatus(status: string): Promise<ProjectConfig[]> {
  const projects = await loadProjectsConfig();
  return projects.filter((p) => p.status === status);
}
