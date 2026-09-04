---
# PLANTILLA: sustituye este archivo por un proyecto real y pon `draft: false`.
# El nombre del archivo es el slug de la URL (/proyectos/example-personal/) y
# debe ser IDÉNTICO en es/ y en/ para que el cambio de idioma funcione.
title: Proyecto personal de ejemplo
# personal: exige repoUrl y muestra el botón al README.
# practice: muestra las secciones de problemas, soluciones y aprendizajes.
kind: personal
summary: Una o dos líneas que expliquen qué hace el proyecto y para quién está pensado.
# Ids válidos: los de src/data/techs.ts
techs: [typescript, react]
accent: '#D9722C'
# Imágenes en src/assets/projects/<slug>/; tamaño recomendado 1640x1025 (16:10)
cover: ../../../assets/projects/example/cover.png
coverAlt: Pantalla principal del proyecto de ejemplo
hover: ../../../assets/projects/example/hover.png
repoUrl: https://github.com/fgallardo-dev/example-personal
# Opcional: enlace a la demo o al deploy en vivo; muestra un botón extra
# url: https://example-personal.galtyou.dev
# Menor número sale primero en la lista
order: 1
draft: true
---

Introducción del proyecto: qué problema resuelve, por qué decidí construirlo y en qué estado se encuentra hoy. Este primer párrafo es lo que la persona lee justo después del resumen, así que conviene que dé contexto sin repetirlo.

## Código y documentación

Toda la documentación técnica —instalación, arquitectura y decisiones— vive en el README del repositorio. Sustituye el enlace `repoUrl` del frontmatter por el de tu proyecto y el botón de la página apuntará allí.
