<div align="center">

# 🐨 galtyou.dev

**Portfolio bilingüe centrado en rendimiento — construido mientras aprendo la plataforma web de verdad.**

[![Astro](https://img.shields.io/badge/Astro_7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript_strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

`/` español · `/en/` inglés

[Read in English](README.md) · **Español**

</div>

---

## Sobre el proyecto

Portfolio personal con estética editorial — titulares en Bodoni Moda, cubos de tecnologías flotantes y Kobi el koala. Cada pieza se construye con tres innegociables:

> **Semántica primero · Accesibilidad siempre · Rendimiento máximo**

Sin frameworks de UI, sin JavaScript innecesario: HTML estático generado por Astro y unas pocas líneas de JavaScript vanilla solo donde la interacción lo necesita de verdad.

## Características

- 🌍 **Rutas i18n reales** — `/` (español) y `/en/` (inglés) con `hreflang`, URLs canónicas y metadatos Open Graph completos
- 🧭 **Navegación semántica y accesible** — enlaces reales, estado con `aria-current`, menú móvil dirigido por `aria-expanded` + CSS `:has()`
- 🎨 **Hero responsive** — tipografía fluida con `clamp()` y un contenedor *escenario* compartido para que el koala y su pedestal escalen juntos
- 🔍 **Filtro de proyectos** — `<select>` nativo que filtra las cards mediante atributos `data-*`, con estado vacío anunciado por `aria-live`
- 🗂️ **Contenido dirigido por datos** — proyectos y tecnologías viven en archivos de datos tipados, no en el HTML

## Stack

| Elección | Por qué |
|----------|---------|
| [Astro 7](https://astro.build) | Salida estática, cero JS por defecto — el rendimiento es el objetivo |
| TypeScript (strict) | Modelos de datos tipados e interfaces honestas |
| Tailwind CSS v4 | Tokens de diseño vía `@theme` en CSS, sin archivo de configuración |
| JS vanilla | Dos scripts pequeños: menú móvil y filtro de proyectos — nada más |

## Estructura

```
portfolioGaltdev/
├── public/            # assets estáticos (favicon, logo, Kobi)
└── src/
    ├── components/    # Nav · Hero · Projects
    ├── data/          # fuentes tipadas: projects.ts, techs.ts
    ├── i18n/          # traducciones ES/EN
    ├── layouts/       # layout base: SEO, hreflang, fuentes
    ├── pages/         # rutas / (es) y /en/
    └── styles/        # tokens de tema de Tailwind v4
```

## Puesta en marcha

```bash
cd portfolioGaltdev
npm install
npm run dev      # → http://localhost:4321
```

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción en local |

## Hoja de ruta

- [x] Fundación: layout, SEO, i18n, tokens de diseño
- [x] Hero responsive y nav semántico con menú móvil
- [x] Grid de proyectos con filtro por tecnología
- [ ] Secciones Sobre mí y Contacto
- [ ] Páginas de detalle por proyecto (rutas dinámicas)
- [ ] Contenido real de proyectos e imágenes optimizadas
- [ ] Lighthouse ≈100 en todo · deploy en **galtyou.dev**

---

<div align="center">

Hecho con cariño (y un koala) por [**fgallardo-dev**](https://github.com/fgallardo-dev)

</div>
