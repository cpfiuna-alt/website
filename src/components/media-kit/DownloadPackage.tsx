
import React from "react";
import { Package } from "lucide-react";

const DownloadPackage = () => {
  return (
    <div className="text-center mb-16">
      <h3 className="text-2xl font-semibold mb-4">Paquete completo</h3>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Descarga todos los recursos del Media Kit en un solo archivo, incluyendo logos,
        guía de marca, paleta de colores y tipografía.
      </p>
      <a 
        href="/media-kit/cpfiuna-media-kit.zip" 
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all hover:shadow-neon-blue"
      >
        <Package className="h-5 w-5" />
        <span>Descargar Media Kit completo</span>
      </a>
    </div>
  );
};

export default DownloadPackage;
