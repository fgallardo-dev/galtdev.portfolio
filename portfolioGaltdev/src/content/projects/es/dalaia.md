---
title: DalaIA — mini-ERP para pymes
kind: practice
summary: Gestión diaria para pymes (facturación, gastos, agenda y un copiloto IA). Entré al proyecto para auditar su estado de producción y endurecer las capas de autorización y cálculo fiscal.
techs: [typescript, react, sql]
accent: '#4F46E5'
cover: ../../../assets/projects/dalaia/coverDalaia.png
coverAlt: Página de inicio de DalaIA, con el lema «el mini-ERP para pymes» y sus seis funciones principales
hover: ../../../assets/projects/dalaia/hoverDalaia.png
order: 1
draft: false
---

DalaIA es un mini-ERP para pymes: solo lo que un negocio pequeño necesita de verdad para su día a día —facturación, gastos, agenda, equipo y un copiloto IA— sin los módulos de gran corporación que nunca se usan. Me incorporé al proyecto con la base ya construida y el producto en beta privada, en la fase previa al lanzamiento comercial.

Mi trabajo no fue añadir funcionalidad nueva, sino responder a una pregunta concreta: ¿esto está listo para venderse? Para contestarla hice una auditoría de production-readiness sobre nueve dominios y luego me hice cargo de los hallazgos bloqueantes.

## Problemas y frentes

- **Capa de autorización incompleta.** Las comprobaciones de permiso se hacían al pintar la interfaz, pero no al mutar datos. Un usuario al que se le retiraba el acceso conservaba su sesión y podía seguir escribiendo en el sistema.
- **Redondeo fiscal inconsistente.** En facturas con descuento y varias líneas, la base imponible más el IVA no cuadraban con el total. En un documento con validez legal, eso no es un detalle estético.
- **Sin red de seguridad ni coordinación de ramas.** No había CI ni ganchos de pre-commit, y la rama principal desplegaba a producción de forma automática. Además, otra persona del equipo trabajaba en paralelo sobre archivos que mis arreglos también tocaban.

## Cómo lo resolví

Antes de tocar código, estudié la causa raíz de cada hallazgo. En el fallo de autorización, el síntoma visible («la comprobación solo está en el render») escondía dos huecos reales: la sesión no transportaba el estado de la cuenta, y no existía un punto único por el que pasaran todas las mutaciones. La solución fue crear una guardia central que lee el estado fresco de la cuenta —memoizado por petición, nunca cacheado en la sesión, porque cachearlo reintroduce exactamente la obsolescencia que causaba el bug— y cablearla en los embudos del servidor.

Ese diseño lo sometí a una revisión adversarial con ojos frescos, y la revisión lo tumbó: la premisa «todas las mutaciones pasan por un embudo» era falsa. Había varios puntos de escritura que se saltaban ambos embudos, uno de ellos con impacto entre organizaciones. Descarté el diseño de dos embudos, hice un barrido empírico de todos los puntos de mutación y cerré cada uno, con tests que cubren el comportamiento y no la implementación.

En el frente fiscal, el problema era redondear pronto en lugar de tarde: las migas de cada línea se acumulaban hasta desviar el total. La corrección fue reducirlo a una sola regla de redondeo aplicada en una sola capa, con el dominio como única autoridad; la base de datos y el generador de PDF pasaron a ser consumidores. Todo el dinero viaja en decimal exacto de punta a punta, nunca en coma flotante.

Para la coordinación, agrupé los hallazgos en cuatro bloques ordenados por dependencia, de forma que el bloque que compartía archivos con el trabajo de mi compañera entrara en último lugar y el conflicto se resolviera una sola vez, en lugar de repetirlo en cada rebase.

## Qué aprendí

Lo más valioso fue una lección de humildad técnica: **no confiar en un «todo pasa por aquí» sin verificarlo empíricamente**. Mi diseño era correcto sobre una premisa que nunca comprobé, y fue la revisión con ojos frescos —no mis propios tests— la que lo cazó antes de llegar a producción. Desde entonces la verificación empírica va antes que la elegancia del diseño.

En lo técnico me llevo el criterio sobre el dinero: nunca en coma flotante, y el redondeo como una decisión explícita que ocurre en un único sitio con intención. También aprendí a leer una arquitectura por capas antes de modificarla —cálculo puro por un lado, negocio por otro, presentación por otro— porque saber en qué capa vive una regla es lo que evita duplicarla.

Y en lo humano: cuando dos personas tocan los mismos archivos, el orden de integración es una decisión de diseño más. Planificarlo por adelantado costó una tarde y ahorró una semana de conflictos.
