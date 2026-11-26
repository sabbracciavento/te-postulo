"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mailScenarios } from "@/content/mail";
import { PhoneFrame } from "./PhoneFrame";
import { GmailDesktop } from "./GmailDesktop";
import { HeroDuoMovil } from "./HeroDuoMovil";
import { CapaCelular, CapaVentana, fondoCelular } from "./HeroPantallas";

/*
 * La "película" de cada mail, en ms: entra la notificación al celular, se abre el mail y los dos dispositivos lo recorren con
 * SWIPES, como un dedo (o el trackpad) con la inercia de iOS: un arrastre breve que acelera y después la inercia que frena sola
 * (decaimiento exponencial, forma cerrada, independiente de los cuadros por segundo), aterrizando exacto en el bloque siguiente.
 * Ahí queda quieto para leerse; al final, pausa y fundido cruzado al mail siguiente.
 */
const T = { notif: 450, queda: 800, abrir: 400, tope: 1000, arrastre: 100, lectura: 1800, final: 1500, cruce: 400 };
/*
 * Tasa de frenado por ms. La de iOS "normal" (0,998) tarda 2,5–3,5 s en frenar un tramo de 300–900 px y llevaba cada mail a ~30 s;
 * con 0,994 el frenado dura 0,9–1,3 s (lo pedido) con la misma forma exponencial.
 */
const D = 0.994;
const K = -Math.log(D);
const CLAVE = ["entrevista", "cifra", "pendientes", "postulaciones", "novedades"];
const N = mailScenarios.length;

const salida = (x: number) => 1 - Math.pow(1 - x, 3.2);
const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const tramo = (t: number, t0: number, d: number) => Math.min(1, Math.max(0, (t - t0) / d));

/**
 * Un swipe de `dist` px: arrastre de T.arrastre ms con aceleración constante hasta v0 y después inercia
 * x(t) = v0·(1 − D^t)/K. v0 se elige para que arrastre + inercia sumen exactamente `dist`; cuando faltan menos de 0,5 px termina
 * (y se redondea al valor exacto).
 */
function swipe(dist: number) {
  const Ta = T.arrastre;
  const inercia = dist / (1 + 0.5 * K * Ta); // lo que recorre la inercia
  const v0 = inercia * K; // px/ms al soltar
  const frenado = inercia > 0.5 ? Math.log(0.5 / inercia) / Math.log(D) : 0;
  const pos = (t: number) => {
    if (dist <= 0 || t <= 0) return 0;
    if (t < Ta) return 0.5 * (v0 / Ta) * t * t;
    const ti = t - Ta;
    return ti >= frenado ? dist : 0.5 * v0 * Ta + (v0 * (1 - Math.pow(D, ti))) / K;
  };
  return { pos, dura: Ta + frenado };
}

type Capa = { viewport: HTMLElement; scroller: HTMLElement; zoom: number; bloques: Map<string, number>; max: number };
type Swipe = ReturnType<typeof swipe>;
type Plan = {
  paradas: { w: number; p: number }[];
  tramos: { t0: number; de: number; w: Swipe; p: Swipe }[];
  total: number;
  tAbrir: number;
  tPrincipal: number; // instante en que el mail llega a su bloque principal (estado fijo: pausa y movimiento reducido)
};

