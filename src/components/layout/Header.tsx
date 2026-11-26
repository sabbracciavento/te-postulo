import { site } from "@/content/site";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm lg:bg-white lg:backdrop-blur-none">
      <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
        <Logo size="md" />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Secciones">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="t-ui text-slate transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
          <ContactButtons variante="compacto" />
        </nav>
        {/* tablet: sin menú; el contacto queda a mano. En el celular (≤ 767 px) no va: ya está la barra fija de abajo */}
        <ContactButtons variante="iconos" className="hidden md:flex lg:hidden" />
      </div>
    </header>
  );
}
