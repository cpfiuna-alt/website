
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Routes, Route, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Book, File, Code, Server, Database, Search, ExternalLink, ChevronDown, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample documentation data
const docsCategories = [
  {
    title: "Guías",
    icon: Book,
    items: [
      { title: "Introducción", slug: "introduction" },
      { title: "Primeros pasos", slug: "getting-started" },
      { title: "Instalación", slug: "installation" },
      { title: "Configuración", slug: "configuration" }
    ]
  },
  {
    title: "APIs",
    icon: Server,
    items: [
      { title: "REST API", slug: "rest-api" },
      { title: "Autenticación", slug: "authentication" },
      { title: "Endpoints", slug: "endpoints" },
      { title: "Manejo de errores", slug: "error-handling" }
    ]
  },
  {
    title: "SDKs",
    icon: Code,
    items: [
      { title: "JavaScript", slug: "javascript-sdk" },
      { title: "Python", slug: "python-sdk" },
      { title: "Java", slug: "java-sdk" },
      { title: "Go", slug: "go-sdk" }
    ]
  },
  {
    title: "Referencia",
    icon: File,
    items: [
      { title: "CLI", slug: "cli-reference" },
      { title: "Modelos de datos", slug: "data-models" },
      { title: "Webhooks", slug: "webhooks" },
      { title: "Límites y cuotas", slug: "limits-quotas" }
    ]
  },
  {
    title: "Recursos",
    icon: Database,
    items: [
      { title: "Ejemplos de código", slug: "code-examples" },
      { title: "Tutoriales", slug: "tutorials" },
      { title: "Mejores prácticas", slug: "best-practices" },
      { title: "Preguntas frecuentes", slug: "faq" }
    ]
  }
];

