export const TECHS = [
  { id: 'python', label: 'Python' },
  { id: 'sql', label: 'SQL' },
  { id: 'java', label: 'Java' },
  { id: 'react', label: 'React' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'kotlin', label: 'Kotlin' },
] as const;

export type TechId = (typeof TECHS)[number]['id'];

/** Etiqueta visible de una tecnología; si no existe, devuelve el id tal cual */
export const techLabel = (id: TechId): string =>
  TECHS.find((tech) => tech.id === id)?.label ?? id;
