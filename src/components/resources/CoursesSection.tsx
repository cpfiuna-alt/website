
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "@/utils/coursesService";
import { CourseFrontMatter } from "@/utils/markdownUtils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const CoursesSection = () => {
  const [courses, setCourses] = useState<CourseFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const coursesData = await getAllCourses();
        console.log("Fetched courses:", coursesData);
        setCourses(coursesData.map(course => course.frontMatter));
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Nuestros <span className="gradient-text">Cursos</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skeleton-${i}`} className="glass-card animate-pulse">
                <div className="h-40 bg-muted/50 rounded-t-xl"></div>
                <div className="p-4">
                  <div className="h-6 bg-muted/50 rounded mb-3 w-3/4"></div>
                  <div className="h-4 bg-muted/50 rounded mb-4 w-full"></div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div className="h-4 bg-muted/30 rounded w-20"></div>
                    <div className="h-4 bg-muted/30 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Nuestros <span className="gradient-text">Cursos</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={`course-${course.slug || course.id}`}
              to={`/course/${course.slug}`}
              className="glass-card group overflow-hidden hover:shadow-neon-blue transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {course.tags && course.tags.map((tag, idx) => (
                    <span 
                      key={`${course.slug || course.id}-tag-${idx}`}
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
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/courses" 
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            Ver todos los cursos
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
