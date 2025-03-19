
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-4 glass-subtle shadow-sm' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight"
        >
          Minimal<span className="text-primary">.</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {['Products', 'Features', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
            >
              {item}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity hidden md:block">
            Sign In
          </button>
          <button className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-primary/90">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
