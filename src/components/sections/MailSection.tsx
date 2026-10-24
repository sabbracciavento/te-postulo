import { mailSection } from "@/content/home";
import { MailDemo } from "@/components/mail/MailDemo";

export function MailSection() {
  return (
    <section id="mail" className="scroll-mt-16 bg-tinta py-16 text-papel lg:scroll-mt-[72px] lg:py-24">
      <div className="container-site">
        <p className="kicker text-naranja">{mailSection.kicker}</p>
        <h2 className="mt-3 text-[2rem] wide lg:text-[3.2rem]">{mailSection.title}</h2>
        <p className="mt-4 max-w-[40rem] text-[16px] text-papel/80 lg:text-lg">{mailSection.lead}</p>

        <div className="mt-8 lg:mt-10">
          <MailDemo />
        </div>

        <p className="mx-auto mt-8 max-w-[34rem] text-center font-display text-[1.2rem] font-bold leading-snug text-papel/90 lg:mt-10 lg:text-[1.45rem]">
          {mailSection.casilla}
        </p>

        <div className="mt-14 border-t border-papel/20 pt-8 lg:mt-16 lg:pt-10">
          <p className="kicker text-papel/60">{mailSection.noHacemos.kicker}</p>
          <ul className="mt-4 grid gap-3 lg:grid-cols-3 lg:gap-8">
            {mailSection.noHacemos.items.map((t) => (
              <li key={t} className="flex gap-3 font-display text-[1.15rem] font-bold leading-snug tracking-tight lg:text-[1.35rem]">
                <span className="mt-[0.55em] h-2.5 w-2.5 shrink-0 bg-naranja" aria-hidden="true" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
