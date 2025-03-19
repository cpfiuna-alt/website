
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

  // Fix viewport and overflow issues on mobile devices
  useEffect(() => {
    // Function to ensure the viewport has the correct size
    const fixViewport = () => {
      // On some mobile devices, 100vh can be problematic
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Prevent overscroll/bounce effect on iOS
    document.body.style.overscrollBehavior = 'none';
    
    // Fix issue with 100vh on mobile devices
    fixViewport();
    window.addEventListener('resize', fixViewport);
    window.addEventListener('orientationchange', fixViewport);

    // Set meta viewport tag to prevent unwanted zoom on input fields in iOS
    const metaViewport = document.querySelector('meta[name=viewport]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }

    return () => {
      window.removeEventListener('resize', fixViewport);
      window.removeEventListener('orientationchange', fixViewport);
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  // Check if we're on the home page to determine if we should add the gradient background
  const isHomePage = location.pathname === '/';

  return (
    <div className={`flex flex-col min-h-screen overflow-x-hidden w-full ${!isHomePage ? 'bg-gradient-to-b from-background via-background/95 to-background/90' : ''}`}>
      <Header />
      <main className="flex-grow pt-16 md:pt-20 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
