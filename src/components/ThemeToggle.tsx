
import React, { useCallback, useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Memoize icon to prevent unnecessary re-renders
  const icon = useMemo(() => {
    if (theme === "dark") {
      return <Sun className="h-5 w-5 text-yellow-400" />;
    } else {
      return <Moon className="h-5 w-5 text-blue-500" />;
    }
  }, [theme]);

  // Memoize tooltip text
  const tooltipText = useMemo(() => {
    return theme === "dark" 
      ? "Cambiar a modo claro" 
      : "Cambiar a modo oscuro";
  }, [theme]);

  // Use useCallback to prevent function recreation on every render
  const handleToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleToggle}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label={tooltipText}
          >
            {icon}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
