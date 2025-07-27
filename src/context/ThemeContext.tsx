
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
  // Store system preference separately
  const [systemTheme, setSystemTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    // Always start with system theme, but check for saved preferences
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      return savedTheme || systemTheme;
    }
    return systemTheme;
  });

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
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

  // Apply theme to document with smooth transition
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Add transition class for smooth color transitions
    root.style.transition = 'color 0.3s ease-in-out, background-color 0.3s ease-in-out';
    
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
    
    // Clean up transition after theme change is complete
    const cleanup = setTimeout(() => {
      root.style.transition = '';
    }, 300);
    
    return () => clearTimeout(cleanup);
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
