import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { TECHS } from './data/techs';
import { PROJECT_SLUG_FORMAT, PROJECT_SLUG_PATTERN } from './lib/project-slug';

/**
 * Colección `projects`: un Markdown por proyecto y por idioma en
 * src/content/projects/{es,en}/<slug>.md
 *
 * - El nombre del archivo es el slug de la URL y debe ser idéntico en es/ y en/.
 * - Imágenes en src/assets/projects/<slug>/cover.png y hover.png.
 *   Tamaño recomendado: 1200x750 px (proporción 16:10). Se recortan con
 *   object-fit: cover, así que conviene respetar la proporción; el peso y los
 *   formatos los optimiza astro:assets en el build.
 * - `draft: true` deja el proyecto fuera de la lista y sin página de detalle.
 */

// Se valida contra TECHS para que el filtro y las etiquetas nunca se desincronicen
const techIds = TECHS.map((tech) => tech.id);

// Solo enlaces web: evita que un `javascript:` o `file:` acabe en un href
const httpUrl = (field: string) =>
  z.url({
    protocol: /^https?$/,
    error: `${field} must start with http:// or https://, e.g. https://github.com/user/repo`,
  });

const projects = defineCollection({
  loader: glob({
    pattern: '{es,en}/*.md',
    base: './src/content/projects',
    // El id conserva la carpeta de idioma y el nombre del archivo: "es/mi-proyecto".
    // El nombre del archivo es el slug por defecto, así que se valida aquí, en el build.
    generateId: ({ entry }) => {
      const id = entry.replace(/\.md$/, '');
      const fileName = id.slice(id.indexOf('/') + 1);
      if (!PROJECT_SLUG_PATTERN.test(fileName)) {
        throw new Error(
          `Invalid project file name "src/content/projects/${entry}": ` +
            `the file name becomes the URL slug and must use ${PROJECT_SLUG_FORMAT}.`,
        );
      }
      return id;
    },
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        /** Solo si la URL no debe coincidir con el nombre del archivo; ponlo igual en es/ y en/ */
        slug: z
          .string()
          .regex(PROJECT_SLUG_PATTERN, { error: `slug must use ${PROJECT_SLUG_FORMAT}` })
          .optional(),
        /** `personal` exige repoUrl y enlaza al README; `practice` muestra problemas, soluciones y aprendizajes */
        kind: z.enum(['personal', 'practice']),
        /** Una o dos líneas: se muestra en la card y como intro de la página de detalle */
        summary: z.string().min(1),
        /** Ids de src/data/techs.ts; alimentan el filtro y las etiquetas */
        techs: z.array(z.enum(techIds)).min(1),
        /** Color hex (#rgb o #rrggbb) del chip y las etiquetas */
        accent: z.string().regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i),
        cover: image(),
        /** Texto alternativo de la portada; si falta, se usa el título */
        coverAlt: z.string().optional(),
        /** Imagen que aparece al pasar el ratón o enfocar la card; sin ella no hay intercambio */
        hover: image().optional(),
        repoUrl: httpUrl('repoUrl').optional(),
        url: httpUrl('url').optional(),
        /** Posición en la lista: menor número sale primero */
        order: z.number().int().default(0),
        draft: z.boolean().default(false),
      })
      // Un proyecto personal sin repositorio no tiene README que enlazar: mejor fallar en el build
      .refine((data) => data.kind !== 'personal' || Boolean(data.repoUrl), {
        message: 'Personal projects must link to their repository README (repoUrl).',
        path: ['repoUrl'],
      }),
});

export const collections = { projects };
