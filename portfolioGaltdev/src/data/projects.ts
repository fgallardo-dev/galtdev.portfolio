import type { TechId } from './techs';

export type Project = {
  id: string;
  name: string;
  description: { es: string; en: string };
  techs: TechId[];
  accent: string;
  url?: string;
  repoUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'insight-dashboard',
    name: 'Insight Dashboard',
    description: {
      es: 'Panel de analítica en tiempo real con gráficas en vivo.',
      en: 'Real-time analytics dashboard with live charts.',
    },
    techs: ['react', 'typescript', 'sql'],
    accent: '#4A90A4',
  },
  {
    id: 'gateway-api',
    name: 'Gateway API',
    description: {
      es: 'Microservicio de autenticación y enrutado de peticiones.',
      en: 'Auth & request-routing microservice.',
    },
    techs: ['java', 'sql'],
    accent: '#2E6B5E',
  },
  {
    id: 'koala-notes',
    name: 'Koala Notes',
    description: {
      es: 'App móvil de notas con sincronización en la nube.',
      en: 'Mobile notes app with cloud sync.',
    },
    techs: ['kotlin', 'java'],
    accent: '#D9722C',
  },
  {
    id: 'etl-flow',
    name: 'Flujo ETL',
    description: {
      es: 'Pipeline de datos automatizado y monitorizado.',
      en: 'Automated, monitored data pipeline.',
    },
    techs: ['python', 'sql'],
    accent: '#8B5E34',
  },
  {
    id: 'canvas-cms',
    name: 'Lienzo CMS',
    description: {
      es: 'Gestor de contenido headless para equipos.',
      en: 'Headless content manager for teams.',
    },
    techs: ['javascript', 'react'],
    accent: '#6FA08E',
  },
  {
    id: 'auth-guard',
    name: 'AuthGuard',
    description: {
      es: 'Servicio de identidad seguro con tokens.',
      en: 'Secure token-based identity service.',
    },
    techs: ['typescript', 'python'],
    accent: '#5C3F21',
  },
];
