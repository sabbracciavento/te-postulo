import Image from "next/image";
import { closing } from "@/content/home";
import { ContactButtons } from "@/components/ui/ContactButtons";

export function Closing() {
  return (
    <section id="cierre" className="on-dark relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      {/* gesto: el monograma, grande y recortado por el borde */}
      <Image
        src="/brand/tp-blanco.png"
        alt=""
        width={520}
        height={398}
        className="pointer-events-none absolute -bottom-16 -right-20 w-[300px] opacity-[0.07] lg:-bottom-24 lg:right-0 lg:w-[520px]"
      />
      <div className="container-site relative">
        <h2 className="t-h1 max-w-[14ch]">{closing.title}</h2>
        <p className="t-lead mt-4 max-w-[30rem] text-white/80">{closing.text}</p>
        <ContactButtons tono="oscuro" className="mt-8" />
      </div>
    </section>
  );
}
