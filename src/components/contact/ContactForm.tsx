  import React, { useState } from "react";
  import { useToast } from "@/components/ui/use-toast";
  import emailjs from "@emailjs/browser"; // Import the emailjs library

  const ContactForm = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize emailjs with your public key
    emailjs.init("ZegUXZVKWicokuAMH"); // Replace with your actual public key

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Send the form data via EmailJS
        const form = e.target as HTMLFormElement;

        // Use emailjs.sendForm() to send the form
        const response = await emailjs.sendForm(
          "service_4mloo3j", // Replace with your actual service ID
          "template_aluz9q7", // Replace with your actual template ID
          form
        );

        if (response.status === 200) {
          // Show success message
          toast({
            title: "Mensaje enviado",
            description: "Hemos recibido tu mensaje. Te responderemos a la brevedad.",
            variant: "default",
          });

          // Reset form
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          throw new Error("Failed to send email");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.",
          variant: "destructive",
        });
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="glass-card p-8"
        id="contact-form" // Add the id to match the emailjs example
      >
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
              placeholder="tu.email@ejemplo.com"
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
              <option value="general">Consulta general</option>
              <option value="events">Eventos</option>
              <option value="projects">Proyectos</option>
              <option value="membership">Membresía</option>
              <option value="suggestion">Sugerencia</option>
              <option value="other">Otro</option>
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
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue disabled:opacity-70"
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>
      </form>
    );
  };

  export default ContactForm;
