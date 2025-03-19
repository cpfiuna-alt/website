
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "@/utils/coursesService";
import { CourseFrontMatter } from "@/utils/markdownUtils";
import { Card, CardContent } from "@/components/ui/card";

const CoursesSection = () => {
  const [courses, setCourses] = useState<CourseFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const coursesData = await getAllCourses();
        console.log("Fetched courses:", coursesData);
        setCourses(coursesData.map(course => course.frontMatter));
        setError(null);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("No se pudieron cargar los cursos");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Nuestros <span className="text-primary">Cursos</span>
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

  if (error) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Nuestros <span className="text-primary">Cursos</span>
          </h2>
          <div className="text-center text-red-400 p-4">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <section className="py-16 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Nuestros <span className="text-primary">Cursos</span>
          </h2>
          <div className="text-center text-muted p-4">
            No hay cursos disponibles en este momento.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Nuestros <span className="text-primary">Cursos</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={`course-${course.slug || course.id}`}
              to={`/course/${course.slug}`}
              className="overflow-hidden rounded-lg bg-black border border-gray-800 hover:shadow-lg transition-all duration-300 hover:border-primary/50 group"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-wrap gap-1">
                  {course.tags && course.tags.map((tag, idx) => (
                    <span 
                      key={`${course.slug || course.id}-tag-${idx}`}
                      className="text-xs px-2 py-1 bg-primary/80 backdrop-blur-sm text-white rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">
                    {course.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-muted/50 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{course.instructor}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
