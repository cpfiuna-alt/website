// Estadísticas globales del Club de Programación FIUNA (CPF)
// Este archivo centraliza todos los números y contadores para mantener consistencia

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

// Estadísticas principales del CPF
export const CPF_STATS = {
  // Números principales
  MIEMBROS_ACTIVOS: 18,
  PROYECTOS_REALIZADOS: 6,
  EVENTOS_ORGANIZADOS: 8,
  PREMIOS_RECIBIDOS: 7,
  COMPETENCIAS_PARTICIPADAS: 14,
  CONTRIBUCIONES_GITHUB: 0,
  ALIADOS_COLABORADORES: 0,
  
  // Años de historia
  AÑOS_FUNDACION: 2017,
  get AÑOS_HISTORIA() {
    return new Date().getFullYear() - this.AÑOS_FUNDACION;
  }
};

// Estadísticas para la página "Nosotros" (About)
export const ABOUT_STATS: StatItem[] = [
  {
    value: CPF_STATS.PROYECTOS_REALIZADOS,
    label: "Proyectos",
  },
  {
    value: CPF_STATS.MIEMBROS_ACTIVOS,
    label: "Miembros",
  },
  {
    value: CPF_STATS.EVENTOS_ORGANIZADOS,
    label: "Eventos",
  },
  {
    value: CPF_STATS.PREMIOS_RECIBIDOS,
    label: "Premios",
  },
  {
    value: CPF_STATS.CONTRIBUCIONES_GITHUB,
    label: "Contribuciones",
  },
  {
    value: CPF_STATS.ALIADOS_COLABORADORES,
    label: "Aliados",
  },
];

// Estadísticas para la página "Logros"
export const LOGROS_STATS: StatItem[] = [
  {
    value: CPF_STATS.MIEMBROS_ACTIVOS,
    label: "Miembros activos",
    suffix: "",
  },
  {
    value: CPF_STATS.PREMIOS_RECIBIDOS,
    label: "Premios ganados",
    suffix: "",
  },
  {
    value: CPF_STATS.COMPETENCIAS_PARTICIPADAS,
    label: "Competencias",
    suffix: "",
  },
  {
    value: CPF_STATS.EVENTOS_ORGANIZADOS,
    label: "Eventos atendidos",
    suffix: "",
  },
];

// Estadísticas adicionales para otras secciones si se necesitan
export const HERO_STATS: StatItem[] = [
  {
    value: CPF_STATS.MIEMBROS_ACTIVOS,
    label: "Miembros Activos",
    prefix: "+",
  },
  {
    value: CPF_STATS.EVENTOS_ORGANIZADOS,
    label: "Eventos Realizados",
  },
  {
    value: CPF_STATS.PROYECTOS_REALIZADOS,
    label: "Proyectos Completados",
  },
  {
    value: CPF_STATS.PREMIOS_RECIBIDOS,
    label: "Premios Recibidos",
  },
];
