import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/translations';

export type ProjectEntry = CollectionEntry<'projects'>;

/** El id de cada entrada es "<idioma>/<archivo>" (ver generateId en content.config.ts) */
export function projectLang(entry: ProjectEntry): Lang {
  return entry.id.startsWith('en/') ? 'en' : 'es';
}

/** El slug sale del nombre del archivo, salvo que el frontmatter lo fije explícitamente */
export function projectSlug(entry: ProjectEntry): string {
  return entry.data.slug ?? entry.id.slice(entry.id.indexOf('/') + 1);
}

/** Única fuente de verdad de las URLs de detalle en ambos idiomas */
export function projectUrl(lang: Lang, slug: string): string {
  return lang === 'es' ? `/proyectos/${slug}/` : `/en/projects/${slug}/`;
}

/** Proyectos publicados de un idioma, ordenados por `order` ascendente */
export async function getPublishedProjects(lang: Lang): Promise<ProjectEntry[]> {
  const entries = await getCollection(
    'projects',
    (entry) => projectLang(entry) === lang && !entry.data.draft,
  );
  // El loader glob no garantiza el orden de enumeración entre máquinas:
  // el desempate por slug hace que el HTML generado sea idéntico en cada build.
  return entries.sort(
    (a, b) => a.data.order - b.data.order || projectSlug(a).localeCompare(projectSlug(b)),
  );
}

/**
 * Falla el build si un proyecto publicado existe en un idioma y no en el otro.
 * Con esta garantía, el switch de idioma y los hreflang apuntan siempre a una página real.
 */
export async function assertProjectParity(): Promise<void> {
  const [es, en] = await Promise.all([getPublishedProjects('es'), getPublishedProjects('en')]);

  const missingIn = (lang: Lang, published: ProjectEntry[], counterpart: ProjectEntry[]) => {
    const counterpartSlugs = new Set(counterpart.map(projectSlug));
    return published
      .filter((entry) => !counterpartSlugs.has(projectSlug(entry)))
      .map(
        (entry) =>
          `- "${projectSlug(entry)}" is published in src/content/projects/${entry.id}.md ` +
          `but src/content/projects/${lang}/${projectSlug(entry)}.md does not exist or is a draft.`,
      );
  };

  const problems = [...missingIn('en', es, en), ...missingIn('es', en, es)];
  if (problems.length === 0) return;

  throw new Error(
    'Every published project needs a version in both languages:\n' +
      `${problems.join('\n')}\n` +
      'Create the missing file with the same name (or the same `slug`), ' +
      'or set `draft: true` in the existing one until the translation is ready.',
  );
}
