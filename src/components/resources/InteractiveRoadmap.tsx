import React, { useCallback, useState, useEffect, useMemo, memo } from 'react';
import {
  ReactFlow,
  Handle,
  Position,
  Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { loadRoadmapContent, type NodeContent } from '@/lib/roadmapContentLoader';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, X } from 'lucide-react';
import { roadmapConfigs } from '@/data/roadmapConfigs';

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

interface InteractiveRoadmapProps {
  roadmapId: string;
  onClose: () => void;
}

const InteractiveRoadmap: React.FC<InteractiveRoadmapProps> = ({ roadmapId, onClose }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [nodeContent, setNodeContent] = useState<Record<string, NodeContent>>({});
  const [loading, setLoading] = useState(true);
  const [sheetStyle, setSheetStyle] = useState<React.CSSProperties>({ width: '100vw', maxWidth: '100vw' });

  // Get roadmap config
  const config = roadmapConfigs[roadmapId];

  // Memoize nodes and edges
  const nodes = useMemo(() => config?.nodes || [], [config]);
  const edges = useMemo(() => config?.edges || [], [config]);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await loadRoadmapContent(roadmapId);
        setNodeContent(content);
      } catch (error) {
        console.error('Error al cargar el contenido del roadmap:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [roadmapId]);

  useEffect(() => {
    const updateSheetWidth = () => {
      const w = window.innerWidth || document.documentElement.clientWidth;
      if (w >= 1024) {
        const calculated = Math.round(w * 0.4);
        const widthPx = Math.max(calculated, 600);
        setSheetStyle({ width: `${widthPx}px`, maxWidth: '95vw' });
      } else {
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

  if (!config) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Roadmap no encontrado</p>
          <Button onClick={onClose} className="mt-4">Volver</Button>
        </div>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold">{config.title}</h1>
            <p className="text-sm text-muted-foreground">{config.subtitle}</p>
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
            {selectedNode && !nodeContent[selectedNode] && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Contenido próximamente disponible</p>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default InteractiveRoadmap;
