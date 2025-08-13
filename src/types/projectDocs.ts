export interface ProjectDocFrontMatter {
  title: string;
  description: string;
  category: string;
  status: 'active' | 'beta' | 'planning' | 'archived';
  version?: string;
  repository?: string;
  demo?: string;
  maintainers?: string[];
  tags?: string[];
  lastUpdate: string;
  order?: number;
  chapter?: string;
  section?: string;
}

export interface ProjectDoc {
  frontMatter: ProjectDocFrontMatter;
  content: string;
  slug: string;
  projectId: string;
  path: string;
}

export interface ProjectChapter {
  id: string;
  title: string;
  description?: string;
  order: number;
  sections: ProjectSection[];
}

export interface ProjectSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  slug: string;
  path: string;
}

export interface ProjectDocStructure {
  projectId: string;
  overview: ProjectDoc;
  chapters: ProjectChapter[];
  totalDocs: number;
}
