
import React from "react";
import Values from "@/components/Values";

const ValuesSection = () => {
  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Nuestros <span className="gradient-text">Valores</span>
        </h2>
        
        <Values />
      </div>
    </section>
  );
};

export default ValuesSection;
