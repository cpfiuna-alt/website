
import React from "react";
import { Star, GitFork, AlertCircle, Users } from "lucide-react";
import { GitHubStats } from "@/utils/markdownUtils";

interface ProjectGithubStatsProps {
  repoUrl: string;
  stats: GitHubStats;
}

const ProjectGithubStats = ({ repoUrl, stats }: ProjectGithubStatsProps) => {
  // Ensure stats has all required fields
  const safeStats: GitHubStats = {
    stars: stats.stars || 0,
    forks: stats.forks || 0,
    issues: stats.issues || 0,
    contributors: stats.contributors || 0
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <a
        href={`${repoUrl}/stargazers`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
      >
        <Star className="h-5 w-5 text-yellow-400 mb-1" />
        <div className="text-lg font-semibold">{safeStats.stars.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Stars</div>
      </a>
      
      <a
        href={`${repoUrl}/forks`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
      >
        <GitFork className="h-5 w-5 text-blue-400 mb-1" />
        <div className="text-lg font-semibold">{safeStats.forks.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Forks</div>
      </a>
      
      <a
        href={`${repoUrl}/issues`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
      >
        <AlertCircle className="h-5 w-5 text-red-400 mb-1" />
        <div className="text-lg font-semibold">{safeStats.issues.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Issues</div>
      </a>
      
      <a
        href={`${repoUrl}/graphs/contributors`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
      >
        <Users className="h-5 w-5 text-green-400 mb-1" />
        <div className="text-lg font-semibold">{safeStats.contributors.toLocaleString()}</div>
        <div className="text-xs text-muted-foreground">Contributors</div>
      </a>
    </div>
  );
};

export default ProjectGithubStats;
