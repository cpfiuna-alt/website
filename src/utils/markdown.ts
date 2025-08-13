import { useEffect, useState } from "react";

export interface MarkdownMeta {
  title: string;
  date?: string;
  excerpt?: string;
  slug: string;
  image?: string;
  [key: string]: any;
}

// Type definitions for specific content types
export interface EventMeta extends MarkdownMeta {
  id: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  type: string;
  registrationLink: string;
  isUpcoming: boolean;
  content: string;
}

export interface ProjectMeta extends MarkdownMeta {
  id: string;
  description: string;
  image: string;
  tags: string[];
  githubLink: string;
  demoLink: string;
  category: string;
  featured: boolean;
  content: string;
}

export interface BlogPostMeta extends MarkdownMeta {
  id: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  image: string;
  content: string;
}

export interface CourseMeta extends MarkdownMeta {
  id: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  image: string;
  tags: string[];
  content: string;
}

// This is a mock implementation since we don't have access to the filesystem in the browser
// In a real app, this would load actual markdown files from the content directory
export function useMarkdownContent<T extends MarkdownMeta>(contentType: string): T[] {
  const [content, setContent] = useState<T[]>([]);

  useEffect(() => {
    // Here we'd normally fetch the markdown files
    // For now, we'll return mock data based on contentType
    const mockData: Record<string, any[]> = {
      events: getMockEvents(),
      projects: getMockProjects(),
      blog: getMockBlogPosts(),
      courses: getMockCourses(),
    };

    // Cast the data to the expected type to make TypeScript happy
    setContent(mockData[contentType] as T[] || []);
  }, [contentType]);

  return content;
}

export function useMarkdownItem<T extends MarkdownMeta>(
  contentType: string, 
  slug: string
): T | null {
  const [item, setItem] = useState<T | null>(null);

  useEffect(() => {
    // Here we'd normally fetch a specific markdown file by slug
    // For now, we'll return mock data based on contentType and slug
    const mockData: Record<string, any[]> = {
      events: getMockEvents(),
      projects: getMockProjects(),
      blog: getMockBlogPosts(),
      courses: getMockCourses(),
    };

    const items = mockData[contentType] || [];
    const foundItem = items.find(i => i.slug === slug) || null;
    
    // Cast to the expected type
    setItem(foundItem as T);
  }, [contentType, slug]);

  return item;
}

