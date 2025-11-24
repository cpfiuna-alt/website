import React, { useState } from "react";
import { Download, FileText, Search, ExternalLink } from "lucide-react";
import clubResourcesService, { Resource } from "@/services/clubResourcesService";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const downloadInfo = clubResourcesService.getSafeDownloadUrl(resource);
  
  const handleDownload = () => {
    if (downloadInfo.isValid) {
      // Open external URLs in a new tab for security
      if (downloadInfo.isExternal) {
        window.open(downloadInfo.url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = downloadInfo.url;
      }
    } else {
      console.error('Invalid download URL:', downloadInfo.url);
      alert('Error: URL de descarga no válida');
    }
  };

  return (
    <div className="glass-card-static p-6">
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
      
      <button 
        onClick={handleDownload}
        disabled={!downloadInfo.isValid}
        className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg transition-colors ${
          downloadInfo.isValid
            ? 'bg-primary/10 hover:bg-primary/20 text-primary cursor-pointer'
            : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
        }`}
      >
        <Download className="h-4 w-4" />
        <span>Descargar ({resource.fileSize})</span>
        {downloadInfo.isExternal && <ExternalLink className="h-3 w-3" />}
      </button>
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
  const resourceTypes = clubResourcesService.getResourceTypes();
  const availableTags = clubResourcesService.getAllTags();

  return (
    <div className="glass-card-static p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              id="resources-search"
              name="search"
              placeholder="Buscar recursos..."
              aria-label="Buscar recursos del club"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="w-full lg:w-1/4">
          <select
            id="resources-type-filter"
            name="typeFilter"
            aria-label="Filtrar recursos por tipo"
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

  // Filter resources using the service
  const filteredResources = clubResourcesService.filterResources({
    searchTerm: searchTerm || undefined,
    type: selectedType || undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined
  });

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
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
