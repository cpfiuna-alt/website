
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="min-h-[calc(100vh-20rem)] flex flex-col items-center justify-center py-20 px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-6 relative mx-auto w-24 h-24 md:w-32 md:h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-7xl font-bold text-primary/80">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Página no encontrada</h1>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Lo sentimos, la página que estás buscando no existe o ha sido movida a otra ubicación.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg" className="rounded-full">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link to="#" onClick={() => window.history.back()} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Página anterior
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
