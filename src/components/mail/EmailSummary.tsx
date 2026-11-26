import Image from "next/image";
import {
  estadoLabel,
  mailAvisosInstruccion,
  mailAvisosTitulo,
  mailDesde,
  mailFirma,
  mailPersona,
  mailPie,
  type MailEstado,
  type MailScenario,
} from "@/content/mail";

/*
 * Réplica del resumen diario v4 (editorial) que manda el servicio: mucho blanco, un foco por bloque, la entrevista como tarjeta
 * azul con degradé suave y aire alrededor, la cifra del día enorme pegada debajo con el trazo inclinado (único gesto diagonal),
 * filas con filetes y numeración. Ancho máximo 640 (como el mail), márgenes de 48 px y filas de 44 px de alto de padding.
 * Mismos tamaños y colores que su HTML. Debajo de 680 px aplica lo mismo que el @media del mail (márgenes de 24 px, título 28, empresa 26, cifra 76).
 * Fuentes: las que ve la persona en Gmail, que no carga fuentes web (el mail declara Instrument Sans y Manrope y cae a Arial / Arial Black).
 */
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_LOGO = "'Arial Black', Arial, Helvetica, sans-serif";
const NUM = { fontFamily: "'Arial Black', Arial, Helvetica, sans-serif", fontWeight: 900 } as const;

const palabra = (n: number, uno: string, varios: string) => (n === 1 ? uno : varios);

/* estado → color de la etiqueta en versalitas (sobre blanco, contraste ≥ 5,4:1) */
const estadoColor: Record<MailEstado, string> = {
  visto: "text-brand",
  avanzo: "text-warning",
  entrevista: "text-success",
  recibido: "text-slate",
  cerrado: "text-slate",
};

/** Banda del cuerpo, de borde a borde; las secciones se separan con un filete, no con tarjetas. */
function Fila({ children, className = "", filete = true }: { children: React.ReactNode; className?: string; filete?: boolean }) {
  return <div className={`px-6 py-11 @min-[680px]:px-12 ${filete ? "border-t border-line" : ""} ${className}`}>{children}</div>;
}

function Rotulo({ children, n, color = "text-brand" }: { children: React.ReactNode; n?: number; color?: string }) {
  return (
    <p className={`m-0 mb-[18px] text-[12px] font-bold uppercase leading-[1.4] tracking-[1.6px] ${color}`}>
      {children}
      {n ? <span className="text-ink">&nbsp;&nbsp;{n}</span> : null}
    </p>
  );
}

function Boton({ children, invertido = false }: { children: React.ReactNode; invertido?: boolean }) {
  return (
    <span className={`inline-block rounded-[8px] px-6 py-4 text-[15px] font-bold leading-4 ${invertido ? "bg-white text-brand" : "bg-action text-white"}`}>
      {children}
    </span>
  );
}

