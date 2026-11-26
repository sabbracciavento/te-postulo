import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

// Sin canonical (no es una página para indexar) y fuera de los buscadores.
export const metadata: Metadata = { title: "Página no encontrada", robots: { index: false }, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 bg-white py-20 lg:py-32">
        <div className="container-site">
          <h1 className="t-h1 max-w-[16ch]">Esta página no existe.</h1>
          <p className="t-lead mt-4 max-w-[34rem] text-slate">Volvé al inicio o escribinos por WhatsApp.</p>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <WhatsAppButton />
            <Link href="/" className="inline-flex min-h-12 items-center text-[16px] font-semibold text-action underline decoration-2 underline-offset-4 hover:text-action-hover">
              Ir al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
