
import React from "react";
import Layout from "@/components/layout/Layout";
import { Calendar, Users, Link2, ExternalLink } from "lucide-react";

const Press = () => {
  // Sample press appearances
  const pressAppearances = [
    {
      id: 1,
      title: "El Club de Programación FIUNA organiza hackathon nacional",
      media: "Diario ABC",
      date: "24 de mayo de 2023",
      type: "Prensa escrita",
      image: "/placeholder.svg",
      link: "https://example.com/press1",
    },
    {
      id: 2,
      title: "Entrevista sobre educación tecnológica en Paraguay",
      media: "Paraguay TV",
      date: "12 de julio de 2023",
      type: "Televisión",
      image: "/placeholder.svg",
      link: "https://example.com/press2",
    },
    {
      id: 3,
      title: "FIUNA destaca en competencia internacional de programación",
      media: "La Nación",
      date: "5 de octubre de 2023",
      type: "Prensa escrita",
      image: "/placeholder.svg",
      link: "https://example.com/press3",
    },
    {
      id: 4,
      title: "Las oportunidades de la programación en Paraguay",
      media: "Radio Nacional",
      date: "18 de noviembre de 2023",
      type: "Radio",
      image: "/placeholder.svg",
      link: "https://example.com/press4",
    },
    {
      id: 5,
      title: "Club de Programación FIUNA lanza iniciativa para escuelas",
      media: "Última Hora",
      date: "30 de enero de 2024",
      type: "Prensa escrita",
      image: "/placeholder.svg",
      link: "https://example.com/press5",
    },
    {
      id: 6,
      title: "La importancia de la formación tecnológica en la universidad",
      media: "Noticias Online",
      date: "27 de febrero de 2024",
      type: "Digital",
      image: "/placeholder.svg",
      link: "https://example.com/press6",
    },
  ];

  return (
    <Layout>
      {/* Hero section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sala de <span className="gradient-text">Prensa</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Cobertura mediática y apariciones en prensa del Club de Programación FIUNA.
            </p>
          </div>
        </div>
      </section>

      {/* Press appearances */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Apariciones en medios</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-center">
              Nuestras actividades e iniciativas han sido destacadas en diferentes medios de comunicación.
              A continuación presentamos algunas de nuestras apariciones más relevantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pressAppearances.map((item) => (
              <a 
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card overflow-hidden group hover:shadow-neon-blue transition-all"
              >
                <div className="relative h-48 bg-muted/20">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/80 text-white mb-2">
                        {item.type}
                      </span>
                      <h3 className="text-white font-medium line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.media}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Press kit section */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">¿Sos periodista o medio de comunicación?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Si querés realizar una entrevista o necesitás información para una nota, podés acceder a 
              nuestro kit de prensa o contactar directamente con nuestro equipo de comunicación.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/media-kit" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted text-foreground rounded-full font-medium transition-colors"
              >
                <Link2 className="h-5 w-5" />
                <span>Kit de Medios</span>
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Contactar al equipo</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Press;
