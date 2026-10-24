"use client";

import { useState } from "react";
import { mailScenarios } from "@/content/mail";
import { GmailDesktop } from "./GmailDesktop";
import { GmailMobile } from "./GmailMobile";
import { PhoneFrame } from "./PhoneFrame";

export function MailDemo() {
  const [activeId, setActiveId] = useState(mailScenarios[0].id);
  const active = mailScenarios.find((s) => s.id === activeId) ?? mailScenarios[0];
  const position = mailScenarios.findIndex((s) => s.id === active.id) + 1;

  return (
    <div>
      <div role="tablist" aria-label="Ejemplos de resumen" className="no-scrollbar snap-row -mx-5 px-5 lg:mx-0 lg:flex-wrap lg:px-0">
        {mailScenarios.map((s) => {
          const on = s.id === activeId;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={on}
              aria-controls={`mail-panel-${s.id}`}
              id={`mail-tab-${s.id}`}
              type="button"
              onClick={() => setActiveId(s.id)}
              className={`rounded-full border-2 px-4 py-2 font-display text-[15px] font-bold tracking-tight transition-colors ${
                on ? "border-naranja bg-naranja text-tinta" : "border-papel/40 text-papel hover:border-papel"
              }`}
            >
              {s.chip}
            </button>
          );
        })}
      </div>

      <div key={active.id} id={`mail-panel-${active.id}`} role="tabpanel" aria-labelledby={`mail-tab-${active.id}`} className="mt-7 motion-safe:animate-fade lg:mt-8">
        <div className="lg:hidden">
          <PhoneFrame>
            <GmailMobile scenario={active} />
          </PhoneFrame>
        </div>
        <div className="hidden lg:block">
          <GmailDesktop scenario={active} inboxCount={38} position={position} />
        </div>
      </div>
    </div>
  );
}
