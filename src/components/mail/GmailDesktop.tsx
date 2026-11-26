import Image from "next/image";
import type { ReactNode } from "react";
import type { MailScenario } from "@/content/mail";
import { EmailSummary } from "./EmailSummary";
import { GIcon, GmailLogo, type IconName } from "./GmailIcons";

/** seccion: la ventana completa de la sección del mail (recorrible) · hero: más baja (440 px), decorativa, sin barra lateral
 *  por debajo de 1280 px y con el comienzo del mail con fundido. */
type Props = { scenario: MailScenario; inboxCount: number; position: number; variante?: "seccion" | "hero";
  /** hero: el contenido del panel del mensaje (asunto + mail), lo arma HeroDispositivos */
  cuerpo?: ReactNode;
};

/** Mensaje abierto en Gmail web (vista de escritorio, Material 3). */
export function GmailDesktop({ scenario, inboxCount, position, variante = "seccion", cuerpo }: Props) {
  const hero = variante === "hero";
  const ic = "h-5 w-5 text-[#444746]";
  const tool = (name: IconName) => (
    <span key={name} className="grid h-9 w-9 place-items-center rounded-full">
      <GIcon name={name} className={ic} />
    </span>
  );
  const nav: [IconName, string, boolean][] = [
    ["inbox", "Recibidos", true],
    ["star", "Destacados", false],
    ["schedule", "Pospuestos", false],
    ["send", "Enviados", false],
    ["draft", "Borradores", false],
    ["expand", "Más", false],
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-[#f6f8fc] font-gmail text-[#1f1f1f]" role="group" aria-label="Ejemplo del mail de resumen abierto en Gmail">
      {/* barra superior */}
      <div className={`flex items-center gap-3 px-3 ${hero ? "h-14" : "h-16"}`}>
        <span className="grid h-12 w-12 place-items-center"><GIcon name="menu" className="h-6 w-6 text-[#444746]" /></span>
        <span className={`flex items-center gap-2 ${hero ? "w-auto shrink-0 xl:w-[148px]" : "w-[180px]"}`}>
          <GmailLogo className="h-8 w-8" />
          <span className="text-[22px] text-[#444746]">Gmail</span>
        </span>
        <div className={`flex max-w-[720px] min-w-0 flex-1 items-center gap-3 rounded-full bg-[#e9eef6] px-4 ${hero ? "h-10" : "h-12"}`}>
          <GIcon name="search" className="h-6 w-6 shrink-0 text-[#444746]" />
          <span className={`truncate text-[16px] text-[#444746] ${hero ? "max-xl:hidden" : ""}`}>Buscar en el correo</span>
        </div>
        <span className="flex-1" />
        {!hero && (
          <>
            <GIcon name="help" className="h-6 w-6 text-[#444746]" />
            <GIcon name="settings" className="mx-3 h-6 w-6 text-[#444746]" />
            <GIcon name="apps" className="h-6 w-6 text-[#444746]" />
          </>
        )}
        <span className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-[#5f6368] text-[14px] font-medium text-white">A</span>
      </div>

      <div className={hero ? "grid h-[384px] grid-cols-1 xl:grid-cols-[64px_1fr]" : "grid h-[min(660px,calc(100svh-240px))] grid-cols-[232px_1fr]"}>
        {/* hero desde 1280 px: la barra lateral angosta de Gmail (solo íconos), para dejarle el ancho al mail */}
        {hero && (
          <div className="hidden flex-col items-center gap-3 pt-2 xl:flex">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c2e7ff] text-[#001d35]"><GIcon name="edit" className="h-6 w-6" /></span>
            {nav.slice(0, 5).map(([icon, label, active]) => (
              <span key={label} className={`grid h-8 w-12 place-items-center rounded-full ${active ? "bg-[#d3e3fd]" : "text-[#444746]"}`}>
                <GIcon name={icon} className="h-5 w-5" />
              </span>
            ))}
          </div>
        )}
        {/* navegación izquierda */}
        <div className={`px-3 pt-2 ${hero ? "hidden" : ""}`}>
          <span className="flex h-14 w-[138px] items-center gap-4 rounded-2xl bg-[#c2e7ff] pl-4 text-[14px] font-medium text-[#001d35] shadow-sm">
            <GIcon name="edit" className="h-6 w-6" /> Redactar
          </span>
          <ul className="mt-4 space-y-0.5 text-[14px]">
            {nav.map(([icon, label, active]) => (
              <li key={label} className={`flex h-8 items-center gap-4 rounded-full pl-3 pr-3 ${active ? "bg-[#d3e3fd] font-medium" : "text-[#444746]"}`}>
                <GIcon name={icon} className="h-5 w-5" />
                <span className="flex-1">{label}</span>
                {active && <span className="text-[12px] font-medium">{inboxCount}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* panel del mensaje */}
        <div className={`mb-3 flex min-h-0 flex-col overflow-hidden rounded-2xl bg-white ${hero ? "mx-3 xl:ml-0" : "mr-3"}`}>
          {!hero && (
          <div className="flex h-12 items-center gap-0.5 border-b border-[#e8eaed] px-2">
            {tool("back")}
            <span className="mx-1 h-5 w-px bg-[#e0e0e0]" />
            {tool("archive")}
            {!hero && tool("report")}
            {tool("delete")}
            <span className="mx-1 h-5 w-px bg-[#e0e0e0]" />
            {tool("mail")}
            {!hero && (
              <>
                {tool("schedule")}
                {tool("task")}
                <span className="mx-1 h-5 w-px bg-[#e0e0e0]" />
                {tool("folder")}
                {tool("label")}
              </>
            )}
            {tool("more")}
            <span className="flex-1" />
            <span className="text-[12px] text-[#444746]">
              {position} de {inboxCount}
            </span>
            {tool("left")}
            {tool("right")}
          </div>
          )}

          {/* el mail se recorre adentro: foco de teclado, rueda contenida y un fundido abajo que avisa que sigue */}
          {hero ? (
            // hero: la línea de remitente y asunto y el mail completo, que recorre HeroDispositivos (capas por escenario). Decorativo.
            <div className="relative min-h-0 flex-1">{cuerpo}</div>
          ) : (
          <div
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain [mask-image:linear-gradient(to_bottom,black_calc(100%-56px),transparent)] focus-visible:outline-offset-[-3px]"
            tabIndex={0}
            role="region"
            aria-label="Mail de ejemplo, desplazable"
          >
            <div className="px-6 pt-5">
              <div className="flex items-center gap-3 pl-[52px]">
                <p className="text-[22px] leading-7">{scenario.subject}</p>
                <span className="rounded bg-[#e8eaed] px-1.5 py-0.5 text-[12px] text-[#444746]">Recibidos</span>
                <span className="flex-1" />
                <GIcon name="print" className={ic} />
                <GIcon name="open" className={`ml-3 ${ic}`} />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <Image src="/brand/tp-circulo-96.png" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium">TePostulo</span>
                    <span className="flex-1" />
                    <span className="text-[12px] text-[#444746]">{scenario.dateLongGmail}</span>
                    <GIcon name="star" className={`ml-2 ${ic}`} />
                    <GIcon name="reply" className={ic} />
                    <GIcon name="more" className={ic} />
                  </div>
                  <span className="flex items-center gap-0.5 text-[12px] text-[#444746]">
                    para mí <GIcon name="expand" className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 pl-[76px] pt-4">
              <EmailSummary scenario={scenario} />
            </div>
            <div className="flex items-center gap-2 px-6 pb-6 pl-[76px] pt-6">
              <span className="flex items-center gap-2 rounded-full border border-[#c4c7c5] px-4 py-2 text-[14px] font-medium text-[#444746]"><GIcon name="reply" className="h-5 w-5" /> Responder</span>
              <span className="flex items-center gap-2 rounded-full border border-[#c4c7c5] px-4 py-2 text-[14px] font-medium text-[#444746]"><GIcon name="forward" className="h-5 w-5" /> Reenviar</span>
              <GIcon name="emoji" className={`ml-1 ${ic}`} />
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