export function EmailSummary({ scenario: s, compact = false }: { scenario: MailScenario; compact?: boolean }) {
  const b = s.busqueda;
  const pendientes = s.tareas.length + s.avisos.length;
  // sin postulaciones, la cifra es lo revisado (un "0" gigante solo repetiría el título)
  const [cifra, unidad, contexto] = s.hoy
    ? [s.hoy, `${palabra(s.hoy, "postulación", "postulaciones")} hoy.`, `Revisamos ${s.revisados} avisos nuevos para vos.`]
    : [s.revisados, palabra(s.revisados, "aviso revisado hoy.", "avisos revisados hoy."), "Ninguno encajaba con lo que buscás."];

  return (
    <div className="@container bg-cloud pb-10 text-ink @min-[680px]:px-3 @min-[680px]:pt-8" style={{ fontFamily: FONT }}>
      <div className="overflow-hidden border-y border-line bg-white @min-[680px]:mx-auto @min-[680px]:max-w-[640px] @min-[680px]:rounded-[16px] @min-[680px]:border-x">
        {/* cabecera blanca: monograma + nombre + fecha corta en versalitas */}
        <div className="flex items-center gap-2.5 px-6 pb-7 pt-9 @min-[680px]:px-12">
          <Image src="/brand/mail/logo-tp-192.png" alt="" width={36} height={36} className="h-9 w-9" />
          <span className="flex-1 text-[20px] font-extrabold leading-9 tracking-[-0.5px]" style={{ fontFamily: FONT_LOGO }}>
            TePostulo
          </span>
          <span className="whitespace-nowrap text-[12px] font-bold uppercase tracking-[1.4px] text-slate">{s.fechaCorta}</span>
        </div>

        {/* apertura: saludo, título y una frase */}
        <Fila filete={false} className="pb-11! pt-4!">
          <p className="m-0 mb-4 text-[15px] leading-[1.5] text-slate">
            Hola {mailPersona} · {s.fecha}
          </p>
          <p className="m-0 text-[28px] font-extrabold leading-[1.2] tracking-[-0.8px] @min-[680px]:text-[34px]" style={{ fontFamily: FONT_LOGO }}>
            {s.titulo}
          </p>
          <p className="m-0 mt-[18px] text-[18px] leading-[1.6] text-slate">{s.frase}</p>
        </Fila>

        {/* entrevista: tarjeta con degradé suave y aire alrededor (el cobalto plano de borde a borde se veía duro en Gmail) */}
        {s.entrevista && (
          <div className="px-6 pb-12 @min-[680px]:px-12">
            <div className="rounded-[20px] bg-[#1E40D8] bg-[linear-gradient(135deg,#3358F0_0%,#1E40D8_55%,#1530C8_100%)] px-6 py-7 text-white @min-[680px]:px-9 @min-[680px]:pb-[34px] @min-[680px]:pt-9">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="m-0 mb-3.5 text-[12px] font-bold uppercase leading-[1.4] tracking-[1.6px]">Tenés una entrevista</p>
                <p className="m-0 break-words text-[26px] font-extrabold leading-[1.15] tracking-[-0.8px] @min-[680px]:text-[30px]" style={{ fontFamily: FONT_LOGO }}>
                  {s.entrevista.empresa}
                </p>
                <p className="m-0 mt-2.5 text-[16px] leading-[1.5]">{s.entrevista.puesto}</p>
                {/* en el celular la fecha va en una línea debajo del puesto (como el mail real en ≤ 680 px) */}
                <p className="m-0 mt-3.5 text-[22px] leading-[1.2] @min-[680px]:hidden" style={NUM}>
                  {s.entrevista.dia} {s.entrevista.mes}
                  {s.entrevista.hora ? ` · ${s.entrevista.hora}` : ""}
                </p>
              </div>
              <div className="hidden shrink-0 text-right @min-[680px]:block">
                <div className="text-[12px] font-bold uppercase leading-[1.2] tracking-[1.6px]">{s.entrevista.mes}</div>
                <div className="mt-0.5 text-[56px] leading-none tracking-[-2px]" style={NUM}>
                  {s.entrevista.dia}
                </div>
                {s.entrevista.hora && <div className="mt-1.5 text-[14px] font-bold leading-[1.2]">{s.entrevista.hora}</div>}
              </div>
            </div>
            <p className="m-0 mt-[26px] border-t border-[#6A86F4] pt-5 text-[16px] leading-[1.6]">{s.entrevista.nota}</p>
            <div className="mt-7">
              <Boton invertido>Ver el aviso</Boton>
            </div>
          </div>
          </div>
        )}

        {/* la cifra del día como pieza de evidencia */}
        <Fila filete={!s.entrevista} className={s.entrevista ? "pt-0!" : ""}>
          <div className="text-[76px] leading-[0.9] tracking-[-4px] text-brand @min-[680px]:text-[96px]" style={NUM}>
            {cifra}
          </div>
          <div className="mt-2.5 text-[24px] font-extrabold leading-[1.2] tracking-[-0.5px]" style={{ fontFamily: FONT_LOGO }}>
            {unidad}
          </div>
          <Image src="/brand/mail/trazo.png" alt="" width={56} height={10} className="my-[18px] h-2.5 w-14" />
          <div className="text-[15px] leading-[1.5] text-slate">{contexto}</div>
        </Fila>

        {!compact && (
          <>
            {/* lo que depende de la persona; con una entrevista destacada, eso ES lo que tiene que hacer */}
            {pendientes > 0 ? (
              <Fila>
                <Rotulo n={pendientes}>Para hacer hoy</Rotulo>
                {s.tareas.map((t, i) => (
                  <div key={t.titulo} className={i ? "mt-[22px] border-t border-line pt-[22px]" : ""}>
                    <p className="m-0 text-[18px] font-bold leading-[1.35]">{t.titulo}</p>
                    <p className="m-0 mt-1 text-[14px] leading-[1.45] text-slate">{t.detalle}</p>
                    <p className="m-0 mt-2.5 text-[16px] leading-[1.55]">{t.accion}</p>
                    {t.boton && (
                      <div className="mt-4">
                        <Boton>{t.boton}</Boton>
                      </div>
                    )}
                  </div>
                ))}
                {s.avisos.length > 0 && (
                  <>
                    <p className={`m-0 rounded-[12px] bg-ice px-5 py-[18px] text-[15px] leading-[1.55] ${s.tareas.length ? "mt-7" : ""}`}>
                      <b>{mailAvisosTitulo}.</b> {mailAvisosInstruccion(s.avisos.map((a) => a.n))}
                    </p>
                    <ul className="m-0 mt-2 list-none p-0">
                      {s.avisos.map((a) => (
                        <li key={a.n} className="flex items-start gap-3 border-t border-line py-[18px]">
                          <div className="w-12 shrink-0 @min-[680px]:w-16">
                            <div className="text-[10px] font-bold uppercase leading-[1.2] tracking-[1.2px] text-slate">LinkedIn</div>
                            <div className="mt-0.5 text-[32px] leading-none tracking-[-1px] text-brand" style={NUM}>
                              {a.n}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="m-0 text-[16px] font-bold leading-[1.35]">{a.titulo}</p>
                            <p className="m-0 mt-1 text-[14px] leading-[1.45] text-slate">{a.detalle}</p>
                            <p className="m-0 mt-2.5 text-[15px] font-bold leading-[1.4] text-action @min-[680px]:hidden">Abrir el aviso&nbsp;→</p>
                          </div>
                          <span className="hidden whitespace-nowrap pt-0.5 text-[15px] font-bold leading-[1.4] text-action @min-[680px]:inline">Abrir&nbsp;→</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Fila>
            ) : (
              !s.entrevista && (
                <Fila>
                  <p className="m-0 text-[20px] font-extrabold leading-[1.3] tracking-[-0.3px]" style={{ fontFamily: FONT_LOGO }}>
                    Hoy no tenés que hacer nada.
                  </p>
                  <p className="m-0 mt-1.5 text-[16px] leading-[1.5] text-slate">Seguimos nosotros.</p>
                </Fila>
              )
            )}

            {/* a dónde se la postuló: índice numerado */}
            {s.postulaciones.length > 0 && (
              <Fila>
                <Rotulo>A dónde te postulamos</Rotulo>
                <ol className="m-0 list-none p-0">
                  {s.postulaciones.map((p, i) => (
                    <li key={p.titulo + p.meta} className={`flex py-4 ${i ? "border-t border-line" : ""}`}>
                      <span className="w-10 shrink-0 text-[13px] font-bold leading-[1.6] text-brand">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[16px] font-bold leading-[1.4]">
                        {p.titulo}
                        <span className="mt-[3px] block text-[14px] font-normal leading-[1.45] text-slate">{p.meta}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                {s.mas ? <p className="m-0 ml-10 mt-3.5 text-[14px] leading-[1.4] text-slate">y {s.mas} más.</p> : null}
              </Fila>
            )}

            {/* novedades: estado como rótulo de color a la izquierda (arriba de la frase en el celular) */}
            {s.novedades.length > 0 && (
              <Fila>
                <Rotulo>Novedades de empresas</Rotulo>
                <ul className="m-0 list-none p-0">
                  {s.novedades.map((n, i) => (
                    <li key={n.texto} className={`flex flex-col py-3.5 @min-[680px]:flex-row ${i ? "border-t border-line" : ""}`}>
                      <span className={`shrink-0 pb-0.5 text-[11px] @min-[680px]:w-[104px] @min-[680px]:pb-0 font-bold uppercase leading-[1.9] tracking-[1.2px] ${estadoColor[n.estado]}`}>
                        {estadoLabel[n.estado]}
                      </span>
                      <span className="text-[15px] leading-[1.5]">{n.texto}</span>
                    </li>
                  ))}
                </ul>
              </Fila>
            )}

            {/* la búsqueda completa: banda hielo con tres cifras y filetes verticales */}
            <Fila filete={false} className="bg-ice">
              <Rotulo color="text-slate">Tu búsqueda desde el {mailDesde}</Rotulo>
              <dl className="m-0 grid grid-cols-3">
                {[
                  [b.postulaciones, palabra(b.postulaciones, "postulación", "postulaciones")],
                  [b.vistos, palabra(b.vistos, "CV visto", "CV vistos")],
                  [b.enProceso, "en proceso" + (b.entrevistas ? ` · ${b.entrevistas} ${palabra(b.entrevistas, "entrevista", "entrevistas")}` : "")],
                ].map(([v, label], i) => (
                  <div key={String(label)} className={`flex flex-col-reverse justify-end ${i ? "border-l border-line pl-[18px]" : ""}`}>
                    <dt className="mt-2 text-[13px] leading-[1.4] text-slate @min-[680px]:text-[14px]">{label}</dt>
                    <dd className="m-0 text-[30px] leading-none tracking-[-1px] text-brand @min-[680px]:text-[34px]" style={NUM}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Fila>
          </>
        )}
      </div>

      {/* pie, fuera de la tarjeta */}
      {!compact && (
        <div className="px-6 pt-8 @min-[680px]:mx-auto @min-[680px]:max-w-[640px] @min-[680px]:px-12">
          <p className="m-0 text-[18px] font-extrabold leading-[1.3] tracking-[-0.3px]" style={{ fontFamily: FONT_LOGO }}>
            {mailFirma}
          </p>
          <p className="m-0 mt-2 text-[14px] leading-[1.6] text-slate">{mailPie}</p>
          <p className="m-0 mt-4 text-[14px] font-extrabold leading-[1.4] text-brand" style={{ fontFamily: FONT_LOGO }}>
            TePostulo
          </p>
        </div>
      )}
    </div>
  );
}
