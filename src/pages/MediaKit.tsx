
import React from "react";
import Layout from "@/components/layout/Layout";
import { Download, PaintBucket, FileImage, FileCode, Package, Link2 } from "lucide-react";
import { contactInfo } from "@/config/site";

const MediaKit = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kit de <span className="gradient-text">Medios</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Recursos oficiales del Club de Programación FIUNA para diseñadores, patrocinadores y colaboradores.
            </p>
          </div>
        </div>
      </section>

      {/* Brand assets section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Identidad visual</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestra marca representa nuestra misión de fomentar el aprendizaje colaborativo y el desarrollo
              tecnológico en la comunidad universitaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Logo section */}
            <div className="glass-card p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-4">Logo</h3>
              <div className="bg-muted/20 flex-grow rounded-lg p-8 flex items-center justify-center mb-6">
                <img 
                  src="/path/to/logo.png" 
                  alt="Logo del Club de Programación FIUNA"
                  className="max-w-full max-h-48"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Nuestro logo puede utilizarse sobre fondos claros u oscuros. Mantenga siempre un área
                de protección alrededor del logo.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/media-kit/logo/svg" 
                  className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
                >
                  <FileCode className="h-4 w-4" />
                  <span>SVG</span>
                </a>
                <a 
                  href="/media-kit/logo/png" 
                  className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
                >
                  <FileImage className="h-4 w-4" />
                  <span>PNG</span>
                </a>
                <a 
                  href="/media-kit/logo/pdf" 
                  className="flex items-center gap-2 px-3 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
                >
                  <FileImage className="h-4 w-4" />
                  <span>PDF</span>
                </a>
              </div>
            </div>

            {/* Colors section */}
            <div className="glass-card p-8 flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-4">Colores</h3>
              <div className="grid grid-cols-2 gap-4 mb-6 flex-grow">
                <div className="flex flex-col">
                  <div className="h-24 bg-primary rounded-lg mb-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Primario</p>
                    <p className="text-muted-foreground">HEX: #0070f3</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-24 bg-secondary rounded-lg mb-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Secundario</p>
                    <p className="text-muted-foreground">HEX: #7E69AB</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-24 bg-background rounded-lg border mb-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Fondo</p>
                    <p className="text-muted-foreground">HEX: #1A1A1A</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="h-24 bg-muted rounded-lg mb-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">Muted</p>
                    <p className="text-muted-foreground">HEX: #333333</p>
                  </div>
                </div>
              </div>
              <a 
                href="/media-kit/colors.pdf" 
                className="flex items-center justify-center gap-2 px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm transition-colors"
              >
                <PaintBucket className="h-4 w-4" />
                <span>Descargar paleta de colores</span>
              </a>
            </div>
          </div>

          {/* Typography section */}
          <div className="glass-card p-8 mb-16">
            <h3 className="text-xl font-semibold mb-4">Tipografía</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg mb-3">Titulares</h4>
                <div className="p-4 bg-muted/20 rounded-lg mb-4">
                  <p className="text-4xl font-bold">Inter</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Inter es nuestra fuente principal para titulares. Se debe utilizar en negrita para los
                  encabezados principales y semi-negrita para subtítulos.
                </p>
              </div>
              <div>
                <h4 className="text-lg mb-3">Cuerpo de texto</h4>
                <div className="p-4 bg-muted/20 rounded-lg mb-4">
                  <p className="text-lg">Inter</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Para el texto de los párrafos y la interfaz de usuario, utilizamos Inter en peso regular
                  o medio para mayor legibilidad.
                </p>
              </div>
            </div>
            <a 
              href="/media-kit/fonts.zip" 
              className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-muted/30 hover:bg-muted/50 rounded-lg text-sm w-fit mx-auto transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Descargar fuentes</span>
            </a>
          </div>

          {/* Complete package */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-semibold mb-4">Paquete completo</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Descarga todos los recursos del Media Kit en un solo archivo, incluyendo logos,
              guía de marca, paleta de colores y tipografía.
            </p>
            <a 
              href="/media-kit/cpfiuna-media-kit.zip" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all hover:shadow-neon-blue"
            >
              <Package className="h-5 w-5" />
              <span>Descargar Media Kit completo</span>
            </a>
          </div>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Directrices de uso</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Para mantener la consistencia de nuestra marca, seguí estas directrices
              al utilizar nuestros recursos visuales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Lo que debés hacer</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                  <span>Mantener el espacio libre alrededor del logo</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                  <span>Usar los colores oficiales de la marca</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                  <span>Utilizar las versiones de alta resolución del logo</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✓</span>
                  <span>Respetar las proporciones originales</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Lo que no debés hacer</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                  <span>Distorsionar, estirar o comprimir el logo</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                  <span>Cambiar los colores del logo</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                  <span>Aplicar efectos o sombras no autorizados</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mr-2 mt-0.5 shrink-0">✗</span>
                  <span>Usar el logo en un fondo que reduzca su visibilidad</span>
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-3">Requisitos de atribución</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Cuando utilices nuestros recursos en cualquier material, incluí la siguiente atribución:
              </p>
              <div className="p-3 bg-muted/20 rounded-lg text-sm mb-4">
                <p className="font-mono">© {new Date().getFullYear()} Club de Programación FIUNA. Todos los derechos reservados.</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Para uso comercial o preguntas específicas, contactá con: {contactInfo.email}
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">¿Necesitás ayuda?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Si tenés preguntas sobre el uso de nuestros recursos o necesitás formatos adicionales,
              no dudes en contactarnos.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted text-foreground rounded-full font-medium transition-colors"
            >
              <Link2 className="h-5 w-5" />
              <span>Contactar al equipo</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MediaKit;