// Default documentation content component
const DocsHome = () => (
  <div className="prose prose-lg dark:prose-invert max-w-none">
    <h1>Documentación CPF</h1>
    <p>
      Bienvenido a la documentación del Club de Programación FIUNA. Acá encontrarás
      guías detalladas, referencias de API y recursos para todos los proyectos y
      herramientas desarrollados por el club.
    </p>
    
    <h2>Proyectos destacados</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mt-6">
      {[
        {
          title: "Bot Discord CPF",
          description: "Bot de Discord para la gestión de la comunidad del Club de Programación FIUNA.",
          icon: "🤖",
          slug: "discord-bot"
        },
        {
          title: "API de Competencias",
          description: "API para gestionar competencias de programación y rankings de participantes.",
          icon: "🏆",
          slug: "competitions-api"
        },
        {
          title: "Portal de Recursos",
          description: "Sistema de gestión de recursos educativos para miembros del club.",
          icon: "📚",
          slug: "resources-portal"
        },
        {
          title: "Plataforma de Eventos",
          description: "Sistema para la gestión y difusión de eventos organizados por el club.",
          icon: "📅",
          slug: "events-platform"
        }
      ].map((project) => (
        <Link 
          key={project.slug}
          to={`/docs/${project.slug}`}
          className="glass-card p-6 hover:shadow-neon-blue transition-all group no-underline"
        >
          <div className="flex items-start">
            <div className="text-3xl mr-4">{project.icon}</div>
            <div>
              <h3 className="text-lg font-medium group-hover:text-primary transition-colors m-0">
                {project.title}
              </h3>
              <p className="text-muted-foreground mt-1 mb-0">{project.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
    
    <h2>Guías rápidas</h2>
    <ul>
      <li><Link to="/docs/getting-started">Primeros pasos</Link></li>
      <li><Link to="/docs/installation">Guía de instalación</Link></li>
      <li><Link to="/docs/code-examples">Ejemplos de código</Link></li>
      <li><Link to="/docs/best-practices">Mejores prácticas</Link></li>
    </ul>
    
    <h2>¿Necesitás ayuda?</h2>
    <p>
      Si no encontrás lo que buscás en la documentación, podés:
    </p>
    <ul>
      <li>Unirte a nuestro <a href="#" className="inline-flex items-center">servidor de Discord <ExternalLink className="h-3 w-3 ml-1" /></a></li>
      <li>Crear un issue en nuestro <a href="#" className="inline-flex items-center">repositorio de GitHub <ExternalLink className="h-3 w-3 ml-1" /></a></li>
      <li>Contactarnos a través de nuestro <Link to="/contact">formulario de contacto</Link></li>
    </ul>
    
    <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg mt-8">
      <h3>¿Querés contribuir a la documentación?</h3>
      <p>
        Todas nuestras documentaciones están disponibles en GitHub y aceptamos contribuciones.
        Aprendé cómo podes ayudar a mejorar nuestra documentación.
      </p>
      <Button variant="outline" className="mt-2">
        <ExternalLink className="mr-2 h-4 w-4" />
        Contribuir
      </Button>
    </div>
  </div>
);

// Sample documentation page component with improved content
const DocContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = location.pathname.split('/docs/')[1];
  
  useEffect(() => {
    // Scroll to top when content changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/docs')}
          className="mr-4 p-2 rounded-full hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="m-0">{slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
      </div>
      
      <Tabs defaultValue="guide" className="w-full mb-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="guide">Guía</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="examples">Ejemplos</TabsTrigger>
          <TabsTrigger value="faq">Preguntas frecuentes</TabsTrigger>
        </TabsList>
        <TabsContent value="guide" className="mt-6">
          <p>
            Esta es una guía detallada para <strong>{slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</strong>.
            Aquí encontrarás toda la información necesaria para entender y utilizar esta funcionalidad.
          </p>
          
          <h2>Introducción</h2>
          <p>
            Información general sobre el uso y propósito de la característica o herramienta.
            Esta sección te ayudará a entender por qué esta funcionalidad es importante y cómo
            se integra con el resto del ecosistema.
          </p>
          
          <h2>Instalación</h2>
          <p>
            Instrucciones detalladas para la instalación o configuración.
          </p>
          
          <pre><code>{`
# Ejemplo de código de instalación
npm install @cpfiuna/package
          `}</code></pre>
          
          <h2>Uso básico</h2>
          <p>
            Ejemplos y patrones comunes de uso.
          </p>
          
          <pre><code>{`
// Ejemplo de código de uso
import { something } from '@cpfiuna/package';

const result = something.doSomething();
console.log(result);
          `}</code></pre>
          
          <h2>Configuración avanzada</h2>
          <p>
            Opciones de configuración avanzadas para casos de uso específicos.
          </p>
          
          <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-lg mt-8">
            <h3 className="mt-0">¿Esta documentación te resultó útil?</h3>
            <p className="mb-0">
              Ayudanos a mejorar la documentación con tus comentarios y sugerencias.
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm">
                👍 Sí, me ayudó
              </Button>
              <Button variant="outline" size="sm">
                👎 No, necesita mejorar
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <h2>Referencia de API</h2>
          <p>
            Documentación detallada de todas las funciones, métodos y parámetros disponibles.
          </p>
          
          <h3>Método: <code>doSomething()</code></h3>
          <p>
            Ejecuta una acción específica y retorna el resultado.
          </p>
          <p><strong>Parámetros:</strong></p>
          <ul>
            <li><code>options</code> (Object): Configuración opcional para la operación</li>
          </ul>
          <p><strong>Retorna:</strong></p>
          <ul>
            <li>(Promise): Promesa que resuelve con el resultado de la operación</li>
          </ul>
          
          <h3>Método: <code>anotherMethod()</code></h3>
          <p>
            Realiza otra función importante dentro del sistema.
          </p>
          <p><strong>Parámetros:</strong></p>
          <ul>
            <li><code>param1</code> (String): Primer parámetro</li>
            <li><code>param2</code> (Number): Segundo parámetro</li>
          </ul>
          <p><strong>Retorna:</strong></p>
          <ul>
            <li>(Object): Objeto con el resultado de la operación</li>
          </ul>
        </TabsContent>
        
        <TabsContent value="examples" className="mt-6">
          <h2>Ejemplos prácticos</h2>
          <p>
            Casos de uso reales y ejemplos de código para diferentes escenarios.
          </p>
          
          <h3>Ejemplo básico</h3>
          <pre><code>{`
// Ejemplo básico
import { Client } from '@cpfiuna/package';

const client = new Client({
  apiKey: 'your-api-key'
});

const result = await client.doSomething();
console.log(result);
          `}</code></pre>
          
          <h3>Ejemplo avanzado</h3>
          <pre><code>{`
// Ejemplo avanzado con manejo de errores
import { Client } from '@cpfiuna/package';

async function main() {
  const client = new Client({
    apiKey: 'your-api-key',
    timeout: 5000,
    retries: 3
  });
  
  try {
    const result = await client.doSomething({
      param1: 'value1',
      param2: 123
    });
    
    console.log('Operación exitosa:', result);
    
    // Procesar resultado
    return result.data;
  } catch (error) {
    console.error('Error en la operación:', error.message);
    
    // Manejar diferentes tipos de error
    if (error.code === 'TIMEOUT') {
      // Reintentar o notificar al usuario
    }
    
    throw error;
  }
}

main().catch(console.error);
          `}</code></pre>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <h2>Preguntas frecuentes</h2>
          <p>
            Respuestas a las preguntas más comunes sobre esta característica.
          </p>
          
          <div className="space-y-6">
            <div>
              <h3>¿Cómo puedo solucionar el error X?</h3>
              <p>
                El error X generalmente ocurre cuando se intenta utilizar la función sin los parámetros
                requeridos. Asegúrate de proporcionar todos los parámetros necesarios y verificar
                que tengan el formato correcto.
              </p>
            </div>
            
            <div>
              <h3>¿Es posible utilizar esta funcionalidad con Y?</h3>
              <p>
                Sí, esta funcionalidad es compatible con Y. Solo necesitas configurar el parámetro
                de integración en el objeto de opciones al inicializar el cliente.
              </p>
            </div>
            
            <div>
              <h3>¿Cuál es el límite de solicitudes por minuto?</h3>
              <p>
                El límite actual es de 100 solicitudes por minuto por API key. Si necesitas
                un límite mayor, contacta con nuestro equipo de soporte.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["Guías"]);
  const location = useLocation();
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  useEffect(() => {
    // Set page title based on current documentation section
    const slug = location.pathname.split('/docs/')[1];
    document.title = slug 
      ? `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Documentación CPF` 
      : "Documentación | Club de Programación FIUNA";
  }, [location]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="md:sticky top-24 self-start">
            <div className="glass-card p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar en la documentación..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="glass-card overflow-hidden">
              <ScrollArea className="h-[calc(100vh-220px)]">
                <div className="p-4">
                  <Link 
                    to="/docs"
                    className={`flex items-center text-sm font-medium px-3 py-2 rounded-md mb-2 ${
                      location.pathname === "/docs" 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted"
                    }`}
                  >
                    Inicio de documentación
                  </Link>
                  
                  <div className="space-y-1">
                    {docsCategories.map((category) => (
                      <div key={category.title} className="space-y-1">
                        <button
                          onClick={() => toggleCategory(category.title)}
                          className="flex items-center justify-between w-full text-sm font-medium px-3 py-2 rounded-md hover:bg-muted"
                        >
                          <div className="flex items-center">
                            <category.icon className="h-4 w-4 mr-2 text-primary" />
                            {category.title}
                          </div>
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform ${
                              openCategories.includes(category.title) ? "transform rotate-180" : ""
                            }`} 
                          />
                        </button>
                        
                        {openCategories.includes(category.title) && (
                          <div className="pl-4 space-y-1">
                            {category.items.map((item) => {
                              const isActive = location.pathname === `/docs/${item.slug}`;
                              return (
                                <Link
                                  key={item.slug}
                                  to={`/docs/${item.slug}`}
                                  className={`flex items-center text-sm px-3 py-2 rounded-md ${
                                    isActive 
                                      ? "bg-primary/10 text-primary" 
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                  }`}
                                >
                                  <ChevronRight className="h-3 w-3 mr-2" />
                                  {item.title}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </aside>
          
          {/* Main content */}
          <main className="glass-card p-8">
            <Routes>
              <Route path="/" element={<DocsHome />} />
              <Route path="/:slug" element={<DocContent />} />
              <Route path="/:slug/*" element={<DocContent />} />
            </Routes>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
