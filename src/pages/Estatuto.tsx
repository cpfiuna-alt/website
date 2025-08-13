import React from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookText, Users, Award, FileCheck, Calendar, Building, Vote } from "lucide-react";

const Estatuto = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Estatuto</span> del Club
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Documento oficial que rige el funcionamiento del Club de Programación FIUNA,
              estableciendo las normas, procedimientos y estructura organizativa.
            </p>
          </div>
        </div>
      </section>
      
      {/* Estatuto Tabs Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full h-auto mb-8">
              <TabsTrigger value="general" className="flex flex-col items-center gap-2 py-3">
                <BookText className="h-5 w-5" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="miembros" className="flex flex-col items-center gap-2 py-3">
                <Users className="h-5 w-5" />
                <span>Miembros</span>
              </TabsTrigger>
              <TabsTrigger value="estructura" className="flex flex-col items-center gap-2 py-3">
                <Building className="h-5 w-5" />
                <span>Estructura</span>
              </TabsTrigger>
              <TabsTrigger value="elecciones" className="flex flex-col items-center gap-2 py-3">
                <Vote className="h-5 w-5" />
                <span>Elecciones</span>
              </TabsTrigger>
              <TabsTrigger value="asambleas" className="flex flex-col items-center gap-2 py-3">
                <Calendar className="h-5 w-5" />
                <span>Asambleas</span>
              </TabsTrigger>
              <TabsTrigger value="disposiciones" className="flex flex-col items-center gap-2 py-3">
                <FileCheck className="h-5 w-5" />
                <span>Disposiciones</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="glass-card-static p-6 md:p-8">
              <TabsContent value="general" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título I: Disposiciones Generales</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 1 - Nombre y Naturaleza</h3>
                      <p className="text-muted-foreground">
                      El Club de Programación FIUNA, es una Organización estudiantil sin fines de lucro, dependiente 
                      de la Facultad de Ingeniería de la Universidad Nacional de Asunción.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 2 - Marco Legal</h3>
                      <p className="text-muted-foreground">
                      El Club de Programación FIUNA se rige por el presente Estatuto, por los reglamentos internos 
                      que se establezcan y por las disposiciones generales de la Universidad Nacional de Asunción y 
                      la Facultad de Ingeniería aplicables a las organizaciones estudiantiles.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 3 - Constitución, Denominación y Duración</h3>
                      <p className="text-muted-foreground">
                      Se constituye el "Club de Programación de la Facultad de Ingeniería de la Universidad Nacional 
                      de Asunción", en adelante, "Club de Programación FIUNA", como sigla "CPF" o ""&lt;/cpf&gt;", 
                      el tiempo del CPF tendrá una duración indefinida y solo podrá disolverse por las causas previstas 
                      en este Estatuto o por disposición de las autoridades competentes de la Facultad de Ingeniería UNA.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 4 - Domicilio</h3>
                      <p className="text-muted-foreground">
                      El "Club de Programación FIUNA", como sigla "CPF" o " "&lt;/cpf&gt; "", fija su domicilio legal en
                      el Campus Universitario de San Lorenzo, Paraguay, así también podrá fijar filiales en las demás 
                      Facultades de Ingeniería del interior del país, dependiente de la Universidad Nacional de Asunción.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 5 - Misión</h3>
                      <p className="text-muted-foreground">
                      Fomentar la cultura de la programación y el desarrollo de software dentro de la Facultad de 
                      Ingeniería de la Universidad Nacional de Asunción, promoviendo la formación continua, la innovación 
                      tecnológica, la participación en competencias y el desarrollo de proyectos con impacto social, 
                      fortaleciendo el vínculo entre la comunidad estudiantil y el sector tecnológico del país.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 6 - Visión</h3>
                      <p className="text-muted-foreground">
                      Consolidarse como un referente nacional en el ámbito de la programación y la tecnología, siendo 
                      un espacio de excelencia, colaboración e innovación, que impulse el crecimiento académico, 
                      profesional y social de sus miembros, contribuyendo al avance tecnológico y al desarrollo 
                      sostenible del Paraguay.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 7 - Objetico General</h3>
                      <p className="text-muted-foreground">
                      Consolidar al Club de Programación FIUNA, integrado por estudiantes, egresados y colaboradores, 
                      como un espacio orientado a la promoción de la cultura de la programación y el desarrollo de 
                      software, el fomento de la investigación y la innovación tecnológica, la participación en competencias, 
                      la organización de actividades formativas, y la ejecución de proyectos con impacto social, fortaleciendo 
                      vínculos con el sector tecnológico para contribuir al desarrollo del país.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 8 - Objetivos Específicos</h3>
                      <p className="text-muted-foreground mb-4">
                      El Club de Programación FIUNA tiene como objetivos:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Fomentar la cultura de programación y desarrollo de software entre los estudiantes.</li>
                      <li>Promover el intercambio de conocimientos y experiencias en el ámbito de la tecnología.</li>
                      <li>Organizar actividades educativas, competencias y eventos relacionados con la programación.</li>
                      <li>Representar a la FIUNA en competencias nacionales e internacionales de programación.</li>
                      <li>Contribuir al desarrollo tecnológico del país mediante proyectos de impacto social.</li>
                      <li>Establecer vínculos con empresas e instituciones relacionadas al ámbito tecnológico.</li>
                      <li>Fomentar la investigación y el desarrollo de soluciones tecnológicas innovadoras.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 9 - Identidad Visual</h3>
                      <p className="text-muted-foreground">
                      El Club de Programación FIUNA contará con un logotipo, colores y elementos de identidad visual
                      propios, los cuales serán aprobados por la Comisión Directiva y deberán ser utilizados en todas
                      las comunicaciones oficiales del club. Cualquier modificación a la identidad visual deberá ser 
                      aprobada por la Asamblea General.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="miembros" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título II: De los Miembros</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 10 - Requisitos de Ingreso</h3>
                      <p className="text-muted-foreground mb-4">
                      Para ser miembro activo del Club de Programación FIUNA se requiere:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Ser estudiante de la Facultad de Ingeniería UNA.</li>
                      <li>Presentar solicitud formal de ingreso a la Comisión Directiva.</li>
                      <li>Participar en el proceso de inducción establecido por el club.</li>
                      <li>Comprometerse a cumplir el Estatuto, Reglamentos y demás normativas del club.</li>
                      <li>Ser aprobado por la Comisión Directiva.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 11 - Categorías de Miembros</h3>
                      <p className="text-muted-foreground mb-4">
                      El Club de Programación FIUNA reconoce las siguientes categorías de miembros:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li><span className="font-medium">Miembros Activos:</span> Estudiantes de la FIUNA que hayan cumplido con los requisitos de ingreso y mantengan participación regular en las actividades del club.</li>
                      <li><span className="font-medium">Miembros Honorarios:</span> Personas que, por sus méritos o por haber prestado servicios destacados al club, sean designados como tales por la Asamblea General.</li>
                      <li><span className="font-medium">Miembros Egresados:</span> Miembros activos que hayan culminado sus estudios en la FIUNA y deseen mantener su vinculación con el club.</li>
                      <li><span className="font-medium">Miembros Colaboradores:</span> Estudiantes de otras facultades o personas externas a la Universidad que colaboren regularmente con las actividades del club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 12 - Derechos de los Miembros Activos</h3>
                      <p className="text-muted-foreground mb-4">
                      Son derechos de los miembros activos:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Participar con voz y voto en las Asambleas Generales y Extraordinarias.</li>
                      <li>Elegir y ser elegidos para los cargos directivos del club.</li>
                      <li>Participar en todas las actividades organizadas por el club.</li>
                      <li>Representar al club en eventos y competencias.</li>
                      <li>Acceder a los recursos y beneficios que el club disponga para sus miembros.</li>
                      <li>Proponer iniciativas, proyectos y actividades a la Comisión Directiva.</li>
                      <li>Solicitar información sobre la gestión y administración del club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 13 - Obligaciones de los Miembros</h3>
                      <p className="text-muted-foreground mb-4">
                      Son obligaciones de todos los miembros:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Cumplir con las disposiciones del Estatuto, Reglamentos y demás normativas del club.</li>
                      <li>Asistir a las reuniones y asambleas convocadas por la Comisión Directiva.</li>
                      <li>Participar activamente en las actividades organizadas por el club.</li>
                      <li>Desempeñar con responsabilidad y ética los cargos y tareas que les sean encomendados.</li>
                      <li>Mantener una conducta acorde con los valores y objetivos del club.</li>
                      <li>Contribuir al crecimiento y velar por el buen nombre del club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 14 - Pérdida de la Condición de Miembro</h3>
                      <p className="text-muted-foreground mb-4">
                      La condición de miembro se pierde por:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Renuncia presentada por escrito a la Comisión Directiva.</li>
                      <li>Inasistencia injustificada del 70% a las actividades durante un semestre.</li>
                      <li>Incumplimiento reiterado de las obligaciones establecidas en este Estatuto.</li>
                      <li>Conducta que atente contra los intereses y buen nombre del club.</li>
                      <li>Expulsión.</li>
                      </ol>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="estructura" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título III: Estructura Organizativa</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 15 - Órganos</h3>
                      <p className="text-muted-foreground mb-4">
                      El Club de Programación FIUNA cuenta con los siguientes órganos:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>La Asamblea General</li>
                      <li>La Asamblea Extraordinaria</li>
                      <li>La Comisión Directiva</li>
                      <li>Las Secretarías</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 16 - Asamblea General</h3>
                      <p className="text-muted-foreground">
                      La Asamblea General es el órgano supremo del club y está integrada por todos los miembros activos. Sus decisiones son soberanas y obligatorias para todos los miembros y órganos del club.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 17 - Asamblea Extraordinaria</h3>
                      <p className="text-muted-foreground">
                      La Asamblea Extraordinaria es la instancia que será convocada para tratar tema de carácter urgente, ya sea por el presidente o cualquieras de los miembros del Club.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 18 - Atribuciones de la Asamblea General Ordinaria</h3>
                      <p className="text-muted-foreground mb-4">
                      Son atribuciones de la Asamblea General Ordinaria:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Elegir a los miembros de la Comisión Directiva.</li>
                      <li>Aprobar el plan anual de actividades.</li>
                      <li>Aprobar el presupuesto anual del club.</li>
                      <li>Aprobar la memoria anual y los estados financieros presentados por la Comisión Directiva.</li>
                      <li>Evaluar la gestión de la Comisión Directiva.</li>
                      <li>Aprobar la designación de miembros honorarios.</li>
                      <li>Resolver los asuntos que le sean sometidos por la Comisión Directiva.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 19 - Atribuciones de la Asamblea General Extraordinaria</h3>
                      <p className="text-muted-foreground mb-4">
                      Son atribuciones de la Asamblea General Extraordinaria:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Modificar el Estatuto.</li>
                      <li>Resolver sobre la disolución del club.</li>
                      <li>Decidir sobre la remoción de miembros de la Comisión Directiva.</li>
                      <li>Resolver casos de expulsión de miembros.</li>
                      <li>Aprobar la enajenación de bienes del club.</li>
                      <li>Tratar asuntos urgentes que requieran aprobación de la Asamblea.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 20 - Comisión Directiva</h3>
                      <p className="text-muted-foreground mb-4">
                      La Comisión Directiva es el órgano ejecutivo del club y está compuesta por:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Presidente</li>
                      <li>Vicepresidente</li>
                      <li>Secretario</li>
                      <li>Secretario Adjunto</li>
                      <li>Tesorero</li>
                      <li>Tesorero Adjunto</li>
                      <li>Miembros Titulares</li>
                      </ol>
                      <p className="text-muted-foreground mt-4">
                      La Comisión Directiva será elegida por la Asamblea General y durará en sus funciones un período de dos años, pudiendo ser reelectos por un periodo más.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 21 - Reuniones de la Comisión Directiva</h3>
                      <p className="text-muted-foreground">
                      La Comisión Directiva se reunirá ordinariamente una vez al mes y extraordinariamente cuando lo convoque el Presidente o a solicitud de al menos dos de sus miembros. El quórum para sesionar será de la mitad más uno de sus miembros y las decisiones se adoptará por mayoría simple de los presentes. En caso de empate, el Presidente tendrá voto dirimente.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 22 - Funciones del Presidente</h3>
                      <p className="text-muted-foreground mb-4">
                      Son funciones del Presidente:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Representar al Club.</li>
                      <li>Presidir las reuniones de la Comisión Directiva.</li>
                      <li>Cumplir y hacer cumplir las disposiciones del Club.</li>
                      <li>Coordinar y supervisar el trabajo de los demás miembros de la Comisión Directiva.</li>
                      <li>Firmar, junto con el Secretario, las actas y documentos oficiales del club.</li>
                      <li>Autorizar, junto con el Tesorero, los gastos y pagos del club.</li>
                      <li>Presentar a la Asamblea General los informes y memorias del club.</li>
                      <li>Velar por el cumplimiento del Estatuto y demás normativas del club.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 23 - Funciones del Vicepresidente</h3>
                      <p className="text-muted-foreground mb-4">
                      Son funciones del Vicepresidente:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Sustituir al Presidente en caso de ausencia, enfermedad o vacancia del cargo.</li>
                      <li>Coordinar las actividades de las Secretarías.</li>
                      <li>Colaborar con el Presidente en la representación y gestión del club.</li>
                      <li>Desempeñar las funciones que le sean delegadas por el Presidente o la Comisión Directiva.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 24 - Funciones del Secretario</h3>
                      <p className="text-muted-foreground mb-4">
                      Son funciones del Secretario:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Llevar y custodiar los libros de actas y registros del club.</li>
                      <li>Redactar y firmar, junto con el Presidente, las actas de las reuniones.</li>
                      <li>Mantener actualizado el registro de miembros del club.</li>
                      <li>Convocar, por disposición del Presidente, a las reuniones y asambleas.</li>
                      <li>Gestionar la correspondencia y comunicaciones del club.</li>
                      <li>Coordinar la elaboración de informes y documentos oficiales.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 25 - Funciones del Secretario Adjunto</h3>
                      <p className="text-muted-foreground">
                      El secretario adjunto, remplazará en todas sus funciones al Secretario del club durante su ausencia.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 26 - Funciones del Tesorero</h3>
                      <p className="text-muted-foreground mb-4">
                      Son funciones del Tesorero:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Administrar los recursos económicos del club.</li>
                      <li>Llevar la contabilidad y registro de ingresos y gastos.</li>
                      <li>Autorizar, junto con el Presidente, los gastos y pagos del club.</li>
                      <li>Presentar informes económicos periódicos a la Comisión Directiva.</li>
                      <li>Elaborar el presupuesto anual del club para su aprobación por la Asamblea General.</li>
                      <li>Gestionar la búsqueda de patrocinios y fuentes de financiamiento para el club.</li>
                      <li>Velar por la transparencia en el manejo de los recursos económicos.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 27 - Funciones del Tesorero Adjunto</h3>
                      <p className="text-muted-foreground">
                      El tesorero adjunto, remplazará en todas sus funciones al tesorero del club durante su ausencia.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 28 - Miembros Titulares</h3>
                      <p className="text-muted-foreground">
                      En la Asamblea se elegirá tres miembros titulares que podrán suplir a cualquieras de los miembros de la comisión directiva durante su ausencia o por fallecimiento de uno de los miembros hasta que se convoque una nueva asamblea ya sea ordinaria o extraordinaria.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 29 - Secretarías</h3>
                      <p className="text-muted-foreground mb-4">
                      El club contará con las siguientes Secretarías:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li><span className="font-medium">Secretaría Académica:</span> Encargada de planificar y coordinar talleres, cursos y actividades educativas.</li>
                        <li><span className="font-medium">Secretaría de Competencias:</span> Responsable de la organización y participación en competencias de programación.</li>
                        <li><span className="font-medium">Secretaría de Proyectos:</span> Encargada de coordinar el desarrollo de proyectos tecnológicos del club.</li>
                        <li><span className="font-medium">Secretaría de Comunicación:</span> Responsable de la difusión, redes sociales y comunicación interna y externa del club.</li>
                      </ol>
                      <p className="text-muted-foreground mt-4">
                      Cada Secretaría será dirigida por un Secretario designado por la Comisión Directiva entre los miembros activos del club.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="elecciones" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título IV: De las Elecciones</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 30 - Proceso Electoral</h3>
                      <p className="text-muted-foreground">
                        Las elecciones para la Comisión Directiva se realizarán entre enero a marzo cada dos años, mediante votación 
                        directa y secreta de todos los miembros activos. La Asamblea General designará una Comisión Electoral compuesta 
                        por tres miembros activos que no sean candidatos, quienes serán responsables de organizar y supervisar el proceso electoral.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 31 - Candidaturas</h3>
                      <p className="text-muted-foreground">
                        Las candidaturas se presentarán mediante nominación directa. Los miembros pueden nominar a otros miembros 
                        para cualquier cargo de la Comisión Directiva, especialmente para el cargo de Presidente. Las nominaciones 
                        deberán ser presentadas a la Comisión Electoral con al menos 15 días de anticipación a la fecha de las elecciones.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 32 - Requisitos para ser Candidato</h3>
                      <p className="text-muted-foreground mb-4">
                        Para ser candidato a la Comisión Directiva se requiere:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Ser miembro activo del club con al menos seis meses de antigüedad.</li>
                        <li>Estar al día con las obligaciones del club.</li>
                        <li>No haber sido sancionado por faltas graves durante el último año.</li>
                        <li>Para el cargo de Presidente, haber formado parte anteriormente de algún órgano directivo del club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 33 - Votación y Escrutinio</h3>
                      <p className="text-muted-foreground">
                        La votación se realizará en una jornada electoral organizada por la Comisión Electoral. Tendrán derecho a voto 
                        todos los miembros activos del club. El escrutinio será realizado inmediatamente después de finalizada la votación 
                        y será público. Para el cargo de Presidente, resultará electo el candidato que obtenga la mayoría simple de votos. 
                        El candidato a Presidente con la segunda mayor cantidad de votos asumirá como Vicepresidente.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 34 - Asunción de Funciones</h3>
                      <p className="text-muted-foreground">
                        La nueva Comisión Directiva asumirá sus funciones en la primera reunión que se llevará a más tardar en quince días de la Asamblea Electiva. La Comisión Directiva 
                        saliente deberá realizar un proceso formal de traspaso, que incluirá la entrega de documentación, bienes y un 
                        informe detallado de la gestión.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 35 - Vacancia</h3>
                      <p className="text-muted-foreground">
                        En caso de vacancia definitiva del cargo de Presidente, asumirá el Vicepresidente. Si se produjera la vacancia 
                        de más de dos miembros de la Comisión Directiva, o del Vicepresidente cuando este hubiera asumido la Presidencia, 
                        se convocará a elecciones extraordinarias para completar el período.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="asambleas" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título V: De las Asambleas</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 36 - Convocatoria</h3>
                      <p className="text-muted-foreground">
                      Las Asambleas serán convocadas por el Presidente, a través del Secretario Electoral, con al menos 15 días de 
                      anticipación para las ordinarias y 10 días para las extraordinarias. La convocatoria deberá incluir el orden del 
                      día, fecha, hora y lugar de celebración, y será comunicada a todos los miembros por los medios de comunicación 
                      oficiales del club.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 37 - Quórum y Decisiones</h3>
                      <p className="text-muted-foreground">
                      El quórum para las Asambleas Generales será de la mitad más uno de los miembros activos en primera convocatoria, 
                      y con los miembros presentes en segunda convocatoria, que se realizará 30 minutos después de la primera. Las 
                      decisiones se tomarán por mayoría simple de los presentes, excepto en los casos especiales previstos en este Estatuto.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 38 - Actas</h3>
                      <p className="text-muted-foreground">
                      De cada Asamblea General se levantará un acta que será firmada por el Presidente y el Secretario. Las actas 
                      serán archivadas y estarán a disposición de todos los miembros para su consulta. Una copia de las actas será 
                      enviada a todos los miembros en un plazo no mayor a 15 días después de la Asamblea.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="disposiciones" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Título VI: Disposiciones Finales</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 39 - Modificación del Estatuto</h3>
                      <p className="text-muted-foreground">
                      El presente Estatuto podrá ser modificado total o parcialmente por la Asamblea Extraordinaria convocada 
                      especialmente para tal fin. Las modificaciones deberán ser aprobadas por al menos dos tercios de los miembros 
                      presentes en la Asamblea.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 40 - Disolución</h3>
                      <p className="text-muted-foreground">
                      El Club de Programación FIUNA podrá disolverse por decisión de la Asamblea Extraordinaria, convocada 
                      especialmente para tal fin, y con el voto favorable de al menos tres cuartos de los miembros activos. También 
                      podrá disolverse por disposición de las autoridades competentes de la Facultad de Ingeniería UNA.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 41 - Destino de los Bienes</h3>
                      <p className="text-muted-foreground">
                      En caso de disolución, los bienes y recursos del club serán donados a la Facultad de Ingeniería UNA para fines 
                      educativos relacionados con la informática y la programación. La Asamblea Extraordinaria que decida la disolución 
                      designará una Comisión Liquidadora encargada de cumplir con esta disposición.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 42 - Casos no Previstos</h3>
                      <p className="text-muted-foreground">
                      Los casos no previstos en el presente Estatuto serán resueltos por Reglamentos Internos propuestos por la Comisión 
                      Directiva, que deberá ser aprobado por la Asamblea Extraordinaria.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 43 - Vigencia</h3>
                      <p className="text-muted-foreground">
                      El presente Estatuto entrará en vigencia a partir de su aprobación por la Asamblea Extraordinaria y 
                      posterior reconocimiento por las autoridades de la Facultad de Ingeniería UNA.
                      </p>
                    </div>
                    
                    <div className="pt-8 border-t border-border">
                      <p className="text-center text-sm text-muted-foreground">
                        Aprobado en Asamblea General Constitutiva del Club de Programación FIUNA, 
                        realizada el día 11 de abril de 2025 en el Campus Universitario de San Lorenzo.
                      </p>
                      
                      <div className="mt-8 grid grid-cols-2 gap-8">
                        <div className="text-center">
                          <p className="font-medium">David Giménez</p>
                          <p className="text-sm text-muted-foreground">Presidente</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium">Daniel Villalba</p>
                          <p className="text-sm text-muted-foreground">Secretario</p>
                        </div>
                      </div>
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
          <h2 className="text-2xl font-bold mb-4">Descargar Estatuto Completo</h2>
          <p className="text-muted-foreground mb-6">
            Podés descargar una copia del estatuto completo en PDF para consultarlo offline.
          </p>
          <a 
            href="/documentos/estatuto-cpf.pdf" 
            download="Estatuto_CPF.pdf"
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

export default Estatuto;
