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
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="h-12 w-12 text-white mb-4"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <h3 className="text-xl font-semibold mb-2">X</h3>
              <p className="text-muted-foreground text-center">Noticias y anuncios</p>
            </a>
            <a 
              href={contactInfo.socials.discord}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinejoin="round"
                className="h-12 w-12 text-purple-500 mb-4"
              >
                <path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" />
              </svg>
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
