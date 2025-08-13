
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Code, Book, Video, Download, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "code" | "video" | "repository" | "guide";
  icon: JSX.Element;
  link: string;
  tags: string[];
  author: string;
  date: string;
  size?: string;
}

const resources: Resource[] = [
  {
    id: "git-intro",
    title: "Introducción a Git y GitHub",
    description: "Presentación sobre control de versiones, comandos básicos de Git y flujo de trabajo colaborativo.",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
    link: "/resources/materials/git-github-intro.pdf",
    tags: ["Git", "GitHub", "Control de Versiones"],
    author: "Ing. María López",
    date: "15/02/2024",
    size: "5MB"
  },
  {
    id: "datastructures",
    title: "Estructuras de Datos en C++",
    description: "Implementaciones eficientes de las estructuras de datos más comunes para competencias de programación.",
    type: "repository",
    icon: <Code className="h-5 w-5" />,
    link: "https://github.com/cpfiuna/datastructures-cpp",
    tags: ["C++", "Estructuras de Datos", "Algoritmos"],
    author: "Club de Programación FIUNA",
    date: "03/11/2023"
  },
  {
    id: "algorithms-guide",
    title: "Guía de Algoritmos",
    description: "Explicación detallada de algoritmos comunes con implementaciones en Python y C++, ejemplos y complejidad.",
    type: "pdf",
    icon: <Book className="h-5 w-5" />,
    link: "/resources/materials/algoritmos-guia.pdf",
    tags: ["Algoritmos", "Python", "C++"],
    author: "Dr. Juan Pérez",
    date: "22/09/2023",
    size: "12MB"
  },
  {
    id: "react-intro",
    title: "Introducción a React",
    description: "Tutorial en video sobre los conceptos básicos de React: componentes, estado, props y hooks.",
    type: "video",
    icon: <Video className="h-5 w-5" />,
    link: "https://www.youtube.com/watch?v=example",
    tags: ["React", "JavaScript", "Frontend"],
    author: "Ing. Carlos Gómez",
    date: "14/03/2024"
  },
  {
    id: "programming-problems",
    title: "Problemas de Programación",
    description: "Colección de problemas clasificados por dificultad y tema, con pistas y soluciones explicadas.",
    type: "pdf",
    icon: <FileText className="h-5 w-5" />,
    link: "/resources/materials/problemas-programacion.pdf",
    tags: ["Problemas", "Algoritmos", "Competitivo"],
    author: "Equipo ICPC FIUNA",
    date: "08/01/2024",
    size: "7MB"
  },
  {
    id: "python-ml",
    title: "Python para Machine Learning",
    description: "Guía práctica sobre librerías y metodologías para implementar modelos de ML en Python.",
    type: "guide",
    icon: <Book className="h-5 w-5" />,
    link: "/resources/materials/python-ml-guide.pdf",
    tags: ["Python", "Machine Learning", "Data Science"],
    author: "Dra. Laura Martínez",
    date: "25/04/2024",
    size: "9MB"
  }
];

// Helper to get all unique tags
const allTags = Array.from(new Set(resources.flatMap(resource => resource.tags)));

const ClubResourcesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => resource.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "code":
        return <Code className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "repository":
        return <Code className="h-5 w-5" />;
      case "guide":
        return <Book className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  // Get the correct button based on the resource type
  const getActionButton = (resource: Resource) => {
    switch (resource.type) {
      case "repository":
        return (
          <a 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 flex items-center justify-center"
          >
            <Button variant="outline" className="w-full">
              Ver en GitHub <GithubIcon size={16} className="ml-2" />
            </Button>
          </a>
        );
      case "video":
        return (
          <a 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 flex items-center justify-center"
          >
            <Button variant="outline" className="w-full">
              Ver Video <ExternalLink size={16} className="ml-2" />
            </Button>
          </a>
        );
      default:
        return (
          <a 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 flex items-center justify-center"
          >
            <Button variant="outline" className="w-full">
              Descargar {resource.size && `(${resource.size})`} <Download size={16} className="ml-2" />
            </Button>
          </a>
        );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Recursos del &lt;/cpf&gt;</h2>
        <p className="text-[#94a3b8] mb-8">
          Materiales educativos desarrollados por el Club de Programación FIUNA, incluyendo presentaciones, 
          guías de referencia y recursos para prácticas.
        </p>
      </div>
      
      {/* Search and filter section */}
      <div className="glass-card p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedTags([]);
            }}
            className={`${
              searchTerm || selectedTags.length > 0 ? "opacity-100" : "opacity-50"
            }`}
          >
            Limpiar filtros
          </Button>
        </div>
        
        <div>
          <p className="text-sm text-[#94a3b8] mb-2">Filtrar por etiqueta:</p>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="glass-card overflow-hidden h-full flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="rounded-full bg-primary/10 p-2 mr-3">
                  {getResourceIcon(resource.type)}
                </div>
                <Badge variant="outline" className="capitalize">
                  {resource.type === "repository" ? "Código" : 
                   resource.type === "guide" ? "Guía" : 
                   resource.type}
                </Badge>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
              <p className="text-[#94a3b8] mb-4 flex-grow">
                {resource.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm text-[#94a3b8]">
                  <span>Por: {resource.author}</span>
                  <span>{resource.date}</span>
                </div>
                
                {getActionButton(resource)}
              </div>
            </div>
          </Card>
        ))}
        
        {filteredResources.length === 0 && (
          <div className="col-span-full text-center p-8">
            <p className="text-xl text-[#94a3b8]">No se encontraron recursos con los filtros seleccionados.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedTags([]);
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubResourcesSection;
