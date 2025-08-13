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

export const projectsConfig: ProjectConfig[] = [
  /*{
    id: 'cpf-website',
    name: 'CPF Website',
    description: 'Sitio web oficial del Club de Programación FIUNA. Plataforma moderna para mostrar proyectos, eventos y recursos educativos.',
    icon: 'Globe',
    status: 'active',
    category: 'web',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    repository: 'https://github.com/cpf-fiuna/website',
    demo: 'https://cpf-fiuna.org',
    version: '2.0.0',
    lastUpdate: '2025-06-04',
    maintainers: ['David Giménez', 'Daniel Villalba'],
    featured: true,
    order: 1
  },
  {
    id: 'discord-bot',
    name: 'CPF Discord Bot',
    description: 'Bot inteligente para el servidor de Discord del club. Gestiona eventos, modula conversaciones y proporciona utilidades para la comunidad.',
    icon: 'Bot',
    status: 'active',
    category: 'bot',
    tags: ['Discord.js', 'Node.js', 'TypeScript', 'MongoDB'],
    repository: 'https://github.com/cpf-fiuna/discord-bot',
    version: '1.5.2',
    lastUpdate: '2025-05-28',
    maintainers: ['Iván Jara', 'Oscar Alderete'],
    featured: true,
    order: 2
  },
  {
    id: 'competitive-programming',
    name: 'Competitive Programming Platform',
    description: 'Plataforma educativa para aprender programación competitiva. Incluye problemas, tutoriales y sistema de evaluación automática.',
    icon: 'Trophy',
    status: 'beta',
    category: 'education',
    tags: ['React', 'Python', 'Docker', 'PostgreSQL'],
    repository: 'https://github.com/cpf-fiuna/competitive-programming',
    demo: 'https://cp.cpf-fiuna.org',
    version: '0.8.0',
    lastUpdate: '2025-05-15',
    maintainers: ['David Giménez', 'Iván Jara'],
    featured: true,
    order: 3
  },
  {
    id: 'hidroponia-iot',
    name: 'Sistema Hidroponía IoT',
    description: 'Sistema IoT para monitoreo y control automático de cultivos hidropónicos. Incluye sensores, actuadores y dashboard en tiempo real.',
    icon: 'Leaf',
    status: 'active',
    category: 'iot',
    tags: ['Arduino', 'React', 'MQTT', 'InfluxDB'],
    repository: 'https://github.com/cpf-fiuna/hidroponia-iot',
    demo: 'https://hidroponia.cpf-fiuna.org',
    version: '1.2.0',
    lastUpdate: '2025-05-22',
    maintainers: ['Iván Jara', 'Oscar Alderete'],
    featured: true,
    order: 4
  },
  {
    id: 'fiuna-chatbot',
    name: 'FIUNA AI Chatbot',
    description: 'Chatbot inteligente con IA para responder preguntas sobre la FIUNA. Utiliza procesamiento de lenguaje natural para asistir a estudiantes.',
    icon: 'MessageSquare',
    status: 'planning',
    category: 'ai',
    tags: ['Python', 'OpenAI', 'FastAPI', 'Langchain'],
    repository: 'https://github.com/cpf-fiuna/fiuna-chatbot',
    version: '0.3.0',
    lastUpdate: '2025-04-20',
    maintainers: ['Oscar Alderete'],
    featured: false,
    order: 5
  },
  {
    id: 'biblioteca-digital',
    name: 'Biblioteca Digital',
    description: 'Sistema de gestión de recursos digitales para la facultad. Permite catalogar, buscar y acceder a libros, papers y material académico.',
    icon: 'Library',
    status: 'planning',
    category: 'infrastructure',
    tags: ['Next.js', 'Prisma', 'PostgreSQL', 'Elasticsearch'],
    repository: 'https://github.com/cpf-fiuna/biblioteca-digital',
    version: '0.2.0',
    lastUpdate: '2025-03-10',
    maintainers: ['Daniel Villalba'],
    featured: false,
    order: 6
  }*/
];

export function getProjectById(id: string): ProjectConfig | undefined {
  return projectsConfig.find(project => project.id === id);
}

export function getFeaturedProjects(): ProjectConfig[] {
  return projectsConfig.filter(project => project.featured);
}

export function getProjectsByCategory(category: string): ProjectConfig[] {
  return projectsConfig.filter(project => project.category === category);
}

export function getProjectsByStatus(status: string): ProjectConfig[] {
  return projectsConfig.filter(project => project.status === status);
}
