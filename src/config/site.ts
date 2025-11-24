
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
  url: "https://cpfiuna.io",
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
    github: "https://github.com/cpfiuna",
    discord: "https://discord.gg/UtRpKw2ay4", 
    twitter: "https://twitter.com/cpfiuna", // Updated to lowercase
    instagram: "https://instagram.com/cpfiuna",
    youtube: "https://youtube.com/@cpfiuna",
  },
};

// Navigation links
export const navLinks = [
  { name: "Inicio", to: "/" },
  { name: "Sobre Nosotros", to: "/nosotros" },
  { name: "Eventos", to: "/eventos" },
  { name: "Logros", to: "/logros" },
  { name: "Proyectos", to: "/proyectos" },
  { name: "Recursos", to: "/recursos" },
  { name: "Comunidad", to: "/comunidad" },
  { name: "Blog", to: "/blog" },
  { name: "Contacto", to: "/contacto" },
];

// Feature flags - Control what features are enabled/disabled
export const featureFlags = {
  admissionForm: {
    enabled: true, // Set to false to completely disable admission form and route
    showInNavigation: false, // Set to true to show "Admisión" link in main navigation
    showInFooter: false, // Set to true to show "Admisión" link in footer
  },
  // To enable admission form visibility:
  // 1. Set enabled: true (allows access to /admision route)
  // 2. Set showInNavigation: true (shows link in header navigation)
  // 3. Set showInFooter: true (shows link in footer)
  // 
  // To disable completely:
  // 1. Set enabled: false (disables route and all visibility)
};

// Generate dynamic navigation links based on feature flags
const getFooterMainLinks = () => {
  const baseLinks = navLinks;
  if (featureFlags.admissionForm.enabled && featureFlags.admissionForm.showInFooter) {
    // Insert admission link before the last item (usually contact)
    return [...baseLinks.slice(0, -1), { name: "Admisión", to: "/admision" }, baseLinks[baseLinks.length - 1]];
  }
  return baseLinks;
};

// Footer links
export const footerLinks = {
  main: getFooterMainLinks(),
  legal: [
    { name: "Privacidad", to: "/privacidad" },
    { name: "Código de Conducta", to: "/codigo-de-conducta" },
    { name: "Transparencia", to: "/transparencia" },
    { name: "Estatuto", to: "/estatuto" },
    { name: "Reglamento", to: "/reglamento" }
  ],
  resources: [
    { name: "Kit de Medios", to: "/kit-de-medios" },
    { name: "Prensa", to: "/prensa" },
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
