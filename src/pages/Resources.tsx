
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ResourcesHero from "@/components/resources/ResourcesHero";
import LearningRoadmaps from "@/components/resources/LearningRoadmaps";
import ClubResources from "@/components/resources/ClubResources";
import ExternalResources from "@/components/resources/ExternalResources";
import ResourcesCallToAction from "@/components/resources/ResourcesCallToAction";

const Resources = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null);

  return (
    <Layout>
      <ResourcesHero />
      <LearningRoadmaps 
        selectedRoadmap={selectedRoadmap} 
        setSelectedRoadmap={setSelectedRoadmap} 
      />
      <CoursesSection />
      <ClubResources />
      <ExternalResources />
      {/* Removed the upload modal button */}
    </Layout>
  );
};

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Introducción a Python",
      description: "Aprendé los fundamentos de Python desde cero. Curso básico para principiantes.",
      level: "Principiante",
      duration: "6 semanas",
      instructor: "Prof. Ana González",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Python", "Programación", "Básico"]
    },
    {
      id: 2,
      title: "Desarrollo Web con React",
      description: "Construí aplicaciones web modernas con React.js y herramientas frontend.",
      level: "Intermedio",
      duration: "8 semanas",
      instructor: "Ing. Carlos Martínez",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["JavaScript", "React", "Frontend"]
    },
    {
      id: 3,
      title: "Algoritmos para Competencias",
      description: "Aprendé algoritmos y estructuras de datos para competencias de programación.",
      level: "Avanzado",
      duration: "10 semanas",
      instructor: "Dr. Juan Pérez",
      image: "https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["Algoritmos", "Competitive Programming", "C++"]
    },
    {
      id: 4,
      title: "Bases de Datos y SQL",
      description: "Fundamentos de bases de datos relacionales y lenguaje SQL.",
      level: "Intermedio",
      duration: "6 semanas",
      instructor: "Lic. María Silva",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["SQL", "Bases de Datos", "MySQL"]
    },
    {
      id: 5,
      title: "Inteligencia Artificial Práctica",
      description: "Introducción a la IA con aplicaciones prácticas usando Python y bibliotecas populares.",
      level: "Intermedio",
      duration: "8 semanas",
      instructor: "Dr. Roberto Fernández",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["IA", "Python", "Machine Learning"]
    },
    {
      id: 6,
      title: "Desarrollo de Aplicaciones Móviles",
      description: "Creá aplicaciones para Android e iOS usando React Native.",
      level: "Intermedio",
      duration: "9 semanas",
      instructor: "Ing. Patricia López",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      tags: ["React Native", "Mobile", "JavaScript"]
    }
  ];

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Nuestros <span className="gradient-text">Cursos</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <a 
              key={course.id}
              href="/course/example" 
              className="glass-card group overflow-hidden hover:shadow-neon-blue transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {course.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs px-2 py-0.5 bg-primary/20 backdrop-blur-sm text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 bg-muted/50 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{course.instructor}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/courses" 
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            Ver todos los cursos
          </a>
        </div>
      </div>
    </section>
  );
};

export default Resources;
