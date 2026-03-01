import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp, BookOpen, Video, FileText, Code, Terminal, Award, Lightbulb, Users, Compass } from 'lucide-react';
import { Roadmap, RoadmapResource } from '@/data/learningRoadmaps';

interface RoadmapFlowProps {
  roadmap: Roadmap;
}

interface Position {
  x: number;
  y: number;
}

// Custom component for animated dashed line
const AnimatedDashedLine = ({ d, stroke, strokeWidth = 2 }: { d: string; stroke: string; strokeWidth?: number }) => {
  return (
    <path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      strokeDasharray="8,4"
      style={{
        animation: 'dashAnimation 20s linear infinite',
      }}
    />
  );
};

const RoadmapFlow: React.FC<RoadmapFlowProps> = ({ roadmap }) => {
  // Add a style element to the component for global animations
  useEffect(() => {
    // Create a style element for animations
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes dashAnimation {
        to {
          stroke-dashoffset: -24;
        }
      }
    `;
    document.head.appendChild(styleElement);

    // Clean up function
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState<Position>({ x: 0, y: 0 });
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  
  // Resource type icon mapping
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'curso':
      case 'tutorial':
        return <Video className="h-4 w-4" />;
      case 'guía':
      case 'documentación':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const toggleNodeExpansion = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // Handle mouse wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = e.deltaY < 0 
      ? Math.min(scale * 1.1, 2) // Zoom in with maximum limit
      : Math.max(scale * 0.9, 0.5); // Zoom out with minimum limit
    setScale(newScale);
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Handle mouse move for panning when dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y
      });
    }
  };

  // Handle mouse up to stop panning
  const handleMouseUp = () => {
    setDragging(false);
  };

  // Clean up event listeners
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      setDragging(false);
    };

    document.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);
  
  // Reset view button handler
  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Get level-specific styling
  const getLevelColor = (levelName: string) => {
    switch(levelName.toLowerCase()) {
      case 'principiante':
        return {
          bg: 'bg-green-500/20 dark:bg-green-950/50',
          border: 'border-green-500/50',
          text: 'text-green-600 dark:text-green-400',
          hover: 'hover:border-green-500/70 hover:bg-green-500/30',
          nodeColor: '#22c55e'
        };
      case 'intermedio':
        return {
          bg: 'bg-blue-500/20 dark:bg-blue-950/50',
          border: 'border-blue-500/50',
          text: 'text-blue-600 dark:text-blue-400',
          hover: 'hover:border-blue-500/70 hover:bg-blue-500/30',
          nodeColor: '#3b82f6'
        };
      case 'avanzado':
        return {
          bg: 'bg-purple-500/20 dark:bg-purple-950/50',
          border: 'border-purple-500/50',
          text: 'text-purple-600 dark:text-purple-400',
          hover: 'hover:border-purple-500/70 hover:bg-purple-500/30',
          nodeColor: '#8b5cf6'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/50',
          text: 'text-primary',
          hover: 'hover:border-primary/70 hover:bg-primary/30',
          nodeColor: 'currentColor'
        };
    }
  };
  
  // SVG paths for connections between levels and skills
  const renderConnections = () => {
    if (roadmap.levels.length <= 1) return null;
    
    return (
      <svg className="absolute pointer-events-none" style={{
        left: 0, top: 0, width: '100%', height: '100%', zIndex: 1
      }}>
        {/* Horizontal connections between level titles */}
        {roadmap.levels.slice(0, -1).map((level, index) => {
          const levelColor = getLevelColor(level.name);
          const nextLevelColor = getLevelColor(roadmap.levels[index + 1].name);
          
          return (
            <AnimatedDashedLine
              key={`level-connection-${index}`}
              d={`M${(index + 1) * 280 - 40}, 100 C${(index + 1) * 280 + 80}, 100 ${(index + 1) * 280 + 80}, 100 ${(index + 1) * 280 + 160}, 100`}
              stroke={`url(#gradient-${index})`}
              strokeWidth={3}
            />
          );
        })}
        
        {/* Vertical connections between level title and first skill */}
        {roadmap.levels.map((level, index) => {
          const levelColor = getLevelColor(level.name);
          
          return (
            <React.Fragment key={`vertical-connection-${index}`}>
              <path
                d={`M${index * 280 + 100}, 130 L${index * 280 + 100}, 165`}
                stroke={levelColor.nodeColor}
                strokeWidth="2"
                fill="none"
              />
              
              {/* Connections between skills */}
              {level.skills.slice(0, -1).map((_, skillIndex) => (
                <path
                  key={`skill-connection-${index}-${skillIndex}`}
                  d={`M${index * 280 + 100}, ${185 + skillIndex * 60} L${index * 280 + 100}, ${205 + skillIndex * 60}`}
                  stroke={levelColor.nodeColor}
                  strokeWidth="2"
                  fill="none"
                />
              ))}
              
              {/* Connection from last skill to resources */}
              <path
                d={`M${index * 280 + 100}, ${185 + (level.skills.length - 1) * 60} L${index * 280 + 100}, ${220 + (level.skills.length - 1) * 60}`}
                stroke={levelColor.nodeColor}
                strokeWidth="2"
                fill="none"
              />
            </React.Fragment>
          );
        })}
        
        {/* Gradient definitions for connections */}
        <defs>
          {roadmap.levels.slice(0, -1).map((level, index) => {
            const levelColor = getLevelColor(level.name);
            const nextLevelColor = getLevelColor(roadmap.levels[index + 1].name);
            
            return (
              <linearGradient id={`gradient-${index}`} key={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={levelColor.nodeColor} />
                <stop offset="100%" stopColor={nextLevelColor.nodeColor} />
              </linearGradient>
            );
          })}
        </defs>
      </svg>
    );
  };

  return (
    <div className="relative overflow-hidden border rounded-lg bg-background/50 backdrop-blur-sm shadow-lg h-[700px] mt-8">
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-background/90 backdrop-blur-md rounded-md py-1 px-2 shadow-md border border-border">
        <div className="text-xs mr-2 text-muted-foreground">Zoom: {Math.round(scale * 100)}%</div>
        <button
          onClick={() => setScale(Math.min(scale * 1.1, 2))}
          className="p-1.5 rounded-md hover:bg-primary/10 text-primary"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          onClick={() => setScale(Math.max(scale * 0.9, 0.5))}
          className="p-1.5 rounded-md hover:bg-primary/10 text-primary"
          aria-label="Zoom out"
        >
          -
        </button>
        <div className="w-px h-5 bg-border mx-1"></div>
        <button
          onClick={resetView}
          className="p-1.5 rounded-md hover:bg-primary/10 text-primary text-xs"
          aria-label="Reset view"
        >
          Resetear
        </button>
      </div>
      
      {/* Instructions */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 z-30 bg-background/90 backdrop-blur-md rounded-md p-3 shadow-md text-xs max-w-[250px] border border-border"
      >
        <h5 className="font-medium mb-2 text-sm flex items-center">
          <Compass className="w-3.5 h-3.5 mr-1.5 text-primary" /> 
          Cómo usar este mapa
        </h5>
        <ul className="space-y-1.5">
          <li className="flex items-center">
            <span className="text-primary mr-1.5">🔍</span> 
            <span>Usa la rueda del mouse para zoom</span>
          </li>
          <li className="flex items-center">
            <span className="text-primary mr-1.5">✋</span> 
            <span>Arrastra para mover el mapa</span>
          </li>
          <li className="flex items-center">
            <span className="text-primary mr-1.5">🖱️</span> 
            <span>Click en los nodos para expandir</span>
          </li>
        </ul>
      </motion.div>
      
      {/* Main container for panning and zooming */}
      <div 
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Zoomable content */}
        {/* We'll use inline styles for the animation since we don't have access to global CSS */}
      
      <motion.div
          className="relative min-w-[1200px] h-full"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Connections between levels */}
          {renderConnections()}
          
          {/* Roadmap title */}
          <div className="absolute left-8 top-8 z-10">
            <h3 className="text-2xl font-bold">{roadmap.title}</h3>
            <p className="text-muted-foreground">{roadmap.description}</p>
          </div>
          
          {/* Levels */}
          <div className="absolute left-8 top-32 flex space-x-24">
            {roadmap.levels.map((level, levelIndex) => {
              const levelStyle = getLevelColor(level.name);
              
              return (
                <div key={`${roadmap.id}-${level.name}`} className="relative flex flex-col items-center">
                  {/* Level title node */}
                  <div
                    className={`${levelStyle.bg} border-2 ${levelStyle.border} rounded-lg p-4 w-[200px] backdrop-blur-sm shadow-lg`}
                  >
                    <h4 className={`font-bold text-lg ${levelStyle.text}`}>{level.name}</h4>
                    <div className="text-xs text-muted-foreground mt-1">{level.skills.length} habilidades</div>
                  </div>
                  
                  {/* Skills nodes */}
                  <div className="mt-16 space-y-8">
                    {level.skills.map((skill, skillIndex) => {
                      const nodeId = `${roadmap.id}-${level.name}-skill-${skillIndex}`;
                      const isExpanded = expandedNodes.has(nodeId);
                      
                      return (
                        <div key={nodeId} className="relative">
                          {/* Dot connector above skill */}
                          <div 
                            className={`absolute -top-4 left-1/2 transform -translate-x-1/2 h-2 w-2 rounded-full ${levelStyle.bg} border ${levelStyle.border}`}
                          />
                          
                          {/* Skill node */}
                          <motion.div 
                            whileHover={{ scale: 1.03 }}
                            className={`relative bg-card/90 border ${levelStyle.border} ${levelStyle.hover} rounded-lg p-3 w-[200px] transition-all shadow-md backdrop-blur-sm`}
                            onClick={() => toggleNodeExpansion(nodeId)}
                          >
                            <div className="font-medium">{skill}</div>
                          </motion.div>
                          
                          {/* Dot connector below skill */}
                          <div 
                            className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-2 w-2 rounded-full ${levelStyle.bg} border ${levelStyle.border}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Resources node */}
                  <div className="mt-8 relative">
                    {/* Dot connector above resources */}
                    <div 
                      className={`absolute -top-4 left-1/2 transform -translate-x-1/2 h-2 w-2 rounded-full ${levelStyle.bg} border ${levelStyle.border}`}
                    />
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleNodeExpansion(`${roadmap.id}-${level.name}-resources`)}
                      className={`flex items-center justify-between w-[200px] p-3 rounded-lg shadow-md transition-all ${
                        expandedNodes.has(`${roadmap.id}-${level.name}-resources`) 
                          ? `${levelStyle.text} ${levelStyle.bg} border-2 ${levelStyle.border}` 
                          : "bg-card border border-border hover:border-primary/30"
                      }`}
                    >
                      <span className="font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Recursos ({level.resources.length})
                      </span>
                      {expandedNodes.has(`${roadmap.id}-${level.name}-resources`) 
                        ? <ChevronUp className="h-4 w-4" /> 
                        : <ChevronDown className="h-4 w-4" />
                      }
                    </motion.button>
                    
                    {/* Expanded resources list */}
                    {expandedNodes.has(`${roadmap.id}-${level.name}-resources`) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl w-[350px] max-h-[400px] overflow-y-auto z-20 absolute left-1/2 transform -translate-x-1/2"
                      >
                        <h5 className={`font-semibold text-sm mb-3 pb-2 border-b border-border ${levelStyle.text}`}>
                          Recursos recomendados para {level.name}
                        </h5>
                        
                        <ul className="space-y-3">
                          {level.resources.map((resource, i) => (
                            <li 
                              key={`${roadmap.id}-${level.name}-resource-${i}`} 
                              className="border-b border-border/50 pb-3 last:border-0"
                            >
                              <a 
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 hover:text-primary transition-colors group"
                              >
                                <div className={`mt-1 p-1.5 rounded-md ${levelStyle.bg} ${levelStyle.border} text-primary/80 group-hover:text-primary`}>
                                  {getResourceIcon(resource.type)}
                                </div>
                                <div>
                                  <span className="text-sm font-medium line-clamp-2 group-hover:text-primary">{resource.name}</span>
                                  <span className="text-xs text-muted-foreground flex items-center mt-1">
                                    {resource.type}
                                    <ExternalLink className="h-3 w-3 ml-1 group-hover:text-primary" />
                                  </span>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoadmapFlow;
