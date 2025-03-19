
import React from "react";
import { Download } from "lucide-react";

const TypographySection = () => {
  return (
    <div className="glass-card p-8 mb-16">
      <h3 className="text-xl font-semibold mb-4">Tipografía</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg mb-3">Titulares</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-4xl font-bold">Inter</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Inter es nuestra fuente principal para titulares. Se debe utilizar en negrita para los
            encabezados principales y semi-negrita para subtítulos.
          </p>
        </div>
        <div>
          <h4 className="text-lg mb-3">Cuerpo de texto</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-lg">Inter</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Para el texto de los párrafos y la interfaz de usuario, utilizamos Inter en peso regular
            o medio para mayor legibilidad.
          </p>
        </div>
      </div>
      <a 
        href="/media-kit/fonts.zip" 
        className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm w-fit mx-auto transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Descargar fuentes</span>
      </a>
    </div>
  );
};

export default TypographySection;
