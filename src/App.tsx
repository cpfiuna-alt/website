import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navigate } from 'react-router-dom';

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
const Admission = lazy(() => import('./pages/Admission'));
const NotFound = lazy(() => import('./pages/NotFound'));

import { siteConfig, featureFlags } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { hasCookieConsent } from "@/lib/consent";

const queryClient = new QueryClient();

const App = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check consent on client
    setConsentGiven(hasCookieConsent());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
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
                {featureFlags.admissionForm.enabled && (
                  <Route path="/admision" element={<Admission />} />
                )}
                <Route path="/privacidad" element={<Privacy />} />
                <Route path="/codigo-de-conducta" element={<CodeOfConduct />} />
                <Route path="/kit-de-medios" element={<MediaKit />} />
                <Route path="/prensa" element={<Press />} />
                <Route path="/transparencia" element={<Transparency />} />
                <Route path="/estatuto" element={<Estatuto />} />
                <Route path="/reglamento" element={<Reglamento />} />
                <Route path="/comunidad" element={<Community />} />
                <Route path="/docs/*" element={<Documentation />} />
                {/* Backwards-compatible redirect from old path */}
                <Route path="/documentacion/*" element={<Navigate to="/docs" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
      {import.meta.env.PROD && consentGiven && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </QueryClientProvider>
  );
};

export default App;
