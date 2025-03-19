
import React from "react";
import { PaintBucket } from "lucide-react";

const ColorsSection = () => {
  return (
    <div className="glass-card p-8 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">Colores</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Tema Oscuro</h4>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <div className="h-24 bg-primary rounded-lg mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Primario</p>
              <p className="text-muted-foreground">HEX: #0070f3</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 bg-secondary rounded-lg mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Secundario</p>
              <p className="text-muted-foreground">HEX: #7E69AB</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 bg-background rounded-lg border mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Fondo</p>
              <p className="text-muted-foreground">HEX: #1A1A1A</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 bg-muted rounded-lg mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Muted</p>
              <p className="text-muted-foreground">HEX: #333333</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-3">Tema Claro</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <div className="h-24 bg-white rounded-lg border border-gray-200 mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Primario</p>
              <p className="text-muted-foreground">HEX: #0070f3</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 rounded-lg mb-2" style={{ backgroundColor: "#7E69AB" }}></div>
            <div className="text-sm">
              <p className="font-medium">Secundario</p>
              <p className="text-muted-foreground">HEX: #7E69AB</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 bg-white rounded-lg border border-gray-200 mb-2"></div>
            <div className="text-sm">
              <p className="font-medium">Fondo</p>
              <p className="text-muted-foreground">HEX: #FFFFFF</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-24 rounded-lg border border-gray-200 mb-2" style={{ backgroundColor: "#F5F5F5" }}></div>
            <div className="text-sm">
              <p className="font-medium">Muted</p>
              <p className="text-muted-foreground">HEX: #F5F5F5</p>
            </div>
          </div>
        </div>
      </div>
      
      <a 
        href="/media-kit/colors.pdf" 
        className="mt-auto flex items-center justify-center gap-2 px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
      >
        <PaintBucket className="h-4 w-4" />
        <span>Descargar paleta de colores</span>
      </a>
    </div>
  );
};

export default ColorsSection;
