
import React from "react";
import { ChevronRight, Code2, Terminal, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden hero-glow">
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Club de Programación FIUNA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Construyendo el futuro con <span className="text-gradient">código</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Somos una comunidad de estudiantes apasionados por la tecnología y
            la programación en la Facultad de Ingeniería UNA.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contacto"
              className="btn-glow inline-flex items-center bg-primary text-white font-medium py-3 px-6 rounded-lg transition-all"
            >
              Únete al club
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/proyectos"
              className="inline-flex items-center bg-secondary text-secondary-foreground font-medium py-3 px-6 rounded-lg transition-all hover:bg-secondary/80"
            >
              Ver proyectos
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-6 animate-float">
            <div className="flex items-center mb-2">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Code2 className="h-4 w-4 mr-2" />
                <span>main.py</span>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 overflow-hidden text-gray-300 font-mono text-sm">
              <pre className="flex items-start">
                <span className="text-gray-500 mr-4 select-none">
                  {"1\n2\n3\n4\n5"}
                </span>
                <code>
                  <span className="text-blue-400">def</span>{" "}
                  <span className="text-green-400">hello_cpf</span>():
                  <br />
                  <span className="pl-4">
                    <span className="text-blue-400">print</span>(
                    <span className="text-yellow-300">
                      "¡Bienvenido al Club de Programación FIUNA!"
                    </span>
                    )
                  </span>
                  <br />
                  <br />
                  <span className="text-purple-400">if</span>{" "}
                  <span className="text-blue-300">__name__</span>{" "}
                  <span className="text-purple-400">==</span>{" "}
                  <span className="text-yellow-300">"__main__"</span>:
                  <br />
                  <span className="pl-4">
                    <span className="text-green-400">hello_cpf</span>()
                  </span>
                </code>
              </pre>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Terminal className="h-4 w-4 mr-2" />
              <span>¡Bienvenido al Club de Programación FIUNA!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
