import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { privacidad } from "@/content/privacidad";
import { site } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: privacidad.title,
  description: `Cómo usa ${site.name} tus datos: solo para postularte, nunca para publicidad ni para terceros.`,
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 bg-papel py-14 lg:py-24">
        <article className="container-site max-w-[52rem]">
          <p className="kicker text-azul">{site.name}</p>
          <h1 className="mt-3 text-[2.4rem] wide lg:text-[4rem]">{privacidad.title}</h1>
          <p className="mt-3 text-sm text-tinta-2">{privacidad.updated}</p>
          <div className="mt-10 space-y-8">
            {privacidad.sections.map((s) => (
              <section key={s.h}>
                <h2 className="text-xl lg:text-2xl">{s.h}</h2>
                <p className="mt-2 text-tinta-2">{s.p}</p>
              </section>
            ))}
            <section>
              <h2 className="text-xl lg:text-2xl">Contacto</h2>
              <p className="mt-2 text-tinta-2">Para cualquier pedido sobre tus datos, escribinos por WhatsApp. {site.hours}</p>
              <WhatsAppButton className="mt-4" />
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
