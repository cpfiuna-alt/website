
import React from "react";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kit de <span className="gradient-text">Medios</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Recursos oficiales del Club de Programación FIUNA para diseñadores, patrocinadores y colaboradores.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
