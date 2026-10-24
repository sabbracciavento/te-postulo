import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-tinta bg-papel">
      <div className="container-site flex flex-col gap-2 py-7 text-sm lg:flex-row lg:items-center lg:justify-between">
        <Logo size="sm" />
        <p className="flex flex-wrap items-center gap-x-3 text-tinta-2">
          <span>{site.city}</span>
          <span aria-hidden="true">·</span>
          <Link href="/privacidad" className="underline decoration-naranja decoration-2 underline-offset-4">
            Privacidad
          </Link>
          <span aria-hidden="true">·</span>
          <span>© {site.year}</span>
        </p>
      </div>
    </footer>
  );
}
