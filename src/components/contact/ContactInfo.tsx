
import React from "react";
import { MapPin, Mail, Share2 } from "lucide-react";
import { SiGithub, SiDiscord, SiX, SiInstagram, SiYoutube } from "react-icons/si";
import { FaGithub, FaDiscord, FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";

const ContactInfo = () => {
  return (
    <div className="glass-card-static p-8">
      <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
          <div>
            <h3 className="font-medium">Dirección</h3>
            <p className="text-muted-foreground mt-1">
              Campus Universitario, San Lorenzo, Paraguay
              <br />
              Facultad de Ingeniería de la Universidad Nacional de Asunción
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
          <div>
            <h3 className="font-medium">Email</h3>
            <a 
              href="mailto:clubdeprogramacion@ing.una.py" 
              className="text-muted-foreground hover:text-primary transition-colors mt-1 block"
            >
              clubdeprogramacion@ing.una.py
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <Share2 className="h-6 w-6 text-primary mr-4 mt-1" />
          <div>
            <h3 className="font-medium">Redes sociales</h3>
            <div className="flex space-x-4 mt-2">
             <a 
                href="https://github.com/cpfiuna" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.com/invite/fncpNatR" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/cpfiuna" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (formerly Twitter)"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/cpfiuna" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/channel/cpfiuna" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/cpfiuna" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:clubdeprogramacion@ing.una.py" 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
