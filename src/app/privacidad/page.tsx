import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { privacidad } from "@/content/privacidad";
import { site } from "@/content/site";
import { ContactButtons } from "@/components/ui/ContactButtons";

const description = `Cómo usa ${site.name} tus datos: para qué, quién interviene, cuánto tiempo y cómo pedir que los borremos.`;

export const metadata: Metadata = {
  title: privacidad.title,
  description,
  alternates: { canonical: "/privacidad" },
  openGraph: {
    type: "article",
    locale: "es_AR",
    siteName: site.name,
    title: `${privacidad.title} · ${site.name}`,
    description,
    url: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 bg-white py-14 lg:py-24">
        {/* contenedor del sitio (alineado con el logo); el texto, a un ancho de lectura */}
        <div className="container-site">
          <article className="max-w-[44rem]">
            <h1 className="t-h1">{privacidad.title}</h1>
            <p className="mt-3 text-[14px] text-slate">{privacidad.updated}</p>
            <div className="mt-10 space-y-8">
              {privacidad.sections.map((s) => (
                <section key={s.h}>
                  <h2 className="t-h3">{s.h}</h2>
                  <p className="mt-2 text-slate">{s.p}</p>
                </section>
              ))}
              <section>
                <h2 className="t-h3">Contacto</h2>
                <p className="mt-2 text-slate">Para cualquier pedido sobre tus datos, escribinos por WhatsApp o Instagram.</p>
                <ContactButtons className="mt-4" />
              </section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
