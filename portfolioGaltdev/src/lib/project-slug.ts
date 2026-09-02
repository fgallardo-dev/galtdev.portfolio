/**
 * Formato de slug de proyecto, compartido por el loader (nombre de archivo) y el
 * schema (override `slug` en el frontmatter). Vive aparte porque content.config.ts
 * no puede depender de módulos que importen `astro:content`.
 */
export const PROJECT_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Descripción del formato para los mensajes de error */
export const PROJECT_SLUG_FORMAT =
  'lowercase letters, digits and single hyphens, e.g. "my-project"';
