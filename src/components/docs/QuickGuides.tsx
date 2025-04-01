
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, Code, Cpu, Settings } from 'lucide-react';

const QuickGuides: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link
        to="/docs/introduccion"
        className="group bg-card hover:bg-muted/10 rounded-lg p-6 transition-colors"
      >
        <Book className="h-6 w-6 text-primary mb-3" />
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          Introducción al Club
        </h3>
        <p className="text-muted-foreground mb-3">
          Conoce qué es el Club de Programación FIUNA y cómo participar en nuestras actividades.
        </p>
        <div className="text-primary flex items-center text-sm font-medium">
          Leer guía
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
      
      <Link
        to="/docs/instalacion"
        className="group bg-card hover:bg-muted/10 rounded-lg p-6 transition-colors"
      >
        <Settings className="h-6 w-6 text-primary mb-3" />
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          Guía de instalación
        </h3>
        <p className="text-muted-foreground mb-3">
          Configura tu entorno para trabajar en los proyectos del Club paso a paso.
        </p>
        <div className="text-primary flex items-center text-sm font-medium">
          Leer guía
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
      
      <Link
        to="/docs/programacion-competitiva"
        className="group bg-card hover:bg-muted/10 rounded-lg p-6 transition-colors"
      >
        <Cpu className="h-6 w-6 text-primary mb-3" />
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          Programación Competitiva
        </h3>
        <p className="text-muted-foreground mb-3">
          Aprende todo sobre programación competitiva y cómo participar en torneos.
        </p>
        <div className="text-primary flex items-center text-sm font-medium">
          Leer guía
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
      
      <Link
        to="/docs/api-discord-bot"
        className="group bg-card hover:bg-muted/10 rounded-lg p-6 transition-colors"
      >
        <Code className="h-6 w-6 text-primary mb-3" />
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          API del Bot de Discord
        </h3>
        <p className="text-muted-foreground mb-3">
          Documentación técnica para interactuar con nuestro bot de Discord.
        </p>
        <div className="text-primary flex items-center text-sm font-medium">
          Leer guía
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
};

export default QuickGuides;
