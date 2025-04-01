
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DocHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const DocHero: React.FC<DocHeroProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h1 className="text-4xl font-bold mb-4">Documentación CPF</h1>
      
      <p className="text-xl text-muted-foreground mb-8">
        Encuentra guías, tutoriales y referencias para todos los proyectos y herramientas 
        desarrollados por el Club de Programación FIUNA.
      </p>
      
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar en la documentación..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
      </div>
    </div>
  );
};

export default DocHero;
