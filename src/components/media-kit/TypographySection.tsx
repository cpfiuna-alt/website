import React from "react";
import { Download } from "lucide-react";

const TypographySection = () => {
  return (
    <div className="glass-card-static p-8 mb-16">
      <h3 className="text-xl font-semibold mb-4">Tipografía</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Typography */}
        <div>
          <h4 className="text-lg mb-3">Titulares (Principal)</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-4xl font-montserrat-bold" style={{ fontFamily: "Montserrat, sans-serif" }}>Montserrat</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Montserrat se utiliza en nuestra marca institucional y materiales oficiales. La versión negrita 
            se reserva para títulos destacados y la semi-negrita para elementos secundarios.
          </p>
        </div>
        <div>
          <h4 className="text-lg mb-3">Cuerpo de texto (Principal)</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-lg font-montserrat" style={{ fontFamily: "Montserrat, sans-serif" }}>Montserrat</p>
          </div>
          <p className="text-sm text-muted-foreground">
            En documentos oficiales y presentaciones institucionales, utilizamos Montserrat en peso regular 
            para garantizar consistencia y profesionalismo en nuestra comunicación.
          </p>
        </div>

        {/* Existing Inter Headings section */}
        <div>
          <h4 className="text-lg mb-3">Titulares (Web)</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-4xl font-bold">Inter</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Inter es nuestra fuente principal para titulares web. Se debe utilizar en negrita para los
            encabezados principales y semi-negrita para subtítulos.
          </p>
        </div>

        {/* Existing Inter Body section */}
        <div>
          <h4 className="text-lg mb-3">Cuerpo de texto (Web)</h4>
          <div className="p-4 bg-muted/20 rounded-lg mb-4">
            <p className="text-lg">Inter</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Para el texto de los párrafos y la interfaz de usuario de la web, utilizamos Inter en peso regular
            o medio para mayor legibilidad.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <a 
          href="/media-kit/fonts.zip" 
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-muted/30 hover:bg-muted/50 rounded-full text-base font-medium transition-all hover:scale-105"
        >
          <Download className="h-5 w-5" />
          <span>Descargar fuentes</span>
        </a>
      </div>
    </div>
  );
};

export default TypographySection;
