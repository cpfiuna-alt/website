import React from "react";
import { BookOpen } from "lucide-react";

const ColorsSection = () => {
  const handleDownloadColors = () => {
    const url = 'https://drive.google.com/drive/folders/1_eKFF2tV-T34PwM6tomJHAWfVSmgXm59?usp=sharing';
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="glass-card-static p-8 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">Colores</h3>
      
      <div className="mb-6">
        <p className="text-muted-foreground mb-6">Paleta de colores oficial del Club de Programación FIUNA</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#0070F3" }}></div>
            <div className="text-sm">
              <p className="font-medium">Primario</p>
              <p className="text-muted-foreground">HEX: #0070F3</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#1A2333" }}></div>
            <div className="text-sm">
              <p className="font-medium">Secundario</p>
              <p className="text-muted-foreground">HEX: #1A2333</p>
            </div>
          </div>
         {/* <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#070A13" }}></div>
            <div className="text-sm">
              <p className="font-medium">Oscuro</p>
              <p className="text-muted-foreground">HEX: #070A13</p>
            </div>
          </div>
           <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#2c529f" }}></div>
            <div className="text-sm">
              <p className="font-medium">Azul &lt;/cpf&gt;</p>
              <p className="text-muted-foreground">HEX: #333333</p>
            </div>
          </div> */}
          <div className="flex flex-col">
            <div className="h-24 rounded-lg border border-gray-200 mb-2" style={{ backgroundColor: "#FAFAFA" }}></div>
            <div className="text-sm">
              <p className="font-medium">Títulos</p>
              <p className="text-muted-foreground">HEX: #FAFAFA</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#94A3B8" }}></div>
            <div className="text-sm">
              <p className="font-medium">Textos</p>
              <p className="text-muted-foreground">HEX: #94A3B8</p>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleDownloadColors}
        className="mt-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm transition-all hover:shadow-neon-blue hover:scale-105"
      >
        <BookOpen className="h-4 w-4" />
        <span>Descargar manual de marca</span>
      </button>
    </div>
  );
};

export default ColorsSection;
