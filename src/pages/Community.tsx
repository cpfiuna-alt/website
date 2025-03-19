
import Layout from "@/components/layout/Layout";
import { Instagram, Twitter, Youtube, Disc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { contactInfo } from "@/config/site";

const Community = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-black to-background/90 dark:from-black dark:to-background/70">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Nuestra <span className="gradient-text">Comunidad</span>
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Conectate con nuestra comunidad a través de redes sociales, Discord y más.
          </p>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <a 
              href={contactInfo.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <Youtube className="h-12 w-12 text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">YouTube</h3>
              <p className="text-muted-foreground text-center">Tutoriales, charlas y eventos</p>
            </a>
            
            <a 
              href={contactInfo.socials.instagram}
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <Instagram className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-muted-foreground text-center">Fotos y actualizaciones diarias</p>
            </a>
            
            <a 
              href={contactInfo.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <Twitter className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Twitter</h3>
              <p className="text-muted-foreground text-center">Noticias y anuncios</p>
            </a>
            
            <a 
              href={contactInfo.socials.discord}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <Disc className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Discord</h3>
              <p className="text-muted-foreground text-center">Chatea con la comunidad</p>
            </a>
          </div>
        </div>
      </section>

      {/* YouTube Videos */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Videos <span className="gradient-text">Recientes</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card overflow-hidden hover:scale-105 hover:shadow-neon-blue transition-all">
                <div className="aspect-video bg-muted/20 dark:bg-black/30 flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Título del Video {item}</h3>
                  <p className="text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod magna vel.</p>
                  <a 
                    href={contactInfo.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Ver en YouTube
                    <Youtube className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="default" className="rounded-full px-6 py-2 hover:scale-105 hover:shadow-neon-blue transition-all">
              <a href={contactInfo.socials.youtube} target="_blank" rel="noreferrer">
                Ver más videos
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Posts */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Instagram <span className="gradient-text">Feed</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="aspect-square bg-muted/20 dark:bg-black/30 rounded-lg overflow-hidden hover:scale-105 transition-transform">
                <img 
                  src="/placeholder.svg" 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="default" className="rounded-full px-6 py-2 hover:scale-105 hover:shadow-neon-blue transition-all">
              <a href={contactInfo.socials.instagram} target="_blank" rel="noreferrer">
                Seguirnos en Instagram
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Projects & Collaborations */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Proyectos de la <span className="gradient-text">Comunidad</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-card overflow-hidden hover:scale-105 hover:shadow-neon-blue transition-all">
                <div className="aspect-video bg-muted/20 dark:bg-black/30 flex items-center justify-center">
                  <img 
                    src="/placeholder.svg" 
                    alt="Project thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Proyecto Colaborativo {item}</h3>
                  <p className="text-muted-foreground mb-4">Un proyecto desarrollado por miembros de nuestra comunidad.</p>
                  <Link 
                    to="/projects"
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="default" className="rounded-full px-6 py-2 hover:scale-105 hover:shadow-neon-blue transition-all">
              <Link to="/projects">
                Ver todos los proyectos
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Community;
