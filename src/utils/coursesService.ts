
import { getAllContent, getContentBySlug } from './contentLoader';
import { CourseFrontMatter } from './markdownUtils';

// Get all course information
export async function getAllCourses({
  sortBy = 'date',
  filterByTag,
  limit
}: {
  sortBy?: 'date',
  filterByTag?: string,
  limit?: number
} = {}): Promise<Array<{ frontMatter: CourseFrontMatter, content: string, slug: string }>> {
  try {
    const courses = await getAllContent<CourseFrontMatter>('courses');
    
    // Filter courses based on tag if provided
    let filteredCourses = courses;
    if (filterByTag) {
      filteredCourses = filteredCourses.filter(course => 
        course.frontMatter.tags && course.frontMatter.tags.includes(filterByTag)
      );
    }
    
    // Sort courses
    if (sortBy === 'date') {
      filteredCourses.sort((a, b) => {
        const dateA = a.frontMatter.date ? new Date(a.frontMatter.date) : new Date(0);
        const dateB = b.frontMatter.date ? new Date(b.frontMatter.date) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      // Default sort by ID
      filteredCourses.sort((a, b) => {
        return Number(a.frontMatter.id) - Number(b.frontMatter.id);
      });
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      filteredCourses = filteredCourses.slice(0, limit);
    }
    
    return filteredCourses;
  } catch (error) {
    console.error("Error getting courses:", error);
    
    // Return fallback courses if real ones can't be loaded
    return [
      {
        frontMatter: {
          id: "1",
          title: "Introducción a Python",
          description: "Aprende los fundamentos de Python desde cero. Curso ideal para principiantes en programación.",
          level: "Principiante",
          duration: "6 semanas",
          instructor: "Carlos López",
          image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          tags: ["Python", "Programación", "Principiante"],
          slug: "introduccion-python"
        },
        content: "# Introducción a Python\n\nEste curso está diseñado para principiantes...",
        slug: "introduccion-python"
      },
      {
        frontMatter: {
          id: "2",
          title: "Desarrollo Web con HTML y CSS",
          description: "Aprende a crear sitios web responsivos usando HTML5 y CSS3.",
          level: "Principiante",
          duration: "4 semanas",
          instructor: "María Gómez",
          image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          tags: ["HTML", "CSS", "Desarrollo Web"],
          slug: "desarrollo-web-html-css"
        },
        content: "# Desarrollo Web con HTML y CSS\n\nEn este curso aprenderás...",
        slug: "desarrollo-web-html-css"
      },
      {
        frontMatter: {
          id: "3",
          title: "JavaScript para Principiantes",
          description: "Domina los fundamentos de JavaScript y aprende a crear aplicaciones web interactivas.",
          level: "Principiante",
          duration: "8 semanas",
          instructor: "Juan Pérez",
          image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          tags: ["JavaScript", "Programación", "Web"],
          slug: "javascript-principiantes"
        },
        content: "# JavaScript para Principiantes\n\nEste curso te introducirá al mundo de JavaScript...",
        slug: "javascript-principiantes"
      },
      {
        frontMatter: {
          id: "4",
          title: "Introducción a C++",
          description: "Aprende los conceptos básicos de la programación en C++ y su aplicación en algoritmos.",
          level: "Intermedio",
          duration: "10 semanas",
          instructor: "Roberto Martínez",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          tags: ["C++", "Algoritmos", "Programación"],
          slug: "introduccion-cpp"
        },
        content: "# Introducción a C++\n\nEste curso te enseñará las bases de C++...",
        slug: "introduccion-cpp"
      }
    ];
  }
}

// Get a single course by slug
export async function getCourseBySlug(slug: string): Promise<{ frontMatter: CourseFrontMatter, content: string, slug: string } | null> {
  try {
    const course = await getContentBySlug<CourseFrontMatter>('courses', slug);
    return course;
  } catch (error) {
    console.error(`Error getting course with slug ${slug}:`, error);
    return null;
  }
}
