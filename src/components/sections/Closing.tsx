import { closing } from "@/content/home";
import { site } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function Closing() {
  return (
    <section id="cierre" className="bg-naranja py-20 text-tinta lg:py-32">
      <div className="container-site">
        <h2 className="text-[2.4rem] wide lg:text-[4.6rem]">
          {closing.title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-8 flex flex-col items-start gap-3 lg:mt-10 lg:flex-row lg:items-center lg:gap-6">
          <WhatsAppButton variant="ink" size="lg" className="w-full lg:w-auto" />
          <p className="text-sm font-medium lg:text-base">{site.hours}</p>
        </div>
      </div>
    </section>
  );
}
