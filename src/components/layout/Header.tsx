
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navigation = [
  { name: "Inicio", to: "/" },
  { name: "Sobre Nosotros", to: "/about" },
  { name: "Eventos", to: "/events" },
  { name: "Logros", to: "/logros" },
  { name: "Proyectos", to: "/projects" },
  { name: "Recursos", to: "/resources" },
  { name: "Blog", to: "/blog" },
  { name: "Contacto", to: "/contact" },
];

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
      ${scrolled ? "py-3 backdrop-blur-lg bg-background/80" : "py-5 bg-transparent"}`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300
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
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center">
          <NavLink 
            to="/docs"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md text-sm font-medium mr-2 transition-all duration-300 flex items-center
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
                Docs
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
          
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground p-2 ml-4"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Now with a permanent background */}
        <div
          className={`md:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
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
                    to="/docs"
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
