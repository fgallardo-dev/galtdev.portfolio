import { getImage } from 'astro:assets';
import type { Lang } from '../i18n/translations';
import { assertProjectParity, getPublishedProjects, projectSlug, projectUrl } from './projects';
import type { ProjectEntry } from './projects';

/**
 * Lógica compartida por las dos páginas de detalle
 * (src/pages/proyectos/[slug].astro y src/pages/en/projects/[slug].astro):
 * cada una solo elige el idioma y cablea las props.
 */

/** Rutas estáticas de un idioma; antes comprueba que cada proyecto exista en ambos */
export async function getProjectPaths(lang: Lang) {
  await assertProjectParity();
  const projects = await getPublishedProjects(lang);
  return projects.map((entry) => ({
    params: { slug: projectSlug(entry) },
    props: { entry },
  }));
}

/** Metadatos de la página: título, descripción, OG y rutas gemelas en ambos idiomas */
export async function getProjectPageMeta(lang: Lang, entry: ProjectEntry) {
  const slug = projectSlug(entry);
  const otherLang: Lang = lang === 'es' ? 'en' : 'es';

  // Las redes sociales piden PNG/JPG: la portada se sirve en PNG a 1200px de ancho
  const ogImage = await getImage({ src: entry.data.cover, width: 1200, format: 'png' });

  return {
    title: `${entry.data.title} · galtyou.dev`,
    description: entry.data.summary,
    ogImage: ogImage.src,
    alternateEsPath: projectUrl('es', slug),
    alternateEnPath: projectUrl('en', slug),
    // La paridad está garantizada en getProjectPaths: la página gemela siempre existe
    langUrl: projectUrl(otherLang, slug),
  };
}
