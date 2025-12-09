import React, { useCallback, useState, useEffect, useMemo, memo } from 'react';
import {
  ReactFlow,
  Handle,
  Position,
  Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { loadRoadmapContent, type NodeContent } from '@/lib/roadmapContentLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, X } from 'lucide-react';

interface RoadmapNodeProps {
  data: { label: string };
}

const RoadmapNode = memo(({ data }: RoadmapNodeProps) => {
  return (
    <div className="w-32 h-16 flex items-center justify-center bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors rounded-lg border border-primary/20 shadow-md">
      <div className="p-2 text-center text-sm font-medium">
        {data.label}
      </div>
      <Handle type="target" position={Position.Top} className="!bg-primary/50" />
      <Handle type="source" position={Position.Bottom} className="!bg-primary/50" />
    </div>
  );
});

RoadmapNode.displayName = 'RoadmapNode';

const nodeTypes = {
  roadmapNode: RoadmapNode,
};

// Node spacing
const COL_WIDTH = 180;
const ROW_HEIGHT = 100;
const CENTER = 400;

const initialNodes = [
  // Row 0: Start
  { id: '1', type: 'roadmapNode', data: { label: 'Internet' }, position: { x: CENTER, y: 0 } },

  // Row 1: HTML & CSS
  { id: '2', type: 'roadmapNode', data: { label: 'HTML' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT } },
  { id: '3', type: 'roadmapNode', data: { label: 'CSS' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT } },

  // Row 2: Semantic HTML, Accessibility, CSS Layouts
  { id: '4', type: 'roadmapNode', data: { label: 'HTML Semántico' }, position: { x: CENTER - COL_WIDTH * 2, y: ROW_HEIGHT * 2 } },
  { id: '5', type: 'roadmapNode', data: { label: 'Accesibilidad' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '6', type: 'roadmapNode', data: { label: 'Flexbox' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 2 } },
  { id: '7', type: 'roadmapNode', data: { label: 'CSS Grid' }, position: { x: CENTER + COL_WIDTH * 2, y: ROW_HEIGHT * 2 } },

  // Row 3: JavaScript
  { id: '8', type: 'roadmapNode', data: { label: 'JavaScript' }, position: { x: CENTER, y: ROW_HEIGHT * 3 } },

  // Row 4: JS Fundamentals
  { id: '9', type: 'roadmapNode', data: { label: 'Manipulación DOM' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 4 } },
  { id: '10', type: 'roadmapNode', data: { label: 'Fetch API / AJAX' }, position: { x: CENTER, y: ROW_HEIGHT * 4 } },
  { id: '11', type: 'roadmapNode', data: { label: 'ES6+ Features' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 4 } },

  // Row 5: Tools Setup
  { id: '12', type: 'roadmapNode', data: { label: 'Git' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 5 } },
  { id: '13', type: 'roadmapNode', data: { label: 'npm' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 5 } },

  // Row 6: CSS Preprocessors & Frameworks
  { id: '14', type: 'roadmapNode', data: { label: 'Sass/SCSS' }, position: { x: CENTER - COL_WIDTH * 1.5, y: ROW_HEIGHT * 6 } },
  { id: '15', type: 'roadmapNode', data: { label: 'Tailwind CSS' }, position: { x: CENTER, y: ROW_HEIGHT * 6 } },
  { id: '16', type: 'roadmapNode', data: { label: 'CSS-in-JS' }, position: { x: CENTER + COL_WIDTH * 1.5, y: ROW_HEIGHT * 6 } },

  // Row 7: Build Tools
  { id: '17', type: 'roadmapNode', data: { label: 'Build Tools' }, position: { x: CENTER, y: ROW_HEIGHT * 7 } },

  // Row 8: Pick Framework
  { id: '18', type: 'roadmapNode', data: { label: 'Elige Framework' }, position: { x: CENTER, y: ROW_HEIGHT * 8 } },

  // Row 9: Frameworks
  { id: '19', type: 'roadmapNode', data: { label: 'React' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 9 } },
  { id: '20', type: 'roadmapNode', data: { label: 'Vue' }, position: { x: CENTER, y: ROW_HEIGHT * 9 } },
  { id: '21', type: 'roadmapNode', data: { label: 'Angular' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 9 } },

  // Row 10: State Management
  { id: '22', type: 'roadmapNode', data: { label: 'Gestión de Estado' }, position: { x: CENTER, y: ROW_HEIGHT * 10 } },

  // Row 11: TypeScript
  { id: '23', type: 'roadmapNode', data: { label: 'TypeScript' }, position: { x: CENTER, y: ROW_HEIGHT * 11 } },

  // Row 12: Testing
  { id: '24', type: 'roadmapNode', data: { label: 'Testing' }, position: { x: CENTER, y: ROW_HEIGHT * 12 } },

  // Row 13: SSR / SSG
  { id: '25', type: 'roadmapNode', data: { label: 'Next.js' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 13 } },
  { id: '26', type: 'roadmapNode', data: { label: 'Nuxt.js' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 13 } },

  // Row 14: PWA & Performance
  { id: '27', type: 'roadmapNode', data: { label: 'Rendimiento Web' }, position: { x: CENTER - COL_WIDTH, y: ROW_HEIGHT * 14 } },
  { id: '28', type: 'roadmapNode', data: { label: 'PWA' }, position: { x: CENTER + COL_WIDTH, y: ROW_HEIGHT * 14 } },

  // Row 15: Final
  { id: '29', type: 'roadmapNode', data: { label: '¡Sigue Aprendiendo!' }, position: { x: CENTER, y: ROW_HEIGHT * 15 } },
];

const initialEdges = [
  // Internet -> HTML & CSS
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },

  // HTML -> Semantic HTML, Accessibility
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e2-5', source: '2', target: '5' },

  // CSS -> Flexbox, Grid
  { id: 'e3-6', source: '3', target: '6' },
  { id: 'e3-7', source: '3', target: '7' },

  // Semantic/Accessibility -> JavaScript
  { id: 'e4-8', source: '4', target: '8' },
  { id: 'e5-8', source: '5', target: '8' },

  // Flexbox/Grid -> JavaScript
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },

  // JavaScript -> DOM, Fetch, ES6+
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e8-10', source: '8', target: '10' },
  { id: 'e8-11', source: '8', target: '11' },

  // DOM/Fetch/ES6+ -> Git & npm
  { id: 'e9-12', source: '9', target: '12' },
  { id: 'e10-12', source: '10', target: '12' },
  { id: 'e10-13', source: '10', target: '13' },
  { id: 'e11-13', source: '11', target: '13' },

  // Git & npm -> CSS Preprocessors/Frameworks
  { id: 'e12-14', source: '12', target: '14' },
  { id: 'e12-15', source: '12', target: '15' },
  { id: 'e13-15', source: '13', target: '15' },
  { id: 'e13-16', source: '13', target: '16' },

  // CSS stuff -> Build Tools
  { id: 'e14-17', source: '14', target: '17' },
  { id: 'e15-17', source: '15', target: '17' },
  { id: 'e16-17', source: '16', target: '17' },

  // Build Tools -> Pick Framework
  { id: 'e17-18', source: '17', target: '18' },

  // Pick Framework -> React/Vue/Angular
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e18-20', source: '18', target: '20' },
  { id: 'e18-21', source: '18', target: '21' },

  // Frameworks -> State Management
  { id: 'e19-22', source: '19', target: '22' },
  { id: 'e20-22', source: '20', target: '22' },
  { id: 'e21-22', source: '21', target: '22' },

  // State Management -> TypeScript
  { id: 'e22-23', source: '22', target: '23' },

  // TypeScript -> Testing
  { id: 'e23-24', source: '23', target: '24' },

  // Testing -> Next.js/Nuxt
  { id: 'e24-25', source: '24', target: '25' },
  { id: 'e24-26', source: '24', target: '26' },

  // Next/Nuxt -> Performance & PWA
  { id: 'e25-27', source: '25', target: '27' },
  { id: 'e25-28', source: '25', target: '28' },
  { id: 'e26-27', source: '26', target: '27' },
  { id: 'e26-28', source: '26', target: '28' },

  // Performance & PWA -> Keep Learning
  { id: 'e27-29', source: '27', target: '29' },
  { id: 'e28-29', source: '28', target: '29' },
];

