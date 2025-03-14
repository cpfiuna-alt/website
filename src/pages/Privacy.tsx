
import Layout from "@/components/layout/Layout";
import { ArrowLeft, ShieldCheck, User, Database, Share2, Lock, FileWarning, Settings, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 lg:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="text-sm text-primary flex items-center hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al inicio
            </Link>
          </div>
          
          <div className="mb-12 text-center">
            <ShieldCheck className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cómo recopilamos, utilizamos y protegemos tu información
            </p>
            <div className="mt-4 text-sm">
              <span className="text-muted-foreground">Última actualización:</span> 1 de Mayo de 2023
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Introducción</h2>
              </div>
              <p>
                El Club de Programación FIUNA ("nosotros", "nuestro" o "CPF") se compromete a proteger 
                la privacidad de los datos personales que recopilamos de nuestros miembros, 
                visitantes y colaboradores. Esta Política de Privacidad explica cómo recopilamos, 
                utilizamos, compartimos y protegemos su información cuando interactúa con nuestro sitio web, 
                participa en nuestros eventos o se une a nuestra comunidad.
              </p>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Información que recopilamos</h2>
              </div>
              <p>Podemos recopilar los siguientes tipos de información:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Información de contacto
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Nombre, dirección de correo electrónico, número de teléfono, dirección postal.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Información académica
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Carrera, semestre, número de matrícula (cuando sea relevante).
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Información de perfil
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Fotografía, biografía, intereses, habilidades.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Información de uso
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Datos sobre cómo utiliza nuestro sitio web, como páginas visitadas y tiempo de permanencia.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Comunicaciones
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Mensajes que nos envía a través de formularios de contacto o correo electrónico.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Cómo utilizamos su información</h2>
              </div>
              <p>Utilizamos la información recopilada para:</p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Gestionar su membresía y participación en el club.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Comunicarnos con usted sobre eventos, actividades y oportunidades.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mejorar nuestro sitio web y los servicios que ofrecemos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Enviar boletines informativos y actualizaciones (si ha dado su consentimiento).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Administrar eventos y programas de formación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Cumplir con obligaciones legales y resolver disputas.</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Share2 className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Compartición de información</h2>
              </div>
              <p className="mb-4">
                No vendemos ni alquilamos su información personal a terceros. Podemos compartir información con:
              </p>
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Proveedores de servicios</h3>
                  <p className="text-sm text-muted-foreground">
                    Terceros que nos ayudan a operar nuestro sitio web, gestionar eventos o proporcionar otros servicios.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Patrocinadores</h3>
                  <p className="text-sm text-muted-foreground">
                    Con su consentimiento explícito, podemos compartir información básica con los patrocinadores de eventos.
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Autoridades</h3>
                  <p className="text-sm text-muted-foreground">
                    Cuando sea requerido por ley o para proteger nuestros derechos legales.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="h-5 w-5 text-primary flex-shrink-0" />
                  <h2 className="text-xl font-semibold m-0">Seguridad de la información</h2>
                </div>
                <p className="text-sm">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal 
                  contra acceso no autorizado, pérdida, alteración o destrucción. Sin embargo, ninguna transmisión 
                  por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar seguridad absoluta.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="h-5 w-5 text-primary flex-shrink-0" />
                  <h2 className="text-xl font-semibold m-0">Sus derechos</h2>
                </div>
                <p className="text-sm mb-2">Usted tiene derecho a:</p>
                <ul className="text-sm space-y-1">
                  <li>• Acceder a su información personal</li>
                  <li>• Corregir datos inexactos</li>
                  <li>• Solicitar la eliminación de sus datos</li>
                  <li>• Oponerse al procesamiento</li>
                  <li>• Retirar su consentimiento</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-5 w-5 text-primary flex-shrink-0" />
                  <h2 className="text-xl font-semibold m-0">Cookies y tecnologías</h2>
                </div>
                <p className="text-sm">
                  Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, 
                  analizar el tráfico y personalizar el contenido. Puede controlar las cookies a través 
                  de la configuración de su navegador.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileWarning className="h-5 w-5 text-primary flex-shrink-0" />
                  <h2 className="text-xl font-semibold m-0">Enlaces a sitios de terceros</h2>
                </div>
                <p className="text-sm">
                  Nuestro sitio web puede contener enlaces a otros sitios web. No somos responsables 
                  de las prácticas de privacidad de esos sitios y le recomendamos revisar sus políticas de privacidad.
                </p>
              </div>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Contacto</h2>
              </div>
              <p>
                Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos en:
              </p>
              <div className="mt-4 bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="font-medium">
                  Club de Programación FIUNA
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:privacidad@cpf.com.py" className="text-primary hover:underline">
                    privacidad@cpf.com.py
                  </a>
                </p>
                <p className="mt-2">
                  <span className="text-muted-foreground">Dirección:</span> Campus Universitario UNA, San Lorenzo, Paraguay
                </p>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-8 border-t border-border pt-6">
              <h3 className="font-semibold mb-2">Cambios a esta política</h3>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. La versión más reciente 
                estará siempre disponible en nuestro sitio web, y las modificaciones significativas 
                serán notificadas a través de nuestros canales habituales de comunicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
