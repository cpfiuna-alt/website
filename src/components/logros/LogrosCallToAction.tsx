
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LogrosCallToAction = () => {
  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Unite a nuestro legado de éxitos</h2>
          <p className="text-muted-foreground mb-8">
            Sé parte de nuestro club y contribuí a seguir construyendo una historia de logros y reconocimientos en el mundo de la programación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue"
            >
              Contáctanos
            </Link>
            <Link
              to="/eventos"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-primary bg-transparent text-primary font-medium transition-all hover:scale-105 hover:bg-primary/10 hover:shadow-neon-blue group"
            >
              Ver eventos próximos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogrosCallToAction;
