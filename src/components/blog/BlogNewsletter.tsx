
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const BlogNewsletter = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu correo electrónico",
        variant: "destructive",
      });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateEmail()) {
      setIsSubmitting(false);
      return;
    }

    // Add debugging
    console.log("Newsletter subscription started");
    console.log("Email:", email);

    try {
      // Replace this URL with your Google Apps Script URL for newsletter
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyVYpcvpmzRPqqa2knaAuzGBpD7Hpceg0RwoNiZ6YWuGOdOhPkwEgo25Rhvhuh9gjEU/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: email,
            timestamp: new Date().toISOString(),
            source: "website_newsletter"
          }),
        }
      );

      console.log("Newsletter subscription completed (no-cors mode - can't read response)");
      console.log("Check your Google Sheets to verify if email was received");

      // Since we can't read the response in no-cors mode, we assume success
      toast({
        title: "¡Suscripción exitosa!",
        description: "Te has suscrito correctamente al newsletter. ¡Gracias!",
        variant: "default",
      });

      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al suscribirte. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">
          Suscríbete a nuestro <span className="gradient-text">Newsletter</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Recibe los últimos artículos, tutoriales y noticias directamente en tu bandeja de entrada.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            id="newsletter-email"
            name="email"
            placeholder="Tu correo electrónico"
            aria-label="Correo electrónico para newsletter"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-full bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all disabled:opacity-70"
            required
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-neon-blue'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Suscribiendo...
              </span>
            ) : (
              'Suscribirme'
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default BlogNewsletter;
