import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Github, Mail, MessageSquare, Twitter, Send } from "lucide-react";
import { toast } from "sonner";
import { contactInfo } from "@/config/site";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, this would send the form data to an API endpoint
    // For now, we'll simulate the form submission
    try {
      // This is where you would make an API call to your backend
      // For example:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     ...formData,
      //     to: contactInfo.email // Send to the configured email
      //   })
      // });
      
      // Simulation of a successful form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("¡Mensaje enviado con éxito!", {
        description: "Nos pondremos en contacto contigo pronto."
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Error al enviar el mensaje", {
        description: "Por favor, intenta nuevamente más tarde."
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background dark:from-black/60 dark:via-transparent dark:to-black/60 z-0"></div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl z-0 opacity-70"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full blur-3xl z-0 opacity-70"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Contáctanos
          </h1>
          
          <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-16">
            Estamos a tu disposición para responder cualquier consulta o propuesta de colaboración.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Tu mensaje o consulta..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:shadow-neon-blue disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      Enviar mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Correo electrónico</h3>
                      <a 
                        href="mailto:contacto@cpf.com.py" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        contacto@cpf.com.py
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MessageSquare className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Discord</h3>
                      <a 
                        href="https://discord.gg/cpfiuna" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        discord.gg/cpfiuna
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Github className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">GitHub</h3>
                      <a 
                        href="https://github.com/cpfiuna" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        github.com/cpfiuna
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Twitter className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Twitter</h3>
                      <a 
                        href="https://twitter.com/cpfIUNA" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        @cpfIUNA
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8">
                <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
                <p className="text-muted-foreground mb-2">
                  Facultad de Ingeniería UNA
                </p>
                <p className="text-muted-foreground">
                  Campus Universitario <br />
                  San Lorenzo, Paraguay
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-muted/50 dark:bg-black/60 text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">
            Únete a nuestra <span className="gradient-text">comunidad</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conéctate con nosotros en nuestras redes sociales para estar al día con todas 
            nuestras actividades y eventos.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/cpfiuna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all hover:scale-110 hover:shadow-neon-blue"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://discord.gg/cpfiuna"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all hover:scale-110 hover:shadow-neon-blue"
              aria-label="Discord"
            >
              <MessageSquare className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/cpfIUNA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all hover:scale-110 hover:shadow-neon-blue"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="mailto:contacto@cpf.com.py"
              className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all hover:scale-110 hover:shadow-neon-blue"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
