import React from "react";
import { Clock, Users, Calendar, Award } from "lucide-react";

const AdmissionInfo = () => {
  const benefits = [
    "Talleres y cursos exclusivos",
    "Mentorías personalizadas",
    "Participación en competencias",
    "Invitaciones a eventos especiales",
    "Networking con profesionales",
    "Proyectos colaborativos",
    "Certificaciones",
    "Y más..."
  ];

  const timeline = [
    { step: "Envío de solicitud", time: "Hoy" },
    { step: "Revisión inicial", time: "5-7 días" },
    { step: "Entrevista (si hace falta)", time: "1-2 semanas" },
    { step: "Respuesta final", time: "3-4 semanas" },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card-static p-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Beneficios del Club
        </h3>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-card-static p-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Proceso de Admisión
        </h3>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium">{item.step}</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card-static p-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Información Adicional
        </h3>
        <div className="space-y-4">
            <div>
            <h4 className="font-medium text-sm mb-2">Requisitos</h4>
            <p className="text-sm text-muted-foreground">
              Interés por la programación y ganas de aprender y colaborar en proyectos.
              No se exige un nivel técnico previo: valoramos la actitud, el esfuerzo y la
              predisposición para participar.
            </p>
            </div>
            <div>
            <h4 className="font-medium text-sm mb-2">Compromiso</h4>
            <p className="text-sm text-muted-foreground">
              Se espera asistencia a las asambleas y la participación en al menos
              un proyecto, competencia o actividad al año. Entendemos distintos ritmos,
              pero se valora la constancia.
            </p>
            </div>
            <div>
            <h4 className="font-medium text-sm mb-2">Contacto</h4>
            <p className="text-sm text-muted-foreground">
              ¿Dudas? Escríbínos al correo{" "}
              <a 
                href="mailto:clubdeprogramacion@ing.una.py" 
                className="text-primary hover:underline"
              >
                clubdeprogramacion@ing.una.py
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionInfo;
