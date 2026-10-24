# Cómo se trabaja en este repositorio

Guía corta para mantener el historial prolijo y los deploys predecibles.

## Ramas

- `main` es la rama de producción: cada push a `main` se publica en Vercel.
- Cualquier cambio se hace en una rama corta (`feat/…`, `fix/…`, `docs/…`) y entra por pull request.
  Vercel genera una URL de preview por cada pull request; GitHub Actions corre lint, tipos y build.

## Commits

Se usa [Conventional Commits](https://www.conventionalcommits.org/es/), en español, en imperativo y sin punto final:

```
<tipo>(<alcance>): <qué cambia>

<por qué, si no es obvio>
```

| Tipo | Cuándo |
| --- | --- |
| `feat` | Algo nuevo que ve el usuario (una sección, un comportamiento). |
| `fix` | Un error corregido. |
| `style` | Cambios visuales sin lógica nueva (colores, espaciados, tipografía). |
| `content` | Cambios de texto en `src/content/`. |
| `refactor` | Reordenar código sin cambiar lo que hace. |
| `perf` | Mejora de rendimiento medible. |
| `a11y` | Accesibilidad. |
| `seo` | Metadatos, sitemap, datos estructurados. |
| `docs` | README, changelog, esta guía. |
| `chore` | Dependencias, configuración, CI. |

Alcances habituales: `hero`, `mail`, `planes`, `faq`, `header`, `logo`, `brand`, `privacidad`, `og`, `ci`.

Ejemplos:

```
feat(mail): maqueta de Gmail en escritorio con panel de lectura
fix(header): el logo tapaba el botón de WhatsApp en 360 px
content(faq): respuesta sobre la casilla laboral propia
style(logo): margen interior del cuadrado de 0,40 a 0,36 cap
```

## Versiones

- Cada versión publicada se registra en [CHANGELOG.md](CHANGELOG.md) y se etiqueta (`v1.1.0`).
- Versión mayor: cambia la estructura del sitio. Menor: una sección o funcionalidad nueva. Parche: correcciones y textos.

## Antes de abrir un pull request

```bash
npm run check   # lint, build y chequeo de tipos (el build genera los tipos de rutas que usa tsc)
```

Si el cambio es visual, adjuntar una captura en móvil y otra en escritorio.
