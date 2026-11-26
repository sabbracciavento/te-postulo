"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mailScenarios } from "@/content/mail";
import { PhoneFrame } from "./PhoneFrame";
import { GmailDesktop } from "./GmailDesktop";
import { HeroDuoMovil } from "./HeroDuoMovil";
import { CapaCelular, CapaVentana, fondoCelular } from "./HeroPantallas";

/*
 * La "película" de cada mail, en ms. Entra la notificación al celular, queda, se abre el mail y los dos dispositivos lo recorren
 * entero, bloque por bloque (el celular un bloque adelante), con pausas; al final, fundido cruzado al mail siguiente.
 */
const T = { notif: 450, queda: 1200, abrir: 450, arriba: 800, pausa: 1000, final: 1500, cruce: 400 };
const VELOCIDAD = 60; // px reales por segundo, de promedio en cada tramo
const TRAMO_MIN = 800;
const N = mailScenarios.length;

/* salida suave tipo cubic-bezier(.2,.8,.2,1) y entrada/salida para los desplazamientos */
const salida = (x: number) => 1 - Math.pow(1 - x, 3.2);
const suave = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const tramo = (t: number, t0: number, d: number) => Math.min(1, Math.max(0, (t - t0) / d));

type Capa = { viewport: HTMLElement; scroller: HTMLElement; zoom: number; bloques: Map<string, number>; max: number };
type Plan = { paradas: { w: number; p: number }[]; tramos: { t0: number; d: number; de: number }[]; total: number; tAbrir: number };

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

/** Paradas: arriba → cada bloque del mail (la cabecera y la apertura se ven arriba) → final. El celular va un bloque adelante. */
function planear(w: Capa, p: Capa): Plan {
  const nombres = [...w.bloques.keys()].filter((n) => n !== "cabecera" && n !== "apertura" && n !== "pie");
  const a = (c: Capa, n: string | undefined) => (n === undefined ? c.max : Math.min(c.max, Math.max(0, (c.bloques.get(n) ?? c.max) - 12)));
  const paradas = [{ w: 0, p: 0 }];
  nombres.forEach((n, k) => paradas.push({ w: a(w, n), p: a(p, nombres[k + 1]) }));
  paradas.push({ w: w.max, p: p.max });
  const limpias = paradas.filter((q, k) => !k || Math.abs(q.w - paradas[k - 1].w) > 24 || Math.abs(q.p - paradas[k - 1].p) > 24);
  const tAbrir = T.notif + T.queda;
  let t = tAbrir + T.abrir + T.arriba;
  const tramos = limpias.slice(1).map((q, k) => {
    const de = limpias[k];
    const d = Math.max(TRAMO_MIN, (Math.max(Math.abs(q.w - de.w), Math.abs(q.p - de.p)) / VELOCIDAD) * 1000);
    const r = { t0: t, d, de: k };
    t += d + (k === limpias.length - 2 ? T.final : T.pausa);
    return r;
  });
  if (!tramos.length) t += T.final;
  return { paradas: limpias, tramos, total: t, tAbrir };
}

/** Lleva el desplazamiento a píxeles enteros del dispositivo (texto nítido) y a las unidades del scroller (que puede tener zoom). */
function mover(c: Capa, y: number) {
  const dpr = window.devicePixelRatio || 1;
  c.scroller.style.transform = `translate3d(0, ${-(Math.round(y * dpr) / dpr) / c.zoom}px, 0)`;
}

function Selector({ activo, elegir }: { activo: number; elegir: (i: number) => void }) {
  return (
    <div className="flex flex-col gap-0.5" role="group" aria-label="Tipos de mail del ejemplo">
      <div className="-ml-1.5 flex">
        {mailScenarios.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => elegir(i)}
            aria-label={`Ver el mail: ${m.chip}`}
            aria-current={i === activo ? "true" : undefined}
            className="group grid h-7 w-11 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
          >
            <span className="relative block h-1.5 w-8 overflow-hidden rounded-full bg-line transition-colors group-hover:bg-[#c9d1e3]">
              <span data-progreso={i} className="absolute inset-0 origin-left rounded-full bg-brand" style={{ transform: `scaleX(${i < activo ? 1 : i === activo ? 0.04 : 0})` }} />
            </span>
          </button>
        ))}
      </div>
      <p className="text-[13px] font-medium leading-tight text-slate" aria-hidden="true">{mailScenarios[activo].chip}</p>
    </div>
  );
}

/**
 * Dispositivos del hero con los tres tipos de mail en secuencia, como una película corta de cada uno. Solo transform y opacity,
 * con requestAnimationFrame; corre solo con el hero a la vista y se pausa con el puntero encima, con el foco adentro y con la
 * pestaña oculta. Con movimiento reducido: sin animación (mail abierto en el bloque principal) y cambio manual con las pastillas.
 * Devuelve las dos composiciones (celular < 768 y tablet/escritorio) como hijos directos de la grilla del hero.
 */
