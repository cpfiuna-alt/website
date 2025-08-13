
import React, { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  icon: React.ReactNode;
}

const AnimatedCounter = ({ end, duration = 2000, label, icon }: CounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end]);

  const animateCount = () => {
    const start = 0;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = Math.floor(end / steps) || 1;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);
  };

  return (
    <div 
      ref={countRef}
      className="glass-card-static p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-2">{count}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