// Mock data functions
function getMockEvents(): EventMeta[] {
  return [
    {
      id: "1",
      title: "Hackathon FIUNA 2024",
      date: "2024-06-15",
      time: "09:00",
      location: "Campus FIUNA, Aula Magna",
      description: "El evento anual de programación competitiva más grande de la facultad. Forma tu equipo y resuelve desafíos de programación durante 24 horas.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      type: "hackathon",
      registrationLink: "https://forms.com/register-hackathon",
      isUpcoming: true,
      slug: "hackathon-fiuna-2024",
      content: "# Hackathon FIUNA 2024\n\nEl evento anual de programación competitiva más grande de la facultad. Forma tu equipo y resuelve desafíos de programación durante 24 horas.\n\n## Detalles\n\n- **Fecha**: 15 de junio, 2024\n- **Hora**: 09:00 AM - 09:00 AM (siguiente día)\n- **Lugar**: Campus FIUNA, Aula Magna\n\n## Premios\n\n- 1er lugar: Notebooks Lenovo ThinkPad\n- 2do lugar: Tablets Samsung Galaxy\n- 3er lugar: Auriculares Sony WH-1000XM4\n\n## Requisitos\n\n- Estudiantes activos de FIUNA\n- Equipos de 3-4 personas\n- Conocimientos básicos de programación\n\n## Registro\n\nEl registro está abierto hasta el 10 de junio."
    },
    {
      id: "2",
      title: "Workshop: Introducción a la Inteligencia Artificial",
      date: "2024-05-20",
      time: "14:00",
      location: "Aula 202, Bloque A",
      description: "Aprende los conceptos básicos de la IA y cómo implementar algoritmos de aprendizaje automático en Python.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80",
      type: "workshop",
      registrationLink: "https://forms.com/register-ai-workshop",
      isUpcoming: true,
      slug: "workshop-introduccion-ia",
      content: "# Workshop: Introducción a la Inteligencia Artificial\n\nAprende los conceptos básicos de la IA y cómo implementar algoritmos de aprendizaje automático en Python.\n\n## Agenda\n\n1. Introducción a los conceptos de IA (1 hora)\n2. Configuración del entorno de trabajo (30 min)\n3. Primeros pasos con scikit-learn (1 hora)\n4. Desarrollo de un modelo básico de clasificación (1.5 horas)\n\n## Requisitos\n\n- Laptop con Python 3.8+ instalado\n- Conocimientos básicos de programación en Python\n- Entusiasmo por aprender algo nuevo\n\n## Materiales\n\nSe proporcionarán notebooks de Jupyter y datasets para prácticas."
    },
    {
      id: "3",
      title: "Meetup: Desarrollo Web Moderno",
      date: "2024-04-10",
      time: "18:30",
      location: "Sala de Conferencias, Biblioteca Central",
      description: "Discusión sobre las últimas tendencias en desarrollo web frontend y backend. React, Node.js, y más.",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      type: "meetup",
      registrationLink: "https://forms.com/register-web-meetup",
      isUpcoming: false,
      slug: "meetup-desarrollo-web-moderno",
      content: "# Meetup: Desarrollo Web Moderno\n\nDiscusión sobre las últimas tendencias en desarrollo web frontend y backend. React, Node.js, y más.\n\n## Temas a tratar\n\n- Estado actual del desarrollo web en 2024\n- Comparativa de frameworks frontend: React vs Vue vs Angular\n- Backend con Node.js y Express\n- Bases de datos NoSQL vs SQL para aplicaciones web\n\n## Ponentes\n\n- Ing. María Gómez - Especialista en React y frontend\n- Dr. Carlos Benítez - Experto en arquitecturas backend\n- Lic. Sofia Martínez - DevOps Engineer\n\n## Networking\n\nDespués del evento principal, habrá un espacio para networking con refrigerios."
    }
  ];
}

