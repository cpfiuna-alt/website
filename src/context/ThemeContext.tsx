
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
    return "dark"; // fallback for SSR - prefer dark mode
  };

  // Store system preference separately
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      // If user has a saved preference, use it; otherwise default to dark mode
      return savedTheme || "dark";
    }
    return "dark"; // fallback for SSR - prefer dark mode
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Ensure we have the correct initial system theme
    const currentSystemTheme = mediaQuery.matches ? "dark" : "light";
    setSystemTheme(currentSystemTheme);
    
    // If no saved theme preference, keep default dark mode
    // (don't automatically switch based on system preference unless user wants it)
    if (!localStorage.getItem("theme")) {
      // Only set to dark on first load, don't change existing state
      setTheme((prev) => prev || "dark");
    }
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? "dark" : "light";
      setSystemTheme(newSystemTheme);
      
      // Users must manually toggle theme - we don't automatically follow system changes
      // This ensures dark mode stays as the default preference
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Apply theme to document with optimized smooth transition
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame(() => {
      // Only add transition on subsequent changes, not initial load
      const isInitialMount = !root.classList.contains('light') && !root.classList.contains('dark');
      
      if (!isInitialMount) {
        // Add optimized transition only for essential properties and only on theme changes
        root.style.setProperty('transition', 'background-color 0.15s ease-out, color 0.15s ease-out, border-color 0.15s ease-out');
        root.style.setProperty('will-change', 'background-color, color, border-color');
      }
      
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
      if (!isInitialMount) {
        const cleanup = setTimeout(() => {
          root.style.removeProperty('transition');
          root.style.removeProperty('will-change');
        }, 150);
        
        return () => clearTimeout(cleanup);
      }
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
