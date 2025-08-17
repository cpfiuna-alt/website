import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import React, { Suspense, lazy } from 'react';

const Index = lazy(() => import('./pages/Index'));
const About = lazy(() => import('./pages/About'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const Logros = lazy(() => import('./pages/Logros'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Resources = lazy(() => import('./pages/Resources'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const CodeOfConduct = lazy(() => import('./pages/CodeOfConduct'));
const MediaKit = lazy(() => import('./pages/MediaKit'));
const Press = lazy(() => import('./pages/Press'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Estatuto = lazy(() => import('./pages/Estatuto'));
const Reglamento = lazy(() => import('./pages/Reglamento'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Community = lazy(() => import('./pages/Community'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className='w-full h-screen flex items-center justify-center text-muted-foreground'>Cargando...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/eventos/:slug" element={<EventDetail />} />
              <Route path="/logros" element={<Logros />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/proyectos/:slug" element={<ProjectDetail />} />
              <Route path="/recursos" element={<Resources />} />
              <Route path="/curso/:slug" element={<CourseDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/codigo-de-conducta" element={<CodeOfConduct />} />
              <Route path="/kit-de-medios" element={<MediaKit />} />
              <Route path="/prensa" element={<Press />} />
              <Route path="/transparencia" element={<Transparency />} />
              <Route path="/estatuto" element={<Estatuto />} />
              <Route path="/reglamento" element={<Reglamento />} />
              <Route path="/comunidad" element={<Community />} />
              <Route path="/documentacion/*" element={<Documentation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
