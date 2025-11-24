import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import { featureFlags } from "@/config/site";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Shorter nav labels to prevent wrapping
const baseNavigation = [
  { name: "Inicio", to: "/" },
  { name: "Nosotros", to: "/nosotros" },
  { name: "Eventos", to: "/eventos" },
  { name: "Logros", to: "/logros" },
  { name: "Proyectos", to: "/proyectos" },
  { name: "Recursos", to: "/recursos" },
  { name: "Blog", to: "/blog" },
  { name: "Contacto", to: "/contacto" },
];

// Generate dynamic navigation based on feature flags
const getNavigation = () => {
  if (featureFlags.admissionForm.enabled && featureFlags.admissionForm.showInNavigation) {
    // Insert admission link before the last item (usually contact)
    return [...baseNavigation.slice(0, -1), { name: "Admisión", to: "/admision" }, baseNavigation[baseNavigation.length - 1]];
  }
  return baseNavigation;
};

const navigation = getNavigation();

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
      ${scrolled 
          ? "py-3 bg-background shadow-sm" 
          : "py-8 bg-transparent"}`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between min-h-[3.5rem]">
        <div className="flex-shrink-0 z-10">
          <Logo />
        </div>

        {/* 
          Desktop Navigation - Custom breakpoint: 
          Hidden below 1220px to prevent wrapping to 2 lines
        */}
        <nav className="hidden xl:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex flex-wrap justify-center">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-2.5 sm:px-3.5 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap block
                    ${
                      isActive
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in-scale-x" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions - Improved for better spacing */}
        <div className="flex items-center z-10">
          <NavLink 
            to="/documentacion"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md text-sm font-medium mr-2 transition-all duration-300 hidden sm:flex items-center
              ${
                isActive
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <BookOpen className="h-4 w-4 mr-1" />
                <span className="whitespace-nowrap">Docs</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in-scale-x" />
                )}
              </>
            )}
          </NavLink>
          
          <ThemeToggle />

          {/* Mobile Menu Button - Now showing for xl breakpoint and below */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-foreground p-2 ml-2 sm:ml-4"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - With solid background */}
        <div
          className={`xl:hidden fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-center">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col justify-center flex-1">
              <ul className="space-y-6 text-center">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-2xl font-medium transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <NavLink
                    to="/documentacion"
                    className={({ isActive }) =>
                      `text-2xl font-medium transition-colors flex items-center justify-center ${
                        isActive
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Documentación
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="flex justify-center py-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