export function HeroDispositivos() {
  const [activo, setActivo] = useState(0);
  const comps = useRef<(HTMLDivElement | null)[]>([null, null]);
  const ir = useRef<(i: number) => void>(() => {});
  const elegir = useCallback((i: number) => ir.current(i), []);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)");
    const st = {
      i: 0,
      t: T.notif, // el primer mail arranca con la notificación ya adentro (así se ve también antes de hidratar)
      cruce: null as null | { a: number; t: number },
      planes: new Map<string, { pl: Plan | null; w: Capa | null; p: Capa | null }>(),
      puntero: false,
      foco: false,
      aLaVista: true,
      ultimo: 0,
      raf: 0,
    };
    const visible = () => comps.current.find((c) => c && c.getClientRects().length) ?? null;
    const capa = (c: HTMLElement, dev: string, i: number) => c.querySelector<HTMLElement>(`[data-dev="${dev}"][data-capa="${i}"]`)!;

    function plan(c: HTMLElement, i: number) {
      const k = `${comps.current.indexOf(c as HTMLDivElement)}-${i}`;
      let e = st.planes.get(k);
      if (!e) {
        const w = medir(capa(c, "ventana", i));
        const p = medir(capa(c, "celular", i));
        e = { pl: w && p ? planear(w, p) : null, w, p };
        st.planes.set(k, e);
      }
      return e;
    }

    /** Dibuja el mail i en el instante t (o su estado fijo, con movimiento reducido). */
    function pintar(c: HTMLElement, i: number, t: number, fijo = false) {
      const { pl, w, p } = plan(c, i);
      if (!pl || !w || !p) return;
      const cel = capa(c, "celular", i);
      const notif = cel.querySelector<HTMLElement>("[data-notif]")!;
      const correo = cel.querySelector<HTMLElement>("[data-correo]")!;
      if (fijo) {
        notif.style.opacity = "0";
        correo.style.opacity = "1";
        const q = pl.paradas[Math.min(1, pl.paradas.length - 1)];
        mover(w, q.w);
        mover(p, q.p);
        return;
      }
      const entra = salida(tramo(t, 0, T.notif));
      const abre = salida(tramo(t, pl.tAbrir, T.abrir));
      notif.style.opacity = String(entra * (1 - abre));
      notif.style.transform = entra * (1 - abre) === 1 ? "none" : `translate3d(0, ${(-(1 - entra) * 115 - abre * 18).toFixed(2)}%, 0) scale(${(1 - abre * 0.04).toFixed(4)})`;
      correo.style.opacity = String(abre);
      let y = pl.paradas[0];
      for (const r of pl.tramos) {
        if (t < r.t0) break;
        const de = pl.paradas[r.de];
        const a = pl.paradas[r.de + 1];
        const x = suave(tramo(t, r.t0, r.d));
        y = { w: de.w + (a.w - de.w) * x, p: de.p + (a.p - de.p) * x };
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
      const quieto = st.puntero || st.foco || document.hidden || !st.aLaVista;
      const pl = plan(c, st.i).pl;
      if (!pl) return;
      if (st.cruce) {
        if (!quieto) st.cruce.t += dt;
        const x = suave(tramo(st.cruce.t, 0, T.cruce));
        opacidades(c, st.i, { a: st.cruce.a, x });
        if (x >= 1) {
          st.i = st.cruce.a;
          st.t = 0;
          st.cruce = null;
          opacidades(c, st.i, null);
        }
      } else {
        if (!quieto) st.t += dt;
        if (st.t >= pl.total) empezarCruce((st.i + 1) % N);
      }
      if (!st.cruce) pintar(c, st.i, st.t);
      progreso(c, st.i, st.cruce ? 1 : st.t / pl.total);
      if (!quieto) seguir();
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
      if (!st.raf && !reducido.matches) st.raf = requestAnimationFrame(cuadro);
    }

    function fijar(i: number) {
      st.i = i;
      st.cruce = null;
      setActivo(i);
      for (const c of comps.current)
        if (c && c.getClientRects().length) {
          opacidades(c, i, null);
          pintar(c, i, 0, true);
          progreso(c, i, 1);
        }
    }

    ir.current = (i: number) => {
      if (reducido.matches) return fijar(i);
      if (st.cruce) {
        opacidades(visible()!, st.cruce.a, null);
        st.i = st.cruce.a;
        st.cruce = null;
      }
      if (i === st.i) {
        st.t = 0; // el mismo mail: vuelve a empezar
      } else {
        empezarCruce(i);
        // elegido a mano con la animación en pausa (puntero o foco): el cruce se completa igual
        if (st.puntero || st.foco) {
          st.cruce!.t = T.cruce;
        }
      }
      st.ultimo = 0;
      if (st.raf) cancelAnimationFrame(st.raf);
      st.raf = 0;
      cuadro(performance.now());
    };

    // pausas: puntero, foco y visibilidad, sobre cada composición
    const quitar: (() => void)[] = [];
    for (const c of comps.current) {
      if (!c) continue;
      const on = (ev: string, fn: (e: Event) => void) => {
        c.addEventListener(ev, fn);
        quitar.push(() => c.removeEventListener(ev, fn));
      };
      on("pointerenter", (e) => {
        if ((e as PointerEvent).pointerType === "mouse") st.puntero = true;
      });
      on("pointerleave", () => {
        st.puntero = false;
        seguir();
      });
      // solo el foco de teclado pausa (un clic en una pastilla también enfoca el botón, pero no es :focus-visible)
      on("focusin", (e) => {
        if ((e.target as HTMLElement).matches?.(":focus-visible")) st.foco = true;
      });
      on("focusout", (e) => {
        if (!c.contains((e as FocusEvent).relatedTarget as Node | null)) {
          st.foco = false;
          seguir();
        }
      });
    }
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
      if (reducido.matches) fijar(st.i);
      else seguir();
    });
    comps.current.forEach((c) => c && ro.observe(c));

    const alCambiarMovimiento = () => (reducido.matches ? fijar(st.i) : seguir());
    reducido.addEventListener("change", alCambiarMovimiento);
    if (reducido.matches) fijar(0);
    else seguir();

    return () => {
      cancelAnimationFrame(st.raf);
      quitar.forEach((f) => f());
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
      reducido.removeEventListener("change", alCambiarMovimiento);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const selector = <Selector activo={activo} elegir={elegir} />;

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
        <div aria-hidden="true">
          <span className="tp-slant pointer-events-none absolute -bottom-12 -top-12 left-[44%] w-[30%] bg-brand" />
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
