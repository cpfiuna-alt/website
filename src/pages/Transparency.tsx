
import React from "react";
import Layout from "@/components/layout/Layout";
import { Download, FileText, Calendar, DollarSign, Trophy, Users, Briefcase, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const Transparency = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Transparencia</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Información detallada sobre nuestras actividades, proyectos, competencias y gestión de recursos.
            </p>
          </div>
        </div>
      </section>

      {/* Annual reports */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Informes Anuales</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center">
              Cada año publicamos un informe detallado sobre nuestras actividades, logros y gestión 
              financiera para mantener la transparencia con la comunidad universitaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[2023, 2022, 2021].map((year) => (
              <div key={year} className="glass-card-static p-6 flex flex-col">
                <div className="mb-4 flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{year}</h3>
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                    Informe Anual
                  </span>
                </div>
                
                <div className="flex-grow space-y-4 mb-6">
                  <div className="flex gap-3">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">Participación</h4>
                      <p className="text-xs text-muted-foreground">
                        {year === 2023 ? '145 miembros activos' : 
                         year === 2022 ? '120 miembros activos' : 
                         '95 miembros activos'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">Eventos</h4>
                      <p className="text-xs text-muted-foreground">
                        {year === 2023 ? '12 eventos organizados' : 
                         year === 2022 ? '10 eventos organizados' : 
                         '8 eventos organizados'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Briefcase className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">Proyectos</h4>
                      <p className="text-xs text-muted-foreground">
                        {year === 2023 ? '8 proyectos completados' : 
                         year === 2022 ? '6 proyectos completados' : 
                         '4 proyectos completados'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Trophy className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium">Competencias</h4>
                      <p className="text-xs text-muted-foreground">
                        {year === 2023 ? '5 participaciones' : 
                         year === 2022 ? '4 participaciones' : 
                         '3 participaciones'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <a 
                  href={`/reports/annual-report-${year}.pdf`}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-muted/30 hover:bg-muted/50 text-sm transition-colors hover:shadow-neon-blue"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar informe completo</span>
                </a>
              </div>
            ))}
          </div>
          
          {/* Financial information */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Gestión de Recursos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-10">
              Detalle sobre la administración de los recursos económicos del club, 
              incluyendo fuentes de financiamiento y distribución de gastos.
            </p>
            
            <div className="glass-card-static p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Financiamiento 2023</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aportes de la Universidad</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Patrocinios de empresas</span>
                        <span className="font-medium">30%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '30%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Actividades propias</span>
                        <span className="font-medium">15%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '15%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Donaciones</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '10%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span>Destino de los recursos</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Eventos y actividades</span>
                        <span className="font-medium">40%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '40%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Competencias</span>
                        <span className="font-medium">25%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '25%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Desarrollo de proyectos</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '20%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equipamiento</span>
                        <span className="font-medium">10%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '10%'}}></div>
                      </div>
                    </div>
                    
                    <div className="relative pt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Administración</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{width: '5%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="rounded-full hover:shadow-neon-blue transition-all">
                  <a href="/reports/financial-report-2023.pdf" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Informe financiero detallado</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Projects and Impact section */}
          <div className="glass-card-static p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Proyectos e Impacto</h3>
            
            <div className="space-y-6">
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-lg font-medium mb-2">Programa de Mentorías Tecnológicas</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Conectamos estudiantes con profesionales de la industria para orientación y desarrollo profesional.
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    45 estudiantes beneficiados
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    15 mentores activos
                  </span>
                </div>
              </div>
              
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-lg font-medium mb-2">Plataforma de Recursos Educativos</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Desarrollo de una biblioteca digital de recursos de programación accesible para toda la comunidad universitaria.
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    200+ recursos disponibles
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    500+ usuarios activos
                  </span>
                </div>
              </div>
              
              <div className="border-l-2 border-primary pl-4">
                <h4 className="text-lg font-medium mb-2">Hackathon por una Educación Inclusiva</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Evento de desarrollo de soluciones tecnológicas para mejorar la accesibilidad en la educación.
                </p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    12 proyectos desarrollados
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    3 implementados en escuelas
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="rounded-full px-6 py-3 hover:shadow-neon-blue transition-all">
                <a href="/proyectos" className="flex items-center gap-2 text-primary-foreground">
                  <Lightbulb className="h-5 w-5" />
                  <span>Ver todos los proyectos</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transparency;
