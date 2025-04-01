
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const DocFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(type);
    if (type === 'positive') {
      toast.success('¡Gracias por tu feedback positivo!');
    } else {
      toast.success('Gracias por tu feedback. Trabajaremos para mejorar esta documentación.');
    }
  };

  return (
    <div className="bg-muted/30 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-3">¿Te resultó útil esta documentación?</h3>
      <p className="text-muted-foreground mb-4">
        Ayúdanos a mejorar nuestra documentación con tu feedback.
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleFeedback('positive')}
          disabled={feedback === 'positive'}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            feedback === 'positive'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Sí, me ayudó
        </button>
        <button
          onClick={() => handleFeedback('negative')}
          disabled={feedback === 'negative'}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            feedback === 'negative'
              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          <ThumbsDown className="h-4 w-4 mr-2" />
          No, necesita mejorar
        </button>
      </div>
    </div>
  );
};

export default DocFeedback;
