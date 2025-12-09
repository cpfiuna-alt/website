import React from "react";
import { Code, Terminal, Award, Lightbulb, ChevronRight, Compass, Brain } from "lucide-react";
import { learningRoadmaps, Roadmap } from "@/data/learningRoadmaps";

const RoadmapCardIcon = ({ id }: { id: string }) => {
  switch (id) {
    case "frontend":
      return <Code className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "backend":
      return <Terminal className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "devops":
      return <Award className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "datascience":
      return <Lightbulb className="h-10 w-10 mb-4 text-primary mx-auto" />;
    case "artificialintelligence":
      return <Brain className="h-10 w-10 mb-4 text-primary mx-auto" />;
    default:
      return null;
  }
};

const LearningRoadmaps: React.FC = () => {
  const externalRoadmapLinks: Record<string, string> = {
    frontend: "https://roadmap.sh/frontend",
    backend: "https://roadmap.sh/backend",
    devops: "https://roadmap.sh/devops",
    datascience: "https://roadmap.sh/ai-data-scientist",
    artificialintelligence: "https://roadmap.sh/ai-engineer",
  };

  return (
    <section className="py-16 bg-muted/30 dark:bg-black/20">
      <div className="container mx-auto px-6">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center mb-4 h-12 w-12 rounded-full bg-primary/10">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Rutas de <span className="gradient-text">Aprendizaje</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sigue estas guías estructuradas para desarrollar tus habilidades de programación,
            desde principiante hasta experto en diferentes áreas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {learningRoadmaps.map((roadmap: Roadmap) => {
            const href = externalRoadmapLinks[roadmap.id] || "#";
            return (
              <a
                key={roadmap.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-4 text-left transition-all h-full flex flex-col justify-between items-start hover:shadow-neon-blue hover:ring-2 hover:ring-primary/50"
              >
                <div className="flex-1 flex flex-col justify-start">
                  <div className="w-full flex justify-center">
                    <RoadmapCardIcon id={roadmap.id} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-center w-full">{roadmap.title}</h3>
                  <p className="text-muted-foreground text-xs mb-4 text-center w-full">{roadmap.description}</p>
                </div>

                <div className="w-full flex items-center justify-center text-primary text-sm font-medium">
                  <span>Ver en roadmap.sh</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmaps;
