
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Determine which icon to show
  const getIcon = () => {
    if (theme === "dark") {
      return <Sun className="h-5 w-5 text-yellow-400" />;
    } else {
      return <Moon className="h-5 w-5 text-blue-500" />;
    }
  };

  // Determine tooltip text
  const getTooltipText = () => {
    return theme === "dark" 
      ? "Cambiar a modo claro" 
      : "Cambiar a modo oscuro";
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {getIcon()}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeToggle;
