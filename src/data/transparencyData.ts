export interface YearlyReport {
  year: number;
  members: number;
  events: number;
  projects: number;
  competitions: number;
}

export interface FinancialData {
  year: number;
  funding: {
    universityContribution?: number;
    corporateSponsorship?: number;
    ownActivities?: number;
    donations?: number;
  };
  expenses: {
    eventsAndActivities?: number;
    competitions?: number;
    projectDevelopment?: number;
    equipment?: number;
    administration?: number;
  };
}

export interface Project {
  title: string;
  description: string;
}

export interface ImpactProject {
  year: number;
  projects: Project[];
}

// Annual reports data
export const annualReports: YearlyReport[] = [
  {
    year: 2024,
    members: 11,
    events: 1,
    projects: 1,
    competitions: 1,
  },
  {
    year: 2025,
    members: 18,
    events: 5,
    projects: 7,
    competitions: 5,
  },
];

// Financial data for multiple years
export const financialData: FinancialData[] = [
  {
    year: 2025,
    funding: {
      //universityContribution: 0,
      //corporateSponsorship: 0,
      //ownActivities: 80,
      donations: 100,
    },
    expenses: {
      //competitions: 20,
      projectDevelopment: 59,
      equipment: 25,
      eventsAndActivities: 16,
      //administration: 5,
    },
  },
];

// Impact projects data (minimal: title + description)
export const impactProjects: ImpactProject[] = [
  {
    year: 2025,
    projects: [
      {
        title: "Página web oficial del Club",
        description:
          "Sitio oficial con estructura y diseño propio. Plataforma centralizada y funcional para información y recursos.",
      },
      {
        title: "Bot para el Discord oficial del Club (Bichito)",
        description:
          "Construcción y despliegue en Azure para automatización interna y apoyo a miembros.",
      },
      {
        title: "Desarrollo de un hub de enlaces propio",
        description:
          "Hub de enlaces construido por el Club: acceso centralizado y control total sobre nuestros recursos.",
      },
      {
        title: "App de reservas del quincho FIUNA",
        description:
          "Desarrollo y entrega del sistema de reservas del quincho; herramienta útil para la comunidad estudiantil.",
      },
    ],
  },
];

// Helper functions
export const getCurrentYearFinancialData = () => {
  const currentYear = new Date().getFullYear();
  return financialData.find((data) => data.year === currentYear) || null;
};

export const getCurrentYearProjects = () => {
  const currentYear = new Date().getFullYear();
  return impactProjects.find((data) => data.year === currentYear) || null;
};

export const getAvailableYears = () => {
  return [
    ...new Set([
      ...annualReports.map((report) => report.year),
      ...financialData.map((data) => data.year),
      ...impactProjects.map((data) => data.year),
    ]),
  ].sort((a, b) => b - a);
};

export const hasAnyData = () => {
  return (
    annualReports.length > 0 || financialData.length > 0 || impactProjects.length > 0
  );
};
