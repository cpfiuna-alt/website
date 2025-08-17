import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa tu nombre",
        variant: "destructive",
      });
      return false;
    }
  
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor ingresa un correo electrónico válido",
        variant: "destructive",
      });
      return false;
    }
  
    if (!formData.subject) {
      toast({
        title: "Error",
        description: "Por favor selecciona un asunto",
        variant: "destructive",
      });
      return false;
    }
  
    if (!formData.message.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe un mensaje",
        variant: "destructive",
      });
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Add debugging
    console.log("Form submission started");
    console.log("Form data:", formData);
    console.log("Google Apps Script URL:", "https://script.google.com/macros/s/AKfycbw3j5FMVQnOqfwu-wn2w24qf6mM73SRZfbfraDycz__YKS5lfjCR21S7UCQ2LoO1s4X/exec");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbw3j5FMVQnOqfwu-wn2w24qf6mM73SRZfbfraDycz__YKS5lfjCR21S7UCQ2LoO1s4X/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log("Fetch completed (no-cors mode - can't read response)");
      console.log("Check your Google Sheets to verify if data was received");

      // Since we can't read the response in no-cors mode, we assume success
      toast({
        title: "Mensaje enviado",
        description: "Hemos recibido tu mensaje. Te responderemos a la brevedad.",
        variant: "default",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card-static p-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Tu nombre"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="email@ejemplo.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Asunto
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="">Selecciona un asunto</option>
            <option value="Consulta General">Consulta General</option>
            <option value="Sugerencia">Sugerencias</option>
            <option value="Membresía">Membresía</option>
            <option value="Proyectos">Proyectos</option>
            <option value="Eventos">Eventos</option>
            <option value="Prensa">Prensa</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="Escribe tu mensaje aquí..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-neon-blue'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span>
              Enviando...
            </span>
          ) : (
            'Enviar mensaje'
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
