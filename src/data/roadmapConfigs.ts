// Roadmap node and edge configurations for all interactive roadmaps

export interface RoadmapNode {
  id: string;
  type: string;
  data: { label: string };
  position: { x: number; y: number };
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
}

export interface RoadmapConfig {
  id: string;
  title: string;
  subtitle: string;
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
}

// Common node spacing
const COL_WIDTH = 180;
const ROW_HEIGHT = 100;
const CENTER = 400;

// ============================================
// FRONTEND ROADMAP
// ============================================
const frontendNodes: RoadmapNode[] = [
  { id: '1', type: 'roadmapNode', data: { label: 'Internet' }, position: { x: CENTER, y: 0 } },
  { id: '2', type: 'roadmapNode', data: { label: 'HTML' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'CSS' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT } },
  { id: '4', type: 'roadmapNode', data: { label: 'HTML Semántico' }, position: { x: CENTER - COL_WIDTH * 2, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'Accesibilidad' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Flexbox' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '7', type: 'roadmapNode', data: { label: 'CSS Grid' }, position: { x: CENTER + COL_WIDTH * 2, y: ROW_HEIGHT * 2 } },
  { id: '8', type: 'roadmapNode', data: { label: 'JavaScript' }, position: { x: CENTER, y: ROW_HEIGHT * 3 } },
  { id: '9', type: 'roadmapNode', data: { label: 'Manipulación DOM' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 4 } },
  { id: '10', type: 'roadmapNode', data: { label: 'Fetch API / AJAX' }, position: { x: CENTER, y: ROW_HEIGHT * 4 } },
  { id: '11', type: 'roadmapNode', data: { label: 'ES6+ Features' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 4 } },
  { id: '12', type: 'roadmapNode', data: { label: 'Git' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '13', type: 'roadmapNode', data: { label: 'npm' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '14', type: 'roadmapNode', data: { label: 'Sass/SCSS' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 6 } },
  { id: '15', type: 'roadmapNode', data: { label: 'Tailwind CSS' }, position: { x: CENTER, y: ROW_HEIGHT * 6 } },
  { id: '16', type: 'roadmapNode', data: { label: 'CSS-in-JS' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 6 } },
  { id: '17', type: 'roadmapNode', data: { label: 'Build Tools' }, position: { x: CENTER, y: ROW_HEIGHT * 7 } },
  { id: '18', type: 'roadmapNode', data: { label: 'Elige Framework' }, position: { x: CENTER, y: ROW_HEIGHT * 8 } },
  { id: '19', type: 'roadmapNode', data: { label: 'React' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 9 } },
  { id: '20', type: 'roadmapNode', data: { label: 'Vue' }, position: { x: CENTER, y: ROW_HEIGHT * 9 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Angular' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 9 } },
  { id: '22', type: 'roadmapNode', data: { label: 'Gestión de Estado' }, position: { x: CENTER, y: ROW_HEIGHT * 10 } },
  { id: '23', type: 'roadmapNode', data: { label: 'TypeScript' }, position: { x: CENTER, y: ROW_HEIGHT * 11 } },
  { id: '24', type: 'roadmapNode', data: { label: 'Testing' }, position: { x: CENTER, y: ROW_HEIGHT * 12 } },
  { id: '25', type: 'roadmapNode', data: { label: 'Next.js' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '26', type: 'roadmapNode', data: { label: 'Nuxt.js' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '27', type: 'roadmapNode', data: { label: 'Rendimiento Web' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 14 } },
  { id: '28', type: 'roadmapNode', data: { label: 'PWA' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 14 } },
  { id: '29', type: 'roadmapNode', data: { label: '¡Sigue Aprendiendo!' }, position: { x: CENTER, y: ROW_HEIGHT * 15 } },
];

const frontendEdges: RoadmapEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e3-7', source: '3', target: '7' },
  { id: 'e4-8', source: '4', target: '8' },
  { id: 'e5-8', source: '5', target: '8' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e8-11', source: '8', target: '11' },
  { id: 'e9-12', source: '9', target: '12' },
  { id: 'e10-12', source: '10', target: '12' },
  { id: 'e10-13', source: '10', target: '13' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-14', source: '12', target: '14' },
  { id: 'e12-15', source: '12', target: '15' },
  { id: 'e13-15', source: '13', target: '15' },
  { id: 'e13-16', source: '13', target: '16' },
  { id: 'e14-17', source: '14', target: '17' },
  { id: 'e15-17', source: '15', target: '17' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e17-18', source: '17', target: '18' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e18-20', source: '18', target: '20' },
  { id: 'e18-21', source: '18', target: '21' },
  { id: 'e19-22', source: '19', target: '22' },
  { id: 'e20-22', source: '20', target: '22' },
  { id: 'e21-22', source: '21', target: '22' },
  { id: 'e22-23', source: '22', target: '23' },
  { id: 'e23-24', source: '23', target: '24' },
  { id: 'e24-25', source: '24', target: '25' },
  { id: 'e24-26', source: '24', target: '26' },
  { id: 'e25-27', source: '25', target: '27' },
  { id: 'e25-28', source: '25', target: '28' },
  { id: 'e26-27', source: '26', target: '27' },
  { id: 'e26-28', source: '26', target: '28' },
  { id: 'e27-29', source: '27', target: '29' },
  { id: 'e28-29', source: '28', target: '29' },
];

// ============================================
// BACKEND ROADMAP
// ============================================
const backendNodes: RoadmapNode[] = [
  { id: '1', type: 'roadmapNode', data: { label: 'Internet & HTTP' }, position: { x: CENTER, y: 0 } },
  { id: '2', type: 'roadmapNode', data: { label: 'Lenguaje Backend' }, position: { x: CENTER, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'Node.js' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 2 } },
  { id: '4', type: 'roadmapNode', data: { label: 'Python' }, position: { x: CENTER, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'Go / Java' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 2 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Control de Versiones' }, position: { x: CENTER, y: ROW_HEIGHT * 3 } },
  { id: '7', type: 'roadmapNode', data: { label: 'Bases de Datos' }, position: { x: CENTER, y: ROW_HEIGHT * 4 } },
  { id: '8', type: 'roadmapNode', data: { label: 'SQL (PostgreSQL)' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '9', type: 'roadmapNode', data: { label: 'NoSQL (MongoDB)' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '10', type: 'roadmapNode', data: { label: 'APIs RESTful' }, position: { x: CENTER, y: ROW_HEIGHT * 6 } },
  { id: '11', type: 'roadmapNode', data: { label: 'Autenticación' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '12', type: 'roadmapNode', data: { label: 'Autorización' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '13', type: 'roadmapNode', data: { label: 'ORM / ODM' }, position: { x: CENTER, y: ROW_HEIGHT * 8 } },
  { id: '14', type: 'roadmapNode', data: { label: 'Testing' }, position: { x: CENTER, y: ROW_HEIGHT * 9 } },
  { id: '15', type: 'roadmapNode', data: { label: 'Caching' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 10 } },
  { id: '16', type: 'roadmapNode', data: { label: 'Message Queues' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 10 } },
  { id: '17', type: 'roadmapNode', data: { label: 'Docker' }, position: { x: CENTER, y: ROW_HEIGHT * 11 } },
  { id: '18', type: 'roadmapNode', data: { label: 'CI/CD' }, position: { x: CENTER, y: ROW_HEIGHT * 12 } },
  { id: '19', type: 'roadmapNode', data: { label: 'Microservicios' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '20', type: 'roadmapNode', data: { label: 'GraphQL' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Kubernetes' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 14 } },
  { id: '22', type: 'roadmapNode', data: { label: 'Cloud (AWS/GCP)' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 14 } },
  { id: '23', type: 'roadmapNode', data: { label: '¡Sigue Aprendiendo!' }, position: { x: CENTER, y: ROW_HEIGHT * 15 } },
];

const backendEdges: RoadmapEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e9-10', source: '9', target: '10' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e10-12', source: '10', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e14-15', source: '14', target: '15' },
  { id: 'e14-16', source: '14', target: '16' },
  { id: 'e15-17', source: '15', target: '17' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e17-18', source: '17', target: '18' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e18-20', source: '18', target: '20' },
  { id: 'e19-21', source: '19', target: '21' },
  { id: 'e19-22', source: '19', target: '22' },
  { id: 'e20-21', source: '20', target: '21' },
  { id: 'e20-22', source: '20', target: '22' },
  { id: 'e21-23', source: '21', target: '23' },
  { id: 'e22-23', source: '22', target: '23' },
];

// ============================================
// COMPETITIVE PROGRAMMING ROADMAP
// ============================================
const competitiveNodes: RoadmapNode[] = [
  { id: '1', type: 'roadmapNode', data: { label: 'Fundamentos' }, position: { x: CENTER, y: 0 } },
  { id: '2', type: 'roadmapNode', data: { label: 'C++ Básico' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'Python Básico' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT } },
  { id: '4', type: 'roadmapNode', data: { label: 'Complejidad' }, position: { x: CENTER, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'Arrays y Strings' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 3 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Matemáticas' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 3 } },
  { id: '7', type: 'roadmapNode', data: { label: 'Ordenamiento' }, position: { x: CENTER, y: ROW_HEIGHT * 4 } },
  { id: '8', type: 'roadmapNode', data: { label: 'Búsqueda Binaria' }, position: { x: CENTER, y: ROW_HEIGHT * 5 } },
  { id: '9', type: 'roadmapNode', data: { label: 'Two Pointers' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 6 } },
  { id: '10', type: 'roadmapNode', data: { label: 'Sliding Window' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 6 } },
  { id: '11', type: 'roadmapNode', data: { label: 'Recursión' }, position: { x: CENTER, y: ROW_HEIGHT * 7 } },
  { id: '12', type: 'roadmapNode', data: { label: 'Backtracking' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 8 } },
  { id: '13', type: 'roadmapNode', data: { label: 'Divide & Conquer' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 8 } },
  { id: '14', type: 'roadmapNode', data: { label: 'Estructuras de Datos' }, position: { x: CENTER, y: ROW_HEIGHT * 9 } },
  { id: '15', type: 'roadmapNode', data: { label: 'Stacks & Queues' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 10 } },
  { id: '16', type: 'roadmapNode', data: { label: 'Trees' }, position: { x: CENTER, y: ROW_HEIGHT * 10 } },
  { id: '17', type: 'roadmapNode', data: { label: 'Grafos' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 10 } },
  { id: '18', type: 'roadmapNode', data: { label: 'Programación Dinámica' }, position: { x: CENTER, y: ROW_HEIGHT * 11 } },
  { id: '19', type: 'roadmapNode', data: { label: 'Greedy' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 12 } },
  { id: '20', type: 'roadmapNode', data: { label: 'Segment Trees' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 12 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Teoría de Números' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '22', type: 'roadmapNode', data: { label: 'Geometría' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '23', type: 'roadmapNode', data: { label: 'Concursos ICPC' }, position: { x: CENTER, y: ROW_HEIGHT * 14 } },
  { id: '24', type: 'roadmapNode', data: { label: '¡Practica Siempre!' }, position: { x: CENTER, y: ROW_HEIGHT * 15 } },
];

const competitiveEdges: RoadmapEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e9-11', source: '9', target: '11' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-14', source: '12', target: '14' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e14-15', source: '14', target: '15' },
  { id: 'e14-16', source: '14', target: '16' },
  { id: 'e14-17', source: '14', target: '17' },
  { id: 'e15-18', source: '15', target: '18' },
  { id: 'e16-18', source: '16', target: '18' },
  { id: 'e17-18', source: '17', target: '18' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e18-20', source: '18', target: '20' },
  { id: 'e19-21', source: '19', target: '21' },
  { id: 'e19-22', source: '19', target: '22' },
  { id: 'e20-21', source: '20', target: '21' },
  { id: 'e20-22', source: '20', target: '22' },
  { id: 'e21-23', source: '21', target: '23' },
  { id: 'e22-23', source: '22', target: '23' },
  { id: 'e23-24', source: '23', target: '24' },
];

// ============================================
// DATA SCIENCE ROADMAP
// ============================================
const datascienceNodes: RoadmapNode[] = [
  { id: '1', type: 'roadmapNode', data: { label: 'Python' }, position: { x: CENTER, y: 0 } },
  { id: '2', type: 'roadmapNode', data: { label: 'Matemáticas' }, position: { x: CENTER, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'Álgebra Lineal' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '4', type: 'roadmapNode', data: { label: 'Estadística' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'NumPy' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 3 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Pandas' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 3 } },
  { id: '7', type: 'roadmapNode', data: { label: 'Visualización' }, position: { x: CENTER, y: ROW_HEIGHT * 4 } },
  { id: '8', type: 'roadmapNode', data: { label: 'Matplotlib' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '9', type: 'roadmapNode', data: { label: 'Seaborn' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '10', type: 'roadmapNode', data: { label: 'EDA' }, position: { x: CENTER, y: ROW_HEIGHT * 6 } },
  { id: '11', type: 'roadmapNode', data: { label: 'Limpieza de Datos' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '12', type: 'roadmapNode', data: { label: 'Feature Engineering' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '13', type: 'roadmapNode', data: { label: 'Scikit-learn' }, position: { x: CENTER, y: ROW_HEIGHT * 8 } },
  { id: '14', type: 'roadmapNode', data: { label: 'Regresión' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 9 } },
  { id: '15', type: 'roadmapNode', data: { label: 'Clasificación' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 9 } },
  { id: '16', type: 'roadmapNode', data: { label: 'Clustering' }, position: { x: CENTER, y: ROW_HEIGHT * 10 } },
  { id: '17', type: 'roadmapNode', data: { label: 'SQL' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 11 } },
  { id: '18', type: 'roadmapNode', data: { label: 'Big Data' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 11 } },
  { id: '19', type: 'roadmapNode', data: { label: 'Spark' }, position: { x: CENTER, y: ROW_HEIGHT * 12 } },
  { id: '20', type: 'roadmapNode', data: { label: 'Dashboards' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Storytelling' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '22', type: 'roadmapNode', data: { label: '¡Sigue Explorando!' }, position: { x: CENTER, y: ROW_HEIGHT * 14 } },
];

const datascienceEdges: RoadmapEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e7-9', source: '7', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e9-10', source: '9', target: '10' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e10-12', source: '10', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e13-15', source: '13', target: '15' },
  { id: 'e14-16', source: '14', target: '16' },
  { id: 'e15-16', source: '15', target: '16' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e16-18', source: '16', target: '18' },
  { id: 'e17-19', source: '17', target: '19' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e19-20', source: '19', target: '20' },
  { id: 'e19-21', source: '19', target: '21' },
  { id: 'e20-22', source: '20', target: '22' },
  { id: 'e21-22', source: '21', target: '22' },
];

// ============================================
// AI / MACHINE LEARNING ROADMAP
// ============================================
const aiNodes: RoadmapNode[] = [
  { id: '1', type: 'roadmapNode', data: { label: 'Python' }, position: { x: CENTER, y: 0 } },
  { id: '2', type: 'roadmapNode', data: { label: 'Matemáticas para ML' }, position: { x: CENTER, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'Cálculo' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '4', type: 'roadmapNode', data: { label: 'Probabilidad' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'Machine Learning' }, position: { x: CENTER, y: ROW_HEIGHT * 3 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Supervisado' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 4 } },
  { id: '7', type: 'roadmapNode', data: { label: 'No Supervisado' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 4 } },
  { id: '8', type: 'roadmapNode', data: { label: 'Redes Neuronales' }, position: { x: CENTER, y: ROW_HEIGHT * 5 } },
  { id: '9', type: 'roadmapNode', data: { label: 'Deep Learning' }, position: { x: CENTER, y: ROW_HEIGHT * 6 } },
  { id: '10', type: 'roadmapNode', data: { label: 'TensorFlow' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '11', type: 'roadmapNode', data: { label: 'PyTorch' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 7 } },
  { id: '12', type: 'roadmapNode', data: { label: 'CNNs' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 8 } },
  { id: '13', type: 'roadmapNode', data: { label: 'RNNs / LSTMs' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 8 } },
  { id: '14', type: 'roadmapNode', data: { label: 'Transformers' }, position: { x: CENTER, y: ROW_HEIGHT * 9 } },
  { id: '15', type: 'roadmapNode', data: { label: 'NLP' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 10 } },
  { id: '16', type: 'roadmapNode', data: { label: 'Computer Vision' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 10 } },
  { id: '17', type: 'roadmapNode', data: { label: 'LLMs' }, position: { x: CENTER, y: ROW_HEIGHT * 11 } },
  { id: '18', type: 'roadmapNode', data: { label: 'Fine-tuning' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 12 } },
  { id: '19', type: 'roadmapNode', data: { label: 'RAG' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 12 } },
  { id: '20', type: 'roadmapNode', data: { label: 'MLOps' }, position: { x: CENTER, y: ROW_HEIGHT * 13 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Ética en IA' }, position: { x: CENTER, y: ROW_HEIGHT * 14 } },
  { id: '22', type: 'roadmapNode', data: { label: '¡Sigue Innovando!' }, position: { x: CENTER, y: ROW_HEIGHT * 15 } },
];

const aiEdges: RoadmapEdge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
  { id: 'e5-7', source: '5', target: '7' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e9-10', source: '9', target: '10' },
  { id: 'e9-11', source: '9', target: '11' },
  { id: 'e10-12', source: '10', target: '12' },
  { id: 'e10-13', source: '10', target: '13' },
  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e11-13', source: '11', target: '13' },
  { id: 'e12-14', source: '12', target: '14' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e14-15', source: '14', target: '15' },
  { id: 'e14-16', source: '14', target: '16' },
  { id: 'e15-17', source: '15', target: '17' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e17-18', source: '17', target: '18' },
  { id: 'e17-19', source: '17', target: '19' },
  { id: 'e18-20', source: '18', target: '20' },
  { id: 'e19-20', source: '19', target: '20' },
  { id: 'e20-21', source: '20', target: '21' },
  { id: 'e21-22', source: '21', target: '22' },
];

// ============================================
// EXPORT ALL ROADMAP CONFIGS
// ============================================
export const roadmapConfigs: Record<string, RoadmapConfig> = {
  frontend: {
    id: 'frontend',
    title: 'Ruta de Desarrollo Frontend',
    subtitle: 'Haz clic en cualquier nodo para ver más detalles',
    nodes: frontendNodes,
    edges: frontendEdges,
  },
  backend: {
    id: 'backend',
    title: 'Ruta de Desarrollo Backend',
    subtitle: 'Haz clic en cualquier nodo para ver más detalles',
    nodes: backendNodes,
    edges: backendEdges,
  },
  competitive: {
    id: 'competitive',
    title: 'Ruta de Programación Competitiva',
    subtitle: 'Haz clic en cualquier nodo para ver más detalles',
    nodes: competitiveNodes,
    edges: competitiveEdges,
  },
  datascience: {
    id: 'datascience',
    title: 'Ruta de Ciencia de Datos',
    subtitle: 'Haz clic en cualquier nodo para ver más detalles',
    nodes: datascienceNodes,
    edges: datascienceEdges,
  },
  artificialintelligence: {
    id: 'artificialintelligence',
    title: 'Ruta de Inteligencia Artificial',
    subtitle: 'Haz clic en cualquier nodo para ver más detalles',
    nodes: aiNodes,
    edges: aiEdges,
  },
};
