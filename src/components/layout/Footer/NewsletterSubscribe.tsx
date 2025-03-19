
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor ingresa tu email");
      return;
    }
    
    // Simple email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Por favor ingresa un email válido");
      return;
    }
    
    setLoading(true);
    
    try {
      // This would be replaced with an actual API call
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // For now, we'll just simulate a successful subscription
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("¡Te has suscrito exitosamente!");
      setEmail("");
    } catch (error) {
      toast.error("Hubo un error al suscribirte. Por favor intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full py-2">
      <h3 className="text-sm font-semibold mb-2">Suscríbete a nuestro boletín</h3>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10"
            disabled={loading}
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button type="submit" disabled={loading} className="whitespace-nowrap">
          {loading ? "Suscribiendo..." : "Suscribirse"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