function getMockProjects(): ProjectMeta[] {
  return [
    {
      id: "1",
      title: "Sistema de Gestión Académica",
      description: "Aplicación web para la gestión de cursos, estudiantes y calificaciones en la facultad.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      tags: ["react", "node", "mongodb", "express"],
      githubLink: "https://github.com/cpfiuna/academic-system",
      demoLink: "https://academic-system-demo.fiuna.edu.py",
      category: "web",
      featured: true,
      slug: "sistema-gestion-academica",
      content: "# Sistema de Gestión Académica\n\nAplicación web para la gestión de cursos, estudiantes y calificaciones en la facultad.\n\n## Características\n\n- Registro y administración de estudiantes\n- Creación y gestión de cursos y asignaturas\n- Registro de calificaciones y asistencias\n- Generación de reportes académicos\n- Dashboard con estadísticas\n\n## Tecnologías utilizadas\n\n- **Frontend**: React, Redux, Material-UI\n- **Backend**: Node.js, Express\n- **Base de datos**: MongoDB\n- **Autenticación**: JWT\n\n## Equipo\n\n- Juan Pérez (Team Lead)\n- María Gómez (Frontend Developer)\n- Carlos Benítez (Backend Developer)\n- Sofía Martínez (QA & Documentation)\n\n## Estado del proyecto\n\nActualmente en fase beta, con implementación piloto en dos departamentos de la facultad."
    },
    {
      id: "2",
      title: "App Móvil FIUNA",
      description: "Aplicación móvil oficial para estudiantes de FIUNA con horarios, notificaciones y recursos académicos.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1734&q=80",
      tags: ["react-native", "firebase", "mobile", "ios", "android"],
      githubLink: "https://github.com/cpfiuna/fiuna-app",
      demoLink: "https://play.google.com/store/apps/details?id=py.edu.fiuna.app",
      category: "mobile",
      featured: true,
      slug: "app-movil-fiuna",
      content: "# App Móvil FIUNA\n\nAplicación móvil oficial para estudiantes de FIUNA con horarios, notificaciones y recursos académicos.\n\n## Características\n\n- Calendario académico y horarios personalizados\n- Sistema de notificaciones para eventos y anuncios\n- Acceso a materiales de estudio\n- Directorio de profesores y contactos importantes\n- Mapa interactivo del campus\n\n## Tecnologías utilizadas\n\n- React Native\n- Firebase (Authentication, Firestore, Cloud Functions)\n- Redux\n- Native Base UI\n\n## Plataformas\n\n- Android (Play Store)\n- iOS (App Store)\n\n## Capturas de pantalla\n\n[Aquí se mostrarían capturas de pantalla de la aplicación]"
    },
    {
      id: "3",
      title: "Análisis de Datos Climáticos",
      description: "Proyecto de ciencia de datos para analizar patrones climáticos en Paraguay utilizando datos históricos.",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1734&q=80",
      tags: ["python", "pandas", "matplotlib", "scikit-learn", "jupyter"],
      githubLink: "https://github.com/cpfiuna/clima-data-py",
      demoLink: "https://cpfiuna.github.io/clima-data-py",
      category: "data",
      featured: false,
      slug: "analisis-datos-climaticos",
      content: "# Análisis de Datos Climáticos de Paraguay\n\nProyecto de ciencia de datos para analizar patrones climáticos en Paraguay utilizando datos históricos de los últimos 50 años.\n\n## Objetivos\n\n- Identificar patrones y tendencias en datos climáticos de Paraguay\n- Crear visualizaciones interactivas de cambios de temperatura y precipitaciones\n- Desarrollar modelos predictivos para estimaciones climáticas\n- Analizar el impacto del cambio climático en la región\n\n## Datasets utilizados\n\n- Registros históricos de estaciones meteorológicas de Paraguay (1970-2023)\n- Datos satelitales de NASA y NOAA\n- Registros de eventos climáticos extremos\n\n## Metodología\n\n1. Limpieza y preparación de datos\n2. Análisis exploratorio\n3. Visualización de tendencias\n4. Modelado predictivo\n5. Validación y evaluación\n\n## Resultados clave\n\n- Se identificó un aumento promedio de temperatura de 1.2°C en los últimos 50 años\n- Las precipitaciones muestran mayor variabilidad desde 2000\n- Los eventos climáticos extremos han aumentado un 30% en la última década"
    }
  ];
}

