
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-300 ${className}`}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all ${theme === 'dark' ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'}`} />
      <Moon className={`h-5 w-5 transition-all ${theme === 'light' ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'}`} />
      <span className="sr-only">
        {theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      </span>
    </button>
  );
};

export default ThemeToggle;
