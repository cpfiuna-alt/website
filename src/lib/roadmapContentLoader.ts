import fm from 'front-matter';

export interface NodeContent {
  id: string;
  title: string;
  description: string;
  content: string;
  embeds: Array<{
    type: 'image' | 'youtube' | 'googledrive';
    url: string;
  }>;
}

export interface RoadmapData {
  [key: string]: NodeContent;
}

// Pre-load all roadmap content using Vite's import.meta.glob
const frontendModules = import.meta.glob('/src/content/roadmaps/frontend/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const backendModules = import.meta.glob('/src/content/roadmaps/backend/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const competitiveModules = import.meta.glob('/src/content/roadmaps/competitive/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const datascienceModules = import.meta.glob('/src/content/roadmaps/datascience/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const aiModules = import.meta.glob('/src/content/roadmaps/artificialintelligence/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const roadmapModulesMap: Record<string, Record<string, unknown>> = {
  frontend: frontendModules,
  backend: backendModules,
  competitive: competitiveModules,
  datascience: datascienceModules,
  artificialintelligence: aiModules,
};

function parseModules(modules: Record<string, unknown>): RoadmapData {
  const content: RoadmapData = {};

  for (const [, contentRaw] of Object.entries(modules)) {
    if (typeof contentRaw === 'string') {
      const { attributes, body } = fm(contentRaw);
      const data = attributes as {
        id: string;
        title: string;
        description: string;
        embeds?: Array<{
          type: 'image' | 'youtube' | 'googledrive';
          url: string;
        }>;
      };
      const markdownContent = body;

      if (data.id) {
        content[data.id] = {
          id: data.id,
          title: data.title || '',
          description: data.description || '',
          content: markdownContent,
          embeds: data.embeds || [],
        };
      }
    }
  }

  return content;
}

export async function loadRoadmapContent(roadmapName: string): Promise<RoadmapData> {
  const modules = roadmapModulesMap[roadmapName];
  
  if (!modules) {
    console.warn(`No modules found for roadmap: ${roadmapName}`);
    return {};
  }

  return parseModules(modules);
}

