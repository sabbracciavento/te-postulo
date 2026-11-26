import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { BanderaAR } from "@/components/ui/BanderaAR";

/* `conBarra`: la página tiene la barra fija de contacto (la home). En el celular (< 768 px) se deja aire abajo (alto de la barra
   + safe area) para que no tape el pie; en /privacidad y la 404 no hay barra y no hace falta. */
export function Footer({ conBarra = false }: { conBarra?: boolean }) {
  return (
    <footer className={`border-t border-line bg-white ${conBarra ? "max-md:pb-[calc(96px+env(safe-area-inset-bottom))]" : ""}`}>
      <div className="container-site flex flex-col gap-5 py-10 lg:flex-row lg:items-center lg:justify-between">
        <Logo size="sm" />
        <ul className="flex flex-col gap-1.5 text-[14px] text-slate lg:flex-row lg:items-center lg:gap-6">
          <li className="flex items-center gap-2">
            {site.area} <BanderaAR />
          </li>
          <li>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line decoration-2 underline-offset-4 hover:decoration-action max-lg:inline-flex max-lg:min-h-11 max-lg:items-center">
              Instagram {site.instagram.handle}
            </a>
          </li>
          <li>
            <Link href="/privacidad" className="text-ink underline max-lg:inline-flex max-lg:min-h-11 max-lg:items-center decoration-line decoration-2 underline-offset-4 hover:decoration-action">
              Política de privacidad
            </Link>
          </li>
          <li>© {site.year} {site.name}</li>
        </ul>
      </div>
    </footer>
  );
}