function medir(capa: HTMLElement): Capa | null {
  const viewport = capa.querySelector<HTMLElement>("[data-viewport]");
  const scroller = capa.querySelector<HTMLElement>("[data-scroller]");
  if (!viewport || !scroller) return null;
  const antes = scroller.style.transform;
  scroller.style.transform = "none";
  const v = viewport.getBoundingClientRect();
  const r = scroller.getBoundingClientRect();
  const bloques = new Map<string, number>();
  scroller.querySelectorAll<HTMLElement>("[data-bloque]").forEach((b) => bloques.set(b.dataset.bloque!, b.getBoundingClientRect().top - r.top));
  scroller.style.transform = antes;
  const zoom = (scroller as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1;
  return { viewport, scroller, zoom, bloques, max: Math.max(0, r.height - v.height) };
}

/** Paradas: tope → bloques clave → final (tu búsqueda y el pie). El celular va un bloque adelante. */
function planear(w: Capa, p: Capa): Plan {
  let nombres = [...w.bloques.keys()].filter((n) => CLAVE.includes(n));
  if (nombres.includes("entrevista")) nombres = nombres.filter((n) => n !== "cifra"); // la tarjeta es el bloque principal
  const a = (c: Capa, n: string | undefined) => (n === undefined ? c.max : Math.min(c.max, Math.max(0, (c.bloques.get(n) ?? c.max) - 30)));
  const crudas = [{ w: 0, p: 0 }];
  nombres.forEach((n, k) => crudas.push({ w: a(w, n), p: a(p, nombres[k + 1]) }));
  crudas.push({ w: w.max, p: p.max });
  // en px enteros: así el aterrizaje es exacto y el texto queda nítido
  const paradas = crudas.map((q) => ({ w: Math.round(q.w), p: Math.round(q.p) })).filter((q, k, l) => !k || q.w - l[k - 1].w > 24 || q.p - l[k - 1].p > 24);
  const tAbrir = T.notif + T.queda;
  let t = tAbrir + T.abrir + T.tope;
  let tPrincipal = t;
  const tramos = paradas.slice(1).map((q, k) => {
    const sw = swipe(q.w - paradas[k].w);
    const sp = swipe(q.p - paradas[k].p);
    const r = { t0: t, de: k, w: sw, p: sp };
    t += Math.max(sw.dura, sp.dura);
    if (k === 0) tPrincipal = t + 1;
    t += k === paradas.length - 2 ? T.final : T.lectura;
    return r;
  });
  return { paradas, tramos, total: t, tAbrir, tPrincipal };
}

/** Lleva el desplazamiento a píxeles enteros del dispositivo (texto nítido) y a las unidades del scroller (que puede tener zoom). */
function mover(c: Capa, y: number) {
  const dpr = window.devicePixelRatio || 1;
  c.scroller.style.transform = `translate3d(0, ${-(Math.round(y * dpr) / dpr) / c.zoom}px, 0)`;
}

function Selector({ activo, elegir, pausado, alternar }: { activo: number; elegir: (i: number) => void; pausado: boolean; alternar: () => void }) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="-ml-1.5 flex items-center">
        <div className="flex" role="group" aria-label="Tipos de mail del ejemplo">
          {mailScenarios.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => elegir(i)}
              aria-label={`Ver el mail: ${m.chip}`}
              aria-current={i === activo ? "true" : undefined}
              className="group grid h-7 w-10 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
            >
              <span className="relative block h-1.5 w-8 overflow-hidden rounded-full bg-line transition-colors group-hover:bg-[#c9d1e3]">
                <span data-progreso={i} className="absolute inset-0 origin-left rounded-full bg-brand" style={{ transform: `scaleX(${i < activo ? 1 : i === activo ? 0.04 : 0})` }} />
              </span>
            </button>
          ))}
        </div>
        {/* pausar / reproducir (WCAG 2.2.2): el movimiento se puede detener */}
        <button
          type="button"
          onClick={alternar}
          aria-label={pausado ? "Reproducir animación" : "Pausar animación"}
          aria-pressed={pausado}
          className="ml-0.5 grid h-7 w-7 cursor-pointer place-items-center rounded-full text-slate transition-colors hover:bg-cloud hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
        >
          {pausado ? (
            <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-current">
              <path d="M3 1.5v9l7.5-4.5z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-current">
              <rect x="2.5" y="1.5" width="2.5" height="9" rx="0.6" />
              <rect x="7" y="1.5" width="2.5" height="9" rx="0.6" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-[13px] font-medium leading-tight text-slate" aria-hidden="true">{mailScenarios[activo].chip}</p>
    </div>
  );
}

/**
 * Dispositivos del hero con los tres tipos de mail en secuencia, recorridos con swipes de inercia. Solo transform y opacity,
 * con requestAnimationFrame. Se detiene solo con el botón de pausa, con la pestaña oculta o con el hero fuera de la vista (el
 * puntero encima NO la frena). Con movimiento reducido no arranca sola: queda el mail abierto en su bloque principal y la
 * reproduce el botón. Devuelve las dos composiciones (celular < 768 y tablet/escritorio) como hijos directos de la grilla del hero.
 */
