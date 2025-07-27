
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HumansTxt = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHumansTxt = async () => {
      try {
        const response = await fetch("/humans.txt");
        const text = await response.text();
        
        // Create a pre element with the text content
        const root = document.getElementById("root");
        if (root) {
          root.innerHTML = "";
          
          const container = document.createElement("div");
          container.style.padding = "40px";
          container.style.maxWidth = "800px";
          container.style.margin = "0 auto";
          container.style.fontFamily = "monospace";
          
          const header = document.createElement("div");
          header.style.marginBottom = "20px";
          
          const title = document.createElement("h1");
          title.textContent = "humans.txt";
          title.style.marginBottom = "10px";
          
          const backButton = document.createElement("button");
          backButton.textContent = "← Back to site";
          backButton.style.padding = "8px 16px";
          backButton.style.borderRadius = "4px";
          backButton.style.backgroundColor = "#3b82f6";
          backButton.style.color = "white";
          backButton.style.border = "none";
          backButton.style.cursor = "pointer";
          backButton.addEventListener("click", () => navigate(-1));
          
          const pre = document.createElement("pre");
          pre.textContent = text;
          pre.style.whiteSpace = "pre-wrap";
          pre.style.backgroundColor = "#f5f5f5";
          pre.style.padding = "20px";
          pre.style.borderRadius = "8px";
          pre.style.overflowX = "auto";
          
          header.appendChild(title);
          header.appendChild(backButton);
          container.appendChild(header);
          container.appendChild(pre);
          root.appendChild(container);
        }
      } catch (error) {
        console.error("Error fetching humans.txt:", error);
        navigate("/");
      }
    };
    
    fetchHumansTxt();
    
    // Set title
    document.title = "humans.txt | Club de Programación FIUNA";
    
    return () => {
      // Clean up if needed
    };
  }, [navigate]);

  return null;
};

export default HumansTxt;
