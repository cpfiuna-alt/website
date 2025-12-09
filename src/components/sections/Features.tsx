
import React from 'react';

const features = [
  {
    id: 1,
    title: 'Intuitive Design',
    description: 'Carefully crafted interface that feels natural and effortless to use.'
  },
  {
    id: 2,
    title: 'Powerful Performance',
    description: 'Optimized for speed and efficiency, delivering a seamless experience.'
  },
  {
    id: 3,
    title: 'Thoughtful Integration',
    description: 'Works harmoniously with your existing workflow and tools.'
  },
  {
    id: 4,
    title: 'Sustainable Build',
    description: 'Created with environmentally conscious materials and processes.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="mb-4">Exceptional Features</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every detail has been considered to create a product that enhances your experience without unnecessary complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className="glass-card rounded-xl p-8 transition-all hover:translate-y-[-4px]"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
              }}
              onLoad={(e) => {
                (e.target as HTMLElement).classList.add('animate-slide-in');
              }}
            >
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <span className="text-primary font-medium">{feature.id}</span>
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
