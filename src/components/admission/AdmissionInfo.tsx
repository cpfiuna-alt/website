import React from "react";
import { Clock, Users, Calendar, Award } from "lucide-react";

const AdmissionInfo = () => {
  const benefits = [
    "Acceso a talleres y cursos exclusivos",
    "Mentorías personalizadas",
    "Participación en hackathons",
    "Networking con profesionales",
    "Proyectos colaborativos",
    "Certificaciones",
  ];

  const timeline = [
    { step: "Envío de solicitud", time: "Hoy" },
    { step: "Revisión inicial", time: "24-48h" },
    { step: "Entrevista (opcional)", time: "3-5 días" },
    { step: "Respuesta final", time: "1 semana" },
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
              Ser estudiante universitario activo, con ganas de aprender y 
              colaborar en proyectos tecnológicos.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Compromiso</h4>
            <p className="text-sm text-muted-foreground">
              Se espera participación activa en al menos 2 actividades por mes.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2">Contacto</h4>
            <p className="text-sm text-muted-foreground">
              ¿Dudas? Escríbenos a{" "}
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
