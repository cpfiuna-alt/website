import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Instagram, Twitter, Mail, MessageSquare, AlertTriangle, Edit2, Youtube, FileCode, FileImage } from "lucide-react";

const Footer: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentYear = 2025;

  return (
    <footer className="bg-secondary/50 dark:bg-gray-900/50 pt-16 pb-8">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1 flex flex-col items-center md:items-start">
            <Link to="/humans.txt" className="font-bold text-2xl mb-4 inline-block">
              <img src="/cpf-logo.png" alt="CPF FIUNA Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-[#94a3b8] dark:text-[#94a3b8] mb-4 max-w-md text-sm">
              El Club de Programación FIUNA es una organización estudiantil
              dedicada a promover la cultura de programación y tecnología dentro
              de la Facultad de Ingeniería UNA.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/cpfiuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/cpfiuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/cpfiuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/cpfiuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="mailto:clubdeprogramacion@ing.una.py"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/cpfiuna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-base mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/proyectos" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-base mb-4">Recursos</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/recursos" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Kit de Medios
                </Link>
              </li>
              <li>
                <Link to="/prensa" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Prensa
                </Link>
              </li>
              <li>
                <Link to="/documentacion" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Documentación
                </Link>
              </li>
              <li>
                <Link to="/comunidad" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Comunidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-base mb-4">Legal</h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <Link to="/privacidad" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/codigo-de-conducta" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Código de Conducta
                </Link>
              </li>
              <li>
                <Link to="/estatuto" className="text-[#94a3b8] dark:text-[#94a3b8] hover:text-primary dark:hover:text-primary transition-colors text-sm">
                  Estatuto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-[#94a3b8] dark:text-[#94a3b8] text-xs">
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
              <Link to="/contacto" className="hover:text-primary transition-colors text-xs flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Reportar Errores
              </Link>
              <Link to={`https://github.com/cpfiuna/website/edit/main${currentPath}.tsx`} className="hover:text-primary transition-colors text-xs flex items-center">
                <Edit2 className="h-4 w-4 mr-2" />
                Editar esta página
              </Link>
            </div>
            
            <Link to="/humans.txt" className="text-xs text-center md:text-left">
              &copy; {currentYear} Club de Programación FIUNA. Todos los derechos reservados.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LogoSection = () => {
  return (
    <div className="glass-card p-8 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-4">Logo</h3>
      <div className="bg-muted/20 flex-grow rounded-lg p-8 flex items-center justify-center mb-6">
        <img 
          src="/cpf-logo.png" 
          alt="Logo del Club de Programación FIUNA"
          className="max-w-full max-h-48"
        />
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Nuestro logo puede utilizarse sobre fondos claros u oscuros. Mantenga siempre un área
        de protección alrededor del logo.
      </p>
      <div className="flex flex-wrap gap-3">
        <a 
          href="/media-kit/logo/svg" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileCode className="h-4 w-4" />
          <span>SVG</span>
        </a>
        <a 
          href="/media-kit/logo/png" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileImage className="h-4 w-4" />
          <span>PNG</span>
        </a>
        <a 
          href="/media-kit/logo/pdf" 
          className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
        >
          <FileImage className="h-4 w-4" />
          <span>PDF</span>
        </a>
      </div>
    </div>
  );
};

export default Footer;
export { LogoSection };
