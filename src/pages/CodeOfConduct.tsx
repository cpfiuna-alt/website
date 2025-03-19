
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Shield, Users, Heart, Gavel, Megaphone, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const CodeOfConduct = () => {
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
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Código de <span className="text-gradient">Conducta</span></h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guía para mantener un ambiente inclusivo, respetuoso y colaborativo en nuestra comunidad
            </p>
            <div className="mt-4 text-sm">
              <span className="text-muted-foreground">Última actualización:</span> 1 de Mayo de 2023
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Propósito</h2>
              </div>
              <p>
                El propósito de este Código de Conducta es establecer un ambiente inclusivo, 
                respetuoso y colaborativo para todos los miembros y participantes del Club de 
                Programación FIUNA. Queremos que todas las actividades, eventos, y espacios 
                digitales del club sean experiencias positivas y libres de acoso para todos, 
                independientemente de su género, orientación sexual, habilidad, etnia, nivel 
                socioeconómico o religión.
              </p>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Alcance</h2>
              </div>
              <p>
                Este Código de Conducta aplica a todos los miembros, colaboradores, mentores, 
                directivos y participantes en cualquier actividad organizada por el Club de 
                Programación FIUNA, incluyendo:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>Reuniones presenciales y virtuales</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>Eventos, talleres y hackathons</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>Espacios de colaboración en línea</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>Comunicaciones en redes sociales</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span>Proyectos desarrollados por el club</li>
              </ul>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Nuestros Estándares</h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Comportamientos que contribuyen a crear un ambiente positivo:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Uso de lenguaje acogedor e inclusivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Respeto a diferentes puntos de vista y experiencias</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Aceptación de críticas constructivas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Enfoque en lo que es mejor para la comunidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Mostrar empatía hacia otros miembros de la comunidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-green-500 flex-shrink-0">✓</span>
                    <span>Colaborar y compartir conocimientos</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Comportamientos inaceptables:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Uso de lenguaje o imágenes sexualizadas y atención o avances sexuales no deseados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Comentarios insultantes/despectivos y ataques personales o políticos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Acoso público o privado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Publicar información privada de otros sin permiso explícito</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Plagio y apropiación del trabajo de otros</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Conducta inapropiada en un entorno profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 text-red-500 flex-shrink-0">✗</span>
                    <span>Discriminación en cualquier forma</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Gavel className="h-5 w-5 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-semibold m-0">Responsabilidades y Aplicación</h2>
              </div>
              <p>
                Los administradores del proyecto son responsables de aclarar los estándares de 
                comportamiento aceptable y se espera que tomen medidas correctivas apropiadas y 
                justas en respuesta a cualquier caso de comportamiento inaceptable.
              </p>
              <p>
                Los administradores del proyecto tienen el derecho y la responsabilidad de 
                eliminar, editar o rechazar comentarios, commits, código, ediciones de wiki, 
                issues y otras contribuciones que no estén alineadas con este Código de Conducta, 
                o de prohibir temporal o permanentemente a cualquier colaborador por otros 
                comportamientos que consideren inapropiados, amenazantes, ofensivos o dañinos.
              </p>
              <div className="mt-6 bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="font-medium mb-2">
                  Los casos de comportamiento abusivo, acosador o inaceptable pueden ser 
                  informados contactando al equipo del proyecto:
                </p>
                <a 
                  href="mailto:conducta@cpf.com.py" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <Megaphone className="h-4 w-4 mr-1" />
                  conducta@cpf.com.py
                </a>
              </div>
            </div>
            
            <div className="glass-card p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Proceso de Resolución de Conflictos</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-primary/15 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold mb-1">Reporte</h3>
                    <p className="text-muted-foreground">Cualquier miembro puede reportar una violación al código de conducta a los organizadores del club.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/15 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold mb-1">Evaluación</h3>
                    <p className="text-muted-foreground">Los organizadores evaluarán el caso y recopilarán información necesaria.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/15 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold mb-1">Mediación</h3>
                    <p className="text-muted-foreground">En casos menores, se buscará resolver el conflicto mediante mediación.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/15 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold mb-1">Acción</h3>
                    <p className="text-muted-foreground">Dependiendo de la gravedad, se pueden tomar diferentes acciones, desde advertencias hasta expulsión.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-primary/15 text-primary h-8 w-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <h3 className="font-semibold mb-1">Apelación</h3>
                    <p className="text-muted-foreground">Existe un proceso de apelación para quienes consideren injusta la resolución.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mb-8 border-t border-border pt-6">
              <h3 className="font-semibold mb-2">Atribución</h3>
              <p>
                Este Código de Conducta está adaptado del 
                <a href="https://www.contributor-covenant.org/" className="text-primary hover:underline"> Contributor Covenant</a>, 
                versión 2.0, disponible en 
                <a href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html" className="text-primary hover:underline"> contributor-covenant.org/version/2/0/code_of_conduct.html</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeOfConduct;
