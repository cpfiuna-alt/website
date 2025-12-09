import React from "react";
import Layout from "@/components/layout/Layout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookText, Users, Award, FileCheck, Calendar, Building, Vote, Shield } from "lucide-react";

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
              <TabsTrigger value="organos" className="flex flex-col items-center gap-2 py-3">
                <Building className="h-5 w-5" />
                <span>Órganos</span>
              </TabsTrigger>
              <TabsTrigger value="funciones" className="flex flex-col items-center gap-2 py-3">
                <Award className="h-5 w-5" />
                <span>Funciones</span>
              </TabsTrigger>
              <TabsTrigger value="elecciones" className="flex flex-col items-center gap-2 py-3">
                <Vote className="h-5 w-5" />
                <span>Elecciones</span>
              </TabsTrigger>
              <TabsTrigger value="finales" className="flex flex-col items-center gap-2 py-3">
                <FileCheck className="h-5 w-5" />
                <span>Disposiciones</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="glass-card-static p-6 md:p-8">
              <TabsContent value="general" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo I: De las Disposiciones Generales</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 1º - Nombre y Naturaleza</h3>
                      <p className="text-muted-foreground">
                        La denominación oficial es "Club de Programación de la Facultad de Ingeniería de la 
                        Universidad Nacional de Asunción", el cual es formalmente conocido como Club de Programación 
                        FIUNA. Sus siglas oficiales son "CPF" o "&lt;/cpf&gt;". Es una Organización Estudiantil sin fines 
                        de lucro, de carácter académico y técnico, dependiente de la Facultad de Ingeniería de la 
                        Universidad Nacional de Asunción (FIUNA).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 2º - Marco Legal</h3>
                      <p className="text-muted-foreground">
                        El Club de Programación FIUNA se rige por el presente Estatuto, por los reglamentos internos 
                        que se establezcan, y por las disposiciones de la Universidad Nacional de Asunción (UNA) y la 
                        Facultad de Ingeniería (FIUNA) aplicables a las organizaciones estudiantiles.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 3º - Duración y Domicilio</h3>
                      <p className="text-muted-foreground mb-3">
                        El Club tendrá una duración indefinida. Fija su domicilio legal en el Campus Universitario 
                        de San Lorenzo, Paraguay.
                      </p>
                      <p className="text-muted-foreground italic">
                        <strong>Parágrafo:</strong> La Comisión Directiva podrá establecer filiales o grupos de 
                        trabajo en otras dependencias de la UNA, previa comunicación a la Asamblea General.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 4º - Misión</h3>
                      <p className="text-muted-foreground">
                        Fomentar la cultura de programación y desarrollo de software en la comunidad universitaria, 
                        brindando un espacio de aprendizaje, colaboración y crecimiento para todos los interesados 
                        en la tecnología.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 5º - Visión</h3>
                      <p className="text-muted-foreground">
                        Ser reconocidos como un referente en innovación tecnológica y formación de profesionales de 
                        excelencia, contribuyendo al desarrollo tecnológico del país mediante la creación de soluciones 
                        de impacto social positivo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 6º - Valores</h3>
                      <p className="text-muted-foreground">
                        El Club se orienta y promueve los siguientes valores esenciales entre sus miembros y en sus 
                        actividades: Pasión, Colaboración, Innovación, Inclusión, Excelencia, Aprendizaje, 
                        Perseverancia y Comunicación.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 7º - Objeto General</h3>
                      <p className="text-muted-foreground">
                        Consolidar al Club de Programación FIUNA como un espacio orientado a la promoción, el servicio 
                        y la provisión de recursos para el desarrollo de la cultura de la programación y el desarrollo 
                        de software, el fomento de la investigación y la innovación tecnológica, la participación en 
                        competencias, la organización de actividades formativas, y la ejecución de proyectos con impacto 
                        social, fortaleciendo vínculos con el sector tecnológico para contribuir al desarrollo del país.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 8º - Objetivos Específicos</h3>
                      <p className="text-muted-foreground mb-4">
                        El Club de Programación FIUNA tiene como objetivos, entre otros:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Fomentar la cultura de programación y desarrollo de software entre los miembros de la comunidad universitaria.</li>
                        <li>Promover el intercambio de conocimientos y experiencias en el ámbito tecnológico.</li>
                        <li>Organizar actividades educativas, competencias y eventos relacionados con la programación.</li>
                        <li>Representar a la FIUNA en competencias nacionales e internacionales de programación.</li>
                        <li>Contribuir al desarrollo tecnológico del país mediante proyectos de impacto social.</li>
                        <li>Establecer vínculos con empresas e instituciones relacionadas al ámbito tecnológico.</li>
                        <li>Fomentar la investigación y el desarrollo de soluciones tecnológicas innovadoras.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 9º - Identidad Visual</h3>
                      <p className="text-muted-foreground">
                        El Club contará con un logotipo, colores y elementos de identidad visual propios. El diseño 
                        original y las modificaciones sustanciales deberán ser aprobados por la Asamblea General.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="miembros" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo II: De los Miembros y su Estatus</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 10º - Clases de Miembros</h3>
                      <p className="text-muted-foreground mb-4">
                        El Club reconoce las siguientes categorías:
                      </p>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong>A. Miembros Activos:</strong> Estudiantes de la FIUNA que cumplan los requisitos 
                          de ingreso, mantengan la participación regular y contribución efectiva. Tienen plenos 
                          derechos y obligaciones, incluyendo voz y voto.
                        </p>
                        <p>
                          <strong>B. Miembros Honorarios:</strong> Personas que, por sus méritos o por haber prestado 
                          servicios destacados a El Club, sean designados por la Asamblea General. Tienen voz, pero no voto.
                        </p>
                        <p>
                          <strong>C. Miembros Egresados:</strong> Ex-miembros que culminaron sus estudios en la FIUNA 
                          y colaboran en mentoría o proyectos especiales. Tienen voz, pero no voto.
                        </p>
                        <p>
                          <strong>D. Miembros Colaboradores:</strong> Estudiantes de otras facultades o personas 
                          externas que colaboren regularmente con las actividades del Club. Tienen voz, pero no voto.
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 11º - Requisitos de Ingreso y Prospectivos</h3>
                      <p className="text-muted-foreground mb-4">
                        Para ser miembro activo se requiere:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Ser estudiante de la Facultad de Ingeniería UNA (FIUNA).</li>
                        <li>Presentar solicitud formal de ingreso a la Comisión Directiva.</li>
                        <li>Ser aceptado como Miembro Prospectivo o Candidato, y participar satisfactoriamente en el proceso de inducción o completar un proyecto de servicio estipulado por El Club, alineado a los valores de Aprendizaje y Perseverancia.</li>
                        <li>Comprometerse a cumplir el Estatuto, Reglamentos y demás normativas.</li>
                        <li>Ser aprobado y votado por la Comisión Directiva.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 12º - Condición de Miembro Activo (Mérito)</h3>
                      <p className="text-muted-foreground mb-4">
                        Para mantener la condición de Miembro Activo se requiere, además de no perder la condición 
                        de estudiante de FIUNA, mantener una participación regular que se define como:
                      </p>
                      <p className="text-muted-foreground mb-3">
                        a) Asistencia al setenta por ciento (70%) de las actividades obligatorias o reuniones de su 
                        Departamento durante un semestre, O;
                      </p>
                      <p className="text-muted-foreground mb-4">
                        b) Contribución efectiva y documentada (servicios) a un proyecto activo de El Club durante 
                        el último semestre.
                      </p>
                      <p className="text-muted-foreground">
                        La Comisión Directiva deberá verificar semestralmente esta condición, alineando el estatus 
                        con los valores de Excelencia y Perseverancia. El incumplimiento de esta condición sin causa 
                        justificada resultará en la transición a la categoría de Miembro Inactivo.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 13º - Derechos de los Miembros Activos</h3>
                      <p className="text-muted-foreground mb-4">
                        Son derechos de los miembros activos:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Participar con voz y voto en las Asambleas Generales y Extraordinarias.</li>
                        <li>Elegir y ser elegidos para los cargos de la Comisión Directiva y las Secretarías.</li>
                        <li>Participar en todas las actividades organizadas por El Club.</li>
                        <li>Acceder a los recursos y beneficios que El Club disponga para sus miembros.</li>
                        <li>Proponer iniciativas, proyectos y actividades a la Comisión Directiva.</li>
                        <li>Solicitar información sobre la gestión y administración de El Club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 14º - Obligaciones de los Miembros</h3>
                      <p className="text-muted-foreground mb-4">
                        Son obligaciones de todos los miembros:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Cumplir y acatar los acuerdos válidamente adoptados y las disposiciones del Estatuto y Reglamentos.</li>
                        <li>Asistir a las reuniones y asambleas convocadas por la Comisión Directiva.</li>
                        <li>Desempeñar con responsabilidad y ética los cargos y tareas que les sean encomendados.</li>
                        <li>Mantener una conducta acorde con los valores y objetivos de El Club.</li>
                        <li>Contribuir al crecimiento y velar por el buen nombre de El Club.</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 15º - Pérdida de la Condición de Miembro</h3>
                      <p className="text-muted-foreground mb-4">
                        La condición de miembro se pierde por:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Renuncia presentada por escrito a la Comisión Directiva.</li>
                        <li>Inasistencia injustificada o incumplimiento de la condición de Miembro Activo (Art. 12º).</li>
                        <li>Incumplimiento reiterado de las obligaciones establecidas en este Estatuto.</li>
                        <li>Conducta que atente contra los intereses y el buen nombre de El Club.</li>
                        <li>Expulsión, resuelta por la Asamblea General Extraordinaria.</li>
                      </ol>
                      <p className="text-muted-foreground mt-4 italic">
                        <strong>Parágrafo: Medida Disciplinaria Técnica.</strong> La Comisión Directiva queda facultada 
                        para aplicar la Suspensión inmediata de Acceso a Recursos Digitales y Físicos (servidores, 
                        repositorios, espacios de trabajo) como medida precautoria o sanción técnica por falta grave, 
                        mientras la Asamblea resuelve el caso de expulsión.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="organos" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo III: De los Órganos de Gobierno y Administración</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 16º - Órganos de Gobierno y Ejecución</h3>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>La Asamblea General (Órgano Supremo de Gobierno).</li>
                        <li>La Comisión Directiva (Órgano Ejecutivo y de Representación).</li>
                        <li>La Asesoría Docente/Tutor (Órgano de Apoyo Académico).</li>
                        <li>Las Secretarías y Coordinaciones Operativas (Órganos de Ejecución y Apoyo Técnico).</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 17º - Asamblea General</h3>
                      <p className="text-muted-foreground">
                        La Asamblea General es el órgano supremo de El Club y está integrada por todos los Miembros Activos.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 18º - Asamblea Extraordinaria</h3>
                      <p className="text-muted-foreground">
                        Será convocada para tratar temas de carácter urgente o aquellos cuyas atribuciones sean 
                        exclusivas de esta instancia (ej. modificación de Estatuto, disolución).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 19º - Atribuciones de la Asamblea General Ordinaria</h3>
                      <p className="text-muted-foreground mb-4">
                        La Asamblea General Ordinaria se reunirá una vez al año, y sus atribuciones son:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Elegir y Ratificar a los miembros de la Comisión Directiva.</li>
                        <li>Aprobar el Plan Anual de Actividades y el Presupuesto Anual.</li>
                        <li>Aprobar la Memoria Anual y los Estados Financieros.</li>
                        <li>Evaluar la gestión de la Comisión Directiva.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 20º - Atribuciones de la Asamblea General Extraordinaria</h3>
                      <p className="text-muted-foreground mb-4">
                        Son atribuciones exclusivas:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Modificar el Estatuto Social.</li>
                        <li>Resolver sobre la disolución de El Club.</li>
                        <li>Decidir sobre la remoción de miembros de la Comisión Directiva por causa justificada.</li>
                        <li>Resolver los casos de expulsión de miembros, conforme al debido proceso.</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 21º - Comisión Directiva (CD)</h3>
                      <p className="text-muted-foreground mb-4">
                        La Comisión Directiva es el órgano ejecutivo y de representación legal. Estará compuesta por:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Presidente</li>
                        <li>Vicepresidente</li>
                        <li>Secretario General</li>
                        <li>Tesorero</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 22º - Duración de la CD</h3>
                      <p className="text-muted-foreground">
                        La Comisión Directiva será elegida o ratificada por la Asamblea General y durará en sus 
                        funciones un período indefinido, el cual se extenderá hasta que el miembro presente su 
                        renuncia o pierda su condición de Miembro Activo, siendo sujeta a la ratificación bianual (Art. 30º).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 23º - Reuniones de la CD</h3>
                      <p className="text-muted-foreground mb-4">
                        La Comisión Directiva se reunirá ordinariamente una vez al mes. El quórum para sesionar será 
                        de la mitad más uno de sus miembros (tres de cuatro). Las decisiones se adoptarán por mayoría simple.
                      </p>
                      <p className="text-muted-foreground italic">
                        <strong>Parágrafo: Cultura de Consenso.</strong> En las deliberaciones, se promoverá la 
                        Colaboración y la Comunicación objetiva. Las ideas, una vez expresadas, se considerarán 
                        propiedad del órgano de gobierno, en lugar de ser propiedad de un individuo, fomentando 
                        así la objetividad técnica y el trabajo en equipo.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="funciones" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo IV: De las Funciones Directivas y Estructura Operacional</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 24º - Funciones del Presidente</h3>
                      <p className="text-muted-foreground">
                        Representar a El Club, presidir las reuniones y Asambleas, velar por el cumplimiento del 
                        Estatuto, coordinar el trabajo del equipo, y firmar documentos y autorizar gastos (junto con 
                        el Secretario General y Tesorero, respectivamente).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 25º - Funciones del Vicepresidente</h3>
                      <p className="text-muted-foreground">
                        Sustituir al Presidente en caso de ausencia o vacancia, y coordinar las actividades de las 
                        Secretarías Operacionales para asegurar la ejecución de los planes.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 26º - Funciones del Secretario General</h3>
                      <p className="text-muted-foreground">
                        Llevar y custodiar los libros de actas, redactar y firmar actas como Ministro de Fe, mantener 
                        el registro actualizado de todos los Miembros Activos, convocar a reuniones y gestionar la 
                        correspondencia oficial.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 27º - Funciones del Tesorero</h3>
                      <p className="text-muted-foreground">
                        Administrar los recursos económicos, llevar la contabilidad, autorizar gastos junto con el 
                        Presidente, levantar anualmente el inventario general de bienes y presentar informes económicos 
                        periódicos a la Comisión Directiva.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 28º - Asesoría Docente/Tutor</h3>
                      <p className="text-muted-foreground mb-4">
                        El Club contará con un Asesor Docente o Tutor Académico, designado por la Comisión Directiva 
                        con la aprobación de FIUNA. Sus funciones son:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>Apoyar el desarrollo de actividades</li>
                        <li>Proporcionar orientación al liderazgo sobre gestión institucional</li>
                        <li>Actuar como nexo formal entre El Club y las autoridades académicas</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 29º - Estructura Operacional y Departamentos</h3>
                      <p className="text-muted-foreground mb-4">
                        El Club contará con Departamentos Operacionales, dirigidos por un Coordinador o Director, 
                        designado por la Comisión Directiva. Estos Departamentos operarán con autonomía bajo la 
                        supervisión del Vicepresidente, enfocados en el valor de la Innovación y la Excelencia.
                      </p>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong>1. Departamento de Proyectos:</strong> Planificación e implementación de la hoja 
                          de ruta técnica (talleres, mentoría técnica, proyectos, competencias).
                        </p>
                        <p>
                          <strong>2. Departamento de Logística:</strong> Planificación y ejecución operativa de 
                          eventos masivos, gestión de infraestructura y cotización de insumos.
                        </p>
                        <p>
                          <strong>3. Departamento de Comunicación:</strong> Estrategia de contenidos, gestión de 
                          la marca, difusión de actividades y manejo de redes sociales.
                        </p>
                        <p>
                          <strong>4. Departamento de Relaciones Exteriores:</strong> Vinculación estratégica con 
                          empresas, gestión de alianzas y búsqueda de patrocinios.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="elecciones" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo V: De la Sucesión y el Régimen Electoral</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 30º - Proceso de Sucesión y Continuidad (Modelo Principal)</h3>
                      <p className="text-muted-foreground">
                        La sucesión de la Comisión Directiva se realizará cada dos años, mediante el principio de 
                        continuidad institucional, en el que la Comisión Directiva saliente propone a sus sucesores 
                        para una Junta Gestora Transitoria. Esta propuesta deberá ser sometida a la ratificación de 
                        la Asamblea General Ordinaria.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 31º - Llamado Opcional a Elecciones (Contingencia)</h3>
                      <p className="text-muted-foreground mb-4">
                        Solo se convocará a elecciones mediante votación directa y secreta de los Miembros Activos 
                        en caso de que:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                        <li>a) La Asamblea General Ordinaria rechace la ratificación de la Junta Gestora Transitoria propuesta.</li>
                        <li>b) La Comisión Directiva saliente no presente ninguna propuesta de Junta Gestora Transitoria.</li>
                        <li>c) Se produzca una vacancia masiva de la Comisión Directiva.</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 32º - Junta Electoral y Candidaturas</h3>
                      <p className="text-muted-foreground">
                        Si se activa el proceso de elecciones, la Asamblea General designará una Junta Electoral 
                        compuesta por tres Miembros Activos. Esta Junta convocará a la presentación de Listas 
                        Completas (Planchas) para los cargos de Presidente, Vicepresidente, Secretario General y Tesorero.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 33º - Traspaso de Funciones</h3>
                      <p className="text-muted-foreground">
                        La nueva Comisión Directiva electa, o la Junta Gestora Transitoria ratificada, asumirá sus 
                        funciones en la primera reunión que se llevará a cabo a más tardar quince días después de la 
                        Asamblea. La Comisión Directiva saliente deberá realizar un proceso formal de traspaso, el 
                        cual deberá incluir la entrega documentada de: Libros de Actas, Balance Financiero, Inventario 
                        General de Bienes y un Informe detallado de la Gestión y estado de los proyectos.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 34º - Vacancia Definitiva</h3>
                      <p className="text-muted-foreground">
                        En caso de vacancia definitiva del cargo de Presidente, asumirá el Vicepresidente. Si se 
                        produjera la vacancia de más de un miembro de la Comisión Directiva, se aplicará la 
                        Contingencia Electoral (Art. 31º) y se convocará inmediatamente a elecciones extraordinarias.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="finales" className="mt-0">
                <h2 className="text-2xl font-bold mb-6">Capítulo VI: Del Régimen de Asambleas y Disposiciones Finales</h2>
                <ScrollArea className="h-[50vh] pr-4">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 35º - Convocatoria</h3>
                      <p className="text-muted-foreground">
                        Las Asambleas serán convocadas por el Presidente, a través del Secretario General, con al 
                        menos quince (15) días de anticipación para las Ordinarias y diez (10) días para las Extraordinarias.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 36º - Quórum y Decisiones</h3>
                      <p className="text-muted-foreground">
                        El quórum para las Asambleas Generales será de la mitad más uno de los Miembros Activos en 
                        primera convocatoria. En segunda convocatoria, la Asamblea sesionará con los Miembros Activos 
                        presentes. Las decisiones se tomarán por mayoría simple, excepto en los casos especiales 
                        previstos en este Estatuto.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 37º - Modificación del Estatuto</h3>
                      <p className="text-muted-foreground">
                        El presente Estatuto podrá ser modificado total o parcialmente por la Asamblea General 
                        Extraordinaria. Las modificaciones deberán ser aprobadas por al menos dos tercios (2/3) de 
                        los Miembros Activos presentes.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 38º - Disolución y Destino de Bienes</h3>
                      <p className="text-muted-foreground">
                        El Club podrá disolverse por decisión de la Asamblea General Extraordinaria, con el voto 
                        favorable de al menos tres cuartos (3/4) de los Miembros Activos. En caso de disolución, una 
                        vez cubiertas las obligaciones pendientes, los bienes y recursos restantes serán donados a la 
                        Facultad de Ingeniería UNA para fines educativos relacionados con la informática y la programación.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 39º - Casos no Previstos</h3>
                      <p className="text-muted-foreground">
                        Los casos no previstos en el presente Estatuto serán resueltos mediante Reglamentos Internos 
                        propuestos por la Comisión Directiva y aprobados por la Asamblea General, o, en su defecto, 
                        por decisión de la Comisión Directiva con conocimiento de la Asesoría Docente/Tutor (Art. 28º).
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Artículo 40º - Vigencia</h3>
                      <p className="text-muted-foreground">
                        El presente Estatuto entrará en vigencia a partir de su aprobación por la Asamblea General 
                        Extraordinaria y posterior reconocimiento y registro por las autoridades competentes de la 
                        Facultad de Ingeniería UNA.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Approval & Signatures Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-muted-foreground mb-6">
            Aprobado en Asamblea Extraordinaria del Club de Programación
            FIUNA, realizada el día 7 de diciembre del 2025 en el Campus
            Universitario de San Lorenzo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-end">
            <div className="text-center">
              <img
                src="https://assets.cpfiuna.io/website/public/documentos/recursos/davidgimenez.png"
                alt="Firma David Alfredo Giménez Sánchez"
                loading="lazy"
                className="mx-auto h-20 mb-2 dark:filter dark:invert dark:brightness-150 transition"
              />
              <hr className="border-t border-muted w-56 mx-auto mb-2" />
              <p className="font-semibold">David Alfredo Giménez Sánchez</p>
              <p className="text-sm text-muted-foreground">Presidente del Club de Programación</p>
            </div>

            <div className="text-center">
              <img
                src="https://assets.cpfiuna.io/website/public/documentos/recursos/estebanibarra.png"
                alt="Firma Juan Esteban Ibarra Alderete"
                loading="lazy"
                className="mx-auto h-20 mb-2 dark:filter dark:invert dark:brightness-150 transition"
              />
              <hr className="border-t border-muted w-56 mx-auto mb-2" />
              <p className="font-semibold">Juan Esteban Ibarra Alderete</p>
              <p className="text-sm text-muted-foreground">Secretario del Club de Programación</p>
            </div>
          </div>
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
            href="https://assets.cpfiuna.io/website/public/documentos/cpf-estatuto.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <BookText className="h-5 w-5" />
            Abrir en nueva pestaña
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Estatuto;
