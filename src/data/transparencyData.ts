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
    universityContribution: number;
    corporateSponsorship: number;
    ownActivities: number;
    donations: number;
  };
  expenses: {
    eventsAndActivities: number;
    competitions: number;
    projectDevelopment: number;
    equipment: number;
    administration: number;
  };
}

export interface Project {
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface ImpactProject {
  year: number;
  projects: Project[];
}

// Annual reports data
export const annualReports: YearlyReport[] = [
  // No reports published yet - will be added when first annual report is completed
  // Template for when adding first report:
  // {
  //   year: 2025,
  //   members: 50,
  //   events: 5,
  //   projects: 2,
  //   competitions: 1,
  // },
];

// Financial data for multiple years
export const financialData: FinancialData[] = [
  // No financial data available yet - will be added when first annual report is completed
  // Template for when adding first financial data:
  // {
  //   year: 2025,
  //   funding: {
  //     universityContribution: 60,
  //     corporateSponsorship: 20,
  //     ownActivities: 15,
  //     donations: 5,
  //   },
  //   expenses: {
  //     eventsAndActivities: 50,
  //     competitions: 20,
  //     projectDevelopment: 15,
  //     equipment: 10,
  //     administration: 5,
  //   },
  // },
];

// Impact projects data
export const impactProjects: ImpactProject[] = [
  // No impact projects documented yet - will be added as projects are completed
  // Template for when adding first impact project:
  // {
  //   year: 2025,
  //   projects: [
  //     {
  //       title: "First Club Project",
  //       description: "Description of your first completed project and its impact on the community.",
  //       metrics: [
  //         { label: "People reached", value: "100" },
  //         { label: "Hours invested", value: "200" },
  //         { label: "Team members", value: "5" },
  //       ],
  //     },
  //   ],
  // },
  {
  year: 2025,
  projects: [
    {
      title: "Aplicación de Reservas del Quincho FIUNA",
      description: "Desarrollamos una aplicación web para gestionar las reservas del quincho de la Facultad de Ingeniería, facilitando el proceso para estudiantes y personal.",
      metrics: [
        { label: "100+ Usuarios únicos", value: "100+" },
        { label: "72 Horas de desarrollo", value: "72" },
      ],
    },
  ],
  },
];

// Helper functions
export const getCurrentYearFinancialData = () => {
  const currentYear = new Date().getFullYear();
  return financialData.find(data => data.year === currentYear) || null;
};

export const getCurrentYearProjects = () => {
  const currentYear = new Date().getFullYear();
  return impactProjects.find(data => data.year === currentYear) || null;
};

export const getAvailableYears = () => {
  return [...new Set([
    ...annualReports.map(report => report.year),
    ...financialData.map(data => data.year),
    ...impactProjects.map(data => data.year)
  ])].sort((a, b) => b - a);
};

export const hasAnyData = () => {
  return annualReports.length > 0 || financialData.length > 0 || impactProjects.length > 0;
};
