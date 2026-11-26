"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { mailScenarios } from "@/content/mail";
import { GmailDesktop } from "./GmailDesktop";
import { EmailSummary } from "./EmailSummary";
import { GmailMobile } from "./GmailMobile";
import { PhoneFrame } from "./PhoneFrame";

const PANEL_ID = "mail-panel";

export function MailDemo() {
  const [activeId, setActiveId] = useState(mailScenarios[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, mailScenarios.findIndex((s) => s.id === activeId));
  const active = mailScenarios[index];

  // Pestañas ARIA: un solo tabindex activo (roving), flechas ←/→, Inicio y Fin; la selección sigue al foco.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const last = mailScenarios.length - 1;
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActiveId(mailScenarios[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Ejemplos de resumen"
        onKeyDown={onKeyDown}
        className="grid grid-cols-3 gap-2 md:no-scrollbar md:snap-row md:-mx-6 md:scroll-px-6 md:px-6 lg:mx-0 lg:flex-wrap lg:px-0"
      >
        {mailScenarios.map((s, i) => {
          const on = i === index;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              aria-selected={on}
              aria-controls={PANEL_ID}
              id={`mail-tab-${s.id}`}
              tabIndex={on ? 0 : -1}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`min-h-14 rounded-[12px] border px-2 py-2 text-center font-sans text-[14px] font-semibold leading-tight transition-colors md:min-h-11 md:rounded-full md:px-4 md:text-[15px] ${
                on ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand"
              }`}
            >
              {s.chip}
            </button>
          );
        })}
      </div>

      <div key={active.id} id={PANEL_ID} role="tabpanel" aria-labelledby={`mail-tab-${active.id}`} className="mt-7 motion-safe:animate-fade lg:mt-8">
        {/* celular (≤ 767 px): el mail limpio a todo el ancho, como se ve en el teléfono (sin marco) */}
        <div className="md:hidden">
          <p className="text-[14px] leading-snug text-slate">
            <span className="font-semibold text-ink">Asunto:</span> {active.subject}
          </p>
          <div className="-mx-6 mt-3">
            <EmailSummary scenario={active} />
          </div>
        </div>
        {/* tablet: dentro del teléfono */}
        <div className="hidden md:block lg:hidden">
          <PhoneFrame hora={active.hora}>
            <GmailMobile scenario={active} hoy />
          </PhoneFrame>
        </div>
        <div className="hidden lg:block">
          <GmailDesktop scenario={active} inboxCount={38} position={index + 1} />
        </div>
      </div>
    </div>
  );
}
