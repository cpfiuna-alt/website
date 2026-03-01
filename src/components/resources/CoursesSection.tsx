
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "@/utils/coursesService";
import { CourseFrontMatter } from "@/utils/markdownUtils";
import { Card, CardContent } from "@/components/ui/card";
import { getInstructorByName } from "@/data/instructors";
import { User } from "lucide-react";

const CoursesSection = () => {
  const [courses, setCourses] = useState<CourseFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);
        const coursesData = await getAllCourses();
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
            Nuestros <span className="text-primary">Cursos</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`skeleton-${i}`} className="glass-card animate-pulse overflow-hidden rounded-xl">
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
            Nuestros <span className="text-primary">Cursos</span>
          </h2>
          <div className="text-center text-destructive p-4">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
            Nuestros <span className="text-primary">Cursos</span>
          </h2>
          <div className="text-center text-muted-foreground p-4">
            No hay cursos disponibles en este momento.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center text-foreground">
          Nuestros <span className="text-primary">Cursos</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link 
              key={`course-${course.slug || course.id}`}
              to={`/curso/${course.slug}`}
              className="glass-card group hover:shadow-neon-blue transition-all overflow-hidden rounded-xl"
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover object-center rounded-t-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-wrap gap-1">
                  {course.tags && course.tags.map((tag, idx) => (
                    <span 
                      key={`${course.slug || course.id}-tag-${idx}`}
                      className="text-xs px-2 py-1 bg-primary/90 text-primary-foreground rounded-md"
                    >
                      {tag.replace(/"/g, '')}
                    </span>
                  ))}
                </div>
                
                {/* Level badge moved to top left */}
                <div className="absolute top-2 left-2">
                  <span className="text-xs px-2 py-1 bg-muted/70 dark:bg-black/60 text-foreground rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-card-foreground">
                    {course.title}
                  </h3>
                  {/* Removed level badge from here */}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex items-center">
                    {(() => {
                      const instructor = getInstructorByName(course.instructor);
                      return instructor?.profilePicture ? (
                        <img 
                          src={instructor.profilePicture} 
                          alt={course.instructor}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            // Show fallback icon
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2">
                          <User className="h-3 w-3" />
                        </div>
                      );
                    })()}
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-2" style={{ display: 'none' }}>
                      <User className="h-3 w-3" />
                    </div>
                    <span>{course.instructor}</span>
                  </div>
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
