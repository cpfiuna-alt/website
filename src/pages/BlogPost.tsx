
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CalendarIcon, Clock, User, Tag, ArrowLeft, ThumbsUp, Bookmark, Share2 } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getContentBySlug, getAllBlogPosts } from "@/utils/staticSiteGenerator";
import { BlogFrontMatter } from "@/utils/markdownUtils";
import { formatDate } from "@/utils/markdownUtils";
import { Container } from "@/components/ui/container";
import { Avatar } from "@/components/ui/avatar";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<{frontMatter: BlogFrontMatter, content: string} | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogFrontMatter[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }
      
      setLoading(true);
      try {
        const blogPost = await getContentBySlug<BlogFrontMatter>('blog', slug);
        if (blogPost) {
          setPost(blogPost);
          // Set page title
          document.title = `${blogPost.frontMatter.title} | Club de Programación FIUNA`;
          
          // Get related posts based on tags
          const allPosts = await getAllBlogPosts();
          const filtered = allPosts
            .filter(p => p.frontMatter.slug !== slug) // Exclude current post
            .filter(p => {
              // Find posts with at least one common tag
              return p.frontMatter.tags?.some(tag => 
                blogPost.frontMatter.tags?.includes(tag)
              );
            })
            .map(p => p.frontMatter)
            .slice(0, 3); // Limit to 3 related posts
          
          setRelatedPosts(filtered);
        } else {
          // Redirect to blog page if post not found
          navigate("/blog");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        navigate("/blog");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="py-20">
          <Container>
            <div className="animate-pulse space-y-6 max-w-3xl mx-auto">
              <div className="h-8 bg-muted/50 rounded-lg w-3/4"></div>
              <div className="h-6 bg-muted/50 rounded-lg w-1/2"></div>
              <div className="h-[300px] bg-muted/50 rounded-lg w-full"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted/50 rounded w-full"></div>
                <div className="h-4 bg-muted/50 rounded w-full"></div>
                <div className="h-4 bg-muted/50 rounded w-5/6"></div>
              </div>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="py-20">
          <Container>
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">Post no encontrado</h1>
              <p className="mb-6 text-muted-foreground">
                El artículo que buscas no existe o ha sido removido.
              </p>
              <Link 
                to="/blog"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al blog
              </Link>
            </div>
          </Container>
        </div>
      </Layout>
    );
  }

  const { frontMatter, content } = post;

  return (
    <Layout>
      <article className="relative pb-16">
        {/* Back to blog button */}
        <div className="container mx-auto px-6 py-6">
          <Link 
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </div>
        
        {/* Cover image and header */}
        <div className="relative w-full h-[400px] md:h-[500px] mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img 
            src={frontMatter.image || "/placeholder.svg"} 
            alt={frontMatter.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container px-6 mx-auto">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center space-x-2 mb-4">
                  {frontMatter.tags && frontMatter.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/40 backdrop-blur-sm text-white rounded-full border border-white/30">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                  {frontMatter.title}
                </h1>
                
                {/* Author and date section */}
                <div className="flex items-center mt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-white overflow-hidden mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Escrito por {frontMatter.author}</div>
                    <div className="text-white/70 text-sm flex items-center mt-1">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {formatDate(frontMatter.date)}
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      {frontMatter.readTime || "5 min"} de lectura
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social sharing buttons */}
        <div className="container mx-auto px-6 mb-8">
          <div className="max-w-3xl mx-auto flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center text-sm text-muted-foreground hover:text-primary">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Me gusta
              </button>
              <button className="flex items-center text-sm text-muted-foreground hover:text-primary">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </button>
            </div>
            <button className="flex items-center text-sm text-muted-foreground hover:text-primary">
              <Bookmark className="h-4 w-4 mr-2" />
              Guardar
            </button>
          </div>
        </div>
        
        {/* Post content */}
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <MarkdownRenderer content={content} />
            </div>
            
            {/* Tags */}
            {frontMatter.tags && frontMatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {frontMatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Author bio */}
            <div className="glass-card p-6 mb-12">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 rounded-full">
                  <div className="bg-primary/20 h-full w-full flex items-center justify-center text-primary">
                    <User className="h-8 w-8" />
                  </div>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{frontMatter.author}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Coordinador de Competencias</p>
                  <p className="text-sm">
                    Apasionado por la programación competitiva y la enseñanza de algoritmos. Ha participado en 
                    múltiples competencias nacionales e internacionales, incluyendo el ICPC Latinoamericano.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug} 
                      to={`/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <div className="overflow-hidden rounded-lg h-40 mb-2">
                        <img 
                          src={relatedPost.image || "/placeholder.svg"} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                      <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatDate(relatedPost.date)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
