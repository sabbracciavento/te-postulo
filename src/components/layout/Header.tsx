import { site } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
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
          <WhatsAppButton />
        </nav>
        {/* tablet: sin menú; el CTA queda a mano. En el celular (≤ 767 px) no va: ya está la barra fija de abajo */}
        <div className="hidden md:block lg:hidden">
          <WhatsAppButton variant="icon" />
        </div>
      </div>
    </header>
  );
}
