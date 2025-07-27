import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear the entire canvas when theme changes
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Characters to use
    const characters = "01</cpf>";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store current Y position of each column
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      // Use different background and text colors based on theme
      if (theme === "light") {
        // For light theme: Use lighter background fade
        ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(25, 80, 170, 0.6)"; // Darker blue for better contrast in light mode
      } else {
        // For dark theme: Keep original styling
        ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(33, 150, 243, 0.4)"; // Original blue color
      }
      
      // Set text font
      ctx.font = `${fontSize}px monospace`;
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reducimos la velocidad de caída aumentando el umbral de probabilidad
        // y reduciendo el incremento del contador
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.992) {
          drops[i] = 0;
        }
        
        // Ralentizamos la velocidad de caída reduciendo el incremento
        drops[i] += 0.5;
      }
    };

    // Animation frame ID for cleanup
    let animationId: number;
    let timeoutId: number;
    
    // Animation loop - reducimos la frecuencia de actualización
    const animate = () => {
      draw();
      // Usar setTimeout en lugar de requestAnimationFrame para controlar mejor la velocidad
      timeoutId = window.setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 50); // Añadir retraso de 50ms entre frames
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Clear canvas on resize to prevent artifacts
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      clearTimeout(timeoutId);
      // Clear canvas on cleanup
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [theme]); // Add theme as a dependency to re-render when it changes

  // Adjust opacity based on theme
  const canvasOpacity = theme === "light" ? 0.25 : 0.15;

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ease-in-out"
      style={{ opacity: canvasOpacity }}
    />
  );
};

export default MatrixRain;
