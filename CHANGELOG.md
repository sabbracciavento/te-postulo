# Historial de cambios

Todos los cambios relevantes del sitio se documentan acá. El formato sigue
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado,
[SemVer](https://semver.org/lang/es/).

## [Sin publicar]

## [1.0.0] - 2026-10-23

### Agregado
- Landing de una sola página con ocho bloques: hero, barra de confianza, cómo funciona (tres pasos),
  el mail de resumen (maqueta de Gmail en móvil y escritorio), planes, confianza, preguntas frecuentes y cierre.
- Página de política de privacidad.
- Identidad visual: paleta papel/tinta/naranja, tipografías Archivo (títulos) e Instrument Sans (texto),
  logo "Te Postulo" como SVG con las letras en trazados (Archivo Black Expanded), favicon e imagen Open Graph generados
  desde la misma geometría.
- Maqueta fiel de Gmail (móvil y escritorio) con un resumen diario de ejemplo y datos ficticios.
- Botón de WhatsApp con mensaje prellenado y barra de acción fija en móvil.
- Metadatos para buscadores y redes: Open Graph, Twitter card, `sitemap.xml`, `robots.txt`, datos estructurados.
- Accesibilidad: enlace para saltar al contenido, foco visible, contraste verificado, soporte de `prefers-reduced-motion`.
- Integración continua: lint, chequeo de tipos y build de producción en cada push y pull request.

### Rendimiento
- Lighthouse en móvil: 91 / 100 / 100 / 100 (rendimiento, accesibilidad, buenas prácticas, SEO).
  En escritorio: 100 en las cuatro categorías.

[Sin publicar]: https://github.com/sabbracciavento/te-postulo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sabbracciavento/te-postulo/releases/tag/v1.0.0
