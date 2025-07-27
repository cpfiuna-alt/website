
import React from 'react';

const BlogNewsletter = () => {
  return (
    <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-6">
          Suscríbete a nuestro <span className="gradient-text">Newsletter</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Recibe los últimos artículos, tutoriales y noticias directamente en tu bandeja de entrada.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Tu correo electrónico"
            className="flex-1 px-4 py-3 rounded-full bg-background border border-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-neon-blue">
            Suscribirme
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogNewsletter;
