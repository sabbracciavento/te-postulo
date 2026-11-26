# Historial de cambios

Todos los cambios relevantes del sitio se documentan acá. El formato sigue
[Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el versionado,
[SemVer](https://semver.org/lang/es/).

## [Sin publicar]

### Agregado
- Hero animado con los tres tipos de mail (un día normal, una entrevista y cuando necesitamos algo de la persona), en el celular y en
  tablet/escritorio. Cada mail es una secuencia corta: entra la notificación al celular, se abre el mail y la compu y el celular lo
  recorren entero, bloque por bloque y sincronizados (el celular un bloque adelante), con pausas; al final, fundido cruzado al siguiente.
  Es el mail completo, el mismo componente de la sección del mail.
- Pastillas con barra de progreso para elegir el mail. La animación corre solo con el hero a la vista y se pausa con el puntero encima,
  con el foco de teclado y con la pestaña oculta; con `prefers-reduced-motion` no hay animación (el mail queda abierto en su bloque
  principal) y se cambia con las pastillas. Sin regiones `aria-live`; los dispositivos siguen siendo decorativos.

### Cambiado
- Hero en el celular (menos de 768 px): la compu y el celular en una composición propia, entera y legible, en lugar del teléfono grande
  cortado. Texto de al menos 11 px a 390 px de ancho (12 px en tablet y escritorio).
- Hero en tablet y escritorio: el mail a tamaño de lectura, sin fundidos sobre el texto y sin nada debajo del celular.
- Animación hecha solo con `transform` y `opacity` (requestAnimationFrame, desplazamientos en píxeles enteros): 60 cuadros por segundo.

## [2.0.0] - 2026-11-26

Rediseño completo del sitio con la identidad nueva de TePostulo. Publicado en https://tepostulo.com.ar.

### Resumen
- Identidad nueva: monograma TP, paleta azul, Manrope e Instrument Sans, tokens de diseño en variables CSS con Tailwind v4.
- Home rehecha: hero con el mismo mail en la compu y en el celular, cómo funciona y qué pedimos para empezar, un caso con cifras y su
  contexto, la maqueta del resumen diario (Gmail de escritorio, teléfono y celular), planes Base y Plus, confianza, preguntas y cierre.
- Contacto por WhatsApp o Instagram en todo el sitio; sin horario de atención.
- Responsive por breakpoint (celular, tablet, escritorio y celular en horizontal), accesibilidad AA (pestañas ARIA, foco visible,
  objetivos táctiles de 44 px, reduced-motion), SEO (Open Graph generada, JSON-LD, canonical) y Lighthouse móvil 98/100/100/100.
- Next.js 16.4.6 (corrige advertencias de seguridad de 16.0–16.4.4), `poweredByHeader` desactivado, build de producción que se corta
  si faltan variables obligatorias.
- README como caso de estudio, con capturas tomadas de producción.

### Detalle

### Cambiado (contacto y hero)
- **Contacto por WhatsApp o Instagram** (@te.postulo), dos canales igual de válidos: WhatsApp relleno e Instagram con contorno, del mismo
  alto, en el encabezado ("Contacto" + dos íconos en escritorio, dos íconos en tablet), el hero, la barra fija del celular (50/50), el cierre,
  /privacidad, la 404 y el pie. Los textos que decían "por WhatsApp" pasan a "por WhatsApp o Instagram". JSON-LD con `sameAs` a Instagram.
- **Sin horario de atención** en todo el sitio. "CABA y Gran Buenos Aires" con la bandera argentina en SVG (no el emoji, que en Windows
  se ve como "AR").
- **Hero con la compu y el celular**: la ventana de Gmail atrás (variante de 440 px; desde 1280 px con la barra lateral angosta) y el
  celular entero adelante, en proporción real (~216 × 444 px), superpuesto abajo a la derecha, con el mismo mail. El hero mide lo que su
  contenido. En el celular, el teléfono asoma con su borde y se funde abajo. Antes, en escritorio, el teléfono crecía con la ventana y se
  veía larguísimo y cortado.
- Hero legible: el celular tapa solo el borde derecho de la ventana (≈ 16 %); la ventana muestra una línea de remitente y el mail a
  escala, legible hasta "9 postulaciones hoy"; el celular muestra la notificación y directamente el cuerpo del mail (título ≈ 17 px,
  cifra ≈ 46 px en pantalla).

### Cambiado (contenido)
- Sin rótulos "Ejemplo ilustrativo" en las maquetas del mail (teléfono del hero, ventana de Gmail y mail del celular): la única
  aclaración es la nota chica al pie de la sección ("Datos ficticios…"). Sin hueco donde estaba el rótulo.
- **Planes reales**: Base es todo el servicio (portales, mail directo, empresas sin aviso, casilla, resumen, guía y avisos de LinkedIn
  numerados); Plus suma la postulación en LinkedIn desde la cuenta de la persona, con su autorización. "Empresas sin aviso" deja de ser
  la diferencia del Plus (está en los dos). Sin precios.
- Tarjeta Plus con lista con check como el Base (postulación en LinkedIn desde tu cuenta, a cuáles te postulamos en el resumen, con tu
  autorización e inicio de sesión una vez, tope diario para cuidar la cuenta), sin el trazo decorativo, precio al pie y mismo alto que el Base.
- LinkedIn se nombra en lo público: preguntas "¿Y LinkedIn?" y "¿Tengo que darles mis contraseñas?" coherentes con cada plan; en la
  maqueta del mail, "Avisos de LinkedIn" y "LinkedIn 24" como en el mail real. Confianza suma "En LinkedIn, solo con tu autorización por escrito."
- **Cómo funciona**: el primer paso es escribir por WhatsApp; debajo, lo que pedimos para empezar (CV o datos, puesto y rubro, zona y
  horario, sueldo bruto pretendido). Preguntas nuevas o ampliadas: "¿Dónde trabajan?" y "¿Sirve para mi rubro?" con ejemplos de perfiles.

### Corregido (auditoría visual y lógica)
- **Hero de una pantalla en escritorio**: el texto quedaba muy abajo y el botón de WhatsApp fuera de la primera pantalla a 1024×768,
  1280×720/800 y 1366×768. Ahora el hero ocupa el alto de la ventana (tope 860 px), el texto va centrado en vertical y el teléfono se
  recorta contra el borde inferior. El botón no se parte; horario "12 a 20 h" con espacio duro.
- Tablet (768–1023): un solo botón de WhatsApp (la barra fija pasa a ser solo del celular), hero sin hueco, cifras del caso, planes y
  beneficios en columnas.
- Celular: hero a 320 px y en horizontal (844×390: compacto y sin teléfono); pestañas del mail en tres columnas iguales; ícono arriba en
  beneficios y en la tarjeta Plus; el pie deja aire para la barra solo en la home; logo y enlace de privacidad con 44 px de alto táctil.
- Maqueta de Gmail en escritorio: alto según la pantalla, fundido abajo, scroll contenido y región accesible con teclado.
- Pestañas del mail con ARIA completo (un solo tabindex activo, flechas, Inicio y Fin, `aria-controls` válido).
- Menú con `/#…`: funciona también desde /privacidad y la 404. Encabezado sólido en escritorio. /privacidad alineada con el sitio y con
  Open Graph propio. 404 sin canonical. JSON-LD con logo. `poweredByHeader: false`.
- Ejemplos del mail con fechas reales y hábiles de 2026 (lunes 9/11, martes 10/11, jueves 12/11; entrevista miércoles 18/11 a las 10:00)
  y la hora del teléfono coherente con la del mail; sin la fila de "portales" bajo "Novedades de empresas".
- Textos más cortos en beneficios y en el plan Plus; pregunta "¿Y si una empresa me escribe para una entrevista?".
- Sin etiqueta chica (rótulo) sobre los títulos de sección: ninguna sección la lleva (antes la tenían algunas sí y otras no).
- Producción: si falta `NEXT_PUBLIC_SITE_URL` se usa el dominio de producción de Vercel; sin número de WhatsApp en producción el build
  se detiene con un error claro; el aviso de "falta el número" solo aparece en desarrollo y no muestra el nombre de la variable.
- Se quitó la dependencia `motion`, que ya no se usaba.

### Seguridad
- Next.js 16.4.2 → **16.4.6** y `eslint-config-next` al par: corrige las advertencias de seguridad que afectan a 16.0.0–16.4.4
  (GHSA-mfr8-8qww-v76h, GHSA-vc7v-qv4w-wrv8, GHSA-7qx7-33qx-rqx2, GHSA-f3mh-rxg3-f5g2, GHSA-pc58-hwjq-p385, GHSA-rhh4-g77r-r9qj,
  GHSA-vvgp-ww4w-46vf). `npm audit fix` (sin `--force`) para minimatch en las herramientas de desarrollo. `npm audit`: 0 vulnerabilidades.

### Cambiado
- **Celular (≤ 767 px; escritorio y tablet sin cambios)**: el mail de ejemplo se muestra limpio a todo el ancho (sin marco de teléfono),
  con el asunto arriba y los ajustes del mail real en el celular (fecha de la entrevista en una línea, "Abrir el aviso →" debajo de cada
  aviso, estado arriba de la novedad, cifras compactas). La sección de cifras pasa a una tarjeta con degradé suave y aire alrededor, como
  la entrevista del mail. Sin botón de WhatsApp en el encabezado (ya está la barra fija). Espacio inferior en el pie para que la barra no
  lo tape; enlace de privacidad con 44 px de alto táctil. Logo del mail: `public/brand/mail/logo-tp-192.png`.
- Maqueta del mail igual al mail final: tarjeta de 640 px como máximo (antes ocupaba todo el ancho de la ventana), columna del número de
  cada aviso de 64 px en escritorio y separación de 18 px entre las tres cifras de la búsqueda también en el celular.
- Página 404 con título propio ("Página no encontrada") y fuera del índice de buscadores.
- Maqueta del mail con el **diseño editorial (v3)** del resumen diario: cabecera blanca con el monograma y la fecha en versalitas;
  saludo, título grande y una frase; entrevista como placa cobalto de borde a borde con mes, día enorme y hora; la cifra del día enorme
  con el trazo inclinado como único gesto (sin postulaciones, la cifra son los avisos revisados); "Para hacer hoy" en filas, avisos
  numerados con "Abrir →"; "A dónde te postulamos" como índice 01, 02…; novedades con el estado en versalitas de color; banda hielo
  con las tres cifras de la búsqueda; pie fuera de la tarjeta. Reemplaza la versión con tarjetas, íconos y píldoras (eliminados de
  `public/brand/mail/`; queda solo `trazo.png`).
- Ajuste del mail (v4): más aire (ancho 640, márgenes de 48 px, filas de 44 px), título 34/1.2 y frase en pizarra 18/1.6; la entrevista
  pasa a una tarjeta redondeada (radio 20) con degradé suave y aire alrededor, en lugar de la placa cobalto de borde a borde, y la cifra
  del día va pegada debajo.
- La maqueta del mail replica el resumen diario rediseñado del servicio: asunto ("Ana, hoy te postulamos a 9 avisos" /
  "¡tenés una entrevista con …!"), logo y título, frase, entrevista en bloque cobalto, "Para hacer hoy" con botones, tres cifras
  (postulaciones hoy, en total, empresas se movieron), "A dónde te postulamos", "Novedades de empresas", totales y pie. Las tres
  pestañas muestran un día sin pendientes, uno con entrevista y uno con cosas para hacer; cifras coherentes entre fechas.
  Notificación del teléfono del hero con el asunto nuevo.
- Sección de cifras del caso: 4.142 avisos revisados · 185 postulaciones verificadas · 3 entrevistas; perfil y período en el pie.
- **Identidad nueva** (TePostulo, monograma TP): paleta azul (cobalto, azul acción, tinta, pizarra, hielo, nube),
  Manrope para títulos e Instrument Sans para texto, tokens de marca en `src/app/tokens.css`. El monograma se usa desde
  el PNG original (círculo, TP blanca y azul, avatar), sin redibujar. Favicon, ícono de Apple e imagen Open Graph nuevos.
- **Home rehecha**: hero con la promesa "Nos postulamos por vos.", tres fichas de beneficios, cuatro pasos, un caso real
  con tres cifras y su contexto, el mail de ejemplo rotulado "Ejemplo ilustrativo", planes Base y Plus sin precios ni
  cuotas, bloque de confianza, diez preguntas frecuentes y cierre. Menos texto que antes; un solo gesto gráfico por sección
  (la inclinación del TP).
- Maqueta del mail: esquema azul, estados con ícono y etiqueta (verificada, CV visto, en proceso, requiere tu respuesta),
  sin nombres de persona, empresas ni sitios de empleo.
- Botón de WhatsApp: mensaje precargado sin datos personales; sin número configurado muestra el bloqueo en vez de un link roto.
- Política de privacidad: quién interviene en el tratamiento y alcance del borrado, sin afirmaciones absolutas.

### Eliminado
- Logo "Te" en cuadrado naranja (SVG en trazados y sus variantes), tipografía Archivo, franja con marquesina, sello
  giratorio, línea animada de pasos y animaciones de aparición con motion.
- La maqueta del mail replica el nuevo resumen diario del servicio: un solo mail por día, título con la cifra del día,
  una frase con lo importante, bloque "Para vos" con lo que depende de la persona, tres cifras (hoy, total, empresas que se movieron),
  postulaciones del día con el portal, movimientos de empresas y totales. Misma paleta y logo que el sitio.
- Texto de la sección del mail: "un solo mail por día, a la tarde".
- README: capturas regeneradas y sección "El mail diario, tal como llega" con la maqueta en móvil y escritorio.

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
