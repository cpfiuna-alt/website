
import React from 'react';
import { cn } from '@/lib/utils';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/50">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <p className="text-sm font-medium text-primary">Our Philosophy</p>
            </div>
            
            <h2 className="mb-6">Simplicity is the ultimate sophistication</h2>
            
            <p className="mb-6 text-muted-foreground">
              We believe that great design should be invisible. It should enhance the experience without drawing attention to itself. This principle guides every decision we make.
            </p>
            
            <div className="space-y-4">
              {['Quality', 'Innovation', 'Sustainability'].map((value, index) => (
                <div 
                  key={value} 
                  className="flex items-center space-x-3 opacity-0"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onLoad={(e) => {
                    (e.target as HTMLElement).classList.add('animate-slide-in');
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <p className="font-medium">{value}</p>
                </div>
              ))}
            </div>
            
            <button className="mt-8 bg-primary text-primary-foreground rounded-full px-8 py-3 font-medium transition-all hover:bg-primary/90">
              Learn Our Story
            </button>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className={cn(
                "glass-card rounded-2xl overflow-hidden shadow-lg",
                "transform rotate-2 scale-90 lg:scale-95 opacity-70",
                "absolute top-5 right-5 z-0 hidden md:block"
              )}>
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Our workspace" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
                  alt="Our product" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
