
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DocHeader from "./DocHeader";
import DocMetadata from "./DocMetadata";
import DocTabs from "./DocTabs";
import DocFeedback from "./DocFeedback";
import DocContentLoader from "./DocContentLoader";

const DocContent: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <DocContentLoader slug={slug}>
        {({ docData, loading, sections }) => {
          if (loading) {
            return (
              <div className="animate-pulse">
                <div className="h-8 bg-muted rounded-md w-1/3 mb-6"></div>
                <div className="h-4 bg-muted rounded-md w-full mb-3"></div>
                <div className="h-4 bg-muted rounded-md w-5/6 mb-3"></div>
                <div className="h-4 bg-muted rounded-md w-4/6 mb-3"></div>
              </div>
            );
          }
          
          if (!docData) {
            return (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h1 className="text-3xl font-bold">Documentación no encontrada</h1>
                <p>Lo sentimos, no pudimos encontrar la documentación solicitada.</p>
                <button 
                  onClick={() => navigate('/docs')}
                  className="text-primary hover:underline flex items-center mt-4"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Volver a la documentación
                </button>
              </div>
            );
          }
          
          return (
            <>
              <DocHeader 
                title={docData.frontMatter.title} 
                slug={slug} 
                frontMatter={docData.frontMatter} 
              />
              
              <DocMetadata frontMatter={docData.frontMatter} />
              
              <DocTabs 
                sections={sections} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab}
                frontMatter={docData.frontMatter}
              />
              
              <DocFeedback />
            </>
          );
        }}
      </DocContentLoader>
    </div>
  );
};

export default DocContent;
