
import { useState, useEffect } from "react";
import { Logro } from "@/types/logros";

export const useLogros = () => {
  const [logros, setLogros] = useState<Logro[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogros = async () => {
      try {
        // In a real application, this would fetch from an API
        // For now, we'll use mock data
        const mockLogros: Logro[] = [
          {
            id: "1",
            titulo: "Primer lugar en NASA Space Apps Challenge 2023",
            descripcion: "Desarrollo de una solución innovadora para visualizar datos de la NASA sobre objetos cercanos a la Tierra.",
            premio: "Primer Lugar - Local (Paraguay)",
            categoria: "Hackathon",
            fecha: "2023-10-07",
            lugar: "Asunción, Paraguay",
            imagen: "/placeholder.svg",
            url: "https://www.spaceappschallenge.org/",
            equipo: ["Juan Pérez", "María González", "Carlos López"]
          },
          {
            id: "2",
            titulo: "Finalistas en IEEEXtreme Programming Competition",
            descripcion: "Equipo finalista representando a Paraguay en la competencia internacional de programación IEEEXtreme.",
            premio: "Top 100 Mundial",
            categoria: "Competencia",
            fecha: "2022-10-22",
            lugar: "Virtual",
            imagen: "/placeholder.svg",
            url: "https://ieeextreme.org/"
          },
          {
            id: "3",
            titulo: "Reconocimiento Google Developer Student Club",
            descripcion: "Reconocimiento por la contribución al desarrollo de la comunidad tecnológica universitaria.",
            premio: "Certificado de Excelencia",
            categoria: "Reconocimiento",
            fecha: "2023-05-15",
            lugar: "San Lorenzo, Paraguay",
            imagen: "/placeholder.svg"
          },
          {
            id: "4",
            titulo: "Semifinalistas en el Imagine Cup 2023",
            descripcion: "Desarrollo de una solución tecnológica para problemas de sostenibilidad ambiental usando inteligencia artificial.",
            premio: "Semifinalistas - Categoría Earth",
            categoria: "Competencia",
            fecha: "2023-04-10",
            lugar: "Virtual",
            imagen: "/placeholder.svg",
            url: "https://imaginecup.microsoft.com/"
          },
          {
            id: "5",
            titulo: "Ganadores de InnovaPY 2022",
            descripcion: "Proyecto innovador en el campo de la tecnología educativa que utiliza realidad aumentada.",
            premio: "Primer Lugar - Categoría Educación",
            categoria: "Concurso",
            fecha: "2022-11-15",
            lugar: "Asunción, Paraguay",
            imagen: "/placeholder.svg"
          },
          {
            id: "6",
            titulo: "Mención Honorífica en ACM-ICPC",
            descripcion: "Participación destacada en la Competencia Internacional Universitaria ACM de Programación.",
            premio: "Mención Honorífica",
            categoria: "Competencia",
            fecha: "2022-05-20",
            lugar: "Regional Sudamérica",
            imagen: "/placeholder.svg",
            url: "https://icpc.global/"
          }
        ];

        setLogros(mockLogros);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching logros:", error);
        setIsLoading(false);
      }
    };

    fetchLogros();
  }, []);

  return { logros, isLoading };
};
