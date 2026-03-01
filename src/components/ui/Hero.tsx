
import React from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <div className={cn('pt-32 pb-16 md:pt-40 md:pb-24', className)}>
      <div className="container-tight text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary rounded-full">
          <p className="text-sm font-medium text-primary">Introducing our latest product</p>
        </div>
        
        <h1 className="mb-6 font-medium tracking-tight">
          Designed for the <span className="text-primary">future</span>
        </h1>
        
        <p className="mb-8 max-w-2xl mx-auto text-muted-foreground text-lg">
          A revolutionary product that seamlessly integrates into your life. Minimal, functional, and beautifully crafted for everyday use.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium transition-all hover:bg-primary/90">
            Get Started
          </button>
          <button className="bg-secondary text-secondary-foreground rounded-full px-8 py-3 font-medium transition-all hover:bg-secondary/80">
            Learn More
          </button>
        </div>
        
        <div className="mt-16 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 h-20 bottom-0"></div>
          <div className="glass-card rounded-2xl overflow-hidden shadow-lg mx-auto max-w-4xl animate-float">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Product showcase" 
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
