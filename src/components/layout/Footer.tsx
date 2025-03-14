
import { Link } from "react-router-dom";
import { Github, Twitter, Mail, ArrowUpRight, Instagram, Youtube, FileEdit, BugIcon } from "lucide-react";
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
    <path d="M9 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M15 11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    <path d="M5.5 9.5C5.5 15 8 17.5 12 17.5s6.5-2.5 6.5-8v-1c0-1.5-3-2.5-6.5-2.5S5.5 7 5.5 8.5z" />
    <path d="M7.5 20.5S9 19 12 19s4.5 1.5 4.5 1.5" />
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
              Club de Programación FIUNA es una comunidad de estudiantes y profesionales
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
                {footerLinks.main.slice(0, 4).map((item) => (
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
                {footerLinks.main.slice(4).map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
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
            &copy; {new Date().getFullYear()} Club de Programación FIUNA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
