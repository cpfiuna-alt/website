
import React from "react";
import { FileCode, FileImage } from "lucide-react";

const LogoSection = () => {
  return (
    <div className="glass-card p-8 flex flex-col h-full">
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
      <div className="flex flex-wrap gap-3">
        <a 
          href="/media-kit/logo/svg" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileCode className="h-4 w-4" />
          <span>SVG</span>
        </a>
        <a 
          href="/media-kit/logo/png" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileImage className="h-4 w-4" />
          <span>PNG</span>
        </a>
        <a 
          href="/media-kit/logo/pdf" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileImage className="h-4 w-4" />
          <span>PDF</span>
        </a>
      </div>
    </div>
  );
};

export default LogoSection;
