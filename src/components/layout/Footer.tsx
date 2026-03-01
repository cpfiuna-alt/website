
import { Link } from "react-router-dom";
import { Mail, FileEdit, BugIcon } from "lucide-react";
import { FaGithub, FaDiscord, FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import Logo from "@/components/ui/Logo";
import { contactInfo, footerLinks } from "@/config/site";
const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      href: contactInfo.socials.github,
      icon: FaGithub,
    },
    {
      name: "Discord",
      href: contactInfo.socials.discord,
      icon: FaDiscord,
    },
    {
      name: "X",
      href: contactInfo.socials.twitter,
      icon: FaXTwitter,
    },
    {
      name: "Instagram",
      href: contactInfo.socials.instagram,
      icon: FaInstagram,
    },
    {
      name: "YouTube",
      href: contactInfo.socials.youtube,
      icon: FaYoutube,
    },
    {
      name: "LinkedIn",
      href: contactInfo.socials.linkedin,
      icon: FaLinkedin,
    },
    {
      name: "Email",
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
    },
  ];

  const getCurrentPageForGithub = () => {
    const path = window.location.pathname;
    let pageName = "Index";
    
    if (path === "/") {
      pageName = "Index";
    } else if (path === "/about" || path === "/nosotros") {
      pageName = "About";
    } else if (path === "/events" || path === "/eventos") {
      pageName = "Events";
    } else if (path === "/achievements" || path === "/logros") {
      pageName = "Logros";
    } else if (path === "/projects" || path === "/proyectos") {
      pageName = "Projects";
    } else if (path === "/resources" || path === "/recursos") {
      pageName = "Resources";
    } else if (path === "/blog") {
      pageName = "Blog";
    } else if (path === "/contact" || path === "/contacto") {
      pageName = "Contact";
    } else if (path === "/privacy" || path === "/privacidad") {
      pageName = "Privacy";
    } else if (path === "/code-of-conduct" || path === "/codigo-de-conducta") {
      pageName = "CodeOfConduct";
    } else if (path === "/media-kit" || path === "/kit-de-medios") {
      pageName = "MediaKit";
    } else if (path === "/press" || path === "/prensa") {
      pageName = "Press";
    } else if (path === "/transparency" || path === "/transparencia") {
      pageName = "Transparency";
    } else if (path === "/community" || path === "/comunidad") {
      pageName = "Community";
    } else if (path === "/estatuto" || path === "/statute") {
      pageName = "Estatuto";
    } else if (path === "/reglamento" || path === "/regulation") {
      pageName = "Reglamento";
    } else if (path.startsWith("/docs") || path.startsWith("/documentation") || path.startsWith("/documentacion")) {
      pageName = "Documentation";
    }
    
    return `https://github.com/cpfiuna/website/edit/main/src/pages/${pageName}.tsx`;
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="mx-auto lg:mx-0" />
            <p className="mt-4 text-sm text-muted-foreground text-center lg:text-left">
              Somos una comunidad de estudiantes y profesionales
              apasionados por la programación y la tecnología.
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              {socials.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.name}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-base font-semibold">Navegación</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Recursos</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                      to="/docs"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      Documentación
                    </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Legal</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={footerLinks.github[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <BugIcon className="h-3 w-3" />
              Reportar Errores
            </a>
            
            <a
              href={getCurrentPageForGithub()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <FileEdit className="h-3 w-3" />
              Editar esta página
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} 
            <a 
              href="/humans.txt" 
              target="_blank" 
              className="hover:text-primary transition-colors ml-1"
              rel="noopener noreferrer"
            >
              Club de Programación FIUNA
            </a>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
