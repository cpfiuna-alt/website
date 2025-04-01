
/**
 * SITE CONFIGURATION
 * This file contains all the configuration for the site.
 * Update these values to customize your site.
 */

// Site metadata
export const siteConfig = {
  name: "Club de Programación FIUNA",
  shortName: "CPF",
  description: "Club de Programación de la Facultad de Ingeniería de la Universidad Nacional de Asunción",
  url: "https://cpf.com.py", // TODO: Replace with actual URL
  ogImage: "/og-image.png",
  themeColor: "#0070f3",
  backgroundColor: "#1A1A1A",
};

// Contact information
export const contactInfo = {
  email: "clubdeprogramacion@ing.una.py",
  location: {
    name: "Universidad Nacional de Asunción",
    address: "Facultad de Ingeniería\nCampus Universitario\nSan Lorenzo - Paraguay",
  },
  socials: {
    github: "https://github.com/cpfiuna", // TODO: Replace with actual URL
    discord: "https://discord.gg/b3GeJtUN", 
    twitter: "https://twitter.com/cpfiuna", // Updated to lowercase
    instagram: "https://instagram.com/cpfiuna", // TODO: Replace with actual URL
    youtube: "https://youtube.com/cpfiuna", // TODO: Replace with actual URL
  },
};

// Navigation links
export const navLinks = [
  { name: "Inicio", to: "/" },
  { name: "Sobre Nosotros", to: "/about" },
  { name: "Eventos", to: "/events" },
  { name: "Logros", to: "/logros" },
  { name: "Proyectos", to: "/projects" },
  { name: "Recursos", to: "/resources" },
  { name: "Comunidad", to: "/community" },
  { name: "Blog", to: "/blog" },
  { name: "Contacto", to: "/contact" },
];

// Footer links
export const footerLinks = {
  main: navLinks,
  legal: [
    { name: "Privacidad", to: "/privacy" },
    { name: "Código de Conducta", to: "/code-of-conduct" },
    { name: "Transparencia", to: "/transparency" },
    { name: "Estatuto", to: "/estatuto" }
  ],
  resources: [
    { name: "Kit de Medios", to: "/media-kit" },
    { name: "Prensa", to: "/press" },
  ],
  github: [
    {
      name: "Reportar Errores",
      href: "https://github.com/cpfiuna/website/issues/new",
    },
    {
      name: "Editar esta página",
      href: "https://github.com/cpfiuna/website/edit/main/src/pages/", // Will be completed dynamically
    },
  ],
};
