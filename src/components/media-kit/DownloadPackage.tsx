import React from "react";
import { Package } from "lucide-react";
import { downloadCompleteMediaKit } from "@/utils/downloadHelpers";

const DownloadPackage = () => {
  const handleDownload = () => {
    window.open('https://drive.google.com/drive/folders/YOUR_FOLDER_ID', '_blank');
  };

  return (
    <div className="text-center mb-16">
      <h3 className="text-2xl font-semibold mb-4">Paquete completo</h3>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Descarga todos los recursos del Kit de Medios en un solo archivo, incluyendo logos,
        guía de marca, paleta de colores y tipografía.
      </p>
      <button 
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all hover:shadow-neon-blue hover:scale-105"
      >
        <Package className="h-5 w-5" />
        <span>Descargar paquete completo</span>
      </button>
    </div>
  );
};

export default DownloadPackage;
