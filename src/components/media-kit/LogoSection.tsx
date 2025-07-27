import React from "react";
import { FileCode, FileImage } from "lucide-react";

const LogoSection = () => {
  return (
    <div className="glass-card-static p-8 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">Logo</h3>
      <div className="bg-muted/20 flex-grow rounded-lg p-8 flex items-center justify-center mb-6">
        <img 
          src="cpf-logo.png" 
          alt="Logo del Club de Programación FIUNA"
          className="max-w-full max-h-48"
        />
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Nuestro logo puede utilizarse sobre fondos claros u oscuros. Mantenga siempre un área
        de protección alrededor del logo.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <a 
          href="/media-kit/logo/svg" 
          className="flex items-center gap-2 px-8 py-3 bg-muted/30 hover:bg-muted/50 rounded-full text-sm transition-all hover:scale-105"
        >
          <FileCode className="h-4 w-4" />
          <span>SVG</span>
        </a>
        <a 
          href="/media-kit/logo/png" 
          className="flex items-center gap-2 px-8 py-3 bg-muted/30 hover:bg-muted/50 rounded-full text-sm transition-all hover:scale-105"
        >
          <FileImage className="h-4 w-4" />
          <span>PNG</span>
        </a>
        <a 
          href="/media-kit/logo/pdf" 
          className="flex items-center gap-2 px-8 py-3 bg-muted/30 hover:bg-muted/50 rounded-full text-sm transition-all hover:scale-105"
        >
          <FileImage className="h-4 w-4" />
          <span>PDF</span>
        </a>
      </div>
    </div>
  );
};

export default LogoSection;
