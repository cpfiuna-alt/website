
import React, { useState } from "react";
import { toast } from "sonner";

const DocFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null);

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type);
    if (type === "positive") {
      toast.success("¡Gracias por tu feedback positivo!");
    } else {
      toast.success("Gracias por tu feedback. Trabajaremos para mejorar la documentación.");
    }
  };

  return (
    <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-lg mt-10">
      <h3 className="text-xl font-semibold mt-0 mb-3">¿Esta documentación te resultó útil?</h3>
      <p className="text-lg mb-6">
        Ayudanos a mejorar la documentación con tus comentarios y sugerencias.
      </p>
      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => handleFeedback("positive")}
          disabled={feedback === "positive"}
          className={`px-4 py-2 rounded-md flex items-center transition-colors ${
            feedback === "positive" 
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
              : "bg-muted/50 hover:bg-muted"
          }`}
        >
          👍 Sí, me ayudó
        </button>
        <button 
          onClick={() => handleFeedback("negative")}
          disabled={feedback === "negative"}
          className={`px-4 py-2 rounded-md flex items-center transition-colors ${
            feedback === "negative" 
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" 
              : "bg-muted/50 hover:bg-muted"
          }`}
        >
          👎 No, necesita mejorar
        </button>
      </div>
    </div>
  );
};

export default DocFeedback;
