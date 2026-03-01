
import React from "react";
import Layout from "@/components/layout/Layout";
import { Download, FileText, Calendar, DollarSign, Trophy, Users, Briefcase, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  annualReports, 
  getCurrentYearFinancialData, 
  getCurrentYearProjects,
  hasAnyData,
  type FinancialData 
} from "@/data/transparencyData";

const Transparency = () => {
  const currentFinancialData = getCurrentYearFinancialData();
  const currentProjects = getCurrentYearProjects();

  const renderProgressBar = (percentage: number) => (
    <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{width: `${percentage}%`}}></div>
    </div>
  );

  const renderFinancialSection = (title: string, data: Record<string, number>) => (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-primary" />
        <span>{title}</span>
      </h3>
      
      <div className="space-y-4">
        {Object.entries(data).map(([key, value]) => {
          const label = key === 'universityContribution' ? 'Aportes de la Universidad' :
                       key === 'corporateSponsorship' ? 'Patrocinios de empresas' :
                       key === 'ownActivities' ? 'Actividades propias' :
                       key === 'donations' ? 'Donaciones' :
                       key === 'eventsAndActivities' ? 'Eventos y actividades' :
                       key === 'competitions' ? 'Competencias' :
                       key === 'projectDevelopment' ? 'Desarrollo de proyectos' :
                       key === 'equipment' ? 'Equipamiento' :
                       key === 'administration' ? 'Administración' : key;
          
          return (
            <div key={key} className="relative pt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span className="font-medium">{value}%</span>
              </div>
              {renderProgressBar(value)}
            </div>
          );
        })}
      </div>
    </div>
  );

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
            {annualReports.length > 0 ? (
              annualReports.map((report) => (
                <div key={report.year} className="glass-card-static p-6 flex flex-col">
                  <div className="mb-4 flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{report.year}</h3>
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
                          {report.members} miembros activos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Calendar className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Eventos</h4>
                        <p className="text-xs text-muted-foreground">
                          {report.events} eventos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Briefcase className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Proyectos</h4>
                        <p className="text-xs text-muted-foreground">
                          {report.projects} proyectos
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Trophy className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium">Competencias</h4>
                        <p className="text-xs text-muted-foreground">
                          {report.competitions} participaciones
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <a 
                    href={`https://assets.cpfiuna.io/website/public/documentos/reportes/cpf-informe-anual-${report.year}.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-muted/30 hover:bg-muted/50 text-sm transition-colors hover:shadow-neon-blue"
                  >
                    <Download className="h-4 w-4" />
                    <span>Descargar informe completo</span>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 text-center py-12">
                <div className="glass-card-static p-8">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Próximamente</h3>
                  <p className="text-muted-foreground">
                    Estamos trabajando en nuestro primer informe anual. Será publicado una vez completado 
                    nuestro primer año de actividades como club.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Gestión de Recursos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center mb-10">
              Detalle sobre la administración de los recursos económicos del club para el año {currentFinancialData ? currentFinancialData.year : new Date().getFullYear()} hasta la fecha, incluyendo fuentes de financiamiento y distribución de gastos.
            </p>
            
            <div className="glass-card-static p-8">
              {currentFinancialData ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {renderFinancialSection(`Financiamiento ${currentFinancialData.year}`, currentFinancialData.funding)}
                    {renderFinancialSection("Destino de los recursos", currentFinancialData.expenses)}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button variant="outline" className="rounded-full hover:shadow-neon-blue transition-all">
                      <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTua7e_idVLyjmvLsYDC7LVuN02HcwZR8ZSrX-96bbVkfWVp7egjNgBaWMdVGJiQW-jXM2DG3wqonyh/pubhtml" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Informe financiero detallado</span>
                      </a>
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Información financiera próximamente</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Los detalles sobre la gestión de recursos estarán disponibles una vez que 
                    tengamos actividades financieras que reportar.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Projects and Impact section */}
          <div className="glass-card-static p-8 mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center">Proyectos</h3>
            
            {currentProjects && currentProjects.projects.length > 0 ? (
              <>
                <div className="space-y-6">
                  {currentProjects.projects.map((project, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="text-lg font-medium mb-2">{project.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      {/* Presentación mínima: solo título y descripción (métricas removidas) */}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Button className="rounded-full px-6 py-3 hover:shadow-neon-blue transition-all">
                    <a href="/proyectos" className="flex items-center gap-2 text-primary-foreground">
                      <Lightbulb className="h-5 w-5" />
                      <span>Ver todos los proyectos</span>
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Proyectos en desarrollo</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Estamos trabajando en proyectos que generen impacto positivo en la comunidad. 
                  Los resultados serán documentados aquí conforme se completen.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Transparency;
