
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevenir overflow-x y controlar el tamaño del viewport en dispositivos móviles
  useEffect(() => {
    // Función para asegurar que el viewport tenga el tamaño correcto
    const fixViewport = () => {
      // En algunos dispositivos móviles, 100vh puede ser problemático
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    fixViewport();
    window.addEventListener('resize', fixViewport);
    window.addEventListener('orientationchange', fixViewport);

    return () => {
      window.removeEventListener('resize', fixViewport);
      window.removeEventListener('orientationchange', fixViewport);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <Header />
      <main className="flex-grow pt-16 md:pt-20 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
