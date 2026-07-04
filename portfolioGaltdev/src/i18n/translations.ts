export const translations = {
  es: {
    meta: {
      title: 'galtyou.dev — Desarrollo web full-stack',
      description:
        'Portfolio de galtyou.dev. Desarrollo web full-stack centrado en producto: interfaces limpias, backends sólidos y código sostenible.',
    },
    nav: {
      ariaLabel: 'Navegación principal',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contáctame',
      langSwitch: 'EN',
      langSwitchLabel: 'Cambiar a inglés',
      menuLabel: 'Menú de navegación',
    },
    hero: {
      role: '/Desarrollo full stack/',
      tagline: '/ desarrollo digital con propósito /',
      welcome: '/ BIENVENIDO /',
      year: '/2026/',
    },
    techs: {
      title: 'Tecnologías',
    },
    projects: {
      title: 'Proyectos',
      search: 'Buscar proyecto…',
      allTech: 'Todas las tecnologías',
      empty: 'Sin proyectos con esa tecnología.',
      available: 'disponible',
    },
    about: {
      title: 'Sobre mí',
      bio: 'Desarrollo web full-stack centrado en producto. Construyo interfaces limpias y backends sólidos, con código mantenible y un poquito de cariño koala. Me muevo entre el front y el back sin perder de vista a la persona del otro lado de la pantalla.',
      stack: 'STACK',
      statsYears: 'años',
      statsProjects: 'proyectos',
      statsTechs: 'tecnologías',
    },
    contact: {
      title: 'Hablemos',
      subtitle:
        '¿Tienes una idea o un proyecto en mente? Escríbeme y le damos forma juntos.',
      name: 'Nombre',
      email: 'Email',
      message: 'Mensaje',
      send: 'Enviar',
    },
  },
  en: {
    meta: {
      title: 'galtyou.dev — Full-stack web development',
      description:
        'galtyou.dev portfolio. Product-minded full-stack web developer: clean interfaces, solid backends, and maintainable code.',
    },
    nav: {
      ariaLabel: 'Main navigation',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      langSwitch: 'ES',
      langSwitchLabel: 'Switch to Spanish',
      menuLabel: 'Navigation menu',
    },
    hero: {
      role: '/Full-stack development/',
      tagline: '/ digital development with purpose /',
      welcome: '/ WELCOME /',
      year: '/2026/',
    },
    techs: {
      title: 'Technologies',
    },
    projects: {
      title: 'Projects',
      search: 'Search project…',
      allTech: 'All technologies',
      empty: 'No projects with that technology.',
      available: 'available',
    },
    about: {
      title: 'About me',
      bio: 'Product-minded full-stack web developer. I build clean interfaces and solid backends, with maintainable code and a bit of koala care. I move between front and back without losing sight of the person on the other side of the screen.',
      stack: 'STACK',
      statsYears: 'years',
      statsProjects: 'projects',
      statsTechs: 'technologies',
    },
    contact: {
      title: "Let's talk",
      subtitle:
        'Got an idea or a project in mind? Drop me a line and we shape it together.',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },
  },
} as const;

export type Lang = keyof typeof translations;
export const defaultLang: Lang = 'es';

export function useTranslations(lang: Lang) {
  return translations[lang];
}