export function HeroDispositivos() {
  const [activo, setActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const comps = useRef<(HTMLDivElement | null)[]>([null, null]);
  const ir = useRef<(i: number) => void>(() => {});
  const conmutar = useRef<() => void>(() => {});
  const elegir = useCallback((i: number) => ir.current(i), []);
  const alternar = useCallback(() => conmutar.current(), []);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const st = {
      i: 0,
      t: T.notif, // el primer mail arranca con la notificación ya adentro (así se ve también antes de hidratar)
      cruce: null as null | { a: number; t: number },
      planes: new Map<string, { pl: Plan | null; w: Capa | null; p: Capa | null }>(),
      usuario: reducido.matches, // pausa pedida con el botón (con movimiento reducido arranca pausado)
      aLaVista: true,
      ultimo: 0,
      raf: 0,
    };
    const visible = () => comps.current.find((c) => c && c.getClientRects().length) ?? null;
    const capa = (c: HTMLElement, dev: string, i: number) => c.querySelector<HTMLElement>(`[data-dev="${dev}"][data-capa="${i}"]`)!;
    const quieto = () => st.usuario || document.hidden || !st.aLaVista;

    function plan(c: HTMLElement, i: number) {
      const k = `${comps.current.indexOf(c as HTMLDivElement)}-${i}`;
      let e = st.planes.get(k);
      if (!e) {
        const w = medir(capa(c, "ventana", i));
        const p = medir(capa(c, "celular", i));
        e = { pl: w && p ? planear(w, p) : null, w, p };
        st.planes.set(k, e);
        if (e.pl) c.dataset[`duracion${i}`] = `${Math.round(e.pl.total)}ms · ${e.pl.tramos.length} swipes`;
      }
      return e;
    }

    /** Dibuja el mail i en el instante t. */
    function pintar(c: HTMLElement, i: number, t: number) {
      const { pl, w, p } = plan(c, i);
      if (!pl || !w || !p) return;
      const cel = capa(c, "celular", i);
      const notif = cel.querySelector<HTMLElement>("[data-notif]")!;
      const correo = cel.querySelector<HTMLElement>("[data-correo]")!;
      const entra = salida(tramo(t, 0, T.notif));
      const abre = salida(tramo(t, pl.tAbrir, T.abrir));
      notif.style.opacity = String(entra * (1 - abre));
      notif.style.transform = entra * (1 - abre) === 1 ? "none" : `translate3d(0, ${(-(1 - entra) * 115 - abre * 18).toFixed(2)}%, 0) scale(${(1 - abre * 0.04).toFixed(4)})`;
      correo.style.opacity = String(abre);
      let y = pl.paradas[0];
      for (const r of pl.tramos) {
        if (t < r.t0) break;
        const de = pl.paradas[r.de];
        y = { w: de.w + r.w.pos(t - r.t0), p: de.p + r.p.pos(t - r.t0) };
      }
      mover(w, y.w);
      mover(p, y.p);
    }

    function opacidades(c: HTMLElement, i: number, cruce: null | { a: number; x: number }) {
      for (let k = 0; k < N; k++) {
        const o = cruce ? (k === i ? 1 - cruce.x : k === cruce.a ? cruce.x : 0) : k === i ? 1 : 0;
        for (const dev of ["ventana", "celular"]) capa(c, dev, k).style.opacity = String(o);
      }
    }

    function progreso(c: HTMLElement, i: number, x: number) {
      c.querySelectorAll<HTMLElement>("[data-progreso]").forEach((b) => {
        const k = Number(b.dataset.progreso);
        b.style.transform = `scaleX(${k < i ? 1 : k === i ? Math.max(0.04, Math.min(1, x)) : 0})`;
      });
    }

    function cuadro(ahora: number) {
      st.raf = 0;
      const c = visible();
      const dt = st.ultimo ? Math.min(100, ahora - st.ultimo) : 0;
      st.ultimo = ahora;
      if (!c) return;
      const parado = quieto();
      const pl = plan(c, st.i).pl;
      if (!pl) return;
      if (st.cruce) {
        if (!parado) st.cruce.t += dt;
        const x = suave(tramo(st.cruce.t, 0, T.cruce));
        opacidades(c, st.i, { a: st.cruce.a, x });
        if (x >= 1) {
          st.i = st.cruce.a;
          st.t = 0;
          st.cruce = null;
          opacidades(c, st.i, null);
        }
      } else {
        if (!parado) st.t += dt;
        if (st.t >= pl.total) empezarCruce((st.i + 1) % N);
      }
      if (!st.cruce) pintar(c, st.i, st.t);
      progreso(c, st.i, st.cruce ? 1 : st.t / pl.total);
      if (!parado) seguir();
      else st.ultimo = 0;
    }

    function empezarCruce(a: number) {
      const c = visible();
      if (!c || a === st.i) return;
      pintar(c, a, 0); // el mail siguiente, listo en su comienzo (celular bloqueado, ventana arriba)
      st.cruce = { a, t: 0 };
      setActivo(a);
    }

    function seguir() {
      if (!st.raf && !quieto()) st.raf = requestAnimationFrame(cuadro);
    }

    /** Estado fijo: el mail i abierto en su bloque principal (pausa elegida con una pastilla y movimiento reducido). */
    function fijar(i: number) {
      st.i = i;
      st.cruce = null;
      setActivo(i);
      for (const c of comps.current)
        if (c && c.getClientRects().length) {
          const pl = plan(c, i).pl;
          if (!pl) continue;
          st.t = pl.tPrincipal;
          opacidades(c, i, null);
          pintar(c, i, st.t);
          progreso(c, i, st.t / pl.total);
        }
    }

    ir.current = (i: number) => {
      if (st.cruce) {
        opacidades(visible()!, st.cruce.a, null);
        st.i = st.cruce.a;
        st.cruce = null;
      }
      if (st.usuario) return fijar(i); // en pausa: muestra ese mail quieto, en su bloque principal
      if (i === st.i) st.t = 0; // el mismo mail: vuelve a empezar
      else empezarCruce(i);
      st.ultimo = 0;
      seguir();
    };

    conmutar.current = () => {
      st.usuario = !st.usuario;
      setPausado(st.usuario);
      st.ultimo = 0;
      if (!st.usuario) seguir();
    };

    const alCambiarVisibilidad = () => seguir();
    document.addEventListener("visibilitychange", alCambiarVisibilidad);
    const io = new IntersectionObserver((es) => {
      st.aLaVista = es.some((e) => e.isIntersecting);
      seguir();
    });
    comps.current.forEach((c) => c && io.observe(c));
    // cambio de tamaño: se vuelven a medir los mails (las paradas dependen del ancho)
    const ro = new ResizeObserver(() => {
      st.planes.clear();
      const c = visible();
      if (c && !st.cruce) pintar(c, st.i, st.t);
      seguir();
    });
    comps.current.forEach((c) => c && ro.observe(c));

    if (st.usuario) {
      setPausado(true);
      fijar(0);
    } else seguir();

    return () => {
      cancelAnimationFrame(st.raf);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const selector = <Selector activo={activo} elegir={elegir} pausado={pausado} alternar={alternar} />;

  return (
    <>
      {/* Celular (< 768): compu + celular en versión propia, entera y legible (no el escritorio achicado) */}
      <div ref={(el) => void (comps.current[0] = el)} className="mt-10 md:hidden apaisado:hidden">
        <HeroDuoMovil
          ventana={mailScenarios.map((m, i) => <CapaVentana key={m.id} s={m} i={i} escala="movil" />)}
          celular={mailScenarios.map((m, i) => <CapaCelular key={m.id} s={m} i={i} escala="movil" />)}
          selector={selector}
        />
      </div>

      {/* Tablet y escritorio: compu atrás + celular entero adelante, recorriendo el mismo mail */}
      <div ref={(el) => void (comps.current[1] = el)} className="relative mt-12 hidden md:block apaisado:hidden! lg:col-span-7 lg:mt-0">
        {/* decorativo y sin interacción: el mail baja solo, no se scrollea a mano */}
        <div aria-hidden="true" className="pointer-events-none select-none">
          <span className="tp-slant pointer-events-none absolute -bottom-12 -top-12 left-[44%] w-[30%] bg-[linear-gradient(135deg,#3358F0_0%,#1E40D8_55%,#1530C8_100%)]" />
          {/* margen a la derecha: el celular (~216 px) tapa solo el borde derecho de la ventana, ~15–19 % de su ancho */}
          <div className="relative pb-16 pr-36 xl:pr-32">
            <GmailDesktop
              scenario={mailScenarios[0]}
              inboxCount={38}
              position={1}
              variante="hero"
              cuerpo={mailScenarios.map((m, i) => <CapaVentana key={m.id} s={m} i={i} escala="escritorio" />)}
            />
          </div>
          {/* el teléfono se dibuja a 360 px (su diseño real) y se muestra al 60 %: ~216 × 444 px, proporción ~2,05 */}
          <div className="absolute bottom-0 right-0" style={{ zoom: 0.6, width: 360 }}>
            <PhoneFrame barra={false} fundido={false} pantalla={720} className="w-[360px]">
              <div className={`relative h-[720px] ${fondoCelular}`}>
                {mailScenarios.map((m, i) => (
                  <CapaCelular key={m.id} s={m} i={i} escala="escritorio" />
                ))}
              </div>
            </PhoneFrame>
          </div>
        </div>
        {/* selector: en el hueco debajo de la ventana, a la izquierda del celular */}
        <div className="absolute bottom-0 left-0 flex h-16 items-center">{selector}</div>
      </div>
    </>
  );
}
