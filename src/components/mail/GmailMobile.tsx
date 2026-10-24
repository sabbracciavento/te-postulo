import type { MailScenario } from "@/content/mail";
import { EmailSummary } from "./EmailSummary";
import { GIcon } from "./GmailIcons";

/** Mensaje abierto en la app de Gmail (Android, Material 3). Va adentro de PhoneFrame. */
export function GmailMobile({ scenario, compact = false }: { scenario: MailScenario; compact?: boolean }) {
  const ic = "h-6 w-6 text-[#444746]";
  return (
    <div className="bg-white font-gmail text-[#1f1f1f]">
      {/* barra superior de la app */}
      <div className="flex h-14 items-center px-2">
        <span className="grid h-12 w-12 place-items-center"><GIcon name="back" className={ic} /></span>
        <span className="flex-1" />
        <span className="grid h-12 w-12 place-items-center"><GIcon name="archive" className={ic} /></span>
        <span className="grid h-12 w-12 place-items-center"><GIcon name="delete" className={ic} /></span>
        <span className="grid h-12 w-12 place-items-center"><GIcon name="mail" className={ic} /></span>
        <span className="grid h-12 w-12 place-items-center"><GIcon name="more" className={ic} /></span>
      </div>

      <div className="px-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[22px] leading-7 text-[#1f1f1f]">{scenario.subject}</p>
          <span className="mt-0.5 shrink-0"><GIcon name="star" className={ic} /></span>
        </div>

        <div className="mt-4 flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b57d0] text-[18px] font-medium text-white">T</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[15px] font-medium">Te Postulo</span>
              <span className="shrink-0 text-[12px] text-[#444746]">{scenario.dateShort}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-0.5 text-[13px] text-[#444746]">
                para mí <GIcon name="expand" className="h-4 w-4" />
              </span>
              <span className="flex items-center">
                <GIcon name="reply" className={ic} />
                <span className="ml-3"><GIcon name="more" className={ic} /></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 px-3">
        <EmailSummary scenario={scenario} compact={compact} />
      </div>

      {!compact && (
        <div className="flex gap-2 px-3 pb-5 pt-5">
          {[
            ["reply", "Responder"],
            ["forward", "Reenviar"],
          ].map(([icon, label]) => (
            <span key={label} className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#c4c7c5] px-3 py-2.5 text-[13px] font-medium text-[#444746]">
              <GIcon name={icon as "reply"} className="h-[18px] w-[18px] shrink-0" />
              <span>{label}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
