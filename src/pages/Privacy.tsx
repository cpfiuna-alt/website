import React from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft, Mail, MapPin } from "lucide-react";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 lg:py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-0">
            <Link to="/" className="text-sm text-primary flex items-center hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Volver al inicio
            </Link>
          </div>

          <div className="text-center mb-10">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Política de <span className="gradient-text">Privacidad</span></h1>
            <p className="text-lg text-muted-foreground">
              Cómo recopilamos, utilizamos y protegemos tu información
            </p>
            <div className="mt-4 text-sm">
              <span className="text-muted-foreground">Última actualización:</span> 10 de Mayo de 2025
            </div>
          </div>

          <div className="space-y-8">
            {/* Introduction section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">1.</span> Introducción
              </h2>
              <p className="text-muted-foreground">
                El Club de Programación FIUNA ("nosotros", "nuestro" o "CPF") se compromete a proteger la privacidad de
                los datos personales que recopilamos de nuestros miembros, visitantes y colaboradores. Esta Política de
                Privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos su información cuando
                interactúa con nuestro sitio web, participa en nuestros eventos o se une a nuestra comunidad.
              </p>
            </div>

            {/* Information we collect section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">2.</span> Información que recopilamos
              </h2>
              <p className="text-muted-foreground mb-4">
                Podemos recopilar los siguientes tipos de información:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <h3 className="text-md font-medium mb-2" style={{ color: "#3b7fed" }}>Información de contacto</h3>
                  <p className="text-sm text-muted-foreground">
                    Nombre, dirección de correo electrónico.
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="text-md font-medium mb-2" style={{ color: "#3b7fed" }}>Información académica</h3>
                  <p className="text-sm text-muted-foreground">
                    Carrera, casa de estudios y unidad académica (cuando sea relevante).
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="text-md font-medium mb-2" style={{ color: "#3b7fed" }}>Información de uso</h3>
                  <p className="text-sm text-muted-foreground">
                    Datos sobre cómo utiliza nuestro sitio web, como páginas visitadas y tiempo de permanencia.
                  </p>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h3 className="text-md font-medium mb-2" style={{ color: "#3b7fed" }}>Comunicaciones</h3>
                  <p className="text-sm text-muted-foreground">
                    Mensajes que nos envía a través de formularios de contacto o correo electrónico.
                  </p>
                </div>
              </div>
            </div>

            {/* How we use information section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">3.</span> Cómo utilizamos su información
              </h2>
              <p className="text-muted-foreground mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Gestionar su membresía y participación en el club.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Comunicarnos con usted sobre eventos, actividades y oportunidades.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Mejorar nuestro sitio web y los servicios que ofrecemos.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Enviar boletines informativos y actualizaciones (si ha dado su consentimiento).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Administrar eventos y programas de formación.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Cumplir con obligaciones legales y resolver disputas.</span>
                </li>
              </ul>
            </div>

            {/* Information sharing section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">4.</span> Compartición de información
              </h2>
              <p className="text-muted-foreground mb-4">
                No vendemos ni alquilamos su información personal a terceros.
              </p>
            </div>

            {/* Security section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">5.</span> Seguridad de la información
              </h2>
              <p className="text-muted-foreground mb-4">
                Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida, alteración o destrucción. Sin embargo, ninguna transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar seguridad absoluta.
              </p>
            </div>
            
            {/* Rights section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">6.</span> Sus derechos
              </h2>
              <p className="text-muted-foreground mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="space-y-1">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Acceder a su información personal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Corregir datos inexactos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Solicitar la eliminación de sus datos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Oponerse al procesamiento</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Retirar su consentimiento</span>
                </li>
              </ul>
            </div>

            {/* Cookies section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">7.</span> Cookies y tecnologías
              </h2>
              <p className="text-muted-foreground">
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia, analizar el tráfico y personalizar el contenido. Puede controlar las cookies a través de la configuración de su navegador.
              </p>
            </div>
            
            {/* Third-party links section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="text-primary mr-2">8.</span> Enlaces a sitios de terceros
              </h2>
              <p className="text-muted-foreground">
                Nuestro sitio web puede contener enlaces a otros sitios web. No somos responsables de las prácticas de privacidad de esos sitios y le recomendamos revisar sus políticas de privacidad.
              </p>
            </div>

            {/* Contact section */}
            <div className="glass-card-static p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
              <span className="text-primary mr-2">9.</span> Contacto
              </h2>
              <p className="text-muted-foreground mb-4">
              Si tiene preguntas o inquietudes sobre esta Política de Privacidad, puede contactarnos en:
              </p>
              
              <div className="mt-6 bg-primary/10 p-4 rounded-lg border border-primary/20">
              <h3 className="text-md font-medium mb-2 text-muted-foreground">Club de Programación FIUNA</h3>
              <p className="flex items-center text-sm text-muted-foreground mb-2">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <a href="mailto:clubdeprogramacion@ing.una.py" className="hover:underline text-primary">
                clubdeprogramacion@ing.una.py
                </a>
              </p>
                <p className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  Dirección: Campus Universitario UNA, San Lorenzo, Paraguay
                </p>
              </div>
            </div>

            {/* Changes section */}
            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-4">Cambios a esta política</h2>
              <p className="text-muted-foreground">
                Podemos actualizar esta Política de Privacidad ocasionalmente. La versión más reciente estará siempre disponible en nuestro sitio web, y las modificaciones significativas serán notificadas a través de nuestros canales habituales de comunicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
