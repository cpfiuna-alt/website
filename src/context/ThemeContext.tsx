
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  systemTheme: Theme; // Track system theme separately
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Helper function to get current system theme
  const getSystemTheme = (): Theme => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark"; // fallback for SSR
  };

  // Store system preference separately
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      // If user has a saved preference, use it; otherwise use current system theme
      return savedTheme || getSystemTheme();
    }
    return "dark"; // fallback for SSR
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Ensure we have the correct initial system theme
    const currentSystemTheme = mediaQuery.matches ? "dark" : "light";
    setSystemTheme(currentSystemTheme);
    
    // If no saved theme preference, update to match current system theme
    if (!localStorage.getItem("theme")) {
      setTheme(currentSystemTheme);
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      
      // Only update theme if we're following system preference
      // (no manual override has been set)
      if (!localStorage.getItem("theme")) {
        setTheme(newSystemTheme);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme to document with optimized smooth transition
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      // Add optimized transition only for essential properties
      root.style.setProperty('transition', 'background-color 0.2s ease-out, color 0.2s ease-out, border-color 0.2s ease-out');
      root.style.setProperty('will-change', 'background-color, color, border-color');
      
      // Batch DOM updates
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      
      // Store user preference if manually set (different from system)
      if (theme !== systemTheme) {
        localStorage.setItem("theme", theme);
      } else {
        // If matching system preference, remove stored preference
        // so we can follow system changes
        localStorage.removeItem("theme");
      }
      
      // Clean up transition and will-change after animation is complete
      const cleanup = setTimeout(() => {
        root.style.removeProperty('transition');
        root.style.removeProperty('will-change');
      }, 200);
      
      return () => clearTimeout(cleanup);
    });
  }, [theme, systemTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      // Always store when manually toggling
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
