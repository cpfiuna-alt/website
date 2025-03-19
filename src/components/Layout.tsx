
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "./MatrixRain";
import { useTheme } from "@/context/ThemeContext";

interface LayoutProps {
  children: React.ReactNode;
  showMatrixRain?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showMatrixRain = true,
  className = ""
}) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col bg-background dark:bg-transparent ${className}`}>
      {showMatrixRain && <MatrixRain />}
      <Navbar />
      <main className="relative z-10 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
