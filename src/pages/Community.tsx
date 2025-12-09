import Layout from "@/components/layout/Layout";
import { useEffect, useState } from "react";
import { Instagram, Twitter, Youtube, Disc } from "lucide-react";
import { FaGithub, FaDiscord, FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { contactInfo } from "@/config/site";
// import { useXFeed } from "@/hooks/useXFeed";

const Community = () => {
  // const { posts, loading, error } = useXFeed();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Nuestra <span className="gradient-text">Comunidad</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Conectate con nuestra comunidad a través de redes sociales y más.
            </p>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 px-6 bg-muted/50 dark:bg-black/40">
        <div className="container mx-auto max-w-8xl flex justify-center">
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16 items-stretch justify-center">
            <a 
              href={contactInfo.socials.github}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaGithub className="h-12 w-12 text-black dark:text-white mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">GitHub</h3>
              <p className="text-muted-foreground text-center w-full">Código fuente y proyectos</p>
            </a>
            <a 
              href={contactInfo.socials.discord}
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaDiscord className="h-12 w-12 text-purple-500 mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">Discord</h3>
              <p className="text-muted-foreground text-center w-full">Chatea con la comunidad</p>
            </a>
            <a 
              href={contactInfo.socials.twitter}
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaXTwitter className="h-12 w-12 text-black dark:text-white mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">X</h3>
              <p className="text-muted-foreground text-center w-full">Noticias y anuncios importantes</p>
            </a>
            <a 
              href={contactInfo.socials.instagram}
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaInstagram className="h-12 w-12 text-pink-500 mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">Instagram</h3>
              <p className="text-muted-foreground text-center w-full">Fotos y actualizaciones</p>
            </a>
            <a 
              href={contactInfo.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaYoutube className="h-12 w-12 text-red-500 mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">YouTube</h3>
              <p className="text-muted-foreground text-center w-full">Tutoriales, charlas y eventos</p>
            </a>
            <a 
              href={contactInfo.socials.linkedin}
              target="_blank" 
              rel="noreferrer"
              className="glass-card p-6 flex flex-col items-center justify-center h-44 md:h-48 lg:h-52 w-full hover:scale-105 hover:shadow-neon-blue transition-all"
            >
              <FaLinkedin className="h-12 w-12 text-blue-700 mb-4 flex-none" />
              <h3 className="text-xl font-semibold mb-2 flex-none">LinkedIn</h3>
              <p className="text-muted-foreground text-center w-full">Conéctate profesionalmente</p>
            </a>
          </div>
        </div>
      </section>

      {/* Instagram Embed (static) */}
      {/* <section className="py-16 px-6 bg-muted/50 dark:bg-black/40">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Instagram <span className="gradient-text">Feed</span>
          </h2>

          <InstagramEmbed />

          <div className="text-center">
            <Button asChild variant="default" className="rounded-full px-6 py-2 hover:scale-105 hover:shadow-neon-blue transition-all">
              <a href={contactInfo.socials.instagram} target="_blank" rel="noreferrer">
                Ver más en Instagram
              </a>
            </Button>
          </div>
        </div>
      </section> */}

       {/* YouTube Videos */}
      {/* <section className="py-16 px-6">
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
      </section> */}

      {/* X / Twitter Feed (live) */}
      {/* <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Últimas de <span className="gradient-text">X</span>
          </h2>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card p-4 animate-pulse">
                  <div className="h-4 bg-muted/30 rounded w-1/4 mb-3"></div>
                  <div className="h-3 bg-muted/20 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted/20 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          )}

          {!loading && posts && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map((p) => (
                <article key={p.id} className="glass-card p-4 hover:scale-102 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-none">
                      <div className="h-12 w-12 rounded-full bg-muted/30 dark:bg-black/40 flex items-center justify-center">
                        <FaXTwitter className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Club de Programación FIUNA</div>
                          <div className="text-sm text-muted-foreground">@cpfiuna · {p.created_at ? new Date(p.created_at).toLocaleString() : ''}</div>
                        </div>
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground">Ver</a>
                      </div>
                      <p className="mt-3 text-base text-muted-foreground whitespace-pre-wrap">{p.text}</p>
                      {p.media && p.media.length > 0 && (
                        <img src={p.media[0]} alt="media" className="mt-3 w-full rounded-lg object-cover" />
                      )}
                      <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>❤ {p.public_metrics?.like_count ?? 0}</span>
                        <span>•</span>
                        <span>🔁 {p.public_metrics?.retweet_count ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && (!posts || posts.length === 0) && (
            <div className="mb-8">
              <p className="text-center text-base text-muted-foreground">No hay posts disponibles.</p>
            </div>
          )}

          <div className="text-center">
            <Button asChild variant="default" className="rounded-full px-6 py-2 hover:scale-105 hover:shadow-neon-blue transition-all">
              <a href={contactInfo.socials.twitter} target="_blank" rel="noreferrer">Ver más en X</a>
            </Button>
          </div>
        </div>
      </section> */}
      {/* Discord Widget Section (embedded) */}
      {/* <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Conéctate en <span className="gradient-text">Discord</span></h2>
          <DiscordWidget />
        </div>
      </section> */}
    </Layout>
  );
};

export default Community;

/* function InstagramEmbed() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current || typeof document === "undefined") return;

    const html = `
<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/cpfiuna" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:undefinedpx;height:undefinedpx;max-height:100%; width:undefinedpx;"><div style="padding:16px;"> <a id="main_link" href="cpfiuna" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="cpfiuna" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Shared post</a> on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;">Time</time></p></div></blockquote><script src="https://www.instagram.com/embed.js"></script><script type="text/javascript" src="https://www.embedista.com/j/instagramfeed1707.js"></script><div style="overflow: auto; position: absolute; height: 0pt; width: 0pt;"><a href="https://www.embedista.com/instagramfeed">Embed Instagram Post</a> Code Generator</div></div><style>.boxes3{height:175px;width:153px;} #n img{max-height:none!important;max-width:none!important;background:none!important} #inst i{max-height:none!important;max-width:none!important;background:none!important}</style></div>
`;

    const node = ref.current;
    if (node) node.innerHTML = html;

    const s1 = document.createElement("script");
    s1.src = "https://www.instagram.com/embed.js";
    s1.async = true;
    document.body.appendChild(s1);

    const s2 = document.createElement("script");
    s2.src = "https://www.embedista.com/j/instagramfeed1707.js";
    s2.async = true;
    document.body.appendChild(s2);

    return () => {
      if (node) node.innerHTML = "";
      if (s1.parentNode) s1.parentNode.removeChild(s1);
      if (s2.parentNode) s2.parentNode.removeChild(s2);
    };
  }, []);

  return <div ref={ref} />;
} */

/* function DiscordWidget() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    const getDark = () => el.classList.contains("dark");
    setIsDark(getDark());

    const mo = new MutationObserver(() => setIsDark(getDark()));
    mo.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const src = `https://discord.com/widget?id=1346866111421091861&theme=${isDark ? "dark" : "light"}`;
    return (
      <div className="flex flex-col items-center gap-4">
        <a href={contactInfo.socials.instagram} target="_blank" rel="noreferrer" className="glass-card p-6 rounded-lg inline-flex items-center gap-4">
          <FaInstagram className="h-8 w-8 text-pink-500" />
          <div>
            <div className="font-semibold">Síguenos en Instagram</div>
            <div className="text-sm text-muted-foreground">@cpfiuna</div>
          </div>
        </a>
        <div className="text-sm text-muted-foreground">Instagram embeds disabled for privacy and security.</div>
      </div>
    );
  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-[350px]">
          <iframe
            src={src}
            className="w-full rounded-lg"
            style={{ border: 0, height: 'min(60vh, 500px)' }}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            title="Discord server widget"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        Si el widget de Discord está bloqueado por tu navegador o por la Política de Seguridad de Contenido del sitio, abre nuestro Discord directamente:
        <div>
          <a href={contactInfo.socials.discord} target="_blank" rel="noreferrer" className="text-primary hover:underline">
            Unirse al Discord
          </a>
        </div>
      </div>
    </>
  );
} */
