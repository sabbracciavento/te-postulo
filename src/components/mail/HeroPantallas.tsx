import Image from "next/image";
import type { CSSProperties } from "react";
import type { MailScenario } from "@/content/mail";
import { EmailSummary } from "./EmailSummary";
import { GmailLogo } from "./GmailIcons";

/**
 * Capas de los dispositivos del hero: una por escenario, apiladas (la activa con opacidad 1). Cada capa tiene el mail COMPLETO
 * (EmailSummary, el mismo componente de la sección del mail) dentro de un visor de alto fijo; HeroDispositivos lo recorre moviendo
 * `[data-scroller]` con transform (nunca scroll real) y maneja la notificación y la apertura del mail en el celular.
 * Escalas: el mail se dibuja con zoom y un piso de tamaño (--mail-min) para que lo más chico quede en ≥ 11 px reales en el celular
 * del sitio y ≥ 12 px en tablet/escritorio. Todo es decorativo (aria-hidden en el contenedor).
 */

type Escala = "movil" | "escritorio";

const MAIL: Record<Escala, { ventana: CSSProperties; celular: CSSProperties }> = {
  // celular del sitio: el mail al 72 %, con piso de 15,5 px de diseño → 11,2 px reales
  movil: {
    ventana: { zoom: 0.72, ["--mail-min" as string]: "15.5px" },
    celular: { zoom: 0.72, ["--mail-min" as string]: "15.5px" },
  },
  // escritorio: la ventana a tamaño real (piso 13 px); el teléfono ya está al 60 %, el mail adentro queda al 80 % (piso 15 → 12 px)
  escritorio: {
    ventana: { ["--mail-min" as string]: "13px" },
    celular: { zoom: 0.8 / 0.6, ["--mail-min" as string]: "15px" },
  },
};

/* 24 px de desvanecido arriba y abajo del visor: el mail entra y sale con suavidad (las paradas dejan el texto debajo) */
const desvanecer = "[mask-image:linear-gradient(to_bottom,transparent,black_24px,black_calc(100%-24px),transparent)]";

const opacidad = (visible: boolean): CSSProperties => ({ opacity: visible ? 1 : 0 });

/** Ventana de la compu: en escritorio con la línea de remitente y asunto de Gmail; el mail a la izquierda del celular. */
export function CapaVentana({ s, i, escala }: { s: MailScenario; i: number; escala: Escala }) {
  const movil = escala === "movil";
  return (
    <div data-capa={i} data-dev="ventana" className="absolute inset-0" style={opacidad(i === 0)}>
      {!movil && (
        <div className="flex h-11 items-center gap-2.5 border-b border-[#e8eaed] pl-4 pr-[22%] font-gmail">
          <Image src="/brand/tp-circulo-96.png" alt="" width={24} height={24} className="h-6 w-6 shrink-0 rounded-full" />
          <span className="shrink-0 text-[13px] font-medium">TePostulo</span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-[#444746]">{s.subject}</span>
          <span className="shrink-0 text-[12px] text-[#444746]">{s.hora}</span>
        </div>
      )}
      {/* el visor termina antes del celular: el teléfono nunca tapa texto del mail */}
      <div data-viewport className={`absolute overflow-hidden ${desvanecer} ${movil ? "inset-y-0 left-0 w-[50.5cqw]" : "bottom-0 left-0 right-[24%] top-11"}`}>
        <div data-scroller className="will-change-transform">
          <div style={MAIL[escala].ventana}>
            <EmailSummary scenario={s} hero />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Pantalla del celular: bloqueo con la hora, la notificación que entra y el mail que se abre y se recorre. */
export function CapaCelular({ s, i, escala }: { s: MailScenario; i: number; escala: Escala }) {
  return (
    <div data-capa={i} data-dev="celular" className="absolute inset-0 text-ink" style={{ ...opacidad(i === 0), fontSize: escala === "movil" ? 11.5 : 22 }}>
      {/* pantalla de bloqueo */}
      <div className="absolute inset-x-0 top-[10.6em] text-center">
        <p className="font-display text-[3.2em] font-extrabold leading-none tracking-[-0.03em]">{s.hora}</p>
        <p className="mt-[0.4em] first-letter:uppercase">{s.fecha}</p>
      </div>
      {/* notificación (entra desde arriba; en el estado inicial ya está) */}
      <div
        data-notif
        className="absolute inset-x-[0.6em] top-[2.4em] rounded-[1.1em] bg-white px-[0.8em] py-[0.65em] font-gmail leading-[1.3] shadow-[0_0.35em_1.4em_rgba(16,24,40,0.14)]"
      >
        <p className="flex items-center gap-[0.35em] text-[#444746]">
          <GmailLogo className="h-[1em] w-[1em] shrink-0" /> Gmail · ahora
        </p>
        <p className="mt-[0.25em] font-bold">TePostulo</p>
        <p>{s.subject}</p>
      </div>
      {/* el mail abierto */}
      <div data-correo className="absolute inset-0 bg-white" style={{ opacity: 0 }}>
        <div data-viewport className={`absolute inset-x-0 bottom-0 top-[2.2em] overflow-hidden ${desvanecer}`}>
          <div data-scroller className="will-change-transform">
            <div style={MAIL[escala].celular}>
              <EmailSummary scenario={s} hero />
            </div>
          </div>
        </div>
      </div>
      {/* barra de estado, siempre arriba */}
      <div className="absolute inset-x-0 top-0 flex h-[2.2em] items-center justify-between px-[1.1em] font-gmail font-medium leading-none">
        <span>{s.hora}</span>
        <span className="flex items-end gap-[0.14em]">
          <i className="block h-[0.4em] w-[0.2em] rounded-sm bg-[#1f1f1f]" />
          <i className="block h-[0.6em] w-[0.2em] rounded-sm bg-[#1f1f1f]" />
          <i className="block h-[0.8em] w-[0.2em] rounded-sm bg-[#1f1f1f]" />
        </span>
      </div>
    </div>
  );
}

/** Fondo de la pantalla del celular (debajo de las capas). */
export const fondoCelular = "bg-[linear-gradient(165deg,#E6ECFF_0%,#F4F7FF_55%,#FFFFFF_100%)]";
