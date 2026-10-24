import { site } from "@/content/site";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-tinta bg-papel/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between lg:h-[72px]">
        <Logo size="md" />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Secciones">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className="font-medium underline-offset-4 decoration-naranja decoration-[3px] hover:underline">
              {n.label}
            </a>
          ))}
          <WhatsAppButton size="md" />
        </nav>
        <div className="lg:hidden">
          <WhatsAppButton variant="icon" />
        </div>
      </div>
    </header>
  );
}
