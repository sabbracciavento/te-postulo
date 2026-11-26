import Image from "next/image";
import type { MailScenario } from "@/content/mail";
import { GmailLogo } from "./GmailIcons";

/**
 * Hero del celular (< 768 px): la compu y el celular, en versión propia (no el escritorio achicado).
 * Diseñado a 342 px de ancho (390 − márgenes) y escalado con unidades de contenedor (cqw), así se ve igual de 320 a 767.
 * Ventana de la compu atrás (80 % del ancho), celular entero adelante (40 %, proporción ~2:1) tapando solo su borde
 * derecho e inferior; el mismo mail simplificado en los dos: logo, título y la cifra del día. Decorativo (aria-hidden).
 */
export function HeroDuoMovil({ scenario, notificacion, className = "" }: { scenario: MailScenario; notificacion: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`@container w-full ${className}`}>
      <div className="relative aspect-[342/330] w-full font-gmail text-[#1f1f1f]">
        {/* banda inclinada del TP, detrás */}
        <span className="tp-slant pointer-events-none absolute inset-y-[2cqw] left-[52cqw] w-[24cqw] bg-brand" />

        {/* compu: ventana de Gmail con cromo mínimo */}
        <div className="absolute left-0 top-[3cqw] h-[72cqw] w-[80cqw] overflow-hidden rounded-[3.5cqw] border border-line bg-[#f6f8fc] shadow-[0_1cqw_4cqw_rgba(16,24,40,0.08)]">
          <div className="flex h-[10cqw] items-center gap-[2cqw] px-[3.5cqw]">
            <GmailLogo className="h-[5cqw] w-[5cqw]" />
            <span className="text-[4cqw] text-[#444746]">Gmail</span>
          </div>
          <div className="mx-[2.5cqw] h-[56cqw] rounded-[2.5cqw] bg-white">
            <p className="truncate border-b border-[#e8eaed] px-[3cqw] py-[1.8cqw] pr-[18cqw] text-[2.9cqw] text-[#444746]">
              <span className="font-medium text-[#1f1f1f]">TePostulo</span> · {scenario.subject}
            </p>
            {/* el contenido queda a la izquierda: el celular tapa el borde derecho */}
            <div className="w-[52cqw] px-[3.5cqw] pt-[3cqw] font-sans">
              <p className="flex items-center gap-[1.6cqw]">
                <Image src="/brand/tp-circulo-96.png" alt="" width={20} height={20} className="h-[5.2cqw] w-[5.2cqw]" />
                <span className="font-display text-[3.8cqw] font-extrabold tracking-[-0.02em]">TePostulo</span>
              </p>
              <p className="mt-[2.4cqw] font-display text-[4.6cqw] font-extrabold leading-[1.15] tracking-[-0.02em]">{scenario.titulo}</p>
              <p className="mt-[2.6cqw] font-display text-[13cqw] font-extrabold leading-none tracking-[-0.04em] text-brand">{scenario.hoy}</p>
              <p className="mt-[0.6cqw] font-display text-[3.6cqw] font-extrabold">postulaciones hoy.</p>
            </div>
          </div>
        </div>

        {/* celular entero, adelante */}
        <div className="absolute bottom-0 right-0 h-[82cqw] w-[40cqw] rounded-[6cqw] bg-ink p-[1.8cqw] shadow-[0_2cqw_6cqw_rgba(16,24,40,0.18)]">
          <div className="h-full overflow-hidden rounded-[4.4cqw] bg-white px-[2.4cqw] pt-[2cqw]">
            <div className="flex justify-between text-[2.4cqw] font-medium">
              <span>{scenario.hora}</span>
              <span className="flex items-end gap-[0.4cqw]">
                <i className="block h-[1.2cqw] w-[0.6cqw] rounded-sm bg-[#1f1f1f]" />
                <i className="block h-[1.8cqw] w-[0.6cqw] rounded-sm bg-[#1f1f1f]" />
                <i className="block h-[2.4cqw] w-[0.6cqw] rounded-sm bg-[#1f1f1f]" />
              </span>
            </div>
            {/* notificación */}
            <div className="mt-[1.6cqw] rounded-[2.4cqw] bg-[#f2f3f8] px-[2cqw] py-[1.6cqw]">
              <p className="flex items-center gap-[1cqw] text-[2.2cqw] text-[#444746]">
                <GmailLogo className="h-[2.6cqw] w-[2.6cqw]" /> Gmail · ahora
              </p>
              <p className="mt-[0.6cqw] text-[2.6cqw] font-medium">TePostulo</p>
              <p className="text-[2.5cqw] leading-tight text-[#444746]">{notificacion}</p>
            </div>
            {/* el mismo mail */}
            <div className="mt-[3cqw] font-sans">
              <p className="flex items-center gap-[1.2cqw]">
                <Image src="/brand/tp-circulo-96.png" alt="" width={16} height={16} className="h-[4cqw] w-[4cqw]" />
                <span className="font-display text-[3cqw] font-extrabold">TePostulo</span>
              </p>
              <p className="mt-[2cqw] font-display text-[3.6cqw] font-extrabold leading-[1.15] tracking-[-0.02em]">{scenario.titulo}</p>
              <p className="mt-[2.4cqw] font-display text-[10cqw] font-extrabold leading-none tracking-[-0.04em] text-brand">{scenario.hoy}</p>
              <p className="mt-[0.6cqw] font-display text-[3cqw] font-extrabold leading-tight">postulaciones hoy.</p>
              <span className="tp-slant mt-[2cqw] block h-[1.2cqw] w-[9cqw] bg-brand" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
