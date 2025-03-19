
import { Link } from "react-router-dom";
import { Github, Mail, Instagram, Youtube, FileEdit, BugIcon } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { contactInfo, footerLinks } from "@/config/site";

const DiscordLogo = ({ className, size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" />
  </svg>
);

const Twitter = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M14.258 10.152L20 4h-2L12.742 9.848 8.658 4H4l6.142 8.67L4 20h2l5.588-6.128L15.342 20H20l-6.446-9.152zM6.284 6h1.969l9.418 12h-1.969L6.284 6z" />
  </svg>
);
const Footer = () => {
  const socials = [
    {
      name: "GitHub",
      href: contactInfo.socials.github,
      icon: Github,
    },
    {
      name: "Discord",
      href: contactInfo.socials.discord,
      icon: DiscordLogo,
    },
    {
      name: "X",
      href: contactInfo.socials.twitter,
      icon: Twitter,
    },
    {
      name: "Instagram",
      href: contactInfo.socials.instagram,
      icon: Instagram,
    },
    {
      name: "YouTube",
      href: contactInfo.socials.youtube,
      icon: Youtube,
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
    } else if (path === "/about") {
      pageName = "About";
    } else if (path === "/events") {
      pageName = "Events";
    } else if (path === "/projects") {
      pageName = "Projects";
    } else if (path === "/resources") {
      pageName = "Resources";
    } else if (path === "/blog") {
      pageName = "Blog";
    } else if (path === "/contact") {
      pageName = "Contact";
    } else if (path === "/privacy") {
      pageName = "Privacy";
    } else if (path === "/code-of-conduct") {
      pageName = "CodeOfConduct";
    } else if (path === "/media-kit") {
      pageName = "MediaKit";
    } else if (path === "/press") {
      pageName = "Press";
    } else if (path === "/transparency") {
      pageName = "Transparency";
    } else if (path === "/community") {
      pageName = "Community";
    } else if (path === "/estatuto") {
      pageName = "Estatuto";
    } else if (path.startsWith("/docs")) {
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
              El Club de Programación es una comunidad de estudiantes y profesionales
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
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
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
