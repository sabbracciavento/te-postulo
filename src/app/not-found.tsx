import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1 bg-papel py-20 lg:py-32">
        <div className="container-site">
          <p className="kicker text-azul">Error 404</p>
          <h1 className="mt-3 text-[2.6rem] wide lg:text-[4.4rem]">
            <span className="block">Esa página no existe.</span>
            <span className="block text-naranja">El trabajo, sí.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-tinta-2">Volvé al inicio o escribinos directamente por WhatsApp.</p>
          <div className="mt-8 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:gap-6">
            <WhatsAppButton size="lg" />
            <Link href="/" className="font-medium underline decoration-naranja decoration-[3px] underline-offset-4">
              Ir al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
