import { mailSection } from "@/content/home";
import { MailDemo } from "@/components/mail/MailDemo";

export function MailSection() {
  return (
    <section id="resumen" className="scroll-mt-16 bg-ice py-16 lg:scroll-mt-[73px] lg:py-24">
      <div className="container-site">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <h2 className="t-h2 lg:col-span-6 xl:col-span-5">{mailSection.title}</h2>
          <p className="t-lead mt-4 text-slate lg:col-span-6 lg:col-start-7 lg:mt-0 lg:self-end">{mailSection.lead}</p>
        </div>

        <div className="mt-8 lg:mt-12">
          <MailDemo />
        </div>

        <p className="mt-6 text-center text-[14px] text-slate lg:text-left">{mailSection.note}</p>
      </div>
    </section>
  );
}
