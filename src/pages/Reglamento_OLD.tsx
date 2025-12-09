import React from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookText, Users, Award, FileCheck, Calendar, Building, Vote, Shield, DollarSign, Settings } from "lucide-react";

const Reglamento = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Reglamento Interno</span> del Club
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Reglamento interno que complementa el Estatuto, estableciendo procedimientos 
              operativos, normas de funcionamiento y regulaciones específicas para las 
              actividades del Club de Programación FIUNA.
            </p>
          </div>
        </div>
      </section>
      
      {/* Reglamento Tabs Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="admision" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 w-full h-auto mb-8">
              <TabsTrigger value="admision" className="flex flex-col items-center gap-2 py-3">
                <Users className="h-5 w-5" />
                <span>Admisión</span>
              </TabsTrigger>
              <TabsTrigger value="actividades" className="flex flex-col items-center gap-2 py-3">
                <Calendar className="h-5 w-5" />
                <span>Actividades</span>
              </TabsTrigger>
              <TabsTrigger value="proyectos" className="flex flex-col items-center gap-2 py-3">
                <Building className="h-5 w-5" />
                <span>Proyectos</span>
              </TabsTrigger>
              <TabsTrigger value="competencias" className="flex flex-col items-center gap-2 py-3">
                <Award className="h-5 w-5" />
                <span>Competencias</span>
              </TabsTrigger>
              <TabsTrigger value="recursos" className="flex flex-col items-center gap-2 py-3">
                <DollarSign className="h-5 w-5" />
                <span>Recursos</span>
              </TabsTrigger>
              <TabsTrigger value="comunicacion" className="flex flex-col items-center gap-2 py-3">
                <BookText className="h-5 w-5" />
                <span>Comunicación</span>
              </TabsTrigger>
              <TabsTrigger value="eventos" className="flex flex-col items-center gap-2 py-3">
                <FileCheck className="h-5 w-5" />
                <span>Eventos</span>
              </TabsTrigger>
              <TabsTrigger value="alianzas" className="flex flex-col items-center gap-2 py-3">
                <Vote className="h-5 w-5" />
                <span>Alianzas</span>
              </TabsTrigger>
              <TabsTrigger value="disciplina" className="flex flex-col items-center gap-2 py-3">
                <Shield className="h-5 w-5" />
                <span>Disciplina</span>
              </TabsTrigger>
              <TabsTrigger value="finales" className="flex flex-col items-center gap-2 py-3">
                <Settings className="h-5 w-5" />
                <span>Finales</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="glass-card-static p-6 md:p-8">
              <TabsContent value="admision" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección I: Procedimientos de Admisión</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 1 - Proceso de Solicitud</h3>
                      <p className="text-muted-foreground">
                        Todo aspirante a miembro del Club de Programación FIUNA deberá completar el formulario 
                        de solicitud oficial disponible en la plataforma digital del club, proporcionando información 
                        personal, académica y sus motivaciones para unirse al club.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 2 - Evaluación Técnica</h3>
                      <p className="text-muted-foreground">
                        Los aspirantes podrán ser sometidos a una evaluación técnica básica que incluya conceptos 
                        fundamentales de programación, lógica computacional y conocimientos generales de tecnología, 
                        adaptada al nivel académico del solicitante.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 3 - Entrevista Personal</h3>
                      <p className="text-muted-foreground">
                        La Comisión Directiva realizará una entrevista personal con cada aspirante para conocer 
                        sus intereses, expectativas y disposición para participar activamente en las actividades 
                        del club. Esta entrevista tendrá carácter orientativo y formativo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 4 - Período de Prueba</h3>
                      <p className="text-muted-foreground">
                        Los nuevos miembros tendrán un período de prueba de treinta (30) días durante el cual 
                        deberán participar en al menos dos (2) actividades del club y demostrar su compromiso 
                        con los objetivos y valores de la organización.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="actividades" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección II: Organización de Actividades</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 5 - Planificación de Actividades</h3>
                      <p className="text-muted-foreground">
                        Todas las actividades del club deberán ser planificadas con al menos quince (15) días 
                        de anticipación, incluyendo objetivos, cronograma, recursos necesarios y responsables. 
                        La planificación debe ser aprobada por la Comisión Directiva.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 6 - Tipos de Actividades</h3>
                      <p className="text-muted-foreground mb-4">
                        El club organizará diferentes tipos de actividades según su naturaleza:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-medium">Talleres técnicos:</span> Sesiones de aprendizaje sobre tecnologías específicas</li>
                        <li><span className="font-medium">Charlas magistrales:</span> Conferencias con expertos de la industria</li>
                        <li><span className="font-medium">Hackatones:</span> Competencias de desarrollo de software</li>
                        <li><span className="font-medium">Code reviews:</span> Sesiones de revisión y mejora de código</li>
                        <li><span className="font-medium">Actividades sociales:</span> Eventos de integración y networking</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 7 - Registro de Asistencia</h3>
                      <p className="text-muted-foreground">
                        Se mantendrá un registro digital de asistencia a todas las actividades del club. 
                        Los miembros que no asistan a tres (3) actividades consecutivas sin justificación 
                        podrán ser contactados para evaluar su situación.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 8 - Evaluación Post-Actividad</h3>
                      <p className="text-muted-foreground">
                        Cada actividad será evaluada mediante formularios de retroalimentación para 
                        mejorar continuamente la calidad y relevancia de las futuras actividades. 
                        Los resultados serán analizados por la Comisión Directiva.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="proyectos" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección III: Gestión de Proyectos</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 9 - Propuesta de Proyectos</h3>
                      <p className="text-muted-foreground">
                        Cualquier miembro activo puede proponer un proyecto presentando una propuesta formal 
                        que incluya objetivos, alcance, cronograma, recursos necesarios y beneficiarios. 
                        La propuesta será evaluada por la Comisión Directiva.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 10 - Clasificación de Proyectos</h3>
                      <p className="text-muted-foreground mb-4">
                        Los proyectos se clasifican según su alcance e impacto:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-medium">Proyectos internos:</span> Para uso y beneficio del club</li>
                        <li><span className="font-medium">Proyectos académicos:</span> En colaboración con la facultad</li>
                        <li><span className="font-medium">Proyectos sociales:</span> Con impacto en la comunidad</li>
                        <li><span className="font-medium">Proyectos de investigación:</span> Con componente investigativo</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 11 - Gestión de Equipos</h3>
                      <p className="text-muted-foreground">
                        Cada proyecto contará con un líder designado responsable de coordinar el equipo, 
                        reportar avances y asegurar el cumplimiento de objetivos. Los equipos no podrán 
                        exceder de ocho (8) miembros para garantizar efectividad.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 12 - Documentación y Entrega</h3>
                      <p className="text-muted-foreground">
                        Todos los proyectos deberán mantener documentación actualizada del desarrollo, 
                        incluyendo código fuente, manuales de usuario y técnicos. Al finalizar, se realizará 
                        una presentación de resultados ante la comunidad del club.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="competencias" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección IV: Competencias y Representación</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 13 - Selección de Representantes</h3>
                      <p className="text-muted-foreground">
                        Para competencias externas, se realizará un proceso de selección transparente 
                        basado en habilidades técnicas, trabajo en equipo y compromiso con el club. 
                        El proceso será supervisado por la Comisión Directiva.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 14 - Preparación y Entrenamiento</h3>
                      <p className="text-muted-foreground">
                        Los equipos seleccionados recibirán entrenamiento específico y apoyo del club 
                        para su preparación. Se establecerán sesiones regulares de práctica y se 
                        proporcionarán recursos educativos especializados.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 15 - Código de Conducta en Competencias</h3>
                      <p className="text-muted-foreground">
                        Los representantes del club deberán mantener los más altos estándares de 
                        integridad académica, deportividad y respeto hacia competidores, organizadores 
                        y jueces, representando dignamente a la institución.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 16 - Financiamiento de Participación</h3>
                      <p className="text-muted-foreground">
                        El club buscará financiamiento para la participación en competencias mediante 
                        gestiones con la facultad, patrocinios y actividades de recaudación de fondos. 
                        Se priorizarán las competencias de mayor impacto académico y visibilidad.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="recursos" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección V: Gestión de Recursos</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 17 - Inventario de Recursos</h3>
                      <p className="text-muted-foreground">
                        Se mantendrá un inventario actualizado de todos los recursos del club, incluyendo 
                        equipos, software, materiales y recursos financieros. El inventario será revisado 
                        semestralmente por el Tesorero.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 18 - Uso de Equipos</h3>
                      <p className="text-muted-foreground">
                        Los equipos del club podrán ser utilizados por los miembros para actividades 
                        relacionadas con los objetivos del club, previa solicitud y aprobación. 
                        Los usuarios serán responsables del cuidado y devolución en buen estado.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 19 - Adquisiciones</h3>
                      <p className="text-muted-foreground">
                        Las adquisiciones superiores al equivalente de dos (2) salarios mínimos vigentes 
                        deberán ser aprobadas por la Asamblea General. Las adquisiciones menores podrán 
                        ser autorizadas por la Comisión Directiva.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 20 - Donaciones y Patrocinios</h3>
                      <p className="text-muted-foreground">
                        El club podrá recibir donaciones y patrocinios de entidades públicas o privadas, 
                        siempre que no comprometan la independencia académica y los valores del club. 
                        Todas las donaciones serán registradas transparentemente.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="comunicacion" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección VI: Comunicación Interna y Externa</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 21 - Canales de Comunicación</h3>
                      <p className="text-muted-foreground">
                        El club utilizará múltiples canales de comunicación incluyendo sitio web oficial, 
                        redes sociales, plataformas de mensajería y boletines informativos. Se mantendrá 
                        coherencia en el mensaje y la identidad visual en todas las comunicaciones.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 22 - Comunicaciones Oficiales</h3>
                      <p className="text-muted-foreground">
                        Las comunicaciones oficiales del club deberán ser autorizadas por el Presidente 
                        o Secretario de Comunicaciones. Incluyen pronunciamientos, posicionamientos 
                        públicos y comunicados de prensa.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 23 - Gestión de Redes Sociales</h3>
                      <p className="text-muted-foreground">
                        Las cuentas oficiales en redes sociales serán administradas por el equipo de 
                        comunicaciones bajo supervisión de la Comisión Directiva. Se mantendrá un 
                        calendario de contenidos y se responderán consultas en un plazo máximo de 48 horas.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 24 - Relaciones con Medios</h3>
                      <p className="text-muted-foreground">
                        El contacto con medios de comunicación será coordinado por el Secretario de 
                        Comunicaciones o el Presidente. Se mantendrá una base de datos de contactos 
                        de medios y se emitirán comunicados de prensa sobre actividades relevantes.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="eventos" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección VII: Organización de Eventos</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 25 - Planificación de Eventos</h3>
                      <p className="text-muted-foreground">
                        Los eventos del club deberán planificarse con al menos treinta (30) días de 
                        anticipación para eventos internos y sesenta (60) días para eventos públicos. 
                        La planificación incluirá presupuesto, logística, promoción y evaluación post-evento.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 26 - Comités de Organización</h3>
                      <p className="text-muted-foreground">
                        Para eventos de gran envergadura se formarán comités especializados en áreas 
                        como logística, contenido académico, patrocinios, comunicaciones y registro 
                        de participantes. Cada comité tendrá un coordinador responsable.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 27 - Gestión de Ponentes</h3>
                      <p className="text-muted-foreground">
                        La invitación y coordinación con ponentes externos será responsabilidad del 
                        comité de contenido académico. Se proporcionarán facilidades de transporte, 
                        alojamiento y alimentación según las posibilidades del club.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 28 - Certificaciones y Reconocimientos</h3>
                      <p className="text-muted-foreground">
                        El club emitirá certificados de participación para eventos de formación académica 
                        con duración mínima de cuatro (4) horas. Los certificados deberán cumplir con 
                        estándares de calidad y llevar las firmas correspondientes.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="alianzas" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección VIII: Alianzas y Convenios</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 29 - Establecimiento de Alianzas</h3>
                      <p className="text-muted-foreground">
                        El club podrá establecer alianzas estratégicas con empresas, instituciones 
                        educativas, organizaciones gubernamentales y otros clubes estudiantiles que 
                        compartan objetivos similares y puedan contribuir al crecimiento mutuo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 30 - Convenios de Cooperación</h3>
                      <p className="text-muted-foreground">
                        Los convenios de cooperación deberán ser formalizados por escrito, especificando 
                        objetivos, responsabilidades de cada parte, duración y mecanismos de evaluación. 
                        Requerirán aprobación de la Comisión Directiva y ratificación en Asamblea General.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 31 - Seguimiento de Alianzas</h3>
                      <p className="text-muted-foreground">
                        Se realizará un seguimiento trimestral del cumplimiento de objetivos y compromisos 
                        establecidos en las alianzas y convenios. Se elaborarán informes de evaluación 
                        y se tomarán medidas correctivas cuando sea necesario.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="disciplina" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección IX: Régimen Disciplinario</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 32 - Faltas Disciplinarias</h3>
                      <p className="text-muted-foreground mb-4">
                        Constituyen faltas disciplinarias las siguientes conductas:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Incumplimiento reiterado de las normas del club</li>
                        <li>Conducta que dañe la imagen o reputación del club</li>
                        <li>Uso indebido de recursos o información del club</li>
                        <li>Falta de respeto hacia otros miembros o autoridades</li>
                        <li>Participación en actividades contrarias a los objetivos del club</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 33 - Sanciones Disciplinarias</h3>
                      <p className="text-muted-foreground mb-4">
                        Las sanciones disciplinarias serán proporcionales a la falta cometida:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-medium">Amonestación verbal:</span> Para faltas leves</li>
                        <li><span className="font-medium">Amonestación escrita:</span> Para faltas moderadas</li>
                        <li><span className="font-medium">Suspensión temporal:</span> De 30 a 180 días</li>
                        <li><span className="font-medium">Expulsión:</span> Para faltas graves o reincidencia</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 34 - Proceso Disciplinario</h3>
                      <p className="text-muted-foreground">
                        Todo proceso disciplinario garantizará el derecho de defensa del miembro afectado, 
                        incluyendo notificación formal de cargos, plazo para presentar descargos y 
                        derecho a ser escuchado antes de la decisión final.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="finales" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Sección X: Disposiciones Finales</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 35 - Modificación del Reglamento</h3>
                      <p className="text-muted-foreground">
                        Este reglamento podrá ser modificado por la Asamblea General con el voto favorable 
                        de las dos terceras partes de los miembros presentes. Las propuestas de modificación 
                        deberán ser presentadas con quince (15) días de anticipación.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 36 - Casos no Previstos</h3>
                      <p className="text-muted-foreground">
                        Los casos no previstos en este reglamento serán resueltos por la Comisión Directiva, 
                        aplicando los principios generales del Estatuto y las mejores prácticas de gestión 
                        organizacional. Las decisiones podrán ser apeladas ante la Asamblea General.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 37 - Vigencia</h3>
                      <p className="text-muted-foreground">
                        Este reglamento entrará en vigencia a partir de su aprobación por la Asamblea General 
                        y deroga todas las disposiciones reglamentarias anteriores que se opongan al presente 
                        documento.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 38 - Publicación y Divulgación</h3>
                      <p className="text-muted-foreground">
                        Este reglamento será publicado en el sitio web oficial del club y se proporcionará 
                        una copia a todos los miembros activos. Es responsabilidad de cada miembro conocer 
                        y cumplir las disposiciones contenidas en este documento.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Download Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-4">Descargar Reglamento Completo</h2>
          <p className="text-muted-foreground mb-6">
            Podés descargar una copia del reglamento interno completo en PDF para consultarlo offline.
          </p>
          <a 
            href="/documentos/reglamento-cpf.pdf" 
            download="reglamento-cpf.pdf"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <BookText className="h-5 w-5" />
            Descargar PDF
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Reglamento;
