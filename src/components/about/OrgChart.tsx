
import React from "react";
import { Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const OrgChart = () => {
  const isMobile = useIsMobile();

  return (
    <div className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
          Nuestra <span className="gradient-text">Estructura</span>
        </h2>
        
        <div className="grid place-items-center">
          {isMobile ? (
            // Diseño móvil - organigrama vertical
            <div className="org-chart-mobile w-full max-w-xs mx-auto">
              {/* Presidente */}
              <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="glass-card p-4 shadow-md mx-auto">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold">Presidente</h3>
                    <p className="text-sm text-muted-foreground">Dirección Ejecutiva</p>
                  </div>
                </div>
                <div className="h-8 w-1 bg-primary/30 mx-auto mt-2"></div>
              </div>
              
              {/* Vicepresidente */}
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="glass-card p-4 shadow-md mx-auto mb-12">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Vicepresidente</h3>
                    <p className="text-xs text-muted-foreground">Coordinación General</p>
                  </div>
                </div>
                <div className="h-8 w-1 bg-primary/30 mx-auto mt-2 mb-8"></div>
              </div>
                
              {/* Secretarías */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="glass-card p-3 shadow-md">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                      <Users className="h-3 w-3" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">Secretaría</h3>
                      <p className="text-xs text-muted-foreground">Administrativa</p>
                    </div>
                  </div>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <div className="glass-card p-3 shadow-md">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                      <Users className="h-3 w-3" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">Secretaría</h3>
                      <p className="text-xs text-muted-foreground">Proyectos</p>
                    </div>
                  </div>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <div className="glass-card p-3 shadow-md">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                      <Users className="h-3 w-3" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">Secretaría</h3>
                      <p className="text-xs text-muted-foreground">Comunicación</p>
                    </div>
                  </div>
                </div>
                
                <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <div className="glass-card p-3 shadow-md">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                      <Users className="h-3 w-3" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-sm">Secretaría</h3>
                      <p className="text-xs text-muted-foreground">Eventos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Diseño escritorio - organigrama jerárquico
            <div className="org-chart-container relative">
              {/* Presidente */}
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="org-chart-content glass-card p-4 w-56">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold">Presidente</h3>
                    <p className="text-sm text-muted-foreground">Dirección Ejecutiva</p>
                  </div>
                </div>
                
                {/* Connector from President to VP */}
                <div className="h-12 w-0.5 bg-primary/50 my-2"></div>
                
                {/* Vicepresidente */}
                <div className="org-chart-content glass-card p-4 w-56 mb-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">Vicepresidente</h3>
                    <p className="text-xs text-muted-foreground">Coordinación General</p>
                  </div>
                </div>
                
                {/* Connector from VP to Secretaries */}
                <div className="h-12 w-0.5 bg-primary/50 mb-2"></div>
                
                {/* Horizontal line for secretaries */}
                <div className="absolute w-full h-0.5 bg-primary/30" style={{ top: "calc(100% - 120px)" }}></div>
              </div>
              
              {/* Secretaries Level */}
              <div className="flex justify-center gap-6 mt-4">
                {/* Secretary positions with connectors */}
                <div className="relative mt-8">
                  {/* Vertical connectors to each secretary */}
                  <div className="absolute left-[80px] -top-8 h-8 w-0.5 bg-primary/50"></div>
                  <div className="absolute left-[250px] -top-8 h-8 w-0.5 bg-primary/50"></div>
                  <div className="absolute left-[420px] -top-8 h-8 w-0.5 bg-primary/50"></div>
                  <div className="absolute left-[590px] -top-8 h-8 w-0.5 bg-primary/50"></div>
                  
                  {/* Secretary cards */}
                  <div className="flex gap-12">
                    <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <div className="glass-card p-3 w-40">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                          <Users className="h-3 w-3" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm">Secretaría</h3>
                          <p className="text-xs text-muted-foreground">Administrativa</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <div className="glass-card p-3 w-40">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                          <Users className="h-3 w-3" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm">Secretaría</h3>
                          <p className="text-xs text-muted-foreground">Proyectos</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="glass-card p-3 w-40">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                          <Users className="h-3 w-3" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm">Secretaría</h3>
                          <p className="text-xs text-muted-foreground">Comunicación</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                      <div className="glass-card p-3 w-40">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                          <Users className="h-3 w-3" />
                        </div>
                        <div className="text-center">
                          <h3 className="font-semibold text-sm">Secretaría</h3>
                          <p className="text-xs text-muted-foreground">Eventos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgChart;
