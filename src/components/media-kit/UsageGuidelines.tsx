import React from "react";
import { Link2 } from "lucide-react";
import { contactInfo } from "@/config/site";

const UsageGuidelines = () => {
  return (
    <section className="py-16 px-6 bg-muted/50 dark:bg-black/60">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Directrices de uso</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Para mantener la consistencia de nuestra marca, seguí estas directrices
            al utilizar nuestros recursos visuales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card-static p-6">
            <h3 className="text-lg font-semibold mb-3">Lo que debés hacer</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                <span>Mantener el espacio libre alrededor del logo</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                <span>Usar los colores oficiales de la marca</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                <span>Utilizar las versiones de alta resolución del logo</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                <span>Respetar las proporciones originales</span>
              </li>
            </ul>
          </div>

          <div className="glass-card-static p-6">
            <h3 className="text-lg font-semibold mb-3">Lo que no debés hacer</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                <span>Distorsionar, estirar o comprimir el logo</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                <span>Cambiar los colores del logo</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                <span>Aplicar efectos o sombras no autorizados</span>
              </li>
              <li className="flex items-start">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                <span>Usar el logo en un fondo que reduzca su visibilidad</span>
              </li>
            </ul>
          </div>

          <div className="glass-card-static p-6">
            <h3 className="text-lg font-semibold mb-3">Requisitos de atribución</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cuando utilices nuestros recursos en cualquier material, incluí la siguiente atribución:
            </p>
            <div className="p-3 bg-muted/20 rounded-lg text-sm mb-4">
              <p className="font-mono">© {new Date().getFullYear()} Club de Programación FIUNA. Todos los derechos reservados.</p>
            </div>
            {/*<p className="text-sm text-muted-foreground">
              Para uso comercial o preguntas específicas, contactá con:
            </p>
            <a href="mailto:clubdeprogramacion@ing.una.py" className="hover:underline text-primary">
              clubdeprogramacion@ing.una.py
            </a>*/}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">¿Necesitás ayuda?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Si tenés preguntas sobre el uso de nuestros recursos o necesitás formatos adicionales,
            no dudes en contactarnos.
          </p>
          <a 
            href="/contacto" 
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all hover:shadow-neon-blue hover:scale-105"
          >
            <span>Contactar al equipo</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default UsageGuidelines;
