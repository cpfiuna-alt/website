
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo puedo unirme al Club de Programación?",
    answer: "Para unirte al Club de Programación FIUNA, simplemente completa el formulario de membresía disponible en nuestro sitio web o acércate a nuestra oficina en el campus de la FIUNA. No hay requisitos previos ni cuotas para ingresar, solo tu interés en el mundo de la programación."
  },
  {
    question: "¿Necesito tener experiencia en programación para participar?",
    answer: "¡No! El club está abierto a todos los niveles de experiencia, desde principiantes absolutos hasta programadores avanzados. Ofrecemos actividades y recursos para todos los niveles, incluyendo talleres introductorios para quienes recién comienzan."
  },
  {
    question: "¿Con qué frecuencia organizan eventos?",
    answer: "Organizamos eventos regularmente, con un promedio de 2-3 actividades por mes. Estos incluyen talleres prácticos, charlas técnicas, eventos de networking, hackathons y competencias de programación. Puedes encontrar el calendario actualizado en nuestra sección de eventos."
  },
  {
    question: "¿Ofrecen certificados por participar en los talleres?",
    answer: "Sí, emitimos certificados oficiales del Club de Programación FIUNA para los participantes que completen nuestros talleres y cursos. Estos certificados pueden ser útiles para tu currículum y desarrollo profesional."
  },
  {
    question: "¿Cómo puedo proponer un taller o proyecto?",
    answer: "¡Nos encanta la iniciativa! Puedes proponer un taller o proyecto a través de nuestro formulario de contacto o escribiéndonos directamente a clubdeprogramacion@ing.una.py. Valoramos las ideas de nuestra comunidad y te apoyaremos en el desarrollo de tu propuesta."
  },
];

const ContactFAQ = () => {
  return (
    <div className="glass-card p-8">
      <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ContactFAQ;
