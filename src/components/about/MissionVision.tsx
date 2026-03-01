
import React from "react";

const MissionVision = () => {
  return (
    <section className="py-16 px-6 bg-muted/50 dark:bg-black/40">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="glass-card-static p-8">
            <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
            <p className="text-muted-foreground">
              Fomentar la cultura de programación y desarrollo de software en la comunidad 
              universitaria, brindando un espacio de aprendizaje, colaboración y crecimiento 
              para todos los interesados en la tecnología.
            </p>
          </div>
          
          <div className="glass-card-static p-8">
            <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
            <p className="text-muted-foreground">
              Ser reconocidos como un referente en innovación tecnológica y formación de 
              profesionales de excelencia, contribuyendo al desarrollo tecnológico del país 
              mediante la creación de soluciones de impacto social positivo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
