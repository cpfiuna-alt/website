
import React, { useState } from "react";
import { Download, FileText, Search } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  downloadUrl: string;
  fileSize: string;
  format: string;
  tags: string[];
}

const sampleCustomResources: Resource[] = [
  {
    id: "1",
    title: "Introducción a Algoritmos y Estructuras de Datos",
    description: "Curso completo sobre los fundamentos de algoritmos y estructuras de datos",
    type: "Curso",
    author: "Prof. María López",
    date: "2023-10-15",
    downloadUrl: "#",
    fileSize: "45MB",
    format: "PDF",
    tags: ["Algoritmos", "Estructuras de Datos", "Python"]
  },
  {
    id: "2",
    title: "Desarrollo Web con React - Material de Taller",
    description: "Presentación y código de ejemplo del taller de React realizado en FIUNA",
    type: "Presentación",
    author: "Juan Pérez",
    date: "2024-02-20",
    downloadUrl: "#",
    fileSize: "12MB",
    format: "ZIP",
    tags: ["React", "JavaScript", "Frontend"]
  },
  {
    id: "3",
    title: "Herramientas para Machine Learning en Python",
    description: "Guía práctica sobre las principales bibliotecas y herramientas para ML",
    type: "Material de Referencia",
    author: "Carlos Gómez",
    date: "2023-11-30",
    downloadUrl: "#",
    fileSize: "28MB",
    format: "PDF",
    tags: ["Machine Learning", "Python", "Data Science"]
  },
  {
    id: "4",
    title: "Competencia ACM-ICPC - Problemas Resueltos",
    description: "Compilación de problemas y soluciones de competencias anteriores",
    type: "Material de Práctica",
    author: "Equipo </cpf>",
    date: "2024-01-10",
    downloadUrl: "#",
    fileSize: "8MB",
    format: "PDF",
    tags: ["Competitive Programming", "Algoritmos", "C++"]
  }
];

const availableTags = Array.from(
  new Set(sampleCustomResources.flatMap(resource => resource.tags))
);

const resourceTypes = ["Curso", "Presentación", "Material de Referencia", "Material de Práctica", "Software", "Otros"];

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <div className="glass-card p-6 hover:shadow-neon-blue transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {resource.type}
          </span>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <FileText className="h-3 w-3 mr-1" />
          {resource.format}
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {resource.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 bg-muted/30 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div>Por: {resource.author}</div>
        <div>{new Date(resource.date).toLocaleDateString('es-ES')}</div>
      </div>
      
      <a 
        href={resource.downloadUrl} 
        className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Descargar ({resource.fileSize})</span>
      </a>
    </div>
  );
};

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedTags: string[];
  handleTagToggle: (tag: string) => void;
}

const FilterBar = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedType, 
  setSelectedType,
  selectedTags,
  handleTagToggle
}: FilterBarProps) => {
  return (
    <div className="glass-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/4">
          <select
            value={selectedType || ""}
            onChange={(e) => setSelectedType(e.target.value || null)}
            className="w-full px-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Todos los tipos</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Etiquetas:</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              } transition-colors`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ClubResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const filteredResources = sampleCustomResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => resource.tags.includes(tag));
    
    const matchesType = 
      selectedType === null || 
      resource.type === selectedType;
    
    return matchesSearch && matchesTags && matchesType;
  });

  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center">
            Recursos de <span className="gradient-text">{'</cpf>'}</span>
          </h2>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            Una colección de recursos desarrollados por nuestro club para apoyar tu aprendizaje
          </p>
        </div>
        
        <FilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedTags={selectedTags}
          handleTagToggle={handleTagToggle}
        />
        
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-2">No se encontraron recursos</p>
            <p className="text-muted-foreground">Intenta cambiar tus filtros de búsqueda</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClubResources;