function getMockBlogPosts(): BlogPostMeta[] {
  return [
    {
      id: "1",
      title: "Cómo comenzar tu carrera en desarrollo de software",
      excerpt: "Guía completa para estudiantes que quieren iniciarse en el mundo de la programación y el desarrollo de software.",
      date: "2024-03-15",
      author: "María Gómez",
      readTime: "8 min",
      tags: ["carrera", "desarrollo", "programación", "estudiantes"],
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      slug: "como-comenzar-carrera-desarrollo-software",
      content: "# Cómo comenzar tu carrera en desarrollo de software\n\nGuía completa para estudiantes que quieren iniciarse en el mundo de la programación y el desarrollo de software.\n\n## Primeros pasos\n\n1. **Elige un lenguaje para comenzar**: Python es excelente para principiantes por su sintaxis clara y versatilidad.\n\n2. **Aprende los fundamentos**: Variables, tipos de datos, estructuras de control, funciones y estructuras de datos básicas.\n\n3. **Desarrolla proyectos pequeños**: Aplicaciones de consola, juegos simples, calculadoras o scripts de automatización.\n\n4. **Aprende control de versiones**: Git es esencial para cualquier desarrollador.\n\n## Recursos recomendados\n\n- **Cursos online**: Platzi, Coursera, edX, FreeCodeCamp\n- **Libros**: \"Python Crash Course\" de Eric Matthes\n- **Comunidades**: Stack Overflow, GitHub, Reddit (r/learnprogramming)\n\n## Caminos de especialización\n\n### Desarrollo Web\nHtml, CSS, JavaScript → Frameworks (React, Angular, Vue)\n\n### Desarrollo Móvil\nKotlin (Android), Swift (iOS), o Flutter/React Native (multiplataforma)\n\n### Ciencia de Datos\nPython, R, estadística, machine learning\n\n### Desarrollo de Videojuegos\nUnity (C#), Unreal Engine (C++)\n\n## Consejos prácticos\n\n- **Consistencia sobre intensidad**: Mejor 1 hora diaria que 10 horas un día a la semana\n- **Colabora en proyectos open source**: Excelente para aprender y construir portfolio\n- **Networking**: Únete a comunidades como el Club de Programación FIUNA\n- **Mantente actualizado**: La tecnología evoluciona rápidamente"
    },
    {
      id: "2",
      title: "Introducción a Machine Learning con Python",
      excerpt: "Aprende los conceptos básicos del aprendizaje automático y cómo implementar modelos simples con scikit-learn.",
      date: "2024-02-28",
      author: "Carlos Benítez",
      readTime: "12 min",
      tags: ["machine learning", "python", "scikit-learn", "data science"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80",
      slug: "introduccion-machine-learning-python",
      content: "# Introducción a Machine Learning con Python\n\nAprende los conceptos básicos del aprendizaje automático y cómo implementar modelos simples con scikit-learn.\n\n## ¿Qué es Machine Learning?\n\nEl Machine Learning (ML) o Aprendizaje Automático es una rama de la Inteligencia Artificial que permite a las computadoras aprender patrones a partir de datos sin ser explícitamente programadas para ello.\n\n## Tipos de aprendizaje\n\n1. **Aprendizaje supervisado**: Entrenamiento con datos etiquetados\n   - Clasificación (predecir categorías)\n   - Regresión (predecir valores continuos)\n\n2. **Aprendizaje no supervisado**: Encontrar patrones en datos no etiquetados\n   - Clustering\n   - Reducción de dimensionalidad\n\n3. **Aprendizaje por refuerzo**: Aprender a través de la interacción con un entorno\n\n## Primer modelo con scikit-learn\n\n```python\n# Importar librerías\nimport numpy as np\nimport matplotlib.pyplot as plt\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neighbors import KNeighborsClassifier\nfrom sklearn.metrics import accuracy_score\n\n# Cargar dataset\niris = load_iris()\nX = iris.data\ny = iris.target\n\n# Dividir en entrenamiento y prueba\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# Crear y entrenar modelo\nmodel = KNeighborsClassifier(n_neighbors=3)\nmodel.fit(X_train, y_train)\n\n# Realizar predicciones\npredictions = model.predict(X_test)\n\n# Evaluar modelo\naccuracy = accuracy_score(y_test, predictions)\nprint(f'Precisión del modelo: {accuracy * 100:.2f}%')\n```\n\n## Flujo de trabajo típico\n\n1. **Recolección de datos**: Obtener datasets relevantes\n2. **Preprocesamiento**: Limpieza, normalización, transformación\n3. **Exploración**: Análisis y visualización inicial\n4. **Feature engineering**: Crear características relevantes\n5. **Entrenamiento del modelo**: Seleccionar y ajustar algoritmos\n6. **Evaluación**: Medir rendimiento con métricas apropiadas\n7. **Optimización**: Ajustar hiperparámetros\n8. **Despliegue**: Poner el modelo en producción\n\n## Recursos para seguir aprendiendo\n\n- **Cursos**: Andrew Ng en Coursera, Fast.ai\n- **Libros**: \"Hands-On Machine Learning with Scikit-Learn & TensorFlow\" de Aurélien Géron\n- **Competencias**: Kaggle para practicar con datasets reales\n\n## Próximos pasos\n\n- Profundizar en diferentes algoritmos\n- Aprender técnicas de validación cruzada\n- Explorar deep learning con TensorFlow o PyTorch\n- Practicar con proyectos reales"
    },
    {
      id: "3",
      title: "5 proyectos para mejorar tu portafolio de programación",
      excerpt: "Ideas de proyectos prácticos que te ayudarán a demostrar tus habilidades a potenciales empleadores.",
      date: "2024-01-20",
      author: "Sofía Martínez",
      readTime: "6 min",
      tags: ["portafolio", "proyectos", "github", "desarrollo"],
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      slug: "5-proyectos-mejorar-portafolio-programacion",
      content: "# 5 proyectos para mejorar tu portafolio de programación\n\nIdeas de proyectos prácticos que te ayudarán a demostrar tus habilidades a potenciales empleadores.\n\n## ¿Por qué es importante el portafolio?\n\nUn portafolio de proyectos es la mejor manera de demostrar tus habilidades técnicas. Mientras que un CV enumera lo que dices que puedes hacer, un portafolio muestra lo que realmente has hecho.\n\n## Proyecto 1: Aplicación de lista de tareas (Todo App)\n\n**Habilidades demostradas**: Frontend, gestión de estado, persistencia de datos\n\n**Características recomendadas**:\n- Crear, editar, eliminar y marcar tareas como completadas\n- Filtrar por estado o categoría\n- Almacenamiento local (localStorage) o backend simple\n- Diseño responsivo y atractivo\n\n**Tecnologías sugeridas**: HTML, CSS, JavaScript (React, Vue o Angular)\n\n## Proyecto 2: API RESTful\n\n**Habilidades demostradas**: Backend, diseño de APIs, bases de datos\n\n**Características recomendadas**:\n- Endpoints CRUD completos\n- Autenticación (JWT)\n- Documentación (Swagger/OpenAPI)\n- Testing unitario y de integración\n\n**Tecnologías sugeridas**: Node.js (Express), Python (Flask/Django), MongoDB/PostgreSQL\n\n## Proyecto 3: Dashboard de datos\n\n**Habilidades demostradas**: Visualización de datos, consumo de APIs, UX/UI\n\n**Características recomendadas**:\n- Visualizaciones interactivas (gráficos, tablas)\n- Filtros y controles para manipular datos\n- Consumo de APIs públicas con datos interesantes\n- Diseño responsivo y accesible\n\n**Tecnologías sugeridas**: React/Vue + D3.js/Chart.js/Recharts\n\n## Proyecto 4: Aplicación móvil simple\n\n**Habilidades demostradas**: Desarrollo móvil, UI para dispositivos táctiles\n\n**Características recomendadas**:\n- Navegación entre pantallas\n- Persistencia de datos\n- Interacciones táctiles\n- Diseño para diferentes tamaños de pantalla\n\n**Tecnologías sugeridas**: React Native, Flutter, Swift (iOS) o Kotlin (Android)\n\n## Proyecto 5: Clon de sitio web popular\n\n**Habilidades demostradas**: Atención al detalle, frontend avanzado\n\n**Características recomendadas**:\n- Recreación fiel de la interfaz de un sitio popular\n- Funcionalidad principal implementada\n- Adaptación responsiva\n- Optimización de rendimiento\n\n**Tecnologías sugeridas**: HTML, CSS, JavaScript + framework de tu elección\n\n## Consejos para destacar\n\n1. **Documenta bien tus proyectos**: README detallado, screenshots, demo en vivo\n2. **Código limpio y comentado**: Muestra buenas prácticas\n3. **Despliega tus proyectos**: Utiliza GitHub Pages, Vercel, Netlify, etc.\n4. **Incluye tests**: Demuestra que te preocupas por la calidad\n5. **Detalla los desafíos**: Explica problemas que enfrentaste y cómo los resolviste\n\n## Conclusión\n\nLo más importante no es la complejidad de tus proyectos, sino que demuestren claramente tus habilidades y tu capacidad para crear software funcional y bien diseñado. Un buen portafolio te diferenciará significativamente de otros candidatos en el competitivo mercado laboral de tecnología."
    }
  ];
}

function getMockCourses(): CourseMeta[] {
  return [
    {
      id: "1",
      title: "Introducción a la Programación con Python",
      description: "Curso base para aprender los fundamentos de la programación utilizando Python, el lenguaje más accesible para principiantes.",
      level: "Principiante",
      duration: "8 semanas",
      instructor: "María Gómez",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1736&q=80",
      tags: ["python", "programación", "fundamentos"],
      slug: "introduccion-programacion-python",
      content: "# Introducción a la Programación con Python\n\nCurso base para aprender los fundamentos de la programación utilizando Python, el lenguaje más accesible para principiantes.\n\n## Descripción\n\nEste curso está diseñado para estudiantes sin experiencia previa en programación. A través de explicaciones claras y ejercicios prácticos, aprenderás los conceptos fundamentales de la programación mientras desarrollas habilidades con Python, un lenguaje versátil y poderoso.\n\n## Instructor\n\n**María Gómez**\n\nIngeniera en Informática con maestría en Ciencias de la Computación. Experiencia de 5 años enseñando programación a nivel universitario y 7 años de experiencia en desarrollo de software.\n\n## Contenido del curso\n\n### Módulo 1: Introducción y configuración\n- ¿Qué es la programación?\n- Instalación de Python y entorno de desarrollo\n- Tu primer programa: \"Hola, mundo\"\n- Uso de la consola interactiva\n\n### Módulo 2: Variables y tipos de datos\n- Creación y uso de variables\n- Tipos de datos: números, strings, booleanos\n- Operaciones básicas\n- Conversión entre tipos de datos\n\n### Módulo 3: Estructuras de control\n- Condicionales (if, else, elif)\n- Bucles (for, while)\n- Control de flujo (break, continue)\n- Manejo de excepciones básico\n\n### Módulo 4: Funciones\n- Definición y llamada de funciones\n- Parámetros y argumentos\n- Retorno de valores\n- Alcance de variables\n\n### Módulo 5: Estructuras de datos\n- Listas y operaciones\n- Tuplas\n- Diccionarios\n- Conjuntos\n\n### Módulo 6: Trabajando con archivos\n- Lectura y escritura de archivos\n- Manejo de rutas\n- Formatos comunes (TXT, CSV, JSON)\n\n### Módulo 7: Programación modular\n- Importación de módulos\n- Creación de módulos propios\n- Uso de bibliotecas populares\n\n### Módulo 8: Proyecto final\n- Planificación y diseño\n- Implementación\n- Pruebas y depuración\n- Presentación\n\n## Requisitos\n\n- Computadora con acceso a internet\n- No se requiere experiencia previa en programación\n- Ganas de aprender y practicar\n\n## Metodología\n\n- Clases teórico-prácticas semanales\n- Ejercicios prácticos para cada tema\n- Proyecto integrador incremental\n- Mentoría personalizada\n\n## Evaluación\n\n- Ejercicios prácticos (40%)\n- Participación en clases (10%)\n- Examen de medio término (20%)\n- Proyecto final (30%)\n\n## Certificación\n\nAl completar satisfactoriamente el curso, recibirás un certificado del Club de Programación FIUNA que acredita tus conocimientos en fundamentos de programación con Python."
    },
    {
      id: "2",
      title: "Desarrollo Web Frontend",
      description: "Aprende a crear interfaces de usuario modernas e interactivas utilizando HTML, CSS y JavaScript, junto con frameworks como React.",
      level: "Intermedio",
      duration: "10 semanas",
      instructor: "Juan Pérez",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1738&q=80",
      tags: ["html", "css", "javascript", "react", "frontend"],
      slug: "desarrollo-web-frontend",
      content: "# Desarrollo Web Frontend\n\nAprende a crear interfaces de usuario modernas e interactivas utilizando HTML, CSS y JavaScript, junto con frameworks como React.\n\n## Descripción\n\nEste curso te proporcionará las habilidades necesarias para convertirte en un desarrollador frontend. Aprenderás a construir interfaces web atractivas, responsivas y funcionales utilizando tecnologías modernas y las mejores prácticas de la industria.\n\n## Instructor\n\n**Juan Pérez**\n\nDesarrollador web con más de 8 años de experiencia en frontend. Ha trabajado en proyectos para empresas como Microsoft y Globant. Contribuidor activo en proyectos open source y mentor en bootcamps de programación.\n\n## Contenido del curso\n\n### Módulo 1: Fundamentos de HTML5\n- Estructura y semántica HTML\n- Formularios y validación\n- Elementos multimedia\n- SEO básico y accesibilidad\n\n### Módulo 2: CSS moderno\n- Selectores y especificidad\n- Box model y layout\n- Flexbox y Grid\n- Transiciones y animaciones\n- Responsive design\n\n### Módulo 3: JavaScript esencial\n- Sintaxis y tipos de datos\n- Funciones y scope\n- DOM manipulation\n- Eventos\n- Asincronía (callbacks, promesas, async/await)\n- Fetch API y AJAX\n\n### Módulo 4: Herramientas de desarrollo\n- Git y GitHub\n- npm/yarn\n- Webpack\n- ESLint y Prettier\n- Chrome DevTools\n\n### Módulo 5: React fundamentos\n- JSX\n- Componentes y props\n- Estado y ciclo de vida\n- Eventos en React\n- Renderizado condicional y listas\n\n### Módulo 6: React avanzado\n- Hooks (useState, useEffect, useContext, etc.)\n- Manejo de formularios\n- React Router\n- Optimización de rendimiento\n\n### Módulo 7: Styling en React\n- CSS Modules\n- Styled Components\n- Tailwind CSS\n\n### Módulo 8: Gestión de estado\n- Context API\n- Redux básico\n- Introducción a React Query\n\n### Módulo 9: Testing\n- Jest\n- React Testing Library\n- Pruebas unitarias y de integración\n\n### Módulo 10: Proyecto final\n- Diseño y planificación\n- Implementación\n- Despliegue (Vercel/Netlify)\n- Presentación\n\n## Requisitos\n\n- Conocimientos básicos de programación\n- Computadora con acceso a internet\n- Conocimiento básico de HTML y CSS (recomendado)\n\n## Metodología\n\n- Clases en vivo semanales\n- Materiales y recursos adicionales\n- Proyectos prácticos incrementales\n- Revisión de código y feedback personalizado\n\n## Evaluación\n\n- Mini-proyectos (30%)\n- Participación y ejercicios (20%)\n- Examen de medio término (15%)\n- Proyecto final (35%)\n\n## Certificación\n\nAl completar satisfactoriamente el curso, recibirás un certificado del Club de Programación FIUNA que acredita tus conocimientos en desarrollo web frontend."
    },
    {
      id: "3",
      title: "Ciencia de Datos con Python",
      description: "Aprende a extraer conocimiento y valor de datos utilizando bibliotecas como Pandas, NumPy, Matplotlib y Scikit-learn.",
      level: "Intermedio-Avanzado",
      duration: "12 semanas",
      instructor: "Carlos Benítez",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      tags: ["python", "data science", "pandas", "numpy", "scikit-learn"],
      slug: "ciencia-datos-python",
      content: "# Ciencia de Datos con Python\n\nAprende a extraer conocimiento y valor de datos utilizando bibliotecas como Pandas, NumPy, Matplotlib y Scikit-learn.\n\n## Descripción\n\nEste curso intensivo te proporcionará las habilidades necesarias para analizar datos, crear visualizaciones efectivas y construir modelos predictivos. Ideal para estudiantes con conocimientos básicos de Python que deseen especializarse en el campo de la ciencia de datos.\n\n## Instructor\n\n**Carlos Benítez**\n\nDoctor en Ciencias de la Computación con especialización en Machine Learning. Investigador asociado en el área de Data Science con más de 20 publicaciones académicas. Ha liderado proyectos de análisis de datos para diversas industrias.\n\n## Contenido del curso\n\n### Módulo 1: Introducción a la ciencia de datos\n- ¿Qué es la ciencia de datos?\n- El proceso de análisis de datos\n- Configuración del entorno de trabajo (Anaconda, Jupyter)\n- Repaso de Python para ciencia de datos\n\n### Módulo 2: Manipulación de datos con NumPy\n- Arrays y operaciones\n- Indexación y slicing\n- Broadcasting\n- Funciones universales\n- Algebra lineal básica\n\n### Módulo 3: Análisis de datos con Pandas\n- Series y DataFrames\n- Lectura y escritura de datos\n- Limpieza y transformación\n- Agregación y agrupación\n- Operaciones con series temporales\n\n### Módulo 4: Visualización de datos\n- Matplotlib fundamentos\n- Visualizaciones con Seaborn\n- Visualizaciones interactivas con Plotly\n- Principios de visualización efectiva\n\n### Módulo 5: Estadística para ciencia de datos\n- Estadística descriptiva\n- Distribuciones de probabilidad\n- Inferencia estadística\n- Correlación y causalidad\n- Tests de hipótesis\n\n### Módulo 6: Procesamiento y preparación de datos\n- Datos faltantes\n- Detección y tratamiento de outliers\n- Encoding de variables categóricas\n- Normalización y estandarización\n- Feature engineering\n\n### Módulo 7: Machine Learning - Aprendizaje supervisado\n- Regresión lineal y logística\n- Árboles de decisión y random forests\n- Support Vector Machines\n- Evaluación de modelos y validación cruzada\n- Ajuste de hiperparámetros\n\n### Módulo 8: Machine Learning - Aprendizaje no supervisado\n- Clustering (K-means, DBSCAN, jerárquico)\n- Análisis de componentes principales (PCA)\n- Detección de anomalías\n- Reducción de dimensionalidad\n\n### Módulo 9: Introducción a Deep Learning\n- Redes neuronales artificiales\n- TensorFlow y Keras\n- Redes convolucionales básicas\n- Transfer learning\n\n### Módulo 10: Comunicación de resultados\n- Storytelling con datos\n- Creación de dashboards\n- Reportes técnicos y presentaciones\n- Ética en ciencia de datos\n\n### Módulos 11-12: Proyecto final\n- Definición del problema\n- Recolección y preparación de datos\n- Implementación de modelos\n- Evaluación y optimización\n- Presentación de resultados\n\n## Requisitos\n\n- Conocimientos básicos de Python\n- Fundamentos de estadística (recomendado)\n- Computadora con mínimo 8GB de RAM\n\n## Metodología\n\n- Clases teórico-prácticas\n- Notebooks con ejercicios guiados\n- Retos semanales de análisis\n- Proyecto integrador incremental\n- Sesiones de mentoría personalizada\n\n## Evaluación\n\n- Ejercicios prácticos (25%)\n- Retos de análisis (25%)\n- Examen de medio término (15%)\n- Proyecto final (35%)\n\n## Certificación\n\nAl completar satisfactoriamente el curso, recibirás un certificado del Club de Programación FIUNA que acredita tus conocimientos en ciencia de datos con Python."
    }
  ];
}