interface FrontendRoadmapProps {
  onClose: () => void;
}

const FrontendRoadmap: React.FC<FrontendRoadmapProps> = ({ onClose }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [nodeContent, setNodeContent] = useState<Record<string, NodeContent>>({});
  const [loading, setLoading] = useState(true);
  const [sheetStyle, setSheetStyle] = useState<React.CSSProperties>({ width: '100vw', maxWidth: '100vw' });

  // Memoize nodes and edges since they are static
  const nodes = useMemo(() => initialNodes, []);
  const edges = useMemo(() => initialEdges, []);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadRoadmapContent('frontend');
        setNodeContent(content);
      } catch (error) {
        console.error('Error al cargar el contenido del roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  useEffect(() => {
    const updateSheetWidth = () => {
      const w = window.innerWidth || document.documentElement.clientWidth;
      // On desktop (>=1024) use 40% of viewport but at least 600px and at most 95vw
      if (w >= 1024) {
        const calculated = Math.round(w * 0.4);
        const widthPx = Math.max(calculated, 600); // ensure not too narrow on small desktops
        setSheetStyle({ width: `${widthPx}px`, maxWidth: '95vw' });
      } else {
        // Mobile: full width
        setSheetStyle({ width: '100vw', maxWidth: '100vw' });
      }
    };

    updateSheetWidth();
    window.addEventListener('resize', updateSheetWidth);
    return () => window.removeEventListener('resize', updateSheetWidth);
  }, []);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.id);
    setIsSheetOpen(true);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Recursos
          </Button>
          <div className="h-6 w-px bg-border" />
          <div>
            <h1 className="text-xl font-bold">Ruta de Desarrollo Frontend</h1>
            <p className="text-sm text-muted-foreground">Haz clic en cualquier nodo para ver más detalles</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* React Flow Container */}
      <div style={{ width: '100%', height: '100%', paddingTop: '80px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={true}
          fitView
          minZoom={0.3}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          className="bg-muted/30"
        />
      </div>

      {/* Content Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="max-w-none w-full lg:w-2/5 overflow-y-auto" style={sheetStyle} aria-describedby={undefined}>
          <VisuallyHidden>
            <SheetHeader>
              <SheetTitle>
                {selectedNode && nodeContent[selectedNode] ? nodeContent[selectedNode].title : 'Detalles del nodo'}
              </SheetTitle>
            </SheetHeader>
          </VisuallyHidden>
          <div className="mt-6 px-2">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setIsSheetOpen(false)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al Roadmap
              </Button>
            </div>
            {selectedNode && nodeContent[selectedNode] && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <h1 className="text-2xl font-bold mb-2">{nodeContent[selectedNode].title}</h1>
                <p className="text-muted-foreground mb-6">{nodeContent[selectedNode].description}</p>
                
                {/* Embeds */}
                {nodeContent[selectedNode].embeds?.map((embed, index) => (
                  <div key={index} className="mb-6">
                    {embed.type === 'youtube' && (
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <iframe
                          width="100%"
                          height="100%"
                          src={embed.url.replace('watch?v=', 'embed/').replace('www.youtube.com', 'www.youtube-nocookie.com')}
                          title="Video de YouTube"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    )}
                    {embed.type === 'image' && (
                      <img src={embed.url} alt="" className="rounded-lg w-full" loading="lazy" />
                    )}
                  </div>
                ))}
                
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    pre: ({ children }) => (
                      <pre className="bg-slate-200 dark:bg-muted text-slate-800 dark:text-slate-50 p-4 rounded-lg overflow-x-auto text-sm border border-border my-4">
                        {children}
                      </pre>
                    ),
                    code: ({ children, className }) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                      ) : (
                        <code className={`${className || ''} text-slate-800 dark:text-slate-50`}>{children}</code>
                      );
                    },
                    h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    a: ({ href, children }) => (
                      <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>
                    ),
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4 rounded-lg border border-border">
                        <table className="min-w-full divide-y divide-border">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => (
                      <thead className="bg-muted">{children}</thead>
                    ),
                    tbody: ({ children }) => (
                      <tbody className="divide-y divide-border bg-background">{children}</tbody>
                    ),
                    tr: ({ children }) => (
                      <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
                    ),
                    th: ({ children }) => (
                      <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">{children}</th>
                    ),
                    td: ({ children }) => (
                      <td className="px-4 py-3 text-sm">{children}</td>
                    ),
                  }}
                >
                  {nodeContent[selectedNode].content}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FrontendRoadmap;
