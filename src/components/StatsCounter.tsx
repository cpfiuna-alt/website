
import React, { useState, useEffect, useRef } from "react";
import { Users, Calendar, Code2, Trophy } from "lucide-react";

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  icon: React.ElementType;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration,
  label,
  icon: Icon,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div 
      ref={counterRef} 
      className={`text-center ${isVisible ? "animate-counter-up" : "opacity-0"}`}
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      </div>
      <h3 className="text-4xl font-bold mb-2">
        {prefix}
        {count}
        {suffix}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
};

const StatsCounter: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto glass-card rounded-2xl p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Counter
              end={150}
              duration={2000}
              label="Miembros Activos"
              icon={Users}
              prefix="+"
            />
            <Counter
              end={45}
              duration={2000}
              label="Eventos Realizados"
              icon={Calendar}
            />
            <Counter
              end={30}
              duration={2000}
              label="Proyectos Completados"
              icon={Code2}
            />
            <Counter
              end={12}
              duration={2000}
              label="Premios Recibidos"
              icon={Trophy}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
