---
# TEMPLATE: replace this file with a real project and set `draft: false`.
# The file name is the URL slug (/en/projects/example-personal/) and it must be
# IDENTICAL in es/ and en/ so the language switch keeps working.
title: Example personal project
# personal: requires repoUrl and shows the README button.
# practice: shows the problems, solutions and learnings sections.
kind: personal
summary: One or two lines explaining what the project does and who it is for.
# Valid ids: the ones in src/data/techs.ts
techs: [typescript, react]
accent: '#D9722C'
# Images live in src/assets/projects/<slug>/; recommended size 1200x750 (16:10)
cover: ../../../assets/projects/example/cover.png
coverAlt: Main screen of the example project
hover: ../../../assets/projects/example/hover.png
repoUrl: https://github.com/fgallardo-dev/example-personal
# Optional: link to the live demo or deployment; shows an extra button
# url: https://example-personal.galtyou.dev
# Lower number shows first in the list
order: 1
draft: true
---

Project introduction: which problem it solves, why I decided to build it and where it stands today. This first paragraph is what people read right after the summary, so it should add context without repeating it.

## Code and documentation

All the technical documentation — setup, architecture and decisions — lives in the repository README. Replace the `repoUrl` in the frontmatter with your project's and the page button will point there.
